def chunk_code(code_data: dict, chunk_size: int = 20):

    content = code_data["content"]

    lines = content.splitlines()

    chunks = []

    for start in range(0, len(lines), chunk_size):

        end = start + chunk_size

        chunk_lines = lines[start:end]

        chunk_content = "\n".join(chunk_lines)

        chunks.append({
            "file_name": code_data["file_name"],
            "file_path": code_data["file_path"],
            "extension": code_data["extension"],
            "start_line": start + 1,
            "end_line": min(end, len(lines)),
            "content": chunk_content
        })

    return chunks


if __name__ == "__main__":

    sample = {
        "file_name": "Employee.cs",
        "file_path": "backend/test_project/Employee.cs",
        "extension": ".cs",
        "content": """public class Employee
{
    public int Id { get; set; }
    public string Name { get; set; }
}"""
    }

    result = chunk_code(sample, chunk_size=2)

    for chunk in result:
        print(chunk)

