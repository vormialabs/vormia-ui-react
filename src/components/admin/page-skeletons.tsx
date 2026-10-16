import { Skeleton } from '#/components/ui/skeleton'

/** Matches overview dashboard: title + KPIs + charts. */
export function DashboardSkeleton() {
  return (
    <div className="space-y-5" aria-busy="true" aria-label="Loading dashboard">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-3 w-64 max-w-full" />
        </div>
        <div className="flex gap-1.5">
          <Skeleton className="h-8 w-24 rounded-md" />
          <Skeleton className="h-8 w-28 rounded-md" />
          <Skeleton className="h-8 w-28 rounded-md" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-soft)]"
          >
            <div className="flex justify-between">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="size-4 rounded" />
            </div>
            <Skeleton className="mt-4 h-8 w-16" />
            <Skeleton className="mt-3 h-2.5 w-28" />
          </div>
        ))}
      </div>
      <Skeleton className="h-10 w-full rounded-lg" />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Skeleton className="h-64 w-full rounded-xl" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
      <Skeleton className="h-40 w-full rounded-xl" />
    </div>
  )
}

/** Matches Records / Inventory list chrome. */
export function TablePageSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <section className="admin-panel" aria-busy="true" aria-label="Loading table">
      <div className="table-tools mb-4 flex flex-wrap gap-3">
        <Skeleton className="h-10 w-full max-w-xs" />
        <Skeleton className="h-10 w-36" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-9 w-full" />
        {Array.from({ length: rows }).map((_, i) => (
          <Skeleton key={i} className="h-11 w-full" />
        ))}
      </div>
    </section>
  )
}

/** Matches settings form. */
export function SettingsSkeleton() {
  return (
    <section className="admin-panel max-w-md space-y-5" aria-busy="true" aria-label="Loading settings">
      <Skeleton className="h-5 w-48" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-11 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-11 w-full" />
      </div>
      <Skeleton className="h-10 w-32" />
    </section>
  )
}
