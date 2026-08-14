from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "CodeMind AI is running"}