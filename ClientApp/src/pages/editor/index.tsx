import { Grid, OrbitControls, OrthographicCamera, PerspectiveCamera, Resize, Stats, TransformControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Gizmo } from "../../components/gizmo/gizmo.component";
import { useSpring, animated } from '@react-spring/three'
import { createRef, MouseEvent, MouseEventHandler, ReactNode, Ref, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { ControlPanel } from "../../components/gui/controlpanel.component";

import { button, Leva, useControls } from "leva";
import { useSettings } from "../../components/gui/settings.component";

type ShapeProps = {
  active: boolean;
  setActive: (value: boolean) => void;
  shape?: string;
}

function handleShape(shape?: string): ReactNode {
  let selection = "";
  if (shape != undefined) {
    selection = shape.toLowerCase();
  } 
  switch(selection) {
    case "box":
      return <boxGeometry/>;
    case "sphere":
      return <sphereGeometry/>;
    case "cone":
      return <coneGeometry/>;
    case "cylinder":
      return <cylinderGeometry/>;
    case "tube":
      return <tubeGeometry/>;
    case "cone":
      return <coneGeometry/>;
    case "torus":
      return <torusGeometry/>;
    case "torus knot":
      return <torusKnotGeometry/>;
    case "tetrahedron":
      return <tetrahedronGeometry/>;
    case "polyhedron":
      return <polyhedronGeometry/>;
    case "icosahedron":
      return <icosahedronGeometry/>;
    case "octahedron":
      return <octahedronGeometry/>;
    case "dodecahedron":
      return <dodecahedronGeometry/>;
    case "extrude":
      return <extrudeGeometry/>;
    case "lathe":
      return <latheGeometry/>;
    default: 
      return <torusKnotGeometry/>;
  }
}

function Shape({ active, setActive, shape }: ShapeProps) {
  return (
    <mesh
      onClick={() => {
        setActive(!active)
      }}>
      {handleShape(shape)}
      <meshStandardMaterial />
    </mesh>
  )
}

type TransformProps = {
  position?: Array<number>;
  orbit: any;
}

function TransformBox({ position, orbit }: TransformProps) {
  const transform = useRef<THREE.Mesh>(null!);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (transform.current) {
      const { current: controls } = transform
      const callback = (event) => {
        orbit.current.enabled = !event.value
      }
      transform.current.addEventListener('dragging-changed', callback)
      return () => controls.removeEventListener('dragging-changed', callback)
    }
  })

  return (
    <TransformControls
      showX={active ? true : false}
      showY={active ? true : false}
      showZ={active ? true : false}
      position={position}
      ref={transform}
      mode="translate"
    >
      <Shape active={active} setActive={setActive} />
    </TransformControls>
  )
}

export default function Editor() {
  const ref = useRef<THREE.Mesh>(null!);
  const position = useSettings((s) => s.directionalLight.position.x)
  const positionArray = Object.values(position);
  const colors = useSettings((s) => s.colors);
  const directionalLightColors = useSettings((s) => s.directionalLight.color);
  const grid = useSettings((s) => s.grid);
  const intensity = useSettings((s) => s.directionalLight.intensity.value)
  const height = useSettings((s) => s.generation.Height);
  const detail = useSettings((s) => s.generation.Detail);
  const color = new THREE.Color(colors["Color"].color);
  const directionalLightColor = new THREE.Color(directionalLightColors["color"]);
  const hsl = color.getHSL({ h: 0, s: 1, l: 1 });
  const orbit = useRef<THREE.Mesh>(null!);

  color.setHSL(
    hsl.h,
    hsl.s * 1.7,
    hsl.l * 1
  );

  function handleClick(index: number) {
    console.log("clicked", index);
  }

  const meshArray: Array<ReactNode> = [
    <TransformBox orbit={orbit} position={[0, 0, 0]}/>,
    <TransformBox orbit={orbit} position={[5, 5, 5]}/>,
    <TransformBox orbit={orbit} position={[10, 10, 10]}/>,
    <TransformBox orbit={orbit} position={[15, 15, 15]}/>,
    <TransformBox orbit={orbit} position={[20, 20, 20]}/>,
    <TransformBox orbit={orbit} position={[25, 25, 25]}/>,
  ]

  return (
    <>
      <ControlPanel/>
      <Canvas
        camera={{ fov: 75, near: 0.1, far: 1000, position: [1, 2, 5] }}
      >
        <Grid cellColor="white" infiniteGrid={grid}/>
        <OrthographicCamera />
        <ambientLight intensity={intensity} />
        <directionalLight color={directionalLightColor} position={positionArray} />
        {meshArray.map((reactNode) => (
          reactNode
        ))}
        <Gizmo/>
        <OrbitControls makeDefault />
        {/* <Stats showPanel={0}/>  */}
      </Canvas>
    </>
  );
}