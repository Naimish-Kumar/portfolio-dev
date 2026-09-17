'use client';

import React from 'react';
import {
  Smartphone, Layers, Radio, CreditCard, Gauge, UploadCloud,
  CheckCircle2, Sparkles, Code2
} from 'lucide-react';
import ThreeProjectCard from './ThreeProjectCard';

export default function Services() {
  const services = [
    {
      title: 'Cross-Platform App Development',
      description: 'End-to-end iOS and Android mobile app development using Flutter with native-like 60fps performance, sub-16ms frame times, and pixel-perfect UI.',
      icon: Smartphone,
      color: 'text-cyan-400',
      badge: 'iOS & Android',
    },
    {
      title: 'Clean Architecture & Refactoring',
      description: 'Structuring codebases using BLoC, Provider, and Clean Architecture for maximum testability, maintainability, and enterprise scaling.',
      icon: Layers,
      color: 'text-indigo-400',
      badge: 'Architecture',
    },
    {
      title: 'Real-Time & Media Systems',
      description: 'Building live audio/video streaming, WebRTC, real-time Socket.IO chat, dynamic waveforms, and instant push notifications.',
      icon: Radio,
      color: 'text-purple-400',
      badge: 'Real-Time',
    },
    {
      title: 'Fintech & Payment Integration',
      description: 'Secure integration of Stripe, Razorpay, Apple Pay, Google Pay, and in-app purchase subscriptions with PCI-compliant workflows.',
      icon: CreditCard,
      color: 'text-emerald-400',
      badge: 'Fintech',
    },
    {
      title: 'App Performance & Memory Tuning',
      description: 'Eliminating jank, optimizing widget re-renders, minimizing build size, and resolving complex memory leaks with custom profilers.',
      icon: Gauge,
      color: 'text-amber-400',
      badge: 'Optimization',
    },
    {
      title: 'App Store & Play Store Deployment',
      description: 'Complete lifecycle management including CI/CD automation, Fastlane, TestFlight, store compliance, and Google Play Console releases.',
      icon: UploadCloud,
      color: 'text-sky-400',
      badge: 'CI/CD & DevOps',
    },
  ];

  return (
    <section id="services" className="py-24 relative overflow-hidden bg-[#070913]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Capability Matrix</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
            Strategic <span className="text-gradient">Technical Services</span>
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Providing end-to-end mobile engineering leadership, clean architecture, and performance optimization.
          </p>
        </div>

        {/* 3D Bento Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <ThreeProjectCard key={idx} className="p-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-2xl bg-slate-900/90 border border-slate-700 flex items-center justify-center ${service.color} shadow-lg shadow-black/40`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-slate-800/90 text-slate-300 border border-slate-700">
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-heading font-bold text-white mb-2.5 group-hover:text-cyan-300 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-slate-400 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-800/80 flex items-center gap-2 text-xs font-mono text-cyan-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Production Ready & Verified</span>
                </div>
              </ThreeProjectCard>
            );
          })}
        </div>

      </div>
    </section>
  );
}
