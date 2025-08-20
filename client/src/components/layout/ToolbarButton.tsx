interface ToolbarButtonProps {
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
  active?: boolean;
}

export const ToolbarButton = ({ icon: Icon, label, onClick, active }: ToolbarButtonProps) => {
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