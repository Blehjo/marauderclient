import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { getSingleShape } from "../../utils/api/shape.api";
import { Component } from "react";

export type SettingsState = { 
  colors: { [key: string]: { value: number; color: string;}; };
  directionalLight: {
    color: { value: number; color: string; },
    position: {
        x: number;
        y: number;
        z: number;
    },
    intensity: {
        value: number;
    }
  };
  grid: boolean;
  generation: {
    positionX?: number;
    positionY?: number;
    positionZ?: number;
    height?: number;
    width?: number;
    depth?: number;
    radius?: number;
    length?: number;
  };
};

export type SettingsActions = {
    setColorValue: (key: string, value: number) => void;
    setColor: (key: string, color: string) => void;
    setDirectionalLightColorValue: (value: number) => void;
    setDirectionalLightColor: (color: string) => void;
    setDirectionalLightPosition: (x: number, y: number, z: number) => void;
    setIntensity: (value: number) => void;
    toggleGrid: (value: boolean) => void;
    setGeneration: (key: keyof SettingsState["generation"], value: number) => void;
};

export type Settings = SettingsState & SettingsActions;

const initialState: SettingsState = {
    directionalLight: {
        color: {
            value: 0.6,
            color: "#9aa7ad"
        },
        position: {
            x: 1, 
            y: 4, 
            z: 8
        },
        intensity: {
            value: 0.1
        }
    },
    colors: {
        Color: {
            value: 0.6,
            color: "#9aa7ad"
        }
    },
    grid: true,
    generation: {
        height: 0,
        width: 0,
        depth: 0,
        positionX: 0,
        positionY: 0,
        positionZ: 0,
        radius: 0,
        length: 0
    }
};

export const useSettings = create<Settings, [["zustand/immer", never]]>(
  immer((set) => ({
    ...initialState,
    setDirectionalLightColorValue: (value) => 
        set((state) => {
            state.directionalLight.color.value = value;
        }),
    setDirectionalLightColor: (color) =>
        set((state) => {
            state.directionalLight.color.color = color;
        }),
    setDirectionalLightPosition(x, y, z) {
        set((state) => {
            state.directionalLight.position.x = x;
            state.directionalLight.position.y = y;
            state.directionalLight.position.z = z;
        })
    },
    setIntensity: (value: number) => 
        set((state) => {
            state.directionalLight.intensity.value = value;
        }),
    setColorValue: (key, value) =>
        set((state) => {
            state.colors[key].value = value;
        }),
    setColor: (key, color) =>
        set((state) => {
            state.colors[key].color = color;
        }),
    toggleGrid: (value) => 
        set((state) => {
            state.grid = value;
        }),
    setGeneration: (key, value) =>
        set((state) => {
            state.generation[key] = value;
        })
  }))
);
