class ClientController:
    def __init__(self, client_model):
        self.client_model = client_model
        
    def get(self, id: int):
        return self.client_model.get(id)