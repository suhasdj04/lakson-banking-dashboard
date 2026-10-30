import { useMemo } from 'react';
import { CalendarClock, CreditCard, Layers3, WalletCards } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';
import type { DashboardSummary } from '@/types';

interface SummaryCardsProps {
  summary: DashboardSummary;
  categoryCount: number;
}

export function SummaryCards({ summary, categoryCount }: SummaryCardsProps) {
  const cards = useMemo(() => [
    { label: 'Active products', value: String(summary.active_products).padStart(2, '0'), note: 'Across all product types', Icon: Layers3, iconClass: 'bg-[#e9f2ec] text-[#34724d] dark:bg-[#20392b] dark:text-[#9bcaaa]' },
    { label: 'Available credit', value: formatCurrency(summary.available_credit, true), note: 'Ready when you need it', Icon: CreditCard, iconClass: 'bg-[#eef0f7] text-[#5c688e] dark:bg-[#242a3a] dark:text-[#acb9eb]' },
    { label: 'Upcoming payments', value: formatCurrency(summary.upcoming_payment.amount, true), note: `${summary.upcoming_payment.count} scheduled · ${summary.upcoming_payment.due_date ? formatDate(summary.upcoming_payment.due_date) : 'none due'}`, Icon: CalendarClock, iconClass: 'bg-[#f8f0e6] text-[#a66e36] dark:bg-[#3a2d20] dark:text-[#e7b67e]' },
    { label: 'Product categories', value: String(categoryCount).padStart(2, '0'), note: 'Savings · cards · loans · investments', Icon: WalletCards, iconClass: 'bg-[#f1edf7] text-[#786193] dark:bg-[#30283c] dark:text-[#c7aee7]' },
  ], [summary, categoryCount]);

  return (
    <section aria-label="Portfolio summary" className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
      {cards.map(({ label, value, note, Icon, iconClass }) => (
        <article className="stat-card group transition hover:-translate-y-0.5 hover:shadow-soft" key={label}>
          <div className="flex items-center justify-between gap-2">
            <p className="text-[11px] font-medium text-muted-foreground">{label}</p>
            <span className={`flex size-8 shrink-0 items-center justify-center rounded-xl ${iconClass}`}><Icon className="size-4" strokeWidth={1.8} /></span>
          </div>
          <p className="mono-data mt-4 truncate text-[clamp(1.2rem,2vw,1.55rem)] font-semibold tracking-[-.06em]">{value}</p>
          <p className="mt-1 truncate text-[10px] text-muted-foreground">{note}</p>
        </article>
      ))}
    </section>
  );
}
