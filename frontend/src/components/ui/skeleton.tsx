import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded-xl bg-[#e8ece6] dark:bg-[#27312b]', className)} aria-hidden="true" {...props} />;
}
