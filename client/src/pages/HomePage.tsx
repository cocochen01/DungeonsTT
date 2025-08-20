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
        <div className="bg-base-100 rounded-lg shadow-xl w-full h-[calc(100vh-8rem)] overflow-hidden">
          <div className="flex w-full h-full rounded-lg overflow-hidden">
            
            {/* LEFT: Rooms list */}
            <div className="flex border-r border-base-300">
              <LeftSidebar />
            </div>

            {/* CENTER: Tabletop */}
            <div className="flex flex-1 bg-base-200 overflow-hidden">
              {selectedGameroom ? <GameroomTabletop /> : <NoGameroomSelected />}
            </div>  

            {/* RIGHT: other stuff */}
            <div className="w-70 xl:w-100 flex-shrink-0 border-l border-base-300">
              <RightSidebar />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;