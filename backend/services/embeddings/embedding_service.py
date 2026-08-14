from sentence_transformers import SentenceTransformer


MODEL_NAME = "sentence-transformers/all-MiniLM-L6-v2"

model = SentenceTransformer(MODEL_NAME)


def generate_embedding(text: str):
    embedding = model.encode(text)

    return embedding.tolist()

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