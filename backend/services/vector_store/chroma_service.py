import chromadb


client = chromadb.PersistentClient(path="chroma_db")

collection = client.get_or_create_collection(
    name="code_chunks"
)

def add_code_chunk(
    chunk_id: str,
    content: str,
    embedding: list,
    metadata: dict
):

    collection.add(
        ids=[chunk_id],
        documents=[content],
        embeddings=[embedding],
        metadatas=[metadata]
    )

def search_code_chunks(query_embedding: list, top_k: int = 3):
    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=top_k
    )

    return results


if __name__ == "__main__":

    test_embedding = [0.1] * 384

    add_code_chunk(
        chunk_id="employee_chunk_1",
        content="public class Employee { public int Id { get; set; } }",
        embedding=test_embedding,
        metadata={
            "file_name": "Employee.cs",
            "start_line": 1,
            "end_line": 5
        }
    )

    results = search_code_chunks(
        query_embedding=test_embedding,
        top_k=1
    )

    print(results)