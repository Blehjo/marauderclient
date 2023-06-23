import { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, Sparkles } from '@react-three/drei'

class Editor {
  render() {
    return (
      <Canvas camera={{ fov: 45, position: [-4, 2, -4] }}>
        {/* <Sparkles position={[1, 1, 1]} /> */}
        <OrbitControls makeDefault />
        <mesh position={[6.948, -2.158, 0.465]}>
          <boxBufferGeometry attach="geometry" />
          <meshStandardMaterial attach="material" color="red" />
        </mesh>
        <directionalLight position={[4.224, 1.912, 3.046]} />
        <ambientLight />
        {/* <Sphere position={[8.817, 1.557, 5.818]} /> */}
      </Canvas>
    );
  }
}

export default Editor;