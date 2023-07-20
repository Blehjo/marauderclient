import { Grid, OrbitControls, OrthographicCamera, PerspectiveCamera, Resize, TransformControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Gizmo } from "../../components/gizmo/gizmo.component";
import { useSpring, animated } from '@react-spring/three'
import { useRef, useState } from "react";
import * as THREE from "three";


export default function Box() {
    const ref = useRef<THREE.Mesh>(null!);
    return (
        <TransformControls object={ref} mode="translate">
            <mesh castShadow receiveShadow>
            <dodecahedronGeometry args={[0.9]} />
            <meshStandardMaterial color="white" />
            </mesh>
        </TransformControls>
    )
}