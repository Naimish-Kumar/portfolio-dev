'use client';

import React from 'react';
import { Clock, Smartphone, HeartPulse, Box, ShieldCheck, Zap } from 'lucide-react';

export default function MetricsTicker() {
  const metrics = [
    {
      value: '3+ Years',
      label: 'Mobile Engineering Experience',
      icon: Clock,
      color: 'text-indigo-400',
    },
    {
      value: '6+ Apps',
      label: 'Published on App Stores',
      icon: Smartphone,
      color: 'text-cyan-400',
    },
    {
      value: '99.9%',
      label: 'Crash-Free Production Rate',
      icon: HeartPulse,
      color: 'text-emerald-400',
    },
    {
      value: '4+ Packages',
      label: 'Published Pub.dev Packages',
      icon: Box,
      color: 'text-purple-400',
    },
  ];

  return (
    <section className="py-8 bg-[#090d1a] border-y border-slate-800/80 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div key={idx} className="flex items-center gap-3.5 p-3 rounded-xl glass-card border border-slate-800/70">
                <div className={`p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 ${m.color} shrink-0 shadow-md`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-heading font-extrabold text-white tracking-tight">
                    {m.value}
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium leading-tight mt-0.5">
                    {m.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
