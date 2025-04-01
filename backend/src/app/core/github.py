from .supabase import supabase
import httpx
import base64
from fastapi import HTTPException
from datetime import datetime, timezone


class GitHub:
    def __init__(self):
        self.base_url = "https://api.github.com"
        self.base_headers = {
            "X-GitHub-Api-Version": "2022-11-28",
        }

    async def store_access_token(self, token_data: dict):
        if not token_data["access_token"]:
            return

        try:
            supabase.table("user_github_tokens").upsert(
                {
                    "user_id": token_data["user_id"],
                    "github_access_token": token_data["access_token"],
                    "github_refresh_token": token_data["refresh_token"],
                },
                on_conflict=["user_id"],
            ).execute()
        except Exception as e:
            raise HTTPException(
                status_code=500, detail=f"An unexpected error occurred: {e}"
            )

    async def retrieve_access_token(self, user_id: str):
        try:
            result = (
                supabase.table("user_github_tokens")
                .select("github_access_token")
                .eq("user_id", user_id)
                .execute()
            )

            if result.data:
                return result.data[0]["github_access_token"]
            return None
        except Exception as e:
            raise HTTPException(
                status_code=500, detail=f"An unexpected error occurred: {e}"
            )

    async def get_repos(self, user: dict):
        access_token = await self.retrieve_access_token(user["id"])
        url = self.base_url + f"/users/{user['user_name']}/repos"
        headers = {**self.base_headers, "Authorization": f"Bearer {access_token}"}

        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(url, headers=headers)

                return response.json()
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"An unexpected error occurred while fetching repo: {e}",
            )

    async def get_repo(self, user: dict, repo_name: str):
        access_token = await self.retrieve_access_token(user["id"])
        if not access_token:
            raise HTTPException(status_code=401, detail="GitHub access token not found")

        url = self.base_url + f"/repos/{user['user_name']}/{repo_name}"
        headers = {**self.base_headers, "Authorization": f"Bearer {access_token}"}

        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(url, headers=headers)

                return response.json()
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"An unexpected error occurred while fetching repo: {e}",
            )

    async def get_collaborators(self, user: dict, repo_name: str):

        access_token = await self.retrieve_access_token(user["id"])
        if not access_token:
            raise HTTPException(status_code=401, detail="GitHub access token not found")

        url = self.base_url + f"/repos/{user['user_name']}/{repo_name}/collaborators"
        headers = {**self.base_headers, "Authorization": f"Bearer {access_token}"}

        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(url, headers=headers)

                if response.status_code == 403:
                    raise HTTPException(
                        status_code=403, detail="Forbidden: Insufficient permissions"
                    )
                if response.status_code == 404:
                    raise HTTPException(status_code=404, detail="Repository not found")

                return response.json()
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"An unexpected error occurred while fetching collaborators: {e}",
            )

    async def get_files(self, user: dict, repo_name: str, branch_name: str):
        access_token = await self.retrieve_access_token(user["id"])
        if not access_token:
            raise HTTPException(status_code=401, detail="GitHub access token not found")

        url = (
            self.base_url
            + f"/repos/{user['user_name']}/{repo_name}/git/trees/{branch_name}?recursive=1"
        )
        headers = {**self.base_headers, "Authorization": f"Bearer {access_token}"}

        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(url, headers=headers)

                if response.status_code == 403:
                    raise HTTPException(
                        status_code=403, detail="Forbidden: Insufficient permissions"
                    )
                if response.status_code == 404:
                    raise HTTPException(status_code=404, detail="Repository not found")

                return response.json()
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"An unexpected error occurred while fetching {repo_name} files: {e}",
            )

    async def get_file_content(self, user: dict, repo_name: str, file_path: str):
        access_token = await self.retrieve_access_token(user["id"])
        if not access_token:
            raise HTTPException(status_code=401, detail="GitHub access token not found")

        url = (
            self.base_url
            + f"/repos/{user['user_name']}/{repo_name}/contents/{file_path}"
        )
        headers = {**self.base_headers, "Authorization": f"Bearer {access_token}"}

        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(url, headers=headers)
                data = response.json()

                file_content = data["content"]
                file_content_encoding = data.get("encoding")
                if file_content_encoding == "base64":
                    file_content = base64.b64decode(file_content).decode()

                return file_content

        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"A nunexpected error occurred while fetching file content: {e}",
            )

    async def push_readme_and_create_pr(
        self, user: dict, repo_name: str, branch_name: str, readme_content: str
    ):
        access_token = await self.retrieve_access_token(user["id"])
        if not access_token:
            raise HTTPException(status_code=401, detail="GitHub access token not found")

        headers = {**self.base_headers, "Authorization": f"Bearer {access_token}"}
        new_branch = f"gitdocsify-readme-update-{datetime.now(timezone.utc).strftime('%Y%m%d-%H%M%S')}"

        async with httpx.AsyncClient() as client:
            branch_url = f"{self.base_url}/repos/{user['user_name']}/{repo_name}/git/refs/heads/{branch_name}"
            response = await client.get(branch_url, headers=headers)
            if response.status_code != 200:
                raise HTTPException(
                    status_code=response.status_code,
                    detail=f"Error getting branch info: {response.text}",
                )
            latest_commit_sha = response.json()["object"]["sha"]

            create_branch_url = (
                f"{self.base_url}/repos/{user['user_name']}/{repo_name}/git/refs"
            )
            branch_payload = {
                "ref": f"refs/heads/{new_branch}",
                "sha": latest_commit_sha,
            }
            response = await client.post(
                create_branch_url, headers=headers, json=branch_payload
            )
            if response.status_code not in [201, 422]:
                raise HTTPException(
                    status_code=response.status_code,
                    detail=f"Error creating branch: {response.text}",
                )

            file_url = f"{self.base_url}/repos/{user['user_name']}/{repo_name}/contents/README.md"
            response = await client.get(file_url, headers=headers)
            file_sha = (
                response.json().get("sha", None)
                if response.status_code == 200
                else None
            )

            encoded_content = base64.b64encode(readme_content.encode()).decode()
            push_payload = {
                "message": "chore: Update README using GitDocsify",
                "content": encoded_content,
                "branch": new_branch,
            }
            if file_sha:
                push_payload["sha"] = file_sha

            response = await client.put(file_url, headers=headers, json=push_payload)
            if response.status_code not in [200, 201]:
                raise HTTPException(
                    status_code=response.status_code,
                    detail=f"Error pushing README: {response.text}",
                )

            pr_url = f"{self.base_url}/repos/{user['user_name']}/{repo_name}/pulls"
            pr_payload = {
                "title": "[GitDocsify] Auto-Generated README Update",
                "head": new_branch,
                "base": branch_name,
                "body": "This pull request updates your README file using GitDocsify.\n\nPlease review the changes and merge if everything looks good.",
            }
            response = await client.post(pr_url, headers=headers, json=pr_payload)
            if response.status_code != 201:
                raise HTTPException(
                    status_code=response.status_code,
                    detail=f"Error creating PR: {response.text}",
                )

            return response.json()
