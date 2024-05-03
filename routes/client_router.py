from fastapi import APIRouter, Depends
from controllers.client_controller import ClientController

def create_client_router(client_model):
    router = APIRouter()
    controller = ClientController(client_model)
    
    @router.get("/{id}")
    def get(id: int):
        return controller.get(id)
    
    return router