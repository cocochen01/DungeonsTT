import { Container, Graphics, Text, Sprite, Texture } from "pixi.js";
import { Button } from "@pixi/ui";

interface ButtonOptions {
  label: string;
  iconTexture?: Texture;
  width?: number;
  height?: number;
  onPress: () => void;
}

export function createButton(options: ButtonOptions): Container {
  const button = new Container();
  
  const width = options.width ?? 40;
  const height = options.height ?? 40;

  const newButton = new Button(
    new Graphics()
      .rect(0, 0, width, height)
      .fill(0x444444)
  );

  newButton.onPress.connect(options.onPress);
  button.addChild(newButton.view);

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

  button.on("pointertap", options.onPress);

  return button;
}
