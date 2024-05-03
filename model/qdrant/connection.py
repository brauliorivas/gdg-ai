from qdrant_client import QdrantClient
from dotenv import load_dotenv
import os

load_dotenv()

class QdrantConnection:
    _instance = None
    
    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._connection = QdrantClient(
                url=os.getenv('QDRANT_URL'),
                api_key=os.getenv('QDRANT_API_KEY')
            )
            
        return cls._instance
    
    def get_connection(self):
        return self._connection
