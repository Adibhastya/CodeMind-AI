from backend.services.embeddings.embedding_service import generate_embedding
from backend.services.vector_store.chroma_service import search_code_chunks



def search_code(query: str, top_k: int = 3):
    query_embedding = generate_embedding(query)

    results = search_code_chunks(
        query_embedding=query_embedding,
        top_k=top_k
    )

    clean_results = []

    for i in range(len(results["ids"][0])):
        clean_results.append({
            "id": results["ids"][0][i],
            "content": results["documents"][0][i],
            "metadata": results["metadatas"][0][i],
            "distance": results["distances"][0][i]
        })

    return clean_results


if __name__ == "__main__":
    results = search_code(
        "Where is employee data defined?",
        top_k=2
    )

    print(results)