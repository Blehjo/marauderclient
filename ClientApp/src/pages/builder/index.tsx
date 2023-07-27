import { OrbitControls, Sphere } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { Gizmo } from "../../components/gizmo/gizmo.component";
import { GUI } from "../../components/gui/gui.component";
import { Lights } from "../../components/lights/lights.component";
import { Terrain } from "../../components/terrain/terrain.components";
import Editor, { Selectors } from "../editor";

export default function Builder() {
  return (
    <>
      <GUI/>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [7, 5, 7], near: 0.1, far: 20, fov: 50 }}
        style={{ paddingTop: '5rem' }}
      >
        <OrbitControls
          autoRotate
          autoRotateSpeed={0.2}
          enablePan={false}
          minDistance={3}
          maxDistance={12}
          makeDefault
        />
        <Gizmo />
        <Lights />
        <Terrain />
      </Canvas>
    </>
  );
}