"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MutableRefObject, useMemo, useRef } from "react";
import * as THREE from "three";

type SceneBackgroundProps = {
  simplified: boolean;
  pointer: MutableRefObject<{ x: number; y: number }>;
  isLight?: boolean;
};

function ParticleField({ simplified, pointer, isLight }: SceneBackgroundProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);
  const particleCount = simplified ? 220 : 520;

  const positions = useMemo(() => {
    const array = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i += 1) {
      const i3 = i * 3;
      const radius = THREE.MathUtils.randFloat(6, 18);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(THREE.MathUtils.randFloatSpread(2));
      array[i3] = radius * Math.sin(phi) * Math.cos(theta);
      array[i3 + 1] = radius * Math.cos(phi) * 0.7;
      array[i3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }
    return array;
  }, [particleCount]);

  useFrame((state, delta) => {
    if (!pointsRef.current || !groupRef.current) {
      return;
    }

    const targetY = pointer.current.x * (simplified ? 0.14 : 0.22);
    const targetX = pointer.current.y * (simplified ? 0.1 : 0.16);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.04);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.04);
    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      pointer.current.x * (simplified ? 0.4 : 0.65),
      0.03
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      pointer.current.y * (simplified ? 0.28 : 0.45),
      0.03
    );
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, -pointer.current.x * 0.24, 0.02);

    pointsRef.current.rotation.y += delta * 0.017;
    pointsRef.current.rotation.x += delta * 0.009;
    pointsRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.14) * 0.03;
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color={isLight ? "#93c5fd" : "#7dd3fc"}
          size={simplified ? 0.03 : 0.045}
          transparent
          opacity={isLight ? (simplified ? 0.34 : 0.4) : simplified ? 0.58 : 0.68}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

function GlowOrbs({ simplified, pointer, isLight }: SceneBackgroundProps) {
  const clusterRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!clusterRef.current) {
      return;
    }

    const t = state.clock.getElapsedTime();
    clusterRef.current.rotation.y = t * 0.06;
    clusterRef.current.rotation.z = Math.sin(t * 0.14) * 0.08;
    clusterRef.current.rotation.x = THREE.MathUtils.lerp(
      clusterRef.current.rotation.x,
      pointer.current.y * (simplified ? 0.08 : 0.12),
      0.03
    );
    clusterRef.current.position.x = THREE.MathUtils.lerp(
      clusterRef.current.position.x,
      pointer.current.x * (simplified ? 0.18 : 0.28),
      0.02
    );
    clusterRef.current.position.y = THREE.MathUtils.lerp(
      clusterRef.current.position.y,
      pointer.current.y * (simplified ? 0.14 : 0.22),
      0.02
    );
    clusterRef.current.position.z = THREE.MathUtils.lerp(clusterRef.current.position.z, pointer.current.x * 0.28, 0.02);
  });

  return (
    <group ref={clusterRef}>
      <mesh position={[-2.6, 1.2, -1]}>
        <icosahedronGeometry args={[simplified ? 0.6 : 0.75, 1]} />
        <meshStandardMaterial
          color={isLight ? "#7dd3fc" : "#0ea5e9"}
          emissive={isLight ? "#7dd3fc" : "#0ea5e9"}
          emissiveIntensity={isLight ? 0.2 : 0.5}
          roughness={0.35}
        />
      </mesh>
      {!simplified && (
        <mesh position={[2.8, -1.6, -2.2]}>
          <octahedronGeometry args={[0.62, 0]} />
          <meshStandardMaterial
            color={isLight ? "#99f6e4" : "#14b8a6"}
            emissive={isLight ? "#99f6e4" : "#14b8a6"}
            emissiveIntensity={isLight ? 0.22 : 0.54}
            roughness={0.28}
          />
        </mesh>
      )}
      <mesh position={[0.5, 2.1, -3.5]}>
        <sphereGeometry args={[0.48, 18, 18]} />
        <meshStandardMaterial
          color={isLight ? "#bbf7d0" : "#22c55e"}
          emissive={isLight ? "#bbf7d0" : "#22c55e"}
          emissiveIntensity={isLight ? 0.18 : 0.42}
          roughness={0.45}
        />
      </mesh>
    </group>
  );
}

function CameraRig({ simplified, pointer }: SceneBackgroundProps) {
  useFrame(({ camera }) => {
    const targetX = pointer.current.x * (simplified ? 0.1 : 0.18);
    const targetY = pointer.current.y * (simplified ? 0.06 : 0.12);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.02);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.02);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export function SceneBackground({ simplified, pointer, isLight }: SceneBackgroundProps) {
  return (
    <Canvas
      dpr={simplified ? [1, 1.25] : [1, 1.5]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 10], fov: 55 }}
      frameloop="always"
      performance={{ min: 0.5 }}
    >
      <fog attach="fog" args={[isLight ? "#eef4fa" : "#020617", 10, 28]} />
      <ambientLight intensity={isLight ? 0.42 : 0.34} />
      <pointLight position={[3, 4, 4]} intensity={isLight ? 0.58 : 1.2} color="#38bdf8" />
      <pointLight position={[-4, -2, 2]} intensity={isLight ? 0.42 : 0.7} color="#14b8a6" />
      <CameraRig simplified={simplified} pointer={pointer} />
      <ParticleField simplified={simplified} pointer={pointer} isLight={isLight} />
      <GlowOrbs simplified={simplified} pointer={pointer} isLight={isLight} />
    </Canvas>
  );
}
