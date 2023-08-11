import { KeyboardControls, PointerLockControls, Sky } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Physics } from "@react-three/rapier"
import { Suspense } from "react"
import { Cube, Cubes } from "./Cube"
import { Ground } from "./Ground"
import { Player } from "./Player"

// need to create another player component or an array of players 
// add signalr listening event
// update the coordinates whenever the position is updated
// need to fix type of positions in backend
// ** possibly float instead of int

export default function World() {
  return (
    <KeyboardControls
      map={[
        { name: "forward", keys: ["ArrowUp", "w", "W"] },
        { name: "backward", keys: ["ArrowDown", "s", "S"] },
        { name: "left", keys: ["ArrowLeft", "a", "A"] },
        { name: "right", keys: ["ArrowRight", "d", "D"] },
        { name: "jump", keys: ["Space"] },
    ]}>
      <Canvas shadows camera={{ fov: 45 }}>
        <Sky sunPosition={[100, 20, 100]} />
        <ambientLight intensity={0.3} />
        <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
        <Physics gravity={[0, -30, 0]}>
          <Ground />
          <Suspense fallback={null}>
            <Player />
          </Suspense>
          <Cube position={[0, 0.5, -10]} />
          <Cubes />
        </Physics>
        <PointerLockControls />
      </Canvas>
    </KeyboardControls>
  )
}
