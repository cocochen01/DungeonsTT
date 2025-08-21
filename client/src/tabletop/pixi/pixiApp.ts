// pixi/setupPixi.ts
import { Application, Container } from "pixi.js";
import { GridManager } from "../grid/gridManager";
import { useTabletopStore } from "../../store/useTabletopStore";

export async function setupPixi(container: HTMLElement) {
  const app = new Application();
  await app.init({
    width: 800,
    height: 600,
    backgroundColor: 0x29bb52,
    antialias: true,
    resolution: 1,
    preference: "webgl",
    resizeTo: container,
  });
  container.appendChild(app.canvas);

  const camera = new Container();
  const uiLayer = new Container();

  app.stage.addChild(camera);
  app.stage.addChild(uiLayer);

  // initialize
  const state = useTabletopStore.getState();
  const gridManager = new GridManager(camera, {
    cellSize: state.cellSize,
    rows: state.rows,
    cols: state.cols,
    lineColor: state.lineColor,
    lineWidth: state.lineWidth,
  });

  camera.position.set(app.renderer.width / 2, app.renderer.height / 2);

  // update values
  useTabletopStore.subscribe((newState) => {
    gridManager.updateGrid(newState);
  });

  return { app, camera, uiLayer, gridManager };
}
