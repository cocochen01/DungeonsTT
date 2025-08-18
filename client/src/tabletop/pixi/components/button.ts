import { Graphics, Text, Sprite, Texture } from "pixi.js";
import { Button } from "@pixi/ui";

interface ButtonOptions {
  label: string;
  iconTexture?: Texture;
  width?: number;
  height?: number;
  onPress: () => void;
}

export function createButton(options: ButtonOptions): Button {
  const width = options.width ?? 40;
  const height = options.height ?? 40;

  const button = new Button(
    new Graphics()
      .rect(0, 0, width, height)
      .fill(0x444444)
  );

  if (options.iconTexture) {
    const icon = new Sprite(options.iconTexture);
    icon.width = 24;
    icon.height = 24;
    icon.position.set((width - 24) / 2, (height - 24) / 2);
    button.view.addChild(icon);
  } else {
    const label = new Text({
      text: options.label, 
      style: { fill: 0xffffff, fontSize: 12 }
    });
    label.position.set(5, height / 2 - 6);
    button.view.addChild(label);
  }

  button.onPress.connect(options.onPress);

  return button;
}
