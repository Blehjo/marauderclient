import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { Gizmo } from "../../components/gizmo/gizmo.component";
import { GUI } from "../../components/gui/gui.component";
import { Lights } from "../../components/lights/lights.component";
import { Terrain } from "../../components/terrain/terrain.components";

export default function Builder() {
  return (
    <div style={{ height: '100vh' }}>
      <GUI/>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [7, 5, 7], near: 0.1, far: 20, fov: 50 }}
        style={{ paddingTop: '5rem' }}
      >
        <OrbitControls
          enablePan={false}
          minDistance={3}
          maxDistance={12}
          makeDefault
        />
        <Gizmo />
        <Lights />
        <Terrain />
      </Canvas>
    </div>
  );
}