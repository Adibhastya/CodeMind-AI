import chromadb


client = chromadb.PersistentClient(path="chroma_db")

COLLECTION_NAME = "code_chunks"


def get_collection():
    return client.get_or_create_collection(
        name=COLLECTION_NAME
    )


collection = get_collection()


def reset_collection():
    global collection

    try:
        client.delete_collection(
            name=COLLECTION_NAME
        )
    except Exception:
        pass

    collection = client.get_or_create_collection(
        name=COLLECTION_NAME
    )


def add_code_chunk(
    chunk_id: str,
    content: str,
    embedding: list,
    metadata: dict
):
    collection.upsert(
        ids=[chunk_id],
        documents=[content],
        embeddings=[embedding],
        metadatas=[metadata]
    )


def search_code_chunks(
    query_embedding: list,
    top_k: int = 3
):
    count = collection.count()

    if count == 0:
        return {
            "ids": [[]],
            "documents": [[]],
            "metadatas": [[]],
            "distances": [[]]
        }

    safe_top_k = min(top_k, count)

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=safe_top_k
    )

    return results


if __name__ == "__main__":
    test_embedding = [0.1] * 384

    reset_collection()

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