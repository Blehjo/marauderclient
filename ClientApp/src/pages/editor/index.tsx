import * as THREE from 'three'
import {createRoot} from 'react-dom/client'
import React, {useRef, useState} from 'react'
import {Canvas, useFrame} from '@react-three/fiber'
import {getProject} from '@theatre/core'
import studio from '@theatre/studio'

studio.initialize()

// our Theatre.js project sheet, we'll use this later
const demoSheet = getProject('Demo Project').sheet('Demo Sheet')

const Fiber = () => {
  return (
    <Canvas camera={{
      position: [5, 5, -5],
      fov: 75
    }}>
      <ambientLight/>
      <pointLight position={[10, 10, 10]}/>
      <mesh>
        <boxGeometry args={[1, 1, 1]}/>
        <meshStandardMaterial color="orange"/>
      </mesh>
    </Canvas>
  )
}

export default Fiber;