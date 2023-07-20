import { Grid, OrbitControls, OrthographicCamera, PerspectiveCamera, Resize, TransformControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Gizmo } from "../../components/gizmo/gizmo.component";
import { useSpring, animated } from '@react-spring/three'
import { useRef, useState } from "react";
import * as THREE from "three";
import { ControlPanel } from "../../components/gui/controlpanel.component";

import { button, Leva, useControls } from "leva";

export default function Editor() {
  const ref = useRef<THREE.Mesh>(null!);
  return (
    <>
      <ControlPanel/>
      <Canvas>
        <Grid cellColor="white" infiniteGrid/>
        <OrthographicCamera position={[0,0,10]} />
        <ambientLight intensity={0.1} />
        <directionalLight color="red" position={[0, 0, 5]} />
        <TransformControls object={ref} mode="translate" />
        <mesh castShadow receiveShadow >
          <boxGeometry args={[0,1,1]}/>
          <meshStandardMaterial color="blue"/>
        </mesh>
        <mesh castShadow receiveShadow ref={ref}>
          <dodecahedronGeometry args={[1,1]}  />
          <meshStandardMaterial color="white" />
        </mesh>
        <Gizmo/>
        <OrbitControls makeDefault />
      </Canvas>
    </>
  );
}