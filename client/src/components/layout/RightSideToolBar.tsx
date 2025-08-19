import { Home, Settings, Users, Grid, MessageSquare } from "lucide-react";
import { useRightSidebarStore } from "../../store/useRightSidebarStore";

interface ToolbarButtonProps {
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
  active?: boolean;
}

const ToolbarButton = ({ icon: Icon, label, onClick, active }: ToolbarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center w-10 h-10 rounded-xl transition-colors ${
        active ? "bg-primary/20" : "hover:bg-base-300"
      }`}
      title={label}
    >
      <Icon size={18} className="text-primary" />
    </button>
  );
};

const RightSideToolBar = () => {
  const { setActivePanel, activePanel } = useRightSidebarStore();
  return (
    <div className="h-full flex flex-col items-center gap-2 py-4 border-r border-base-300">
      <ToolbarButton icon={Grid} label="Grid"/>
      <ToolbarButton icon={MessageSquare} label="Chat" onClick={() => { if (activePanel !== "chat") setActivePanel("chat");}}/>
      <ToolbarButton icon={Home} label="Home" />
      <ToolbarButton icon={Users} label="Users" />
      <ToolbarButton icon={Settings} label="Settings" onClick={() => { if (activePanel !== "settings") setActivePanel("settings");}}/>
    </div>
  );
};

export default RightSideToolBar;
