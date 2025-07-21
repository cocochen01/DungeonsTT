import { useEffect } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useChatStore } from "../../store/useChatStore";
import LeftSidebarSkeleton from "./skeletons/LeftSidebarSkeleton";
import ChatHeader from "../../features/chat/ChatHeader";

const RightSidebar = () => {
  const { getGamerooms, gamerooms, currentGameroom, setCurrentGameroom, isGameroomsLoading } = useChatStore();

  const { activeGamerooms } = useAuthStore();

  useEffect(() => {
    getGamerooms();
  }, [getGamerooms]);

  if (isGameroomsLoading) return <LeftSidebarSkeleton />;

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <p>No Gameroom selected</p>

    </div>
  );
};

export default RightSidebar;