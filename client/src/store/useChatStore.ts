import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import type { Message } from "../types/message";
import type { User } from "../types/user";
import type { Chatroom } from "../types/chatroom";

interface ChatStore {
  messages: Message[];
  users: User[];
  selectedChatroom: Chatroom | null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  users: [],
  selectedChatroom: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/message/users");
      set({ users: res.data });
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log("Error in GetUsers: ", error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId: string) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      set({ messages: res.data });
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log("Error in GetMessages: ", error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
}));