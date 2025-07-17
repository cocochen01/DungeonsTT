import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import type { User } from "../types/user";

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

  checkAuth: () => Promise<void>;
  signup: (data: SignUpData) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: any) => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  authUser: null, // Null if not logged in
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  activeGamerooms: [],

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
}));