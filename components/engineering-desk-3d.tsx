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

function PCTowerHero() {
  const cyan = useMemo(() => new THREE.MeshStandardMaterial({ color: '#7ac4ff', emissive: '#2f7bff', emissiveIntensity: 0.62, roughness: 0.2, metalness: 0.1 }), []);
  const magenta = useMemo(() => new THREE.MeshStandardMaterial({ color: '#db92ff', emissive: '#9f43ff', emissiveIntensity: 0.56, roughness: 0.2, metalness: 0.1 }), []);

  return (
    <group position={[2.42, 0.93, -0.12]} rotation={[0, -0.14, 0]}>
      <RoundedBox args={[1.34, 2.04, 1.06]} radius={0.08} smoothness={5} castShadow>
        <meshStandardMaterial color="#0d1017" roughness={0.35} metalness={0.42} />
      </RoundedBox>

      <mesh position={[0.56, 0.2, 0.535]}>
        <planeGeometry args={[0.23, 1.62]} />
        <meshStandardMaterial color="#1a2230" roughness={0.85} metalness={0.08} />
      </mesh>

      {[0.5, 0, -0.5].map((y, i) => (
        <group key={y} position={[0.56, y, 0.54]}>
          <mesh>
            <ringGeometry args={[0.15, 0.19, 26]} />
            <meshStandardMaterial color="#0f131d" roughness={0.42} metalness={0.4} />
          </mesh>
          <mesh material={i % 2 ? magenta : cyan}>
            <circleGeometry args={[0.14, 26]} />
          </mesh>
          <mesh position={[0, 0, -0.01]}>
            <circleGeometry args={[0.04, 16]} />
            <meshStandardMaterial color="#111827" roughness={0.35} metalness={0.25} />
          </mesh>
        </group>
      ))}

      <mesh position={[-0.18, 0.24, 0.537]}>
        <planeGeometry args={[0.68, 1.58]} />
        <meshStandardMaterial color="#1a2335" emissive="#244272" emissiveIntensity={0.16} transparent opacity={0.32} roughness={0.18} metalness={0.22} />
      </mesh>

      <mesh position={[-0.2, 0.24, 0.44]}>
        <boxGeometry args={[0.62, 1.45, 0.04]} />
        <meshStandardMaterial color="#111726" emissive="#1c2f55" emissiveIntensity={0.2} roughness={0.28} metalness={0.32} />
      </mesh>

      <pointLight position={[0.46, 0.55, 0.5]} intensity={2.2} color="#5d8eff" distance={2.6} />
      <pointLight position={[0.53, -0.4, 0.5]} intensity={1.8} color="#ae66ff" distance={2.2} />
    </group>
  );
}

const WorkspaceScene = memo(function WorkspaceScene({ onOpen }: SceneProps) {
  const root = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!root.current) return;
    root.current.position.y = Math.sin(state.clock.elapsedTime * 0.16) * 0.018;
  });

  return (
    <group ref={root} position={[0, -0.4, 0]}>
      <mesh position={[0, -1.86, -2.42]} rotation={[-0.85, 0, 0]}>
        <planeGeometry args={[16, 12]} />
        <meshStandardMaterial color="#080a10" roughness={1} />
      </mesh>

      <RoundedBox args={[7.8, 0.12, 3.45]} radius={0.07} smoothness={5} receiveShadow>
        <meshStandardMaterial color="#eceff4" roughness={0.9} metalness={0.04} />
      </RoundedBox>

      <group position={[0.08, 0.14, -0.76]}>
        <HotspotMesh label="Monitor" onClick={() => onOpen('experience')} tooltipPosition={[0, 0.82, 0]}>
          <RoundedBox args={[2.58, 1.43, 0.06]} radius={0.045} smoothness={5} position={[0, 0.86, 0]} castShadow>
            <meshStandardMaterial color="#0f131c" roughness={0.34} metalness={0.28} />
          </RoundedBox>
          <mesh position={[0, 0.86, 0.036]}>
            <planeGeometry args={[2.44, 1.3]} />
            <meshStandardMaterial color="#111b2c" emissive="#182a48" emissiveIntensity={0.22} roughness={0.24} />
          </mesh>
          <RoundedBox args={[0.17, 0.62, 0.14]} radius={0.04} position={[0, 0.34, -0.04]}>
            <meshStandardMaterial color="#161b28" roughness={0.32} metalness={0.44} />
          </RoundedBox>
          <RoundedBox args={[0.9, 0.05, 0.32]} radius={0.05} position={[0, 0.05, 0.02]}>
            <meshStandardMaterial color="#1a2231" roughness={0.34} metalness={0.48} />
          </RoundedBox>
        </HotspotMesh>
      </group>

      <HotspotMesh label="Tech Stack Keyboard" onClick={() => onOpen('tech-stack')} tooltipPosition={[0, 0.3, 0]}>
        <group position={[-0.42, 0.165, 0.56]}>
          <RoundedBox args={[1.84, 0.075, 0.66]} radius={0.06} smoothness={4} castShadow>
            <meshStandardMaterial color="#141923" roughness={0.46} metalness={0.28} />
          </RoundedBox>
          <RoundedBox args={[1.68, 0.018, 0.53]} radius={0.02} smoothness={3} position={[0, 0.04, 0]}>
            <meshStandardMaterial color="#252d3c" roughness={0.64} metalness={0.12} />
          </RoundedBox>
          <mesh position={[0.66, 0.045, 0.24]}>
            <boxGeometry args={[0.14, 0.012, 0.08]} />
            <meshStandardMaterial color="#5f86ff" emissive="#3c64ff" emissiveIntensity={0.32} />
          </mesh>
        </group>
      </HotspotMesh>

      <mesh position={[0.83, 0.15, 0.82]} castShadow>
        <cylinderGeometry args={[0.115, 0.14, 0.04, 26]} />
        <meshStandardMaterial color="#161c28" roughness={0.34} metalness={0.38} />
      </mesh>

      <HotspotMesh label="Laptop AI / Upbeater" onClick={() => onOpen('ai-upbeater')} tooltipPosition={[0, 0.32, 0]}>
        <group position={[1.45, 0.17, 0.4]}>
          <RoundedBox args={[1.2, 0.045, 0.84]} radius={0.045} smoothness={4}>
            <meshStandardMaterial color="#101520" roughness={0.32} metalness={0.62} />
          </RoundedBox>
          <group rotation={[-0.96, 0, 0]} position={[0, 0.35, -0.32]}>
            <RoundedBox args={[1.2, 0.74, 0.04]} radius={0.04} smoothness={4}>
              <meshStandardMaterial color="#0f141f" roughness={0.32} metalness={0.6} />
            </RoundedBox>
            <mesh position={[0, 0, 0.025]}>
              <planeGeometry args={[1.06, 0.6]} />
              <meshStandardMaterial color="#13233e" emissive="#1a3465" emissiveIntensity={0.22} />
            </mesh>
          </group>
        </group>
      </HotspotMesh>

      <HotspotMesh label="Projects PC" onClick={() => onOpen('projects')} tooltipPosition={[0, 1.35, 0]}>
        <PCTowerHero />
      </HotspotMesh>

      <HotspotMesh label="About Plant" onClick={() => onOpen('about')} tooltipPosition={[0, 0.48, 0]}>
        <group position={[-2.03, 0.26, -0.35]}>
          <RoundedBox args={[0.29, 0.24, 0.29]} radius={0.04} smoothness={3}>
            <meshStandardMaterial color="#2b3342" roughness={0.56} metalness={0.24} />
          </RoundedBox>
          <mesh position={[0, 0.26, 0]} castShadow>
            <coneGeometry args={[0.22, 0.45, 9]} />
            <meshStandardMaterial color="#315d46" roughness={0.74} />
          </mesh>
        </group>
      </HotspotMesh>

      <HotspotMesh label="Contact Clock" onClick={() => onOpen('contact')} tooltipPosition={[0, 0.42, 0]}>
        <group position={[-2.72, 1.92, -1.56]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.25, 0.25, 0.06, 34]} />
            <meshStandardMaterial color="#161b25" roughness={0.42} metalness={0.36} />
          </mesh>
          <mesh position={[0, 0, 0.034]}>
            <circleGeometry args={[0.195, 28]} />
            <meshStandardMaterial color="#dce2f0" roughness={0.7} />
          </mesh>
        </group>
      </HotspotMesh>

      <HotspotMesh label="Builder Story Astronauts" onClick={() => onOpen('builder-story')} tooltipPosition={[0.2, 0.35, 0]}>
        <group position={[2.02, 0.2, 0.37]}>
          {[0, 0.22].map((x) => (
            <group key={x} position={[x, 0, 0]}>
              <mesh position={[0, 0.12, 0]} castShadow>
                <sphereGeometry args={[0.09, 14, 14]} />
                <meshStandardMaterial color="#eef2ff" roughness={0.52} metalness={0.05} />
              </mesh>
              <mesh position={[0, 0.03, 0]} castShadow>
                <capsuleGeometry args={[0.055, 0.12, 5, 8]} />
                <meshStandardMaterial color="#f7f9ff" roughness={0.6} />
              </mesh>
            </group>
          ))}
        </group>
      </HotspotMesh>

      <Float speed={1.05} rotationIntensity={0.06} floatIntensity={0.08}>
        <mesh position={[2.3, 1.35, 0.44]}>
          <sphereGeometry args={[0.05, 14, 14]} />
          <meshStandardMaterial color="#a9b8ff" emissive="#5776ff" emissiveIntensity={0.54} />
        </mesh>
      </Float>

      <pointLight position={[2.8, 1.2, 0.54]} color="#6794ff" intensity={2.2} distance={6.4} />
      <pointLight position={[3.18, 1.0, -0.22]} color="#b86fff" intensity={1.8} distance={5.3} />
    </group>
  );
});

export function EngineeringDesk3D({ onOpen }: SceneProps) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/40 shadow-rgb">
      <Canvas shadows dpr={[1, 1.5]} camera={{ position: [3.6, 2.1, 4.55], fov: 28 }} gl={{ antialias: true, powerPreference: 'high-performance' }}>
        <color attach="background" args={['#06080e']} />
        <fog attach="fog" args={['#06080e', 5.2, 12.5]} />
        <ambientLight intensity={0.45} color="#8b9ec6" />
        <hemisphereLight intensity={0.34} color="#9bb0d8" groundColor="#0b0d14" />
        <directionalLight position={[2.5, 4.8, 2.6]} intensity={1.04} color="#f3f6ff" castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
        <spotLight position={[-3.3, 3.25, 2.4]} angle={0.36} penumbra={0.85} intensity={1.18} color="#b7c8ff" />
        <WorkspaceScene onOpen={onOpen} />
        <ContactShadows position={[0, -0.06, 0]} opacity={0.5} scale={7.8} blur={1.9} far={4.2} />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_73%_43%,rgba(110,150,255,0.2),transparent_35%),radial-gradient(circle_at_82%_40%,rgba(189,112,255,0.14),transparent_34%),radial-gradient(circle_at_18%_30%,rgba(130,150,190,0.08),transparent_36%)]" />
    </div>
  );
}
