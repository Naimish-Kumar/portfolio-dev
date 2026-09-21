'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, Download, Github, Linkedin, Twitter, Sparkles, Terminal, Code2, Layers, Cpu } from 'lucide-react';
import ThreeHeroScene from './ThreeHeroScene';

interface HeroProps {
  heroData: any;
  profileData: any;
}

export default function Hero({ heroData, profileData }: HeroProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [viewMode, setViewMode] = useState<'3d' | 'code'>('3d');

  const typingStrings = heroData?.typing_strings && heroData.typing_strings.length > 0
    ? heroData.typing_strings
    : [
        'Java 17/21 & Spring Boot Microservices',
        'Flutter & Cross-Platform Mobile',
        'IoT Hardware & Telemetry Ingestion',
        'Scalable Real-Time Architectures',
      ];

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentFullText = typingStrings[currentTextIndex % typingStrings.length];

    if (!isDeleting) {
      if (displayedText.length < currentFullText.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentFullText.slice(0, displayedText.length + 1));
        }, 80);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 1800);
      }
    } else {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(currentFullText.slice(0, displayedText.length - 1));
        }, 40);
      } else {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => prev + 1);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentTextIndex, typingStrings]);

  const greeting = heroData?.greeting || 'Hello World, I am';
  const name = profileData?.full_name || 'Akash Verma';
  const subheadline = heroData?.subheadline || profileData?.bio || 'Software Engineer bridging hardware and software systems with scalable Java enterprise microservices, cross-platform mobile apps, and real-time IoT architectures.';
  const badgeText = heroData?.badge_text || 'Senior Software Engineer @ SpireHub Softwares';

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Availability Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-indigo-500/30 text-indigo-300 text-xs font-medium mb-5 shadow-lg shadow-indigo-950/40 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>{badgeText}</span>
            </div>

            {/* Greeting & Name */}
            <p className="font-mono text-cyan-400 text-sm font-semibold tracking-wider mb-2 flex items-center gap-2">
              <span className="text-slate-500">&lt;intro&gt;</span>
              {greeting}
              <span className="text-slate-500">&lt;/intro&gt;</span>
            </p>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-extrabold tracking-tight text-white mb-4">
              {name}
            </h1>

            {/* Dynamic Typing Subhead */}
            <div className="h-10 sm:h-12 flex items-center mb-6">
              <span className="text-xl sm:text-2xl lg:text-3xl font-heading font-semibold text-slate-300">
                I build{' '}
                <span className="text-gradient font-bold underline decoration-cyan-400/40 underline-offset-8">
                  {displayedText}
                </span>
                <span className="inline-block w-[3px] h-7 bg-cyan-400 ml-1 animate-pulse" />
              </span>
            </div>

            {/* Subtitle / Bio */}
            <p className="text-base sm:text-lg text-slate-400 max-w-2xl mb-8 leading-relaxed">
              {subheadline}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-8 w-full sm:w-auto">
              <a
                href={heroData?.primary_button_link || '#projects'}
                className="group relative px-7 py-3.5 rounded-xl font-medium text-sm text-white overflow-hidden shadow-xl shadow-indigo-600/30 transition-all hover:scale-[1.02]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-primary-600 to-cyan-500 group-hover:opacity-90 transition-opacity" />
                <span className="relative flex items-center gap-2">
                  {heroData?.primary_button_text || 'Explore 3D Projects'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>

              <a
                href={heroData?.secondary_button_link || '#contact'}
                className="px-6 py-3.5 rounded-xl font-medium text-sm text-slate-200 glass-card hover:border-slate-600 transition-all hover:scale-[1.02] flex items-center gap-2"
              >
                {heroData?.secondary_button_text || 'Contact Me'}
              </a>

              {profileData?.resume_url && (
                <a
                  href={profileData.resume_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 rounded-xl font-medium text-sm text-slate-300 hover:text-white glass-panel hover:bg-slate-800/80 transition-all flex items-center gap-2 border border-slate-700/60"
                >
                  <Download className="w-4 h-4 text-cyan-400" />
                  <span>Resume</span>
                </a>
              )}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 text-slate-400">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-500 mr-2">Connect:</span>
              {profileData?.github_url && (
                <a
                  href={profileData.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="p-2.5 rounded-lg glass-panel hover:text-white hover:border-cyan-500/50 transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {profileData?.linkedin_url && (
                <a
                  href={profileData.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="p-2.5 rounded-lg glass-panel hover:text-white hover:border-indigo-500/50 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {profileData?.twitter_url && (
                <a
                  href={profileData.twitter_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="p-2.5 rounded-lg glass-panel hover:text-white hover:border-sky-500/50 transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Right Hero: Interactive Three.js 3D Cyber Scene + Code Toggle */}
          <div className="lg:col-span-5 relative flex flex-col items-center">
            {/* View Mode Toggle Buttons */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/90 border border-slate-800 mb-3 z-20 backdrop-blur-md">
              <button
                onClick={() => setViewMode('3d')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  viewMode === '3d'
                    ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>Three.js 3D View</span>
              </button>
              <button
                onClick={() => setViewMode('code')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  viewMode === 'code'
                    ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Code Terminal</span>
              </button>
            </div>

            <div className="w-full max-w-md relative min-h-[380px] flex items-center justify-center">
              {viewMode === '3d' ? (
                <div className="w-full relative glass-panel p-2 rounded-3xl border border-indigo-500/30 shadow-2xl">
                  <ThreeHeroScene />
                </div>
              ) : (
                <div className="w-full relative rounded-2xl bg-[#0d1120] border border-slate-700/80 shadow-2xl overflow-hidden animate-in fade-in">
                  <div className="bg-[#151b2e] px-4 py-3 flex items-center justify-between border-b border-slate-700/60">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                      <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                      <span>akash@systems ~ dev</span>
                    </div>
                    <div className="w-4" />
                  </div>
                  <div className="p-5 font-mono text-xs text-slate-300 space-y-3 leading-relaxed">
                    <div>
                      <span className="text-purple-400">const</span>{' '}
                      <span className="text-cyan-300">developer</span> = &#123;
                    </div>
                    <div className="pl-4 space-y-1">
                      <div>
                        <span className="text-slate-400">name:</span>{' '}
                        <span className="text-amber-300">&apos;{name}&apos;</span>,
                      </div>
                      <div>
                        <span className="text-slate-400">stack:</span> [
                        <span className="text-emerald-300">&apos;Java 21 / Spring Boot&apos;</span>,{' '}
                        <span className="text-emerald-300">&apos;Flutter & Android&apos;</span>,{' '}
                        <span className="text-emerald-300">&apos;Kafka / MQTT / Redis&apos;</span>],
                      </div>
                      <div>
                        <span className="text-slate-400">experience:</span>{' '}
                        <span className="text-cyan-300">{profileData?.years_experience || 7}</span>{' '}
                        <span className="text-slate-400">+ years</span>,
                      </div>
                      <div>
                        <span className="text-slate-400">systems:</span>{' '}
                        <span className="text-indigo-300">&apos;Distributed Microservices & Hardware-to-Cloud&apos;</span>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-slate-800 text-cyan-300 font-semibold">
                      [OK] Microservices & Real-Time Telemetry Pipeline: 100% HEALTHY
                    </div>
                  </div>
                </div>
              )}

              {/* Floating Stat Badges */}
              <div className="absolute -bottom-5 -left-4 bg-[#0f1424]/95 border border-indigo-500/40 p-3 rounded-2xl shadow-xl backdrop-blur-xl flex items-center gap-3 z-20">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-base font-bold font-heading text-white">
                    {profileData?.projects_completed || 30}+
                  </div>
                  <div className="text-[10px] text-slate-400">Projects Shipped</div>
                </div>
              </div>

              <div className="absolute -top-5 -right-4 bg-[#0f1424]/95 border border-cyan-500/40 p-3 rounded-2xl shadow-xl backdrop-blur-xl flex items-center gap-3 z-20">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-base font-bold font-heading text-white">
                    {profileData?.years_experience || 7}+ Years
                  </div>
                  <div className="text-[10px] text-slate-400">Engineering Exp</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
