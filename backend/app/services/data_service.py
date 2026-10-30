import calendar
import json
from datetime import date
from pathlib import Path
from typing import Any

from app.schemas import (
    BalanceHistoryPoint,
    Category,
    DashboardSummary,
    DistributionItem,
    InvestmentPerformancePoint,
    Product,
    UpcomingPayment,
)
from app.schemas import ProductType

_FIXTURE_PATH = Path(__file__).resolve().parents[1] / "data" / "mock_data.json"
with _FIXTURE_PATH.open(encoding="utf-8") as fixture_file:
    _FIXTURES: dict[str, list[dict[str, Any]]] = json.load(fixture_file)

CATEGORY_NAMES: dict[ProductType, str] = {
    "savings": "Savings",
    "credit_card": "Credit Cards",
    "loan": "Loans",
    "investment": "Investments",
}

# Six monthly labels (May through October 2026) and deterministic interpolation
# factors. Chart values are calculated from the same current fixture balances.
_HISTORY_MONTHS = ("May", "Jun", "Jul", "Aug", "Sep", "Oct")
_HISTORY_FACTORS = (0.82, 0.86, 0.90, 0.94, 0.97, 1.0)


def _roll_forward(value: str | None, today: date) -> str | None:
    """Move a recurring due date forward month by month until it is not in the past."""
    if not value:
        return value
    due = date.fromisoformat(value)
    while due < today:
        year, month = (due.year + 1, 1) if due.month == 12 else (due.year, due.month + 1)
        due = date(year, month, min(due.day, calendar.monthrange(year, month)[1]))
    return due.isoformat()


def _with_current_dates(product: dict[str, Any], today: date) -> dict[str, Any]:
    """Billing/EMI dates recur monthly, so active products always show an upcoming date."""
    current = dict(product)
    if current["status"].lower() == "active":
        for field in ("billing_due_date", "next_payment_date"):
            current[field] = _roll_forward(current.get(field), today)
    return current


def get_products() -> list[dict[str, Any]]:
    today = date.today()
    return [_with_current_dates(item, today) for item in _FIXTURES["products"]]


def get_product(product_id: str) -> dict[str, Any] | None:
    return next((item for item in get_products() if item["id"] == product_id), None)


def get_transactions() -> list[dict[str, Any]]:
    return sorted(_FIXTURES["transactions"], key=lambda item: item["date"], reverse=True)


def get_categories() -> list[Category]:
    products = get_products()
    return [
        Category(
            id=category_id,
            name=name,
            count=sum(product["category"] == category_id for product in products),
        )
        for category_id, name in CATEGORY_NAMES.items()
    ]


def _round_money(value: float) -> float:
    return round(value, 2)


def get_dashboard_summary() -> DashboardSummary:
    today = date.today()
    # Pending and closed products are listed on the dashboard but excluded from totals.
    active_products = [product for product in get_products() if product["status"].lower() == "active"]
    savings = [product for product in active_products if product["category"] == "savings"]
    investments = [product for product in active_products if product["category"] == "investment"]
    cards = [product for product in active_products if product["category"] == "credit_card"]
    loans = [product for product in active_products if product["category"] == "loan"]

    savings_balance = sum(product["available_balance"] or 0 for product in savings)
    investment_value = sum(product["current_value"] or 0 for product in investments)
    investment_principal = sum(product["invested_amount"] or 0 for product in investments)
    portfolio_balance = savings_balance + investment_value
    distribution_total = savings_balance + investment_value
    distribution = [
        DistributionItem(
            id="savings",
            name=CATEGORY_NAMES["savings"],
            amount=_round_money(savings_balance),
            percentage=round(savings_balance / distribution_total * 100, 2) if distribution_total else 0.0,
        ),
        DistributionItem(
            id="investment",
            name=CATEGORY_NAMES["investment"],
            amount=_round_money(investment_value),
            percentage=round(investment_value / distribution_total * 100, 2) if distribution_total else 0.0,
        ),
    ]

    # A single due-date-ordered list of card statement balances and loan EMIs
    # gives the dashboard one consolidated amount, earliest due date, and count.
    payment_items: list[tuple[date, float]] = []
    for card in cards:
        if card.get("billing_due_date") and card.get("outstanding_balance") is not None:
            due_date = date.fromisoformat(card["billing_due_date"])
            if due_date >= today:
                payment_items.append((due_date, float(card["outstanding_balance"])))
    for loan in loans:
        if loan.get("next_payment_date") and loan.get("emi_amount") is not None:
            due_date = date.fromisoformat(loan["next_payment_date"])
            if due_date >= today:
                payment_items.append((due_date, float(loan["emi_amount"])))
    payment_items.sort(key=lambda item: item[0])
    upcoming_payment = UpcomingPayment(
        amount=_round_money(sum(amount for _, amount in payment_items)),
        due_date=payment_items[0][0] if payment_items else None,
        count=len(payment_items),
    )

    balance_history = [
        BalanceHistoryPoint(month=month, balance=_round_money(portfolio_balance * factor))
        for month, factor in zip(_HISTORY_MONTHS, _HISTORY_FACTORS)
    ]
    investment_performance = [
        InvestmentPerformancePoint(
            month=month,
            invested_amount=_round_money(investment_principal * factor),
            current_value=_round_money(investment_value * factor),
        )
        for month, factor in zip(_HISTORY_MONTHS, _HISTORY_FACTORS)
    ]

    return DashboardSummary(
        portfolio_balance=_round_money(portfolio_balance),
        active_products=len(active_products),
        available_credit=_round_money(sum(product["available_credit"] or 0 for product in cards)),
        upcoming_payment=upcoming_payment,
        distribution=distribution,
        balance_history=balance_history,
        investment_performance=investment_performance,
    )
