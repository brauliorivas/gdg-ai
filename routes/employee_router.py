from fastapi import APIRouter
from controllers.employee_controller import EmployeeController
from schemas.employee import Employee, EmployeeQdrant

def create_employee_router(employee_model):
    router = APIRouter()
    controller = EmployeeController(employee_model)
    
    @router.post("/")
    def create_employee(employee: Employee) -> EmployeeQdrant:
        return controller.create(employee)   
    
    @router.get("/{id}")
    def get_employee(id: str) -> EmployeeQdrant:
        return controller.get(id)
    
    return router