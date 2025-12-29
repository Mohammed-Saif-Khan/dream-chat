import { Skeleton } from "../ui/skeleton";

export function FavouriteSkeleton() {
  return (
    <div className="pt-4 px-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <Skeleton className="w-8 h-8 rounded-full mr-1" />

          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-3 w-3 mx-1" />
          <Skeleton className="h-4 w-12" />

          <Skeleton className="h-3 w-4 ml-2" />
        </div>

        <Skeleton className="h-4 w-24" />
      </div>

      {/* Message bubble */}
      <div className="mt-2">
        <div className="flex items-center gap-1">
          <Skeleton className="mt-1 p-3 w-sm h-10 rounded-t-xl rounded-r-xl" />
        </div>
      </div>

      <Skeleton className="mt-4 h-px w-full" />
    </div>
  );
}
