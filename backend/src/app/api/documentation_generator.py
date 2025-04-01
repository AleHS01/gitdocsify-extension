from fastapi import APIRouter, Depends
from src.app.core.jwt import verify_jwt_token
from src.app.core.documentation_generator import DocumentationGenerator
from pydantic import BaseModel

router = APIRouter()


class MarkdownGenerator(BaseModel):
    markdown: str


class Section(BaseModel):
    name: str
    description: str
    id: str


class Project(BaseModel):
    project_name: str
    project_description: str
    branch_name: str


class AdditionalData(BaseModel):
    additional_info: str
    emojis_enabled: bool
    only_selected_sections: bool


class DocumentationData(BaseModel):
    sections: list[Section]
    project: Project
    additional_data: AdditionalData


@router.post("/")
async def generate_documentation(
    documentation_data: DocumentationData, payload: dict = Depends(verify_jwt_token)
):
    user = {
        "id": payload["sub"],
        "user_name": payload["user_metadata"]["preferred_username"],
    }
    doc_generator = DocumentationGenerator(user, documentation_data.project)
    markdown = await doc_generator.run_pipeline(
        documentation_data.sections, documentation_data.additional_data
    )
    return markdown
