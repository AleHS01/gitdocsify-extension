from .supabase import supabase
import httpx
from fastapi import HTTPException


class GitHub:
    def __init__(self):
        self.base_url = "https://api.github.com"
        self.base_headers = {
            "X-GitHub-Api-Version": "2022-11-28",
        }

    async def store_access_token(self, token_data):
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

    async def retrieve_access_token(self, user_id):
        try:
            result = (
                supabase.table("user_github_tokens")
                .select("github_access_token")
                .eq("user_id", user_id)
                .execute()
            )
            print(result)
            if result.data:
                return result.data[0]["github_access_token"]
            return None
        except Exception as e:
            raise HTTPException(
                status_code=500, detail=f"An unexpected error occurred: {e}"
            )

    async def get_repos(self, user):
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
