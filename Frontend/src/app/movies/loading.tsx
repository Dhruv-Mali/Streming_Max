import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonMovieGrid() {
  return (
    <div className="mt-10 px-10 mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="relative shadow-md rounded-lg overflow-hidden"
          >
            <Skeleton className="h-80 w-56 object-contain border-2 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}
