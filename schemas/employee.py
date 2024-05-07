from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from .client import Chat
class Employee(BaseModel):
    name: str
    skillset: List[str]
    background: str
    cv: str
    
class EmployeeQdrant(BaseModel):
    name: str
    skillset: List[str]
    background: str
    background_vector: List[float]
    cv_vector: List[float]
    score: Optional[float]
    
class EmployeeRequest(BaseModel):
    chat: Chat
    background: List[float]
    skillset: List[str]
    