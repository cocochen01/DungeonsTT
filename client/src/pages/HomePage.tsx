import LeftSidebar from "../components/layout/LeftSidebar";
import NoGameroomSelected from "../features/gameroom/NoGameroomSelected";
import GameroomTabletop from "../features/gameroom/GameroomTabletop";
import { useChatStore } from "../store/useChatStore";
import RightSidebar from "../components/layout/RightSideBar";


const HomePage = () => {
  const { currentGameroom: selectedGameroom } = useChatStore();

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-xl w-full max-w-[1980px] h-[calc(100vh-8rem)] overflow-hidden">
          <div className="flex h-full rounded-lg overflow-hidden">
            
            {/* LEFT: Rooms list */}
            <div className="w-1/8 border-r border-base-300">
              <LeftSidebar />
            </div>

            {/* CENTER: Tabletop */}
            <div className="w-5/8 bg-base-200">
              {selectedGameroom ? <GameroomTabletop /> : <NoGameroomSelected />}
            </div>  

            {/* RIGHT: other stuff */}
            <div className="w-2/8 border-l border-base-300">
              <RightSidebar />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;