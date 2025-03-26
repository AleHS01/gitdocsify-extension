from fastapi import APIRouter
from .github import router as github_router
from .documentation_generator import router as documentation_router

router = APIRouter()

router.include_router(github_router, prefix="/github", tags=["GitHub"])
router.include_router(
    documentation_router, prefix="/documentation", tags=["Documentation"]
)
