"use client";

import { Suspense, useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Float, Environment } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

// useGLTF/Suspense call fetch() with this literal — Next's basePath isn't
// applied automatically, so we mirror the next.config.ts logic here.
const BASE_PATH = process.env.NODE_ENV === "production" ? "/portfolio" : "";
const MODEL_PATH = `${BASE_PATH}/models/davinci-bust.glb`;

function DaVinciBust({ reducedMotion }: { reducedMotion: boolean }) {
  const { scene } = useGLTF(MODEL_PATH);
  const groupRef = useRef<THREE.Group>(null);
  const baseRotation = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });

  const normalizedScene = useMemo(() => {
    const clone = scene.clone();
    const box = new THREE.Box3().setFromObject(clone);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 2 / maxDim;

    clone.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
    clone.scale.setScalar(scale);

    return clone;
  }, [scene]);

  useEffect(() => {
    if (reducedMotion) return;
    function handleMouseMove(e: MouseEvent) {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    }
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [reducedMotion]);

  useFrame((_state, delta) => {
    if (!groupRef.current || reducedMotion) return;

    // Clamp delta — when frameloop pauses on scroll-out, Three's clock keeps
    // accumulating, and the first frame after resume hands us a huge delta
    // that would spike the rotation target.
    const dt = Math.min(delta, 0.05);
    baseRotation.current += dt * 0.15;

    const mouseOffsetY = mouse.current.x * 0.26;
    const mouseOffsetX = mouse.current.y * 0.15;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      baseRotation.current + mouseOffsetY,
      0.05
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouseOffsetX,
      0.05
    );
  });

  const bust = (
    <group ref={groupRef}>
      <primitive object={normalizedScene} />
    </group>
  );

  if (reducedMotion) return bust;

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
      {bust}
    </Float>
  );
}

function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.08} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
      <directionalLight position={[-4, 2, -3]} intensity={0.1} />
      <spotLight
        position={[2, 6, 4]}
        angle={0.35}
        penumbra={0.6}
        intensity={2}
        castShadow
      />
      <Environment preset="city" />
    </>
  );
}

export function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(1);
  const reducedMotion = useReducedMotion() ?? false;

  useEffect(() => {
    function handleScroll() {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, rect.bottom / rect.height));
      setOpacity(progress);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const visible = opacity > 0;
  const frameloop: "always" | "demand" | "never" = !visible
    ? "never"
    : reducedMotion
      ? "demand"
      : "always";

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full"
      style={{ opacity }}
    >
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        style={{ pointerEvents: "auto" }}
        gl={{ antialias: true, alpha: true }}
        frameloop={frameloop}
      >
        <Suspense fallback={null}>
          <SceneLighting />
          <DaVinciBust reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap font-heading text-sm italic text-primary/70">
        Not this Leonardo.
      </p>
    </div>
  );
}

useGLTF.preload(MODEL_PATH);
