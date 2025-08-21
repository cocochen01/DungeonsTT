import { MousePointer2, Hand, Ruler, Brush, TypeOutline, Swords } from "lucide-react";
import { useSidebarStore, type LeftSidebarPanel } from "../../store/useSidebarStore";
import { ToolbarButton, ToolbarDivider } from "./ToolbarButton";
import { useChatStore } from "../../store/useChatStore";
import D20SVG from "../SvgComponent";

const LeftSideToolBar = () => {
  const { setLeftActivePanel, leftActivePanel } = useSidebarStore();
    const { currentGameroom } = useChatStore();

    const handleButton = (panel: LeftSidebarPanel) => {
      if (!currentGameroom) return;
      if (leftActivePanel !== panel) setLeftActivePanel(panel);
    };

  return (
    <div className="h-full flex flex-col items-center gap-2 py-4 border-r border-base-300">
      {/**Tools */}
      <ToolbarButton icon={MousePointer2} label="Select" onClick={() => handleButton("select")}/>
      <ToolbarButton icon={Hand} label="Pan" onClick={() => handleButton("pan")}/>
      <ToolbarButton icon={Ruler} label="Measure" onClick={() => handleButton("measure")}/>
      <ToolbarButton icon={Brush} label="Draw" onClick={() => handleButton("draw")}/>
      <ToolbarButton icon={TypeOutline} label="Text" onClick={() => handleButton("text")}/>
      <ToolbarDivider/>
      {/**Game */}
      <ToolbarButton icon={D20SVG} label="Dice" onClick={() => handleButton("dice")}/>
      <ToolbarButton icon={Swords} label="Turn Order" onClick={() => handleButton("turnorder")}/>
      <ToolbarDivider/>
      {/**GameMaster */}
    </div>
  );
};

export default LeftSideToolBar;
