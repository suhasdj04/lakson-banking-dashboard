from fastapi import APIRouter

from app.schemas import Transaction
from app.services.data_service import get_transactions

router = APIRouter(prefix="/transactions", tags=["transactions"])


@router.get("", response_model=list[Transaction])
def list_transactions() -> list[Transaction]:
    """Return fixture transactions ordered newest first."""
    return [Transaction(**transaction) for transaction in get_transactions()]
