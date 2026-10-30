import { ArrowDownRight, ArrowUpRight, Layers3, MoveUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import type { DashboardSummary } from '@/types';

interface PortfolioHeroProps {
  summary: DashboardSummary;
}

export function PortfolioHero({ summary }: PortfolioHeroProps) {
  return (
    <section className="hero-panel" aria-labelledby="portfolio-heading">
      <div className="hero-inner">
        <div className="max-w-xl">
          <div className="mb-5 flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-[#c4e7ce]" />
            <p className="text-[10px] font-bold uppercase tracking-[.19em] text-white/65">Illustrative portfolio value</p>
          </div>
          <h2 id="portfolio-heading" className="mono-data text-[clamp(2.25rem,5vw,3.65rem)] font-medium leading-none tracking-[-.065em] text-white">
            {formatCurrency(summary.portfolio_balance)}
          </h2>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/70">
            <span className="inline-flex items-center gap-2"><Layers3 className="size-3.5 text-[#b9ddc4]" />{summary.active_products} active products</span>
            <span className="hidden size-1 rounded-full bg-white/30 sm:block" />
            <span>Across savings and investments</span>
          </div>
        </div>
        <div className="flex flex-col items-start gap-3 sm:items-end">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[.07] px-3 py-2 text-[10px] font-semibold tracking-[.12em] text-white/75">
            <span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-[#c4e7ce] opacity-40" /><span className="relative inline-flex size-2 rounded-full bg-[#c4e7ce]" /></span>
            DEMO PORTFOLIO
          </div>
          <Button asChild variant="light" className="mt-1 h-10 rounded-full px-4 text-xs">
            <a href="#charts">Explore allocation <MoveUpRight className="size-3.5" /></a>
          </Button>
          <div className="mt-2 flex items-center gap-3 text-[10px] text-white/50">
            <span className="inline-flex items-center gap-1"><ArrowUpRight className="size-3 text-[#c4e7ce]" /> Assets</span>
            <span className="inline-flex items-center gap-1"><ArrowDownRight className="size-3" /> Liabilities shown separately</span>
          </div>
        </div>
      </div>
    </section>
  );
}
