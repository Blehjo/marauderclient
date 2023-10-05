import { Grid, OrbitControls, OrthographicCamera, TransformControls } from "@react-three/drei";
import { Canvas, Vector3 } from "@react-three/fiber";
import { ReactNode, createRef, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Gizmo } from "../../components/gizmo/gizmo.component";
import { ControlPanel } from "../../components/gui/controlpanel.component";

import { useDispatch, useSelector } from "react-redux";
import { Selectors } from "../../components/editor/selector.component";
import { useSettings } from "../../components/gui/settings.component";
import { editorCreateStart, editorDeleteStart, editorFetchAllStart, editorFetchSingleStart, setShape } from "../../store/editor/editor.action";
import { selectEditorShape, selectEditorShapes, selectEditorSingleShape } from "../../store/editor/editor.selector";
import { selectAllGltfs, selectSingleGltf, selectUserGltfs } from "../../store/gltf/gltf.selector";
import { gltfFetchSingleStart, gltfFetchUserStart } from "../../store/gltf/gltf.action";
import { useParams } from "next/navigation";
import { selectIsMaraudersOpen } from "../../store/messagebox/messagebox.selector";
import ShapesContainer from "../../components/editor/shapes.component";

enum Controls {
  forward = 'forward',
  back = 'back',
  left = 'left',
  right = 'right',
  jump = 'jump',
}

type ShapeProps = {
  shape?: string;
  position?: {
    x: number,
    y: number,
    z: number
  };
  orbit: any;
  shapeId: number;
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

function Shape({ shape, position, orbit, shapeId }: ShapeProps) {
  const transform = useRef<any>(null!);
  const [active, setActive] = useState(false);
  const positionArray: THREE.Vector3 = new THREE.Vector3(position?.x, position?.y, position?.z);
  const colors = useSettings((s) => s.colors);
  const color = new THREE.Color(colors["Color"].color);
  const hsl = color.getHSL({ h: 0, s: 1, l: 1 });
  const height = useSettings((s) => s.generation.height);
  color.setHSL(
    hsl.h,
    hsl.s * 1.7,
    hsl.l * 1
  );

  useEffect(() => {
    if (transform.current) {
      const { current: controls } = transform
      const callback = (event: any) => {
        orbit.current.enabled = !event.value
      }
      transform.current.addEventListener('dragging-changed', callback)
      return () => controls.removeEventListener('dragging-changed', callback)
    }
  });

  return (
    <>
      {
        active &&
        <ControlPanel shapeId={shapeId}/>
      }
      <TransformControls
        showX={active ? true : false}
        showY={active ? true : false}
        showZ={active ? true : false}
        position={positionArray}
        ref={transform}
        mode="translate"
      >
        <mesh 
          onClick={() => {
            setActive(!active)
        }}>
          {handleShape(shape)}
          <meshStandardMaterial color={color}/>
        </mesh>
      </TransformControls>
    </>
  )
}

export default function Editor() {
  const file = useSelector(selectSingleGltf);
  const sidemenu = useSelector(selectIsMaraudersOpen);
  const files = useSelector(selectAllGltfs);
  const shape = useSelector(selectEditorShape);
  const shapes = useSelector(selectEditorShapes);
  const userShapes = useSelector(selectEditorSingleShape);
  const dispatch = useDispatch();
  const position = useSettings((s) => s.directionalLight.position.x);
  const positionArray = new THREE.Vector3(position);
  const directionalLightColors = useSettings((s) => s.directionalLight.color);
  const grid = useSettings((s) => s.grid);
  const intensity = useSettings((s) => s.directionalLight.intensity.value);
  const directionalLightColor = new THREE.Color(directionalLightColors["color"]);
  const orbit = useRef<THREE.Mesh>(null!);
  const refs = useRef(Array.from({length: 10}, a => createRef()));
  console.log("REFS::: ", refs)

  function handleInquiry(value: string): void {
    dispatch(setShape(value))
  }

  function addShape(shapeName: string, gltfId: number): void {
    dispatch(editorCreateStart(shapeName, gltfId));
  }

  function deleteShape(shapeId: number): void {
    dispatch(editorDeleteStart(shapeId));
  }

  function fetchShapes(fileId: number): void {
    dispatch(editorFetchSingleStart(fileId));
  }

  function fetchSingleFile(gltfId: number): void {
    dispatch(gltfFetchSingleStart(gltfId));
  }

  function fetchFiles(): void {
    dispatch(gltfFetchUserStart());
  }

  useEffect(() => {
    fetchFiles();
  }, [shapes.length]);

  return (
    <div style={{ height: '100vh' }}>
      <Selectors sidemenu={sidemenu} getAllFiles={fetchFiles} getFile={fetchSingleFile} files={files} file={file} shapes={userShapes} shape={shape} userShapes={userShapes} handleShape={handleInquiry} addShape={addShape} deleteShape={deleteShape} fetchShapes={fetchShapes}/>
      <Canvas
        camera={{ fov: 75, near: 0.1, far: 1000, position: [1, 2, 5] }}
      >
        <Grid cellColor="white" infiniteGrid={grid}/>
        <OrthographicCamera />
        <ambientLight intensity={intensity} />
        <directionalLight color={directionalLightColor} position={positionArray} />
        {
          userShapes.length > 0 &&
          userShapes.map(({ shapeId, shapeName, positionX, positionY, positionZ }, index) => (
            <Shape key={shapeId} shapeId={shapeId} shape={shapeName} orbit={refs.current[index].current} position={{x: positionX, y: positionY, z: positionZ}}/>
          ))
        }
        <Gizmo/>
        <OrbitControls makeDefault />
      </Canvas>
    </div>
  );
}