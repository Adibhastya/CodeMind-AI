from backend.services.search.search_service import search_code
from backend.services.llm.openrouter_service import generate_response



def analyze_impact(change_request: str, top_k: int = 5):
    search_results = search_code(change_request, top_k=top_k)

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

Analyze the proposed code change ONLY using the provided code context.

IMPORTANT ANSWER FORMAT:

IMPACT LEVEL:
Write only one value:
LOW
MEDIUM
HIGH

AFFECTED FILES:
- Mention the potentially affected file.
- Briefly explain why it may be affected.

WHY THIS CHANGE MATTERS:
- Explain the impact in simple language.
- Keep every point short and clear.

POSSIBLE RISKS:
- Mention realistic risks based only on the provided code.
- Do not invent risks.

RECOMMENDED TESTS:
- Mention practical tests that should be performed.
- Keep them relevant to the proposed change.

CONCLUSION:
Give a short 1-2 line conclusion about the overall impact.

RULES:
1. Use simple English.
2. Do not write one large paragraph.
3. Use bullet points starting with "- ".
4. Do not use Markdown syntax such as **bold**, `code`, # headings, or tables.
5. Use the section labels exactly as written above.
6. Keep a blank line between sections.
7. Do not repeat the same information.
8. Do not invent files, methods, classes, or behavior.
9. If the code context is insufficient, clearly say:
   "The available code does not contain enough information to analyze this change confidently."

Requested Change:
{change_request}

Code Context:
{context}
"""

    return generate_response(prompt)


if __name__ == "__main__":
    result = analyze_impact(
        "If I change EmployeeService.GetEmployeeName(), what could be affected?",
        top_k=5
    )

    print(result)