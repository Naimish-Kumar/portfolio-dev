'use client';

import React, { useState } from 'react';
import { Send, Mail, MapPin, Phone, MessageSquare, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { sendContactMessage } from '../lib/api';

interface ContactProps {
  profileData: any;
}

export default function Contact({ profileData }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setStatusMessage('Please fill in all required fields.');
      return;
    }

    setStatus('loading');
    setStatusMessage('');

    try {
      const res = await sendContactMessage(formData);
      if (res.success) {
        setStatus('success');
        setStatusMessage(res.message || 'Thank you! Your message has been sent successfully.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setStatusMessage(res.message || 'Failed to send message. Please try again.');
      }
    } catch (err: any) {
      setStatus('error');
      setStatusMessage('Unable to reach the server. Please try again later.');
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#0a0d18] bg-grid-pattern">
      <div className="ambient-glow-cyan top-1/3 -right-32" />
      <div className="ambient-glow-purple bottom-10 -left-32" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Get in Touch</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
            Let&apos;s Build Something <span className="text-gradient">Extraordinary</span>
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Have a project in mind, need a cloud architect, or want to collaborate? Send me a message!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left info column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card p-6 sm:p-8 rounded-2xl border border-slate-800">
              <h3 className="text-2xl font-heading font-bold text-white mb-3">
                Contact Details
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                I am currently open to full-time roles, strategic consulting, and contract engineering opportunities worldwide.
              </p>

              <div className="space-y-4">
                {profileData?.email && (
                  <div className="flex items-center gap-4 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="p-2.5 rounded-lg bg-indigo-500/20 text-indigo-400">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-mono">Email Address</div>
                      <a href={`mailto:${profileData.email}`} className="text-sm font-semibold text-white hover:text-cyan-400 transition-colors">
                        {profileData.email}
                      </a>
                    </div>
                  </div>
                )}

                {profileData?.phone && (
                  <div className="flex items-center gap-4 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="p-2.5 rounded-lg bg-cyan-500/20 text-cyan-400">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-mono">Phone / WhatsApp</div>
                      <div className="text-sm font-semibold text-white">
                        {profileData.phone}
                      </div>
                    </div>
                  </div>
                )}

                {profileData?.location && (
                  <div className="flex items-center gap-4 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="p-2.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-mono">Base Location</div>
                      <div className="text-sm font-semibold text-white">
                        {profileData.location}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick response commitment banner */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-cyan-900/40 border border-indigo-500/30 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">Fast Response</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Messages submitted here arrive directly in my admin management portal and database. I usually reply within a few hours!
              </p>
            </div>
          </div>

          {/* Right form column */}
          <div className="lg:col-span-7">
            <div className="glass-card p-6 sm:p-8 rounded-2xl border border-slate-800">
              <h3 className="text-2xl font-heading font-bold text-white mb-6">
                Send a Direct Message
              </h3>

              {/* Status Alert */}
              {status === 'success' && (
                <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-sm flex items-center gap-3 mb-6">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span>{statusMessage}</span>
                </div>
              )}

              {status === 'error' && (
                <div className="p-4 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-200 text-sm flex items-center gap-3 mb-6">
                  <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                  <span>{statusMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                      Your Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl glass-input text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                      Your Email <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl glass-input text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="Project Inquiry / Job Opportunity / Collaboration"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl glass-input text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                    Message <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell me about your project, timeline, or requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl glass-input text-sm resize-y"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 rounded-xl font-medium text-sm text-white relative group overflow-hidden shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.01] disabled:opacity-50"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 group-hover:opacity-90 transition-opacity" />
                  <span className="relative flex items-center justify-center gap-2">
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        <span>Send Message</span>
                      </>
                    )}
                  </span>
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
