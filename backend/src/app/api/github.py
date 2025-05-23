from fastapi import APIRouter, Depends, HTTPException
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

    return await github.get_repos(user=user)


@router.get("/repo/{repo_name}")
async def get_repo(repo_name: str, payload: dict = Depends(verify_jwt_token)):
    user = {
        "id": payload["sub"],
        "user_name": payload["user_metadata"]["preferred_username"],
    }

    return await github.get_repo(user=user, repo_name=repo_name)


@router.get("/repo/{repo_name}/collaborators")
async def get_repo_collaborators(
    repo_name: str, payload: dict = Depends(verify_jwt_token)
):
    user = {
        "id": payload["sub"],
        "user_name": payload["user_metadata"]["preferred_username"],
    }

    return await github.get_collaborators(user=user, repo_name=repo_name)


@router.get("/repo/{repo_name}/files/{branch_name}")
async def get_repo_file(
    repo_name: str, branch_name: str, payload: dict = Depends(verify_jwt_token)
):
    user = {
        "id": payload["sub"],
        "user_name": payload["user_metadata"]["preferred_username"],
    }

    return await github.get_files(
        user=user, repo_name=repo_name, branch_name=branch_name
    )


@router.post("/repo/{repo_name}/{branch_name}/push-readme")
async def push_readme(
    repo_name: str,
    branch_name: str,
    payload: dict = Depends(verify_jwt_token),
    readme_data: dict = None,
):
    user = {
        "id": payload["sub"],
        "user_name": payload["user_metadata"]["preferred_username"],
    }
    if not readme_data or "content" not in readme_data:
        raise HTTPException(status_code=400, detail="README content is required")

    return await github.push_readme_and_create_pr(
        user=user,
        repo_name=repo_name,
        branch_name=branch_name,
        readme_content=readme_data["content"],
    )
