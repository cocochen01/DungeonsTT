import { Container, Graphics } from "pixi.js";

interface GridOptions {
  cellSize?: number;
  lineColor?: number;
  lineWidth?: number;
  rows?: number; // number of rows to generate
  cols?: number; // number of cols to generate
}

export function createGridLayer(options: GridOptions = {}): Container {
  const {
    cellSize = 50,
    lineColor = 0xcccccc,
    lineWidth = 1,
    rows = 100, // enough to cover a big world area
    cols = 100,
  } = options;

  const gridContainer = new Container();
  const graphics = new Graphics();

  graphics.setStrokeStyle({
    width: lineWidth,
    color: lineColor,
    alpha: 1,
  });
  
  graphics.beginPath();

  const totalWidth = cols * cellSize;
  const totalHeight = rows * cellSize;

  // Draw vertical lines
  for (let x = 0; x <= totalWidth; x += cellSize) {
    graphics.moveTo(x, 0);
    graphics.lineTo(x, totalHeight);
  }

  // Draw horizontal lines
  for (let y = 0; y <= totalHeight; y += cellSize) {
    graphics.moveTo(0, y);
    graphics.lineTo(totalWidth, y);
  }

  graphics.stroke();
  gridContainer.addChild(graphics);

  // Center the grid at 0,0 (optional, makes panning easier)
  gridContainer.pivot.set(totalWidth / 2, totalHeight / 2);

  return gridContainer;
}
