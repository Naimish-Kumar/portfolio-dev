'use client';

import React from 'react';
import Image from 'next/image';
import { Project } from '@/lib/api';
import { soundFx } from './AudioEffects';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  const techList =
    project.technologies?.split(',').map((t) => t.trim()) || [
      'Next.js 14',
      'Three.js',
      'Node.js',
      'MySQL',
    ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto paper-texture rounded-2xl shadow-2xl border-2 border-[#ab955d] p-6 sm:p-10 text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Metal paperclip close icon */}
        <button
          onClick={() => {
            soundFx.playKeyClick();
            onClose();
          }}
          className="absolute top-4 right-4 font-mono text-xs font-bold px-3 py-1.5 rounded bg-red-700 text-white hover:bg-red-800 transition-colors shadow"
          aria-label="Close dossier"
        >
          [ CLOSE X ]
        </button>

        {/* Dossier Header Info */}
        <div className="flex items-center gap-2 mb-2">
          <span className="ink-stamp text-red-700 text-[10px]">VERIFIED CASE FILE</span>
          <span className="font-mono text-xs text-slate-500 uppercase tracking-widest">
            2026 DOSSIER ARCHIVE
          </span>
        </div>

        <h2 className="font-serif italic text-3xl sm:text-4xl font-bold text-slate-950 mb-4">
          {project.title}
        </h2>

        {/* Project Image Showcase */}
        {project.image_url && (
          <div className="relative w-full h-64 sm:h-96 rounded-xl overflow-hidden mb-6 bg-slate-900 border border-slate-300 shadow-md">
            <Image
              src={project.image_url}
              alt={project.title}
              fill
              className="object-cover object-center"
              unoptimized
            />
          </div>
        )}

        {/* Metadata Stack & Links */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-y border-slate-300 py-3 mb-6 font-mono text-xs">
          <div className="flex flex-wrap gap-1.5">
            {techList.map((t, idx) => (
              <span
                key={idx}
                className="bg-slate-200 text-slate-800 px-2.5 py-1 rounded border border-slate-300 font-semibold"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playKeyClick()}
                className="bg-[#3d5a45] hover:bg-[#4d664b] text-white px-4 py-2 rounded font-bold shadow transition-colors"
              >
                {project.live_url.includes('apple.com') ? 'App Store ↗' : project.live_url.includes('play.google.com') ? 'Google Play ↗' : 'Live Platform ↗'}
              </a>
            )}
            {project.demo_url && project.demo_url !== project.live_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playKeyClick()}
                className="bg-[#1e3a8a] hover:bg-[#1d4ed8] text-white px-4 py-2 rounded font-bold shadow transition-colors"
              >
                {project.demo_url.includes('play.google.com') ? 'Google Play Store ↗' : project.demo_url.includes('apple.com') ? 'Apple App Store ↗' : 'Demo Link ↗'}
              </a>
            )}
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playKeyClick()}
                className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded font-bold shadow transition-colors"
              >
                {project.github_url.includes('apple.com') ? 'Apple App Store ↗' : 'Source Repository ↗'}
              </a>
            )}
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="space-y-4 font-sans text-slate-800 leading-relaxed text-sm sm:text-base">
          <p className="font-semibold text-slate-900">{project.description}</p>
          {project.long_description && (
            <div className="graph-paper-texture p-4 sm:p-6 rounded-lg border border-slate-300 whitespace-pre-line text-sm text-slate-700">
              {project.long_description}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
