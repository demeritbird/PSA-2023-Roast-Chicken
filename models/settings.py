import os
import environ
from pathlib import Path

env = environ.Env()
env.read_env()

BASE_DIR = Path(__file__).resolve().parent.parent
API_KEY = env("API_KEY")
