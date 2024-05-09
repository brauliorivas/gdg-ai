from fastapi.middleware.cors import CORSMiddleware

origins = [
    "*",
]

def cors_middleware(app):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_methods=["*"],
        allow_headers=["*"],
    )