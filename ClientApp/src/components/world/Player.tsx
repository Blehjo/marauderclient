import * as RAPIER from "@dimforge/rapier3d-compat"
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr"
import { useKeyboardControls } from "@react-three/drei"
import { Vector3, useFrame, useThree } from "@react-three/fiber"
import { CapsuleCollider, RigidBody, useRapier } from "@react-three/rapier"
import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import Gun from "./Gun"


const SPEED = 5
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();
const rotation = new THREE.Vector3();

export function Player({ lerp = THREE.MathUtils.lerp }) {
  const axe = useRef<any>(null!);
  const ref = useRef<any>(null!);
  const velocity = useRef([0, 0, 0])
  const { camera } = useThree()
  // const rapier = new RAPIER.World({ x: 0.0, y: -9.81, z: 0.0 });
  const rapier = useRapier();
  const [connection, setConnection] = useState<HubConnection>();
  const [position, setPosition] = useState<Vector3>([0,10,0]);
  const [id, setId] = useState<number>(0);

  const [, get] = useKeyboardControls()

  function updatePlayer(coordinates: Vector3): void {
    connection?.send("provideReading", "foo", coordinates);
    connection?.on("newData", (coordinates: Vector3) => {
      setPosition(coordinates);
    });
  } 

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
    .withUrl(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/hub/odyssey/${id}`)
    .withAutomaticReconnect()
    .build();
    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      try {
        connection
        .start()
        .then(() => {
          connection.on('provideReading', (position: Vector3) => {
            console.log(position)
          })
        })
        .catch((err) => {
          console.log(`Error: ${err}`)
        })
      } catch (error) {
        console.log(error as Error)
      }
    }

    return () => {
      connection && connection.stop()
    }
  }, [connection]);

  useFrame((state) => {
    const { forward, backward, left, right, jump } = get()
    const velocity = ref.current.linvel()
    // update camera
    state.camera.position.copy(ref.current.translation())
    // update axe
    axe.current.children[0].rotation.x = lerp(axe.current.children[0].rotation.x, Math.sin(Number((velocity.length()) > 1) * state.clock.elapsedTime * 10) / 6, 0.1)
    axe.current.rotation.copy(state.camera.rotation)
    axe.current.position.copy(state.camera.position).add(state.camera.getWorldDirection(rotation).multiplyScalar(1))
    // updatePlayer(state.camera.position)
    // movement
    frontVector.set(0, 0, Number(backward) - Number(forward))
    sideVector.set(Number(left) - Number(right), 0, 0)
    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED).applyEuler(state.camera.rotation)
    ref.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z })
    // jumping
    const world = rapier.world.raw()
    const firstArg = new RAPIER.Ray(ref.current.translation(), { x: 0, y: -1, z: 0 })
    let maxToi = 4.0;
    let solid = true;
    const ray = world.castRay(firstArg, maxToi, solid)
    const grounded = ray && ray.collider && Math.abs(ray.toi) <= 1.75
    if (jump && grounded) ref.current.setLinvel({ x: 0, y: 10, z: 0 })
  })

  return (
    <>
      <RigidBody ref={ref} colliders={false} mass={1} type="dynamic" position={position} enabledRotations={[false, false, false]}>
        <CapsuleCollider args={[0.75, 0.5]} />
      </RigidBody>
      <group ref={axe} onPointerMissed={(e) => (axe.current.children[0].rotation.x = -0.5)}>
        <Gun position={[0.3, -0.4, -0.35]} />
      </group>
    </>
  )
}
