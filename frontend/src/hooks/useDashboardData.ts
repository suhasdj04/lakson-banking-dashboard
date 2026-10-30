import { useCallback, useEffect, useState } from 'react';
import { api } from '@/services/api';
import type { DashboardSummary, Product, ProductCategory, Transaction } from '@/types';

export function useDashboardData() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);

  const retry = useCallback(() => setAttempt((value) => value + 1), []);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError('');

    Promise.all([
      api.products(controller.signal),
      api.categories(controller.signal),
      api.summary(controller.signal),
      api.transactions(controller.signal),
    ])
      .then(([nextProducts, nextCategories, nextSummary, nextTransactions]) => {
        setProducts(nextProducts);
        setCategories(nextCategories);
        setSummary(nextSummary);
        setTransactions(nextTransactions);
      })
      .catch((reason: unknown) => {
        if (controller.signal.aborted) return;
        setError(reason instanceof Error ? reason.message : 'The demonstration API could not be reached.');
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [attempt]);

  return { products, categories, summary, transactions, loading, error, retry };
}
