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
You are CodeMind AI performing software change impact analysis.

Analyze the requested code change using only the provided code context.

Return:
1. Impact level: LOW, MEDIUM, or HIGH
2. Potentially affected files
3. Why each file may be affected
4. Possible risks
5. Recommended tests

If the available code is insufficient, clearly say so.

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