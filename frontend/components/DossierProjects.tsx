'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Project } from '@/lib/api';
import { soundFx } from './AudioEffects';
import ProjectModal from './ProjectModal';
import {
  Layers,
  Terminal,
  Sparkles,
  ArrowUpRight,
  Github,
  ChevronLeft,
  ChevronRight,
  Smartphone,
  Globe,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface DossierProjectsProps {
  projects: Project[];
  categoryFilter?: '3d-web' | 'fullstack' | 'experiments' | 'all';
}

export default function DossierProjects({
  projects,
  categoryFilter = 'all',
}: DossierProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Filter projects by category
  const filteredProjects = projects.filter((p) => {
    if (categoryFilter === 'all') return true;
    if (categoryFilter === '3d-web') {
      return (
        p.technologies?.toLowerCase().includes('three') ||
        p.technologies?.toLowerCase().includes('webgl') ||
        p.title?.toLowerCase().includes('3d') ||
        p.category === '3d'
      );
    }
    if (categoryFilter === 'fullstack') {
      return (
        p.technologies?.toLowerCase().includes('next') ||
        p.technologies?.toLowerCase().includes('react') ||
        p.technologies?.toLowerCase().includes('node') ||
        p.technologies?.toLowerCase().includes('mysql') ||
        p.category === 'fullstack'
      );
    }
    return true;
  });

  const displayList = filteredProjects.length > 0 ? filteredProjects : projects;
  const totalFiles = displayList.length;

  // GSAP ScrollTrigger Pinned Sequential Dossier Stack
  useEffect(() => {
    const triggerEl = triggerRef.current;
    const sectionEl = sectionRef.current;
    if (!triggerEl || !sectionEl || totalFiles <= 1) return;

    const ctx = gsap.context(() => {
      // Create scroll-driven pinned timeline
      const pinDistance = totalFiles * 450; // Scroll distance in pixels

      ScrollTrigger.create({
        trigger: triggerEl,
        start: 'top top+=70',
        end: `+=${pinDistance}`,
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          setScrollProgress(progress);
          // Calculate active index based on scroll position
          const rawIdx = Math.floor(progress * totalFiles);
          const clampedIdx = Math.min(Math.max(0, rawIdx), totalFiles - 1);
          setActiveIndex(clampedIdx);
        },
      });
    }, triggerEl);

    return () => ctx.revert();
  }, [totalFiles]);

  const currentProject = displayList[activeIndex] || displayList[0];

  const selectFile = (idx: number) => {
    soundFx.playPaperRustle();
    setActiveIndex(idx);
  };

  const handleNext = () => {
    soundFx.playPaperRustle();
    setActiveIndex((prev) => (prev + 1) % totalFiles);
  };

  const handlePrev = () => {
    soundFx.playPaperRustle();
    setActiveIndex((prev) => (prev - 1 + totalFiles) % totalFiles);
  };

  return (
    <div ref={triggerRef} className="w-full relative min-h-screen">
      <div ref={sectionRef} className="w-full max-w-6xl mx-auto px-4 py-4">
        {/* Embroidered Ribbon Ticker */}
        <div className="w-full overflow-hidden embroidered-ribbon py-2 rounded-t-xl select-none mb-4 shadow-lg">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...Array(6)].map((_, i) => (
              <span key={i} className="mx-4 text-xs tracking-widest uppercase font-mono">
                // SEQUENTIAL CASE FILES // SCROLL TO ADVANCE DOSSIER // 60FPS FLUTTER // THREE.JS 3D //
              </span>
            ))}
          </div>
        </div>

        {/* Scroll Progress & File Index Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#11181b] p-3 rounded-xl border border-[#2b3b40] mb-4 font-mono text-xs shadow-md">
          {/* Active File Ticker */}
          <div className="flex items-center gap-3">
            <span className="ink-stamp stamp-green text-[10px] font-bold">
              FILE [{String(activeIndex + 1).padStart(2, '0')} / {String(totalFiles).padStart(2, '0')}]
            </span>
            <span className="font-bold text-slate-200 truncate max-w-[200px] sm:max-w-xs">
              {currentProject?.title}
            </span>
          </div>

          {/* Scroll Pin Indicator */}
          <div className="hidden md:flex items-center gap-2 text-[11px] text-slate-400">
            <span>SCROLL PROGRESS:</span>
            <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
              <div
                className="h-full bg-emerald-500 transition-all duration-100"
                style={{ width: `${Math.max(5, (activeIndex + 1) / totalFiles * 100)}%` }}
              />
            </div>
            <span className="text-emerald-400 font-bold">{Math.round(((activeIndex + 1) / totalFiles) * 100)}%</span>
          </div>

          {/* Quick Step Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 border border-slate-600 transition-colors flex items-center gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>PREV</span>
            </button>
            <button
              onClick={handleNext}
              disabled={activeIndex === totalFiles - 1}
              className="px-2.5 py-1 rounded bg-emerald-800 hover:bg-emerald-700 disabled:opacity-40 text-white font-bold border border-emerald-600 transition-colors flex items-center gap-1"
            >
              <span>NEXT</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Horizontal File Selector Tabs Strip */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none mb-4">
          {displayList.map((p, idx) => {
            const isCurrent = idx === activeIndex;
            return (
              <button
                key={p.id || idx}
                onClick={() => selectFile(idx)}
                className={`px-3 py-2 rounded-t-lg font-mono text-xs transition-all shrink-0 border border-b-0 select-none flex items-center gap-1.5 ${
                  isCurrent
                    ? 'bg-[#d8c39e] text-slate-950 font-black shadow-md -translate-y-0.5 border-[#b59e74] scale-105'
                    : 'bg-[#182326] hover:bg-[#233236] text-slate-400 border-[#2b3a3e]'
                }`}
              >
                <span className={`text-[9px] ${isCurrent ? 'text-red-800 font-bold' : 'text-slate-500'}`}>
                  [{String(idx + 1).padStart(2, '0')}]
                </span>
                <span className="truncate max-w-[120px]">{p.title}</span>
              </button>
            );
          })}
        </div>

        {/* THE ACTIVE SPOTLIGHT DOSSIER FOLDER CARD */}
        {currentProject && (
          <div className="manila-card-jacket relative paper-texture rounded-2xl shadow-2xl p-6 md:p-8 border border-[#d5c39e] text-slate-800 overflow-hidden transition-all duration-300">
            {/* Washi Tapes */}
            <div className="absolute -top-3 left-12 w-28 h-5 washi-tape-yellow rotate-[-2deg] pointer-events-none z-10" />
            <div className="absolute -top-3 right-12 w-24 h-5 washi-tape-green rotate-[3deg] pointer-events-none z-10" />

            {/* Folder Header Metadata Strip */}
            <div className="flex flex-wrap items-center justify-between border-b-2 border-slate-300 pb-3 mb-5 gap-3">
              <div className="flex items-center gap-3">
                <span className="ink-stamp stamp-green text-xs font-bold">
                  ● CLASSIFIED FILE [{String(activeIndex + 1).padStart(2, '0')}] // SHIPPED
                </span>
                <span className="font-mono text-xs text-slate-500 uppercase tracking-widest font-semibold hidden sm:inline">
                  ACROCODER PRODUCTION ARCHIVE
                </span>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="bg-amber-100 text-amber-950 font-bold px-2.5 py-0.5 rounded border border-amber-300">
                  {currentProject.category || 'PRODUCTION'}
                </span>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Polaroid Frame & Actions (5 cols) */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <div
                  onClick={() => {
                    soundFx.playInspect();
                    setSelectedProject(currentProject);
                  }}
                  className="group relative cursor-pointer rotate-[-1deg] hover:rotate-0 transition-transform duration-300"
                >
                  <div className="polaroid-card w-full shadow-xl">
                    <div className="relative w-full h-60 sm:h-64 bg-slate-900 rounded overflow-hidden">
                      {currentProject.image_url ? (
                        <Image
                          src={currentProject.image_url}
                          alt={currentProject.title || 'Project'}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-slate-800 text-slate-400 p-4 text-center">
                          <Smartphone className="w-12 h-12 text-emerald-400 mb-2" />
                          <span className="font-mono text-xs font-bold text-slate-200">
                            {currentProject.title}
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center text-white">
                        <span className="font-mono text-[10px] bg-red-800/90 px-2 py-0.5 rounded font-bold">
                          [ CLICK TO INSPECT SPEC ]
                        </span>
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="mt-2.5 text-center">
                      <p className="font-hand text-xl font-bold text-slate-900 leading-none">
                        ~ {currentProject.title} ~
                      </p>
                      <p className="font-mono text-[10px] text-slate-500 mt-1 uppercase tracking-widest">
                        {currentProject.technologies || 'Flutter / Clean Architecture / 60fps'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Direct Action Launch Links */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {currentProject.live_url && (
                    <a
                      href={currentProject.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-md transition-colors"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>{currentProject.live_url.includes('apple.com') ? 'APP STORE ↵' : currentProject.live_url.includes('play.google.com') ? 'PLAY STORE ↵' : 'LAUNCH APP ↵'}</span>
                    </a>
                  )}
                  {currentProject.demo_url && currentProject.demo_url !== currentProject.live_url && (
                    <a
                      href={currentProject.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-md transition-colors"
                    >
                      <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{currentProject.demo_url.includes('play.google.com') ? 'PLAY STORE ↵' : currentProject.demo_url.includes('apple.com') ? 'APP STORE ↵' : 'STORE DEMO'}</span>
                    </a>
                  )}
                  {currentProject.github_url && (
                    <a
                      href={currentProject.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold flex items-center gap-1.5 transition-colors ${
                        currentProject.github_url.includes('apple.com')
                          ? 'bg-blue-800 hover:bg-blue-700 text-white shadow-md'
                          : 'bg-slate-200 hover:bg-slate-300 text-slate-900 border border-slate-400'
                      }`}
                    >
                      {currentProject.github_url.includes('apple.com') ? (
                        <>
                          <Smartphone className="w-3.5 h-3.5 text-cyan-300" />
                          <span>APP STORE ↵</span>
                        </>
                      ) : (
                        <>
                          <Github className="w-3.5 h-3.5" />
                          <span>SOURCE</span>
                        </>
                      )}
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column: Case File Blueprint Specs (7 cols) */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                <div>
                  <h3 className="font-serif italic text-2xl md:text-3xl font-extrabold text-slate-950 mb-1.5">
                    {currentProject.title}
                  </h3>
                  <p className="font-sans text-xs md:text-sm text-slate-700 leading-relaxed">
                    {currentProject.long_description ||
                      currentProject.description ||
                      'Production cross-platform application architected with Flutter, Clean Architecture, sub-16ms rendering, BLoC state management, and real-time backend integrations.'}
                  </p>
                </div>

                {/* Sub-Spec Modules */}
                <div className="space-y-2.5 font-mono text-xs">
                  <div className="p-3 bg-[#f5eedf] rounded-lg border border-[#d5c39e]">
                    <span className="font-bold text-slate-900 block mb-0.5">
                      [01. ARCHITECTURE & 60FPS TARGET]
                    </span>
                    <p className="text-slate-700 font-sans text-xs leading-relaxed">
                      Engineered with BLoC state management, dependency injection, and sub-16ms frame rendering with zero memory leaks.
                    </p>
                  </div>

                  <div className="p-3 bg-[#f5eedf] rounded-lg border border-[#d5c39e]">
                    <span className="font-bold text-slate-900 block mb-0.5">
                      [02. REAL-TIME & STORE COMPLIANCE]
                    </span>
                    <p className="text-slate-700 font-sans text-xs leading-relaxed">
                      Integrated real-time Socket.IO / WebRTC pipelines, secure payment gateways, and automated App Store & Play Store CI/CD delivery.
                    </p>
                  </div>
                </div>

                {/* Technology Pill Tags */}
                <div>
                  <span className="font-mono text-[10px] uppercase font-bold text-slate-500 tracking-wider block mb-1.5">
                    VERIFIED SPEC TAGS \\\
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {(currentProject.tags && currentProject.tags.length > 0
                      ? currentProject.tags
                      : ['Flutter', 'Dart', 'BLoC', 'Clean Architecture', '60fps', 'REST API']
                    ).map((t, idx) => (
                      <span
                        key={idx}
                        className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border border-slate-300 text-slate-800 shadow-2xs"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Case Study Deep Dive Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  );
}
