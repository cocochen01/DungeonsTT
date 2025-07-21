import LeftSidebar from "../components/layout/LeftSidebar";
import NoGameroomSelected from "../features/gameroom/NoGameroomSelected";
import ChatContainer from "../features/chat/ChatContainer";
import GameroomTabletop from "../features/gameroom/GameroomTabletop";
import { useChatStore } from "../store/useChatStore";
import RightSidebar from "../components/layout/RightSideBar";


const HomePage = () => {
  const { currentGameroom: selectedGameroom } = useChatStore();

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-xl w-full max-w-[1600px] h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            
            {/* LEFT: Rooms list */}
            <div className="w-1/5 border-r border-base-300">
              <LeftSidebar />
            </div>

            {/* CENTER: Tabletop */}
            <div className="w-3/5 bg-base-200">
              {selectedGameroom ? <GameroomTabletop /> : <NoGameroomSelected />}
            </div>  

            {/* RIGHT: other stuff */}
            <div className="w-1/5 border-l border-base-300">
              <RightSidebar />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;