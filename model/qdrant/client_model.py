from .connection import QdrantConnection
from qdrant_client import models
from schemas.client import Client, ClientQdrant, Chat

client = QdrantConnection().get_connection()

class ClientModel:
    def __init__(self):
        self.collection_name = "clients"
        
        try:
            client.get_collection(collection_name=self.collection_name)
        except Exception as e:
            client.create_collection(
                collection_name=self.collection_name,
                vectors_config=models.VectorParams(
                    size=768,
                    distance=models.Distance.COSINE
                )                
            )
    
    def get(self, id: int) -> ClientQdrant:
        pass
    
    def create(self, client: Client):
        pass
    
    def update(self, id: int, chat: Chat):
        pass