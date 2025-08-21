import { create } from "zustand";

export type LeftSidebarPanel = "select" | "pan" | "measure" | "draw" | "text" | "dice" | "turnorder" | null;
export type RightSidebarPanel = "grid" | "journal" | "chat" | null;

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
