import { button, Leva, useControls } from "leva";
import { Settings, useSettings } from "./settings.component";

export function ControlPanel() {
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
      onChange: (grid: boolean) => toggleGrid(!grid)
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
    (Object.keys(generation) as Array<keyof Settings["generation"]>).forEach((param) => {
      res[param] = {
        value: generation[param],
        min: 0.01,
        max: 1,
        onChange: (v: number) => setGeneration(param, v)
      };
    });

    return res;
  });

  useControls({
    Regenerate: button(() => set({ Seed: Math.random() }))
  });

  return null;
}