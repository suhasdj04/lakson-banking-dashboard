from fastapi import APIRouter

from app.schemas import Category
from app.services.data_service import get_categories

router = APIRouter(prefix="/categories", tags=["categories"])


@router.get("", response_model=list[Category])
def list_categories() -> list[Category]:
    """Return filter categories with counts based on the product fixture."""
    return get_categories()
