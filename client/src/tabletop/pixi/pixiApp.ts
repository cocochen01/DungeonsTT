import { Application } from 'pixi.js';

export async function setupPixi(container: HTMLElement) {
  const app = new Application();

  await app.init({
    width: 800,
    height: 600,
    backgroundColor: 0x29bb52,
    antialias: true,
    resolution: 1,
    preference: 'webgl', // or webgpu
    resizeTo: container,
  });

  container.appendChild(app.canvas);

  return app;
}
