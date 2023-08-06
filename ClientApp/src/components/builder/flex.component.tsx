import { Plane } from '@react-three/drei';
import { Flex, Box, useFlexSize } from '@react-three/flex';
import { Canvas } from 'react-three-fiber';

function Inner() {
    const [width, height] = useFlexSize()
    return <Plane args={[width, height]} />
}

function FlexDisplay() {
    return (
        <>
        <Canvas>
            <Flex 
                mainAxis="x"
                crossAxis="y"
                flexDirection="row"
                // flexWrap="wrap"
                justify="center"
                // justify="space-between"
                alignItems="center"
                // size={[vpWidth, 0, 0]}
            >
                <Box>
                <mesh>
                    <sphereBufferGeometry args={[3, 30, 30]} attach="geometry"  />
                    <meshBasicMaterial color={0xfff1ef} attach="material" />
                </mesh>
                </Box>
                <Box>
                <mesh>
                    <sphereBufferGeometry args={[3, 10, 10]} attach="geometry"  />
                    <meshBasicMaterial color={0xfff1ef} attach="material" />
                </mesh>
                </Box>

               
                {/* <mesh>
                    <sphereBufferGeometry args={[3, 30, 30]} attach="geometry"  />
                    <meshBasicMaterial color={0xfff1ef} attach="material" />
                </mesh>
                <mesh>
                    <boxBufferGeometry args={[3, 30, 30]} attach="geometry"  />
                    <meshBasicMaterial color={0xfff1ef} attach="material" />
                </mesh> */}
            </Flex>
        </Canvas>
        </>
    )
}

export default FlexDisplay;