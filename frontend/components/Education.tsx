'use client';

import React from 'react';
import { GraduationCap, Award, Calendar } from 'lucide-react';

interface EducationItem {
  id: number;
  institution: string;
  degree: string;
  field_of_study?: string;
  start_year: string;
  end_year?: string;
  grade?: string;
  description?: string;
}

interface EducationProps {
  educationData: EducationItem[];
}

export default function Education({ educationData = [] }: EducationProps) {
  if (!educationData || educationData.length === 0) return null;

  return (
    <section id="education" className="py-20 relative overflow-hidden bg-[#070913]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
            Education & <span className="text-gradient">Credentials</span>
          </h2>
        </div>

        {/* Education Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {educationData.map((edu) => (
            <div
              key={edu.id}
              className="glass-card p-6 sm:p-8 rounded-2xl border border-slate-800 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
                    <Calendar className="w-3 h-3" />
                    <span>{edu.start_year} – {edu.end_year || 'Present'}</span>
                  </div>
                </div>

                <h3 className="text-xl font-heading font-bold text-white group-hover:text-cyan-300 transition-colors mb-1">
                  {edu.degree}
                </h3>
                <div className="text-sm font-medium text-slate-300 mb-1">
                  {edu.field_of_study}
                </div>
                <div className="text-xs font-mono text-indigo-400 mb-4">
                  {edu.institution}
                </div>

                {edu.description && (
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    {edu.description}
                  </p>
                )}
              </div>

              {edu.grade && (
                <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs text-emerald-400 font-medium">
                  <Award className="w-4 h-4" />
                  <span>Grade / Honors: {edu.grade}</span>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
