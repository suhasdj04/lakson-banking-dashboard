import { useMemo, useState } from 'react';
import { Bell, CalendarClock, Check, ChevronRight, Menu, Moon, Sun, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { formatCurrency, formatDate } from '@/lib/utils';
import type { PaymentSummary } from '@/types';

interface HeaderProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  payment: PaymentSummary | null;
  activeSection: string;
  onNavigate: (section: string) => void;
}

const mobileLinks = [
  { label: 'Overview', href: '#overview' },
  { label: 'My products', href: '#products' },
  { label: 'Recent activity', href: '#activity' },
];

export function Header({ theme, onToggleTheme, payment, activeSection, onNavigate }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const today = useMemo(
    () => new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date()),
    [],
  );

  return (
    <header className="topbar">
      <div className="flex min-w-0 items-center gap-3">
        <Dialog open={menuOpen} onOpenChange={setMenuOpen}>
          <Button variant="ghost" size="icon-sm" className="md:hidden" onClick={() => setMenuOpen(true)} aria-label="Open navigation">
            <Menu className="size-[18px]" />
          </Button>
          <DialogContent className="left-0 top-0 h-full max-h-none w-[min(88vw,320px)] translate-x-0 translate-y-0 rounded-none rounded-r-[24px] border-y-0 border-l-0" showClose={false}>
            <div className="flex items-center justify-between border-b border-line px-5 py-5">
              <a href="#overview" onClick={() => setMenuOpen(false)} className="flex items-center gap-2.5">
                <img src="/mark.svg" width="34" height="34" alt="" className="rounded-xl" />
                <span className="font-extrabold tracking-[.08em]">LAKSON<span className="text-emerald">.</span></span>
              </a>
              <Button variant="outline" size="sm" onClick={() => setMenuOpen(false)} aria-label="Close navigation" className="h-9 gap-1.5 px-2.5"><X className="size-4" /><span className="text-[11px]">Close</span></Button>
            </div>
            <DialogTitle className="sr-only">Dashboard navigation</DialogTitle>
            <nav className="flex flex-col gap-1 p-4" aria-label="Mobile dashboard navigation">
              {mobileLinks.map((link) => {
                const section = link.href.slice(1);
                const active = activeSection === section;
                return (
                  <a key={link.href} href={link.href} onClick={() => { onNavigate(section); setMenuOpen(false); }} className={`rounded-xl px-4 py-3 text-sm font-semibold ${active ? 'bg-[#eaf2ec] text-[#174b38] dark:bg-[#193429] dark:text-[#bce3c9]' : 'text-muted-foreground hover:bg-muted'}`} aria-current={active ? 'location' : undefined}>
                    {link.label}
                  </a>
                );
              })}
            </nav>
            <div className="mx-4 mt-2 rounded-2xl bg-muted p-4 text-xs leading-5 text-muted-foreground">Demonstration data only. No live banking connection.</div>
          </DialogContent>
        </Dialog>
        <div className="min-w-0">
          <p className="truncate text-[13px] font-semibold text-foreground">LAKSON</p>
          <p className="hidden truncate text-[11px] text-muted-foreground sm:block">{today}</p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2">
        <Badge variant="subtle" className="hidden border border-line px-2.5 py-1.5 text-[9px] tracking-[.12em] sm:inline-flex">DEMO ENVIRONMENT</Badge>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
              <Bell className="size-[17px]" />
              <span className="absolute right-[8px] top-[8px] size-1.5 rounded-full bg-[#d88944] ring-2 ring-[hsl(var(--canvas))]" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[min(330px,calc(100vw-24px))] p-0">
            <div className="flex items-center justify-between border-b border-line px-4 py-3.5">
              <div><p className="text-sm font-semibold">Notifications</p><p className="mt-0.5 text-[11px] text-muted-foreground">A few things to keep in view</p></div>
              <Badge variant="warning">{payment?.count ?? 0} due</Badge>
            </div>
            {payment ? (
              <DropdownMenuItem className="items-start gap-3 rounded-none px-4 py-4" onSelect={(event) => event.preventDefault()}>
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300"><CalendarClock className="size-4" /></span>
                <span className="min-w-0"><span className="block text-xs font-semibold">Upcoming payment</span><span className="mt-1 block text-[11px] leading-4 text-muted-foreground">{formatCurrency(payment.amount)}{payment.due_date ? ` scheduled by ${formatDate(payment.due_date)}` : ' scheduled soon'}. This is sample data.</span></span>
              </DropdownMenuItem>
            ) : (
              <div className="px-4 py-5 text-xs text-muted-foreground">No payment reminders to show.</div>
            )}
            <div className="border-t border-line px-4 py-3 text-[10px] text-muted-foreground"><Check className="mr-1 inline size-3 text-emerald" /> Notifications are for demonstration only.</div>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="ghost" size="icon" onClick={onToggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}>
          {theme === 'light' ? <Moon className="size-[17px]" /> : <Sun className="size-[17px]" />}
        </Button>
        <div className="ml-1 hidden size-9 items-center justify-center rounded-full bg-[#d7e8dc] text-[11px] font-bold text-[#174b38] ring-2 ring-white dark:bg-[#274637] dark:text-[#c6e4cf] dark:ring-[#222d26] sm:flex" aria-label="Alex Smith">AS</div>
        <ChevronRight className="hidden size-3.5 rotate-90 text-muted-foreground lg:block" aria-hidden="true" />
      </div>
    </header>
  );
}
