import { useEffect } from "react";
import { useGameStore } from "../store/useGameStore";

const LeftSidebar = () => {
  const { getGamerooms, gamerooms, selectedGameroom, setSelectedGameroom, isGameroomsLoading } = useGameStore();

  const activeGamerooms = [];

  useEffect(() => {
    getGamerooms();
  }, [getGamerooms]);

  return (
    <div>LeftSidebar</div>
  )
};

export default LeftSidebar;