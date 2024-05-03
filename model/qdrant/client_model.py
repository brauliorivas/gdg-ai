from .connection import QdrantConnection

db = QdrantConnection().get_connection()

class ClientModel:
    def get(self, id: int):
        return db.get(id)