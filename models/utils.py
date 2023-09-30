import openai
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
