import { Grid, OrbitControls, OrthographicCamera, TransformControls } from "@react-three/drei";
import { Canvas, Vector3 } from "@react-three/fiber";
import { ReactNode, createRef, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Gizmo } from "../../components/gizmo/gizmo.component";
import { ControlPanel } from "../../components/gui/controlpanel.component";

import { useDispatch, useSelector } from "react-redux";
import { Selectors } from "../../components/editor/selector.component";
import { useSettings } from "../../components/gui/settings.component";
import { editorCreateStart, editorDeleteStart, editorFetchAllStart, editorFetchSingleStart, editorUpdateStart, setShape } from "../../store/editor/editor.action";
import { selectEditorShape, selectEditorShapes, selectEditorSingleShape } from "../../store/editor/editor.selector";
import { selectAllGltfs, selectSingleGltf, selectUserGltfs } from "../../store/gltf/gltf.selector";
import { gltfCreateStart, gltfFetchSingleStart, gltfFetchUserStart } from "../../store/gltf/gltf.action";
import { useParams } from "next/navigation";
import { selectIsMaraudersOpen } from "../../store/messagebox/messagebox.selector";
import ShapesContainer from "../../components/editor/shapes.component";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { updateShape } from "../../store/editor/editor.saga";
import { Editor as IndividualShape } from "../../store/editor/editor.types";
import { Gltf } from "../../store/gltf/gltf.types";

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
  connection: (editorId: number, shapeName?: string, gltfId?: number, position?: Vector3, height?: number, width?: number, depth?: number, radius?: number, length?: number, color?: string) => THREE.Vector3;
  file: Gltf;
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

function Shape({ shape, position, orbit, shapeId, connection, file }: ShapeProps) {
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

  console.log("POSITIONARRAY::: ", positionArray);
  useEffect(() => {
    if (transform.current) {
      const { current: controls } = transform
      const callback = (event: any) => {
        orbit.current.enabled = !event?.value
        // editorId, shapeName, gltfId, position, height, width, depth, radius, length, color
      }
      // connection(shapeId, shape, 1, positionArray, height, undefined, undefined, undefined, undefined, color.toArray().toString())
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
  const [connection, setConnection] = useState<HubConnection>();
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

  function handlePositionUpdate(editorId: number, shapeName?: string, gltfId?: number, position?: Vector3, height?: number, width?: number, depth?: number, radius?: number, length?: number, color?: string): THREE.Vector3 {
    dispatch(editorUpdateStart(editorId, shapeName, gltfId, position, height, width, depth, radius, length, color))
    connection?.send("newShape", "foo", position);
    connection?.on("shapeReceived", (shape: any) => {
      console.log('received', shape)
    })
    return new THREE.Vector3(1,2,3);
  }

  function handleConnection(): void {
    const hub = new HubConnectionBuilder()
      .withUrl(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/hub/editor/${file?.gltfId}`)
      .withAutomaticReconnect()
      .build();
    setConnection(hub);
  }

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

  function createGltfFile(fileInformation: string): void {
    dispatch(gltfCreateStart(fileInformation));
  }

  useEffect(() => {
    fetchFiles();
    // if (connection?.state )
    handleConnection();
    console.log("CONNECTION::" , connection)
  }, [shapes.length, file]);

  return (
    <div style={{ height: '100vh' }}>
      <Selectors createGltfFile={createGltfFile} sidemenu={sidemenu} getAllFiles={fetchFiles} getFile={fetchSingleFile} files={files} file={file} shapes={userShapes} shape={shape} userShapes={userShapes} handleShape={handleInquiry} addShape={addShape} deleteShape={deleteShape} fetchShapes={fetchShapes}/>
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
            <Shape connection={handlePositionUpdate} key={shapeId} shapeId={shapeId} shape={shapeName} file={file!} orbit={refs.current[index].current} position={{x: positionX, y: positionY, z: positionZ}}/>
          ))
        }
        <Gizmo/>
        <OrbitControls makeDefault />
      </Canvas>
    </div>
  );
}