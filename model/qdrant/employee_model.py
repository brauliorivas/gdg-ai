from schemas.employee import Employee, EmployeeQdrant, EmployeeRequest
from schemas.client import Chat
from .connection import QdrantConnection
from qdrant_client.models import VectorParams, Distance, PointStruct, Filter, FieldCondition, MatchValue
from typing import List
from llm.gemini import Gemini
import uuid

qdrant_connection = QdrantConnection().get_connection()
gemini = Gemini()

class EmployeeModel:
    def __init__(self):
        self.collection_name = "employees"
        
        try:
            qdrant_connection.get_collection(collection_name=self.collection_name)
        except Exception as e:
            qdrant_connection.create_collection(
                collection_name=self.collection_name,
                vectors_config={
                    "background": VectorParams(
                        size=768,
                        distance=Distance.COSINE
                    ),
                    "cv": VectorParams(
                        size=768,
                        distance=Distance.COSINE
                    ),
                }             
            )        
    
    def get(self, id: str) -> EmployeeQdrant:
        points = qdrant_connection.retrieve(
            collection_name=self.collection_name,
            ids=[id],
            with_payload=True,
            with_vectors=True
        )
        
        point = points[0]
        
        id = point.id
        payload = point.payload
        name = payload.get("name")
        skillset = payload.get("skillset")
        background = payload.get("background")
        
        employee = EmployeeQdrant(
            id=id,
            name=name,
            skillset=skillset,
            background=background,
            background_vector=point.vector.get("background"),
            cv_vector=point.vector.get("cv")
        )
        
        return employee
    
    def create(self, employee: Employee) -> EmployeeQdrant:
        id = str(uuid.uuid4())
        embedding_background = gemini.embed_document(employee.background)
        embedding_cv = gemini.embed_document(employee.cv)
        payload = {
            "name": employee.name,
            "skillset": employee.skillset,
            "background": employee.background,
        }
        
        struct = PointStruct(
            id=id,
            payload=payload,
            vector={
                "background": embedding_background,
                "cv": embedding_cv
            }
        )
        
        points = [struct]
        
        qdrant_connection.upsert(self.collection_name, points)
        
        return self.get(id)
        
    
    def recommend(self, employee_request: EmployeeRequest) -> List[EmployeeQdrant]:
        chat = employee_request.chat
        background = employee_request.background
        skillset = employee_request.skillset
        
        messages = chat.messages
        user_messages = [message.get("parts")[0] for message in messages if message.get("role") == "user"]
        user_messages = user_messages[1:] # Remove the first message from the user
        text = " ".join(user_messages)
        
        requirements_text = gemini.embed_query(text)
        
        search_by_cv = qdrant_connection.search(
            collection_name=self.collection_name,
            query_filter=Filter(
                should=[
                    FieldCondition(
                        key="skillset[]",
                        match=MatchValue(
                            value=skill
                        )
                    )
                    for skill in skillset
                ]
            ),
            query_vector=("cv", requirements_text),
            with_vectors=True,
            with_payload=True,
        )
        
        search_by_background = qdrant_connection.search(
            collection_name=self.collection_name,
            query_filter=Filter(
                should=[
                    FieldCondition(
                        key="skillset[]",
                        match=MatchValue(
                            value=skill
                        )
                    )
                    for skill in skillset
                ]
            ),
            query_vector=("background", background),
            with_vectors=True,
            with_payload=True,
        )
        
        results = []
        
        for employee in search_by_cv:
            employee_cv_score = employee.score
            employee_background_score = [employee for employee in search_by_background if employee.id == employee.id][0].score
            employee.score = employee_cv_score + employee_background_score
            results.append(employee)
                
        return [EmployeeQdrant(
                id=employee.id,
                name=employee.payload.get("name"),
                skillset=employee.payload.get("skillset"),
                background=employee.payload.get("background"),
                background_vector=employee.vector.get("background"),
                cv_vector=employee.vector.get("cv"),
                score=employee.score
            ) for employee in sorted(results, key=lambda x: x.score, reverse=True)
        ]