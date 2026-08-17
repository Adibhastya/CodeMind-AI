from fastapi import APIRouter, UploadFile, File, HTTPException
from pathlib import Path
import zipfile
import shutil

from backend.services.code_parser.file_scanner import scan_project
from backend.services.code_parser.code_reader import read_code_file
from backend.services.indexing.indexing_service import index_project
from backend.services.vector_store.chroma_service import reset_collection

router = APIRouter()

UPLOAD_DIR = Path("uploads")

MAX_FILE_SIZE = 50 * 1024 * 1024  # 50 MB


@router.post("/upload")
async def upload_project(file: UploadFile = File(...)):

    # Check file type
    if not file.filename or not file.filename.lower().endswith(".zip"):
        raise HTTPException(
            status_code=400,
            detail="Only ZIP files are supported."
        )

    # Read uploaded file
    file_content = await file.read()

    # Check 50 MB size limit
    if len(file_content) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=413,
            detail="ZIP file is too large. Maximum allowed size is 50 MB."
        )

    project_name = Path(file.filename).stem
    project_dir = UPLOAD_DIR / project_name

    # Remove old project with same name
    if project_dir.exists():
        shutil.rmtree(project_dir)

    project_dir.mkdir(parents=True, exist_ok=True)

    zip_path = project_dir / file.filename

    # Save ZIP
    with open(zip_path, "wb") as buffer:
        buffer.write(file_content)

    # Extract ZIP
    try:
        with zipfile.ZipFile(zip_path, "r") as zip_ref:
            zip_ref.extractall(project_dir)

    except zipfile.BadZipFile:
        shutil.rmtree(project_dir, ignore_errors=True)

        raise HTTPException(
            status_code=400,
            detail="Invalid or corrupted ZIP file."
        )

    # Delete ZIP after extraction
    zip_path.unlink()

    # Scan uploaded project files
    project_files = scan_project(str(project_dir))

    code_files = []

    for file_path in project_files:
        code_data = read_code_file(str(file_path))

        if code_data:
            code_files.append(code_data)

    reset_collection()
    # Automatically index uploaded project
    indexed_chunks = index_project(str(project_dir))

    return {
        "message": "Project uploaded and indexed successfully",
        "project": file.filename,
        "total_files": len(code_files),
        "indexed_chunks": indexed_chunks,
        "max_upload_size": "50 MB",
        "location": str(project_dir)
    }