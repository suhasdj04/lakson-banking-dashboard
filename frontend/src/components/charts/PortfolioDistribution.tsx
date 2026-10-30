import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { ChartNoAxesCombined } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { formatCurrency, formatCompactNumber } from '@/lib/utils';
import type { DashboardSummary } from '@/types';

const colors = ['#2d7d5a', '#95c9a5', '#c9dfcb', '#bb9b66'];

export function PortfolioDistribution({ summary }: { summary: DashboardSummary }) {
  const data = summary.distribution
    .filter((item) => item.amount > 0)
    .map((item) => ({ label: item.name, value: item.amount, id: item.id }));
  const total = data.reduce((sum, item) => sum + item.value, 0);
  return (
    <Card className="h-full p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div><p className="section-eyebrow">Asset mix</p><h2 className="mt-1.5 text-[15px] font-semibold tracking-tight">Portfolio distribution</h2></div>
        <span className="flex size-9 items-center justify-center rounded-xl bg-[#edf4ee] text-emerald dark:bg-[#1f3428]"><ChartNoAxesCombined className="size-4" /></span>
      </div>
      <p className="mt-1 text-[11px] text-muted-foreground">Savings and investment value · sample data</p>
      <div className="mt-2 grid items-center gap-2 sm:grid-cols-[160px_1fr]">
        <div className="relative mx-auto h-[170px] w-[170px]" role="img" aria-label={`Portfolio distribution. Total assets ${formatCurrency(total)}.`}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="label" innerRadius={57} outerRadius={78} paddingAngle={3} stroke="none" cornerRadius={5}>
                {data.map((item, index) => <Cell key={`${item.id}-${index}`} fill={colors[index % colors.length]} />)}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(Number(value))} contentStyle={{ borderRadius: 12, borderColor: 'var(--tooltip-border)', background: 'var(--tooltip-bg)', color: 'var(--tooltip-foreground)', fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="section-eyebrow text-[8px]">Net assets</span>
            <span className="mono-data mt-1 text-[18px] font-semibold tracking-[-.06em]">₹{formatCompactNumber(total)}</span>
          </div>
        </div>
        <div className="space-y-3 px-2">
          {data.map((item, index) => {
            const share = total ? Math.round((item.value / total) * 100) : 0;
            return (
              <div key={item.id}>
                <div className="flex items-center justify-between gap-2 text-[11px]">
                  <span className="inline-flex min-w-0 items-center gap-2"><span className="size-2 shrink-0 rounded-full" style={{ background: colors[index % colors.length] }} /><span className="truncate font-medium">{item.label}</span></span>
                  <span className="mono-data shrink-0 text-muted-foreground">{share}%</span>
                </div>
                <p className="mono-data ml-4 mt-0.5 text-[10px] text-muted-foreground">{formatCurrency(item.value)}</p>
              </div>
            );
          })}
          <p className="border-t border-line pt-2 text-[10px] leading-4 text-muted-foreground">Card and loan balances are displayed separately from asset allocation.</p>
        </div>
      </div>
    </Card>
  );
}
