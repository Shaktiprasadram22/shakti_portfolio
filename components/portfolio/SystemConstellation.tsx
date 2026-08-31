"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type SceneNode = {
  position: [number, number, number];
  color: string;
  scale: number;
  shape: "sphere" | "box" | "octahedron";
};

const sceneNodes: SceneNode[] = [
  { position: [0, 0, 0], color: "#c7ff5a", scale: 0.54, shape: "octahedron" },
  { position: [-2.5, 1.4, -0.2], color: "#ff8a4c", scale: 0.32, shape: "sphere" },
  { position: [2.4, 1.55, -0.7], color: "#80e7ff", scale: 0.34, shape: "box" },
  { position: [-2.8, -1.35, -1.2], color: "#80e7ff", scale: 0.27, shape: "box" },
  { position: [2.75, -1.25, -0.25], color: "#ff8a4c", scale: 0.3, shape: "sphere" },
  { position: [-0.7, 2.5, -1.8], color: "#c7ff5a", scale: 0.23, shape: "octahedron" },
  { position: [0.9, -2.45, -1.3], color: "#c7ff5a", scale: 0.24, shape: "octahedron" },
];

function Network({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);
  const positions = useMemo(() => {
    const points: number[] = [];
    const origin = sceneNodes[0].position;

    sceneNodes.slice(1).forEach((node) => {
      points.push(...origin, ...node.position);
    });

    [[1, 5], [2, 5], [1, 3], [2, 4], [3, 6], [4, 6]].forEach(([from, to]) => {
      points.push(...sceneNodes[from].position, ...sceneNodes[to].position);
    });

    return new Float32Array(points);
  }, []);

  useFrame((state, delta) => {
    if (!group.current || reducedMotion) return;

    group.current.rotation.y += delta * 0.065;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      state.pointer.y * 0.09,
      0.035,
    );
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      -state.pointer.x * 0.04,
      0.035,
    );
    group.current.position.x = THREE.MathUtils.lerp(
      group.current.position.x,
      state.pointer.x * 0.18,
      0.03,
    );
  });

  return (
    <group ref={group} rotation={[0.12, -0.22, 0]}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#6f7c63" transparent opacity={0.58} />
      </lineSegments>

      {sceneNodes.map((node, index) => (
        <mesh key={`${node.position.join("-")}-${node.shape}`} position={node.position} scale={node.scale}>
          {node.shape === "sphere" && <sphereGeometry args={[1, 20, 20]} />}
          {node.shape === "box" && <boxGeometry args={[1.3, 1.3, 1.3]} />}
          {node.shape === "octahedron" && <octahedronGeometry args={[1, index === 0 ? 1 : 0]} />}
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={index === 0 ? 0.62 : 0.38}
            roughness={0.28}
            metalness={0.12}
            wireframe={index === 0}
          />
        </mesh>
      ))}
    </group>
  );
}

function ParticleDust({ compact, reducedMotion }: { compact: boolean; reducedMotion: boolean }) {
  const points = useRef<THREE.Points>(null);
  const count = compact ? 90 : 180;
  const positions = useMemo(() => {
    const values = new Float32Array(count * 3);
    for (let index = 0; index < count; index += 1) {
      values[index * 3] = (Math.random() - 0.5) * 11;
      values[index * 3 + 1] = (Math.random() - 0.5) * 8;
      values[index * 3 + 2] = (Math.random() - 0.5) * 6 - 1.5;
    }
    return values;
  }, [count]);

  useFrame((_, delta) => {
    if (!points.current || reducedMotion) return;
    points.current.rotation.y -= delta * 0.012;
  });

  return (
    <points ref={points}>
      <bufferGeometry key={`particle-geometry-${count}`}>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#e7e5db" size={0.025} transparent opacity={0.42} depthWrite={false} />
    </points>
  );
}

export function SystemConstellation() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sizeQuery = window.matchMedia("(max-width: 720px)");
    const update = () => {
      setReducedMotion(motionQuery.matches);
      setCompact(sizeQuery.matches);
    };

    update();
    motionQuery.addEventListener("change", update);
    sizeQuery.addEventListener("change", update);
    return () => {
      motionQuery.removeEventListener("change", update);
      sizeQuery.removeEventListener("change", update);
    };
  }, []);

  return (
    <div className="constellation" data-reduced-motion={reducedMotion ? "true" : "false"}>
      <Canvas
        dpr={compact ? 1 : [1, 1.4]}
        camera={{ position: [0, 0, 8.4], fov: 47 }}
        frameloop={reducedMotion ? "demand" : "always"}
        gl={{ alpha: true, antialias: !compact, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.domElement.setAttribute("role", "img");
          gl.domElement.setAttribute(
            "aria-label",
            "A connected network of services representing Shakti’s backend, web, data, and AI systems.",
          );
        }}
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[3, 4, 5]} intensity={12} color="#c7ff5a" distance={12} />
        <pointLight position={[-4, -2, 3]} intensity={9} color="#80e7ff" distance={10} />
        <Network reducedMotion={reducedMotion} />
        <ParticleDust compact={compact} reducedMotion={reducedMotion} />
      </Canvas>

      <div className="constellation-legend" aria-hidden="true">
        <span>CONTROL</span>
        <span>DELIVER</span>
        <span>OBSERVE</span>
      </div>
    </div>
  );
}
