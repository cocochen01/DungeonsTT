import { create } from "zustand";

export type LeftSidebarPanel = "token" | "text" | "drawing" | null;
export type RightSidebarPanel = "chat" | "settings" | null;

interface SidebarStore {
  leftActivePanel: LeftSidebarPanel;
  rightActivePanel: RightSidebarPanel;
  setLeftActivePanel: (panel: LeftSidebarPanel) => void;
  setRightActivePanel: (panel: RightSidebarPanel) => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  leftActivePanel: null,
  rightActivePanel :null,
  setLeftActivePanel: (panel) => set({ leftActivePanel: panel }),
  setRightActivePanel: (panel) => set({ rightActivePanel: panel }),
}));
