import { button, useControls } from "leva";
import { useSettings } from "./settings.component";

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
    // res["Depth"] = {
    //   value: 10,
    //   min: 0.01,
    //   max: 100,
    //   onChange: (v: number) => setGeneration("depth", v)
    // };
    // res["Width"] = {
    //   value: 10,
    //   min: 0.01,
    //   max: 100,
    //   onChange: (v: number) => setGeneration("width", v)
    // };
    // res["Height"] = {
    //   value: 10,
    //   min: 0.01,
    //   max: 100,
    //   onChange: (v: number) => setGeneration("height", v)
    // };
    res["X"] = {
      value: positionX,
      min: -100,
      max: 100,
      onChange: (v: number) => setGeneration("positionX", v)
    };
    res["Y"] = {
      value: positionY,
      min: -100,
      max: 100,
      onChange: (v: number) => setGeneration("positionY", v)
    };
    res["Z"] = {
      value: positionZ,
      min: -100,
      max: 100,
      onChange: (v: number) => setGeneration("positionZ", v)
    };
    return res;
  });

  useControls({
    Save: button(() => set({ Seed: Math.random() }))
  });

  return null;
}