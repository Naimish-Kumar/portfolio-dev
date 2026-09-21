'use client';

import React from 'react';
import { ArrowUp, Code, Heart, Github, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

interface FooterProps {
  profileData: any;
  settings: any;
}

export default function Footer({ profileData, settings }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerText = settings?.footer_text || `© ${new Date().getFullYear()} ${profileData?.full_name || 'Akash Verma'}. Built with Next.js, Java Spring Boot & Modern Cloud Architecture.`;

  return (
    <footer className="bg-[#05070f] border-t border-slate-800/80 relative z-10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/60">
          
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 p-[2px]">
              <div className="w-full h-full bg-[#090b14] rounded-[10px] flex items-center justify-center">
                <Code className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="font-heading font-bold text-white text-base">
                {profileData?.full_name || 'Akash Verma'}
              </div>
              <div className="text-[11px] font-mono text-cyan-400">
                {profileData?.headline || 'Software Engineer | Java & Mobile Systems'}
              </div>
            </div>
          </div>

          {/* Socials & Admin */}
          <div className="flex items-center gap-4 text-slate-400">
            {profileData?.github_url && (
              <a
                href={profileData.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-400 transition-colors p-2 rounded-lg hover:bg-slate-800"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {profileData?.linkedin_url && (
              <a
                href={profileData.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-400 transition-colors p-2 rounded-lg hover:bg-slate-800"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {profileData?.twitter_url && (
              <a
                href={profileData.twitter_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky-400 transition-colors p-2 rounded-lg hover:bg-slate-800"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            )}
            <Link
              href="/admin"
              className="text-xs font-mono text-slate-500 hover:text-indigo-400 px-3 py-1 rounded-md border border-slate-800 hover:border-indigo-500/40 transition-colors"
            >
              Admin
            </Link>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl glass-panel hover:bg-indigo-600/20 text-slate-400 hover:text-white border border-slate-800 hover:border-indigo-500/50 transition-all flex items-center gap-2 text-xs font-mono"
            aria-label="Back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>{footerText}</p>
          <p className="flex items-center gap-1">
            Engineered with <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" /> & precision
          </p>
        </div>

      </div>
    </footer>
  );
}
