import json
from sklearn.metrics.pairwise import cosine_similarity
from tqdm import tqdm
from utils import get_description, get_embedding, get_employees, get_projects, get_embedding_from_db

def calculate_assignments(request, top_n=3):
    # Retrieve parameters
    data = json.loads(request)
    employees = get_employees(data)
    projects = get_projects(data)

    for employee in employees:
        skills = employee.get('skills')
        skill_embeddings = [get_embedding_from_db(
            get_description(skill), skill) for skill in skills]
        # Average the embeddings
        avg_embedding = [sum(x)/len(x) for x in zip(*skill_embeddings)]
        employee['skill_embeddings'] = avg_embedding

    for project in projects:
        skills_needed = project.get('skills_needed')
        skill_embeddings = [get_embedding_from_db(
            get_description(skill), skill) for skill in skills_needed]
        # Average the embeddings
        avg_embedding = [sum(x)/len(x) for x in zip(*skill_embeddings)]
        project['skill_needed_embeddings'] = avg_embedding

    # Assign projects to employees based on similarity scores
    assignments = {}
    for employee in tqdm(employees, desc="Fetching embeddings for skills"):
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
    return json.dumps(assignments)

def calculate_minimal_reassignments(request, top_n=3, threshold=0.95):
    # Retrieve parameters
    data = json.loads(request)
    employees = get_employees(data)
    projects = get_projects(data)

    for employee in employees:
        skills = employee.get('skills')
        skill_embeddings = [get_embedding_from_db(
            get_description(skill), skill) for skill in skills]
        # Average the embeddings
        avg_embedding = [sum(x)/len(x) for x in zip(*skill_embeddings)]
        employee['skill_embeddings'] = avg_embedding

    for project in projects:
        skills_needed = project.get('skills_needed')
        skill_embeddings = [get_embedding_from_db(
            get_description(skill), skill) for skill in skills_needed]
        # Average the embeddings
        avg_embedding = [sum(x)/len(x) for x in zip(*skill_embeddings)]
        project['skill_needed_embeddings'] = avg_embedding

    # Assign projects to employees based on similarity scores
    assignments = {}
    for employee in tqdm(employees, desc="Fetching embeddings for skills"):
        similarity_scores = []
        for project in projects:
            score = cosine_similarity([employee['skill_embeddings']], [
                                      project['skill_needed_embeddings']])[0][0]
            similarity_scores.append((project['team_id'], score))

        # Sort projects based on similarity scores and get top_n projects
        top_projects = sorted(
            similarity_scores, key=lambda x: x[1], reverse=True)[:top_n]

        # Check if the current project is among the top_n projects and if the similarity score is above the threshold
        current_project = employee.get('team')
        if current_project in [project_id for project_id, _ in top_projects] and any(score > threshold for _, score in top_projects):
            assignments[employee['emp_id']] = [current_project]
        else:
            assignments[employee['emp_id']] = [
                project_id for project_id, _ in top_projects]

    print(assignments)
    return json.dumps(assignments)
