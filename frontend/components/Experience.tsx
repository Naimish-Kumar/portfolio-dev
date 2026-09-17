'use client';

import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

interface ExperienceItem {
  id: number;
  company: string;
  role: string;
  location?: string;
  employment_type?: string;
  start_date: string;
  end_date?: string;
  is_current?: boolean;
  description?: string;
  skills_used?: string[];
}

interface ExperienceProps {
  experienceData: ExperienceItem[];
}

export default function Experience({ experienceData = [] }: ExperienceProps) {
  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-[#0a0d18] bg-grid-pattern">
      <div className="ambient-glow-purple -bottom-24 -left-24" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-indigo-400 uppercase tracking-widest mb-3">
            <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
            <span>Career Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            My journey across leading technology teams, engineering enterprise solutions.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative border-l border-slate-800 ml-4 sm:ml-32 space-y-12">
          {experienceData.map((item, index) => (
            <div key={item.id} className="relative pl-6 sm:pl-10 group">
              
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#0d1222] border-2 border-indigo-500 group-hover:border-cyan-400 group-hover:scale-125 transition-all shadow-md shadow-indigo-500/50" />

              {/* Date Column (Desktop) */}
              <div className="hidden sm:block absolute -left-36 top-1 text-right w-28">
                <div className="text-xs font-mono font-bold text-cyan-400">
                  {item.start_date} – {item.is_current ? 'Present' : item.end_date}
                </div>
                <div className="text-[10px] text-slate-500 uppercase">{item.employment_type || 'Full-time'}</div>
              </div>

              {/* Card */}
              <div className="glass-card p-6 rounded-2xl border border-slate-800 group-hover:border-slate-700">
                
                {/* Mobile Date indicator */}
                <div className="sm:hidden inline-flex items-center gap-1 text-xs font-mono text-cyan-400 mb-2">
                  <Calendar className="w-3 h-3" />
                  <span>{item.start_date} – {item.is_current ? 'Present' : item.end_date}</span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h3 className="text-xl font-heading font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item.role}
                  </h3>
                  {item.is_current && (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Current Role
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-400 mb-4">
                  <span className="text-indigo-300 font-semibold">{item.company}</span>
                  {item.location && (
                    <span className="flex items-center gap-1 text-slate-500">
                      <MapPin className="w-3 h-3" />
                      {item.location}
                    </span>
                  )}
                </div>

                <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line mb-4">
                  {item.description}
                </p>

                {item.skills_used && item.skills_used.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/80">
                    {item.skills_used.map((skill, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-slate-800/90 text-slate-300 border border-slate-700/60"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
