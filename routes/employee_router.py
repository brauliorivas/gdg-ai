from fastapi import APIRouter
from controllers.employee_controller import EmployeeController
from schemas.employee import Employee, EmployeeQdrant

def create_employee_router(employee_model):
    router = APIRouter()
    controller = EmployeeController(employee_model)
    
    return router