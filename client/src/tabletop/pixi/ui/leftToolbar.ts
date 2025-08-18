import { Container, Graphics } from "pixi.js";
import { GridManager } from "../../grid/gridManager";
import { createButton } from "../components/button";
import { Popup } from "../components/popup";
import { setNoInteractions } from "../interactions/setNoInteractions";

export function createToolbar(parentCanvas: HTMLCanvasElement, gridManager: GridManager, screenWidth: number, screenHeight: number) {
  const toolbar = new Container();
  toolbar.eventMode = "static";

  const defaultBg = new Graphics()
    .rect(0, 0, 60, screenHeight)
    .fill(0x222222)
  defaultBg.eventMode = "static";
  setNoInteractions(toolbar, parentCanvas);

  toolbar.addChild(defaultBg);

  //popup
  const gridPopup = new Popup({ width: 200, height: 150 });
  gridPopup.position.set( (screenWidth - gridPopup.width) / 2, (screenHeight - gridPopup.height) / 2);

  gridPopup.on("added", () => {
    gridManager.updateGrid({ rows: 100, cols: 100, cellSize: 40 });
  });

  toolbar.addChild(gridPopup);

  //button
  const gridButton = createButton({
    label: "Grid",
    onPress: () => { gridPopup.toggle(); },
  });

  gridButton.view.position.set(10, 10);
  toolbar.addChild(gridButton.view);

  return toolbar;
}