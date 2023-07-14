import { useSettings } from "../components/state/state.components";
import { useHeightMap } from "./useHeightMap";
import { useNaturalColor } from "./useNaturalColor";

export function useDisplay() {
  const getNaturalColor = useNaturalColor();
  const getHeightMapColor = useHeightMap();
  const display = useSettings((s) => s.display);

  return display === "color" ? getNaturalColor : getHeightMapColor;
}
