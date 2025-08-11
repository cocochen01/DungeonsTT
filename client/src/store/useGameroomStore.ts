import { create } from "zustand";
import type { Gameroom } from "../types/gameroom";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";


interface GameroomStore {
  myGamerooms: Gameroom[];
  isGameroomsLoading: boolean;
  getGamerooms: () => Promise<void>;
}

export const useGameroomStore = create<GameroomStore>((set) => ({
  myGamerooms: [],
  isGameroomsLoading: false,

  getGamerooms: async () => {
    set({ isGameroomsLoading: true });
    try {
      const res = await axiosInstance.get("/gameroom/mygamerooms");
      set({ myGamerooms: res.data });
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log("Error in GetGamerooms: ", error.response.data.message);
    } finally {
      set({ isGameroomsLoading: false });
    }
  },
}));