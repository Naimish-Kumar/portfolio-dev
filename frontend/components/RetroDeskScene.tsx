'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { soundFx } from './AudioEffects';
import { Terminal, Cpu, Activity, Radio, Sparkles, Code2, Zap } from 'lucide-react';

interface RetroDeskSceneProps {
  name?: string;
  title?: string;
  onExploreWork?: () => void;
  onOpenContact?: () => void;
}

type ScreenMode = 'terminal' | 'matrix' | 'benchmark' | 'radio';

export default function RetroDeskScene({
  name = 'Naimish Kumar Verma',
  title = 'Flutter Team Lead & Mobile Creative',
  onExploreWork,
  onOpenContact,
}: RetroDeskSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [terminalText, setTerminalText] = useState('Flutter...');
  const [screenMode, setScreenMode] = useState<ScreenMode>('terminal');
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [radioFreq, setRadioFreq] = useState('98.4 FM LO-FI');
  const [radioActive, setRadioActive] = useState(false);

  // Dynamic Typewriter loop for terminal
  useEffect(() => {
    const fullPhrases = [
      'Flutter Team Lead',
      'Clean Architecture & BLoC',
      'Sub-16ms 60fps Rendering',
      '6+ Apps on App Stores',
      '4+ Pub.dev Packages',
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;

    const typeLoop = () => {
      const currentPhrase = fullPhrases[phraseIndex];

      if (!isDeleting) {
        setTerminalText(currentPhrase.substring(0, charIndex + 1));
        charIndex++;
        if (charIndex === currentPhrase.length) {
          isDeleting = true;
          timeoutId = setTimeout(typeLoop, 2200);
          return;
        }
      } else {
        setTerminalText(currentPhrase.substring(0, charIndex - 1));
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % fullPhrases.length;
          timeoutId = setTimeout(typeLoop, 500);
          return;
        }
      }

      timeoutId = setTimeout(typeLoop, isDeleting ? 35 : 75);
    };

    timeoutId = setTimeout(typeLoop, 600);
    return () => clearTimeout(timeoutId);
  }, []);

  // Three.js 3D Interactive Isometric Scene
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 900;
    const height = container.clientHeight || 560;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0e1315, 0.02);

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 3.8, 15);
    camera.lookAt(0, 0.5, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    const deskGroup = new THREE.Group();
    scene.add(deskGroup);

    // --- LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0xffeedd, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff8eb, 2.4);
    keyLight.position.set(8, 14, 10);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const crtGlow = new THREE.PointLight(0x34d399, 2.2, 8);
    crtGlow.position.set(0, 1.2, 1.2);
    deskGroup.add(crtGlow);

    const warmFill = new THREE.PointLight(0xf59e0b, 1.4, 12);
    warmFill.position.set(-6, 4, 3);
    deskGroup.add(warmFill);

    // --- 1. DESK SURFACE ---
    const deskGeo = new THREE.BoxGeometry(16, 0.5, 10);
    const deskMat = new THREE.MeshStandardMaterial({
      color: 0xd9c29e,
      roughness: 0.7,
      metalness: 0.1,
    });
    const desk = new THREE.Mesh(deskGeo, deskMat);
    desk.position.set(0, -2.2, 0);
    desk.receiveShadow = true;
    deskGroup.add(desk);

    // Green Blotter Pad
    const blotterGeo = new THREE.BoxGeometry(11.5, 0.06, 6.8);
    const blotterMat = new THREE.MeshStandardMaterial({
      color: 0x2d4635,
      roughness: 0.85,
    });
    const blotter = new THREE.Mesh(blotterGeo, blotterMat);
    blotter.position.set(0, -1.92, 0.5);
    blotter.receiveShadow = true;
    deskGroup.add(blotter);

    // --- 2. RETRO CRT COMPUTER ---
    const crtGroup = new THREE.Group();
    deskGroup.add(crtGroup);
    crtGroup.position.set(0, 0.6, -1.2);

    const caseGeo = new THREE.BoxGeometry(4.8, 3.9, 3.3);
    const mintMat = new THREE.MeshStandardMaterial({
      color: 0x9cb8a1,
      roughness: 0.45,
      metalness: 0.1,
    });
    const monitorCase = new THREE.Mesh(caseGeo, mintMat);
    monitorCase.castShadow = true;
    crtGroup.add(monitorCase);

    const screenBezelGeo = new THREE.BoxGeometry(3.8, 2.7, 0.2);
    const bezelMat = new THREE.MeshStandardMaterial({ color: 0x1a261f, roughness: 0.3 });
    const screenBezel = new THREE.Mesh(screenBezelGeo, bezelMat);
    screenBezel.position.set(0, 0.2, 1.6);
    crtGroup.add(screenBezel);

    const screenGeo = new THREE.PlaneGeometry(3.4, 2.3);
    const screenMat = new THREE.MeshStandardMaterial({
      color: 0x0a140f,
      emissive: 0x1e3a29,
      roughness: 0.1,
      metalness: 0.3,
    });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(0, 0.2, 1.71);
    crtGroup.add(screenMesh);

    // Monitor Rotary Knobs
    for (let i = -1; i <= 1; i++) {
      const knobGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.2, 16);
      const knobMat = new THREE.MeshStandardMaterial({ color: 0xf6cfbe, roughness: 0.5 });
      const knob = new THREE.Mesh(knobGeo, knobMat);
      knob.rotation.x = Math.PI / 2;
      knob.position.set(i * 0.55, -1.3, 1.68);
      crtGroup.add(knob);
    }

    // --- 3. 3D MECHANICAL KEYBOARD ---
    const kbGroup = new THREE.Group();
    deskGroup.add(kbGroup);
    kbGroup.position.set(0, -1.65, 1.8);
    kbGroup.rotation.x = -0.12;

    const kbBaseGeo = new THREE.BoxGeometry(6.4, 0.45, 2.6);
    const kbBaseMat = new THREE.MeshStandardMaterial({ color: 0x9cb8a1, roughness: 0.5 });
    const kbBase = new THREE.Mesh(kbBaseGeo, kbBaseMat);
    kbBase.castShadow = true;
    kbGroup.add(kbBase);

    // Keys Layout
    const keyLayout = [
      { label: 'esc', x: -2.4, y: 0.35, z: -0.6, color: 0xf6cfbe, width: 0.6 },
      { label: '2', x: -1.5, y: 0.35, z: -0.6, color: 0xf5eedf, width: 0.6 },
      { label: '0', x: -0.7, y: 0.35, z: -0.6, color: 0xc8ddc8, width: 0.6 },
      { label: '2', x: 0.1, y: 0.35, z: -0.6, color: 0xf5eedf, width: 0.6 },
      { label: '6', x: 0.9, y: 0.35, z: -0.6, color: 0xf6cfbe, width: 0.6 },
      { label: 'lead', x: 1.95, y: 0.35, z: -0.6, color: 0xd95738, width: 1.1 },
      { label: 'tab', x: -2.3, y: 0.35, z: 0.2, color: 0xf5eedf, width: 0.8 },
      { label: 'f', x: -1.3, y: 0.35, z: 0.2, color: 0xf5eedf, width: 0.6 },
      { label: 'l', x: -0.5, y: 0.35, z: 0.2, color: 0xf5eedf, width: 0.6 },
      { label: 'u', x: 0.3, y: 0.35, z: 0.2, color: 0xf5eedf, width: 0.6 },
      { label: 't', x: 1.1, y: 0.35, z: 0.2, color: 0xf5eedf, width: 0.6 },
      { label: 'space', x: 0, y: 0.35, z: 0.85, color: 0x4a7353, width: 3.2 },
    ];

    const keyMeshes: THREE.Mesh[] = [];
    keyLayout.forEach((k) => {
      const kGeo = new THREE.BoxGeometry(k.width, 0.32, 0.55);
      const kMat = new THREE.MeshStandardMaterial({ color: k.color, roughness: 0.4 });
      const kMesh = new THREE.Mesh(kGeo, kMat);
      kMesh.position.set(k.x, k.y, k.z);
      kMesh.castShadow = true;
      kbGroup.add(kMesh);
      keyMeshes.push(kMesh);
    });

    // --- 4. COFFEE CUP WITH STEAM ---
    const coffeeGroup = new THREE.Group();
    deskGroup.add(coffeeGroup);
    coffeeGroup.position.set(-3.8, -1.1, 0.4);

    const cupGeo = new THREE.CylinderGeometry(0.55, 0.45, 1.4, 24);
    const cupMat = new THREE.MeshStandardMaterial({ color: 0xfbf8f1, roughness: 0.3 });
    const cup = new THREE.Mesh(cupGeo, cupMat);
    cup.castShadow = true;
    coffeeGroup.add(cup);

    const sleeveGeo = new THREE.CylinderGeometry(0.57, 0.5, 0.65, 24);
    const sleeveMat = new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.9 });
    const sleeve = new THREE.Mesh(sleeveGeo, sleeveMat);
    sleeve.position.y = -0.05;
    coffeeGroup.add(sleeve);

    // Steam particles
    const steamGeo = new THREE.BufferGeometry();
    const steamCount = 18;
    const steamPositions = new Float32Array(steamCount * 3);
    for (let i = 0; i < steamCount; i++) {
      steamPositions[i * 3] = (Math.random() - 0.5) * 0.3;
      steamPositions[i * 3 + 1] = 0.8 + Math.random() * 1.2;
      steamPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
    }
    steamGeo.setAttribute('position', new THREE.BufferAttribute(steamPositions, 3));
    const steamMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.08,
      transparent: true,
      opacity: 0.35,
    });
    const steam = new THREE.Points(steamGeo, steamMat);
    coffeeGroup.add(steam);

    // --- 5. RETRO RADIO / AUDIO TUNER ---
    const radioGroup = new THREE.Group();
    deskGroup.add(radioGroup);
    radioGroup.position.set(3.8, -1.0, -0.6);
    radioGroup.rotation.y = -0.25;

    const radioBodyGeo = new THREE.BoxGeometry(2.4, 1.6, 1.2);
    const radioMat = new THREE.MeshStandardMaterial({ color: 0x3d5a73, roughness: 0.6 });
    const radioBody = new THREE.Mesh(radioBodyGeo, radioMat);
    radioBody.castShadow = true;
    radioGroup.add(radioBody);

    const speakerGeo = new THREE.BoxGeometry(1.0, 1.0, 0.05);
    const speakerMat = new THREE.MeshStandardMaterial({ color: 0x1e2c38, roughness: 0.9 });
    const speaker = new THREE.Mesh(speakerGeo, speakerMat);
    speaker.position.set(-0.5, 0, 0.61);
    radioGroup.add(speaker);

    const dialGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.15, 24);
    const dialMat = new THREE.MeshStandardMaterial({ color: 0xf5eedf, roughness: 0.4 });
    const dial = new THREE.Mesh(dialGeo, dialMat);
    dial.rotation.x = Math.PI / 2;
    dial.position.set(0.6, 0.1, 0.62);
    radioGroup.add(dial);

    // --- ANIMATION & INTERACTION LOOP ---
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x * 0.15;
      mouseY = y * 0.1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Subtle breathing float & mouse parallax
      targetRotY += (mouseX - targetRotY) * 0.05;
      targetRotX += (mouseY - targetRotX) * 0.05;

      deskGroup.rotation.y = targetRotY + Math.sin(elapsedTime * 0.5) * 0.015;
      deskGroup.rotation.x = targetRotX;

      // Animate Steam particles
      const pos = steamGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < steamCount; i++) {
        pos[i * 3 + 1] += 0.008;
        pos[i * 3] += Math.sin(elapsedTime * 2 + i) * 0.002;
        if (pos[i * 3 + 1] > 2.2) {
          pos[i * 3 + 1] = 0.8;
        }
      }
      steamGeo.attributes.position.needsUpdate = true;

      // Subtle CRT light pulse
      crtGlow.intensity = 2.0 + Math.sin(elapsedTime * 8) * 0.2;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 900;
      const h = container.clientHeight || 560;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const triggerKey = (keyLabel: string) => {
    soundFx.playKeyClick();
    setActiveKey(keyLabel);
    setTimeout(() => setActiveKey(null), 200);

    if (keyLabel === 'esc') {
      soundFx.playPaperRustle();
      onExploreWork?.();
    } else if (keyLabel === 'HIRE') {
      soundFx.playStamp();
      onOpenContact?.();
    }
  };

  return (
    <section className="relative w-full min-h-[92vh] flex flex-col items-center justify-center overflow-hidden pt-12 pb-16 px-4 bg-[#0e1315]">
      {/* Ambient Lighting Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-emerald-900/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[350px] bg-amber-700/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Floating Sticky Note 1: Status & Role */}
      <div className="hidden lg:block absolute top-28 left-8 z-20 rotate-[-4deg] hover:rotate-0 transition-transform duration-300 select-none">
        <div className="relative bg-[#fef08a] text-slate-900 p-4 rounded shadow-xl w-56 font-mono text-xs border border-amber-300">
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full shadow-md border border-red-700" />
          <div className="font-bold text-sm tracking-wide text-amber-950 mb-1 font-sans flex items-center justify-between">
            <span>`{name.split(' ')[0]}`</span>
            <span className="text-[9px] bg-emerald-600 text-white px-1.5 py-0.5 rounded font-mono">
              LEAD
            </span>
          </div>
          <p className="text-slate-800 text-[11px] leading-tight mb-2">
            Flutter Team Lead @ Spirehub. Available for enterprise cross-platform mobile & 3D projects.
          </p>
          <div className="text-[10px] text-amber-950 font-bold bg-amber-200 px-2 py-0.5 rounded inline-block">
            Lucknow, IN / Remote
          </div>
        </div>
      </div>

      {/* Floating Sticky Note 2: Direct Contact */}
      <div className="hidden lg:block absolute top-32 right-10 z-20 rotate-[5deg] hover:rotate-0 transition-transform duration-300 select-none">
        <div className="relative bg-[#fde047] text-slate-900 p-4 rounded shadow-xl w-56 font-mono text-xs border border-amber-300">
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full shadow-md border border-blue-700" />
          <div className="font-bold text-xs uppercase tracking-wider text-amber-950 mb-1">
            LET&apos;S CONNECT
          </div>
          <p className="text-slate-800 text-[11px] leading-tight mb-2">
            email directly at:
            <br />
            <span className="font-bold text-amber-950">vnaimishkumar@gmail.com</span>
          </p>
          <button
            onClick={() => {
              soundFx.playStamp();
              onOpenContact?.();
            }}
            className="w-full text-center text-[10px] uppercase font-bold bg-red-800 text-white py-1.5 rounded hover:bg-red-700 transition-colors tracking-wider shadow-sm"
          >
            Initiate Project Brief ↵
          </button>
        </div>
      </div>

      {/* Main 3D WebGL Canvas Viewport */}
      <div className="relative w-full max-w-5xl h-[460px] md:h-[540px] flex items-center justify-center">
        <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Dynamic CRT Screen Content Overlay */}
        <div className="absolute top-[32%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center max-w-[280px] sm:max-w-xs">
          {screenMode === 'terminal' && (
            <div className="inline-block px-4 py-2 rounded-lg bg-emerald-950/80 border border-emerald-500/40 backdrop-blur-sm shadow-xl">
              <span className="font-mono text-base md:text-xl font-extrabold text-emerald-300 tracking-wider">
                {terminalText}
              </span>
              <span className="animate-pulse inline-block w-2.5 h-5 bg-emerald-400 ml-1 translate-y-1" />
            </div>
          )}

          {screenMode === 'matrix' && (
            <div className="inline-block px-3 py-1.5 rounded-lg bg-emerald-950/90 border border-emerald-400 font-mono text-[10px] text-emerald-300 leading-tight text-left shadow-xl">
              <p className="text-emerald-400 font-bold">// 60 FPS BENCHMARK STREAM</p>
              <p>FRAME_TIME: 11.2ms [OK]</p>
              <p>BLOC_STATES: 14 ACTIVE</p>
              <p>SOCKET_LATENCY: 18ms</p>
            </div>
          )}

          {screenMode === 'benchmark' && (
            <div className="inline-block px-3 py-1.5 rounded-lg bg-emerald-950/90 border border-emerald-400 font-mono text-[10px] text-emerald-300 leading-tight text-center shadow-xl">
              <span className="text-emerald-400 font-black text-sm">99.9% CRASH FREE</span>
              <p className="text-[9px] text-slate-300 mt-0.5">SUB-16MS ZERO JANK</p>
            </div>
          )}

          {screenMode === 'radio' && (
            <div className="inline-block px-3 py-1.5 rounded-lg bg-emerald-950/90 border border-cyan-400 font-mono text-[10px] text-cyan-300 leading-tight text-center shadow-xl">
              <span className="text-cyan-400 font-bold">{radioFreq}</span>
              <p className="text-[9px] text-slate-300 mt-0.5">AUDIO SYNTH: ON</p>
            </div>
          )}
        </div>
      </div>

      {/* CRT SCREEN MODE SWITCHER BAR */}
      <div className="z-20 -mt-2 flex flex-wrap items-center justify-center gap-2 px-4 mb-3 font-mono text-[11px]">
        <span className="text-slate-400 mr-1 hidden sm:inline">CRT DISPLAY MODE:</span>
        {[
          { id: 'terminal' as const, label: '[ TERMINAL ]', icon: Terminal },
          { id: 'matrix' as const, label: '[ 60FPS METRICS ]', icon: Activity },
          { id: 'benchmark' as const, label: '[ STABILITY ]', icon: Cpu },
          { id: 'radio' as const, label: '[ LO-FI RADIO ]', icon: Radio },
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => {
              soundFx.playKeyClick();
              setScreenMode(m.id);
            }}
            className={`px-2.5 py-1 rounded border transition-all flex items-center gap-1 ${
              screenMode === m.id
                ? 'bg-emerald-800 text-emerald-100 border-emerald-400 font-bold shadow-sm'
                : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            <m.icon className="w-3 h-3" />
            <span>{m.label}</span>
          </button>
        ))}
      </div>

      {/* Interactive Keypad Bar */}
      <div className="z-20 mt-1 flex flex-wrap items-center justify-center gap-2 md:gap-2.5 px-4 max-w-3xl select-none">
        <span className="font-mono text-xs text-slate-400 tracking-wider mr-1 hidden sm:inline">
          PHYSICAL KEYBOARD:
        </span>

        {['esc', '2', '0', '2', '6'].map((k, i) => (
          <button
            key={i}
            onClick={() => triggerKey(k)}
            className={`font-mono text-xs font-bold px-3 py-2 rounded-md shadow-md border transition-all active:translate-y-1 ${
              activeKey === k
                ? 'bg-amber-400 text-slate-950 scale-95 border-amber-600'
                : 'bg-[#e5dcc0] hover:bg-[#f3eedf] text-slate-900 border-[#c2af79]'
            }`}
          >
            [ {k} ]
          </button>
        ))}

        <button
          onClick={() => {
            soundFx.playPaperRustle();
            onExploreWork?.();
          }}
          className="font-mono text-xs font-bold px-3.5 py-2 rounded-md shadow-md border transition-all active:translate-y-1 bg-amber-600 hover:bg-amber-500 text-white border-amber-700"
        >
          [ APPS & WORK ]
        </button>

        <button
          onClick={() => {
            soundFx.playStamp();
            onOpenContact?.();
          }}
          className="font-mono text-xs font-bold px-3.5 py-2 rounded-md shadow-md border transition-all active:translate-y-1 bg-red-800 hover:bg-red-700 text-white border-red-700"
        >
          [ HIRE ME ↵ ]
        </button>
      </div>

      {/* Bottom Profile Headline Badge */}
      <div className="z-20 text-center mt-6 max-w-xl">
        <h1 className="font-serif italic text-2xl md:text-3xl text-[#f3eedf] font-normal">
          {name}
        </h1>
        <p className="font-mono text-xs md:text-sm text-emerald-400 mt-1 uppercase tracking-widest font-bold">
          {title}
        </p>
      </div>

      {/* Decorative Wavy Paper Cut Edge */}
      <div className="absolute -bottom-1 left-0 right-0 w-full overflow-hidden leading-none z-30 pointer-events-none">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-10 text-[#f5eedf] fill-current"
        >
          <path d="M0,0 C150,90 350,-40 500,60 C650,140 900,-20 1200,40 L1200,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
}
