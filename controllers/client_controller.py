from schemas.client import Client, ClientQdrant, Chat

class ClientController:
    def __init__(self, client_model):
        self.client_model = client_model
        
    def get(self, id: int) -> ClientQdrant:
        return self.client_model.get(id)
    
    def create(self, client: Client):
        return self.client_model.create(client)
    
    def update(self, id: int, chat: Chat):
        return self.client_model.update(id, chat)
        