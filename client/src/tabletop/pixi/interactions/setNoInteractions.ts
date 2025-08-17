import { Container } from "pixi.js";

export function setNoInteractions(container: Container, containerDom: HTMLElement) {
  container.eventMode = "static";

  container.on("pointerdown", (e) => e.stopPropagation());
  container.on("pointertap", (e) => e.stopPropagation());
  container.on("pointerover", (e) => e.stopPropagation());
  container.on("pointerout", (e) => e.stopPropagation());

  if (containerDom) {
    const handleWheel = (e: WheelEvent) => {
      const bounds = container.getBounds();
      if (
        e.offsetX >= bounds.x &&
        e.offsetX <= bounds.x + bounds.width &&
        e.offsetY >= bounds.y &&
        e.offsetY <= bounds.y + bounds.height
      ) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    containerDom.addEventListener("wheel", handleWheel, { passive: false });

    container.on("removed", () => {
      containerDom.removeEventListener("wheel", handleWheel);
    });
  }
}
