import { ArrowDownLeft, ArrowUpRight, ReceiptText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import type { Transaction } from '@/types';
import { formatCurrency, formatDate } from '@/lib/utils';

export function RecentActivity({ transactions }: { transactions: Transaction[] }) {
  return (
    <Card id="activity" className="scroll-mt-24 overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-5 sm:px-6">
        <div><p className="section-eyebrow">The ledger</p><h2 className="mt-1.5 text-[15px] font-semibold tracking-tight">Recent activity</h2></div>
        <span className="flex size-9 items-center justify-center rounded-xl bg-muted text-muted-foreground"><ReceiptText className="size-4" /></span>
      </div>
      {transactions.length === 0 ? (
        <div className="px-6 py-10 text-center text-sm text-muted-foreground">No recent activity to display.</div>
      ) : (
        <div className="px-4 sm:px-6">
          <div className="hidden grid-cols-[minmax(0,1fr)_110px_130px_100px] gap-3 py-3 text-[9px] font-bold uppercase tracking-[.13em] text-muted-foreground sm:grid">
            <span>Description</span><span>Date</span><span className="text-right">Amount</span><span className="text-right">Status</span>
          </div>
          {transactions.map((transaction) => {
            const incoming = transaction.amount >= 0;
            const pending = /pending|processing/i.test(transaction.status);
            return (
              <div key={transaction.id} className="table-row grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 py-3.5 sm:grid-cols-[minmax(0,1fr)_110px_130px_100px] sm:gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${incoming ? 'bg-[#eaf3ec] text-[#32744d] dark:bg-[#1e3528] dark:text-[#a4d6b5]' : 'bg-muted text-muted-foreground'}`}>
                    {incoming ? <ArrowDownLeft className="size-4" /> : <ArrowUpRight className="size-4" />}
                  </span>
                  <div className="min-w-0"><p className="truncate text-[12px] font-semibold">{transaction.description}</p><p className="mt-1 text-[10px] text-muted-foreground sm:hidden">{formatDate(transaction.date)} <span className="mx-1">·</span> {pending ? 'Pending' : 'Completed'}</p></div>
                </div>
                <span className="hidden text-[11px] text-muted-foreground sm:block">{formatDate(transaction.date)}</span>
                <span className={`mono-data text-right text-[12px] font-semibold ${incoming ? 'text-[#32744d] dark:text-[#9bcaaa]' : 'text-foreground'}`}>{incoming ? '+' : '−'}{formatCurrency(Math.abs(transaction.amount))}</span>
                <span className="hidden justify-end sm:flex"><Badge variant={pending ? 'warning' : 'subtle'} className="capitalize">{transaction.status}</Badge></span>
              </div>
            );
          })}
        </div>
      )}
      <div className="border-t border-line bg-muted/35 px-5 py-3 text-[10px] text-muted-foreground sm:px-6">Recent transactions are illustrative and are not connected to an account.</div>
    </Card>
  );
}
