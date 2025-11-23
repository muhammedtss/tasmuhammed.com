"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

// Dönen ve Şekil Değiştirebilen Nesne (The Core)
function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  // Her karede (frame) çalışır - Animasyon döngüsü
  useFrame((state) => {
    if (!meshRef.current) return;
    // Kendi ekseninde dönme
    meshRef.current.rotation.x += 0.002;
    meshRef.current.rotation.y += 0.005;
    
    // Hafifçe yukarı aşağı süzülme (Floating)
    meshRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.2;
  });

  return (
    <Sphere args={[1, 100, 200]} ref={meshRef} scale={2.2}>
      <MeshDistortMaterial
        color="#fbcfe8" // Sakura Pembesi (Temana uygun)
        attach="material"
        distort={0.4} // Şekil bozulma oranı (Sıvı gibi görünür)
        speed={2} // Dalgalanma hızı
        roughness={0.2}
        metalness={0.8} // Metalik görünüm
      />
    </Sphere>
  );
}

export function HeroScene() {
  return (
    <div className="h-[500px] w-full relative cursor-move">
      {/* Canvas: 3D Dünyasının Penceresi */}
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        {/* Işıklandırma */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} color="#38bdf8" intensity={5} /> {/* Mavi ışık yansıması */}

        {/* Nesnemiz */}
        <AnimatedSphere />

        {/* Kontroller: Mouse ile döndürme */}
        <OrbitControls 
            enableZoom={false} 
            autoRotate 
            autoRotateSpeed={0.5}
            enablePan={false}
        />
      </Canvas>
    </div>
  );
}