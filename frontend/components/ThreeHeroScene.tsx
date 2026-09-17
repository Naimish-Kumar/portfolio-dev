'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function ThreeHeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 450;
    const height = container.clientHeight || 450;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group holding the entire 3D cyber structure
    const cyberGroup = new THREE.Group();
    scene.add(cyberGroup);

    // 1. Center Holographic Core - Torus Knot
    const coreGeometry = new THREE.TorusKnotGeometry(4.2, 1.1, 120, 24, 2, 3);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      emissive: 0x221360,
      roughness: 0.2,
      metalness: 0.9,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    cyberGroup.add(coreMesh);

    // 2. Inner Glowing Solid Icosahedron
    const innerGeo = new THREE.IcosahedronGeometry(2.5, 0);
    const innerMat = new THREE.MeshPhongMaterial({
      color: 0x06b6d4,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.6,
      shininess: 100,
      transparent: true,
      opacity: 0.7,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    cyberGroup.add(innerMesh);

    // 3. Surrounding Hologram Orbital Ring 1
    const ring1Geo = new THREE.RingGeometry(6.5, 6.7, 64);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.45,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    cyberGroup.add(ring1);

    // 4. Surrounding Orbital Ring 2
    const ring2Geo = new THREE.RingGeometry(7.8, 8.0, 64);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xc084fc,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    cyberGroup.add(ring2);

    // 5. Floating Particle Swarm around Core
    const particlesCount = 200;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
      const radius = 6 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pPos[i] = radius * Math.sin(phi) * Math.cos(theta);
      pPos[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pPos[i + 2] = radius * Math.cos(phi);
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.35,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const particleCloud = new THREE.Points(pGeo, pMat);
    cyberGroup.add(particleCloud);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x06b6d4, 3, 50);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x818cf8, 3, 50);
    pointLight2.position.set(-10, -10, -10);
    scene.add(pointLight2);

    // Mouse Tracking for Interactive Rotation
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x * 1.2;
      mouseY = y * 1.2;
    };

    container.addEventListener('mousemove', handleMouseMove);

    // Resize
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    // Animation loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const time = clock.getElapsedTime();

      // Smooth interaction
      targetX += (mouseX - targetX) * 0.08;
      targetY += (mouseY - targetY) * 0.08;

      // Group rotation
      cyberGroup.rotation.y = time * 0.35 + targetX * 0.6;
      cyberGroup.rotation.x = time * 0.2 + targetY * 0.5;

      // Individual element rotations
      innerMesh.rotation.y = -time * 0.6;
      innerMesh.rotation.z = time * 0.4;

      ring1.rotation.z = time * 0.4;
      ring2.rotation.z = -time * 0.3;

      particleCloud.rotation.y = time * 0.15;

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
      coreGeometry.dispose();
      coreMaterial.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      pGeo.dispose();
      pMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[380px] sm:h-[440px] flex items-center justify-center cursor-grab active:cursor-grabbing"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-cyan-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-2 text-center text-[10px] font-mono text-cyan-400/70 tracking-wider uppercase pointer-events-none">
        ✦ Interactive 3D Hologram (Hover & Drag) ✦
      </div>
    </div>
  );
}
