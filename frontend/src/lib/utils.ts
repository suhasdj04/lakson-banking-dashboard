import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

export function formatCurrency(value: number, compact = false): string {
  if (!Number.isFinite(value)) return '—';
  if (compact && Math.abs(value) >= 100_000) {
    const lakh = value / 100_000;
    return `₹${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 1 }).format(lakh)}L`;
  }
  return inr.format(value);
}

export function formatDate(value: string): string {
  const date = new Date(`${value}${value.length === 10 ? 'T12:00:00' : ''}`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short' }).format(date);
}

export function formatLongDate(value: string): string {
  const date = new Date(`${value}${value.length === 10 ? 'T12:00:00' : ''}`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
}

export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat('en-IN', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
}

export function categoryLabel(type: string): string {
  const labels: Record<string, string> = {
    savings: 'Savings',
    credit_card: 'Credit card',
    loan: 'Personal loan',
    investment: 'Investment',
  };
  return labels[type] ?? type.replaceAll('_', ' ');
}

export function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export function statusVariant(status: string): 'success' | 'warning' | 'secondary' {
  if (/pending|review|upcoming/i.test(status)) return 'warning';
  if (/closed|inactive|expired/i.test(status)) return 'secondary';
  return 'success';
}
