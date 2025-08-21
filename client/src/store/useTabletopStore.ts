// store/gridStore.ts
import { create } from "zustand";

interface TabletopState {
  cellSize: number;
  rows: number;
  cols: number;
  lineColor: number;
  lineWidth: number;

  // actions
  setCellSize: (size: number) => void;
  setRows: (rows: number) => void;
  setCols: (cols: number) => void;
  setLineColor: (color: number) => void;
  setLineWidth: (width: number) => void;
}

export const useTabletopStore = create<TabletopState>((set) => ({
  cellSize: 5,
  rows: 50,
  cols: 50,
  lineColor: 0xcccccc,
  lineWidth: 1,

  setCellSize: (cellSize) => set({ cellSize }),
  setRows: (rows) => set({ rows }),
  setCols: (cols) => set({ cols }),
  setLineColor: (lineColor) => set({ lineColor }),
  setLineWidth: (lineWidth) => set({ lineWidth }),
}));
