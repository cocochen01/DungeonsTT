import LeftSidebar from "../components/LeftSidebar";
import NoRoomSelected from "../components/NoGameroomSelected";
import RightSidebar from "../components/RightSidebar";
import Gameroom from "../components/Gameroom";
import { useGameStore } from "../store/useGameStore";


const HomePage = () => {
  const { selectedGameroom } = useGameStore();

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
              {selectedGameroom ? <Gameroom /> : <NoRoomSelected />}
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