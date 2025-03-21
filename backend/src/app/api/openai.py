from fastapi import APIRouter, Depends
from src.app.core.jwt import verify_jwt_token
from src.app.core.openai import open_ai_client
from pydantic import BaseModel

router = APIRouter()


class MarkdownGenerator(BaseModel):
    markdown: str


class Section(BaseModel):
    name: str
    description: str
    id: str


class Project(BaseModel):
    sections: list[Section]
    project_title: str


@router.post("/")  # Temp Method to test api endpoint
def test_method(project: Project, payload: dict = Depends(verify_jwt_token)):
    completion = open_ai_client.beta.chat.completions.parse(
        model="gpt-4o-mini-2024-07-18",
        messages=[
            {
                "role": "system",
                "content": "You are a technical writer in charge of making documentation using markdown. You provide user their documentation in markdown format for GitHub README. The user will provide you with the sections they want to include. Don't include any other section unless specify",
            },
            {
                "role": "user",
                "content": f"Can you make a documentation template for my github project? The project is called: {project.project_title} and I have this sections that I want in my README {project.sections}",
            },
        ],
        response_format=MarkdownGenerator,
    )

    markdown = completion.choices[0].message.parsed

    return markdown
