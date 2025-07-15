import { create } from "zustand";
import type { Theme } from "../constants";

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: localStorage.getItem("app-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("app-theme", theme);
    set({ theme });
  },
}));