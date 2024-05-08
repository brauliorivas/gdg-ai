from schemas.client import Client, ClientQdrant, Chat

class ClientController:
    def __init__(self, client_model):
        self.client_model = client_model
        
    def get(self, id: str) -> ClientQdrant:
        return self.client_model.get(id)
    
    def create(self, client: Client) -> ClientQdrant:
        return self.client_model.create(client)
    
    def update(self, id: int, chat: Chat) -> ClientQdrant:
        return self.client_model.update(id, chat)
    
    def chat(self, chat: Chat) -> Chat:
        return self.client_model.chat(chat)
    
    def get_by_name(self, name: str) -> ClientQdrant:
        return self.client_model.get_by_name(name)