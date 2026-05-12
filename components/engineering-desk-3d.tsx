'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html, RoundedBox } from '@react-three/drei';
import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

type DeskKey = 'projects' | 'experience' | 'tech-stack' | 'ai-upbeater' | 'about' | 'contact' | 'builder-story';

type SceneProps = { onOpen: (key: DeskKey) => void };

function InteractivePart({ position, size, color, label, onClick }: any) {
  const [hovered, setHovered] = useState(false);
  return (
    <group position={position}>
      <RoundedBox
        args={size}
        radius={0.05}
        smoothness={3}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
      >
        <meshStandardMaterial color={hovered ? '#88b7ff' : color} metalness={0.2} roughness={0.45} emissive={hovered ? '#1d4ed8' : '#000000'} emissiveIntensity={hovered ? 0.5 : 0} />
      </RoundedBox>
      {hovered && (
        <Html center distanceFactor={12} position={[0, size[1] / 2 + 0.2, 0]}>
          <div className="rounded-md border border-white/10 bg-zinc-950/90 px-2 py-1 text-xs text-zinc-100">{label}</div>
        </Html>
      )}
    </group>
  );
}

function SceneContent({ onOpen }: SceneProps) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.03;
  });

  const specs = useMemo(
    () => [
      { key: 'projects', label: 'PC Setup', pos: [2.5, 0.8, -0.8], size: [1.2, 1.6, 0.8], color: '#131722' },
      { key: 'experience', label: 'Monitor', pos: [0, 1.2, -1], size: [1.8, 1.0, 0.08], color: '#10131a' },
      { key: 'tech-stack', label: 'Keyboard', pos: [0.2, 0.15, 0.1], size: [1.1, 0.06, 0.35], color: '#191d2a' },
      { key: 'ai-upbeater', label: 'Laptop', pos: [1.3, 0.24, 0.2], size: [0.9, 0.08, 0.6], color: '#1b2335' },
      { key: 'about', label: 'Plant', pos: [-1.6, 0.35, -0.4], size: [0.32, 0.48, 0.32], color: '#1d3b2e' },
      { key: 'contact', label: 'Wall Clock', pos: [-2.3, 2.2, -1.5], size: [0.5, 0.5, 0.12], color: '#111319' },
      { key: 'builder-story', label: 'Astronauts', pos: [2.2, 0.25, 0.2], size: [0.45, 0.35, 0.35], color: '#e8ebf4' }
    ],
    []
  );

  return (
    <group ref={group}>
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <boxGeometry args={[6, 0.1, 2.5]} />
        <meshStandardMaterial color="#eceff5" roughness={0.7} />
      </mesh>
      <mesh position={[0, -1.5, -1.8]}>
        <planeGeometry args={[10, 6]} />
        <meshStandardMaterial color="#11131a" />
      </mesh>

      {specs.map((spec: any) => (
        <InteractivePart key={spec.key} position={spec.pos} size={spec.size} color={spec.color} label={spec.label} onClick={() => onOpen(spec.key)} />
      ))}

      <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.15}>
        <mesh position={[2.7, 0.5, 0.1]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </Float>

      <pointLight position={[2.2, 1.3, 0.8]} color="#4f7cff" intensity={12} distance={5} />
      <pointLight position={[3, 0.8, -0.8]} color="#c24fff" intensity={8} distance={4} />
    </group>
  );
}

export function EngineeringDesk3D({ onOpen }: SceneProps) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/40 shadow-rgb">
      <Canvas shadows dpr={[1, 1.5]} camera={{ position: [3.4, 2.1, 4.2], fov: 33 }} gl={{ antialias: true, powerPreference: 'high-performance' }}>
        <color attach="background" args={['#07090f']} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 5, 3]} intensity={1.2} castShadow />
        <SceneContent onOpen={onOpen} />
      </Canvas>
    </div>
  );
}
