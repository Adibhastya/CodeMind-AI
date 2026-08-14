from pathlib import Path


SUPPORTED_EXTENSIONS = {
    ".py",
    ".cs",
    ".js",
    ".ts",
    ".java",
    ".cpp",
    ".c",
    ".h",
    ".html",
    ".css",
    ".json",
    ".xml",
    ".sql",
    ".md"
}

IGNORED_DIRECTORIES = {
    ".git",
    ".venv",
    "node_modules",
    "__pycache__",
    "bin",
    "obj"
}


def scan_project(project_path: str):
    project = Path(project_path)

    files = []

    for file_path in project.rglob("*"):

        if not file_path.is_file():
            continue

        if any(part in IGNORED_DIRECTORIES for part in file_path.parts):
            continue

        if file_path.suffix.lower() not in SUPPORTED_EXTENSIONS:
            continue

        files.append(file_path)

    return files

if __name__ == "__main__":
    result = scan_project("backend/test_project")
        
    print(f"found {len(result)} files:")

    for file in result:
        print(file)