'use client';

import React from 'react';
import { soundFx } from './AudioEffects';

export type FolderTabId = '3d-web' | 'mobile-apps' | 'open-source' | 'services' | 'about-dossier';

interface FolderNavigationProps {
  activeTab: FolderTabId;
  onSelectTab: (tab: FolderTabId) => void;
  projectCount?: number;
}

export default function FolderNavigation({
  activeTab,
  onSelectTab,
}: FolderNavigationProps) {
  const tabs = [
    {
      id: '3d-web' as FolderTabId,
      label: '3d web & interactive',
      colorClass: 'bg-[#4d664b] text-[#e6ede6] border-[#3c523b]',
      activeClass: 'bg-[#5a7a58] text-white shadow-lg border-b-0 -translate-y-2',
      badge: 'THREE.JS',
      clipType: 'binder',
    },
    {
      id: 'mobile-apps' as FolderTabId,
      label: 'shipped applications',
      colorClass: 'bg-[#3d5a73] text-[#e1eaf2] border-[#2c4357]',
      activeClass: 'bg-[#4a6b8a] text-white shadow-lg border-b-0 -translate-y-2',
      badge: 'FLUTTER & APPS',
      clipType: 'paperclip',
    },

    {
      id: 'services' as FolderTabId,
      label: 'services & matrix',
      colorClass: 'bg-[#7a3928] text-[#fae7e2] border-[#5e2819]',
      activeClass: 'bg-[#944430] text-white shadow-lg border-b-0 -translate-y-2',
      badge: 'BLUEPRINT',
      clipType: 'tape',
    },
    {
      id: 'about-dossier' as FolderTabId,
      label: 'about me & dossier',
      colorClass: 'bg-[#ab955d] text-[#2b2413] border-[#8a7543]',
      activeClass: 'bg-[#c2af79] text-slate-950 font-bold shadow-lg border-b-0 -translate-y-2',
      badge: '2026 FILE',
      clipType: 'receipt',
    },
  ];

  const handleTabClick = (tabId: FolderTabId) => {
    soundFx.playFolderSwitch();
    onSelectTab(tabId);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 pt-6">
      {/* Folder Tabs Header Bar */}
      <div className="flex items-end justify-start sm:justify-center gap-1.5 md:gap-2.5 overflow-x-auto pb-0 scrollbar-none">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`folder-tab group relative px-3.5 md:px-5 py-3 md:py-3.5 border font-mono text-xs md:text-sm tracking-wide rounded-t-xl transition-all duration-200 shrink-0 select-none ${
                isActive ? `${tab.activeClass} z-20` : `${tab.colorClass} opacity-85 hover:opacity-100 z-10`
              }`}
            >
              {/* Binder Clip Decor on Active Tab */}
              {isActive && tab.clipType === 'binder' && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-6 h-5 bg-slate-800 border border-slate-600 rounded-sm shadow-md flex items-center justify-center pointer-events-none">
                  <div className="w-3 h-2 border-t-2 border-l-2 border-r-2 border-slate-300 rounded-t-sm" />
                </div>
              )}

              {/* Paper Clip Decor on Active Tab */}
              {isActive && tab.clipType === 'paperclip' && (
                <div className="absolute -top-4 right-3 w-3.5 h-7 border-2 border-slate-300 rounded-full rotate-12 shadow-sm pointer-events-none" />
              )}

              {/* Washi Tape Decor on Active Tab */}
              {isActive && tab.clipType === 'tape' && (
                <div className="absolute -top-2 left-2 w-10 h-3.5 scotch-tape rotate-[-8deg] pointer-events-none" />
              )}

              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[9px] uppercase opacity-75 font-semibold">
                  [{tab.badge}]
                </span>
                <span className="capitalize font-mono font-medium tracking-wide text-xs">
                  {tab.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
