'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Terminal, ExternalLink, ShieldCheck, Download, Sparkles } from 'lucide-react';

interface NavbarProps {
  profileName?: string;
  isAvailable?: boolean;
}

export default function Navbar({ profileName = 'NAIMISH.DEV', isAvailable = true }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Overview', href: '#metrics' },
    { label: 'Services', href: '#services' },
    { label: 'Applications', href: '#work' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#070913]/85 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/30 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-primary-500 to-cyan-400 p-[2px] shadow-lg shadow-indigo-500/20 group-hover:shadow-cyan-500/30 transition-all">
            <div className="w-full h-full bg-[#0b0f19] rounded-[10px] flex items-center justify-center">
              <Terminal className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-lg text-white tracking-tight flex items-center gap-1.5 font-mono">
              NAIMISH.<span className="text-cyan-400">DEV</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-slate-800 text-slate-400 border border-slate-700">
                v3.5.0
              </span>
            </span>
            <span className="text-[10px] font-mono text-cyan-400 font-semibold tracking-wider uppercase">
              Flutter Team Lead & Mobile Architect
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 glass-panel px-4 py-1.5 rounded-full">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-cyan-300 hover:bg-white/5 rounded-full transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Action */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://acrocoder.com/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-mono text-slate-300 hover:text-white px-3 py-1.5 rounded-lg glass-panel border border-slate-700 hover:border-cyan-500/50 transition-all"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>CV</span>
          </a>

          <Link
            href="/admin"
            className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-indigo-300 px-3 py-1.5 rounded-lg hover:bg-slate-800/60 border border-slate-800 transition-all"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            Admin
          </Link>

          <a
            href="#contact"
            className="relative group overflow-hidden px-4 py-2 rounded-full font-medium text-xs uppercase tracking-wider text-white shadow-md shadow-indigo-600/30"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 group-hover:opacity-90 transition-opacity" />
            <span className="relative flex items-center gap-1.5">
              Let&apos;s Connect
              <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <a
            href="https://acrocoder.com/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-cyan-400 p-2 bg-slate-800/60 rounded-lg border border-slate-700/60"
            title="Download CV"
          >
            <Download className="w-4 h-4" />
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-xl text-slate-300 hover:text-white bg-slate-800/60 border border-slate-700/60"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden px-4 pt-3 pb-6 bg-[#0c101d]/95 backdrop-blur-xl border-b border-slate-800 shadow-2xl animate-in slide-in-from-top-2">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-2.5 text-base font-medium text-slate-200 hover:text-cyan-300 hover:bg-slate-800/60 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2">
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-medium text-sm"
              >
                Let&apos;s Connect
              </a>
              <a
                href="https://acrocoder.com/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center py-2 rounded-lg bg-slate-800 text-cyan-300 font-mono text-xs border border-cyan-500/20 flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                Download CV (PDF)
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
