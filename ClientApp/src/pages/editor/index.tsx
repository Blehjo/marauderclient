import { Grid, OrbitControls, OrthographicCamera, TransformControls, useCursor } from "@react-three/drei";
import { Canvas, ThreeEvent, Vector3, useThree } from "@react-three/fiber";
import { ReactNode, Suspense, createRef, useEffect, useLayoutEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Gizmo } from "../../components/gizmo/gizmo.component";
import { ControlPanel } from "../../components/gui/controlpanel.component";

import { useDispatch, useSelector } from "react-redux";
import { Selectors } from "../../components/editor/selector.component";
import { useSettings } from "../../components/gui/settings.component";
import { editorCreateStart, editorDeleteStart, editorFetchAllStart, editorFetchSingleShapesStart, editorFetchSingleStart, editorUpdateStart, setShape } from "../../store/editor/editor.action";
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
import { proxy, useSnapshot } from "valtio";

const modes: Array<"translate" | "rotate" | "scale" | undefined> = ["translate", "rotate", "scale"];

type StateProps = {
  current: string | null;
  mode: number;
}

const state = proxy<StateProps>({ current: null, mode: 0 });

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
  shapeHeight?: number;
  shapeWidth?: number;
  shapeDepth?: number;
  shapeRadius?: number;
  shapeLength?: number;
  shapeColor: string;
  orbit: any;
  shapeId: number;
  connection: (editorId: number, shapeName?: string, gltfId?: number, position?: Vector3, height?: number, width?: number, depth?: number, radius?: number, length?: number, color?: string) => THREE.Vector3;
  handleBrushPointerMove: ({ uv }: ThreeEvent<PointerEvent>) => void;
  setAllowControls: (boolean: boolean) => void;
  canvasRef: any;
  textureRef: any;
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

function Shape({ shape, position, orbit, shapeId, shapeHeight, shapeWidth, shapeDepth, shapeRadius, shapeLength, shapeColor, connection, file, handleBrushPointerMove, setAllowControls, canvasRef, textureRef }: ShapeProps) {
  const selectedShape = useSelector(selectEditorSingleShape);
  const transform = useRef<any>(null!);
  const [active, setActive] = useState(false);
  const snap = useSnapshot(state);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);
  const positionArray: THREE.Vector3 = new THREE.Vector3(position?.x, position?.y, position?.z);
  const colors = useSettings((s) => s.colors);
  const color = new THREE.Color(colors["Color"].color);
  const hsl = color.getHSL({ h: 0, s: 1, l: 1 });
  const height = useSettings((s) => s.generation.height);
  const updatedHeight = height != undefined && height > 0 ? height : 10;
  const width = useSettings((s) => s.generation.width);
  const updatedWidth = width != undefined && width > 0 ? width : 10;
  const depth = useSettings((s) => s.generation.depth);
  const updatedDepth = depth != undefined && depth > 0 ? depth : 10;
  const generationPositionX = useSettings((s) => s.generation.positionX);
  const generationPositionY = useSettings((s) => s.generation.positionY);
  const generationPositionZ = useSettings((s) => s.generation.positionZ);
  color.setHSL(
    hsl.h,
    hsl.s * 1.7,
    hsl.l * 1
  );

  return (
    <>
      {
        active &&
        <ControlPanel shapeId={shapeId} shapeName={shape!} positionX={position?.x!}  positionY={position?.y!}  positionZ={position?.z!} height={shapeHeight} width={shapeWidth} depth={shapeDepth} radius={shapeRadius} length={shapeLength} color={shapeColor}/>
      }
      <TransformControls
        showX={active && selectedShape?.shapeId == shapeId ? true : false}
        showY={active && selectedShape?.shapeId == shapeId ? true : false}
        showZ={active && selectedShape?.shapeId == shapeId ? true : false}
        ref={transform}
        position={active && selectedShape?.shapeId == shapeId ? [generationPositionX!, generationPositionY!, generationPositionZ!] : [position?.x!, position?.y!, position?.z!]}
        scale={[updatedHeight, updatedWidth, updatedDepth]}
        mode={modes[snap.mode]}
      >
        <mesh 
          onClick={(e) => {
            (e.stopPropagation(), (state.current = shape!))
            setActive(!active)
          }}
          onPointerDown={() => setAllowControls(false)}
          onPointerUp={() => setAllowControls(true)}
          onPointerMove={handleBrushPointerMove}
          onPointerMissed={(e) => e.type === "click" && (state.current = null)}
          onContextMenu={(e) => snap.current === shape! && (e.stopPropagation(), (state.mode = (snap.mode + 1) % modes.length))}
          onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
          // onPointerOut={(e) => setHovered(false)}
          dispose={null}
        >
          {handleShape(shape)}
          <meshStandardMaterial color={color}>
            <canvasTexture
              ref={textureRef}
              attach="map"
              image={canvasRef.current}
            />
          </meshStandardMaterial>
        </mesh>
      </TransformControls>
    </>
  )
}

function Controller() {
  const snap = useSnapshot(state);
  const scene = useThree((state) => state.scene);
  return (
    <>
      {/* {snap.current && <TransformControls object={scene.getObjectByName(snap.current)} mode={modes[snap.mode]} />} */}
      <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} />
    </>
  );
}

export default function Editor() {
  const [connection, setConnection] = useState<HubConnection>();
  const [allowControls, setAllowControls] = useState(true);
  const canvasRef = useRef(document.createElement("canvas"));
  const textureRef = useRef<THREE.CanvasTexture>();
  const file = useSelector(selectSingleGltf);
  const sidemenu = useSelector(selectIsMaraudersOpen);
  const files = useSelector(selectAllGltfs);
  const shape = useSelector(selectEditorShape);
  const shapes = useSelector(selectEditorShapes);
  const userShapes = useSelector(selectEditorShapes);
  const dispatch = useDispatch();
  const position = useSettings((s) => s.directionalLight.position.x);
  const positionArray = new THREE.Vector3(position);
  const directionalLightColors = useSettings((s) => s.directionalLight.color);
  const grid = useSettings((s) => s.grid);
  const intensity = useSettings((s) => s.directionalLight.intensity.value);
  const directionalLightColor = new THREE.Color(directionalLightColors["color"]);
  const refs = useRef(Array.from({length: 10}, a => createRef()));

  useLayoutEffect(() => {
    const canvas = canvasRef.current;

    canvas.width = 1024;
    canvas.height = 1024;

    const context = canvas.getContext("2d");
    if (context) {
      context.rect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "white";
      context.fill();
    }
  }, []);


  function handleBrushPointerMove({ uv }: ThreeEvent<PointerEvent>) {
    if (allowControls) {
      return;
    }
    if (uv) {
      const canvas = canvasRef.current;
      const x = uv.x * canvas.width;
      const y = (1 - uv.y) * canvas.height;

      const context = canvas.getContext("2d");
      if (context) {
        context.beginPath();
        context.arc(x - 2, y - 2, 4, 0, 2 * Math.PI);
        context.fillStyle = "black";
        context.fill();
        textureRef.current!.needsUpdate = true;
      }
    }
  }

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
    connection?.start().catch((err: string) => document.write(err));
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

  function fetchShapes(gltfId: number): void {
    dispatch(editorFetchSingleShapesStart(gltfId));
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
    handleConnection();
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
        <Suspense fallback={null}>
        <group>
        {
          userShapes.length > 0 &&
          userShapes.map(({ shapeId, shapeName, positionX, positionY, positionZ, height, width, depth, radius, length, color }, index) => (
            <Shape canvasRef={canvasRef} textureRef={textureRef} setAllowControls={setAllowControls} handleBrushPointerMove={handleBrushPointerMove} connection={handlePositionUpdate} key={shapeId} shapeId={shapeId} shape={shapeName} shapeHeight={height} shapeWidth={width} shapeDepth={depth} shapeRadius={radius} shapeLength={length} shapeColor={color} file={file!} orbit={refs.current[index].current} position={{x: positionX, y: positionY, z: positionZ}}/>
          ))
        }
        </group>
        </Suspense>
        <Gizmo/>
        { allowControls && <Controller/> }
      </Canvas>
    </div>
  );
}