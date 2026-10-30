import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { formatCurrency, formatCompactNumber } from '@/lib/utils';
import type { DashboardSummary } from '@/types';

export function InvestmentPerformance({ summary }: { summary: DashboardSummary }) {
  const series = summary.investment_performance;
  const latest = series[series.length - 1];
  const returns = latest?.current_value && latest.invested_amount ? ((latest.current_value - latest.invested_amount) / latest.invested_amount) * 100 : 0;
  return (
    <Card className="h-full p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div><p className="section-eyebrow">Long-term view</p><h2 className="mt-1.5 text-[15px] font-semibold tracking-tight">Investment performance</h2></div>
        <span className="flex size-9 items-center justify-center rounded-xl bg-[#f5f0e5] text-[#99713f] dark:bg-[#342c1f] dark:text-[#d5b77e]"><TrendingUp className="size-4" /></span>
      </div>
      <div className="mt-1 flex items-center gap-2 text-[11px] text-muted-foreground"><span>Invested vs current value · sample data</span><span className="mono-data text-[#32744d] dark:text-[#9bcaaa]">+{returns.toFixed(1)}%</span></div>
      <div className="mt-4 h-[183px]" role="img" aria-label={`Investment performance over six months. Latest value ${formatCurrency(latest?.current_value ?? 0)}, invested ${formatCurrency(latest?.invested_amount ?? 0)}. Demonstration data.`}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={series} margin={{ top: 8, right: 6, left: -22, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="var(--chart-grid)" strokeDasharray="3 4" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#8b968e', fontSize: 10 }} dy={9} />
            <YAxis tickLine={false} axisLine={false} tick={{ fill: '#8b968e', fontSize: 10 }} tickFormatter={(value: number) => `₹${formatCompactNumber(value)}`} />
            <Tooltip formatter={(value) => formatCurrency(Number(value))} contentStyle={{ borderRadius: 12, borderColor: 'var(--tooltip-border)', background: 'var(--tooltip-bg)', color: 'var(--tooltip-foreground)', fontSize: 12 }} />
            <Line type="monotone" dataKey="invested_amount" name="Invested" stroke="#97a59b" strokeWidth={2} strokeDasharray="5 4" dot={false} activeDot={{ r: 4 }} />
            <Line type="monotone" dataKey="current_value" name="Current value" stroke="#2d7d5a" strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: '#2d7d5a', stroke: 'var(--tooltip-bg)', strokeWidth: 2 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-1 flex items-center justify-end gap-4 text-[10px] text-muted-foreground"><span className="inline-flex items-center gap-1.5"><span className="h-0.5 w-4 border-t border-dashed border-[#97a59b]" />Invested</span><span className="inline-flex items-center gap-1.5"><span className="h-0.5 w-4 bg-[#2d7d5a]" />Current value</span></div>
    </Card>
  );
}
