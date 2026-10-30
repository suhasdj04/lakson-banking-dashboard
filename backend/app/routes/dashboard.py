from fastapi import APIRouter

from app.schemas import DashboardSummary
from app.services.data_service import get_dashboard_summary

router = APIRouter(prefix="/dashboard", tags=["dashboard"])


@router.get("/summary", response_model=DashboardSummary)
def dashboard_summary() -> DashboardSummary:
    """Return derived portfolio, credit, payment, and chart metrics."""
    return get_dashboard_summary()
