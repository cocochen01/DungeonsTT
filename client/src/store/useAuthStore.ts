import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import type { User } from "../types/user";
import { io, Socket } from "socket.io-client";


const BASE_URL = "http://localhost:3001";

// Custom hook for managing state
interface SignUpData {
  username: string;
  email: string;
  password: string;
}
interface LoginData {
  username: string;
  password: string;
}

interface AuthStore {
  authUser: User | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  activeGamerooms: string[];
  socket: Socket | null;

  checkAuth: () => Promise<void>;
  signup: (data: SignUpData) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: any) => Promise<void>;
  connectSocket: () => any;
  disconnectSocket: () => any;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  authUser: null, // Null if not logged in
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  activeGamerooms: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({authUser: res.data});
    } catch (error: any) {
      console.log("Error in CheckAuth:", error.response.data.message);
      set({authUser: null});
    } finally {
      set({isCheckingAuth: false});
    }
  },
  signup: async (data) => {
    set({ isSigningUp: true});
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created sucessfully");
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log("Error in SignUp: ", error.response.data.message);
    } finally {
      set({ isSigningUp: false});
    }
  },
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");

      get().connectSocket();
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log("Error in LogIn: ", error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("auth/logout");
      set({ authUser: null });
      toast.success("Logged out sucessfully");

      get().disconnectSocket();
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log("Error in LogOut: ", error.response.data.message);
    }
  },
  updateProfile: async (data) =>{
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log("Error in UpdateProfile: ", error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    
    socket.connect();

    set({ socket: socket });
  },
  disconnectSocket: () => {
    if (get().socket?.connected)
      get().socket?.disconnect();
  },
}));