import { Graphics } from "pixi.js";

interface GridOptions {
  cellSize?: number;
  lineColor?: number;
  lineWidth?: number;
  rows?: number;
  cols?: number;
}

export function drawGrid(graphics: Graphics, options: GridOptions = {}) {
  const scaleValue = 10;

  let {
    cellSize = 5,
    lineColor = 0xcccccc,
    lineWidth = 1,
    rows = 50,
    cols = 50,
  } = options;

  cellSize = Math.min(Math.max(cellSize ?? 1, 1), 50);
  rows = Math.min(Math.max(rows ?? 1, 1), 50);
  cols = Math.min(Math.max(cols ?? 1, 1), 50);

  const scaledCellSize = cellSize * scaleValue;
  const totalWidth = cols * scaledCellSize;
  const totalHeight = rows * scaledCellSize;

  graphics.clear();

  // Draw vertical lines
  for (let x = 0; x <= totalWidth; x += scaledCellSize) {
    graphics.poly([x, 0, x, totalHeight]).stroke({
      width: lineWidth,
      color: lineColor,
      alpha: 1,
    });
  }

  // Draw horizontal lines
  for (let y = 0; y <= totalHeight; y += scaledCellSize) {
    graphics.poly([0, y, totalWidth, y]).stroke({
      width: lineWidth,
      color: lineColor,
      alpha: 1,
    });
  }

  graphics.pivot.set(totalWidth / 2, totalHeight / 2);
}
