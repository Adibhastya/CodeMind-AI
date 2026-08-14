from fastapi import FastAPI
from backend.api.upload import router as upload_router

app = FastAPI()

@app.get("/")
def home():
    return {"message": "CodeMind AI is running"}

app.include_router(upload_router, prefix="/api")