import { useChatStore } from "../../store/useChatStore";
import ChatHeader from "../../features/chat/ChatHeader";
import ChatContainer from "../../features/chat/ChatContainer";

const RightSidebar = () => {
  const { currentGameroom } = useChatStore();
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