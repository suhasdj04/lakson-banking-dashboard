# LAKSON Banking Dashboard

A responsive, single-page fintech dashboard for the LAKSON full-stack technical assessment. It brings synthetic savings, credit-card, loan, investment, summary, and recent-activity data into one interface. This is a demonstration only: no banking connection, account operation, application submission, or financial transaction is real.

## Assessment mapping (Exercise 1: Unified Banking Product Screen)

- **One screen:** a single-page dashboard; the details and application forms are overlays, not pages.
- **4 product types:** savings, credit card, loan, investment, each card showing name, category, status, key metrics and a CTA (`View details`, plus `Apply now` where the product allows it).
- **Switch/search:** category tabs and live search (name, category, status) work together.
- **Data vs UI:** mock JSON lives in `backend/app/data/`, served by FastAPI, consumed through `frontend/src/services/api.ts`.
- **Statuses:** products are `active`, `pending` or `closed`; only active products count toward portfolio totals, available credit and upcoming payments. Billing and EMI dates roll forward monthly so the demo never shows stale dates.
- **Apply button:** driven by each product's `application_available` flag (for example, an existing credit card cannot be applied for again).

## Stack

The frontend uses React 18, Vite, TypeScript, Tailwind CSS, shadcn-style reusable components built with Radix primitives, Framer Motion, Recharts, Lucide React, and Sonner toasts. The API uses Python 3.12, FastAPI, and Pydantic with deterministic JSON fixtures. SQLite is not used because this read-only mock assessment does not need persistence.

## Requirements

- Node.js 22 or newer and pnpm 11 (`corepack enable` can enable the package manager).
- Python 3.12 or newer.

## Install

From the project root:

```bash
pnpm install
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r backend/requirements.txt
```

On Windows PowerShell, activate the environment with `.venv\Scripts\Activate.ps1`.

## Run locally

Start the API in a terminal from the project root:

```bash
source .venv/bin/activate
uvicorn app.main:app --app-dir backend --host 0.0.0.0 --port 8000 --reload
```

Start the frontend in a second terminal:

```bash
pnpm dev
```

Open the Vite preview on port `3000`. The frontend uses relative `/api/...` paths; Vite proxies them to FastAPI on port `8000`. FastAPI's interactive API documentation is available at `http://127.0.0.1:8000/docs`.

## API endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/api/products` | List the demonstration banking products |
| `GET` | `/api/products/{product_id}` | Return complete details for one product; unknown IDs return `404` |
| `GET` | `/api/dashboard/summary` | Return portfolio totals, available credit, upcoming payments, and chart series |
| `GET` | `/api/transactions` | Return recent demonstration activity |
| `GET` | `/api/categories` | Return product filter categories and product counts |

## Project structure

- `frontend/src/components/` contains layout, dashboard, chart, product, and shared UI components.
- `frontend/src/services/api.ts` contains typed frontend API access; `frontend/src/types/` defines the frontend response contracts.
- `backend/app/routes/` defines each API route; `backend/app/schemas.py` contains Pydantic response models; `backend/app/services/data_service.py` derives summaries from the fixture in `backend/app/data/mock_data.json`.

## Interactions

Product type filters combine with live search across name, category, and status. Product details open in an accessible dialog. The application flow validates required fields and confirms locally in the browser; it deliberately does not submit data to the API or an institution. Theme preference is stored locally in the browser. Charts, notifications, transaction records, and financial values are sample content.

Build and type-check the frontend with:

```bash
pnpm build
```
