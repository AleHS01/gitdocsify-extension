from dotenv import load_dotenv
import os
from openai import OpenAI

load_dotenv()

api_key = os.getenv("OPENAI_KEY")
open_ai_client = OpenAI(api_key=api_key)
