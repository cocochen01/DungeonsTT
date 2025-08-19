import { useChatStore } from "../../store/useChatStore";
import RightSidebarHeader from "../../features/rightsidebar/chat/ChatHeader";
import ChatContainer from "../../features/rightsidebar/chat/ChatContainer";
import RightSideToolBar from "./RightSideToolBar";
import { useRightSidebarStore } from "../../store/useRightSidebarStore";
import GameSettings from "../../features/rightsidebar/settings/GameSettings";
import NoSelected from "../../features/rightsidebar/NoSelected";

const RightSidebar = () => {
  const { currentGameroom } = useChatStore();
  const { activePanel } = useRightSidebarStore();
  const renderContent = () => {
    if (!currentGameroom)
      return (<NoSelected />);

    switch (activePanel) {
      case "chat":
        return (<ChatContainer />);
      case "settings":
        return (<GameSettings />);
      default:
        return (<NoSelected />);
    }
  }
  return (
    <div className="flex flex-row h-full overflow-hidden">
      <div className="w-12 h-full overflow-hidden">
        <RightSideToolBar />
      </div>
      <div className="flex flex-1 flex-col h-full overflow-hidden">
        <RightSidebarHeader />
        <div className="flex-1 overflow-y-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;