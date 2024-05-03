from schemas.employee import Employee, EmployeeQdrant
from .connection import QdrantConnection
from qdrant_client import models

client = QdrantConnection().get_connection()

class EmployeeModel:
    def __init__(self):
        self.collection_name = "employees"
        
        try:
            client.get_collection(collection_name=self.collection_name)
        except Exception as e:
            client.create_collection(
                collection_name=self.collection_name,
                vectors_config={
                    "background": models.VectorParams(
                        size=768,
                        distance=models.Distance.COSINE
                    ),
                    "cv": models.VectorParams(
                        size=768,
                        distance=models.Distance.COSINE
                    ),
                }             
            )