from schemas.employee import Employee, EmployeeQdrant
from .connection import QdrantConnection
from qdrant_client.models import VectorParams, Distance, PointStruct
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
        
        employee = EmployeeQdrant(
            id=id,
            name=name,
            skillset=skillset,
            # background_vector=point.vector.get("background"),
            # cv_vector=point.vector.get("cv")
        )
        
        return employee
    
    def create(self, employee: Employee) -> EmployeeQdrant:
        id = str(uuid.uuid4())
        embedding_background = gemini.embed_document(employee.background)
        embedding_cv = gemini.embed_document(employee.cv)
        payload = {
            "name": employee.name,
            "skillset": employee.skillset,
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