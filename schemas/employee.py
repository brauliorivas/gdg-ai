from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from .client import Chat
class Employee(BaseModel):
    name: str
    skillset: List[str]
    background: str
    cv: str
    
class EmployeeQdrant(BaseModel):
    id: str
    name: str
    skillset: List[str]
    background: str
    background_vector: List[float]
    cv_vector: List[float]
    score_cv: Optional[float] = None
    score_background: Optional[float] = None
    
class EmployeeRequest(BaseModel):
    chat: Chat
    background: List[float]
    skillset: List[str]
    