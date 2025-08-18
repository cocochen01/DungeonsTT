import { useEffect, useRef } from "react";
import { enableCameraControls } from "../../tabletop/pixi/cameraControls";
import { setupPixi } from "../../tabletop/pixi/pixiApp";

const GameroomTabletop = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    (async () => {
      if (!containerRef.current) return;

      const { app, camera } = await setupPixi(containerRef.current);

      enableCameraControls(app, camera);
    })();

    return () => {
      if (containerRef.current) {
        // cleanup ?
      }
    };
  }, []);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
  );
};

export default GameroomTabletop;
