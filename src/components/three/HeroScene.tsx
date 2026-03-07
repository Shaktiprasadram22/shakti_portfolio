"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/* ====== Mouse-reactive group — subtle parallax ====== */
function ParallaxGroup({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null!);
  const { viewport } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useFrame(() => {
    if (!ref.current) return;
    // Smooth lerp towards mouse position
    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      mouse.current.x * 0.15,
      0.03
    );
    ref.current.rotation.x = THREE.MathUtils.lerp(
      ref.current.rotation.x,
      -mouse.current.y * 0.1,
      0.03
    );
  });

  // Listen to pointer move on the canvas
  useFrame(({ pointer }) => {
    mouse.current.x = pointer.x;
    mouse.current.y = pointer.y;
  });

  return <group ref={ref}>{children}</group>;
}

/* ====== Wireframe Torus — reduced opacity, slower rotation ====== */
function WireframeTorus() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_, delta) => {
    ref.current.rotation.x += delta * 0.08;
    ref.current.rotation.y += delta * 0.12;
  });
  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.6}>
      <mesh ref={ref} position={[0.5, 0, -1]}>
        <torusGeometry args={[1.4, 0.35, 16, 32]} />
        <meshStandardMaterial
          color="#6366f1"
          wireframe
          transparent
          opacity={0.15}
          emissive="#6366f1"
          emissiveIntensity={0.08}
        />
      </mesh>
    </Float>
  );
}

/* ====== Floating Particles ====== */
function Particles({ count = 50 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return pos;
  }, [count]);

  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.015;
    ref.current.rotation.x += delta * 0.005;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#818cf8"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

/* ====== Icosahedron ====== */
function FloatingIcosahedron() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_, delta) => {
    ref.current.rotation.x += delta * 0.06;
    ref.current.rotation.z += delta * 0.04;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.5}>
      <mesh ref={ref} position={[2.8, -1.2, -2]} scale={0.45}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#06b6d4"
          wireframe
          transparent
          opacity={0.12}
          emissive="#06b6d4"
          emissiveIntensity={0.06}
        />
      </mesh>
    </Float>
  );
}

/* ====== Octahedron ====== */
function FloatingOctahedron() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.07;
    ref.current.rotation.x += delta * 0.03;
  });
  return (
    <Float speed={1.4} rotationIntensity={0.1} floatIntensity={0.4}>
      <mesh ref={ref} position={[-3, 1.5, -1.5]} scale={0.3}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#a855f7"
          wireframe
          transparent
          opacity={0.15}
          emissive="#a855f7"
          emissiveIntensity={0.06}
        />
      </mesh>
    </Float>
  );
}

/* ====== Main Scene ====== */
export default function HeroScene() {
  return (
    <div className="absolute inset-0 pointer-events-none z-[1]" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent", pointerEvents: "auto" }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.2} color="#6366f1" />
        <pointLight position={[-5, -5, 3]} intensity={0.15} color="#06b6d4" />

        <ParallaxGroup>
          <WireframeTorus />
          <Particles count={40} />
          <FloatingIcosahedron />
          <FloatingOctahedron />
        </ParallaxGroup>
      </Canvas>
    </div>
  );
}
