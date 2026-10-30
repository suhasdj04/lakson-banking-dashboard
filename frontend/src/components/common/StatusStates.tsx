import { AlertTriangle, RefreshCw, SearchX } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function DashboardError({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center rounded-[24px] border border-rose-200 bg-white px-6 text-center dark:border-rose-950 dark:bg-[#151c18]">
      <span className="flex size-12 items-center justify-center rounded-full bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-300"><AlertTriangle className="size-5" /></span>
      <h2 className="mt-4 text-base font-semibold">We couldn’t load the dashboard</h2>
      <p className="mt-1 max-w-sm text-xs leading-5 text-muted-foreground">{message || 'Check that the demonstration API is running, then try again.'}</p>
      <Button onClick={onRetry} className="mt-5" size="sm"><RefreshCw className="size-3.5" /> Try again</Button>
    </div>
  );
}

export function SearchEmpty({ query, onClear }: { query: string; onClear: () => void }) {
  return (
    <div className="col-span-full flex min-h-[230px] flex-col items-center justify-center rounded-[20px] border border-dashed border-line bg-white/60 px-6 text-center dark:bg-[#151c18]/50">
      <span className="flex size-11 items-center justify-center rounded-full bg-muted text-muted-foreground"><SearchX className="size-5" /></span>
      <h3 className="mt-3 text-sm font-semibold">No products found</h3>
      <p className="mt-1 max-w-xs text-xs leading-5 text-muted-foreground">No products match “{query}”. Try another name, category, or status.</p>
      <Button variant="ghost" size="sm" className="mt-3" onClick={onClear}>Clear search</Button>
    </div>
  );
}
