import type { DashboardSummary, Product, ProductCategory, Transaction } from '@/types';

async function request<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(path, {
    signal,
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    let detail = `Request failed (${response.status})`;
    try {
      const payload = (await response.json()) as { detail?: string };
      if (payload.detail) detail = payload.detail;
    } catch {
      // Keep the HTTP status message when the server does not return JSON.
    }
    throw new Error(detail);
  }

  return (await response.json()) as T;
}

export const api = {
  products: (signal?: AbortSignal) => request<Product[]>('/api/products', signal),
  product: (id: string, signal?: AbortSignal) =>
    request<Product>(`/api/products/${encodeURIComponent(id)}`, signal),
  summary: (signal?: AbortSignal) => request<DashboardSummary>('/api/dashboard/summary', signal),
  transactions: (signal?: AbortSignal) => request<Transaction[]>('/api/transactions', signal),
  categories: (signal?: AbortSignal) => request<ProductCategory[]>('/api/categories', signal),
};
