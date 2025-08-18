import { Application, Container } from "pixi.js";
import { GridManager } from "../grid/gridManager";

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

  const gridManager = new GridManager(camera, {
    cellSize: 50,
    rows: 50,
    cols: 50,
  });

  camera.position.set(app.renderer.width / 2, app.renderer.height / 2);

  return { app, camera, uiLayer, gridManager };
}
