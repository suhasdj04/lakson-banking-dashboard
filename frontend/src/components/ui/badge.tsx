import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

const styles: Record<string, string> = {
  default: 'bg-[#e5f2e9] text-[#245d3a] dark:bg-[#173d2c] dark:text-[#9fd4ae]',
  secondary: 'bg-muted text-muted-foreground',
  outline: 'border border-line text-muted-foreground',
  warning: 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300',
  success: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300',
  subtle: 'bg-[#f1f4ef] text-[#667169] dark:bg-[#202823] dark:text-[#aab5ad]',
};

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof styles;
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn('inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold leading-none', styles[variant], className)}
      {...props}
    />
  );
}
