'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Float, Html, RoundedBox } from '@react-three/drei';
import { memo, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

type DeskKey = 'projects' | 'experience' | 'tech-stack' | 'ai-upbeater' | 'about' | 'contact' | 'builder-story';

type SceneProps = { onOpen: (key: DeskKey) => void };

type HotspotMeshProps = {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
  tooltipPosition?: [number, number, number];
};

function HotspotMesh({ label, onClick, children, tooltipPosition = [0, 0.45, 0] }: HotspotMeshProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <group onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} onClick={onClick}>
      <group>{children}</group>
      {hovered && (
        <Html center distanceFactor={12} position={tooltipPosition}>
          <div className="rounded-md border border-white/10 bg-zinc-950/90 px-2 py-1 text-xs text-zinc-100 shadow-lg">{label}</div>
        </Html>
      )}
    </group>
  );
}

const WorkspaceScene = memo(function WorkspaceScene({ onOpen }: SceneProps) {
  const root = useRef<THREE.Group>(null);
  const fanMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#7c8cff', emissive: '#4059ff', emissiveIntensity: 0.45, roughness: 0.2, metalness: 0.15 }), []);
  const fanMat2 = useMemo(() => new THREE.MeshStandardMaterial({ color: '#d26dff', emissive: '#8f38ff', emissiveIntensity: 0.35, roughness: 0.2, metalness: 0.1 }), []);

  useFrame((state) => {
    if (!root.current) return;
    root.current.position.y = Math.sin(state.clock.elapsedTime * 0.18) * 0.02;
  });

  return (
    <group ref={root} position={[0, -0.35, 0]}>
      <mesh position={[0, -1.8, -2.3]} rotation={[-0.8, 0, 0]}>
        <planeGeometry args={[15, 11]} />
        <meshStandardMaterial color="#090b11" roughness={1} />
      </mesh>

      <RoundedBox args={[7.6, 0.12, 3.4]} radius={0.06} smoothness={4} position={[0, 0, 0]} receiveShadow>
        <meshStandardMaterial color="#eceff4" roughness={0.88} metalness={0.05} />
      </RoundedBox>

      <group position={[0, 0.12, -0.72]}>
        <HotspotMesh label="Monitor" onClick={() => onOpen('experience')} tooltipPosition={[0, 0.8, 0.1]}>
          <RoundedBox args={[2.55, 1.45, 0.08]} radius={0.06} smoothness={4} position={[0, 0.86, 0]} castShadow>
            <meshStandardMaterial color="#11141d" roughness={0.35} metalness={0.25} />
          </RoundedBox>
          <mesh position={[0, 0.86, 0.045]}>
            <planeGeometry args={[2.28, 1.24]} />
            <meshStandardMaterial color="#151d2b" emissive="#19253d" emissiveIntensity={0.2} roughness={0.2} />
          </mesh>
          <RoundedBox args={[0.22, 0.62, 0.14]} radius={0.04} position={[0, 0.34, -0.03]}>
            <meshStandardMaterial color="#1a1f2b" roughness={0.35} metalness={0.4} />
          </RoundedBox>
          <RoundedBox args={[0.95, 0.06, 0.36]} radius={0.05} position={[0, 0.04, 0]}>
            <meshStandardMaterial color="#1e2432" roughness={0.32} metalness={0.45} />
          </RoundedBox>
        </HotspotMesh>
      </group>

      <HotspotMesh label="Keyboard" onClick={() => onOpen('tech-stack')} tooltipPosition={[-0.1, 0.28, 0]}>
        <group position={[-0.35, 0.16, 0.52]}>
          <RoundedBox args={[1.8, 0.08, 0.62]} radius={0.05} smoothness={3} castShadow>
            <meshStandardMaterial color="#151922" roughness={0.45} metalness={0.25} />
          </RoundedBox>
          <mesh position={[0, 0.045, 0]}>
            <boxGeometry args={[1.64, 0.02, 0.5]} />
            <meshStandardMaterial color="#242b39" roughness={0.6} metalness={0.1} />
          </mesh>
          <mesh position={[0.64, 0.045, 0.21]}>
            <boxGeometry args={[0.16, 0.02, 0.12]} />
            <meshStandardMaterial color="#4f7cff" emissive="#365cff" emissiveIntensity={0.35} />
          </mesh>
        </group>
      </HotspotMesh>

      <mesh position={[0.78, 0.15, 0.76]} castShadow>
        <cylinderGeometry args={[0.12, 0.14, 0.04, 30]} />
        <meshStandardMaterial color="#171b25" roughness={0.35} metalness={0.35} />
      </mesh>

      <HotspotMesh label="Laptop" onClick={() => onOpen('ai-upbeater')} tooltipPosition={[0, 0.36, 0]}>
        <group position={[1.55, 0.18, 0.34]}>
          <RoundedBox args={[1.16, 0.06, 0.82]} radius={0.04} smoothness={3}>
            <meshStandardMaterial color="#121621" roughness={0.35} metalness={0.55} />
          </RoundedBox>
          <group rotation={[-0.92, 0, 0]} position={[0, 0.37, -0.32]}>
            <RoundedBox args={[1.16, 0.74, 0.05]} radius={0.04} smoothness={3}>
              <meshStandardMaterial color="#11161f" roughness={0.35} metalness={0.5} />
            </RoundedBox>
            <mesh position={[0, 0, 0.03]}>
              <planeGeometry args={[0.98, 0.58]} />
              <meshStandardMaterial color="#121f38" emissive="#1a2f61" emissiveIntensity={0.2} />
            </mesh>
          </group>
          <mesh position={[-0.26, 0.04, 0.12]}>
            <boxGeometry args={[0.17, 0.003, 0.08]} />
            <meshStandardMaterial color="#d8deea" />
          </mesh>
        </group>
      </HotspotMesh>

      <HotspotMesh label="PC Setup" onClick={() => onOpen('projects')} tooltipPosition={[0, 1.35, 0]}>
        <group position={[2.72, 0.86, -0.38]}>
          <RoundedBox args={[1.22, 1.9, 1.02]} radius={0.06} smoothness={4} castShadow>
            <meshStandardMaterial color="#0f121a" roughness={0.42} metalness={0.35} />
          </RoundedBox>
          <mesh position={[0.47, 0.22, 0.51]}>
            <planeGeometry args={[0.18, 1.45]} />
            <meshStandardMaterial color="#1b212d" roughness={0.7} metalness={0.2} />
          </mesh>

          <group position={[0.48, 0.58, 0.525]}>
            {[0.44, 0, -0.44].map((offset, idx) => (
              <mesh key={offset} position={[0, offset, 0]} material={idx % 2 ? fanMat2 : fanMat}>
                <circleGeometry args={[0.16, 28]} />
              </mesh>
            ))}
          </group>
          <mesh position={[-0.2, 0.2, 0.53]}>
            <planeGeometry args={[0.62, 1.35]} />
            <meshStandardMaterial color="#1a2132" emissive="#23345d" emissiveIntensity={0.14} transparent opacity={0.92} />
          </mesh>
        </group>
      </HotspotMesh>

      <HotspotMesh label="Plant" onClick={() => onOpen('about')} tooltipPosition={[0, 0.5, 0]}>
        <group position={[-1.96, 0.25, -0.34]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.16, 0.12, 0.24, 20]} />
            <meshStandardMaterial color="#2b323f" roughness={0.55} metalness={0.22} />
          </mesh>
          <mesh position={[0, 0.24, 0]} castShadow>
            <coneGeometry args={[0.22, 0.45, 10]} />
            <meshStandardMaterial color="#2d5b41" roughness={0.75} />
          </mesh>
        </group>
      </HotspotMesh>

      <HotspotMesh label="Wall Clock" onClick={() => onOpen('contact')} tooltipPosition={[0, 0.45, 0]}>
        <group position={[-2.68, 1.88, -1.56]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.26, 0.26, 0.06, 40]} />
            <meshStandardMaterial color="#161a24" roughness={0.45} metalness={0.3} />
          </mesh>
          <mesh position={[0, 0, 0.035]}>
            <circleGeometry args={[0.2, 32]} />
            <meshStandardMaterial color="#d9deea" />
          </mesh>
          <mesh position={[0.03, 0.04, 0.04]} rotation={[0, 0, 0.9]}>
            <boxGeometry args={[0.08, 0.01, 0.01]} />
            <meshStandardMaterial color="#1f2431" />
          </mesh>
        </group>
      </HotspotMesh>

      <HotspotMesh label="Astronauts" onClick={() => onOpen('builder-story')} tooltipPosition={[0.2, 0.35, 0]}>
        <group position={[2.14, 0.2, 0.32]}>
          {[0, 0.22].map((x) => (
            <group key={x} position={[x, 0, 0]}>
              <mesh position={[0, 0.12, 0]} castShadow>
                <sphereGeometry args={[0.09, 16, 16]} />
                <meshStandardMaterial color="#eef2ff" roughness={0.5} metalness={0.04} />
              </mesh>
              <mesh position={[0, 0.02, 0]} castShadow>
                <capsuleGeometry args={[0.055, 0.12, 6, 10]} />
                <meshStandardMaterial color="#f7f8ff" roughness={0.6} />
              </mesh>
            </group>
          ))}
        </group>
      </HotspotMesh>

      <Float speed={1.1} rotationIntensity={0.06} floatIntensity={0.08}>
        <mesh position={[2.38, 1.35, 0.45]}>
          <sphereGeometry args={[0.045, 14, 14]} />
          <meshStandardMaterial color="#a9b8ff" emissive="#5472ff" emissiveIntensity={0.6} />
        </mesh>
      </Float>

      <pointLight position={[2.9, 1.1, 0.5]} color="#5783ff" intensity={3.6} distance={6} />
      <pointLight position={[3.35, 1.3, -0.35]} color="#b068ff" intensity={2.8} distance={5.2} />
    </group>
  );
});

export function EngineeringDesk3D({ onOpen }: SceneProps) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/40 shadow-rgb">
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [3.7, 2.05, 4.6], fov: 29 }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#070910']} />
        <fog attach="fog" args={['#070910', 5.5, 12]} />
        <ambientLight intensity={0.42} color="#8fa1c9" />
        <directionalLight position={[2.5, 4.6, 2.2]} intensity={1.05} color="#f1f4ff" castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
        <spotLight position={[-3.5, 3.2, 2.4]} angle={0.38} penumbra={0.8} intensity={1.2} color="#b7c8ff" />
        <WorkspaceScene onOpen={onOpen} />
        <ContactShadows position={[0, -0.06, 0]} opacity={0.4} scale={7} blur={1.8} far={3.8} />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_45%,rgba(101,138,255,0.16),transparent_38%),radial-gradient(circle_at_82%_40%,rgba(179,101,255,0.12),transparent_35%)]" />
    </div>
  );
}
