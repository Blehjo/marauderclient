import { Grid, OrbitControls, OrthographicCamera, PerspectiveCamera, Resize, Stats, TransformControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Gizmo } from "../../components/gizmo/gizmo.component";
import { useSpring, animated } from '@react-spring/three'
import { createRef, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { ControlPanel } from "../../components/gui/controlpanel.component";

import { button, Leva, useControls } from "leva";
import { useSettings } from "../../components/gui/settings.component";

export default function Editor() {
  const ref = useRef<THREE.Mesh>(null!);
  const position = useSettings((s) => s.directionalLight.position.x)
  const positionArray = Object.values(position);
  const colors = useSettings((s) => s.colors);
  const directionalLightColors = useSettings((s) => s.directionalLight.color);
  const height = useSettings((s) => s.generation.Height);
  const detail = useSettings((s) => s.generation.Detail);
  const color = new THREE.Color(colors["Color"].color);
  const directionalLightColor = new THREE.Color(directionalLightColors["color"]);
  const hsl = color.getHSL({ h: 0, s: 1, l: 1 });

  color.setHSL(
    hsl.h,
    hsl.s * 1.7,
    hsl.l * 1
  );

  return (
    <>
      <ControlPanel/>
      <Canvas
        camera={{ fov: 75, near: 0.1, far: 1000, position: [1, 2, 5] }}
      >
        <Grid cellColor="white" infiniteGrid={false}/>
        <OrthographicCamera />
        <ambientLight intensity={0.1} />
        <directionalLight color={directionalLightColor} position={positionArray} />
        <TransformControls object={ref} mode="translate" />
        <mesh castShadow receiveShadow >
          <boxGeometry args={[1,1,1]}/>
          <meshStandardMaterial color="blue"/>
        </mesh>
        <mesh castShadow receiveShadow ref={ref}>
          <dodecahedronGeometry args={[height, detail * 100]}  />
          <meshStandardMaterial color={color} />
        </mesh>
        <Gizmo/>
        <OrbitControls makeDefault />
        {/* <Stats showPanel={0}/>  */}
      </Canvas>
    </>
  );
}