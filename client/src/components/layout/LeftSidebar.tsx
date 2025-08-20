import { useEffect } from "react";
import { useChatStore } from "../../store/useChatStore";
import LeftSidebarSkeleton from "./skeletons/LeftSidebarSkeleton";
import { Users } from "lucide-react";
import { useGameroomStore } from "../../store/useGameroomStore";
import { useSocketStore } from "../../store/useSocketStore";
import LeftSideToolBar from "./LeftSideToolBar";

const LeftSidebar = () => {
  const { socket } = useSocketStore();
  const { currentGameroom, setCurrentGameroom, setupSocketListeners } = useChatStore();
  const { getGamerooms, myGamerooms, isGameroomsLoading } = useGameroomStore();

  useEffect(() => {
    if (socket) {
      setupSocketListeners();
    }
  }, [socket, setupSocketListeners]);

  useEffect(() => {
    getGamerooms();
  }, [getGamerooms]);

  if (isGameroomsLoading) return <LeftSidebarSkeleton />;

  return (
    <div className="flex flex-row h-full overflow-hidden">
      <aside
        className={`h-full border-r border-base-300 flex flex-col 
          ${currentGameroom ? "w-20" : "w-20 xl:w-60"}`}
      >
        {/* Header */}
        <div className="border-b border-base-300 w-full p-5">
          <div className="flex items-center gap-2">
            <Users className="size-6" />
            {!currentGameroom && (
              <span className="font-medium hidden xl:block">Your Gamerooms</span>
            )}
          </div>
        </div>

        {/* Rooms list */}
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
              <div className={`relative ${currentGameroom ? "mx-auto" : "mx-auto xl:mx-0"}`}>
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

              {/* Show text only if sidebar is expanded */}
              {!currentGameroom && (
                <div className="hidden xl:block text-left min-w-0">
                  <div className="font-medium truncate">{gameroom.name}</div>
                  <div className="text-sm text-zinc-400">
                    {gameroom.isActive ? "Active" : "Inactive"}
                  </div>
                </div>
              )}
            </button>
          ))}

          {myGamerooms.length === 0 && (
            <div className="text-center text-zinc-500 py-4">No active gamerooms</div>
          )}
        </div>
      </aside>

      {/* Toolbar */}
      <div className="w-12 h-full overflow-hidden">
        <LeftSideToolBar />
      </div>
    </div>
  );
};

export default LeftSidebar;
