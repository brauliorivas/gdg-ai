from qdrant_client.models import PointStruct
from typing import List

class VectorAdapter:
    @staticmethod
    def generate_points(embedded_data) -> List[PointStruct]:
        points = [
            PointStruct(
                id = idx,
                vector = embedding,
                payload = payload
            )
            for idx, (embedding, payload) in enumerate(embedded_data)
        ]
        return points  