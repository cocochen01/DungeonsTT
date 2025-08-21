import { Grid, MessageSquare, SquareUserRound } from "lucide-react";
import { useSidebarStore, type RightSidebarPanel } from "../../store/useSidebarStore";
import { ToolbarButton, ToolbarDivider } from "./ToolbarButton";
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
      <ToolbarButton icon={SquareUserRound} label="Journal" onClick={() => handleButton("journal")}/>
      <ToolbarButton icon={MessageSquare} label="Chat" onClick={() => handleButton("chat")}/>
      <ToolbarDivider/>
      {/**GameMaster */}
      <ToolbarButton icon={Grid} label="Grid" onClick={() => handleButton("grid")}/>
    </div>
  );
};

export default RightSideToolBar;
