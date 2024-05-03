from dotenv import load_dotenv
import os

current_dir = os.getcwd()

env_path = os.path.join(current_dir, '.env')

load_dotenv(env_path)

def load_var(var_name):
    return os.getenv(var_name)