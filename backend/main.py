from fastapi import FastAPI
from backend.api.upload import router as upload_router
from backend.api.ask import router as ask_router
from backend.api.impact import router as impact_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "CodeMind AI is running"}

app.include_router(upload_router, prefix="/api")
app.include_router(ask_router, prefix="/api")
app.include_router(impact_router, prefix="/api")