import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ChartNoAxesCombined, CircleDollarSign, CreditCard, PiggyBank } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Product } from '@/types';
import { categoryLabel, formatCurrency, formatDate, statusVariant } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  onDetails: (product: Product) => void;
  onApply: (product: Product) => void;
}

const iconMap = {
  savings: PiggyBank,
  credit_card: CreditCard,
  loan: CircleDollarSign,
  investment: ChartNoAxesCombined,
};

function amountFor(product: Product): number {
  if (product.type === 'savings') return product.available_balance ?? 0;
  if (product.type === 'credit_card') return product.available_credit ?? 0;
  if (product.type === 'loan') return product.outstanding_amount ?? 0;
  return product.current_value ?? 0;
}

function valueLabel(product: Product): string {
  if (product.type === 'savings') return 'Available balance';
  if (product.type === 'credit_card') return 'Available credit';
  if (product.type === 'loan') return 'Outstanding';
  return 'Current value';
}

function description(product: Product): string {
  if (/pending|review/i.test(product.status)) return `Under review · ${formatCurrency(product.credit_limit ?? 0, true)} limit requested`;
  if (/closed/i.test(product.status)) return `Closed · fully repaid`;
  if (product.type === 'savings') return `${product.interest_rate ?? 0}% p.a. · ${product.account_number ?? 'Account details'}`;
  if (product.type === 'credit_card') return `${formatCurrency(product.outstanding_balance ?? 0)} outstanding · due ${formatDate(product.billing_due_date ?? '')}`;
  if (product.type === 'loan') return `EMI ${formatCurrency(product.emi_amount ?? 0)} · next ${formatDate(product.next_payment_date ?? '')}`;
  const sign = (product.return_percentage ?? 0) >= 0 ? '+' : '';
  return `${sign}${(product.return_percentage ?? 0).toFixed(1)}% total return`;
}

export function ProductCard({ product, onDetails, onApply }: ProductCardProps) {
  const Icon = iconMap[product.type];
  const isActive = /^active$/i.test(product.status);
  const hasCreditUsage = isActive && product.type === 'credit_card' && (product.credit_limit ?? 0) > 0;
  const creditUsage = hasCreditUsage ? 100 - ((product.available_credit ?? 0) / (product.credit_limit ?? 1)) * 100 : 0;
  const showApply = product.application_available !== false;

  return (
    <motion.article layout initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }} className="product-card flex min-h-[242px] flex-col p-5 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <span className="flex size-10 items-center justify-center rounded-[14px] bg-[#eaf2ec] text-[#1f6448] dark:bg-[#20392b] dark:text-[#a9d7b8]"><Icon className="size-[19px]" strokeWidth={1.8} /></span>
        <div className="flex flex-wrap items-center justify-end gap-1.5">
          <Badge variant="subtle" className="capitalize">{categoryLabel(product.type)}</Badge>
          <Badge variant={statusVariant(product.status)} className="capitalize">{product.status}</Badge>
        </div>
      </div>
      <div className="mt-5 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-[14px] font-semibold tracking-[-.015em]">{product.name}</p>
          <p className="mt-1 truncate text-[11px] text-muted-foreground">{description(product)}</p>
        </div>
        <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-muted-foreground/70" />
      </div>
      <div className="mt-4">
        <p className="section-eyebrow">{valueLabel(product)}</p>
        <p className="mono-data mt-1 text-[22px] font-semibold tracking-[-.05em]">{formatCurrency(amountFor(product))}</p>
        {hasCreditUsage && (
          <div className="mt-3">
            <div className="flex justify-between text-[10px] text-muted-foreground"><span>Credit used</span><span>{Math.round(creditUsage)}%</span></div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-emerald" style={{ width: `${Math.max(0, Math.min(100, creditUsage))}%` }} /></div>
          </div>
        )}
      </div>
      <div className="mt-auto flex items-center gap-2 border-t border-line/80 pt-4">
        <Button variant="ghost" size="sm" onClick={() => onDetails(product)} className="h-8 px-2.5 text-[11px]">View details <ArrowRight className="size-3.5" /></Button>
        {showApply && <Button variant="outline" size="sm" onClick={() => onApply(product)} className="ml-auto h-8 rounded-lg px-3 text-[11px]">Apply now</Button>}
      </div>
    </motion.article>
  );
}
