import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import type { Message } from "../types/message";
import type { Gameroom } from "../types/gameroom";

interface message {
  text: string;
  image?: string | null;
}

interface ChatStore {
  messages: Message[];
  gamerooms: Gameroom[];
  currentGameroom: Gameroom | null;
  isGameroomsLoading: boolean;
  isMessagesLoading: boolean;

  getGamerooms: () => Promise<void>;
  getMessages: (userId: string) => Promise<void>;
  sendMessage: (messageData: message) => Promise<void>;
  setCurrentGameroom: (selectedGameroom: Gameroom | null) => Promise<void>;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  gamerooms: [],
  currentGameroom: null,
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
  sendMessage: async (messageData) => {
    const { currentGameroom, messages } = get();
    try {
      if(currentGameroom) {
        const res = await axiosInstance.post(`/message/send/${currentGameroom._id}`, messageData);
        set({messages:[...messages, res.data]});
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log("Error in SendMessages: ", error.response.data.message);
    }
  },
  setCurrentGameroom: async (selectedGameroom) => set ({ currentGameroom: selectedGameroom }),
}));