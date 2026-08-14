from fastapi import APIRouter
from pydantic import BaseModel

from backend.services.rag.rag_service import ask_codebase


router = APIRouter()


class AskRequest(BaseModel):
    question: str


@router.post("/ask")
def ask_question(request: AskRequest):

    result = ask_codebase(request.question)

    return {
        "question": request.question,
        "answer": result["answer"],
        "sources": result["sources"]
    }