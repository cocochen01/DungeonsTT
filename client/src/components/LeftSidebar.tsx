import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";

const LeftSidebar = () => {
  const { getChatrooms, chatrooms, selectedChatroom, setSelectedChatroom, isChatroomsLoading } = useChatStore();

  const activeChatrooms = [];

  useEffect(() => {
    getChatrooms();
  }, [getChatrooms]);
  
  return (
    <div>LeftSidebar</div>
  )
};

export default LeftSidebar;