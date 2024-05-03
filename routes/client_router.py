from fastapi import APIRouter
from controllers.client_controller import ClientController
from schemas.client import Client, ClientQdrant, Chat

def create_client_router(client_model):
    router = APIRouter()
    controller = ClientController(client_model)
    
    @router.post("/")
    def create_client(client: Client): # client parameter comes from the request body
        return controller.create(client)
    
    
    @router.get("/{id}")
    def get(id: int) -> ClientQdrant:
        return controller.get(id)
    
    @router.patch("/{id}")
    def update_client(id: int, chat: Chat):
        return controller.update(id, chat)
    
    return router