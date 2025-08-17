import { Application, Container, FederatedPointerEvent } from "pixi.js";

export function enableCameraControls(app: Application, camera: Container) {
  let isDragging = false;
  let lastX = 0;
  let lastY = 0;

  app.stage.eventMode = "static";
  app.stage.hitArea = app.screen;

  app.stage.on("pointerdown", (event: FederatedPointerEvent) => {
    isDragging = true;
    lastX = event.global.x;
    lastY = event.global.y;

    window.addEventListener("pointerup", handlePointerUp);
  });

  function handlePointerUp() {
    isDragging = false;
    window.removeEventListener("pointerup", handlePointerUp);
  }

  app.stage.on("pointermove", (event: FederatedPointerEvent) => {
    if (!isDragging) return;

    const dx = event.global.x - lastX;
    const dy = event.global.y - lastY;

    camera.x += dx;
    camera.y += dy;

    lastX = event.global.x;
    lastY = event.global.y;
  });

  app.canvas.addEventListener("wheel", (event) => {
    event.preventDefault();
    const scaleFactor = event.deltaY < 0 ? 1.1 : 0.9;
    camera.scale.x *= scaleFactor;
    camera.scale.y *= scaleFactor;
  });
}
