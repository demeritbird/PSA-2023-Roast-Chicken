import openai
import json
import environ
import sys
from pathlib import Path
from sklearn.metrics.pairwise import cosine_similarity
from time import sleep
from utils import get_description, get_embedding, get_employees, get_projects

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


def calculate_similarities(request, top_n=3):
    # Retrieve parameters
    data = json.loads(request)
    employees = get_employees(data)
    projects = get_projects(data)

    for employee in employees:
        skills = employee.get('skills')
        skill_embeddings = [get_embedding(
            get_description(skill)) for skill in skills]
        # Average the embeddings
        avg_embedding = [sum(x)/len(x) for x in zip(*skill_embeddings)]
        employee['skill_embeddings'] = avg_embedding

    for project in projects:
        skills_needed = project.get('skills_needed')
        skill_embeddings = [get_embedding(
            get_description(skill)) for skill in skills_needed]
        # Average the embeddings
        avg_embedding = [sum(x)/len(x) for x in zip(*skill_embeddings)]
        project['skill_needed_embeddings'] = avg_embedding

    # Assign projects to employees based on similarity scores
    assignments = {}
    for employee in employees:
        similarity_scores = []
        for project in projects:
            score = cosine_similarity([employee['skill_embeddings']], [
                                      project['skill_needed_embeddings']])[0][0]
            # Fix the KeyError here
            similarity_scores.append((project['team_id'], score))

        # Sort projects based on similarity scores and get top_n projects
        top_projects = sorted(
            similarity_scores, key=lambda x: x[1], reverse=True)[:top_n]
        assignments[employee['emp_id']] = [
            project_id for project_id, _ in top_projects]

    print(assignments)
    return assignments


request = [[{"id": 1, "name": "john", "skills": ["javascript"], "team": 101}, {"id": 2, "name": "jane", "skills": ["python"], "team": 102}], [{"id": 101, "skills_needed": ["javascript"], "members": [
    {"id": 1, "name": "john", "skills": "javascript", "team": 101}]}, {"id": 102, "skills_needed": ["python"], "members": [{"id": 2, "name": "jane", "skills": ["python"], "team": 102}]}]]
request = json.dumps(request)
calculate_similarities(request)
