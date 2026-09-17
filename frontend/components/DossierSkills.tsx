'use client';

import React, { useState } from 'react';
import ThreeSkillsGalaxy from './ThreeSkillsGalaxy';
import { soundFx } from './AudioEffects';

interface SkillItem {
  id?: number;
  name: string;
  category: string;
  proficiency: number;
}

interface DossierSkillsProps {
  skillsList?: SkillItem[];
}

export default function DossierSkills({ skillsList = [] }: DossierSkillsProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const defaultSkills: SkillItem[] = [
    { name: 'Next.js 14 / React 19', category: 'Frontend', proficiency: 98 },
    { name: 'Three.js / WebGL / GLSL', category: '3D & WebGL', proficiency: 92 },
    { name: 'TypeScript & JavaScript', category: 'Frontend', proficiency: 95 },
    { name: 'Node.js & Express API', category: 'Backend', proficiency: 94 },
    { name: 'MySQL & Relational DBs', category: 'Backend', proficiency: 90 },
    { name: 'Tailwind CSS & Animations', category: 'Frontend', proficiency: 96 },
    { name: 'REST & GraphQL APIs', category: 'Backend', proficiency: 92 },
    { name: 'Blender 3D Modeling', category: '3D & WebGL', proficiency: 85 },
    { name: 'Docker & CI/CD Pipelines', category: 'Cloud & DevOps', proficiency: 88 },
    { name: 'Hostinger & Linux VPS', category: 'Cloud & DevOps', proficiency: 92 },
    { name: 'Git & GitHub Workflows', category: 'Cloud & DevOps', proficiency: 95 },
    { name: 'GSAP & Motion Physics', category: '3D & WebGL', proficiency: 94 },
  ];

  const effectiveSkills = skillsList && skillsList.length > 0 ? skillsList : defaultSkills;

  const categories = ['All', 'Frontend', 'Backend', '3D & WebGL', 'Cloud & DevOps'];

  const filteredSkills =
    activeCategory === 'All'
      ? effectiveSkills
      : effectiveSkills.filter((s) => s.category.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="paper-texture rounded-2xl border border-[#d5c39e] shadow-xl p-6 md:p-10 text-slate-800">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-slate-300 pb-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="ink-stamp text-blue-800 text-[10px]">TECHNICAL CONSTELLATION</span>
              <span className="font-mono text-xs text-slate-500 uppercase tracking-widest">
                SKILL MATRIX \ 2026
              </span>
            </div>
            <h2 className="font-serif italic text-3xl md:text-4xl font-bold text-slate-950">
              3D Skills Constellation & Mastery
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-1 font-mono text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundFx.playKeyClick(480);
                  setActiveCategory(cat);
                }}
                className={`px-3 py-1 rounded border transition-colors ${
                  activeCategory === cat
                    ? 'bg-slate-900 text-amber-300 border-slate-950 font-bold shadow'
                    : 'bg-slate-200/80 hover:bg-slate-300 text-slate-700 border-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Skills Orbit Canvas */}
        <div className="rounded-xl overflow-hidden bg-[#0d1214] border border-slate-700 shadow-inner mb-8">
          <ThreeSkillsGalaxy
            skills={effectiveSkills.map((s, idx) => ({
              id: s.id || idx,
              name: s.name,
              category: s.category,
              proficiency: s.proficiency || 90,
            }))}
          />
        </div>

        {/* Skills Proficiency Breakdown Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((skill, idx) => (
            <div
              key={idx}
              className="lined-paper-texture p-4 rounded-lg border border-slate-300 shadow-sm flex flex-col justify-between"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-mono font-bold text-xs text-slate-900">
                  {skill.name}
                </span>
                <span className="font-mono text-[10px] font-bold text-blue-900 bg-blue-100 px-1.5 py-0.5 rounded">
                  {skill.proficiency}%
                </span>
              </div>

              {/* Progress bar styled as stamped meter */}
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden border border-slate-300 mt-2">
                <div
                  className="bg-emerald-700 h-full rounded-full transition-all duration-500"
                  style={{ width: `${skill.proficiency}%` }}
                />
              </div>

              <span className="font-mono text-[9px] text-slate-500 uppercase mt-2 block">
                CAT: {skill.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
