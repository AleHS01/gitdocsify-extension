from fastapi import APIRouter
from .github import router as github_router
from .openai import router as open_ai_router

router = APIRouter()

router.include_router(github_router, prefix="/github", tags=["GitHub"])
router.include_router(open_ai_router, prefix="/openai", tags=["OpenAI"])
