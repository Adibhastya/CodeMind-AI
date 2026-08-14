from backend.services.code_parser.file_scanner import scan_project
from backend.services.code_parser.code_reader import read_code_file
from backend.services.code_parser.code_chunker import chunk_code
from backend.services.embeddings.embedding_service import generate_embedding
from backend.services.vector_store.chroma_service import add_code_chunk



def index_project(project_path: str):
    project_files = scan_project(project_path)

    total_chunks = 0

    for file_path in project_files:
        code_data = read_code_file(str(file_path))

        if not code_data:
            continue

        chunks = chunk_code(code_data)

        for index, chunk in enumerate(chunks):
            embedding = generate_embedding(chunk["content"])

            chunk_id = f"{chunk['file_name']}_{index}"

            metadata = {
                "file_name": chunk["file_name"],
                "file_path": chunk["file_path"],
                "start_line": chunk["start_line"],
                "end_line": chunk["end_line"],
                "extension": chunk["extension"]
            }

            add_code_chunk(
                chunk_id=chunk_id,
                content=chunk["content"],
                embedding=embedding,
                metadata=metadata
            )

            total_chunks += 1

    return total_chunks


if __name__ == "__main__":
    total = index_project("backend/test_project")

    print("Total chunks indexed:", total)