from datetime import date
from typing import Literal, Optional

from pydantic import BaseModel


ProductType = Literal["savings", "credit_card", "loan", "investment"]


class Product(BaseModel):
    id: str
    type: ProductType
    category: ProductType
    name: str
    status: str
    account_name: Optional[str] = None
    account_number: Optional[str] = None
    available_balance: Optional[float] = None
    interest_rate: Optional[float] = None
    card_name: Optional[str] = None
    card_number: Optional[str] = None
    credit_limit: Optional[float] = None
    available_credit: Optional[float] = None
    outstanding_balance: Optional[float] = None
    billing_due_date: Optional[date] = None
    loan_amount: Optional[float] = None
    outstanding_amount: Optional[float] = None
    emi_amount: Optional[float] = None
    next_payment_date: Optional[date] = None
    invested_amount: Optional[float] = None
    current_value: Optional[float] = None
    return_percentage: Optional[float] = None
    application_available: bool = True


class Transaction(BaseModel):
    id: str
    description: str
    date: date
    amount: float
    status: str


class Category(BaseModel):
    id: ProductType
    name: str
    count: int


class DistributionItem(BaseModel):
    id: Literal["savings", "investment"]
    name: str
    amount: float
    percentage: float


class UpcomingPayment(BaseModel):
    amount: float
    due_date: Optional[date] = None
    count: int


class BalanceHistoryPoint(BaseModel):
    month: str
    balance: float


class InvestmentPerformancePoint(BaseModel):
    month: str
    invested_amount: float
    current_value: float


class DashboardSummary(BaseModel):
    portfolio_balance: float
    active_products: int
    available_credit: float
    upcoming_payment: UpcomingPayment
    distribution: list[DistributionItem]
    balance_history: list[BalanceHistoryPoint]
    investment_performance: list[InvestmentPerformancePoint]
