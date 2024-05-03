from qdrant_client import QdrantClient
from dotenv import load_dotenv
import os

current_dir = os.getcwd()

env_path = os.path.join(current_dir, '.env')

load_dotenv(env_path)

qdrant_url = os.getenv('QDRANT_URL')
qdrant_api_key = os.getenv('QDRANT_API_KEY')

class QdrantConnection:
    _instance = None
    
    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._connection = QdrantClient(
                url=qdrant_url,
                api_key=qdrant_api_key
            )
            
        return cls._instance
    
    def get_connection(self):
        return self._connection
