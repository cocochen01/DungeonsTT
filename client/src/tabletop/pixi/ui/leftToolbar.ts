import { Container, Graphics, Text } from "pixi.js";
import { GridManager } from "../../grid/gridManager";

export function createToolbar(gridManager: GridManager, screenWidth: number, screenHeight: number) {
  const toolbar = new Container();
  toolbar.eventMode = "static";

  const bg = new Graphics()
    .rect(0, 0, 60, screenHeight)
    .fill(0x222222)
  toolbar.addChild(bg);

  const gridButtonContainer = new Container();
  gridButtonContainer.eventMode = "static";
  gridButtonContainer.cursor = "pointer";
  gridButtonContainer.position.set(10, 10);

  const gridButtonBg = new Graphics()
    .rect(0, 0, 40, 40)
    .fill(0x444444)

  const gridLabel = new Text({
    text: "Grid",
    style: { fill: 0xffffff, fontSize: 12 }
  });
  gridLabel.position.set(5, 12);

  gridButtonContainer.addChild(gridButtonBg, gridLabel);

  gridButtonContainer.on("pointertap", () => {
    showGridSettingsPopup(gridManager, toolbar, screenWidth, screenHeight);
  });

  toolbar.addChild(gridButtonContainer);

  return toolbar;
}

function showGridSettingsPopup(
  gridManager: GridManager,
  uiLayer: Container,
  screenWidth: number,
  screenHeight: number
) {
  const popup = new Container();

  const bg = new Graphics()
    .roundRect(0, 0, 200, 150, 10)
    .fill(0xffffff)
  popup.addChild(bg);

  gridManager.updateGrid({ rows: 100, cols: 100, cellSize: 40 });

  popup.position.set((screenWidth - 200) / 2, (screenHeight - 150) / 2);

  uiLayer.addChild(popup);
}