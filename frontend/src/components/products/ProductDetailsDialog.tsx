import { ArrowUpRight, ChartNoAxesCombined, CircleDollarSign, CreditCard, PiggyBank, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { Product } from '@/types';
import { categoryLabel, formatCurrency, formatLongDate, statusVariant } from '@/lib/utils';

interface ProductDetailsDialogProps {
  product: Product | null;
  onOpenChange: (open: boolean) => void;
  onApply: (product: Product) => void;
}

const productIcon = {
  savings: PiggyBank,
  credit_card: CreditCard,
  loan: CircleDollarSign,
  investment: ChartNoAxesCombined,
};

function productFields(product: Product): Array<[string, string]> {
  if (product.type === 'savings') return [
    ['Account name', product.account_name ?? '—'],
    ['Account number', product.account_number ?? '—'],
    ['Available balance', formatCurrency(product.available_balance ?? 0)],
    ['Interest rate', `${product.interest_rate ?? 0}% p.a.`],
    ['Account status', product.status],
  ];
  if (product.type === 'credit_card') return [
    ['Card name', product.card_name ?? product.name],
    ['Card number', product.card_number ?? '—'],
    ['Credit limit', formatCurrency(product.credit_limit ?? 0)],
    ['Available credit', formatCurrency(product.available_credit ?? 0)],
    ['Outstanding balance', formatCurrency(product.outstanding_balance ?? 0)],
    ['Billing due date', product.billing_due_date ? formatLongDate(product.billing_due_date) : '—'],
  ];
  if (product.type === 'loan') return [
    ['Loan amount', formatCurrency(product.loan_amount ?? 0)],
    ['Outstanding amount', formatCurrency(product.outstanding_amount ?? 0)],
    ['Interest rate', `${product.interest_rate ?? 0}% p.a.`],
    ['Monthly EMI', formatCurrency(product.emi_amount ?? 0)],
    ['Next payment date', product.next_payment_date ? formatLongDate(product.next_payment_date) : '—'],
    ['Loan status', product.status],
  ];
  return [
    ['Invested amount', formatCurrency(product.invested_amount ?? 0)],
    ['Current value', formatCurrency(product.current_value ?? 0)],
    ['Returns', `${(product.return_percentage ?? 0) >= 0 ? '+' : ''}${(product.return_percentage ?? 0).toFixed(1)}%`],
    ['Investment status', product.status],
  ];
}

export function ProductDetailsDialog({ product, onOpenChange, onApply }: ProductDetailsDialogProps) {
  const Icon = product ? productIcon[product.type] : PiggyBank;
  return (
    <Dialog open={Boolean(product)} onOpenChange={onOpenChange}>
      {product && (
        <DialogContent>
          <DialogHeader className="pr-14">
            <div className="mb-3 flex items-center gap-2">
              <span className="flex size-10 items-center justify-center rounded-[14px] bg-[#eaf2ec] text-[#1f6448] dark:bg-[#20392b] dark:text-[#a9d7b8]"><Icon className="size-5" /></span>
              <Badge variant="subtle">{categoryLabel(product.type)}</Badge>
              <Badge variant={statusVariant(product.status)} className="capitalize">{product.status}</Badge>
            </div>
            <DialogTitle>{product.name}</DialogTitle>
            <DialogDescription>Complete product information · demonstration data</DialogDescription>
          </DialogHeader>
          <div className="px-6 pb-7 sm:px-7">
            <div className="divide-y divide-line rounded-2xl border border-line px-4">
              {productFields(product).map(([label, value]) => (
                <div key={label} className="flex items-center justify-between gap-4 py-3.5 text-xs">
                  <span className="text-muted-foreground">{label}</span><span className="mono-data text-right font-semibold text-foreground">{value}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-3 rounded-2xl bg-muted/70 p-3.5 text-[11px] leading-5 text-muted-foreground">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-emerald" />
              This assessment uses fictional information. No live account data or financial service is connected.
            </div>
            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
              {product.application_available !== false && <Button onClick={() => onApply(product)}>Apply for a similar product <ArrowUpRight className="size-4" /></Button>}
            </div>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
