import { useEffect } from "react";
import { useChatStore } from "../../store/useChatStore";
// import LeftSidebarSkeleton from "./skeletons/LeftSidebarSkeleton";
import ChatHeader from "../../features/chat/ChatHeader";
import ChatContainer from "../../features/chat/ChatContainer";

const RightSidebar = () => {
  const { getGamerooms, currentGameroom, isGameroomsLoading } = useChatStore();

  useEffect(() => {
    getGamerooms();
  }, [getGamerooms]);

  // if (isGameroomsLoading) return <LeftSidebarSkeleton />;

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      {currentGameroom ? <ChatContainer /> : (
        <div className="p-4 text-zinc-400 text-sm italic">
          No gameroom selected.
        </div>
      )}
    </div>
  );
};

export default RightSidebar;