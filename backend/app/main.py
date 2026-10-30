from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.categories import router as categories_router
from app.routes.dashboard import router as dashboard_router
from app.routes.products import router as products_router
from app.routes.transactions import router as transactions_router

app = FastAPI(
    title="LAKSON Banking Dashboard API",
    description="Deterministic mock API for the LAKSON single-page banking dashboard assessment.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["GET", "OPTIONS"],
    allow_headers=["*"],
)

app.include_router(products_router, prefix="/api")
app.include_router(dashboard_router, prefix="/api")
app.include_router(transactions_router, prefix="/api")
app.include_router(categories_router, prefix="/api")
