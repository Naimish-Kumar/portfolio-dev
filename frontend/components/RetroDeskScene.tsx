'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { soundFx } from './AudioEffects';
import {
  Terminal,
  Cpu,
  Activity,
  Radio,
  Sparkles,
  Send,
  Lightbulb,
} from 'lucide-react';

interface RetroDeskSceneProps {
  name?: string;
  title?: string;
  onExploreWork?: () => void;
  onOpenContact?: () => void;
}

type ScreenMode = 'terminal' | 'mcp' | 'matrix' | 'benchmark' | 'radio';
type LightingMood = 'emerald' | 'amber' | 'blueprint' | 'neon';

export default function RetroDeskScene({
  name = 'Akash Verma',
  title = 'Software Engineer | Java & Mobile Systems Developer',
  onExploreWork,
  onOpenContact,
}: RetroDeskSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [screenMode, setScreenMode] = useState<ScreenMode>('terminal');
  const [lightingMood, setLightingMood] = useState<LightingMood>('emerald');
  const [lampOn, setLampOn] = useState(true);
  const [hoveredObject, setHoveredObject] = useState<string | null>(null);
  const [interactiveToast, setInteractiveToast] = useState<string | null>(null);
  const [commandInput, setCommandInput] = useState('');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'KERNEL: ACROCODER-OS v4.19.26 // 7+ YRS ACTIVE',
    'STACK: Java 17/21 Spring Boot + Flutter + IoT Telemetry',
    'STATUS: Senior Software Engineer @ SpireHub Softwares',
    'READY: Click 3D objects or execute command below:',
  ]);

  // Keep state accessible to Three.js loop without re-instantiating scene
  const stateRef = useRef({
    screenMode,
    lampOn,
    terminalLogs,
    onExploreWork,
    onOpenContact,
  });

  useEffect(() => {
    stateRef.current = {
      screenMode,
      lampOn,
      terminalLogs,
      onExploreWork,
      onOpenContact,
    };
  }, [screenMode, lampOn, terminalLogs, onExploreWork, onOpenContact]);

  // References for Three.js lights and meshes
  const sceneRefs = useRef<{
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    renderer?: THREE.WebGLRenderer;
    lampSpotlight?: THREE.SpotLight;
    lampPointLight?: THREE.PointLight;
    lampBulbMesh?: THREE.Mesh;
    lampShadeMesh?: THREE.Mesh;
    crtGlow?: THREE.PointLight;
    warmFill?: THREE.PointLight;
    keyLight?: THREE.DirectionalLight;
    screenTexture?: THREE.CanvasTexture;
    screenCanvas?: HTMLCanvasElement;
    interactiveMeshes: { mesh: THREE.Object3D; name: string; action: () => void }[];
    keyMeshes: THREE.Mesh[];
  }>({
    interactiveMeshes: [],
    keyMeshes: [],
  });

  const toastTimerRef = useRef<NodeJS.Timeout | null>(null);
  const showToast = useCallback((msg: string) => {
    setInteractiveToast(msg);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setInteractiveToast(null), 3200);
  }, []);

  // Simulate mechanical keyboard key press animation in 3D
  const animateKeyboardPress = useCallback((times = 6) => {
    const keys = sceneRefs.current.keyMeshes;
    if (!keys || keys.length === 0) return;

    for (let i = 0; i < times; i++) {
      setTimeout(() => {
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        if (randomKey) {
          randomKey.position.y -= 0.06;
          soundFx.playKeyClick(360 + Math.random() * 120);
          setTimeout(() => {
            randomKey.position.y += 0.06;
          }, 90);
        }
      }, i * 70);
    }
  }, []);

  // Toggle Desk Lamp function
  const toggleLamp = useCallback(() => {
    setLampOn((prev) => {
      const next = !prev;
      soundFx.playToggle();
      showToast(next ? 'Bankers Lamp: [ON] 3000K Warm Spotlight' : 'Bankers Lamp: [OFF] Dimmed');
      return next;
    });
  }, [showToast]);

  // Direct synchronization of lamp lights when lampOn changes
  useEffect(() => {
    const { lampSpotlight, lampPointLight, lampBulbMesh } = sceneRefs.current;
    if (lampSpotlight) {
      lampSpotlight.intensity = lampOn ? 6.5 : 0.0;
      lampSpotlight.visible = lampOn;
    }
    if (lampPointLight) {
      lampPointLight.intensity = lampOn ? 3.2 : 0.0;
      lampPointLight.visible = lampOn;
    }
    if (lampBulbMesh) {
      const mat = lampBulbMesh.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = lampOn ? 3.0 : 0.0;
    }
  }, [lampOn]);

  // Quick preset actions
  const quickActions = [
    {
      label: 'IoT & Telemetry',
      cmd: 'iot',
      action: () => {
        animateKeyboardPress(8);
        setScreenMode('mcp');
        setTerminalLogs((prev) => [
          ...prev.slice(-4),
          '> iot-gateway --protocol=mqtt,ble',
          '[OK] MQTT Broker: Connected // 50K Active Devices',
          '[OK] Kafka Ingestion Pipeline Active (Sub-10ms)',
          '[OK] Sensor Telemetry -> Real-Time Inference Hub',
        ]);
        showToast('IoT Gateway & Telemetry Stream Active');
      },
    },
    {
      label: 'Java 17/21 & Spring',
      cmd: 'spring',
      action: () => {
        animateKeyboardPress(8);
        setScreenMode('benchmark');
        setTerminalLogs((prev) => [
          ...prev.slice(-4),
          '> java -jar spring-cloud-microservices.jar',
          '[OK] JVM Throughput: 18.4K RPS @ 14.2ms // 99.99% Uptime',
          '[OK] Kafka Event Stream & PostgreSQL / Redis synced',
        ]);
        showToast('Spring Boot Microservices Telemetry Loaded');
      },
    },
    {
      label: 'Flutter & Mobile',
      cmd: 'flutter',
      action: () => {
        animateKeyboardPress(8);
        setScreenMode('matrix');
        setTerminalLogs((prev) => [
          ...prev.slice(-4),
          '> flutter run --profile',
          '[OK] Render Target: Sub-16ms (<16ms frame render target)',
          '[OK] Clean Architecture & BLoC / Provider State Active',
        ]);
        showToast('Flutter 60FPS Mobile Profiler Active');
      },
    },
    {
      label: '7-Yr Career Stack',
      cmd: 'exp',
      action: () => {
        animateKeyboardPress(8);
        setScreenMode('terminal');
        setTerminalLogs((prev) => [
          ...prev.slice(-4),
          '> akash-career --timeline',
          '2023–Pres: Senior Software Engineer @ SpireHub Softwares',
          '2020–2023: Java Enterprise Developer @ Enterprise Software Solutions',
          '2017–2020: Associate Software Engineer @ TechSmart Mobile Systems',
        ]);
        showToast('7+ Years Career Timeline Logged');
      },
    },
  ];

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = commandInput.trim().toLowerCase();
    if (!query) return;

    animateKeyboardPress(query.length + 2);

    if (query === 'clear') {
      setTerminalLogs(['Terminal buffer reset.', 'Type "help" for commands.']);
    } else if (query.includes('iot') || query.includes('mqtt') || query.includes('ble')) {
      quickActions[0].action();
    } else if (query.includes('spring') || query.includes('java')) {
      quickActions[1].action();
    } else if (query.includes('flutter') || query.includes('mobile')) {
      quickActions[2].action();
    } else if (query.includes('exp') || query.includes('spirehub') || query.includes('career')) {
      quickActions[3].action();
    } else if (query.includes('work') || query.includes('project')) {
      onExploreWork?.();
      setTerminalLogs((prev) => [...prev.slice(-4), `> ${query}`, 'Inspecting Case Files & Live Projects...']);
    } else if (query.includes('hire') || query.includes('contact') || query.includes('email')) {
      onOpenContact?.();
      setTerminalLogs((prev) => [...prev.slice(-4), `> ${query}`, 'Opening Direct Contact Brief: akash@spirehubs.com']);
    } else if (query.includes('lamp') || query.includes('light')) {
      toggleLamp();
    } else {
      setTerminalLogs((prev) => [
        ...prev.slice(-4),
        `> ${query}`,
        `Command '${query}' logged. Available: iot, java, flutter, exp, work, hire, lamp, clear`,
      ]);
    }
    setCommandInput('');
  };

  // Sync ambient mood lighting
  useEffect(() => {
    const { crtGlow, warmFill, keyLight } = sceneRefs.current;
    if (!crtGlow || !warmFill || !keyLight) return;

    if (lightingMood === 'emerald') {
      crtGlow.color.setHex(0x34d399);
      warmFill.color.setHex(0xf59e0b);
      keyLight.color.setHex(0xfff8eb);
    } else if (lightingMood === 'amber') {
      crtGlow.color.setHex(0xfbbf24);
      warmFill.color.setHex(0xd97706);
      keyLight.color.setHex(0xfef3c7);
    } else if (lightingMood === 'blueprint') {
      crtGlow.color.setHex(0x38bdf8);
      warmFill.color.setHex(0x6366f1);
      keyLight.color.setHex(0xe0f2fe);
    } else if (lightingMood === 'neon') {
      crtGlow.color.setHex(0xf43f5e);
      warmFill.color.setHex(0xa855f7);
      keyLight.color.setHex(0xffe4e6);
    }
  }, [lightingMood]);

  // Main Three.js Setup & Interactive Raycaster Loop (MOUNT ONLY)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 900;
    const height = container.clientHeight || 540;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0e1315, 0.02);
    sceneRefs.current.scene = scene;

    // Fixed, perfectly-framed isometric perspective camera
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 3.8, 14.5);
    camera.lookAt(0, 0.7, 0);
    sceneRefs.current.camera = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);
    sceneRefs.current.renderer = renderer;

    const deskGroup = new THREE.Group();
    scene.add(deskGroup);

    // --- LIGHTS ---
    const ambientLight = new THREE.AmbientLight(0xffeedd, 0.85);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff8eb, 2.2);
    keyLight.position.set(8, 14, 10);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const crtGlow = new THREE.PointLight(0x34d399, 2.8, 8);
    crtGlow.position.set(0, 2.4, 0.2);
    deskGroup.add(crtGlow);

    const warmFill = new THREE.PointLight(0xf59e0b, 1.4, 10);
    warmFill.position.set(-6, 4, 3);
    deskGroup.add(warmFill);

    sceneRefs.current.crtGlow = crtGlow;
    sceneRefs.current.warmFill = warmFill;
    sceneRefs.current.keyLight = keyLight;

    // --- 1. DESK SURFACE & MAT ---
    const deskGeo = new THREE.BoxGeometry(16, 0.5, 10);
    const deskMat = new THREE.MeshStandardMaterial({
      color: 0x162024,
      roughness: 0.8,
      metalness: 0.15,
    });
    const desk = new THREE.Mesh(deskGeo, deskMat);
    desk.position.y = -0.25;
    desk.receiveShadow = true;
    deskGroup.add(desk);

    // Green Leatherette Felt Cutting Mat
    const matGeo = new THREE.BoxGeometry(13.2, 0.08, 7.8);
    const matMat = new THREE.MeshStandardMaterial({
      color: 0x1f3b2d,
      roughness: 0.65,
      metalness: 0.1,
    });
    const matMesh = new THREE.Mesh(matGeo, matMat);
    matMesh.position.set(0, 0.04, 0.5);
    matMesh.receiveShadow = true;
    deskGroup.add(matMesh);

    // --- 2. DYNAMIC CRT SCREEN TEXTURE CANVAS ---
    const screenCanvas = document.createElement('canvas');
    screenCanvas.width = 1024;
    screenCanvas.height = 768;
    const screenCtx = screenCanvas.getContext('2d')!;
    const screenTexture = new THREE.CanvasTexture(screenCanvas);
    screenTexture.minFilter = THREE.LinearFilter;
    screenTexture.magFilter = THREE.LinearFilter;
    sceneRefs.current.screenTexture = screenTexture;
    sceneRefs.current.screenCanvas = screenCanvas;

    // --- 3. RETRO CRT COMPUTER MONITOR ---
    const crtGroup = new THREE.Group();
    crtGroup.position.set(0, 0.1, -1.8);

    // Stand
    const standBaseGeo = new THREE.CylinderGeometry(1.4, 1.6, 0.3, 32);
    const standMat = new THREE.MeshStandardMaterial({ color: 0xd6cbb0, roughness: 0.5 });
    const standBase = new THREE.Mesh(standBaseGeo, standMat);
    standBase.position.y = 0.15;
    standBase.castShadow = true;
    crtGroup.add(standBase);

    const standNeckGeo = new THREE.BoxGeometry(0.8, 1.2, 0.6);
    const standNeck = new THREE.Mesh(standNeckGeo, standMat);
    standNeck.position.y = 0.8;
    crtGroup.add(standNeck);

    // Housing
    const crtHousingGeo = new THREE.BoxGeometry(4.6, 3.6, 3.4);
    const crtHousingMat = new THREE.MeshStandardMaterial({
      color: 0xe2d6ba,
      roughness: 0.55,
      metalness: 0.05,
    });
    const crtHousing = new THREE.Mesh(crtHousingGeo, crtHousingMat);
    crtHousing.position.set(0, 2.4, 0);
    crtHousing.castShadow = true;
    crtGroup.add(crtHousing);

    // Bezel
    const bezelGeo = new THREE.BoxGeometry(4.2, 3.2, 0.2);
    const bezelMat = new THREE.MeshStandardMaterial({ color: 0x1a2628, roughness: 0.85 });
    const bezel = new THREE.Mesh(bezelGeo, bezelMat);
    bezel.position.set(0, 2.4, 1.62);
    crtGroup.add(bezel);

    // Floppy Drive Slot on CRT Bezel
    const driveSlotGeo = new THREE.BoxGeometry(1.4, 0.12, 0.05);
    const driveSlotMat = new THREE.MeshBasicMaterial({ color: 0x0a0f10 });
    const driveSlot = new THREE.Mesh(driveSlotGeo, driveSlotMat);
    driveSlot.position.set(0, 1.05, 1.72);
    crtGroup.add(driveSlot);

    // LED Status Indicator
    const ledGeo = new THREE.SphereGeometry(0.04, 16, 16);
    const ledMat = new THREE.MeshBasicMaterial({ color: 0x34d399 });
    const led = new THREE.Mesh(ledGeo, ledMat);
    led.position.set(1.0, 1.05, 1.73);
    crtGroup.add(led);

    // CRT Phosphor Curved Screen Mesh (MAPPED WITH DYNAMIC TEXTURE)
    const screenGeo = new THREE.PlaneGeometry(3.6, 2.7);
    const screenMat = new THREE.MeshStandardMaterial({
      map: screenTexture,
      emissive: new THREE.Color(0x34d399),
      emissiveMap: screenTexture,
      emissiveIntensity: 0.95,
      roughness: 0.2,
      metalness: 0.05,
    });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(0, 2.4, 1.73);
    crtGroup.add(screenMesh);
    deskGroup.add(crtGroup);

    // --- 4. RETRO MECHANICAL KEYBOARD WITH BOUNCING KEYS ---
    const kbGroup = new THREE.Group();
    kbGroup.position.set(0, 0.1, 2.2);

    const kbBaseGeo = new THREE.BoxGeometry(5.4, 0.3, 2.1);
    const kbBaseMat = new THREE.MeshStandardMaterial({ color: 0xded2b6, roughness: 0.6 });
    const kbBase = new THREE.Mesh(kbBaseGeo, kbBaseMat);
    kbBase.position.y = 0.15;
    kbBase.rotation.x = -0.06;
    kbBase.castShadow = true;
    kbGroup.add(kbBase);

    // Individual Keycaps
    const keyGeo = new THREE.BoxGeometry(0.32, 0.16, 0.32);
    const keyMatLight = new THREE.MeshStandardMaterial({ color: 0xf5eedc, roughness: 0.4 });
    const keyMatDark = new THREE.MeshStandardMaterial({ color: 0x8a3824, roughness: 0.4 });
    const keyMatAccent = new THREE.MeshStandardMaterial({ color: 0x2d634f, roughness: 0.4 });

    const keyMeshes: THREE.Mesh[] = [];
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 12; c++) {
        const mat =
          (r === 0 && c === 0) || (r === 3 && c === 11)
            ? keyMatDark
            : c === 5 || c === 6
            ? keyMatAccent
            : keyMatLight;
        const key = new THREE.Mesh(keyGeo, mat);
        key.position.set(-2.0 + c * 0.37, 0.34 - r * 0.02, -0.65 + r * 0.39);
        key.castShadow = true;
        kbGroup.add(key);
        keyMeshes.push(key);
      }
    }
    sceneRefs.current.keyMeshes = keyMeshes;
    deskGroup.add(kbGroup);

    // --- 5. RETRO MOUSE & CURVED WIRE ---
    const mouseGroup = new THREE.Group();
    mouseGroup.position.set(3.4, 0.1, 2.2);

    const mouseBodyGeo = new THREE.BoxGeometry(0.85, 0.35, 1.3);
    const mouseMat = new THREE.MeshStandardMaterial({ color: 0xded2b6, roughness: 0.5 });
    const mouseBody = new THREE.Mesh(mouseBodyGeo, mouseMat);
    mouseBody.position.y = 0.18;
    mouseBody.castShadow = true;
    mouseGroup.add(mouseBody);

    const mouseBtnGeo = new THREE.BoxGeometry(0.75, 0.08, 0.4);
    const mouseBtnMat = new THREE.MeshStandardMaterial({ color: 0x8a3824, roughness: 0.4 });
    const mouseBtn = new THREE.Mesh(mouseBtnGeo, mouseBtnMat);
    mouseBtn.position.set(0, 0.36, -0.35);
    mouseGroup.add(mouseBtn);
    deskGroup.add(mouseGroup);

    // --- 6. AUTHENTIC VINTAGE EMERALD BANKER'S DESK LAMP ---
    const lampGroup = new THREE.Group();
    // Positioned neatly to the left side of the desk without obstructing CRT monitor
    lampGroup.position.set(-3.8, 0.1, -0.3);
    lampGroup.rotation.y = 0.35; // Angled gracefully 20 deg towards center desk

    // Premium Materials
    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37, // Polished rich antique brass
      roughness: 0.22,
      metalness: 0.88,
    });
    const brassDarkMat = new THREE.MeshStandardMaterial({
      color: 0xa67c1e, // Burnished brass accents
      roughness: 0.35,
      metalness: 0.8,
    });
    const emeraldGlassMat = new THREE.MeshStandardMaterial({
      color: 0x0f5132, // Classic deep emerald green glass
      roughness: 0.15,
      metalness: 0.1,
      transparent: true,
      opacity: 0.95,
      side: THREE.DoubleSide,
    });
    const opalInteriorMat = new THREE.MeshStandardMaterial({
      color: 0xfffae8, // White opal cased glass interior reflector
      roughness: 0.3,
      metalness: 0.05,
      side: THREE.BackSide,
    });

    // 1. Heavy Stepped Cast Brass Base
    const basePlinthGeo = new THREE.CylinderGeometry(0.72, 0.8, 0.12, 32);
    const basePlinth = new THREE.Mesh(basePlinthGeo, brassMat);
    basePlinth.position.y = 0.06;
    basePlinth.castShadow = true;
    lampGroup.add(basePlinth);

    const baseMidGeo = new THREE.CylinderGeometry(0.55, 0.65, 0.07, 32);
    const baseMid = new THREE.Mesh(baseMidGeo, brassDarkMat);
    baseMid.position.y = 0.14;
    baseMid.castShadow = true;
    lampGroup.add(baseMid);

    const baseCollarGeo = new THREE.CylinderGeometry(0.24, 0.38, 0.1, 24);
    const baseCollar = new THREE.Mesh(baseCollarGeo, brassMat);
    baseCollar.position.y = 0.21;
    lampGroup.add(baseCollar);

    // Rotary toggle switch on base plate
    const switchGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.14, 16);
    const switchMesh = new THREE.Mesh(switchGeo, brassDarkMat);
    switchMesh.position.set(0.38, 0.22, 0.15);
    switchMesh.rotation.z = -0.25;
    lampGroup.add(switchMesh);

    // 2. Upright Brass Column with Decorative Ring Moldings
    const columnGeo = new THREE.CylinderGeometry(0.075, 0.075, 1.4, 20);
    const column = new THREE.Mesh(columnGeo, brassMat);
    column.position.set(0, 0.95, 0);
    column.castShadow = true;
    lampGroup.add(column);

    const ring1Geo = new THREE.TorusGeometry(0.11, 0.035, 16, 24);
    const ring1 = new THREE.Mesh(ring1Geo, brassDarkMat);
    ring1.position.set(0, 0.55, 0);
    ring1.rotation.x = Math.PI / 2;
    lampGroup.add(ring1);

    const ring2 = new THREE.Mesh(ring1Geo, brassDarkMat);
    ring2.position.set(0, 1.35, 0);
    ring2.rotation.x = Math.PI / 2;
    lampGroup.add(ring2);

    // 3. Graceful Arched Gooseneck Curving Forward
    const archCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 1.65, 0),
      new THREE.Vector3(0.05, 2.05, 0.08),
      new THREE.Vector3(0.32, 2.38, 0.28),
      new THREE.Vector3(0.55, 2.45, 0.45),
    ]);
    const archGeo = new THREE.TubeGeometry(archCurve, 24, 0.065, 16, false);
    const archArm = new THREE.Mesh(archGeo, brassMat);
    archArm.castShadow = true;
    lampGroup.add(archArm);

    // 4. Horizontal Yoke & Pivot Swivel Bracket
    const yokeHubGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.2, 16);
    const yokeHub = new THREE.Mesh(yokeHubGeo, brassMat);
    yokeHub.position.set(0.55, 2.45, 0.45);
    yokeHub.rotation.z = Math.PI / 2;
    lampGroup.add(yokeHub);

    // Horizontal cross bar across top
    const crossBarGeo = new THREE.CylinderGeometry(0.045, 0.045, 1.5, 16);
    const crossBar = new THREE.Mesh(crossBarGeo, brassMat);
    crossBar.position.set(0.55, 2.45, 0.45);
    crossBar.rotation.x = Math.PI / 2;
    lampGroup.add(crossBar);

    // Knurled pivot adjustment knobs on each side of the shade
    const sideKnobGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.1, 16);
    const leftKnob = new THREE.Mesh(sideKnobGeo, brassDarkMat);
    leftKnob.position.set(0.55, 2.45, 0.45 + 0.8);
    leftKnob.rotation.x = Math.PI / 2;
    lampGroup.add(leftKnob);

    const rightKnob = new THREE.Mesh(sideKnobGeo, brassDarkMat);
    rightKnob.position.set(0.55, 2.45, 0.45 - 0.8);
    rightKnob.rotation.x = Math.PI / 2;
    lampGroup.add(rightKnob);

    // 5. Classic Emerald Green Glass Shade (Curved Oblong Half-Cylinder Hood)
    const shadeGroup = new THREE.Group();
    shadeGroup.position.set(0.55, 2.38, 0.45);
    // Tilted slightly down to project warm light over desk
    shadeGroup.rotation.x = 0.25;

    // Outer Emerald Cased Glass Hood
    const hoodOuterGeo = new THREE.CylinderGeometry(0.42, 0.42, 1.45, 32, 1, false, 0, Math.PI);
    const shadeBellOuter = new THREE.Mesh(hoodOuterGeo, emeraldGlassMat);
    shadeBellOuter.rotation.z = Math.PI / 2;
    shadeBellOuter.rotation.y = Math.PI; // Opening faces downward
    shadeBellOuter.castShadow = true;
    shadeGroup.add(shadeBellOuter);

    // Inner White Opal Reflector
    const hoodInnerGeo = new THREE.CylinderGeometry(0.4, 0.4, 1.42, 32, 1, false, 0, Math.PI);
    const shadeBellInner = new THREE.Mesh(hoodInnerGeo, opalInteriorMat);
    shadeBellInner.rotation.z = Math.PI / 2;
    shadeBellInner.rotation.y = Math.PI;
    shadeGroup.add(shadeBellInner);

    // Brass End Caps on Left/Right ends of the shade
    const endCapGeo = new THREE.CylinderGeometry(0.43, 0.43, 0.05, 32, 1, false, 0, Math.PI);
    const leftEndCap = new THREE.Mesh(endCapGeo, brassMat);
    leftEndCap.position.x = -0.73;
    leftEndCap.rotation.z = Math.PI / 2;
    leftEndCap.rotation.y = Math.PI;
    shadeGroup.add(leftEndCap);

    const rightEndCap = new THREE.Mesh(endCapGeo, brassMat);
    rightEndCap.position.x = 0.73;
    rightEndCap.rotation.z = Math.PI / 2;
    rightEndCap.rotation.y = Math.PI;
    shadeGroup.add(rightEndCap);

    // 6. Warm Tubular Edison Filament Bulb (Horizontal inside the shade)
    const bulbGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.9, 16);
    const bulbMat = new THREE.MeshStandardMaterial({
      color: 0xfff3be,
      emissive: new THREE.Color(0xffaa2b),
      emissiveIntensity: 3.5,
      roughness: 0.1,
    });
    const lampBulb = new THREE.Mesh(bulbGeo, bulbMat);
    lampBulb.rotation.z = Math.PI / 2;
    lampBulb.position.y = -0.05;
    shadeGroup.add(lampBulb);
    sceneRefs.current.lampBulbMesh = lampBulb;

    // 7. Hanging Brass Pull Chain Switch
    const chainGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.65, 8);
    const pullChain = new THREE.Mesh(chainGeo, brassMat);
    pullChain.position.set(0.35, -0.42, 0.25);
    shadeGroup.add(pullChain);

    const chainBallGeo = new THREE.SphereGeometry(0.055, 12, 12);
    const pullBall = new THREE.Mesh(chainBallGeo, brassDarkMat);
    pullBall.position.set(0.35, -0.76, 0.25);
    shadeGroup.add(pullBall);

    lampGroup.add(shadeGroup);
    sceneRefs.current.lampShadeMesh = shadeBellOuter;

    // 8. Real Downward Warm Spotlight focused onto desk and keyboard
    const lampSpotlight = new THREE.SpotLight(0xffeedd, 5.5, 12, Math.PI / 2.8, 0.45, 1.2);
    lampSpotlight.position.set(0.55, 2.3, 0.45);
    lampSpotlight.target.position.set(1.5, -2.3, 1.2);
    lampSpotlight.castShadow = true;
    lampSpotlight.shadow.mapSize.width = 512;
    lampSpotlight.shadow.mapSize.height = 512;
    lampGroup.add(lampSpotlight);
    lampGroup.add(lampSpotlight.target);
    sceneRefs.current.lampSpotlight = lampSpotlight;

    // Ambient Warm Point Light inside hood
    const lampPointLight = new THREE.PointLight(0xffd070, 3.0, 6.0);
    lampPointLight.position.set(0.55, 2.2, 0.45);
    lampGroup.add(lampPointLight);
    sceneRefs.current.lampPointLight = lampPointLight;

    deskGroup.add(lampGroup);

    // --- 7. STEAMING ESPRESSO MUG & SMOKE ---
    const mugGroup = new THREE.Group();
    mugGroup.position.set(4.4, 0.1, 0.5);

    const mugGeo = new THREE.CylinderGeometry(0.48, 0.42, 0.95, 24);
    const mugMat = new THREE.MeshStandardMaterial({ color: 0x8a3824, roughness: 0.3 });
    const mug = new THREE.Mesh(mugGeo, mugMat);
    mug.position.y = 0.48;
    mug.castShadow = true;
    mugGroup.add(mug);

    // Coffee Liquid Surface
    const coffeeGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.05, 20);
    const coffeeMat = new THREE.MeshStandardMaterial({ color: 0x2b1408, roughness: 0.2 });
    const coffee = new THREE.Mesh(coffeeGeo, coffeeMat);
    coffee.position.y = 0.88;
    mugGroup.add(coffee);

    // Rising Steam Particles
    const steamCount = 40;
    const steamGeo = new THREE.BufferGeometry();
    const steamPositions = new Float32Array(steamCount * 3);
    for (let i = 0; i < steamCount; i++) {
      steamPositions[i * 3] = (Math.random() - 0.5) * 0.35;
      steamPositions[i * 3 + 1] = 0.9 + Math.random() * 1.4;
      steamPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.35;
    }
    steamGeo.setAttribute('position', new THREE.BufferAttribute(steamPositions, 3));
    const steamMat = new THREE.PointsMaterial({
      color: 0xffeedd,
      size: 0.16,
      transparent: true,
      opacity: 0.4,
    });
    const steamParticles = new THREE.Points(steamGeo, steamMat);
    mugGroup.add(steamParticles);
    deskGroup.add(mugGroup);

    // --- 8. MANILA DOSSIER FOLDERS & SPIREHUB FLOPPY DISK ---
    const folderGroup = new THREE.Group();
    folderGroup.position.set(-4.2, 0.1, 1.8);
    folderGroup.rotation.y = 0.22;

    const f1Geo = new THREE.BoxGeometry(2.4, 0.08, 3.2);
    const f1Mat = new THREE.MeshStandardMaterial({ color: 0xdfc99d, roughness: 0.7 });
    const f1 = new THREE.Mesh(f1Geo, f1Mat);
    f1.position.y = 0.04;
    f1.castShadow = true;
    folderGroup.add(f1);

    const f2 = new THREE.Mesh(f1Geo, f1Mat);
    f2.position.set(0.12, 0.12, 0.1);
    f2.rotation.y = -0.15;
    f2.castShadow = true;
    folderGroup.add(f2);
    deskGroup.add(folderGroup);

    // 3.5" Floppy Disk on Desk Mat
    const floppyGroup = new THREE.Group();
    floppyGroup.position.set(-2.2, 0.1, 0.8);
    floppyGroup.rotation.y = -0.3;

    const floppyGeo = new THREE.BoxGeometry(1.2, 0.06, 1.25);
    const floppyMat = new THREE.MeshStandardMaterial({ color: 0x1c2b36, roughness: 0.4 });
    const floppy = new THREE.Mesh(floppyGeo, floppyMat);
    floppy.position.y = 0.04;
    floppy.castShadow = true;
    floppyGroup.add(floppy);

    // Floppy Metal Shutter
    const shutterGeo = new THREE.BoxGeometry(0.8, 0.07, 0.4);
    const shutterMat = new THREE.MeshStandardMaterial({ color: 0xb0b8be, metalness: 0.9, roughness: 0.3 });
    const shutter = new THREE.Mesh(shutterGeo, shutterMat);
    shutter.position.set(0, 0.05, -0.4);
    floppyGroup.add(shutter);
    deskGroup.add(floppyGroup);

    // --- 9. AMBIENT DUST MOTES FLOATING IN LIGHT ---
    const dustCount = 80;
    const dustGeo = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 12;
      dustPositions[i * 3 + 1] = Math.random() * 5 + 0.5;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0xffe89e,
      size: 0.07,
      transparent: true,
      opacity: 0.5,
    });
    const dustParticles = new THREE.Points(dustGeo, dustMat);
    deskGroup.add(dustParticles);

    // Register Interactive Meshes for Click Raycasting
    sceneRefs.current.interactiveMeshes = [
      {
        mesh: screenMesh,
        name: 'CRT Monitor Screen',
        action: () => {
          soundFx.playKeyClick(600);
          setScreenMode((prev) => {
            const modes: ScreenMode[] = ['terminal', 'mcp', 'matrix', 'benchmark', 'radio'];
            const nextMode = modes[(modes.indexOf(prev) + 1) % modes.length];
            showToast(`CRT Mode Switched: [ ${nextMode.toUpperCase()} ]`);
            return nextMode;
          });
        },
      },
      {
        mesh: shadeBellOuter,
        name: "Emerald Banker's Lamp",
        action: () => toggleLamp(),
      },
      {
        mesh: basePlinth,
        name: 'Banker Lamp Base',
        action: () => toggleLamp(),
      },
      {
        mesh: switchMesh,
        name: 'Lamp Rotary Switch',
        action: () => toggleLamp(),
      },
      {
        mesh: pullBall,
        name: 'Lamp Pull Chain',
        action: () => toggleLamp(),
      },
      {
        mesh: kbBase,
        name: 'Mechanical Keyboard',
        action: () => {
          animateKeyboardPress(8);
          showToast('Keyboard Typed // Command Logged');
        },
      },
      {
        mesh: mug,
        name: 'Espresso Mug',
        action: () => {
          soundFx.playStamp();
          showToast('Espresso Fuel: [ 100% READY // 0-LAG COGNITION ]');
        },
      },
      {
        mesh: f1,
        name: 'Case Files Dossier',
        action: () => {
          soundFx.playPaperRustle();
          stateRef.current.onExploreWork?.();
          showToast('Opening Dossier Case Files...');
        },
      },
      {
        mesh: floppy,
        name: 'Spirehub Floppy Kernel',
        action: () => {
          soundFx.playRotaryClick();
          animateKeyboardPress(8);
          setScreenMode('terminal');
          setTerminalLogs((prev) => [
            ...prev.slice(-4),
            '> spirehub-career --timeline',
            '2024–Pres: Flutter Team Lead & Full-Stack Architect',
            '2022–2024: Senior Flutter Developer (6+ Apps)',
            '2019–2022: Java / Spring Boot Developer (3 Full Yrs)',
          ]);
          showToast('Loaded 3.5" Disk: [ SPIREHUB 2019–2026 ARCHIVE ]');
        },
      },
    ];

    // --- RAYCASTER INTERACTION SETUP ---
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const getRaycastIntersection = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      const targetMeshes = sceneRefs.current.interactiveMeshes.map((im) => im.mesh);
      const hits = raycaster.intersectObjects(targetMeshes, true);
      if (hits.length > 0) {
        const topHit = hits[0].object;
        const entry = sceneRefs.current.interactiveMeshes.find(
          (im) => im.mesh === topHit || im.mesh.children.includes(topHit)
        );
        return entry || null;
      }
      return null;
    };

    const handlePointerMove = (e: MouseEvent) => {
      const hit = getRaycastIntersection(e);
      if (hit) {
        container.style.cursor = 'pointer';
        setHoveredObject(hit.name);
      } else {
        container.style.cursor = 'grab';
        setHoveredObject(null);
      }

      // Smooth subtle mouse parallax
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotY = x * 0.32;
      targetRotX = y * 0.16;
    };

    const handlePointerClick = (e: MouseEvent) => {
      const hit = getRaycastIntersection(e);
      if (hit) {
        hit.action();
      }
    };

    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('click', handlePointerClick);

    // --- RENDER DYNAMIC CANVAS CRT TEXTURE ---
    const drawCRTTexture = (time: number) => {
      const w = screenCanvas.width;
      const h = screenCanvas.height;
      const currentMode = stateRef.current.screenMode;
      const currentLogs = stateRef.current.terminalLogs;

      // Fill background
      screenCtx.fillStyle = '#04130d';
      screenCtx.fillRect(0, 0, w, h);

      // CRT Scanline grid lines
      screenCtx.fillStyle = 'rgba(0, 0, 0, 0.32)';
      for (let y = 0; y < h; y += 6) {
        screenCtx.fillRect(0, y, w, 2);
      }

      // CRT Top Header Strip
      screenCtx.fillStyle = '#0e2b1e';
      screenCtx.fillRect(0, 0, w, 68);

      screenCtx.font = 'bold 26px monospace';
      screenCtx.fillStyle = '#34d399';
      screenCtx.fillText('ACROCODER-OS v4.19', 30, 44);

      screenCtx.font = '22px monospace';
      screenCtx.fillStyle = '#fbbf24';
      screenCtx.fillText('STATUS: 7+ YRS ACTIVE // LEAD', w - 460, 44);

      // Mode-Specific Canvas Renderers
      if (currentMode === 'terminal') {
        screenCtx.fillStyle = '#34d399';
        screenCtx.font = '24px monospace';

        currentLogs.slice(-6).forEach((log, i) => {
          screenCtx.fillStyle = log.startsWith('>')
            ? '#fbbf24'
            : log.startsWith('[OK]')
            ? '#38bdf8'
            : '#34d399';
          screenCtx.fillText(log, 30, 130 + i * 44);
        });

        // Blinking prompt cursor
        const blink = Math.floor(time * 2) % 2 === 0;
        screenCtx.fillStyle = '#34d399';
        screenCtx.fillText(`> acro-lead:~$ _${blink ? '█' : ''}`, 30, 130 + 6 * 44);
      } else if (currentMode === 'mcp') {
        screenCtx.fillStyle = '#fbbf24';
        screenCtx.font = 'bold 28px monospace';
        screenCtx.fillText('// MODEL CONTEXT PROTOCOL (MCP) RUNTIME', 30, 120);

        screenCtx.fillStyle = '#38bdf8';
        screenCtx.font = '22px monospace';
        screenCtx.fillText('JSON-RPC 2.0 Agent Bridge: CONNECTED', 30, 170);
        screenCtx.fillText('Registered Toolkits: 8 Tools Active', 30, 210);

        screenCtx.fillStyle = '#34d399';
        screenCtx.fillText('> DISPATCH: generateInventoryForecast() [12ms]', 30, 260);
        screenCtx.fillText('> AGENTIC RAG: Cosine Similarity 0.942 [pgvector]', 30, 300);

        // Telemetry Box
        screenCtx.strokeStyle = '#34d399';
        screenCtx.lineWidth = 3;
        screenCtx.strokeRect(30, 360, w - 60, 180);

        screenCtx.fillStyle = '#e2e8f0';
        screenCtx.fillText('Memory Context: 8,192 Tokens // 0 Hallucinations', 60, 410);
        screenCtx.fillText('Vector Store: Qdrant / PgVector / Pinecone Synced', 60, 460);
        screenCtx.fillText('Zero-Trust Agent Sandbox: SAFE // VERIFIED', 60, 510);
      } else if (currentMode === 'matrix') {
        screenCtx.fillStyle = '#34d399';
        screenCtx.font = 'bold 28px monospace';
        screenCtx.fillText('// FLUTTER 60FPS FRAME PROFILER', 30, 120);

        screenCtx.font = '22px monospace';
        screenCtx.fillStyle = '#38bdf8';
        screenCtx.fillText('FRAME TIME: 10.4ms (Sub-16.6ms Target [OK])', 30, 170);
        screenCtx.fillText('UI THREAD: 0 JANK // RASTER THREAD: 4.2ms', 30, 210);
        screenCtx.fillText('BLoC STATE ENGINE: 18 Repositories Synced', 30, 250);

        // Frame timing bar chart simulation
        screenCtx.fillStyle = '#064e3b';
        screenCtx.fillRect(30, 300, w - 60, 240);

        for (let i = 0; i < 24; i++) {
          const barH = 50 + Math.sin(time * 4 + i) * 35;
          screenCtx.fillStyle = barH > 80 ? '#f59e0b' : '#34d399';
          screenCtx.fillRect(60 + i * 36, 520 - barH, 24, barH);
        }

        screenCtx.fillStyle = '#34d399';
        screenCtx.fillText('60.0 FPS CONTINUOUS RENDER STREAM', 60, 570);
      } else if (currentMode === 'benchmark') {
        screenCtx.fillStyle = '#fbbf24';
        screenCtx.font = 'bold 28px monospace';
        screenCtx.fillText('// SPRING BOOT 3.3 ENTERPRISE TELEMETRY', 30, 120);

        screenCtx.fillStyle = '#38bdf8';
        screenCtx.font = '22px monospace';
        screenCtx.fillText('JVM Throughput: 18,420 RPS @ p99 14.2ms', 30, 170);
        screenCtx.fillText('Kafka Event Stream: 0 Consumer Lag', 30, 210);
        screenCtx.fillText('PostgreSQL Connection Pool: 40/40 Healthy', 30, 250);

        // Memory gauge
        screenCtx.strokeStyle = '#fbbf24';
        screenCtx.lineWidth = 4;
        screenCtx.strokeRect(30, 310, w - 60, 60);
        screenCtx.fillStyle = '#10b981';
        screenCtx.fillRect(34, 314, (w - 68) * 0.42, 52);

        screenCtx.fillStyle = '#ffffff';
        screenCtx.fillText('JVM HEAP ALLOCATION: 42% (1.68 GB / 4.0 GB)', 50, 350);

        screenCtx.fillStyle = '#34d399';
        screenCtx.fillText('3 FULL YEARS CORE JAVA AT SPIREHUB SOFTWARE', 30, 440);
        screenCtx.fillText('Spring Security, OAuth2, Redis Cache, Microservices', 30, 480);
      } else if (currentMode === 'radio') {
        screenCtx.fillStyle = '#38bdf8';
        screenCtx.font = 'bold 28px monospace';
        screenCtx.fillText('// LO-FI RETRO SYNTH RADIO: 98.4 FM', 30, 120);

        // Equalizer wave visualizer
        screenCtx.fillStyle = '#38bdf8';
        for (let i = 0; i < 32; i++) {
          const eqH = 40 + Math.abs(Math.sin(time * 5 + i * 0.4)) * 180;
          screenCtx.fillRect(50 + i * 28, 480 - eqH, 18, eqH);
        }

        screenCtx.font = '22px monospace';
        screenCtx.fillStyle = '#fbbf24';
        screenCtx.fillText('NOW PLAYING: Coding Flow & Ambient Lead Beats', 50, 540);
      }

      screenTexture.needsUpdate = true;
    };

    // --- ANIMATION & PARALLAX LOOP ---
    let animationFrameId: number;
    let targetRotY = 0;
    let targetRotX = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Subtle parallax desk rotation
      deskGroup.rotation.y += (targetRotY - deskGroup.rotation.y) * 0.05;
      deskGroup.rotation.x += (targetRotX - deskGroup.rotation.x) * 0.05;

      // Animate Steam particles
      const pos = steamGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < steamCount; i++) {
        pos[i * 3 + 1] += 0.009;
        pos[i * 3] += Math.sin(elapsedTime * 2 + i) * 0.002;
        if (pos[i * 3 + 1] > 2.4) {
          pos[i * 3 + 1] = 0.9;
        }
      }
      steamGeo.attributes.position.needsUpdate = true;

      // Animate dust motes
      const dustPos = dustGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < dustCount; i++) {
        dustPos[i * 3 + 1] -= 0.003;
        if (dustPos[i * 3 + 1] < 0.2) {
          dustPos[i * 3 + 1] = 5.0;
        }
      }
      dustGeo.attributes.position.needsUpdate = true;

      // CRT Light flicker pulse
      crtGlow.intensity = 2.6 + Math.sin(elapsedTime * 6) * 0.3;

      // Update Canvas Screen
      drawCRTTexture(elapsedTime);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 900;
      const h = container.clientHeight || 540;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      container.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('click', handlePointerClick);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [animateKeyboardPress, toggleLamp]);

  return (
    <section className="relative w-full min-h-[94vh] flex flex-col items-center justify-center overflow-hidden pt-6 pb-12 px-4 bg-[#0e1315]">
      {/* Ambient Room Lighting Background Glow */}
      <div
        className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-[760px] h-[520px] rounded-full blur-[140px] pointer-events-none transition-colors duration-700 ${
          lightingMood === 'emerald'
            ? 'bg-emerald-900/25'
            : lightingMood === 'amber'
            ? 'bg-amber-700/20'
            : lightingMood === 'blueprint'
            ? 'bg-sky-900/25'
            : 'bg-rose-900/25'
        }`}
      />

      {/* TOP HEADER CONTROLS BAR */}
      <div className="z-20 w-full max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3 mb-2 px-2 text-xs font-mono">
        <div className="flex items-center gap-2 bg-[#121b1e]/90 px-3.5 py-1.5 rounded-full border border-[#26373c] shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-300 font-bold tracking-wider">
            STATUS: 7+ YRS ACTIVE // LEAD ARCHITECT
          </span>
        </div>

        {/* Ambient Room Mood Selector */}
        <div className="flex items-center gap-1.5 bg-[#121b1e]/90 px-3 py-1 rounded-full border border-[#26373c]">
          <span className="text-slate-400 text-[10px] uppercase font-bold mr-1 hidden sm:inline">
            ROOM LIGHTING:
          </span>
          {[
            { id: 'emerald' as const, label: 'MATRIX', color: 'text-emerald-400' },
            { id: 'amber' as const, label: '1980s LOFT', color: 'text-amber-400' },
            { id: 'blueprint' as const, label: 'BLUEPRINT', color: 'text-sky-400' },
            { id: 'neon' as const, label: 'NEON STUDIO', color: 'text-rose-400' },
          ].map((mood) => (
            <button
              key={mood.id}
              onClick={() => {
                soundFx.playKeyClick();
                setLightingMood(mood.id);
              }}
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-all ${
                lightingMood === mood.id
                  ? 'bg-slate-800 text-white border border-slate-600 shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {mood.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Hover / Action Toast Pill */}
      {interactiveToast && (
        <div className="z-30 absolute top-20 bg-emerald-950/90 text-emerald-300 border border-emerald-500/80 px-4 py-1.5 rounded-full font-mono text-xs shadow-2xl backdrop-blur-md animate-fade-in flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{interactiveToast}</span>
        </div>
      )}

      {/* Floating Left Bento Note */}
      <div className="hidden xl:block absolute top-24 left-6 z-20 rotate-[-3deg] hover:rotate-0 transition-transform duration-300 select-none">
        <div className="relative bg-[#fef08a] text-slate-900 p-4 rounded-xl shadow-2xl w-60 font-mono text-xs border border-amber-300">
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full shadow-md border border-red-700" />
          <div className="font-bold text-sm tracking-wide text-amber-950 mb-1.5 font-sans flex items-center justify-between">
            <span>{name.split(' ')[0]}</span>
            <span className="text-[9px] bg-emerald-700 text-white px-2 py-0.5 rounded-full font-mono font-bold">
              7+ YRS DEV
            </span>
          </div>
          <p className="text-slate-800 text-[11px] leading-tight mb-2.5">
            Senior Software Engineer @ SpireHub. Cross-platform mobile (Flutter/Android), 3 yrs Java enterprise backends, IoT protocols & microservices.
          </p>
          <button
            onClick={() => {
              soundFx.playPaperRustle();
              onExploreWork?.();
            }}
            className="w-full text-center text-[10px] uppercase font-bold bg-[#35523a] text-white py-1.5 rounded hover:bg-[#28402c] transition-colors tracking-wider shadow-sm"
          >
            Inspect Case Files // Work
          </button>
        </div>
      </div>

      {/* Floating Right Bento Note */}
      <div className="hidden xl:block absolute top-24 right-6 z-20 rotate-[3deg] hover:rotate-0 transition-transform duration-300 select-none">
        <div className="relative bg-[#fde047] text-slate-900 p-4 rounded-xl shadow-2xl w-60 font-mono text-xs border border-amber-300">
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full shadow-md border border-blue-700" />
          <div className="font-bold text-xs uppercase tracking-wider text-amber-950 mb-1 flex items-center justify-between">
            <span>DIRECT DISPATCH</span>
            <span className="text-[9px] bg-blue-700 text-white px-1.5 py-0.5 rounded font-mono font-bold">
              SLA: &lt; 24H
            </span>
          </div>
          <p className="text-slate-800 text-[11px] leading-tight mb-2">
            Priority engineer inbox:
            <br />
            <span className="font-bold text-amber-950">akash@spirehubs.com</span>
          </p>
          <button
            onClick={() => {
              soundFx.playStamp();
              onOpenContact?.();
            }}
            className="w-full text-center text-[10px] uppercase font-bold bg-red-800 text-white py-1.5 rounded hover:bg-red-700 transition-colors tracking-wider shadow-sm"
          >
            Initiate Project Brief // Mail
          </button>
        </div>
      </div>

      {/* MAIN 3D WEBGL ISOMETRIC VIEWPORT */}
      <div className="relative w-full max-w-5xl h-[460px] md:h-[520px] flex items-center justify-center">
        <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Hover Object Identifier Indicator */}
        {hoveredObject && (
          <div className="absolute bottom-4 left-6 z-20 bg-[#0a0f11]/90 text-emerald-300 border border-emerald-500/50 px-3 py-1 rounded font-mono text-[11px] shadow-lg backdrop-blur-xs flex items-center gap-1.5 pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>CLICK TO INTERACT: [ {hoveredObject.toUpperCase()} ]</span>
          </div>
        )}
      </div>

      {/* QUICK COMMAND LAUNCHER DECK */}
      <div className="z-20 w-full max-w-4xl mx-auto px-3 -mt-2 mb-3">
        <div className="bg-[#11181a]/95 backdrop-blur-md p-2.5 rounded-xl border border-[#2b3c41] shadow-lg flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
            <span className="text-slate-400 text-[11px] font-bold mr-1 hidden sm:inline">
              QUICK COMMANDS:
            </span>
            {quickActions.map((qa, idx) => (
              <button
                key={idx}
                onClick={() => {
                  soundFx.playKeyClick();
                  qa.action();
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-[11px] font-bold transition-all hover:border-emerald-500 hover:text-emerald-300 active:scale-95 flex items-center gap-1"
              >
                <span>[ {qa.label} ]</span>
              </button>
            ))}
          </div>

          {/* Interactive Shell Input Form */}
          <form onSubmit={handleCommandSubmit} className="flex items-center gap-1.5 w-full sm:w-auto">
            <div className="relative flex items-center w-full sm:w-60 bg-[#090e10] rounded-lg border border-[#223338] px-2.5 py-1 font-mono text-xs">
              <span className="text-emerald-400 font-bold mr-1.5">&gt;</span>
              <input
                type="text"
                value={commandInput}
                onChange={(e) => setCommandInput(e.target.value)}
                placeholder="type 'mcp', 'spring', 'lamp'..."
                className="w-full bg-transparent text-slate-200 placeholder-slate-500 text-[11px] focus:outline-hidden"
              />
            </div>
            <button
              type="submit"
              className="p-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white transition-colors shrink-0"
              title="Execute Command"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* CRT SCREEN MODE SWITCHER BAR */}
      <div className="z-20 flex flex-wrap items-center justify-center gap-2 px-4 mb-3 font-mono text-[11px]">
        <span className="text-slate-400 mr-1 hidden sm:inline">CRT VIEWPORT:</span>
        {[
          { id: 'terminal' as const, label: '[ TERMINAL ]', icon: Terminal },
          { id: 'mcp' as const, label: '[ AI MCP STREAM ]', icon: Sparkles },
          { id: 'matrix' as const, label: '[ 60FPS PROFILER ]', icon: Activity },
          { id: 'benchmark' as const, label: '[ SPRING BOOT ]', icon: Cpu },
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

      {/* Tactical Quick Action Trigger Bar */}
      <div className="z-20 mt-1 flex flex-wrap items-center justify-center gap-2 md:gap-2.5 px-4 max-w-3xl select-none font-mono text-xs">
        <button
          type="button"
          onClick={toggleLamp}
          className={`font-bold px-3 py-2 rounded-md shadow-md border transition-all active:translate-y-1 flex items-center gap-1.5 cursor-pointer ${
            lampOn
              ? 'bg-amber-400 text-slate-950 border-amber-600'
              : 'bg-slate-800 text-slate-400 border-slate-700'
          }`}
        >
          <Lightbulb className="w-3.5 h-3.5" />
          <span>[ LAMP: {lampOn ? 'ON' : 'OFF'} ]</span>
        </button>

        <button
          type="button"
          onClick={() => {
            soundFx.playPaperRustle();
            onExploreWork?.();
          }}
          className="font-bold px-3.5 py-2 rounded-md shadow-md border transition-all active:translate-y-1 bg-amber-600 hover:bg-amber-500 text-white border-amber-700 cursor-pointer"
        >
          [ EXPLORE CASE FILES ]
        </button>

        <button
          type="button"
          onClick={() => {
            soundFx.playStamp();
            onOpenContact?.();
          }}
          className="font-bold px-3.5 py-2 rounded-md shadow-md border transition-all active:translate-y-1 bg-red-800 hover:bg-red-700 text-white border-red-700 cursor-pointer"
        >
          [ HIRE ME // DIRECT MAIL ]
        </button>
      </div>

      {/* Bottom Profile Headline Badge */}
      <div className="z-20 text-center mt-5 max-w-xl">
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
          <path d="M0,0 C150,90 350,-40 500,60 C650,140 900,-20 1200,40 L1200,120 Z" />
        </svg>
      </div>
    </section>
  );
}
