from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

from backend.api.upload import router as upload_router
from backend.api.ask import router as ask_router
from backend.api.impact import router as impact_router
from backend.api.chatbot import router as chatbot_router


load_dotenv()

FRONTEND_URL = os.getenv("FRONTEND_URL")


app = FastAPI()


allowed_origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

if FRONTEND_URL:
    allowed_origins.append(FRONTEND_URL)


app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "CodeMind AI is running"
    }


app.include_router(upload_router, prefix="/api")
app.include_router(ask_router, prefix="/api")
app.include_router(impact_router, prefix="/api")
app.include_router(chatbot_router, prefix="/api")