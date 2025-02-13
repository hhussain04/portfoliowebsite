"use client";

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

function Shapes() {
  const octahedronRef = useRef<THREE.Mesh>(null);
  const dodecahedronRef = useRef<THREE.Mesh>(null);
  const icosahedronRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (octahedronRef.current) {
      octahedronRef.current.rotation.x = t * 0.5;
      octahedronRef.current.rotation.y = t * 0.5;
    }

    if (dodecahedronRef.current) {
      dodecahedronRef.current.rotation.x = t * 0.3;
      dodecahedronRef.current.rotation.z = t * 0.3;
    }

    if (icosahedronRef.current) {
      icosahedronRef.current.rotation.y = t * 0.2;
      icosahedronRef.current.rotation.z = t * 0.2;
    }
  });

  return (
    <group>
      <mesh ref={octahedronRef} position={[-2, 0, 0]}>
        <octahedronGeometry args={[1]} />
        <meshStandardMaterial
          color="#4299E1"
          wireframe
          wireframeLinewidth={2}
        />
      </mesh>

      <mesh ref={dodecahedronRef} position={[2, 0, 0]}>
        <dodecahedronGeometry args={[1]} />
        <meshStandardMaterial
          color="#F687B3"
          wireframe
          wireframeLinewidth={2}
        />
      </mesh>

      <mesh ref={icosahedronRef} position={[0, 0, 0]}>
        <icosahedronGeometry args={[1]} />
        <meshStandardMaterial
          color="#2D3748"
          wireframe
          wireframeLinewidth={2}
        />
      </mesh>
    </group>
  );
}

export default function ThreeScene() {
  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={1}
      />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Shapes />
    </Canvas>
  );
}