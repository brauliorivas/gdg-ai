from qdrant_client import QdrantClient
import google.generativeai as gemini_client
from qdrant_client.models import Distance, PointStruct, VectorParams
from typing import List

class Client:
    def __init__(self, url: str, api_key: str) -> None:
        self.qdrant = QdrantClient(url=url, api_key=api_key)
        self.collection_name : str = None
    
    def set_collection_name(self, new_collection_name: str) -> None:
        self.collection_name = new_collection_name
    
    def create_collection(self) -> None:
        self.qdrant.create_collection(self.collection_name, vectors_config=VectorParams(
        size = 768,
        distance = Distance.COSINE,
    ))
        
    def upload_data(self, points: List[PointStruct]) -> None:
        self.create_collection()
        self.qdrant.upsert(self.collection_name, points)

class GeminiClient:
    def __init__(self, api_key: str) -> None:
        self.api_key = api_key
        gemini_client.configure(api_key=api_key)
    
    def embedd_data(self, data) -> List:
        data_embedding = []
        
        for index, row in data.iterrows():
            text_to_embed = row['Product Name'] + ' ' + row['Category'] + ' ' + row['About Product']
            
            embedding = gemini_client.embed_content(
                model='models/embedding-001',
                content=text_to_embed,
                task_type='retrieval_document',
                title='Qdrant x Gemini',
            )
            
            payload = {
                'Product Name': row['Product Name'],
                'Category': row['Category'],
                'Selling Price': row['Selling Price'],
                'About Product': row['About Product'],
                'Product Specification': row['Product Specification'],
                'Technical Details': row['Technical Details'],
                'Shipping Weight': row['Shipping Weight'],
                'Image': row['Image'],
            }
            
            data_embedding.append((embedding['embedding'], payload))
        
        return data_embedding