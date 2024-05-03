import google.generativeai as genai
from env.load import load_var

GEMINI_API_KEY = load_var('GEMINI_API_KEY')

class GeminiConnection:
    _instance = None
    _configured = False
    
    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance
    
    def configure(self):
        if not self._configured:
            genai.configure(
                api_key=GEMINI_API_KEY
            )
            self._configured = True
    
class Gemini:
    def __init__(self):
        instance = GeminiConnection.get_instance()
        instance.configure()
            
    """
    Use Gemini LLM embeddings to embed a document (any string) to 
    return a vector used to store information in a vector database.
    """        
    def embed_document(self, document: str):
        return genai.embed_content(
            model="models/embedding-001",
            content=document,
            task_type="retrieval_document",
            title="Qdrant x Gemini"
        )
        
    
    """
    Use Gemini LLM embeddings to embed a query (any string) to 
    return a vector used for searching on a vector database
    related objects.
    """        
    def embed_query(self, query: str):
        return genai.embed_content(
            model="models/embedding-001",
            content=query,
            task_type="retrieval_query",
            title="Qdrant x Gemini"
        )["embedding"]
        
    """
    Pass a list of dictionaries
    {
        "role": "user" or "model",
        "parts": [list of strings] (prompt)
    } 
    to generate a response from the model.
    Args:
        history: list of dictionaries. Default is an empty list.
    """
    def chat(history: list = []):
        model = genai.GenerativeModel("gemini-pro")
        response = model.generate_content(history)
        history.append({
            "role": "model",
            "parts": [response.text]
        })
        return history