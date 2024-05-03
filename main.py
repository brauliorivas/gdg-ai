from typing import Union
from fastapi import FastAPI
from routes.client_router import create_client_router
from model.qdrant.client_model import ClientModel

app = FastAPI()

@app.get("/health")
def read():
    return {"status": "ok"}

client_model = ClientModel()

app.include_router(create_client_router(client_model))