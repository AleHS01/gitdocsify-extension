from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from src.app.core.jwt import verify_jwt_token
from src.app.api.endpoints import router as api_router

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api", tags=["API"])


@app.get("/")
def root():
    return {"message": "Hello, World!"}


@app.get("/api/public")
def public():
    return {"message": "This is a public endpoint"}


@app.get("/api/protected-route")
async def protected_route(payload: dict = Depends(verify_jwt_token)):

    return {"message": "This is a protected route!", "user_data": payload}
