from fastapi import APIRouter
from pydantic import BaseModel

from backend.services.impact.impact_service import analyze_impact


router = APIRouter()


class ImpactRequest(BaseModel):
    change_request: str


@router.post("/impact")
def impact_analysis(request: ImpactRequest):

    result = analyze_impact(request.change_request)

    return {
        "change_request": request.change_request,
        "analysis": result
    }