from schemas.employee import Employee, EmployeeQdrant, EmployeeRequest
from schemas.client import Chat
from typing import List

class EmployeeController:
    def __init__(self, employee_model):
        self.employee_model = employee_model
        
    def create(self, employee: Employee) -> EmployeeQdrant:
        return self.employee_model.create(employee)
        
    def get(self, id: str) -> EmployeeQdrant:
        return self.employee_model.get(id)
    
    def recommend(self, employee_request: EmployeeRequest) -> List[EmployeeQdrant]:
        return self.employee_model.recommend(employee_request)
    