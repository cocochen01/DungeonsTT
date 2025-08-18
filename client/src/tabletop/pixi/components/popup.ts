import { Container, Graphics } from "pixi.js";

export interface PopupOptions {
  content?: Container;
  width?: number;
  height?: number;
  bgColor?: number;
  cornerRadius?: number;
}

export class Popup extends Container {
  protected content?: Container;
  protected popupWidth: number;
  protected popupHeight: number;
  protected bgColor: number;
  protected cornerRadius: number;

  constructor(options: PopupOptions = {}) {
    super();

    this.popupWidth = options.width ?? 200;
    this.popupHeight = options.height ?? 150;
    this.bgColor = options.bgColor ?? 0xffffff;
    this.cornerRadius = options.cornerRadius ?? 10;
    this.content = options.content;

    this.createBackground();

    if (this.content) {
      this.addChild(this.content);
    }

    this.visible = false;
  }

  protected createBackground() {
    const bg = new Graphics()
      .roundRect(0, 0, this.popupWidth, this.popupHeight, this.cornerRadius)
      .fill(this.bgColor);
    this.addChild(bg);
  }

  public toggle() {
    this.visible = !this.visible;
  }

  public setupContent(): Container {
    // change content?
    return new Container;
  }
}
