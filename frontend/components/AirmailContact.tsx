'use client';

import React, { useState, useEffect, useRef } from 'react';
import { submitContact, Profile } from '@/lib/api';
import { soundFx } from './AudioEffects';
import { Mail, MessageSquare, Linkedin, Github, Send, CheckCircle2, ShieldCheck, Sparkles, FileText, CheckSquare, Square } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AirmailContactProps {
  profile?: Profile | null;
}

export default function AirmailContact({ profile }: AirmailContactProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [selectedScopes, setSelectedScopes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const formColRef = useRef<HTMLDivElement>(null);
  const infoColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        envelopeRef.current,
        { opacity: 0, y: 50, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
        }
      );

      gsap.fromTo(
        formColRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        infoColRef.current,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  const scopeOptions = [
    '3D WebGL / Three.js',
    'Full-Stack Web App',
    'Mobile iOS / Android',
    'Cloud / MySQL Architecture',
    'Performance Optimization',
  ];

  const toggleScope = (scope: string) => {
    soundFx.playKeyClick(520);
    if (selectedScopes.includes(scope)) {
      setSelectedScopes(selectedScopes.filter((s) => s !== scope));
    } else {
      setSelectedScopes([...selectedScopes, scope]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', text: 'Please fill in all brief fields.' });
      return;
    }

    setLoading(true);
    setStatus(null);
    soundFx.playStamp();

    const compiledMessage = selectedScopes.length > 0
      ? `[Project Scopes: ${selectedScopes.join(', ')}]\n\n${formData.message}`
      : formData.message;

    try {
      await submitContact({ ...formData, message: compiledMessage });
      setStatus({
        type: 'success',
        text: 'PROJECT BRIEF DISPATCHED: Your brief has been securely logged in Naimish’s priority queue.',
      });
      setFormData({ name: '', email: '', message: '' });
      setSelectedScopes([]);
    } catch {
      setStatus({
        type: 'error',
        text: 'Failed to dispatch brief. Please contact directly at acrocoader@gmail.com',
      });
    } finally {
      setLoading(false);
    }
  };

  const techBadges = [
    { label: 'Flutter & Dart', color: 'border-cyan-800 text-cyan-900 bg-cyan-50' },
    { label: 'Next.js 14', color: 'border-slate-800 text-slate-800 bg-slate-100' },
    { label: 'Three.js WebGL', color: 'border-emerald-800 text-emerald-900 bg-emerald-50' },
    { label: 'React 19', color: 'border-blue-800 text-blue-900 bg-blue-50' },
    { label: 'Node.js & Express', color: 'border-green-800 text-green-900 bg-green-50' },
    { label: 'MySQL / Cloud SQL', color: 'border-amber-800 text-amber-900 bg-amber-50' },
    { label: 'TypeScript', color: 'border-sky-800 text-sky-900 bg-sky-50' },
    { label: 'Tailwind CSS', color: 'border-cyan-800 text-cyan-900 bg-cyan-50' },
    { label: 'Blender 3D', color: 'border-orange-800 text-orange-900 bg-orange-50' },
  ];

  return (
    <section id="contact" ref={sectionRef} className="w-full max-w-6xl mx-auto px-4 py-16">
      {/* Airmail Envelope Postcard Frame */}
      <div
        ref={envelopeRef}
        className="relative paper-texture rounded-2xl shadow-2xl p-6 md:p-12 border-4 border-dashed border-[#ab955d] text-slate-900 overflow-hidden"
      >
        {/* Airmail diagonal striped top and bottom bar */}
        <div
          className="absolute top-0 left-0 right-0 h-3.5"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, #dc2626, #dc2626 15px, #ffffff 15px, #ffffff 30px, #2563eb 30px, #2563eb 45px, #ffffff 45px, #ffffff 60px)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-3.5"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, #dc2626, #dc2626 15px, #ffffff 15px, #ffffff 30px, #2563eb 30px, #2563eb 45px, #ffffff 45px, #ffffff 60px)',
          }}
        />

        {/* Washi Tape Accent on Top Edge */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-36 h-5 washi-tape-yellow rotate-[-1deg] pointer-events-none z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pt-4">
          {/* LEFT: Dispatch Form (7 cols) */}
          <div ref={formColRef} className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="ink-stamp stamp-red text-[10px] font-bold">PRIORITY DISPATCH</span>
              <span className="font-mono text-xs text-slate-500 uppercase tracking-widest font-semibold">
                DIRECT INBOX CHANNEL \ 2026
              </span>
            </div>

            <h2 className="font-serif italic text-3xl md:text-5xl font-extrabold text-slate-950 mb-2">
              Initiate Project Brief
            </h2>
            <p className="font-sans text-xs md:text-sm text-slate-600 mb-6 leading-relaxed">
              Have a high-impact digital product, 3D interactive web project, or scalable architecture to build? Transmit your requirements directly.
            </p>

            {/* Interactive Scope Selectors */}
            <div className="mb-6">
              <span className="font-mono text-[10px] uppercase font-bold text-slate-500 tracking-wider block mb-2">
                PROJECT SCOPE (SELECT ALL THAT APPLY) \
              </span>
              <div className="flex flex-wrap gap-2">
                {scopeOptions.map((scope, idx) => {
                  const isSelected = selectedScopes.includes(scope);
                  return (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => toggleScope(scope)}
                      className={`font-mono text-xs px-3 py-1.5 rounded-lg border transition-all duration-200 flex items-center gap-1.5 select-none ${
                        isSelected
                          ? 'bg-slate-900 text-amber-300 border-slate-950 shadow-md font-bold'
                          : 'bg-white/80 hover:bg-slate-100 text-slate-700 border-slate-300'
                      }`}
                    >
                      {isSelected ? (
                        <CheckSquare className="w-3.5 h-3.5 text-amber-400" />
                      ) : (
                        <Square className="w-3.5 h-3.5 text-slate-400" />
                      )}
                      <span>{scope}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {status && (
              <div
                className={`p-3.5 rounded-xl mb-6 font-mono text-xs font-bold flex items-center gap-2.5 ${
                  status.type === 'success'
                    ? 'bg-emerald-100 border border-emerald-400 text-emerald-900'
                    : 'bg-red-100 border border-red-400 text-red-900'
                }`}
              >
                {status.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />}
                <span>{status.text}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold uppercase tracking-wider mb-1.5">
                    Your Name \ Sender
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Satoshi Nakamoto"
                    className="w-full bg-white/90 border border-slate-400 rounded-lg p-3 text-slate-900 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 shadow-inner font-sans text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold uppercase tracking-wider mb-1.5">
                    Your Email \ Return Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. satoshi@bitcoin.org"
                    className="w-full bg-white/90 border border-slate-400 rounded-lg p-3 text-slate-900 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 shadow-inner font-sans text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold uppercase tracking-wider mb-1.5">
                  Project Brief \ Goals & Timeline
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Outline your project scope, core technical challenges, deliverables, and estimated timeline..."
                  className="w-full bg-white/90 border border-slate-400 rounded-lg p-3 text-slate-900 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 font-sans text-sm shadow-inner leading-relaxed"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="font-mono text-xs font-bold uppercase tracking-widest bg-red-800 hover:bg-red-700 text-white px-8 py-3.5 rounded-xl shadow-xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 flex items-center gap-2.5"
              >
                <Send className="w-4 h-4" />
                <span>{loading ? 'TRANSMITTING BRIEF...' : 'TRANSMIT PROJECT BRIEF ↵'}</span>
              </button>
            </form>
          </div>

          {/* RIGHT: Postcard Stamps, Wax Seal & Contact Info (5 cols) */}
          <div ref={infoColRef} className="lg:col-span-5 flex flex-col gap-6 lg:border-l-2 lg:border-dashed lg:border-slate-300 lg:pl-8">
            {/* Postal Stamps & Wax Security Seal */}
            <div className="flex justify-end items-start gap-4">
              {/* Embossed Wax Seal */}
              <div className="w-20 h-20 rounded-full bg-red-900 border-2 border-red-950 shadow-xl flex flex-col items-center justify-center text-amber-200 rotate-[-8deg] relative select-none">
                <div className="w-16 h-16 rounded-full border border-dashed border-red-700/80 flex flex-col items-center justify-center text-center">
                  <span className="font-mono font-black text-[9px] tracking-widest text-amber-300">NKV</span>
                  <span className="font-mono text-[7px] tracking-wider text-amber-200/90">// 2026 //</span>
                  <span className="font-mono text-[6px] uppercase tracking-tighter text-amber-300/80">SEALED</span>
                </div>
              </div>

              {/* Airmail Stamp Box */}
              <div className="w-24 h-28 border-2 border-dashed border-red-800 bg-red-50/90 p-2 rounded-lg shadow-sm text-center flex flex-col justify-between select-none">
                <span className="font-mono text-[9px] font-bold text-red-900">AIRMAIL 2026</span>
                <span className="font-serif italic text-2xl text-red-800 font-bold">2026</span>
                <span className="font-mono text-[8px] text-red-700 font-bold">INDIA POST</span>
              </div>

              {/* Circular Postal Postmark */}
              <div className="w-20 h-20 rounded-full border-2 border-slate-800 p-1 flex items-center justify-center text-center rotate-[-12deg] opacity-80 select-none">
                <p className="font-mono text-[8px] font-bold leading-tight text-slate-800">
                  LUCKNOW <br />
                  SEP 2026 <br />
                  DELIVERED
                </p>
              </div>
            </div>

            {/* Direct Channel Dossier Card */}
            <div className="bg-[#f5eedf] p-5 rounded-xl border border-[#d5c39e] font-mono text-xs space-y-3 shadow-sm">
              <div className="border-b border-slate-300 pb-2 flex items-center justify-between">
                <span className="font-bold text-slate-900 uppercase">
                  DIRECT CHANNELS
                </span>
                <span className="ink-stamp stamp-green text-[8px] font-bold">
                  SLA: &lt; 24H
                </span>
              </div>

              <div className="flex items-center gap-2.5 text-slate-800">
                <Mail className="w-4 h-4 text-slate-700 shrink-0" />
                <span className="font-semibold text-slate-600 text-[11px]">Email:</span>
                <a href="mailto:acrocoader@gmail.com" className="font-bold underline text-blue-800 hover:text-blue-900">
                  acrocoader@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-2.5 text-slate-800">
                <MessageSquare className="w-4 h-4 text-emerald-800 shrink-0" />
                <span className="font-semibold text-slate-600 text-[11px]">WhatsApp:</span>
                <a href="https://wa.me/917784068641" target="_blank" rel="noopener noreferrer" className="font-bold underline text-emerald-800 hover:text-emerald-900">
                  +91 7784068641
                </a>
              </div>

              <div className="flex items-center gap-2.5 text-slate-800">
                <Linkedin className="w-4 h-4 text-blue-700 shrink-0" />
                <span className="font-semibold text-slate-600 text-[11px]">LinkedIn:</span>
                <a href={profile?.linkedin_url || 'https://linkedin.com'} target="_blank" rel="noopener noreferrer" className="font-bold underline text-blue-700 hover:text-blue-800">
                  linkedin.com/in/naimish
                </a>
              </div>

              <div className="flex items-center gap-2.5 text-slate-800">
                <Github className="w-4 h-4 text-slate-900 shrink-0" />
                <span className="font-semibold text-slate-600 text-[11px]">GitHub:</span>
                <a href={profile?.github_url || 'https://github.com/acrocoder'} target="_blank" rel="noopener noreferrer" className="font-bold underline text-slate-900 hover:text-slate-800">
                  github.com/acrocoder
                </a>
              </div>
            </div>

            {/* Verified Tech Emblems */}
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2">
                VERIFIED CAPABILITY EMBLEMS:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {techBadges.map((badge, idx) => (
                  <span
                    key={idx}
                    className={`font-mono text-[10px] font-bold px-2.5 py-1 rounded-md border shadow-xs ${badge.color}`}
                  >
                    {badge.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

