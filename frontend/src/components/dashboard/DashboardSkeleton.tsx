import { Skeleton } from '@/components/ui/skeleton';

export function DashboardSkeleton() {
  return (
    <div className="space-y-6" aria-label="Loading dashboard" role="status">
      <Skeleton className="h-7 w-48" />
      <Skeleton className="h-[240px] w-full rounded-[28px]" />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => <Skeleton key={index} className="h-[126px] rounded-[20px]" />)}
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        <Skeleton className="h-[310px] rounded-[22px]" />
        <Skeleton className="h-[310px] rounded-[22px]" />
      </div>
      <span className="sr-only">Loading your demonstration portfolio…</span>
    </div>
  );
}
