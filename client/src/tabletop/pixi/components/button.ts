import { Container, Graphics, Text, Sprite, Texture } from "pixi.js";

interface ButtonOptions {
  label: string;
  iconTexture?: Texture;
  width?: number;
  height?: number;
  onClick: () => void;
}

export function createButton(options: ButtonOptions): Container {
  const button = new Container();
  button.eventMode = "static";
  button.cursor = "pointer";

  const width = options.width ?? 40;
  const height = options.height ?? 40;

  const bg = new Graphics()
    .rect(0, 0, width, height)
    .fill(0x444444);

  button.addChild(bg);

  if (options.iconTexture) {
    const icon = new Sprite(options.iconTexture);
    icon.width = 24;
    icon.height = 24;
    icon.position.set((width - 24) / 2, (height - 24) / 2);
    button.addChild(icon);
  } else {
    const label = new Text({
      text: options.label, 
      style: { fill: 0xffffff, fontSize: 12 }
    });
    label.position.set(5, height / 2 - 6);
    button.addChild(label);
  }

  button.on("pointertap", options.onClick);

  return button;
}
