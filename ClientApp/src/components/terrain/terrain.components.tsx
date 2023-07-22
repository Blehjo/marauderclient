import { useEffect, useRef } from "react";
import { InstancedMesh, Object3D } from "three";
import { useDisplay } from "../../colors/useDisplay";
import { useProceduralTerrain } from "../../geometry/useProceduralTerrain";

const emptyObject = new Object3D();

export function Terrain() {
  const ref = useRef<InstancedMesh>(null);

  const { dataBlocks, scale } = useProceduralTerrain();
  const getColor = useDisplay();
  console.log("Get Color: ", getColor);
  console.log("Data Blocks: ", dataBlocks);

  useEffect(() => {
    const mesh = ref.current;
    console.log("Mesh: ", mesh)
    if (!mesh) return;

    dataBlocks.forEach(({ x, y, z, height }, i) => {
      const color = getColor(height);
      console.log("Color: ", i, color);

      emptyObject.position.set(x, y, z);
      emptyObject.updateMatrix();
      console.log("Empty Object: ", emptyObject);

      mesh.setMatrixAt?.(i, emptyObject.matrix);
      mesh.setColorAt?.(i, color);
      console.log("Updated Mesh: ", mesh)
    });

    mesh.instanceMatrix.needsUpdate = true;
    mesh.instanceColor!.needsUpdate = true;
  }, [dataBlocks, getColor]);

  return (
    <>
      <group
        rotation-x={-Math.PI / 2}
        scale={[0.05333333333333334, 0.05333333333333334, 0.05333333333333334]}
        position={[0.562, 3.33, 0]}
        rotation={[-1.5707963267948966, 0, 0]}
      >
        <instancedMesh castShadow receiveShadow ref={ref} args={[, , dataBlocks.length]}>
          <boxGeometry />
          <meshPhongMaterial />
        </instancedMesh>
      </group>

      {/* <TerrainStats blockCount={dataBlocks.length} /> */}
    </>
  );
}
