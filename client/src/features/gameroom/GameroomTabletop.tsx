import { useEffect, useRef } from "react";
import { Application } from "pixi.js";
import { setupPixi } from "../../tabletop/pixi/pixiApp";
import { enableCameraControls } from "../../tabletop/pixi/cameraControls";
import { GridManager } from "../../tabletop/grid/gridManager";
import { createToolbar } from "../../tabletop/pixi/ui/leftToolbar";

const GameroomTabletop = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const appRef = useRef<Application | null>(null);

  useEffect(() => {
    (async () => {
      if (!containerRef.current) return;

      const { app, camera, uiLayer } = await setupPixi(containerRef.current);
      appRef.current = app;

      const gridManager = new GridManager(camera, {
        cellSize: 50,
        rows: 50,
        cols: 50,
      });

      const toolbar = createToolbar(
        gridManager,
        app.renderer.width,
        app.renderer.height
      );
      uiLayer.addChild(toolbar);

      enableCameraControls(app, camera);
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
