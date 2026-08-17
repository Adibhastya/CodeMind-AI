import os
import requests
from dotenv import load_dotenv


load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

EMBEDDING_MODEL = "nvidia/llama-nemotron-embed-vl-1b-v2:free"

EMBEDDING_URL = "https://openrouter.ai/api/v1/embeddings"


def generate_embedding(text: str):
    if not OPENROUTER_API_KEY:
        raise ValueError("OPENROUTER_API_KEY is not configured.")

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
    }

    payload = {
        "model": EMBEDDING_MODEL,
        "input": text,
    }

    response = requests.post(
        EMBEDDING_URL,
        headers=headers,
        json=payload,
        timeout=60,
    )

    response.raise_for_status()

    data = response.json()

    return data["data"][0]["embedding"]


if __name__ == "__main__":
    sample_code = """
    public class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
    """

    embedding = generate_embedding(sample_code)

    print("Embedding size:", len(embedding))
    print("First 10 values:", embedding[:10])