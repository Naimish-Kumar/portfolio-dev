'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Skill {
  id: number;
  name: string;
  category: string;
  proficiency: number;
}

interface ThreeSkillsGalaxyProps {
  skills: Skill[];
}

export default function ThreeSkillsGalaxy({ skills = [] }: ThreeSkillsGalaxyProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = 340;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 28;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const galaxyGroup = new THREE.Group();
    scene.add(galaxyGroup);

    // Center Sun Orb
    const sunGeo = new THREE.SphereGeometry(2.2, 32, 32);
    const sunMat = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      emissive: 0x312e81,
      roughness: 0.3,
      metalness: 0.8,
      wireframe: true,
    });
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    galaxyGroup.add(sunMesh);

    // Orbiting Skill Nodes
    const nodeCount = Math.max(skills.length, 8);
    const orbitRadius = 11;
    const skillNodes: THREE.Mesh[] = [];

    const sphereGeo = new THREE.SphereGeometry(0.8, 16, 16);
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.3,
    });

    const categoryColors: Record<string, number> = {
      Frontend: 0x38bdf8,
      Backend: 0x818cf8,
      Database: 0x34d399,
      'DevOps & Cloud': 0xf472b6,
      Architecture: 0xfbbf24,
    };

    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const x = Math.cos(angle) * orbitRadius;
      const y = Math.sin(angle) * (orbitRadius * 0.45);
      const z = Math.sin(angle) * (orbitRadius * 0.6);

      const skill = skills[i % skills.length];
      const colorHex = categoryColors[skill?.category || 'Frontend'] || 0x38bdf8;

      const nodeMat = new THREE.MeshStandardMaterial({
        color: colorHex,
        emissive: colorHex,
        emissiveIntensity: 0.4,
        roughness: 0.2,
      });

      const node = new THREE.Mesh(sphereGeo, nodeMat);
      node.position.set(x, y, z);
      galaxyGroup.add(node);
      skillNodes.push(node);

      // Connecting line to center
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(x, y, z),
      ]);
      const line = new THREE.Line(lineGeo, lineMaterial);
      galaxyGroup.add(line);
    }

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const pLight = new THREE.PointLight(0x06b6d4, 2, 40);
    pLight.position.set(0, 0, 15);
    scene.add(pLight);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = -(((e.clientY - rect.top) / rect.height - 0.5) * 2);
    };

    container.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      camera.aspect = newW / height;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, height);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const t = clock.getElapsedTime();

      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      galaxyGroup.rotation.y = t * 0.25 + targetX * 0.8;
      galaxyGroup.rotation.x = 0.35 + targetY * 0.4;

      sunMesh.rotation.y = -t * 0.5;

      skillNodes.forEach((node, i) => {
        node.rotation.y = t * 0.8;
      });

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [skills]);

  return (
    <div className="relative w-full my-8 flex flex-col items-center">
      <div
        ref={mountRef}
        className="w-full h-[340px] flex items-center justify-center cursor-grab active:cursor-grabbing"
      />
      <span className="text-[11px] font-mono text-cyan-400/80 -mt-4 bg-slate-900/80 px-3 py-1 rounded-full border border-slate-800">
        ✦ Interactive 3D Skill Orbital Constellation (Move cursor to spin) ✦
      </span>
    </div>
  );
}
