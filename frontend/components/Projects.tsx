'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ExternalLink, Github, FolderGit2, ArrowUpRight, Sparkles, Box } from 'lucide-react';
import ProjectModal from './ProjectModal';
import ThreeProjectCard from './ThreeProjectCard';

interface Project {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  long_description?: string;
  category: string;
  image_url?: string;
  live_url?: string;
  github_url?: string;
  tags?: string[];
  is_featured?: boolean;
}

interface ProjectsProps {
  projectsData: Project[];
}

export default function Projects({ projectsData = [] }: ProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = ['All', ...Array.from(new Set(projectsData.map((p) => p.category || 'General')))];

  const filteredProjects = selectedCategory === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-[#070913]">
      <div className="ambient-glow-purple top-1/4 -right-32" />
      <div className="ambient-glow-cyan bottom-10 -left-32" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
            <Box className="w-3.5 h-3.5" />
            <span>Interactive 3D Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
            Featured <span className="text-gradient">3D Project Gallery</span>
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Hover over cards for 3D perspective tilt and interactive specular reflection.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-lg shadow-indigo-600/30'
                  : 'glass-panel text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3D Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <ThreeProjectCard key={project.id} className="flex flex-col">
              {/* Image Preview */}
              <div
                className="relative h-56 sm:h-64 w-full bg-slate-900 overflow-hidden cursor-pointer"
                onClick={() => setActiveModalProject(project)}
              >
                {project.image_url ? (
                  <Image
                    src={project.image_url}
                    alt={project.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-600">
                    <FolderGit2 className="w-12 h-12" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e1b] via-transparent to-transparent opacity-80" />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-900/90 text-cyan-300 border border-slate-700/80 backdrop-blur-md">
                    {project.category}
                  </span>
                  {project.is_featured && (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-indigo-600/90 text-white flex items-center gap-1 shadow-md backdrop-blur-md">
                      <Sparkles className="w-3 h-3 text-amber-300" />
                      Featured
                    </span>
                  )}
                </div>

                {/* Quick view hover icon */}
                <div className="absolute bottom-3 right-3 p-2 rounded-xl bg-slate-900/90 text-white border border-slate-700 opacity-90 transition-opacity flex items-center gap-1 text-xs">
                  <span>View 3D Modal</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3
                    onClick={() => setActiveModalProject(project)}
                    className="text-xl sm:text-2xl font-heading font-bold text-white mb-2 hover:text-cyan-300 transition-colors cursor-pointer"
                  >
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-5 line-clamp-2">
                    {project.short_description}
                  </p>
                </div>

                <div>
                  {/* Tech stack tags */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tags.slice(0, 5).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-slate-800/80 text-slate-300 border border-slate-700/60"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 5 && (
                        <span className="px-2 py-1 rounded-md text-[11px] font-mono bg-slate-800/80 text-slate-400">
                          +{project.tags.length - 5}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Actions footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
                    <div className="flex items-center gap-3">
                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Live Demo</span>
                        </a>
                      )}
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>Code</span>
                        </a>
                      )}
                    </div>

                    <button
                      onClick={() => setActiveModalProject(project)}
                      className="text-xs font-mono text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      Details & Stack →
                    </button>
                  </div>
                </div>
              </div>
            </ThreeProjectCard>
          ))}
        </div>

      </div>

      {/* Full project modal */}
      {activeModalProject && (
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      )}
    </section>
  );
}
