from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from core.jwt import verify_jwt_token

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Hello, World!"}


@app.get("/api/public")
def public():
    return {"message": "This is a public endpoint"}


@app.get("/api/protected-route")
async def protected_route(payload: dict = Depends(verify_jwt_token)):

    return {"message": "This is a protected route!", "user_data": payload}
