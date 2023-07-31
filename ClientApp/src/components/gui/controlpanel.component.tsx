import { button, Leva, useControls } from "leva";
import { Settings, useSettings } from "./settings.component";
import { Editor } from "../../store/editor/editor.types";
import { useEffect } from "react";
import { editorFetchSingleStart } from "../../store/editor/editor.action";
import { useDispatch, useSelector } from "react-redux";
import { selectEditorShape, selectEditorSingleShape } from "../../store/editor/editor.selector";

type ControlProps = {
  shapeId: number;
}

export function ControlPanel({ shapeId }: ControlProps) {
  const shape = useSelector(selectEditorSingleShape);
  const dispatch = useDispatch();
  const colors = useSettings((s) => s.colors);
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
    dispatch(editorFetchSingleStart(shapeId))
  }, []);

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
        value: colors[color].color,
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
    res["Height"] = {
      value: generation.height,
      min: 0.01,
      max: 1,
      onChange: (v: number) => setGeneration("height", v)
    };
    res["X"] = {
      value: generation.positionX,
      min: 0.01,
      max: 20,
      onChange: (v: number) => setGeneration("positionX", v)
    };
    return res;
  });

  useControls({
    Regenerate: button(() => set({ Seed: Math.random() }))
  });

  return null;
}