import { useChatStore } from "../../store/useChatStore";
import ChatHeader from "../../features/chat/ChatHeader";
import ChatContainer from "../../features/chat/ChatContainer";
import RightSideToolBar from "../../features/toolbar/RightSideToolBar";

const RightSidebar = () => {
  const { currentGameroom } = useChatStore();
  return (
    <div className="flex flex-row h-full overflow-hidden">
      <div className="w-12 h-full overflow-hidden">
        <RightSideToolBar />
      </div>
      <div className="flex flex-1 flex-col h-full overflow-hidden">
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
    </div>
  );
};

export default RightSidebar;