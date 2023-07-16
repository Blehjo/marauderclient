import * as THREE from 'three'
import {createRoot} from 'react-dom/client'
import React, {useRef, useState} from 'react'
import {Canvas, useFrame} from '@react-three/fiber'
import {getProject} from '@theatre/core'
import { SheetProvider, editable } from '@theatre/r3f'
import extension from '@theatre/r3f/dist/extension'
import studio from '@theatre/studio'

import theatre from '../../components/editor/theatre'

if (process.env.NODE_ENV === 'development' && !theatre.isInit && typeof window !== 'undefined') {
  studio.initialize()
  studio.extend(extension)
  studio.ui.hide() // Hidden by default
  theatre.isInit = true
}

// our Theatre.js project sheet, we'll use this later
const demoSheet = getProject('Demo Project').sheet('Demo Sheet')

const Fiber = () => {
  return (
    theatre.isInit
    && 
    <Canvas camera={{
      position: [5, 5, -5],
      fov: 75
    }}>
      <SheetProvider sheet={demoSheet}>
        <ambientLight/>
        <pointLight position={[10, 10, 10]}/>
        <mesh>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color="orange"/>
        </mesh>
      </SheetProvider>
    </Canvas>
  )
}

export default Fiber;