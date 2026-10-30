from fastapi import APIRouter, HTTPException, status

from app.schemas import Product
from app.services.data_service import get_product, get_products

router = APIRouter(prefix="/products", tags=["products"])


@router.get("", response_model=list[Product])
def list_products() -> list[Product]:
    """Return all banking products, including nulls for inapplicable fields."""
    return [Product(**product) for product in get_products()]


@router.get("/{product_id}", response_model=Product)
def read_product(product_id: str) -> Product:
    """Return one complete product, or a standard 404 response."""
    product = get_product(product_id)
    if product is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Product '{product_id}' was not found",
        )
    return Product(**product)
