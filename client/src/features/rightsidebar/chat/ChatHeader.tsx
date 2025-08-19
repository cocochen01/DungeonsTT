import { X } from "lucide-react";
import { useChatStore } from "../../../store/useChatStore";
//import { useAuthStore } from "../../store/useAuthStore";

const RightSidebarHeader = () => {
  const { currentGameroom, setCurrentGameroom } = useChatStore();
  //const { activeGamerooms } = useAuthStore();

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar - Todo: This area is for tabs instead */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={currentGameroom?.icon || "/avatar.png"} alt={currentGameroom?.name} />
            </div>
          </div>

          {/* User info 
          <div>
            <h3 className="font-medium">{currentGameroom?.name}</h3>
            <p className="text-sm text-base-content/70">
              { currentGameroom?.isActive ? "Active" : "Inactive" }
            </p>
          </div>*/}
        </div>

        {/* Close button */}
        <button onClick={() => setCurrentGameroom(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};
export default RightSidebarHeader;