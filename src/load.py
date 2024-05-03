from src.repositories.repository_builder import QdrantRepositoryBuilder


builder = QdrantRepositoryBuilder(
    gemini_api_key="GEMINI KEY",
    qdrant_url="URL",
    qdrant_api_key="QDRANT KEY",
    collection_name='name'
)

repository = builder.build()

repository.upload('products.csv',)
