import { Skeleton } from "@/components/ui/skeleton";

export default function SalesLoading() {
  return (
    <div className="space-y-4 pb-8">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center py-1">
        <Skeleton className="h-8 w-48" />
        <div className="flex gap-2">
          <Skeleton className="h-9 w-9 rounded-full" />
          <Skeleton className="h-9 w-9 rounded-full" />
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-28" />
        </div>
      </div>

      {/* Toolbar Skeleton */}
      <div className="flex justify-between items-center border-b border-border/60 pb-3">
        <div className="flex items-center gap-4">
          <Skeleton className="h-7 w-44" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
        </div>
      </div>

      {/* Kanban Columns Skeleton */}
      <div className="flex gap-4 overflow-x-auto pb-6">
        <Skeleton className="w-80 h-[550px] shrink-0 rounded-xl" />
        <Skeleton className="w-80 h-[550px] shrink-0 rounded-xl" />
        <Skeleton className="w-80 h-[550px] shrink-0 rounded-xl" />
      </div>
    </div>
  );
}
