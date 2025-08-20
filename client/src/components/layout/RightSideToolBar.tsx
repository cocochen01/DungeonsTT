import { Home, Settings, Users, Grid, MessageSquare } from "lucide-react";
import { useSidebarStore, type RightSidebarPanel } from "../../store/useSidebarStore";
import { ToolbarButton } from "./ToolbarButton";
import { useChatStore } from "../../store/useChatStore";

const RightSideToolBar = () => {
  const { setRightActivePanel, rightActivePanel } = useSidebarStore();
  const { currentGameroom } = useChatStore();

  const handleButton = (panel: RightSidebarPanel) => {
    if (!currentGameroom) return;
    if (rightActivePanel !== panel) setRightActivePanel(panel);
  };
  return (
    <div className="h-full flex flex-col items-center gap-2 py-4 border-r border-base-300">
      <ToolbarButton icon={Grid} label="Grid"/>
      <ToolbarButton icon={MessageSquare} label="Chat" onClick={() => handleButton("chat")}/>
      <ToolbarButton icon={Home} label="Home" />
      <ToolbarButton icon={Users} label="Users" />
      <ToolbarButton icon={Settings} label="Settings" onClick={() => { if (rightActivePanel !== "settings") setRightActivePanel("settings");}}/>
    </div>
  );
};

export default RightSideToolBar;
