import { useEffect, useRef } from "react";
import { Application } from "pixi.js";
import { setupPixi } from "../../tabletop/pixi/pixiApp";
import { createGridLayer } from "../../tabletop/pixi/gridLayer";
import { enableCameraControls } from "../../tabletop/pixi/cameraControls";

const GameroomTabletop = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const appRef = useRef<Application | null>(null);

  useEffect(() => {
    (async () => {
      if (!containerRef.current) return;

      const { app, camera } = await setupPixi(containerRef.current);
      appRef.current = app;

      enableCameraControls(app, camera);

      const gridLayer = createGridLayer({ cellSize: 50, rows: 200, cols: 200 });
      camera.addChild(gridLayer);

      camera.position.set(app.renderer.width / 2, app.renderer.height / 2);
    })();

    return () => {
      if (appRef.current) {
        appRef.current.destroy(true, { children: true });
        appRef.current = null;
      }
    };
  }, []);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
};

export default GameroomTabletop;
