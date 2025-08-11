import { create } from "zustand";
import { io, Socket } from "socket.io-client";
import { useAuthStore } from "./useAuthStore";

const BASE_URL = "http://localhost:3001";

interface SocketStore {
  socket: Socket | null;
  connectSocket: (gameroomId: string) => void;
  disconnectSocket: () => void;
}

export const useSocketStore = create<SocketStore>((set) => ({
  socket: null,

  connectSocket: (gameroomId) => {
    const authUserId = useAuthStore.getState().authUser?._id;
    if (!authUserId) {
      console.error("No authenticated user found for socket connection");
      return;
    }

    const socket = io(BASE_URL, {
      query: { userId: authUserId, gameroomId },
      withCredentials: true,
    });

    set({ socket });
  },

  disconnectSocket: () => {
    set((state) => {
      state.socket?.disconnect();
      return { socket: null };
    });
  },
}));
