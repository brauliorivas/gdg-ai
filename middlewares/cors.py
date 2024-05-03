from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost",
    "http://localhost:3000",
    "https://gdg-ai.vercel.app/",
]

def cors_middleware(app):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )