from pydantic import BaseModel
from typing import List, Dict, Any

class Employee(BaseModel):
    name: str
    skillset: List[str]
    background: str
    cv: str
    
class EmployeeQdrant(BaseModel):
    name: str
    skillset: List[str]
    background_vector: List[float]
    cv_vector: List[float]
    