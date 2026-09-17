'use client';

import React, { useState } from 'react';
import { soundFx } from './AudioEffects';
import {
  Package,
  Terminal,
  Github,
  ExternalLink,
  Copy,
  Check,
  Play,
  ShieldCheck,
  Activity,
  FolderTree,
  Waves,
  Star,
  Download,
  CheckCircle2,
} from 'lucide-react';

interface PackageItem {
  id: string;
  name: string;
  version: string;
  specCode: string;
  tagline: string;
  description: string;
  downloads: string;
  likes: string;
  pubPoints: string;
  pubUrl: string;
  githubUrl: string;
  installCmd: string;
  sampleCode: string;
  demoType: 'waveform' | 'encryption' | 'performance' | 'architecture';
  tags: string[];
}

const packages: PackageItem[] = [
  {
    id: 'audio-waveform',
    name: 'audio_waveform_recorder',
    version: 'v1.4.2',
    specCode: 'PKG-AUD-01',
    tagline: 'Dynamic Real-Time Waveform Audio Visualizer for Flutter',
    description:
      'High-performance audio recording and playback package for Flutter with real-time waveform generation, sub-pixel custom painters, amplitude scaling, and customizable visualizer bars.',
    downloads: '1.2k+ / mo',
    likes: '148',
    pubPoints: '140/140',
    pubUrl: 'https://pub.dev/packages/audio_waveform_recorder',
    githubUrl: 'https://github.com/Naimish-Kumar/audio_waveform_recorder',
    installCmd: 'flutter pub add audio_waveform_recorder',
    sampleCode: `import 'package:audio_waveform_recorder/audio_waveform_recorder.dart';

// Initialize live waveform recorder controller
final controller = WaveformRecorderController(
  sampleRate: 44100,
  barWidth: 3.0,
  spacing: 2.0,
  waveColor: const Color(0xFF10B981),
);

await controller.startRecording();
// Visualizer streams live 60fps PCM amplitudes`,
    demoType: 'waveform',
    tags: ['Audio & DSP', 'Real-Time Waveforms', 'Canvas 60fps', 'Pub.dev'],
  },
  {
    id: 'chat-secure',
    name: 'chat_secure_guard',
    version: 'v2.1.0',
    specCode: 'PKG-SEC-02',
    tagline: 'End-to-End Double Ratchet Cryptographic Security Plugin',
    description:
      'Military-grade encryption and ephemeral key management suite for Flutter chat applications implementing Signal protocol Double Ratchet, Curve25519, and AES-256-GCM.',
    downloads: '850+ / mo',
    likes: '112',
    pubPoints: '140/140',
    pubUrl: 'https://pub.dev/packages/chat_secure_guard',
    githubUrl: 'https://github.com/Naimish-Kumar/chat_secure_guard',
    installCmd: 'flutter pub add chat_secure_guard',
    sampleCode: `import 'package:chat_secure_guard/chat_secure_guard.dart';

final guard = ChatSecureGuard();
final ratchet = await guard.initRatchetSession(recipientPublicKey);

// Encrypt payload with forward secrecy
final encryptedEnvelope = await ratchet.encryptMessage(
  plaintext: 'Confidential project brief payload',
);`,
    demoType: 'encryption',
    tags: ['Cryptography', 'Signal Protocol', 'E2EE Security', 'Pub.dev'],
  },
  {
    id: 'flutter-perf',
    name: 'flutter_performance_optimizer',
    version: 'v1.8.5',
    specCode: 'PKG-PRF-03',
    tagline: 'Diagnostic Profiling & Real-Time FPS Jitter Detector',
    description:
      'Zero-overhead Flutter DevTool overlay that monitors sub-16ms frame render times, flags redundant widget rebuilds, and warns of memory leaks and unclosed stream subscriptions.',
    downloads: '2.1k+ / mo',
    likes: '235',
    pubPoints: '140/140',
    pubUrl: 'https://pub.dev/packages/flutter_performance_optimizer',
    githubUrl: 'https://github.com/Naimish-Kumar/flutter_performance_optimizer',
    installCmd: 'flutter pub add flutter_performance_optimizer',
    sampleCode: `import 'package:flutter_performance_optimizer/optimizer.dart';

void main() {
  PerformanceProfiler.enable(
    targetFps: 60.0,
    detectRebuildLeaks: true,
    onJankDetected: (frameDuration) {
      debugPrint('Jank Alert: \${frameDuration.inMilliseconds}ms');
    },
  );
  runApp(const MyApp());
}`,
    demoType: 'performance',
    tags: ['DevTools', '60fps Diagnostics', 'Memory Profiler', 'Pub.dev'],
  },
  {
    id: 'arch-gen',
    name: 'flutter_architecture_generator',
    version: 'v3.0.1',
    specCode: 'PKG-ARC-04',
    tagline: 'Clean Architecture & BLoC CLI Scaffolding Engine',
    description:
      'Automated terminal generator for enterprise Flutter codebases. Generates Domain, Data, Presentation layers, use cases, repositories, and BLoC state boilerplate in seconds.',
    downloads: '3.4k+ / mo',
    likes: '380',
    pubPoints: '140/140',
    pubUrl: 'https://pub.dev/packages/flutter_architecture_generator',
    githubUrl: 'https://github.com/Naimish-Kumar/flutter_architecture_generator',
    installCmd: 'flutter pub add flutter_architecture_generator',
    sampleCode: `// Terminal CLI Execution:
$ flutter_arch_gen feature --name auth --state bloc --repo

// Generated Folder Structure:
// ├── lib/features/auth/
// │   ├── data/ (models, datasources, repo_impl)
// │   ├── domain/ (entities, repositories, usecases)
// │   └── presentation/ (bloc, pages, widgets)`,
    demoType: 'architecture',
    tags: ['CLI Utility', 'Clean Architecture', 'BLoC State', 'Pub.dev'],
  },
];

export default function OpenSourceDepot() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isRecordingWave, setIsRecordingWave] = useState(true);
  const [cipherInput, setCipherInput] = useState('Confidential Brief Payload');

  const handleCopy = (id: string, text: string) => {
    soundFx.playKeyClick();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-4">
      {/* Dossier Section Header Envelope */}
      <div className="paper-texture rounded-2xl p-6 md:p-8 border border-[#d5c39e] text-slate-800 shadow-xl mb-8">
        <div className="flex flex-wrap items-center justify-between border-b-2 border-slate-300 pb-4 mb-4 gap-3">
          <div className="flex items-center gap-3">
            <span className="ink-stamp stamp-green text-xs font-bold flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5" />
              PUB.DEV PACKAGES \\ VERIFIED
            </span>
            <span className="font-mono text-xs text-slate-500 font-semibold tracking-wider hidden sm:inline">
              REF: OPEN-SOURCE-DEPOT-2026
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 px-3 py-1 rounded font-bold">
              [ 4 PRODUCTION PACKAGES ]
            </span>
            <span className="bg-amber-100 text-amber-950 border border-amber-300 px-3 py-1 rounded font-bold">
              [ 7.5K+ / MO DOWNLOADS ]
            </span>
          </div>
        </div>

        <p className="font-serif italic text-base md:text-lg text-slate-800 leading-relaxed max-w-4xl">
          &ldquo;Open-source packages, cryptographic security suites, and architecture generators engineered for Flutter developers worldwide. Built with strict 60fps frame standards, zero-overhead profiling, and Clean Architecture conventions.&rdquo;
        </p>
      </div>

      {/* VERTICAL LIST OF THEME-MATCHED MANILA DOSSIER CARDS */}
      <div className="space-y-8">
        {packages.map((pkg, idx) => {
          return (
            <div
              key={pkg.id}
              className="manila-card-jacket relative paper-texture rounded-2xl shadow-xl p-6 md:p-8 border border-[#d5c39e] text-slate-800 overflow-hidden transition-all duration-300 hover:shadow-2xl"
            >
              {/* Physical Washi Tape Accents */}
              <div className="absolute -top-3 left-10 w-28 h-5 washi-tape-yellow rotate-[-2deg] pointer-events-none z-10" />
              <div className="absolute -top-3 right-10 w-24 h-5 washi-tape-green rotate-[2deg] pointer-events-none z-10" />

              {/* Card Header Strip */}
              <div className="flex flex-wrap items-center justify-between border-b-2 border-slate-300 pb-3 mb-5 gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="ink-stamp stamp-green text-[10px] font-bold">
                    {pkg.specCode}
                  </span>
                  <h3 className="font-mono text-xl md:text-2xl font-black text-slate-900">
                    {pkg.name}
                  </h3>
                  <span className="font-mono text-xs font-bold bg-[#f0e4cf] text-slate-800 border border-[#c4b087] px-2 py-0.5 rounded">
                    {pkg.version}
                  </span>
                </div>

                {/* External Action Links (Styled as Tactile Buttons) */}
                <div className="flex items-center gap-2 font-mono text-xs">
                  <a
                    href={pkg.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-[#e2d5bc] hover:bg-[#d5c6aa] text-slate-900 font-bold flex items-center gap-1.5 border border-[#c0b090] transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>SOURCE</span>
                  </a>
                  <a
                    href={pkg.pubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white font-bold flex items-center gap-1.5 shadow-sm transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>PUB.DEV ↵</span>
                  </a>
                </div>
              </div>

              {/* Tagline & Description */}
              <div className="mb-6">
                <h4 className="font-sans text-base font-bold text-slate-900 mb-1">
                  {pkg.tagline}
                </h4>
                <p className="font-sans text-xs md:text-sm text-slate-700 leading-relaxed max-w-4xl">
                  {pkg.description}
                </p>
              </div>

              {/* 2-Column Grid: Live Simulator + Code Snippet */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left: Vintage CRT Screen Simulator Widget (6 cols) */}
                <div className="lg:col-span-6 bg-[#10181b] p-4 rounded-xl border border-[#2c3d42] text-slate-200 flex flex-col justify-between shadow-inner">
                  <div className="flex items-center justify-between border-b border-[#25363b] pb-2 mb-3">
                    <span className="font-mono text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                      SIMULATOR // 60FPS RUNTIME
                    </span>
                    <span className="font-mono text-[10px] text-emerald-400 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      ONLINE
                    </span>
                  </div>

                  {/* 1. Waveform Simulator */}
                  {pkg.demoType === 'waveform' && (
                    <div className="space-y-3 py-2">
                      <div className="h-20 bg-[#090e10] rounded-lg p-3 flex items-center justify-center gap-1 overflow-hidden border border-[#1e2e33]">
                        {[16, 32, 50, 75, 90, 60, 80, 100, 45, 70, 95, 85, 60, 40, 90, 70, 35, 65, 80, 45, 70, 35, 20, 50, 75, 95, 55, 30].map(
                          (h, i) => (
                            <div
                              key={i}
                              className={`w-1 rounded-full transition-all duration-150 ${
                                isRecordingWave
                                  ? 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.7)]'
                                  : 'bg-slate-700'
                              }`}
                              style={{
                                height: isRecordingWave
                                  ? `${Math.max(15, (h * Math.sin((i + Date.now() / 250) * 0.5) + h) / 2)}%`
                                  : '15%',
                              }}
                            />
                          )
                        )}
                      </div>
                      <div className="flex items-center justify-between font-mono text-[11px]">
                        <button
                          onClick={() => {
                            soundFx.playKeyClick();
                            setIsRecordingWave(!isRecordingWave);
                          }}
                          className="px-3 py-1 rounded bg-emerald-800 hover:bg-emerald-700 text-white font-bold flex items-center gap-1.5 transition-colors text-xs"
                        >
                          <Play className="w-3 h-3" />
                          {isRecordingWave ? 'PAUSE STREAM' : 'START WAVE'}
                        </button>
                        <span className="text-slate-400">44.1kHz • Sub-pixel PCM</span>
                      </div>
                    </div>
                  )}

                  {/* 2. Encryption Simulator */}
                  {pkg.demoType === 'encryption' && (
                    <div className="space-y-2 py-1 font-mono text-xs">
                      <label className="text-[10px] text-slate-400 uppercase tracking-wider block">
                        Plaintext Payload Input:
                      </label>
                      <input
                        type="text"
                        value={cipherInput}
                        onChange={(e) => setCipherInput(e.target.value)}
                        placeholder="Type confidential brief..."
                        className="w-full bg-[#090e10] border border-[#2c3d42] rounded p-2 text-emerald-300 focus:outline-none text-[11px]"
                      />
                      <label className="text-[10px] text-slate-400 uppercase tracking-wider block pt-1">
                        Double Ratchet Encrypted Envelope:
                      </label>
                      <div className="p-2 bg-[#090e10] rounded border border-emerald-900/60 text-[10px] text-amber-300 break-all">
                        {`DR_v2:aes256_gcm:${btoa(cipherInput + '-2026-NKV')}:sig_curve25519`}
                      </div>
                    </div>
                  )}

                  {/* 3. Performance Profiler */}
                  {pkg.demoType === 'performance' && (
                    <div className="grid grid-cols-3 gap-2 text-center py-2 font-mono text-xs">
                      <div className="bg-[#090e10] p-2.5 rounded border border-[#2c3d42]">
                        <span className="text-slate-400 text-[9px] block">FRAME RATE</span>
                        <span className="text-emerald-400 font-bold text-sm">60.0 FPS</span>
                      </div>
                      <div className="bg-[#090e10] p-2.5 rounded border border-[#2c3d42]">
                        <span className="text-slate-400 text-[9px] block">FRAME TIME</span>
                        <span className="text-cyan-400 font-bold text-sm">&lt;11.4 ms</span>
                      </div>
                      <div className="bg-[#090e10] p-2.5 rounded border border-[#2c3d42]">
                        <span className="text-slate-400 text-[9px] block">JANK ALERTS</span>
                        <span className="text-emerald-400 font-bold text-sm">0 REBUILDS</span>
                      </div>
                    </div>
                  )}

                  {/* 4. Architecture Generator Tree */}
                  {pkg.demoType === 'architecture' && (
                    <div className="space-y-1 font-mono text-[11px] bg-[#090e10] p-3 rounded border border-[#2c3d42] text-slate-300">
                      <p className="text-emerald-400 font-bold">$ flutter_arch_gen feature --name auth</p>
                      <p className="text-slate-400">├── domain/usecases/login_usecase.dart</p>
                      <p className="text-slate-400">├── data/repositories/auth_repo_impl.dart</p>
                      <p className="text-slate-400">└── presentation/bloc/auth_bloc.dart</p>
                    </div>
                  )}

                  {/* Metric Counter Strip */}
                  <div className="flex items-center justify-between border-t border-[#25363b] pt-2.5 mt-3 font-mono text-[11px]">
                    <span className="text-slate-400">Usage: <strong className="text-slate-200">{pkg.downloads}</strong></span>
                    <span className="text-slate-400">Pub Points: <strong className="text-emerald-400">{pkg.pubPoints}</strong></span>
                    <span className="text-slate-400">Likes: <strong className="text-amber-400">{pkg.likes} ★</strong></span>
                  </div>
                </div>

                {/* Right: Installation & Code Snippet Box (6 cols) */}
                <div className="lg:col-span-6 flex flex-col gap-3 font-mono text-xs">
                  {/* CLI Installation Bar */}
                  <div className="bg-[#e8dcbe] rounded-xl border border-[#c4b38d] p-3 flex items-center justify-between text-slate-900 shadow-sm">
                    <code className="text-slate-900 font-bold text-xs truncate mr-2">
                      $ {pkg.installCmd}
                    </code>
                    <button
                      onClick={() => handleCopy(pkg.id + '-cmd', pkg.installCmd)}
                      className="px-2.5 py-1 rounded bg-[#d5c59f] hover:bg-[#c4b38d] text-slate-900 text-[10px] font-bold flex items-center gap-1 shrink-0 transition-colors border border-[#b5a37d]"
                    >
                      {copiedId === pkg.id + '-cmd' ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-800" />
                          <span>COPIED</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>COPY</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Dart Code Snippet Box */}
                  <div className="bg-[#121b1e] rounded-xl border border-[#2b3d42] overflow-hidden flex flex-col shadow-inner">
                    <div className="bg-[#0b1214] px-3 py-1.5 border-b border-[#223136] flex items-center justify-between text-[10px] text-slate-400">
                      <span>example_implementation.dart</span>
                      <button
                        onClick={() => handleCopy(pkg.id + '-code', pkg.sampleCode)}
                        className="hover:text-emerald-400 transition-colors font-bold"
                      >
                        {copiedId === pkg.id + '-code' ? 'COPIED' : 'COPY CODE'}
                      </button>
                    </div>
                    <pre className="p-3 text-slate-300 text-[11px] leading-relaxed overflow-x-auto scrollbar-none">
                      <code>{pkg.sampleCode}</code>
                    </pre>
                  </div>

                  {/* Tags Pill Row */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {pkg.tags.map((t, i) => (
                      <span
                        key={i}
                        className="font-mono text-[10px] px-2 py-0.5 rounded bg-white border border-slate-300 text-slate-800 font-semibold shadow-2xs"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
