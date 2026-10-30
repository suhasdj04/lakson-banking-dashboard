export type ProductType = 'savings' | 'credit_card' | 'loan' | 'investment';

export interface Product {
  id: string;
  type: ProductType;
  category: ProductType;
  name: string;
  status: string;
  account_name?: string | null;
  account_number?: string | null;
  available_balance?: number | null;
  interest_rate?: number | null;
  card_name?: string | null;
  card_number?: string | null;
  credit_limit?: number | null;
  available_credit?: number | null;
  outstanding_balance?: number | null;
  billing_due_date?: string | null;
  loan_amount?: number | null;
  outstanding_amount?: number | null;
  emi_amount?: number | null;
  next_payment_date?: string | null;
  invested_amount?: number | null;
  current_value?: number | null;
  return_percentage?: number | null;
  application_available?: boolean;
}

export interface PaymentSummary {
  amount: number;
  due_date: string | null;
  count: number;
}

export interface DistributionItem {
  id: ProductType;
  name: string;
  amount: number;
  percentage: number;
}

export interface BalancePoint {
  month: string;
  balance: number;
}

export interface PerformancePoint {
  month: string;
  invested_amount: number;
  current_value: number;
}

export interface DashboardSummary {
  portfolio_balance: number;
  active_products: number;
  available_credit: number;
  upcoming_payment: PaymentSummary;
  distribution: DistributionItem[];
  balance_history: BalancePoint[];
  investment_performance: PerformancePoint[];
}

export interface Transaction {
  id: string;
  description: string;
  date: string;
  amount: number;
  status: string;
  direction?: 'in' | 'out';
}

export interface ProductCategory {
  id: ProductType;
  name: string;
  count: number;
}
