'use client';

import React, { useState, useEffect, useRef } from 'react';
import RetroDeskScene from '@/components/RetroDeskScene';
import DossierProjects from '@/components/DossierProjects';
import DossierMetrics from '@/components/DossierMetrics';
import DossierServices from '@/components/DossierServices';
import DossierAbout from '@/components/DossierAbout';
import OpenSourceDepot from '@/components/OpenSourceDepot';
import AirmailContact from '@/components/AirmailContact';
import SmoothScroll from '@/components/SmoothScroll';
import { soundFx } from '@/components/AudioEffects';
import { fetchPortfolio, Profile, Project, Experience, Education } from '@/lib/api';

export default function Home() {
  const [data, setData] = useState<{
    profile: Profile | null;
    projects: Project[];
    experience: Experience[];
    education: Education[];
  } | null>(null);

  const [soundActive, setSoundActive] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await fetchPortfolio();
      if (res) {
        setData(res);
      }
    }
    load();
  }, []);

  const profile = data?.profile || null;
  const projects = data?.projects || [];
  const experience = data?.experience || [];
  const education = data?.education || [];

  const scrollToSection = (id: string) => {
    soundFx.playPaperRustle();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <SmoothScroll>
      <main className="min-h-screen relative cutting-mat-bg text-[#f4eedf] selection:bg-[#4a6b4a] selection:text-white">
        {/* Top Retro Header Bar */}
        <header className="sticky top-0 z-50 bg-[#0e1315]/95 backdrop-blur-md border-b border-[#2c3a3f] px-4 py-2.5">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-[#f5eedf] whitespace-nowrap">
                PORTFOLIO \ 2026 :: AKASH VERMA
              </span>
            </div>

            {/* Quick Anchor Navigation Strip (Clean single-line nowrap) */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2 font-mono text-xs whitespace-nowrap shrink-0">
              <button
                onClick={() => scrollToSection('work')}
                className="px-2 lg:px-2.5 py-1 text-slate-300 hover:text-white hover:bg-slate-850 rounded transition-colors whitespace-nowrap"
              >
                [01. WORK]
              </button>
              <button
                onClick={() => scrollToSection('open-source')}
                className="px-2 lg:px-2.5 py-1 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/50 rounded transition-colors whitespace-nowrap"
              >
                [02. OPEN SOURCE]
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="px-2 lg:px-2.5 py-1 text-amber-300 hover:text-amber-200 hover:bg-amber-950/50 rounded transition-colors whitespace-nowrap"
              >
                [03. SERVICES]
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="px-2 lg:px-2.5 py-1 text-[#d8c39e] hover:text-white hover:bg-slate-850 rounded transition-colors whitespace-nowrap"
              >
                [04. DOSSIER]
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-2 lg:px-2.5 py-1 text-red-400 hover:text-red-300 hover:bg-red-950/50 rounded transition-colors whitespace-nowrap"
              >
                [05. BRIEF]
              </button>
            </nav>

            <div className="flex items-center gap-2 shrink-0 font-mono text-xs whitespace-nowrap">
              <button
                onClick={() => {
                  soundFx.playStamp();
                  scrollToSection('contact');
                }}
                className="bg-red-800 hover:bg-red-700 text-white font-bold px-4 py-1.5 rounded-lg border border-red-600 transition-transform active:scale-95 shadow-md tracking-wider"
              >
                HIRE ME ↵
              </button>
            </div>
          </div>
        </header>

        {/* 1. HERO: 3D Isometric Retro CRT Terminal & Mechanical Keyboard */}
        <RetroDeskScene
          name={profile?.name || 'Akash Verma'}
          title={profile?.title || 'Software Engineer | Java & Mobile Systems Developer'}
          onExploreWork={() => scrollToSection('work')}
          onOpenContact={() => scrollToSection('contact')}
        />

        {/* 2. TACTICAL METRICS TICKER */}
        <DossierMetrics />

        {/* 3. SECTION 01: SHIPPED PROJECTS & CASE FILES (GSAP Sequential Pinned Dossier) */}
        <section id="work" className="relative z-20 pt-10 pb-16">
          <div className="max-w-6xl mx-auto px-4 mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <h2 className="font-mono text-sm uppercase tracking-widest font-bold text-emerald-400">
                01 \ SHIPPED PRODUCTION WORK & CASE FILES
              </h2>
            </div>
            <span className="font-mono text-xs text-slate-500">
              [ {projects.length} VERIFIED RELEASES ]
            </span>
          </div>
          <DossierProjects projects={projects} categoryFilter="all" />
        </section>

        {/* 4. SECTION 02: OPEN SOURCE DEPOT (Vertical Themed Cards & Live Simulators) */}
        <section id="open-source" className="relative z-20 pt-8 pb-16 border-t border-[#223035]">
          <div className="max-w-6xl mx-auto px-4 mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              <h2 className="font-mono text-sm uppercase tracking-widest font-bold text-cyan-400">
                02 \ OPEN SOURCE DEPOT & PUB.DEV PACKAGES
              </h2>
            </div>
            <span className="font-mono text-xs text-slate-500">
              [ 7.5K+ MONTHLY DOWNLOADS ]
            </span>
          </div>
          <OpenSourceDepot />
        </section>

        {/* 5. SECTION 03: SERVICES & ARCHITECTURE BLUEPRINT */}
        <section id="services" className="relative z-20 pt-8 pb-16 border-t border-[#223035]">
          <div className="max-w-6xl mx-auto px-4 mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <h2 className="font-mono text-sm uppercase tracking-widest font-bold text-amber-400">
                03 \ ARCHITECTURAL CAPABILITY MATRIX & SERVICES
              </h2>
            </div>
            <span className="font-mono text-xs text-slate-500">
              [ 60FPS ENTERPRISE SPEC ]
            </span>
          </div>
          <DossierServices />
        </section>

        {/* 6. SECTION 04: DOSSIER ARCHIVE / ABOUT ME */}
        <section id="about" className="relative z-20 pt-8 pb-16 border-t border-[#223035]">
          <div className="max-w-6xl mx-auto px-4 mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <h2 className="font-mono text-sm uppercase tracking-widest font-bold text-[#d8c39e]">
                04 \ CLASSIFIED PERSONNEL DOSSIER & RECORD
              </h2>
            </div>
            <span className="font-mono text-xs text-slate-500">
              [ REF: ARCHIVE-2026-AV ]
            </span>
          </div>
          <DossierAbout
            profile={profile}
            experienceList={experience}
            educationList={education}
            onContactClick={() => scrollToSection('contact')}
          />
        </section>

        {/* 7. SECTION 05: AIRMAIL TELEGRAM CONTACT & PROJECT BRIEF */}
        <section id="contact" className="relative z-20 pt-8 pb-20 border-t border-[#223035]">
          <div className="max-w-6xl mx-auto px-4 mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              <h2 className="font-mono text-sm uppercase tracking-widest font-bold text-red-400">
                05 \ DISPATCH INQUIRY & INITIATE PROJECT BRIEF
              </h2>
            </div>
            <span className="font-mono text-xs text-slate-500">
              [ DIRECT TELEGRAM & AIRMAIL MEMO ]
            </span>
          </div>
          <AirmailContact profile={profile} />
        </section>

        {/* Footer Closing */}
        <footer className="w-full border-t border-[#233035] py-8 text-center font-mono text-xs text-slate-500 relative z-20 bg-[#0e1315]">
          <div className="max-w-4xl mx-auto px-4">
            <p className="text-slate-400 font-bold">
              © 2026 Akash Verma // Software Engineer | Java & Mobile Systems Developer
            </p>
          </div>
        </footer>
      </main>
    </SmoothScroll>
  );
}
