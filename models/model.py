import openai
from sklearn.metrics.pairwise import cosine_similarity
from time import sleep

# Set up OpenAI API key
openai.api_key = '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'


def get_description(skill):
    prompt = "What is " + skill + "? Summarize in 150 words or less."
    response = openai.ChatCompletion.create(
        model="gpt-4",
        max_tokens=50,
        messages=[
            {"role": "user", "content": prompt}
        ],
    )
    sleep(0.5)
    return response.choices[0]["message"]["content"]


def get_embedding(description):
    return openai.Embedding.create(input=[description], model="text-embedding-ada-002")['data'][0]['embedding']


# List of skills
# skills = ["Python", "JavaScript", "Java", "C#",
#           "PHP", "C++", "Rust", "Go", "Swift", "TypeScript"]
skills = ["javascript", "css"]

# Get descriptions and embeddings for each skill
descriptions = {skill: get_description(skill) for skill in skills}
embeddings = {skill: get_embedding(desc)
              for skill, desc in descriptions.items()}

# Calculate cosine similarity between each pair of skills
similarities = {}
for i, skill1 in enumerate(skills):
    for j, skill2 in enumerate(skills):
        if i < j:
            similarity = cosine_similarity(
                [embeddings[skill1]], [embeddings[skill2]])
            similarities[(skill1, skill2)] = similarity[0][0]

# Print similarities
for (skill1, skill2), similarity in similarities.items():
    print(f"Similarity between {skill1} and {skill2}: {similarity:.2f}")
