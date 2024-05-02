from src.repositories.repository_builder import QdrantRepositoryBuilder


builder = QdrantRepositoryBuilder(
    gemini_api_key="AIzaSyDAxCHSpGTUyuTHzbu3IwM8OCwSn0N4jRk",
    qdrant_url="https://ffbaa1f9-05e7-4f92-85e3-cd44bf8f274a.us-east4-0.gcp.cloud.qdrant.io:6333",
    qdrant_api_key="nAgRIItF-ypjDc3kHBw3-az9_yfi8wSFPZmQ5-Ro2W3--76jWPkx4g",
    collection_name='products2'
)

repository = builder.build()

repository.upload('products.csv',)