import { useGLTF } from "@react-three/drei"

export default function Gun(props) {
  const { nodes, materials } = useGLTF("/PowerGun.glb")

  return (
    <group dispose={null} {...props}>
      <group rotation={[.1, Math.PI / 1, 0.3]} scale={0.08}>
        <mesh geometry={nodes.Barrel_GUN_1.geometry} material={materials.aiStandardSurface1SG} />
        <mesh geometry={nodes.Barrel_GUN_1_1.geometry} material={materials.aiStandardSurface2SG} />
        <mesh geometry={nodes.GUN_Backtop.geometry} material={materials.aiStandardSurface2SG} />
        <mesh geometry={nodes.GUN_Backtopglow.geometry} material={materials.aiStandardSurface2SG} />
        <mesh geometry={nodes.GUN_Downbase.geometry} material={materials.aiStandardSurface2SG} />
        <mesh geometry={nodes.GUN_FrontTopglow.geometry} material={materials.aiStandardSurface2SG} />
        <mesh geometry={nodes.GUN_Handleglow.geometry} material={materials.aiStandardSurface1SG} />
        <mesh geometry={nodes.GUN_aimhead.geometry} material={materials.aiStandardSurface2SG} />
        <mesh geometry={nodes.GUN_backtophead.geometry} material={materials.aiStandardSurface1SG} />
        <mesh geometry={nodes.GUN_bullethole.geometry} material={materials.aiStandardSurface1SG} />
        <mesh geometry={nodes.GUN_bulletholeway.geometry} material={materials.aiStandardSurface1SG} />
        <mesh geometry={nodes.GUN_bulletwayhead.geometry} material={materials.aiStandardSurface2SG} />
        <mesh geometry={nodes.GUN_downchin.geometry} material={materials.aiStandardSurface2SG} />
        <mesh geometry={nodes.GUN_extrude1.geometry} material={materials.aiStandardSurface2SG} />
        <mesh geometry={nodes.GUN_extrude2.geometry} material={materials.aiStandardSurface2SG} />
        <mesh geometry={nodes.GUN_extrude3.geometry} material={materials.aiStandardSurface2SG} />
        <mesh geometry={nodes.GUN_extrude4.geometry} material={materials.aiStandardSurface2SG} />
        <mesh geometry={nodes.GUN_polySurface29.geometry} material={materials.aiStandardSurface2SG} />
        <mesh geometry={nodes.GUN_polySurface30.geometry} material={materials.aiStandardSurface2SG} />
        <mesh geometry={nodes.GUN_trigger.geometry} material={materials.aiStandardSurface1SG} />
      </group>
    </group>
  )
}

useGLTF.preload("/PowerGun.glb");