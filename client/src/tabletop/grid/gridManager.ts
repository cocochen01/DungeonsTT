import { Container, Graphics } from "pixi.js";
import { drawGrid } from "./gridLayer";

interface GridOptions {
  cellSize?: number;
  lineColor?: number;
  lineWidth?: number;
  rows?: number;
  cols?: number;
}

export class GridManager {
  public gridGraphic: Graphics;
  private options: GridOptions;
  private parent: Container;

  constructor(parent: Container, options: GridOptions = {}) {
    this.parent = parent;
    this.options = {
      lineColor: 0xcccccc,
      lineWidth: 1,
      cellSize: 5,
      rows: 50,
      cols: 50,
      ...options,
    };

    this.gridGraphic = new Graphics();
    drawGrid(this.gridGraphic, this.options);

    this.parent.addChild(this.gridGraphic);
  }

  updateGrid(newOptions: GridOptions) {
    this.options = { ...this.options, ...newOptions };
    drawGrid(this.gridGraphic, this.options);
  }

  getOptions() {
    return this.options;
  }
}
