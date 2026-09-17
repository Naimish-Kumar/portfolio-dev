'use client';

import React, { useState } from 'react';
import {
  Code, Layers, Server, Database, Cpu, Cloud, GitBranch,
  ShieldCheck, Palette, Sparkles, Terminal, Smartphone, Globe
} from 'lucide-react';
import ThreeSkillsGalaxy from './ThreeSkillsGalaxy';

interface Skill {
  id: number;
  name: string;
  category: string;
  proficiency: number;
  icon?: string;
  is_featured?: boolean;
}

interface SkillsProps {
  skillsData: Skill[];
}

const iconMap: Record<string, any> = {
  Layers, Code, Server, Database, Cpu, Cloud, GitBranch,
  ShieldCheck, Palette, Sparkles, Terminal, Smartphone, Globe,
  Code2: Code,
  Network: Globe,
};

export default function Skills({ skillsData = [] }: SkillsProps) {
  const categories = ['All', ...Array.from(new Set(skillsData.map((s) => s.category || 'General')))];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredSkills = activeCategory === 'All'
    ? skillsData
    : skillsData.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-[#0a0d18] bg-grid-pattern">
      <div className="ambient-glow-cyan top-1/2 -left-32" />
      <div className="ambient-glow-purple bottom-10 -right-32" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-indigo-400 uppercase tracking-widest mb-3">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>Tech Stack & Arsenal</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
            Skills & <span className="text-gradient">3D Tech Galaxy</span>
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Interactive Three.js 3D visualization of frontend, backend, cloud, and database architectures.
          </p>
        </div>

        {/* Interactive 3D Three.js Galaxy Component */}
        <ThreeSkillsGalaxy skills={skillsData} />

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 my-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-lg shadow-indigo-600/30'
                  : 'glass-panel text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => {
            const IconComponent = iconMap[skill.icon || 'Code'] || Code;
            return (
              <div
                key={skill.id}
                className="glass-card p-5 rounded-2xl border border-slate-800/80 group hover:border-indigo-500/40"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-800/80 group-hover:bg-indigo-600/20 text-cyan-400 group-hover:text-cyan-300 flex items-center justify-center transition-colors border border-slate-700/60">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-white text-base group-hover:text-cyan-300 transition-colors">
                        {skill.name}
                      </h3>
                      <span className="text-[11px] font-mono text-slate-400">{skill.category}</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-indigo-400">
                    {skill.proficiency}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-800/90 rounded-full h-2 overflow-hidden border border-slate-700/50 mt-2">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 via-primary-500 to-cyan-400 rounded-full transition-all duration-1000"
                    style={{ width: `${skill.proficiency}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
