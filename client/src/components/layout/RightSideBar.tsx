import { useEffect } from "react";
import { useChatStore } from "../../store/useChatStore";
// import LeftSidebarSkeleton from "./skeletons/LeftSidebarSkeleton";
import ChatHeader from "../../features/chat/ChatHeader";
import ChatContainer from "../../features/chat/ChatContainer";

const RightSidebar = () => {
  const { getGamerooms, currentGameroom } = useChatStore();

  useEffect(() => {
    getGamerooms();
  }, [getGamerooms]);

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto">
        {currentGameroom ? (
          <ChatContainer />
        ) : (
          <div className="p-4 text-zinc-400 text-sm italic">
            No gameroom selected.
          </div>
        )}
      </div>
    </div>
  );
};

export default RightSidebar;