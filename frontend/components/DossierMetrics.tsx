'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function DossierMetrics() {
  const containerRef = useRef<HTMLDivElement>(null);

  const metrics = [
    { label: 'YEARS DEV EXPERIENCE', value: '5+', code: 'EXP.01', stamp: 'VERIFIED' },
    { label: 'PRODUCTION PLATFORMS', value: '25+', code: 'PRJ.02', stamp: 'SHIPPED' },
    { label: 'CLOUD & API UPTIME', value: '99.9%', code: 'UPT.03', stamp: 'SLA OK' },
    { label: 'LINES OF TESTED CODE', value: '100K+', code: 'LOC.04', stamp: 'LOGGED' },
    { label: 'HAPPY CLIENTS & TEAMS', value: '15+', code: 'CLI.05', stamp: 'ACTIVE' },
  ];

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const items = el.querySelectorAll('.metric-cell');
    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full max-w-6xl mx-auto px-4 py-4">
      <div className="paper-texture rounded-xl border border-[#d5c39e] shadow-md p-4 md:p-6 text-slate-800">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-300">
          {metrics.map((m, idx) => (
            <div key={idx} className="metric-cell pt-3 md:pt-0 md:px-4 text-center first:pt-0">
              <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest block">
                [{m.code}]
              </span>
              <div className="font-serif italic font-extrabold text-2xl md:text-3xl text-slate-950 my-1">
                {m.value}
              </div>
              <p className="font-mono text-[10px] font-semibold text-slate-600 uppercase tracking-wider">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
