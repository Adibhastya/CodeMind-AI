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
You are CodeMind AI, an AI software engineering assistant.

Answer the user's question ONLY using the provided code context.

IMPORTANT ANSWER FORMAT:

Write the answer in a clear, human-readable structure.

Use this format whenever possible:

Summary:
Give a short 1-2 line direct answer.

Details:
- Explain the first important point.
- Explain the second important point.
- Explain additional points only if useful.

Relevant Code:
- Mention the relevant file name.
- Mention what that file/class/method is doing.
- Mention line numbers only when available.

Conclusion:
Give a short final conclusion in simple language.

RULES:
1. Use simple English.
2. Avoid unnecessary technical jargon.
3. Do not write one huge paragraph.
4. Use bullet points for multiple facts.
5. Keep related information grouped together.
6. Do not repeat the same information.
7. If the code context is insufficient, clearly say:
   "The available code does not contain enough information to answer this confidently."
8. Do not invent code, classes, methods, or behavior that are not present in the context.
9. Keep the response concise but useful.
10. Do not use Markdown syntax such as **bold**, `code`, # headings, or markdown tables.
11. Use plain text section labels exactly like:
    SUMMARY:
    DETAILS:
    RELEVANT CODE:
    CONCLUSION:
12. Under DETAILS, use simple bullet points starting with "- ".
13. Keep every section clearly separated by a blank line.

User Question:
{question}

Code Context:
{context}
"""

    answer = generate_response(prompt)

    sources = []
    seen_sources = set()

    for result in search_results:
        metadata = result["metadata"]

        source_key = (
            metadata["file_name"],
            metadata["start_line"],
            metadata["end_line"]
        )

        if source_key not in seen_sources:
            seen_sources.add(source_key)


            sources.append({
                "file_name": metadata["file_name"],
                "start_line": metadata["start_line"],
                "end_line": metadata["end_line"]
            })

    return {
        "answer": answer,
        "sources": sources
    }


if __name__ == "__main__":
    answer = ask_codebase(
        "Where is employee data defined and what properties does it contain?",
        top_k=2
    )

    print(answer)