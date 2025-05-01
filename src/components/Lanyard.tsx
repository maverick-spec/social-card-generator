
import { Canvas } from '@react-three/fiber';
import { OrbitControls, RoundedBox } from '@react-three/drei';
import { useRef } from 'react';
import type { Mesh } from 'three';

export function Lanyard() {
  const meshRef = useRef<Mesh>(null);

  return (
    <div className="w-full h-full">
      <Canvas>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <RoundedBox ref={meshRef} args={[3, 2, 0.1]} radius={0.1} smoothness={4}>
          <meshStandardMaterial color="#9b87f5" />
        </RoundedBox>
        <OrbitControls enableZoom={false} autoRotate />
      </Canvas>
    </div>
  );
}
