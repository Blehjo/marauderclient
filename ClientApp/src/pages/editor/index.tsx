import { Grid, OrbitControls, OrthographicCamera, TransformControls } from "@react-three/drei";
import { Canvas, Vector3 } from "@react-three/fiber";
import { ReactNode, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Gizmo } from "../../components/gizmo/gizmo.component";
import { ControlPanel } from "../../components/gui/controlpanel.component";

import { useDispatch, useSelector } from "react-redux";
import { Selectors } from "../../components/editor/selector.component";
import { useSettings } from "../../components/gui/settings.component";
import { setShape } from "../../store/editor/editor.action";
import { selectEditorShape, selectEditorShapes } from "../../store/editor/editor.selector";

type ShapeProps = {
  shape?: string;
  position?: Vector3;
  orbit: any;
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
      return <latheGeometry/>;
  }
}

function Shape({ shape, position, orbit }: ShapeProps) {
  const shapes = useSelector(selectEditorShapes);
  const content: any = [];
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

  content.push(
    <TransformControls
      showX={active ? true : false}
      showY={active ? true : false}
      showZ={active ? true : false}
      position={position}
      ref={transform}
      mode="translate"
    >
      <mesh
        onClick={() => {
          setActive(!active)
        }}>
        {handleShape(shape)}
        <meshStandardMaterial />
      </mesh>
    </TransformControls>
  );

  return content;
}

export default function Editor() {
  const shape = useSelector(selectEditorShape);
  const dispatch = useDispatch();
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

  function handleInquiry(value: string) {
    dispatch(setShape(value))
  }

  return (
    <>
      <Selectors shape={shape} handleShape={handleInquiry}/>
      <Canvas
        camera={{ fov: 75, near: 0.1, far: 1000, position: [1, 2, 5] }}
        >
          <ControlPanel/>
        <Grid cellColor="white" infiniteGrid={grid}/>
        <OrthographicCamera />
        <ambientLight intensity={intensity} />
        <directionalLight color={directionalLightColor} position={positionArray} />
        <Shape orbit={orbit}/>
        <Gizmo/>
        <OrbitControls makeDefault />
      </Canvas>
    </>
  );
}