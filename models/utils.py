import openai
import sqlite3
import json
from time import sleep


def get_description(skill):
    prompt = "What is " + skill + "? Summarize in 150 words or less."
    response = openai.ChatCompletion.create(
        model="gpt-4",
        max_tokens=50,
        messages=[
            {"role": "user", "content": prompt}
        ],
    )
    sleep(1)
    return response.choices[0]["message"]["content"]


def get_embedding(description):
    sleep(10)
    return openai.Embedding.create(input=[description], model="text-embedding-ada-002")['data'][0]['embedding']

def get_embedding_from_db(description, skill, db_path="embeddings.db"):
    """
    Retrieves the embedding for a given skill from the database.
    If the embedding does not exist in the database, it fetches the embedding using the get_embedding function
    and then stores it in the database.

    Args:
    - skill (str): The skill for which the embedding is needed.
    - db_path (str): Path to the SQLite3 database. Default is "embeddings.db".

    Returns:
    - list: The embedding for the given skill.
    """
    # Connect to the database
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # Try to retrieve the embedding for the given skill
    cursor.execute("SELECT embedding FROM skill_embeddings WHERE skill=?", (skill,))
    result = cursor.fetchone()

    if result:
        # If the embedding exists in the database, retrieve and return it
        embedding = json.loads(result[0])
    else:
        # If the embedding does not exist, fetch it using the get_embedding function
        print(f"Embedding for '{skill}' not found in database. Fetching it now...")
        try:
            embedding = get_embedding(description)
        except Exception as e:
            print(f"Error fetching embedding for '{skill}': {e}")
            return None

        # Convert the embedding list to a string format and store it in the database
        cursor.execute("INSERT INTO skill_embeddings (skill, embedding) VALUES (?, ?)", (skill, json.dumps(embedding)))
        conn.commit()

    # Close the database connection
    conn.close()

    return embedding


def get_employees(data):
    result = []
    for employee in data[0]:
        emp_id = employee.get('id')
        name = employee.get('name')
        skills = employee.get('skills')
        team = employee.get('team')
        result.append({"emp_id": emp_id, "name": name,
                      "skills": skills, "team": team})
    return result


def get_projects(data):
    result = []
    for project in data[1]:
        team_id = project.get('id')
        skills_needed = project.get('skills_needed')
        members = project.get('members')
        result.append(
            {"team_id": team_id, "skills_needed": skills_needed, "members": members})
    return result
