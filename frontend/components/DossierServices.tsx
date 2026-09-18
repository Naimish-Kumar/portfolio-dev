'use client';

import React, { useEffect, useRef } from 'react';
import {
  Code2, Box, Database, Smartphone, Gauge, ShieldCheck, Sparkles
} from 'lucide-react';
import { soundFx } from './AudioEffects';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function DossierServices() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const cards = el.querySelectorAll('.service-card');
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      title: 'Enterprise Java Spring Boot & Microservices',
      description: 'Production Java 21 / Spring Boot 3 microservices with Spring Security, PostgreSQL/MySQL, Kafka event streams, Redis caching, and reactive REST/GraphQL APIs.',
      icon: Database,
      badge: 'SPRING BOOT & JAVA',
      spec: 'SPEC \\ ENTERPRISE BACKEND',
    },
    {
      title: 'AI Agents & Model Context Protocol (MCP)',
      description: 'Architecting custom Model Context Protocol (MCP) servers, autonomous multi-agent systems, Gemini/Claude tool-calling bridges, and vector RAG pipelines.',
      icon: Sparkles,
      badge: 'AI & MCP AGENTS',
      spec: 'SPEC \\ AI INTEGRATION',
    },
    {
      title: 'Cross-Platform Mobile Engineering',
      description: 'Native-feel iOS and Android applications with Flutter, Clean Architecture, BLoC state, sub-16ms 60fps rendering, WebRTC/Socket.IO, and store publishing.',
      icon: Smartphone,
      badge: 'IOS & ANDROID (FLUTTER)',
      spec: 'SPEC \\ MOBILE ARCHITECTURE',
    },
    {
      title: 'Full-Stack Next.js 14 & Cloud Web',
      description: 'End-to-end full-stack web applications built on Next.js 14, React 19, TypeScript, and Node.js with sub-100ms response times and responsive UX.',
      icon: Code2,
      badge: 'NEXT.JS & TYPESCRIPT',
      spec: 'SPEC \\ FULLSTACK WEB',
    },
    {
      title: '3D WebGL & Creative Engineering',
      description: 'Immersive interactive 3D WebGL scenes, custom GLSL shaders, camera physics, and 60fps animations engineered with Three.js and Blender models.',
      icon: Box,
      badge: 'THREE.JS & SHADERS',
      spec: 'SPEC \\ 3D WEBGL',
    },
    {
      title: 'API Security, CI/CD & Cloud DevOps',
      description: 'Zero-trust OAuth2/JWT security layers, Docker/Kubernetes containerization, automated GitHub Actions CI/CD, and Hostinger/Linux cloud deployments.',
      icon: ShieldCheck,
      badge: 'SECURITY & DEVOPS',
      spec: 'SPEC \\ CLOUD DEVOPS',
    },
  ];

  return (
    <div ref={containerRef} className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Blueprint Header */}
      <div className="paper-texture rounded-2xl border border-[#d5c39e] shadow-xl p-6 md:p-10 text-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-slate-300 pb-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="ink-stamp text-emerald-800 text-[10px]">CAPABILITY DOSSIER</span>
              <span className="font-mono text-xs text-slate-500 uppercase tracking-widest">
                DOC #SERV-2026
              </span>
            </div>
            <h2 className="font-serif italic text-3xl md:text-4xl font-bold text-slate-950">
              Strategic Technical Services
            </h2>
          </div>

          <div className="font-mono text-xs text-slate-600 bg-slate-200/80 px-3 py-1.5 rounded border border-slate-300 font-bold tracking-wider">
            [ VERIFIED CAPABILITY MATRIX ]
          </div>
        </div>

        {/* Blueprint Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div
                key={idx}
                onMouseEnter={() => soundFx.playKeyClick(420)}
                className="service-card graph-paper-texture p-5 rounded-xl border border-slate-300 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-900 text-amber-300 flex items-center justify-center shadow-md">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[10px] font-bold bg-[#ab955d] text-slate-950 px-2 py-0.5 rounded uppercase">
                    {srv.badge}
                  </span>
                </div>

                <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest block mb-1">
                  {srv.spec}
                </span>

                <h3 className="font-serif italic text-xl font-bold text-slate-950 mb-2 group-hover:text-red-800 transition-colors">
                  {srv.title}
                </h3>

                <p className="font-sans text-xs text-slate-700 leading-relaxed">
                  {srv.description}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-300 flex items-center justify-between font-mono text-[10px] text-emerald-800 font-bold">
                  <span>STATUS: AVAILABLE</span>
                  <span>[ VERIFIED ↵ ]</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
