from qdrant_client import QdrantClient
from env.load import load_var

qdrant_url = load_var('QDRANT_URL')
qdrant_api_key = load_var('QDRANT_API_KEY')

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
