from fastapi import APIRouter, Depends, Request
from src.app.core.jwt import verify_jwt_token
from src.app.core.github import GitHub
from pydantic import BaseModel

router = APIRouter()
github = GitHub()


class LoginData(BaseModel):
    access_token: str
    refresh_token: str


@router.post("/login")
async def login(login_data: LoginData, payload: dict = Depends(verify_jwt_token)):
    token_data = {
        "user_id": payload["sub"],
        "access_token": login_data.access_token,
        "refresh_token": login_data.refresh_token,
    }
    await github.store_access_token(token_data)

    return {"message": "Token Stored Succesfully"}


@router.get("/repo")
async def get_repos(payload: dict = Depends(verify_jwt_token)):
    user = {
        "id": payload["sub"],
        "user_name": payload["user_metadata"]["preferred_username"],
    }

    res = await github.get_repos(user=user)

    return res


@router.get("/repo/{repo_name}")
async def get_repo(repo_name: str, payload: dict = Depends(verify_jwt_token)):
    user = {
        "id": payload["sub"],
        "user_name": payload["user_metadata"]["preferred_username"],
    }

    res = await github.get_repo(user=user, repo_name=repo_name)

    return res
