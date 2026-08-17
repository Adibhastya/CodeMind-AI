from fastapi import APIRouter
from pydantic import BaseModel

from backend.services.llm.openrouter_service import generate_response


router = APIRouter()


class ChatbotRequest(BaseModel):
    message: str


def is_casual_message(message: str) -> bool:
    casual_messages = {
        "hi",
        "hello",
        "hey",
        "thanks",
        "thank you",
        "thankyou",
        "okay",
        "ok",
        "got it",
        "bye",
        "how are you",
        "how are you?",
        "how r u",
        "how r u?",
        "what's up",
        "whats up",
        "good morning",
        "good afternoon",
        "good evening",
    }

    return message.strip().lower() in casual_messages


def is_coding_question(message: str) -> bool:
    coding_keywords = [
        "programming",
        "coding",
        "code",
        "oops",
        "oop",
        "class",
        "object",
        "constructor",
        "datatype",
        "data type",
        "variable",
        "function",
        "method",
        "array",
        "list",
        "dictionary",
        "exception",
        "interface",
        "inheritance",
        "polymorphism",
        "encapsulation",
        "abstraction",
        "c#",
        ".net",
        "java",
        "python",
        "javascript",
        "typescript",
        "angular",
        "react",
        "html",
        "css",
        "sql",
        "database",
        "api",
        "rest",
        "git",
        "github",
        "npm",
        "node",
        "nodejs",
        "debug",
        "error",
        "framework",
        "frontend",
        "backend",
        "cloud",
        "azure",
        "aws",
        "docker",
        "kubernetes",
        "algorithm",
        "data structure",
        "compiler",
        "software",
        "developer",
        "development",
    ]

    text = message.lower()

    return any(keyword in text for keyword in coding_keywords)


@router.post("/chatbot")
def chatbot(request: ChatbotRequest):
    user_message = request.message.strip()

    # Normal greetings / casual conversation
    if is_casual_message(user_message):
        prompt = f"""
You are CodeMind Coding Assistant.

Reply naturally and briefly to the user's casual message.

Language rules:
- English -> English
- Hindi/Hinglish -> Hindi/Hinglish
- Kannada -> Kannada

User:
{user_message}
"""

        answer = generate_response(prompt)

        return {
            "message": user_message,
            "answer": answer,
        }

    # Block non-coding questions before calling the LLM
    if not is_coding_question(user_message):
        return {
            "message": user_message,
            "answer": (
                "I mainly help with programming, software development, "
                "developer tools, frameworks, databases, APIs, cloud, "
                "debugging, and other coding-related topics."
            ),
        }

    # Coding question
    prompt = f"""
You are CodeMind Coding Assistant.

Answer the user's programming or software-development question.

You can help with:
- Programming languages
- OOP
- Data types
- C#
- .NET
- Java
- Python
- JavaScript
- TypeScript
- Angular
- React
- SQL and databases
- APIs
- Git and GitHub
- npm and Node.js
- Cloud
- Debugging
- Developer tools
- Computer science
- Software engineering

LANGUAGE RULES:
1. English question -> answer in English.
2. Hindi/Hinglish question -> answer naturally in Hindi/Hinglish.
3. Kannada question -> answer in Kannada.
4. If a particular language is requested, use that language.

ANSWER RULES:
1. Keep explanations clear and beginner-friendly.
2. Explain technical terminology simply.
3. Give examples where useful.
4. Do not invent technical information.
5. Keep simple questions reasonably concise.

User:
{user_message}
"""

    answer = generate_response(prompt)

    return {
        "message": user_message,
        "answer": answer,
    }