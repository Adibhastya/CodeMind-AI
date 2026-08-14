from backend.services.search.search_service import search_code
from backend.services.llm.openrouter_service import generate_response



def ask_codebase(question: str, top_k: int = 3):
    search_results = search_code(question, top_k=top_k)

    context_parts = []

    for result in search_results:
        metadata = result["metadata"]

        context_parts.append(
            f"""
File: {metadata['file_name']}
Lines: {metadata['start_line']}-{metadata['end_line']}

Code:
{result['content']}
"""
        )

    context = "\n".join(context_parts)

    prompt = f"""
You are CodeMind AI, a software engineering assistant.

Answer the user's question using only the provided code context.

If the answer cannot be determined from the context, say that clearly.

User Question:
{question}

Code Context:
{context}
"""

    return generate_response(prompt)



if __name__ == "__main__":
    answer = ask_codebase(
        "Where is employee data defined and what properties does it contain?",
        top_k=2
    )

    print(answer)