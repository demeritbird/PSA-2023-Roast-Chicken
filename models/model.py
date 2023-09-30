import openai
import environ
import sys
import os
import json
from pathlib import Path
from database import create_database, delete_embedding, delete_database
from calculation import calculate_assignments, calculate_minimal_reassignments

env = environ.Env()
env.read_env()

# Set up OpenAI API key
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
API_KEY = env("API_KEY", default=None)
if not API_KEY:
    raise Exception("API_KEY not found in environment variables")
openai.api_key = API_KEY

def start(request):
    create_database()
    # Example request
    # json_file_path = os.path.join(BASE_DIR, "examples/request2.json")
    # try:
    #     with open(json_file_path, "r") as file:
    #         request2 = json.load(file)
    #     print(request2)
    # except FileNotFoundError:
    #     print(f"File not found: {json_file_path}")
    # except json.JSONDecodeError as e:
    #     print(f"Error decoding JSON: {e}")

    request3 = json.dumps(request) # Convert to JSON string to mimic actual input

    # calculate_assignments(request)
    return calculate_minimal_reassignments(request3)

# if __name__ == "__main__":
#     # Check if a specific function name is provided as a command line argument
#     if len(sys.argv) >= 2:
#         function_name = sys.argv[1]
#         if function_name == "start":
#             request = sys.argv[2]
#             result = start(request)
#             print(result)
#         else:
#             print(f"Function '{function_name}' not found.")
#     else:
#         print("Usage: python my_script.py [function_name] [optional_args]")

# start(request)

# TODO: 
# - Track the frequency of each skills in projects.
# - Track the number of reassignments.
