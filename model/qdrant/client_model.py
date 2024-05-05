from .connection import QdrantConnection
from qdrant_client.models import Distance, VectorParams, PointStruct
from schemas.client import Client, ClientQdrant, Chat
from llm.gemini import Gemini
import uuid

qdrant_connection = QdrantConnection().get_connection()
gemini = Gemini()

class ClientModel:
    def __init__(self):
        self.collection_name = "clients"
        
        try:
            qdrant_connection.get_collection(collection_name=self.collection_name)
        except Exception as e:
            qdrant_connection.create_collection(
                collection_name=self.collection_name,
                vectors_config=VectorParams(
                    size=768,
                    distance=Distance.COSINE
                )                
            )
    
    def get(self, id: str) -> ClientQdrant:
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
        industry = payload.get("industry")
        history = payload.get("history", [])
        
        client = ClientQdrant(
            id=id,
            name=name,
            industry=industry,
            background_vector=point.vector,
            history=history
        )
        
        return client
    
    def create(self, client: Client):
        id = str(uuid.uuid4())
        embedding = gemini.embed_document(client.background)
        payload = {
            "name": client.name,
            "industry": client.industry,
        }
                
        struct = PointStruct(
            id=id,
            vector=embedding,
            payload=payload
        )
        
        points = [struct]
                        
        qdrant_connection.upsert(self.collection_name, points)
        
        return self.get(id)
        
    
    def update(self, id: int, chat: Chat):
        pass