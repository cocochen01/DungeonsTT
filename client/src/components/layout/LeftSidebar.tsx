import { useEffect } from "react";
import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from "../../store/useAuthStore";
import LeftSidebarSkeleton from "./skeletons/LeftSidebarSkeleton";
import { Users } from "lucide-react";
import { useGameroomStore } from "../../store/useGameroomStore";
import { useSocketStore } from "../../store/useSocketStore";

const LeftSidebar = () => {
  const { socket } = useSocketStore();
  const { currentGameroom, setCurrentGameroom, setupSocketListeners } = useChatStore();
  const { getGamerooms, myGamerooms, isGameroomsLoading } = useGameroomStore();

  const { activeGamerooms } = useAuthStore();

  useEffect(() => {
    if (socket) {
      console.log("useeffect");
      setupSocketListeners();
    }
  }, [socket, setupSocketListeners]);

  useEffect(() => {
    getGamerooms();
  }, [getGamerooms]);

  if (isGameroomsLoading) return <LeftSidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Your Gamerooms</span>
        </div>
        {/* TODO: Online filter toggle 
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">({onlineUsers.length - 1} online)</span>
        </div>*/}
      </div>

      <div className="overflow-y-auto w-full py-3">
        {myGamerooms.map((gameroom) => (
          <button
            key={gameroom._id}
            onClick={() => setCurrentGameroom(gameroom)}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${currentGameroom?._id === gameroom._id ? "bg-base-300 ring-1 ring-base-300" : ""}
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={gameroom.icon || "/avatar.png"}
                alt={gameroom.name}
                className="size-12 object-cover rounded-full"
              />
              {gameroom.isActive && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                />
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{gameroom.name}</div>
              <div className="text-sm text-zinc-400">
                {gameroom.isActive ? "Active" : "Inactive"}
              </div>
            </div>
          </button>
        ))}

        {activeGamerooms.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No active gamerooms</div>
        )}
      </div>
    </aside>
  );
};
export default LeftSidebar;