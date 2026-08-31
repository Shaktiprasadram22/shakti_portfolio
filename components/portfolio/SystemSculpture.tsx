"use client";

import { Canvas, invalidate, useFrame } from "@react-three/fiber";
import type { PointerEvent as ReactPointerEvent } from "react";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const layers = [
  {
    id: "products",
    label: "Releases",
    detail: "Public tools shaped around privacy, speed, and useful constraints.",
    color: "#a73228",
  },
  {
    id: "platforms",
    label: "Systems",
    detail: "APIs, data, queues, observability, and explicit failure paths.",
    color: "#d4af37",
  },
  {
    id: "delivery",
    label: "Proof",
    detail: "Accessible interfaces, measured performance, and resilient cloud delivery.",
    color: "#e5dbc6",
  },
] as const;

type LayerId = (typeof layers)[number]["id"];
type RotationTarget = { yaw: number; pitch: number };

function BladeLayer({
  y,
  color,
  active,
  animate,
  rotation,
}: {
  y: number;
  color: string;
  active: boolean;
  animate: boolean;
  rotation: number;
}) {
  const group = useRef<THREE.Group>(null);

  useEffect(() => invalidate(), [active, animate, rotation]);

  useFrame((state, delta) => {
    if (!group.current) return;
    const targetZ = active ? 0.54 : -0.08;
    const targetScale = active ? 1.055 : 0.94;

    if (!animate) {
      group.current.position.z = targetZ;
      group.current.scale.setScalar(targetScale);
      group.current.rotation.y = rotation;
      return;
    }

    const nextZ = THREE.MathUtils.damp(group.current.position.z, targetZ, 7, delta);
    const nextScale = THREE.MathUtils.damp(group.current.scale.x, targetScale, 6, delta);
    const nextRotation = THREE.MathUtils.damp(group.current.rotation.y, rotation, 6, delta);
    group.current.position.z = nextZ;
    group.current.scale.setScalar(nextScale);
    group.current.rotation.y = nextRotation;

    if (
      Math.abs(nextZ - targetZ) > 0.001 ||
      Math.abs(nextScale - targetScale) > 0.001 ||
      Math.abs(nextRotation - rotation) > 0.001
    ) state.invalidate();
  });

  const opacity = active ? 0.98 : 0.38;

  return (
    <group ref={group} position={[0, y, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[4.7, 2.14, 0.07]} />
        <meshStandardMaterial color="#242321" transparent opacity={active ? 0.9 : 0.28} roughness={0.7} metalness={0.18} />
      </mesh>
      <mesh position={[0, 0.055, 1.12]}>
        <boxGeometry args={[4.95, 0.11, 0.09]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={active ? 0.18 : 0.02} transparent opacity={opacity} roughness={0.34} metalness={0.72} />
      </mesh>
      <mesh position={[0, 0.055, -1.12]}>
        <boxGeometry args={[4.95, 0.11, 0.09]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={active ? 0.18 : 0.02} transparent opacity={opacity} roughness={0.34} metalness={0.72} />
      </mesh>
      <mesh position={[2.46, 0.055, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.34, 0.12, 2.5]} />
        <meshStandardMaterial color={color} transparent opacity={opacity} roughness={0.5} metalness={0.54} />
      </mesh>
      {[-1.45, -0.48, 0.48, 1.45].map((x, index) => (
        <mesh key={x} position={[x, 0.09, 0]} rotation={[0, index % 2 ? -0.16 : 0.16, 0]}>
          <octahedronGeometry args={[index % 2 ? 0.27 : 0.19, 0]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={active ? 0.28 : 0.03} transparent opacity={active ? 0.92 : 0.28} roughness={0.3} metalness={0.5} />
        </mesh>
      ))}
    </group>
  );
}

function Assembly({
  active,
  animate,
  interaction,
}: {
  active: LayerId;
  animate: boolean;
  interaction: React.MutableRefObject<RotationTarget>;
}) {
  const assembly = useRef<THREE.Group>(null);
  const rotor = useRef<THREE.Group>(null);
  const activeIndex = layers.findIndex((layer) => layer.id === active);

  useEffect(() => invalidate(), [activeIndex, animate]);

  useFrame((state, delta) => {
    if (!assembly.current || !rotor.current) return;
    const targetX = -0.1 + interaction.current.pitch;
    const targetY = -0.48 + interaction.current.yaw;
    const targetPositionY = activeIndex === 0 ? -0.12 : activeIndex === 2 ? 0.12 : 0;
    const targetRotor = activeIndex * 0.14 + interaction.current.yaw * 0.24;

    if (!animate) {
      assembly.current.rotation.x = targetX;
      assembly.current.rotation.y = targetY;
      assembly.current.position.y = targetPositionY;
      rotor.current.rotation.z = targetRotor;
      return;
    }

    const nextX = THREE.MathUtils.damp(assembly.current.rotation.x, targetX, 7, delta);
    const nextY = THREE.MathUtils.damp(assembly.current.rotation.y, targetY, 7, delta);
    const nextPositionY = THREE.MathUtils.damp(assembly.current.position.y, targetPositionY, 6, delta);
    const nextRotor = THREE.MathUtils.damp(rotor.current.rotation.z, targetRotor, 6, delta);
    assembly.current.rotation.x = nextX;
    assembly.current.rotation.y = nextY;
    assembly.current.position.y = nextPositionY;
    rotor.current.rotation.z = nextRotor;

    if (
      Math.abs(nextX - targetX) > 0.001 ||
      Math.abs(nextY - targetY) > 0.001 ||
      Math.abs(nextPositionY - targetPositionY) > 0.001 ||
      Math.abs(nextRotor - targetRotor) > 0.001
    ) state.invalidate();
  });

  return (
    <group ref={assembly} rotation={[-0.1, -0.48, -0.48]}>
      <BladeLayer y={1.22} color={layers[0].color} active={active === "products"} animate={animate} rotation={-0.05} />
      <BladeLayer y={0} color={layers[1].color} active={active === "platforms"} animate={animate} rotation={0.025} />
      <BladeLayer y={-1.22} color={layers[2].color} active={active === "delivery"} animate={animate} rotation={-0.015} />

      <mesh position={[-3.15, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.16, 0.2, 1.45, 8]} />
        <meshStandardMaterial color="#2b2b2b" roughness={0.72} metalness={0.28} />
      </mesh>
      <mesh position={[-2.48, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.65, 0.08, 8, 48]} />
        <meshStandardMaterial color="#d4af37" emissive="#d4af37" emissiveIntensity={0.16} roughness={0.3} metalness={0.74} />
      </mesh>

      <group ref={rotor} position={[2.35, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <torusGeometry args={[0.72, 0.07, 8, 4]} />
          <meshStandardMaterial color="#a73228" emissive="#a73228" emissiveIntensity={0.22} roughness={0.42} metalness={0.45} />
        </mesh>
        <mesh>
          <torusGeometry args={[1.02, 0.024, 6, 64, Math.PI * 1.45]} />
          <meshBasicMaterial color="#d4af37" transparent opacity={0.84} />
        </mesh>
      </group>
    </group>
  );
}

export function SystemSculpture() {
  const [active, setActive] = useState<LayerId>("platforms");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [compact, setCompact] = useState(false);
  const [webgl, setWebgl] = useState(false);
  const interaction = useRef<RotationTarget>({ yaw: 0, pitch: 0 });
  const drag = useRef({ active: false, x: 0, y: 0 });
  const selected = layers.find((layer) => layer.id === active) ?? layers[1];

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sizeQuery = window.matchMedia("(max-width: 720px)");
    const update = () => {
      setReducedMotion(motionQuery.matches);
      setCompact(sizeQuery.matches);
    };

    const probe = document.createElement("canvas");
    setWebgl(Boolean(probe.getContext("webgl2") || probe.getContext("webgl")));
    update();
    motionQuery.addEventListener("change", update);
    sizeQuery.addEventListener("change", update);
    return () => {
      motionQuery.removeEventListener("change", update);
      sizeQuery.removeEventListener("change", update);
    };
  }, []);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (reducedMotion || event.pointerType === "touch") return;
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { active: true, x: event.clientX, y: event.clientY };
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current.active || reducedMotion || event.pointerType === "touch") return;
    const deltaX = event.clientX - drag.current.x;
    const deltaY = event.clientY - drag.current.y;
    interaction.current.yaw = THREE.MathUtils.clamp(interaction.current.yaw + deltaX * 0.006, -0.52, 0.52);
    interaction.current.pitch = THREE.MathUtils.clamp(interaction.current.pitch + deltaY * 0.004, -0.28, 0.22);
    drag.current = { active: true, x: event.clientX, y: event.clientY };
    invalidate();
  };

  const releasePointer = () => {
    drag.current.active = false;
  };

  const animate = !reducedMotion;

  return (
    <div className="sculpture-shell" data-webgl={webgl ? "ready" : "fallback"} data-active={active}>
      <div
        className="sculpture-viewport"
        role="img"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={releasePointer}
        onPointerCancel={releasePointer}
        aria-label="A diagonal software blade with selectable release, systems, and proof layers."
      >
        <div className="sculpture-static" aria-hidden="true"><i /><i /><i /><b /></div>

        {webgl && (
          <Canvas
            className="sculpture-canvas"
            dpr={compact ? 1 : [1, 1.2]}
            camera={{ position: [0, 0.35, 8.7], fov: compact ? 49 : 43 }}
            frameloop="demand"
            gl={{ alpha: true, antialias: !compact, powerPreference: "high-performance" }}
            onCreated={({ camera, gl }) => {
              camera.lookAt(0, 0, 0);
              gl.domElement.setAttribute("role", "presentation");
              gl.domElement.setAttribute("aria-hidden", "true");
            }}
          >
            <ambientLight intensity={1.25} />
            <directionalLight position={[4, 5, 6]} intensity={3.4} color="#f3ece1" />
            <pointLight position={[-4, 1, 4]} intensity={18} distance={10} color="#a73228" />
            <pointLight position={[4, -2, 3]} intensity={21} distance={10} color="#d4af37" />
            <Assembly active={active} animate={animate} interaction={interaction} />
          </Canvas>
        )}
      </div>

      <div className="layer-console">
        <div className="layer-console-copy" aria-live="polite"><strong>{selected.label}</strong><p>{selected.detail}</p></div>
        <div className="layer-controls" role="group" aria-label="Inspect system layer">
          {layers.map((layer) => (
            <button
              key={layer.id}
              type="button"
              aria-pressed={active === layer.id}
              onClick={() => {
                setActive(layer.id);
                invalidate();
              }}
              style={{ "--layer-color": layer.color } as React.CSSProperties}
            >
              <span aria-hidden="true" />{layer.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
