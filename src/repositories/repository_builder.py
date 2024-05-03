from src.repositories.repository import VectorRepository, QdrantUploader
from src.models.client import Client

class QdrantRepositoryBuilder:
    def __init__(self, gemini_api_key: str, qdrant_url: str, qdrant_api_key: str, collection_name: str) -> None:
        self.gemini_api_key = gemini_api_key
        self.qdrant_url = qdrant_url
        self.qdrant_api_key = qdrant_api_key
        self.collection_name = collection_name
        
    def build(self) -> VectorRepository:
        client = Client(url=self.qdrant_url, api_key=self.qdrant_api_key)
        client.set_collection_name(self.collection_name)
        uploader = QdrantUploader()
        uploader.set_client(client)
        uploader.set_gemini_client(self.gemini_api_key)
        repository = VectorRepository(uploader)
        return repository