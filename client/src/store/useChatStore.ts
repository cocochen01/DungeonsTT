import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import type { Message } from "../types/message";
import type { Chatroom } from "../types/chatroom";

interface ChatStore {
  messages: Message[];
  chatrooms: Chatroom[];
  selectedChatroom: Chatroom | null;
  isChatroomsLoading: boolean;
  isMessagesLoading: boolean;

  getChatrooms: () => Promise<void>;
  getMessages: (userId: string) => Promise<void>;
  setSelectedChatroom: (selectedChatroom: Chatroom) => Promise<void>;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  chatrooms: [],
  selectedChatroom: null,
  isChatroomsLoading: false,
  isMessagesLoading: false,

  getChatrooms: async () => {
    set({ isChatroomsLoading: true });
    try {
      const res = await axiosInstance.get("/chatroom/mychatrooms");
      set({ chatrooms: res.data });
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log("Error in GetChatrooms: ", error.response.data.message);
    } finally {
      set({ isChatroomsLoading: false });
    }
  },
  getMessages: async (chatroomId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${chatroomId}`);
      set({ messages: res.data });
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log("Error in GetMessages: ", error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  setSelectedChatroom: async (selectedChatroom) => set ({ selectedChatroom }),
}));