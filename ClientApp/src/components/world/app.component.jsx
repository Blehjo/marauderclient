import React from 'react';
import { RecoilRoot } from 'recoil';
import { Canvas } from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import { Vector3 } from 'three';
import { Physics } from '@react-three/cannon';

import { Ground } from './ground.component';
import { Player } from './player.component';
import { Camera } from './camera.component';
import { Cube } from './cube.component';
import { useCube } from './useCubeStore';


const Cubes = () => {
  const cubes = useCube();
  return [<Cube position={[0, 0.5, -10]} />, ...cubes];
};

const World = () => (
  <Canvas shadowMap sRGB gl={{ alpha: false }}>
    <RecoilRoot>
      <Camera />
      <Sky sunPosition={new Vector3(100, 10, 100)} />
      <ambientLight intensity={0.3} />
      <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
      <Physics gravity={[0, -30, 0]}>
        <Ground />
        <Player />
        <Cubes />
      </Physics>
    </RecoilRoot>
  </Canvas>
);

export default World;