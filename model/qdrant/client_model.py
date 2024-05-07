from .connection import QdrantConnection
from qdrant_client.models import Distance, VectorParams, PointStruct
from schemas.client import Client, ClientQdrant, Chat
from llm.gemini import Gemini
import uuid

qdrant_connection = QdrantConnection().get_connection()
gemini = Gemini()

class ClientModel:
    def __init__(self):
        self.collection_name = "clients"
        
        try:
            qdrant_connection.get_collection(collection_name=self.collection_name)
        except Exception as e:
            qdrant_connection.create_collection(
                collection_name=self.collection_name,
                vectors_config=VectorParams(
                    size=768,
                    distance=Distance.COSINE
                )                
            )
    
    def get(self, id: str) -> ClientQdrant:
        points = qdrant_connection.retrieve(
            collection_name=self.collection_name,
            ids=[id],
            with_payload=True,
            with_vectors=True
        )
        
        point = points[0]
        
        id = point.id
        payload = point.payload
        name = payload.get("name")
        industry = payload.get("industry")
        history = payload.get("history", [])
        
        client = ClientQdrant(
            id=id,
            name=name,
            industry=industry,
            background_vector=point.vector,
            history=history
        )
        
        return client
    
    def create(self, client: Client):
        id = str(uuid.uuid4())
        embedding = gemini.embed_query(client.background)
        payload = {
            "name": client.name,
            "industry": client.industry,
        }
                
        struct = PointStruct(
            id=id,
            payload=payload,
            vector=embedding
        )
        
        points = [struct]
                        
        qdrant_connection.upsert(self.collection_name, points)
        
        return self.get(id)
    
    def chat(self, chat: Chat) -> Chat:
        title = chat.title
        created = chat.created

        messages = [] 
               
        if (len(chat.messages) == 1): # If the chat just started, and user sent his first query
            messages.append({
                "role": "user",
                "parts": ["Hi, today you have to help me with something very important. I'm an employee/company looking for a software developer in an IT consulting company. I have a basic idea of what I want to build, but I need help with extending my list of requirements. Can you help me with that? You will have to ask me multiple questions in order to search for a software developer that match my requirements. I'll start by writing my initial requirements and then you can ask me. PLEASE NOTE: When you think that you have enough information, you can tell me that you are ready to recommend me some software developers. ¡Just tell me to search, don't do anything else! You should answer \"You are ready to search\" Ask a maximum of 3 questions."]
            })
            messages.append({
                "role": "model",
                "parts": ["Alright! I'm going to help you with that. I'm going to wait for your intial requirements and then I'll ask you a few questions to understand your requirements better. I'll ask you at most 3 questions and tell that I'm ready to recommend you some software developers."]
            })
            messages.append(chat.messages[0])
        else:
            messages = chat.messages
            
        newMessages = gemini.chat(messages)
        
        newChat = Chat(
            title=title,
            created=created,
            messages=newMessages
        )
        
        return newChat
        
    
    def update(self, id: int, chat: Chat) -> ClientQdrant:
        client = self.get(id)
        
        client.history.append(chat)
        
        qdrant_connection.set_payload(
            collection_name=self.collection_name,
            payload={
                "history": client.history
            },
            points=[id]
        )
        
        return client
        
        