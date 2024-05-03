from pydantic import BaseModel

class Client(BaseModel):
    name: str
    industry: str
    background: List[float] #embedding
    history: List[List[str]]