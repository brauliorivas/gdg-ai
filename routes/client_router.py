from fastapi import APIRouter
from controllers.client_controller import ClientController
from schemas.client import Client, ClientQdrant, Chat

def create_client_router(client_model):
    router = APIRouter()
    controller = ClientController(client_model)
    
    @router.post("/")
    def create_client(client: Client) -> ClientQdrant: # client parameter comes from the request body
        return controller.create(client)
    
    @router.get("/{id}")
    def get(id: str) -> ClientQdrant:
        return controller.get(id)
    
    @router.get("/")
    def get_by_name(name: str) -> ClientQdrant:
        return controller.get_by_name(name)
    
    @router.patch("/{id}")
    def update_client(id: str, chat: Chat) -> ClientQdrant:
        return controller.update(id, chat)
    
    @router.post("/chat")
    def chat_client(chat: Chat) -> Chat: 
        return controller.chat(chat)
    
    return router