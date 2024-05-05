from pydantic import BaseModel
from typing import List, Dict, Any

class Client(BaseModel):
    name: str
    industry: str
    background: str
    
class Chat(BaseModel):
    title: str
    created: str
    messages: List[Dict[str, Any]]
    
class ClientQdrant(BaseModel):
    id: str
    name: str
    industry: str
    background_vector: List[float] 
    history: List[Chat]