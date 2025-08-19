import { create } from "zustand";

export type SidebarPanel = "chat" | "settings" | null;

interface SidebarStore {
  activePanel: SidebarPanel;
  setActivePanel: (panel: SidebarPanel) => void;
}

export const useRightSidebarStore = create<SidebarStore>((set) => ({
  activePanel: null,
  setActivePanel: (panel) => set({ activePanel: panel }),
}));
