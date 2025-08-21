import { useChatStore } from "../../store/useChatStore";
import RightSidebarHeader from "../../features/rightsidebar/chat/ChatHeader";
import ChatContainer from "../../features/rightsidebar/chat/ChatContainer";
import RightSideToolBar from "./RightSideToolBar";
import { useSidebarStore } from "../../store/useSidebarStore";
import GridSettings from "../../features/rightsidebar/settings/GridSettings";
import NoSelected from "../../features/rightsidebar/NoSelected";

const RightSidebar = () => {
  const { currentGameroom } = useChatStore();
  const { rightActivePanel } = useSidebarStore();
  const renderContent = () => {
    if (!currentGameroom)
      return (<NoSelected />);

    switch (rightActivePanel) {
      case "chat":
        return (<ChatContainer />);
      case "grid":
        return (<GridSettings />);
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