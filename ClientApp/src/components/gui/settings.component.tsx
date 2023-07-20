import create from "zustand";
import { immer } from "zustand/middleware/immer";

export type SettingsState = { 
  colors: { [key: string]: { value: number; color: string;}; };
  display: "color" | "height";
  generation: {
    Seed: number;
    Height: number;
    Width: number;
    Scale: number;
    Detail: number;
    Fuzzyness: number;
    Resolution: number;
  };
};

export type SettingsActions = {
  setColorValue: (key: string, value: number) => void;
  setColor: (key: string, color: string) => void;
  setDisplay: (value: SettingsState["display"]) => void;
  setGeneration: (key: keyof SettingsState["generation"], value: number) => void;
};

export type Settings = SettingsState & SettingsActions;

const initialState: SettingsState = {
  colors: {
    Color: {
      value: 0.6,
      color: "#9aa7ad"
    }
  },
  display: "color",
  generation: {
    Seed: Math.random(),
    Height: 1,
    Width: 1,
    Scale: 0.3,
    Detail: 0.5,
    Fuzzyness: 0.2,
    Resolution: 0.3
  }
};

export const useSettings = create<Settings, [["zustand/immer", never]]>(
  immer((set) => ({
    ...initialState,
    setColorValue: (key, value) =>
      set((state) => {
        state.colors[key].value = value;
      }),
    setColor: (key, color) =>
      set((state) => {
        state.colors[key].color = color;
      }),
    setDisplay: (value) =>
      set((state) => {
        state.display = value;
      }),
    setGeneration: (key, value) =>
      set((state) => {
        state.generation[key] = value;
      })
  }))
);
