import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import type { Message } from "../types/message";
import type { Gameroom } from "../types/gameroom";

interface GameStore {
  messages: Message[];
  gamerooms: Gameroom[];
  selectedGameroom: Gameroom | null;
  isGameroomsLoading: boolean;
  isMessagesLoading: boolean;

  getGamerooms: () => Promise<void>;
  getMessages: (userId: string) => Promise<void>;
  setSelectedGameroom: (selectedGameroom: Gameroom) => Promise<void>;
}

export const useGameStore = create<GameStore>((set) => ({
  messages: [],
  gamerooms: [],
  selectedGameroom: null,
  isGameroomsLoading: false,
  isMessagesLoading: false,

  getGamerooms: async () => {
    set({ isGameroomsLoading: true });
    try {
      const res = await axiosInstance.get("/gameroom/mygamerooms");
      set({ gamerooms: res.data });
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log("Error in GetGamerooms: ", error.response.data.message);
    } finally {
      set({ isGameroomsLoading: false });
    }
  },
  getMessages: async (gameroomId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${gameroomId}`);
      set({ messages: res.data });
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log("Error in GetMessages: ", error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  setSelectedGameroom: async (selectedGameroom) => set ({ selectedGameroom }),
}));