from fastapi import APIRouter, UploadFile, File
from pathlib import Path
import zipfile
import shutil

from backend.services.code_parser.file_scanner import scan_project


router = APIRouter()

UPLOAD_DIR = Path("uploads")


@router.post("/upload")
async def upload_project(file: UploadFile = File(...)):

    project_name = Path(file.filename).stem
    project_dir = UPLOAD_DIR / project_name

    if project_dir.exists():
        shutil.rmtree(project_dir)

    project_dir.mkdir(parents=True, exist_ok=True)

    zip_path = project_dir / file.filename

    with open(zip_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    with zipfile.ZipFile(zip_path, "r") as zip_ref:
        zip_ref.extractall(project_dir)

    zip_path.unlink()
    project_files = scan_project(str(project_dir))

    return {
        "message": "Project uploaded and scanned successfully",
        "project": file.filename,
        "total_files": len(project_files),
        "files": [str(file) for file in project_files],
        "location": str(project_dir)
    }