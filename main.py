from fastapi import FastAPI
from middlewares.cors import cors_middleware

from routes.client_router import create_client_router
from model.qdrant.client_model import ClientModel

from routes.employee_router import create_employee_router
from model.qdrant.employee_model import EmployeeModel

app = FastAPI()

cors_middleware(app)

@app.get("/")
def read():
    return {"status": "ok"}

client_model = ClientModel()
employee_model = EmployeeModel()

app.include_router(create_client_router(client_model), prefix="/clients", tags=["client"])
app.include_router(create_employee_router(employee_model), prefix="/employees", tags=["employee"])