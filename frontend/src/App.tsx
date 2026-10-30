import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { ArrowRight, BadgeCheck, Sparkles } from 'lucide-react';
import { ApplicationDialog } from '@/components/products/ApplicationDialog';
import { DashboardError, SearchEmpty } from '@/components/common/StatusStates';
import { DashboardSkeleton } from '@/components/dashboard/DashboardSkeleton';
import { PortfolioHero } from '@/components/dashboard/PortfolioHero';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { SummaryCards } from '@/components/dashboard/SummaryCards';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { ProductDetailsDialog } from '@/components/products/ProductDetailsDialog';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductFilters } from '@/components/products/ProductFilters';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useDashboardData } from '@/hooks/useDashboardData';
import { categoryLabel } from '@/lib/utils';
import type { Product } from '@/types';

const BalanceChart = lazy(() => import('@/components/charts/BalanceChart').then((module) => ({ default: module.BalanceChart })));
const InvestmentPerformance = lazy(() => import('@/components/charts/InvestmentPerformance').then((module) => ({ default: module.InvestmentPerformance })));
const PortfolioDistribution = lazy(() => import('@/components/charts/PortfolioDistribution').then((module) => ({ default: module.PortfolioDistribution })));

function ChartPlaceholder() {
  return <div role="status" aria-label="Loading visualization" className="min-h-[310px] animate-pulse rounded-2xl border border-line bg-white/50 dark:bg-[#151c18]" />;
}

function getInitialTheme(): 'light' | 'dark' {
  try {
    return localStorage.getItem('lakson-theme') === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

export default function App() {
  const { products, categories, summary, transactions, loading, error, retry } = useDashboardData();
  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme);
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [applicationProduct, setApplicationProduct] = useState<Product | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try { localStorage.setItem('lakson-theme', theme); } catch { /* Theme still works in the current session. */ }
  }, [theme]);

  useEffect(() => {
    const syncActiveSection = () => {
      const section = window.location.hash.slice(1);
      setActiveSection(section === 'products' || section === 'activity' ? section : 'overview');
    };
    window.addEventListener('hashchange', syncActiveSection);
    return () => window.removeEventListener('hashchange', syncActiveSection);
  }, []);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return products.filter((product) => {
      const matchesCategory = selectedCategory === 'all' || product.type === selectedCategory;
      const searchable = `${product.name} ${product.category} ${categoryLabel(product.type)} ${product.status}`.toLocaleLowerCase();
      return matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [products, selectedCategory, query]);

  function showDetails(product: Product) {
    setSelectedProduct(product);
  }

  function showApplication(product: Product) {
    setSelectedProduct(null);
    setApplicationProduct(product);
  }

  return (
    <div className="app-shell">
      <Sidebar activeSection={activeSection} onNavigate={setActiveSection} />
      <div className="main-wrap">
        <Header theme={theme} onToggleTheme={() => setTheme((value) => value === 'light' ? 'dark' : 'light')} payment={summary?.upcoming_payment ?? null} activeSection={activeSection} onNavigate={setActiveSection} />
        <main className="main-content">
          <div id="overview" className="scroll-mt-24">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="section-eyebrow">A considered view of your money</p>
                <h1 className="mt-2 text-[25px] font-semibold tracking-[-.045em] sm:text-[30px]">Everything, in balance.</h1>
                <p className="mt-1 text-xs text-muted-foreground">Your accounts, credit, and investments—together at last.</p>
              </div>
              <Badge variant="subtle" className="w-fit border border-line bg-white/70 px-3 py-2 text-[9px] tracking-[.12em] dark:bg-[#151c18]"><Sparkles className="size-3 text-[#b07f42]" /> FICTIONAL DEMONSTRATION DATA</Badge>
            </div>

            {loading && <DashboardSkeleton />}
            {!loading && error && <DashboardError message={error} onRetry={retry} />}

            {!loading && !error && summary && (
              <div className="space-y-8">
                <PortfolioHero summary={summary} />
                <SummaryCards summary={summary} categoryCount={categories.length} />

                <section id="charts" aria-labelledby="insights-heading" className="scroll-mt-24 space-y-4">
                  <div className="flex flex-wrap items-end justify-between gap-2">
                    <div><p className="section-eyebrow">A little perspective</p><h2 id="insights-heading" className="mt-1.5 text-[18px] font-semibold tracking-tight">See the shape of it.</h2></div>
                    <span className="text-[10px] text-muted-foreground">All values are illustrative</span>
                  </div>
                  <div className="grid gap-4 xl:grid-cols-2">
                    <Suspense fallback={<ChartPlaceholder />}><PortfolioDistribution summary={summary} /></Suspense>
                    <Suspense fallback={<ChartPlaceholder />}><BalanceChart summary={summary} /></Suspense>
                  </div>
                </section>

                <section id="products" aria-labelledby="products-heading" className="scroll-mt-24 space-y-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="section-eyebrow">One place to see it all</p>
                      <h2 id="products-heading" className="mt-1.5 text-[18px] font-semibold tracking-tight">Your products.</h2>
                      <p className="mt-1 text-[11px] text-muted-foreground">Details are fictional; no live banking connection.</p>
                    </div>
                    <Button asChild variant="outline" size="sm" className="hidden w-fit sm:inline-flex"><a href="#activity">See recent activity <ArrowRight className="size-3.5" /></a></Button>
                  </div>
                  <ProductFilters categories={categories} selected={selectedCategory} onSelect={setSelectedCategory} query={query} onQuery={setQuery} />
                  <div className="grid gap-3.5 md:grid-cols-2 xl:grid-cols-3">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} onDetails={showDetails} onApply={showApplication} />
                    ))}
                    {filteredProducts.length === 0 && <SearchEmpty query={query || categoryLabel(selectedCategory)} onClear={() => { setQuery(''); setSelectedCategory('all'); }} />}
                  </div>
                </section>

                <section aria-labelledby="growth-heading" className="grid scroll-mt-24 gap-4 xl:grid-cols-2">
                  <h2 id="growth-heading" className="sr-only">Investment performance and recent activity</h2>
                  <Suspense fallback={<ChartPlaceholder />}><InvestmentPerformance summary={summary} /></Suspense>
                  <RecentActivity transactions={transactions} />
                </section>

                <footer className="flex flex-col gap-3 border-t border-line pt-5 text-[10px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                  <span className="inline-flex items-center gap-2"><img src="/mark.svg" width="20" height="20" alt="" className="rounded-md" /> LAKSON <span className="text-muted-foreground/60">·</span> A clearer view of everything you hold.</span>
                  <span className="inline-flex items-center gap-1.5"><BadgeCheck className="size-3.5 text-emerald" /> Demo only—no products, accounts, or transactions are real.</span>
                </footer>
              </div>
            )}

            <div className="sr-only" aria-live="polite">{loading ? 'Loading demonstration portfolio' : error ? 'Dashboard error' : `${filteredProducts.length} products shown`}</div>
          </div>
        </main>
      </div>
      <ProductDetailsDialog product={selectedProduct} onOpenChange={(open) => { if (!open) setSelectedProduct(null); }} onApply={showApplication} />
      <ApplicationDialog product={applicationProduct} onOpenChange={(open) => { if (!open) setApplicationProduct(null); }} />
    </div>
  );
}
