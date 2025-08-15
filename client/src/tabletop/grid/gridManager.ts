import { Container } from "pixi.js";
import { createGridLayer } from "./gridLayer";

interface GridOptions {
  cellSize?: number;
  lineColor?: number;
  lineWidth?: number;
  rows?: number;
  cols?: number;
}

export class GridManager {
  public container: Container;
  private options: GridOptions;
  private parent: Container;

  constructor(parent: Container, options: GridOptions = {}) {
    this.parent = parent;
    this.options = {
      cellSize: 50,
      lineColor: 0xcccccc,
      lineWidth: 1,
      rows: 100,
      cols: 100,
      ...options,
    };

    this.container = createGridLayer(this.options);
    this.parent.addChild(this.container);
  }

  updateGrid(newOptions: GridOptions) {
    this.options = { ...this.options, ...newOptions };

    // Remove old grid
    this.parent.removeChild(this.container);
    this.container.destroy({ children: true });

    // Create new grid
    this.container = createGridLayer(this.options);
    this.parent.addChild(this.container);
  }

  getOptions() {
    return this.options;
  }
}
