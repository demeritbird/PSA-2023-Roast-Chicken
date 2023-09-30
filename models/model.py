import openai
import json
import environ
import sys
from pathlib import Path
from database import create_database, delete_embedding, delete_database
from calculation import calculate_assignments, calculate_minimal_reassignments

env = environ.Env()
env.read_env()

# Set up OpenAI API key
BASE_DIR = Path(__file__).resolve().parent.parent
API_KEY = env("API_KEY", default=None)
if not API_KEY:
    raise Exception("API_KEY not found in environment variables")
openai.api_key = API_KEY

def start(request):
    create_database()
    # Example request
    # request = [
    #     [
    #         {"id": 1, "name": "john", "skills": ["javascript"], "team": 101},
    #         {"id": 2, "name": "jane", "skills": ["python"], "team": 102},
    #         {"id": 3, "name": "alice", "skills": ["java", "spring"], "team": 103},
    #         {"id": 4, "name": "bob", "skills": ["c++", "qt"], "team": 104},
    #         {"id": 5, "name": "charlie", "skills": ["ruby", "rails"], "team": 105},
    #         {"id": 6, "name": "dave", "skills": ["php", "laravel"], "team": 106},
    #         {"id": 7, "name": "eve", "skills": ["go"], "team": 107},
    #         {"id": 8, "name": "frank", "skills": ["rust"], "team": 108},
    #         {"id": 9, "name": "grace", "skills": ["typescript", "angular"], "team": 109},
    #         {"id": 10, "name": "hank", "skills": ["swift"], "team": 110}
    #     ],
    #     [
    #         {"id": 101, "skills_needed": ["java"], "members": [{"id": 1, "name": "john", "skills": "javascript", "team": 101}]},
    #         {"id": 102, "skills_needed": ["python"], "members": [{"id": 2, "name": "jane", "skills": ["python"], "team": 102}]},
    #         {"id": 103, "skills_needed": ["javascript", "spring"], "members": [{"id": 3, "name": "alice", "skills": ["java", "spring"], "team": 103}]},
    #         {"id": 104, "skills_needed": ["c++"], "members": [{"id": 4, "name": "bob", "skills": ["c++", "qt"], "team": 104}]},
    #         {"id": 105, "skills_needed": ["ruby"], "members": [{"id": 5, "name": "charlie", "skills": ["ruby", "rails"], "team": 105}]},
    #         {"id": 106, "skills_needed": ["php"], "members": [{"id": 6, "name": "dave", "skills": ["php", "laravel"], "team": 106}]},
    #         {"id": 107, "skills_needed": ["go"], "members": [{"id": 7, "name": "eve", "skills": ["go"], "team": 107}]},
    #         {"id": 108, "skills_needed": ["rust"], "members": [{"id": 8, "name": "frank", "skills": ["rust"], "team": 108}]},
    #         {"id": 109, "skills_needed": ["typescript"], "members": [{"id": 9, "name": "grace", "skills": ["typescript", "angular"], "team": 109}]},
    #         {"id": 110, "skills_needed": ["swift", "typescript", "angular"], "members": [{"id": 10, "name": "hank", "skills": ["swift"], "team": 110}]}
    #     ]
    # ]
    # Notice for swaps between 1 and 3, 9 and 10

    # calculate_assignments(request)
    calculate_minimal_reassignments(request)

if __name__ == "__main__":
    # Check if a specific function name is provided as a command line argument
    if len(sys.argv) >= 2:
        function_name = sys.argv[1]
        if function_name == "start":
            request = sys.argv[2]
            result = start(request)
            print(result)
        else:
            print(f"Function '{function_name}' not found.")
    else:
        print("Usage: python my_script.py [function_name] [optional_args]")

# start()