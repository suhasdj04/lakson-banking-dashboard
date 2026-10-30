import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ArrowUpRight, Landmark } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { formatCurrency, formatCompactNumber } from '@/lib/utils';
import type { DashboardSummary } from '@/types';

export function BalanceChart({ summary }: { summary: DashboardSummary }) {
  const history = summary.balance_history;
  const first = history[0]?.balance ?? 0;
  const last = history.at(-1)?.balance ?? 0;
  const trend = first > 0 ? ((last - first) / first) * 100 : 0;
  return (
    <Card className="h-full p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div><p className="section-eyebrow">Cash position</p><h2 className="mt-1.5 text-[15px] font-semibold tracking-tight">Account balance</h2></div>
        <span className="flex size-9 items-center justify-center rounded-xl bg-[#edf4ee] text-emerald dark:bg-[#1f3428]"><Landmark className="size-4" /></span>
      </div>
      <div className="mt-1 flex items-center gap-2 text-[11px] text-muted-foreground"><span>Combined savings · last 6 months</span><span className="inline-flex items-center gap-0.5 rounded-full bg-[#e9f3eb] px-1.5 py-0.5 text-[9px] font-semibold text-[#32744d] dark:bg-[#20392b] dark:text-[#9bcaaa]"><ArrowUpRight className="size-3" />{trend.toFixed(1)}%</span></div>
      <div className="mt-4 h-[183px]" role="img" aria-label={`Savings balance over six months, latest ${formatCurrency(last)}. Demonstration data.`}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={history} margin={{ top: 8, right: 5, left: -22, bottom: 0 }}>
            <defs><linearGradient id="balanceFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4b9873" stopOpacity={0.24} /><stop offset="100%" stopColor="#4b9873" stopOpacity={0} /></linearGradient></defs>
            <CartesianGrid vertical={false} stroke="var(--chart-grid)" strokeDasharray="3 4" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#8b968e', fontSize: 10 }} dy={9} />
            <YAxis tickLine={false} axisLine={false} tick={{ fill: '#8b968e', fontSize: 10 }} tickFormatter={(value: number) => `₹${formatCompactNumber(value)}`} />
            <Tooltip formatter={(value) => formatCurrency(Number(value))} contentStyle={{ borderRadius: 12, borderColor: 'var(--tooltip-border)', background: 'var(--tooltip-bg)', color: 'var(--tooltip-foreground)', fontSize: 12 }} />
            <Area type="monotone" dataKey="balance" name="Savings balance" stroke="#2d7d5a" strokeWidth={2.5} fill="url(#balanceFill)" activeDot={{ r: 5, fill: '#2d7d5a', stroke: 'var(--tooltip-bg)', strokeWidth: 2 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
