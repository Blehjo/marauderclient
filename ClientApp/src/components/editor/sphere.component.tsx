import { Grid, OrbitControls, OrthographicCamera, PerspectiveCamera, Resize, TransformControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Gizmo } from "../../components/gizmo/gizmo.component";
import { useSpring, animated } from '@react-spring/three'
import { useRef, useState } from "react";
import * as THREE from "three";

export default function Sphere() {
  const ref = useRef<THREE.Mesh>(null!);
  return (
    <TransformControls object={ref} mode="translate" >
    <mesh castShadow receiveShadow ref={ref}>
      <boxGeometry />
      <meshStandardMaterial color="blue"/>
    </mesh>
    </TransformControls>
  )
}