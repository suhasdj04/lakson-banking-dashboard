import { ArrowUpRight, LayoutDashboard, Layers3, ReceiptText, ShieldCheck } from 'lucide-react';

const links = [
  { label: 'Overview', href: '#overview', Icon: LayoutDashboard },
  { label: 'My products', href: '#products', Icon: Layers3 },
  { label: 'Recent activity', href: '#activity', Icon: ReceiptText },
];

function Brand() {
  return (
    <a href="#overview" className="flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald/30" aria-label="LAKSON, overview">
      <img src="/mark.svg" width="39" height="39" alt="" className="rounded-[13px]" />
      <span className="text-[17px] font-extrabold tracking-[.08em]">LAKSON<span className="text-emerald">.</span></span>
    </a>
  );
}

interface SidebarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export function Sidebar({ activeSection, onNavigate }: SidebarProps) {
  return (
    <aside className="sidebar" aria-label="Main navigation">
      <Brand />
      <div className="mt-12 px-3 section-eyebrow">Workspace</div>
      <nav className="mt-3 flex flex-col gap-1.5" aria-label="Dashboard sections">
        {links.map(({ label, href, Icon }) => {
          const section = href.slice(1);
          const active = activeSection === section;
          return (
            <a
              key={href}
              href={href}
              onClick={() => onNavigate(section)}
              className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-[13px] font-semibold transition ${active ? 'bg-[#eaf2ec] text-[#174b38] dark:bg-[#193429] dark:text-[#bce3c9]' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
              aria-current={active ? 'location' : undefined}
            >
              <Icon className="size-[17px]" strokeWidth={1.8} />
              {label}
              {active && <span className="ml-auto size-1.5 rounded-full bg-emerald" />}
            </a>
          );
        })}
      </nav>

      <div className="mt-auto rounded-2xl border border-line bg-[#f7f9f5] p-4 dark:bg-[#1a241e]">
        <div className="flex items-center gap-2 text-[11px] font-bold text-foreground">
          <ShieldCheck className="size-4 text-emerald" /> Private by design
        </div>
        <p className="mt-2 text-[11px] leading-5 text-muted-foreground">A single view of your products. This assessment uses demonstration data only.</p>
        <a href="#products" className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-emerald hover:underline">Explore products <ArrowUpRight className="size-3" /></a>
      </div>
      <div className="mt-5 flex items-center justify-between px-2 text-[10px] text-muted-foreground">
        <span>LAKSON • DEMO</span><span>v1.0</span>
      </div>
    </aside>
  );
}
