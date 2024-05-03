from pydantic import BaseModel

class Client(BaseModel):
    name: str
    skillset: List[str]
    background: List[float] #embedding
    cv: List[float] #embedding