// app/components/FogBackground.js
"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { Cloud } from '@react-three/drei';
import { useRef } from 'react';

function RotatingClouds() {
  const ref = useRef();
  
  useFrame((state, delta) => {
    // Slowly rotate the entire cloud group
    if (ref.current) {
      ref.current.rotation.y += delta * 0.05;
      ref.current.rotation.z += delta * 0.02;
    }
  });

  return (
    <group ref={ref}>
      {/* Several cloud layers with "Gold" and "Smoke" tints */}
      <Cloud opacity={0.3} speed={0.4} width={10} depth={1.5} segments={20} color="#1a1a1a" position={[0, -2, -5]} />
      <Cloud opacity={0.2} speed={0.4} width={10} depth={1.5} segments={20} color="#383220" position={[0, 5, -10]} /> 
    </group>
  );
}

export default function FogBackground() {
  return (
    <div className="absolute inset-0 w-full h-full opacity-60 grayscale-[50%]">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <RotatingClouds />
      </Canvas>
    </div>
  );
}