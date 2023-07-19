import { Grid, OrbitControls, PerspectiveCamera, Resize, TransformControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Gizmo } from "../../components/gizmo/gizmo.component";
import { useSpring, animated } from '@react-spring/three'
import { useRef, useState } from "react";
import * as THREE from "three";


export default function Editor() {
  const ref = useRef<THREE.Mesh>(null!);
  return (
    <>
      <Canvas>
        <Grid cellColor="white" infiniteGrid/>
        <orthographicCamera position={[0,0,10]} />
        <ambientLight intensity={0.1} />
        <directionalLight color="red" position={[0, 0, 5]} />
        <TransformControls object={ref} mode="translate" />
        <Resize>
        <mesh castShadow receiveShadow ref={ref}>
          <boxGeometry />
          <meshStandardMaterial />
        </mesh>
        </Resize>
        <mesh castShadow receiveShadow>
            <dodecahedronGeometry args={[0.9]} />
            <meshStandardMaterial color="white" />
          </mesh>
        <Gizmo/>
        <OrbitControls makeDefault />
      </Canvas>
    </>
  );
}