import create from "zustand";
import { immer } from "zustand/middleware/immer";
import { selectEditorSingleShape } from "../../store/editor/editor.selector";
import { editorFetchSingleStart } from "../../store/editor/editor.action";
import axios from "axios";
import { Editor } from "../../store/editor/editor.types";
import { getSingleShape } from "../../utils/api/shape.api";

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

// const dispatch = useDispatch();
// dispatch(editorFetchSingleStart(1));
// const singleShape = useSelector(selectEditorSingleShape);
const shapeId = 1;
class Generation {
    positionX?: number;
    positionY?: number;
    positionZ?: number;
    height?: number;
    width?: number;
    depth?: number;
    radius?: number;
    length?: number;
};

const singleShape = new Generation();


getSingleShape(shapeId).then((response) => { 
    singleShape.positionX = response.positionX;
    singleShape.positionY = response.positionY;
    singleShape.positionZ = response.positionZ;
    singleShape.height = response.height;
    singleShape.width = response.width;
    singleShape.depth = response.depth;
    singleShape.radius = response.radius;
    singleShape.length = response.length;
});
console.log("SINGLESHAPE:: ", singleShape)

const shape = {
    height: singleShape?.height,
    width: singleShape?.width,
    depth: singleShape?.depth,
    positionX: singleShape?.positionX,
    positionY: singleShape?.positionY,
    positionZ: singleShape?.positionZ,
    radius: singleShape?.radius,
    length: singleShape?.length
}

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
        height: singleShape?.height,
        width: singleShape?.width,
        depth: singleShape?.depth,
        positionX: singleShape?.positionX,
        positionY: singleShape?.positionY,
        positionZ: singleShape?.positionZ,
        radius: singleShape?.radius,
        length: singleShape?.length
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
