import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonMovieDetails() {
  return (
    <div className="relative min-h-screen bg-gray-900 text-white">
      <div className="absolute inset-0">
        <Skeleton className="w-full h-full" />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          {/* Poster Image */}
          <div className="md:w-1/3 mb-8 md:mb-0">
            <Skeleton className="w-[300px] h-[450px] rounded-lg" />
          </div>
          {/* Movie Details */}
          <div className="md:w-2/3 md:pl-8 space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-6 w-1/4" />
            <div>
              <Skeleton className="h-6 w-1/3 mb-2" />
              <div className="flex flex-wrap space-x-2 space-y-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={index} className="h-6 w-16 rounded-md" />
                ))}
              </div>
            </div>
            <div>
              <Skeleton className="h-6 w-1/3 mb-2" />
              <div className="flex flex-wrap space-x-2 space-y-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={index} className="h-6 w-20 rounded-md" />
                ))}
              </div>
            </div>
            <div>
              <Skeleton className="h-6 w-1/3 mb-2" />
              <div className="flex flex-wrap space-x-2 space-y-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={index} className="h-6 w-24 rounded-md" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
