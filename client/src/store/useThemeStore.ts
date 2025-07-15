import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("app-theme") || "coffee",
  setTheme: (theme: any) => {
    localStorage.setItem("app-theme", theme);
    set({ theme });
  },
}));