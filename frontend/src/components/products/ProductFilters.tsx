import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import type { ProductCategory } from '@/types';

interface ProductFiltersProps {
  categories: ProductCategory[];
  selected: string;
  onSelect: (category: string) => void;
  query: string;
  onQuery: (query: string) => void;
}

const displayName: Record<string, string> = {
  all: 'All products',
  savings: 'Savings',
  credit_card: 'Credit cards',
  loan: 'Loans',
  investment: 'Investments',
};

export function ProductFilters({ categories, selected, onSelect, query, onQuery }: ProductFiltersProps) {
  const filters = [{ id: 'all', name: 'All products', count: categories.reduce((total, item) => total + item.count, 0) }, ...categories.map((item) => ({ ...item, name: displayName[item.id] ?? item.name }))];
  return (
    <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
      <div className="flex max-w-full gap-1 overflow-x-auto pb-1" role="tablist" aria-label="Filter by product type">
        {filters.map((filter) => {
          const active = selected === filter.id;
          return (
            <button
              type="button"
              key={filter.id}
              role="tab"
              aria-selected={active}
              onClick={() => onSelect(filter.id)}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 text-[11px] font-semibold transition ${active ? 'bg-[#174b38] text-white shadow-sm dark:bg-[#5aaf82] dark:text-[#0b2015]' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
            >
              {filter.name}<span className={`text-[9px] ${active ? 'text-white/65 dark:text-[#0b2015]/70' : 'text-muted-foreground/70'}`}>{filter.count}</span>
            </button>
          );
        })}
      </div>
      <div className="relative w-full shrink-0 xl:w-[270px]">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          value={query}
          onChange={(event) => onQuery(event.target.value)}
          placeholder="Name, type or status"
          aria-label="Search products by name, category, or status"
          className="h-10 rounded-full border-line bg-white pl-10 pr-10 text-xs dark:bg-[#151c18]"
        />
        {query && <button type="button" onClick={() => onQuery('')} aria-label="Clear product search" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"><X className="size-3.5" /></button>}
      </div>
    </div>
  );
}
