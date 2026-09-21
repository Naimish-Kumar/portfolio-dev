'use client';

import React from 'react';
import Image from 'next/image';
import { User, MapPin, Mail, Phone, Briefcase, Award, CheckCircle, Sparkles, Terminal, Code2, Download } from 'lucide-react';

interface AboutProps {
  profileData: any;
}

export default function About({ profileData }: AboutProps) {
  const avatarUrl = profileData?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80';
  const aboutText = profileData?.about_text || 'Software Engineer with 7+ years of overall experience bridging hardware and software systems, including 3 years of dedicated Java enterprise development. Proven expertise in developing production-ready, cross-platform mobile applications integrated with IoT hardware, microservices, and real-time backend services. Skilled in firmware-to-cloud communication, IoT protocols (MQTT, BLE), and system-level performance optimization.';

  const leadershipPoints = [
    {
      title: 'Java & Spring Microservices',
      description: 'High-throughput distributed systems, Kafka streaming, Redis caching, and resilient RESTful APIs.',
      icon: Code2,
      color: 'text-indigo-400',
    },
    {
      title: 'Cross-Platform Mobile & IoT',
      description: 'Production Flutter & Android architectures integrated with BLE hardware and MQTT telemetry.',
      icon: Sparkles,
      color: 'text-cyan-400',
    },
    {
      title: 'Hardware-to-Cloud Integration',
      description: 'End-to-end device telemetry pipelines, sensor data ingestion, and cloud microservices.',
      icon: Briefcase,
      color: 'text-purple-400',
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#070913]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
            <User className="w-3.5 h-3.5" />
            <span>Professional Journey</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
            Systems Architecture & <span className="text-gradient">Engineering Mastery</span>
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Bridging hardware and software systems with scalable microservices and cross-platform mobile apps.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Leadership highlights & Bio */}
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-card p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  <Terminal className="w-3.5 h-3.5 inline mr-1 text-cyan-400" />
                  Systems Engineer
                </span>
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                  Senior Software Engineer
                </span>
              </div>

              <h3 className="text-2xl font-heading font-bold text-white pt-2">
                Akash Verma
              </h3>
              <div className="text-xs font-mono text-cyan-400 font-semibold">
                Software Engineer | Java & Mobile Systems Developer @ SpireHub Softwares Pvt Ltd
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line pt-2">
                {aboutText}
              </p>

              {/* Action buttons */}
              <div className="pt-4 flex flex-wrap gap-3">
                <a
                  href="https://acrocoder.com/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-indigo-600/25"
                >
                  <Download className="w-4 h-4" />
                  <span>Download CV (PDF)</span>
                </a>
                <a
                  href="#contact"
                  className="px-5 py-2.5 rounded-xl glass-panel text-slate-200 hover:text-white text-xs font-semibold border border-slate-700 flex items-center gap-1.5"
                >
                  <span>Initiate Contact</span>
                </a>
              </div>
            </div>

            {/* Direct Contact Meta */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="glass-card p-4 rounded-xl border border-slate-800/80 flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-slate-800 text-cyan-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase text-slate-500">Email</div>
                  <a href="mailto:akash@spirehubs.com" className="text-xs font-bold text-white hover:text-cyan-400 transition-colors">
                    akash@spirehubs.com
                  </a>
                </div>
              </div>

              <div className="glass-card p-4 rounded-xl border border-slate-800/80 flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-slate-800 text-emerald-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase text-slate-500">Location</div>
                  <div className="text-xs font-bold text-white">Noida, India (Available Worldwide)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Leadership Pillars Bento */}
          <div className="lg:col-span-5 space-y-4">
            {leadershipPoints.map((point, idx) => {
              const Icon = point.icon;
              return (
                <div key={idx} className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-slate-700 flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 ${point.color} shrink-0`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-heading font-bold text-white mb-1">
                      {point.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Quick Metrics Badge */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-slate-900/60 to-cyan-950/40 border border-indigo-500/30">
              <div className="text-xs font-mono text-cyan-400 font-bold uppercase mb-2">Enterprise & IoT System Resilience</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Production-proven systems handling high-frequency sensor streams, low-latency mobile rendering, and enterprise cloud microservices.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
