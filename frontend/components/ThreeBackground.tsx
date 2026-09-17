'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 80;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particle Cloud Geometry
    const particleCount = 1400;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    const color1 = new THREE.Color('#6366f1'); // Indigo
    const color2 = new THREE.Color('#06b6d4'); // Cyan
    const color3 = new THREE.Color('#c084fc'); // Purple

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 220;
      positions[i3 + 1] = (Math.random() - 0.5) * 220;
      positions[i3 + 2] = (Math.random() - 0.5) * 160;

      // Color variation
      const mixedColor = i % 3 === 0 ? color1 : i % 3 === 1 ? color2 : color3;
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;

      scales[i] = Math.random() * 2 + 1;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle Material
    const material = new THREE.PointsMaterial({
      size: 1.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Floating Geometric Wireframe Objects in 3D Space
    const meshGroup = new THREE.Group();

    // 1. Icosahedron Wireframe
    const icoGeo = new THREE.IcosahedronGeometry(12, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const icosahedron = new THREE.Mesh(icoGeo, icoMat);
    icosahedron.position.set(-60, 25, -30);
    meshGroup.add(icosahedron);

    // 2. Torus Wireframe
    const torusGeo = new THREE.TorusGeometry(14, 3, 16, 50);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    torus.position.set(65, -35, -40);
    meshGroup.add(torus);

    // 3. Octahedron
    const octGeo = new THREE.OctahedronGeometry(10);
    const octMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const octahedron = new THREE.Mesh(octGeo, octMat);
    octahedron.position.set(-50, -60, -20);
    meshGroup.add(octahedron);

    scene.add(meshGroup);

    // Mouse & Scroll Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse easing
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Rotate particle field gently
      particles.rotation.y = elapsedTime * 0.03 + targetX * 0.3;
      particles.rotation.x = elapsedTime * 0.015 + targetY * 0.2;

      // Rotate floating geometric objects
      icosahedron.rotation.x = elapsedTime * 0.2;
      icosahedron.rotation.y = elapsedTime * 0.3;

      torus.rotation.x = elapsedTime * 0.25;
      torus.rotation.y = elapsedTime * 0.15;

      octahedron.rotation.y = elapsedTime * 0.4;
      octahedron.rotation.z = elapsedTime * 0.2;

      // Parallax scroll reaction
      const scrollY = window.scrollY || 0;
      camera.position.y = -scrollY * 0.02;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup on unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0.95 }}
    />
  );
}
