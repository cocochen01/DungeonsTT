import { Users } from "lucide-react";

const LeftSidebarSkeleton = () => {
  // Create 8 skeleton items
  const skeletonGamerooms = Array(8).fill(null);

  return (
    <aside
      className="h-full w-20 xl:w-72 border-r border-base-300 
    flex flex-col transition-all duration-200"
    >
      {/* Header */}
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6" />
          <span className="font-medium hidden xl:block">Gamerooms</span>
        </div>
      </div>

      {/* Skeleton Gamerooms */}
      <div className="overflow-y-auto w-full py-3">
        {skeletonGamerooms.map((_, idx) => (
          <div key={idx} className="w-full p-3 flex items-center gap-3">
            {/* Avatar skeleton */}
            <div className="relative mx-auto xl:mx-0">
              <div className="skeleton size-12 rounded-full" />
            </div>

            {/* User info skeleton - only visible on larger screens */}
            <div className="hidden xl:block text-left min-w-0 flex-1">
              <div className="skeleton h-4 w-32 mb-2" />
              <div className="skeleton h-3 w-16" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default LeftSidebarSkeleton;