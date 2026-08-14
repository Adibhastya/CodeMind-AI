from pathlib import Path


def read_code_file(file_path: str):
    path = Path(file_path)

    try:
        content = path.read_text(encoding="utf-8")

        return {
            "file_name": path.name,
            "file_path": str(path),
            "extension": path.suffix,
            "content": content,
            "line_count": len(content.splitlines())
        }

    except UnicodeDecodeError:
        return None


if __name__ == "__main__":
    result = read_code_file("backend/test_project/Employee.cs")
    print(result)