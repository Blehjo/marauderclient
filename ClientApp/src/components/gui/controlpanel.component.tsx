import { button, useControls } from "leva";
import { useSettings } from "./settings.component";
import { useDispatch, useSelector } from "react-redux";
import { selectEditorSingleShape } from "../../store/editor/editor.selector";
import { useEffect } from "react";
import { editorFetchSingleStart, editorUpdateStart } from "../../store/editor/editor.action";
import { selectSingleGltf } from "../../store/gltf/gltf.selector";
import { gltfFetchSingleStart } from "../../store/gltf/gltf.action";

type ControlProps = {
  shapeId: number;
  shapeName: string;
  positionX: number;
  positionY: number;
  positionZ: number;
  height?: number;
  width?: number;
  depth?: number;
  radius?: number;
  length?: number;
  color: string;
}

export function ControlPanel({ shapeId, shapeName, positionX, positionY, positionZ, height, width, depth, radius, length, color }: ControlProps) {
  const colors = useSettings((s) => s.colors);
  const dispatch = useDispatch();
  const shape = useSelector(selectEditorSingleShape);
  const gltfFile = useSelector(selectSingleGltf);
  const shapeColors = color;
  const directionalLight = useSettings((s) => s.directionalLight);
  const grid = useSettings((s) => s.grid);
  const generation = useSettings((s) => s.generation);
  const setColorValue = useSettings((s) => s.setColorValue);
  const setColor = useSettings((s) => s.setColor);
  const setDirectionalLightColorValue = useSettings((s) => s.setDirectionalLightColorValue);
  const setDirectionalLightColor = useSettings((s) => s.setDirectionalLightColor);
  const setDirectionalLightPosition = useSettings((s) => s.setDirectionalLightPosition);
  const setIntensity = useSettings((s) => s.setIntensity);
  const setGeneration = useSettings((s) => s.setGeneration);
  const toggleGrid = useSettings((s) => s.toggleGrid);

  useEffect(() => {
    dispatch(editorFetchSingleStart(shapeId));
    // dispatch(gltfFetchSingleStart);
    console.log("FILE:::: ", gltfFile)
    console.log(shape)
  }, [shapeId])
  useControls("Directional Light", () => {
    const res = {} as any;
    res["Color"] = {
      value: directionalLight.color["value"],
      min: 0.01,
      max: 1,
      onChange: (v: number) => setDirectionalLightColorValue(v)
    };
    res["Color"] = {
      value: directionalLight.color["color"],
      min: 0.01,
      max: 1,
      onChange: (v: string) => setDirectionalLightColor(v)
    };
    res["Position"] = {
      value: directionalLight.position,
      min: -100,
      max: 100,
      onChange: (x: number, y: number, z: number) => setDirectionalLightPosition(x, y, z)
    };

    res["Intensity"] = {
      value: directionalLight.intensity["value"],
      min: 0,
      max: 1,
      onChange: (v: number) => setIntensity(v)
    };

    res["Grid"] = {
      toggle: grid,
      value: grid,
      onChange: (grid: boolean) => toggleGrid(grid)
    }
    
    return res;
  });

  useControls("Colors", () => {
    const res = {} as any;
    Object.keys(colors).forEach((color) => {
      res[color] = {
        value: colors[color].value,
        min: 0,
        max: 1,
        onChange: (v: number) => setColorValue(color, v)
      };

      res[color] = {
        value: shapeColors != null ? shapeColors : "#008000",
        onChange: (v: string) => setColor(color, v)
      };
    });

    return res;
  });

  const [_, set] = useControls("Generation", () => {
    const res = {} as any;
    // (Object.keys(generation) as Array<keyof Settings["generation"]>).forEach((param) => {
    //   res[param] = {
    //     value: generation[param],
    //     min: 0.01,
    //     max: 20,
    //     onChange: (v: number) => setGeneration(param, v)
    //   };
    // });
    res["Depth"] = {
      value: 5,
      min: 0.01,
      max: 100,
      onChange: (v: number) => setGeneration("depth", v)
    };
    res["Width"] = {
      value: 5,
      min: 0.01,
      max: 100,
      onChange: (v: number) => setGeneration("width", v)
    };
    res["Height"] = {
      value: 5,
      min: 0.01,
      max: 100,
      onChange: (v: number) => setGeneration("height", v)
    };
    res["X"] = {
      value: shape?.positionX!,
      min: -100,
      max: 100,
      onChange: (v: number) => setGeneration("positionX", v)
    };
    res["Y"] = {
      value: shape?.positionY!,
      min: -100,
      max: 100,
      onChange: (v: number) => setGeneration("positionY", v)
    };
    res["Z"] = {
      value: shape?.positionZ!,
      min: -100,
      max: 100,
      onChange: (v: number) => setGeneration("positionZ", v)
    };
    return res;
  });

  useControls({
    Save: button(() => editorUpdateStart(shape?.shapeId!,  shape?.shapeName, gltfFile?.gltfId, new THREE.Vector3(shape?.positionX, shape?.positionY, shape?.positionZ), shape?.height, shape?.width, shape?.depth, shape?.radius, shape?.length, shape?.color, shape?.colorValue))
  });

  return null;
}