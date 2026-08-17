from sentence_transformers import SentenceTransformer


MODEL_NAME = "sentence-transformers/all-MiniLM-L6-v2"

model = None


def get_model():
    global model

    if model is None:
        print("Loading embedding model...")
        model = SentenceTransformer(MODEL_NAME)
        print("Embedding model loaded.")

    return model


def generate_embedding(text: str):
    embedding_model = get_model()

    embedding = embedding_model.encode(text)

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