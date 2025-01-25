from fastapi import FastAPI
from dotenv import load_dotenv

# from api.auth import auth_router

load_dotenv()

app = FastAPI()


@app.get("/")
def root():
    return {"message": "Hello, World!"}


# app.include_router(auth_router, prefix="/api", tags=["auth"])
