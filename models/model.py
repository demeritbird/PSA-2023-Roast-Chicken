import openai
import json
import environ
from pathlib import Path
from sklearn.metrics.pairwise import cosine_similarity
from time import sleep
import sys

env = environ.Env()
env.read_env()

# Set up OpenAI API key
BASE_DIR = Path(__file__).resolve().parent.parent
API_KEY = env("API_KEY", default=None)
if not API_KEY:
    raise Exception("API_KEY not found in environment variables")
openai.api_key = API_KEY

if __name__ == "__main__":
    # Check if a specific function name is provided as a command line argument
    if len(sys.argv) == 2:
        function_name = sys.argv[1]
        if function_name == "calculate_similarities":
            result = calculate_similarities()
            print(result)
        else:
            print(f"Function '{function_name}' not found.")
    else:
        print("Usage: python my_script.py [function_name]")


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


def calculate_similarities(request):
    # Retrieve parameters
    data = json.loads(request.body)

    # data_json = '[[{"id": 1, "name": "john", "skills": "javascript", "team": 101}, {"id": 2, "name": "jane", "skills": ["python"], "team": 102}], [{"id": 101, "skills_needed": ["javascript"], "members": [{"id": 1, "name": "john", "skills": "javascript", "team": 101}]}, {"id": 102, "skills_needed": ["python"], "members": [{"id": 2, "name": "jane", "skills": ["python"], "team": 102}]}]]'
    # data = json.loads(data_json)

    result = json.dumps(data)

    return result
    # param1 = data.get('param1')
    # param2 = data.get('param2')

    # skills = ["javascript", "css"]
    # descriptions = {skill: get_description(skill) for skill in skills}
    # embeddings = {skill: get_embedding(desc)
    #               for skill, desc in descriptions.items()}

    # similarities = {}
    # for i, skill1 in enumerate(skills):
    #     for j, skill2 in enumerate(skills):
    #         if i < j:
    #             similarity = cosine_similarity(
    #                 [embeddings[skill1]], [embeddings[skill2]])
    #             similarities[(skill1, skill2)] = similarity[0][0]

    # result = json.dumps(similarities)
    # return result

