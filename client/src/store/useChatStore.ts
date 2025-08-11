import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import type { Message } from "../types/message";
import type { Gameroom } from "../types/gameroom";
import { useSocketStore } from "./useSocketStore";

interface message {
  text: string;
  image?: string | null;
}

interface ChatStore {
  messages: Message[];
  currentGameroom: Gameroom | null;
  activeUsers: string[];
  isMessagesLoading: boolean;

  setCurrentGameroom: (selectedGameroom: Gameroom | null) => Promise<void>;
  getMessages: (gameroomId: string) => Promise<void>;
  sendMessage: (messageData: message) => Promise<void>;
  setupSocketListeners: () => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  currentGameroom: null,
  activeUsers: [],
  isMessagesLoading: false,

  setCurrentGameroom: async (selectedGameroom) => {
  const { currentGameroom } = get();
  if (selectedGameroom?._id === currentGameroom?._id) return;

  const { disconnectSocket, connectSocket } = useSocketStore.getState();
  disconnectSocket();

  if (!selectedGameroom) {
    set({ currentGameroom: null });
    return;
  }

  set({ currentGameroom: null });

  try {
    await get().getMessages(selectedGameroom._id);
    set({ currentGameroom: selectedGameroom });
    connectSocket(selectedGameroom._id);
  } catch (err) {
    console.error("Failed to load messages:", err);
    set({ currentGameroom: null });
  }
},
  getMessages: async (gameroomId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${gameroomId}`);
      set({ messages: res.data });
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { currentGameroom, /*messages*/ } = get();
    const { socket } = useSocketStore.getState();
    if (!currentGameroom) return;
    try {
      await axiosInstance.post(`/message/send/${currentGameroom._id}`, messageData);
      socket?.emit("sendMessage", { gameroomId: currentGameroom._id });
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  },

  setupSocketListeners: () => {
    const { socket } = useSocketStore.getState();
    if (!socket) return;

    socket.on("newMessage", () => {
      const { currentGameroom } = get();
      if (currentGameroom) {
        get().getMessages(currentGameroom._id);
      }
      // TODO: Play sound?
    });

    socket.on("gameroomNotification", ({ gameroomId }) => {
      // TODO: Add green dot indicator in gamerooms list
      console.log("New activity in room:", gameroomId);
    });

    socket.on("getActiveUsers", (users) => {
      set({ activeUsers: Array.isArray(users) ? users : [] });
    });
  },
}));
