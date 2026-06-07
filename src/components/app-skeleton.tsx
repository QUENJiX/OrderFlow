import { Skeleton } from "./ui/skeleton";

function StatSkeletons() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton className="h-[104px] rounded-lg" key={index} />
      ))}
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <Skeleton className="h-11 w-full rounded-none" />
      <div className="divide-y divide-border">
        {Array.from({ length: 8 }).map((_, index) => (
          <div className="flex items-center gap-4 px-4 py-3" key={index}>
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="ml-auto h-4 w-16" />
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function MerchantSkeleton() {
  return (
    <div className="grid min-h-screen bg-background lg:grid-cols-[256px_minmax(0,1fr)]">
      <aside className="hidden border-r border-sidebar-border bg-sidebar p-3 lg:block">
        <div className="flex items-center gap-2.5 px-1 py-3">
          <Skeleton className="size-8 rounded-md" />
          <div className="space-y-1.5">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-2.5 w-20" />
          </div>
        </div>
        <Skeleton className="mt-2 h-14 w-full rounded-md" />
        <div className="mt-4 space-y-1.5">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton className="h-8 w-full rounded-md" key={index} />
          ))}
        </div>
      </aside>
      <div className="flex min-h-screen flex-col">
        <header className="flex items-center gap-3 border-b border-border px-4 py-2.5 lg:px-6">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="ml-auto h-9 w-40 rounded-md" />
          <Skeleton className="size-8 rounded-md" />
          <Skeleton className="h-9 w-28 rounded-md" />
        </header>
        <main className="flex-1 space-y-3 px-4 py-6 lg:px-6">
          <StatSkeletons />
          <TableSkeleton />
        </main>
      </div>
    </div>
  );
}

export function ControlSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center gap-3 border-b border-border px-4 py-2.5 lg:px-6">
        <Skeleton className="size-8 rounded-md" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="ml-auto size-8 rounded-md" />
        <Skeleton className="h-8 w-40 rounded-md" />
      </header>
      <main className="mx-auto max-w-[1400px] space-y-3 px-4 py-6 lg:px-6">
        <Skeleton className="h-8 w-56" />
        <StatSkeletons />
        <TableSkeleton />
      </main>
    </div>
  );
}
