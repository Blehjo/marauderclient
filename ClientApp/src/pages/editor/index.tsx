import { Component, ReactNode, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sparkles, Sphere } from '@react-three/drei';
import { createRoot } from "@react-three/fiber";


class Editor extends Component {
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

// const item = createRoot().render(
//   <mesh>
//     <boxGeometry />
//     <meshStandardMaterial />
//   </mesh>
// );

export default Editor;