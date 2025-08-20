import { Home, Settings, MessageSquare } from "lucide-react";
import { useSidebarStore } from "../../store/useSidebarStore";
import { ToolbarButton } from "./ToolbarButton";

const LeftSideToolBar = () => {
  const { setLeftActivePanel, leftActivePanel } = useSidebarStore();
  return (
    <div className="h-full flex flex-col items-center gap-2 py-4 border-r border-base-300">
      <ToolbarButton icon={Home} label="Home" />
      <ToolbarButton icon={MessageSquare} label="Tokens" onClick={() => { if (leftActivePanel !== "token") setLeftActivePanel("token");}}/>
      <ToolbarButton icon={Settings} label="Text" onClick={() => { if (leftActivePanel !== "text") setLeftActivePanel("text");}}/>
      <ToolbarButton icon={Settings} label="Drawing" onClick={() => { if (leftActivePanel !== "drawing") setLeftActivePanel("drawing");}}/>
    </div>
  );
};

export default LeftSideToolBar;
