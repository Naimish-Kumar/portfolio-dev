'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Shield, Lock, Mail, User, Sparkles, FolderGit2, Cpu, Briefcase,
  GraduationCap, MessageSquare, Settings, LogOut, Plus, Trash2, Edit2,
  CheckCircle, AlertCircle, Save, ExternalLink, RefreshCw, Eye, EyeOff,
  Tag, Layers, ArrowLeft, KeyRound
} from 'lucide-react';
import {
  API_BASE, fetchPortfolio, adminLogin, checkAdminSession,
  changeAdminPassword, adminUpdateProfile, adminUpdateHero,
  adminSaveProject, adminDeleteProject, adminSaveSkill, adminDeleteSkill,
  adminSaveExperience, adminDeleteExperience, adminSaveEducation, adminDeleteEducation,
  adminGetMessages, adminMarkMessageRead, adminDeleteMessage, adminUpdateSettings
} from '../../lib/api';

type TabType = 'overview' | 'profile' | 'hero' | 'projects' | 'skills' | 'experience' | 'education' | 'messages' | 'settings' | 'security';

export default function AdminPage() {
  // Auth state
  const [token, setToken] = useState<string | null>(null);
  const [adminUser, setAdminUser] = useState<any>(null);
  const [authChecking, setAuthChecking] = useState(true);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('admin@acrocoder.com');
  const [loginPassword, setLoginPassword] = useState('admin123');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  // Global portfolio data
  const [portfolioData, setPortfolioData] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  // Success / Error Feedback Toast
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Form states for CRUD operations
  const [profileForm, setProfileForm] = useState<any>({});
  const [heroForm, setHeroForm] = useState<any>({});
  const [settingsForm, setSettingsForm] = useState<any>({});
  const [newTypingString, setNewTypingString] = useState('');

  // Project Modal / Edit state
  const [editingProject, setEditingProject] = useState<any | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [projectTagInput, setProjectTagInput] = useState('');

  // Skill Modal / Edit state
  const [editingSkill, setEditingSkill] = useState<any | null>(null);
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);

  // Experience Modal / Edit state
  const [editingExp, setEditingExp] = useState<any | null>(null);
  const [isExpModalOpen, setIsExpModalOpen] = useState(false);
  const [expSkillInput, setExpSkillInput] = useState('');

  // Education Modal / Edit state
  const [editingEdu, setEditingEdu] = useState<any | null>(null);
  const [isEduModalOpen, setIsEduModalOpen] = useState(false);

  // Security Form
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  // Check auth session on load
  useEffect(() => {
    const savedToken = localStorage.getItem('acrocoder_admin_token');
    if (savedToken) {
      setToken(savedToken);
      checkAdminSession()
        .then((res) => {
          if (res.success) {
            setAdminUser(res.admin);
          } else {
            localStorage.removeItem('acrocoder_admin_token');
            setToken(null);
          }
        })
        .catch(() => {
          localStorage.removeItem('acrocoder_admin_token');
          setToken(null);
        })
        .finally(() => setAuthChecking(false));
    } else {
      setAuthChecking(false);
    }
  }, []);

  // Load all dashboard data
  const loadDashboardData = async () => {
    setRefreshing(true);
    try {
      const data = await fetchPortfolio();
      if (data) {
        setPortfolioData(data);
        setProfileForm(data.profile || {});
        setHeroForm(data.hero || {});
        setSettingsForm(data.settings || {});
      }

      if (token) {
        const msgRes = await adminGetMessages();
        if (msgRes.success) {
          setMessages(msgRes.data || []);
        }
      }
    } catch (err) {
      showToast('error', 'Failed to reload data');
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (token) {
      loadDashboardData();
    }
  }, [token]);

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

    try {
      const res = await adminLogin({ usernameOrEmail: loginEmail, password: loginPassword });
      if (res.success && res.token) {
        localStorage.setItem('acrocoder_admin_token', res.token);
        setToken(res.token);
        setAdminUser(res.admin);
        showToast('success', 'Logged in successfully!');
      } else {
        setLoginError(res.message || 'Invalid credentials');
      }
    } catch (err: any) {
      setLoginError('Server connection error');
    } finally {
      setLoginLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('acrocoder_admin_token');
    setToken(null);
    setAdminUser(null);
    showToast('success', 'Logged out successfully');
  };

  // Save Profile
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await adminUpdateProfile(profileForm);
    if (res.success) {
      showToast('success', 'Profile updated successfully!');
      loadDashboardData();
    } else {
      showToast('error', res.message || 'Failed to update profile');
    }
  };

  // Save Hero Settings
  const handleSaveHero = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await adminUpdateHero(heroForm);
    if (res.success) {
      showToast('success', 'Hero settings saved!');
      loadDashboardData();
    } else {
      showToast('error', res.message || 'Failed to save hero');
    }
  };

  // Add / Remove typing strings in Hero
  const addTypingString = () => {
    if (!newTypingString.trim()) return;
    const current = heroForm.typing_strings || [];
    setHeroForm({ ...heroForm, typing_strings: [...current, newTypingString.trim()] });
    setNewTypingString('');
  };

  const removeTypingString = (index: number) => {
    const current = heroForm.typing_strings || [];
    setHeroForm({ ...heroForm, typing_strings: current.filter((_: any, i: number) => i !== index) });
  };

  // Save Project CRUD
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEdit = Boolean(editingProject?.id);
    const res = await adminSaveProject(editingProject, isEdit, editingProject?.id);
    if (res.success) {
      showToast('success', isEdit ? 'Project updated!' : 'Project created!');
      setIsProjectModalOpen(false);
      setEditingProject(null);
      loadDashboardData();
    } else {
      showToast('error', res.message || 'Failed to save project');
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    const res = await adminDeleteProject(id);
    if (res.success) {
      showToast('success', 'Project deleted');
      loadDashboardData();
    } else {
      showToast('error', res.message || 'Failed to delete');
    }
  };

  // Save Skill CRUD
  const handleSaveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEdit = Boolean(editingSkill?.id);
    const res = await adminSaveSkill(editingSkill, isEdit, editingSkill?.id);
    if (res.success) {
      showToast('success', isEdit ? 'Skill updated!' : 'Skill created!');
      setIsSkillModalOpen(false);
      setEditingSkill(null);
      loadDashboardData();
    } else {
      showToast('error', res.message || 'Failed to save skill');
    }
  };

  const handleDeleteSkill = async (id: number) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;
    const res = await adminDeleteSkill(id);
    if (res.success) {
      showToast('success', 'Skill deleted');
      loadDashboardData();
    } else {
      showToast('error', res.message || 'Failed to delete');
    }
  };

  // Save Experience CRUD
  const handleSaveExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEdit = Boolean(editingExp?.id);
    const res = await adminSaveExperience(editingExp, isEdit, editingExp?.id);
    if (res.success) {
      showToast('success', isEdit ? 'Experience updated!' : 'Experience added!');
      setIsExpModalOpen(false);
      setEditingExp(null);
      loadDashboardData();
    } else {
      showToast('error', res.message || 'Failed to save experience');
    }
  };

  const handleDeleteExperience = async (id: number) => {
    if (!confirm('Are you sure you want to delete this experience entry?')) return;
    const res = await adminDeleteExperience(id);
    if (res.success) {
      showToast('success', 'Experience deleted');
      loadDashboardData();
    } else {
      showToast('error', res.message || 'Failed to delete');
    }
  };

  // Save Education CRUD
  const handleSaveEducation = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEdit = Boolean(editingEdu?.id);
    const res = await adminSaveEducation(editingEdu, isEdit, editingEdu?.id);
    if (res.success) {
      showToast('success', isEdit ? 'Education updated!' : 'Education added!');
      setIsEduModalOpen(false);
      setEditingEdu(null);
      loadDashboardData();
    } else {
      showToast('error', res.message || 'Failed to save education');
    }
  };

  const handleDeleteEducation = async (id: number) => {
    if (!confirm('Are you sure you want to delete this education entry?')) return;
    const res = await adminDeleteEducation(id);
    if (res.success) {
      showToast('success', 'Education deleted');
      loadDashboardData();
    } else {
      showToast('error', res.message || 'Failed to delete');
    }
  };

  // Messages Actions
  const handleToggleMessageRead = async (id: number, current: boolean) => {
    const res = await adminMarkMessageRead(id, !current);
    if (res.success) {
      showToast('success', 'Status updated');
      loadDashboardData();
    }
  };

  const handleDeleteMsg = async (id: number) => {
    if (!confirm('Delete message?')) return;
    const res = await adminDeleteMessage(id);
    if (res.success) {
      showToast('success', 'Message deleted');
      loadDashboardData();
    }
  };

  // Save Site Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await adminUpdateSettings(settingsForm);
    if (res.success) {
      showToast('success', 'Site settings updated!');
      loadDashboardData();
    } else {
      showToast('error', res.message || 'Failed to update settings');
    }
  };

  // Change Password
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPw !== confirmPw) {
      showToast('error', 'New passwords do not match');
      return;
    }
    const res = await changeAdminPassword({ currentPassword: currentPw, newPassword: newPw });
    if (res.success) {
      showToast('success', 'Password updated successfully!');
      setCurrentPw('');
      setNewPw('');
      setConfirmPw('');
    } else {
      showToast('error', res.message || 'Failed to update password');
    }
  };

  // -------------------------------------------------------------
  // LOGIN SCREEN
  // -------------------------------------------------------------
  if (authChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#070913]">
        <div className="text-center space-y-3">
          <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin mx-auto" />
          <p className="text-slate-400 text-sm font-mono">Verifying admin session...</p>
        </div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[#070913] bg-grid-pattern relative overflow-hidden">
        <div className="ambient-glow-purple -top-20 -left-20" />
        <div className="ambient-glow-cyan -bottom-20 -right-20" />

        <div className="relative w-full max-w-md glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl z-10">
          
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 via-primary-500 to-cyan-400 p-[2px] mx-auto mb-4 shadow-xl shadow-indigo-600/30">
              <div className="w-full h-full bg-[#0c101e] rounded-[14px] flex items-center justify-center">
                <Shield className="w-7 h-7 text-cyan-400" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
              Admin Portal
            </h1>
            <p className="text-xs text-slate-400 font-mono mt-1">
              acrocoder.com Cloud Management Console
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-300 text-xs flex items-center gap-2 mb-6">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                Admin Email / Username
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-sm"
                  placeholder="admin@acrocoder.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3.5 rounded-xl font-medium text-sm text-white relative group overflow-hidden shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.01] mt-2 disabled:opacity-50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 group-hover:opacity-90 transition-opacity" />
              <span className="relative flex items-center justify-center gap-2">
                {loginLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Shield className="w-4 h-4" />}
                <span>{loginLoading ? 'Signing in...' : 'Sign In to Dashboard'}</span>
              </span>
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-800 text-center flex items-center justify-between text-xs text-slate-500">
            <Link href="/" className="hover:text-cyan-400 flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" /> Back to Portfolio
            </Link>
            <span>MySQL Protected</span>
          </div>

        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // AUTHENTICATED ADMIN DASHBOARD
  // -------------------------------------------------------------
  const unreadCount = messages.filter((m) => !m.is_read).length;

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 flex flex-col md:flex-row">
      
      {/* Toast Feedback */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 px-5 py-3.5 rounded-2xl shadow-2xl backdrop-blur-xl border flex items-center gap-3 text-sm animate-in slide-in-from-top-3 ${
          toast.type === 'success'
            ? 'bg-emerald-950/90 border-emerald-500/60 text-emerald-200'
            : 'bg-rose-950/90 border-rose-500/60 text-rose-200'
        }`}>
          {toast.type === 'success' ? (
            <CheckCircle className="w-4 h-4 text-emerald-400" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-400" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#0c101d] border-b md:border-b-0 md:border-r border-slate-800 p-5 flex flex-col justify-between shrink-0">
        <div>
          {/* Dashboard Brand */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 p-[2px]">
                <div className="w-full h-full bg-[#0c101e] rounded-[10px] flex items-center justify-center">
                  <Shield className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <div>
                <h2 className="font-heading font-bold text-white text-sm">AcroCoder Admin</h2>
                <span className="text-[10px] font-mono text-cyan-400">Dynamic Control</span>
              </div>
            </div>
            <button
              onClick={loadDashboardData}
              disabled={refreshing}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 text-xs font-medium">
            {[
              { id: 'overview', label: 'Overview & Stats', icon: Sparkles },
              { id: 'profile', label: 'Profile & Bio', icon: User },
              { id: 'hero', label: 'Hero & Headline', icon: Layers },
              { id: 'projects', label: 'Projects Manager', icon: FolderGit2, count: portfolioData?.projects?.length },
              { id: 'skills', label: 'Skills Manager', icon: Cpu, count: portfolioData?.skills?.length },
              { id: 'experience', label: 'Experience Timeline', icon: Briefcase, count: portfolioData?.experience?.length },
              { id: 'education', label: 'Education & Honors', icon: GraduationCap, count: portfolioData?.education?.length },
              { id: 'messages', label: 'Messages Inbox', icon: MessageSquare, badge: unreadCount },
              { id: 'settings', label: 'Site Settings', icon: Settings },
              { id: 'security', label: 'Admin Security', icon: KeyRound },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as TabType)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-300' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white">
                      {item.badge}
                    </span>
                  )}
                  {item.count !== undefined && !item.badge && (
                    <span className="text-[11px] font-mono text-slate-500">{item.count}</span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-slate-800/80 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
            <span>View Live Site</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-rose-400 hover:bg-rose-950/40 text-xs font-medium transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 max-w-6xl overflow-y-auto">
        
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
                Dashboard Overview
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Connected to Hostinger MySQL Database • Subdomains: dev.acrocoder.com & api.acrocoder.com
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="glass-card p-5 rounded-2xl border border-slate-800">
                <div className="text-xs font-mono text-cyan-400 mb-1">Total Projects</div>
                <div className="text-3xl font-heading font-extrabold text-white">
                  {portfolioData?.projects?.length || 0}
                </div>
              </div>
              <div className="glass-card p-5 rounded-2xl border border-slate-800">
                <div className="text-xs font-mono text-indigo-400 mb-1">Total Skills</div>
                <div className="text-3xl font-heading font-extrabold text-white">
                  {portfolioData?.skills?.length || 0}
                </div>
              </div>
              <div className="glass-card p-5 rounded-2xl border border-slate-800">
                <div className="text-xs font-mono text-emerald-400 mb-1">Unread Inquiries</div>
                <div className="text-3xl font-heading font-extrabold text-white">
                  {unreadCount}
                </div>
              </div>
              <div className="glass-card p-5 rounded-2xl border border-slate-800">
                <div className="text-xs font-mono text-purple-400 mb-1">Database Status</div>
                <div className="text-sm font-bold text-emerald-400 flex items-center gap-1.5 mt-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                  Connected (MySQL)
                </div>
              </div>
            </div>

            {/* Recent Messages Quick View */}
            <div className="glass-card p-6 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-cyan-400" />
                  Recent Contact Inquiries
                </h3>
                <button
                  onClick={() => setActiveTab('messages')}
                  className="text-xs font-mono text-indigo-400 hover:text-indigo-300"
                >
                  View All Messages →
                </button>
              </div>

              {messages.length === 0 ? (
                <div className="text-sm text-slate-500 py-6 text-center">No messages received yet.</div>
              ) : (
                <div className="space-y-3">
                  {messages.slice(0, 3).map((m) => (
                    <div key={m.id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="text-sm font-semibold text-white flex items-center gap-2">
                          {m.name}
                          {!m.is_read && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                              NEW
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-400">{m.email} • {m.subject}</div>
                        <p className="text-xs text-slate-300 mt-1 line-clamp-1">{m.message}</p>
                      </div>
                      <a
                        href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject || 'Portfolio Inquiry')}`}
                        className="px-3 py-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 text-xs font-medium transition-colors"
                      >
                        Reply
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: PROFILE & BIO */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
                Profile & Bio Manager
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Customize your identity, tagline, contact handles, and downloadable resume.
              </p>
            </div>

            <form onSubmit={handleSaveProfile} className="glass-card p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={profileForm.full_name || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, full_name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">Professional Headline</label>
                  <input
                    type="text"
                    value={profileForm.headline || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, headline: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">Short Bio (Hero description)</label>
                <textarea
                  rows={2}
                  value={profileForm.bio || ''}
                  onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">About Me Full Narrative</label>
                <textarea
                  rows={4}
                  value={profileForm.about_text || ''}
                  onChange={(e) => setProfileForm({ ...profileForm, about_text: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">Avatar Image URL</label>
                  <input
                    type="text"
                    value={profileForm.avatar_url || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, avatar_url: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">Resume Download URL</label>
                  <input
                    type="text"
                    value={profileForm.resume_url || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, resume_url: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">Contact Email</label>
                  <input
                    type="email"
                    value={profileForm.email || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">Phone Number</label>
                  <input
                    type="text"
                    value={profileForm.phone || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">Location</label>
                  <input
                    type="text"
                    value={profileForm.location || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">GitHub URL</label>
                  <input
                    type="text"
                    value={profileForm.github_url || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, github_url: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">LinkedIn URL</label>
                  <input
                    type="text"
                    value={profileForm.linkedin_url || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, linkedin_url: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">Twitter / X URL</label>
                  <input
                    type="text"
                    value={profileForm.twitter_url || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, twitter_url: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">Years of Experience</label>
                  <input
                    type="number"
                    value={profileForm.years_experience || 0}
                    onChange={(e) => setProfileForm({ ...profileForm, years_experience: parseInt(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">Completed Projects</label>
                  <input
                    type="number"
                    value={profileForm.projects_completed || 0}
                    onChange={(e) => setProfileForm({ ...profileForm, projects_completed: parseInt(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="avail"
                  checked={profileForm.available_for_hire ?? true}
                  onChange={(e) => setProfileForm({ ...profileForm, available_for_hire: e.target.checked })}
                  className="w-4 h-4 rounded text-indigo-600 bg-slate-900 border-slate-700"
                />
                <label htmlFor="avail" className="text-sm font-medium text-slate-200">
                  Available for Hire (Shows pulsing green status beacon)
                </label>
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-medium text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/30 hover:opacity-90 transition-opacity"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: HERO SETTINGS */}
        {activeTab === 'hero' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
                Hero Section & Dynamic Typing Manager
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Configure animated typing keywords, call-to-action buttons, and badges.
              </p>
            </div>

            <form onSubmit={handleSaveHero} className="glass-card p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">Hero Greeting</label>
                  <input
                    type="text"
                    value={heroForm.greeting || ''}
                    onChange={(e) => setHeroForm({ ...heroForm, greeting: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">Hero Headline Title</label>
                  <input
                    type="text"
                    value={heroForm.headline || ''}
                    onChange={(e) => setHeroForm({ ...heroForm, headline: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">Hero Subheadline</label>
                <textarea
                  rows={2}
                  value={heroForm.subheadline || ''}
                  onChange={(e) => setHeroForm({ ...heroForm, subheadline: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                />
              </div>

              {/* Dynamic Typing Strings Manager */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                <label className="block text-xs font-mono uppercase text-cyan-400 font-bold">
                  Animated Typing Roles / Strings
                </label>
                <div className="flex flex-wrap gap-2">
                  {(heroForm.typing_strings || []).map((str: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600/30 border border-indigo-500/40 text-indigo-200 text-xs font-medium flex items-center gap-1.5"
                    >
                      {str}
                      <button
                        type="button"
                        onClick={() => removeTypingString(index)}
                        className="text-indigo-400 hover:text-rose-400"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. Cloud Architect, Next.js Expert..."
                    value={newTypingString}
                    onChange={(e) => setNewTypingString(e.target.value)}
                    className="flex-1 px-4 py-2 rounded-lg glass-input text-xs"
                  />
                  <button
                    type="button"
                    onClick={addTypingString}
                    className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium"
                  >
                    Add Role
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">Hero Availability Badge</label>
                <input
                  type="text"
                  value={heroForm.badge_text || ''}
                  onChange={(e) => setHeroForm({ ...heroForm, badge_text: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">Primary Button Text</label>
                  <input
                    type="text"
                    value={heroForm.primary_button_text || ''}
                    onChange={(e) => setHeroForm({ ...heroForm, primary_button_text: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">Primary Button Link</label>
                  <input
                    type="text"
                    value={heroForm.primary_button_link || ''}
                    onChange={(e) => setHeroForm({ ...heroForm, primary_button_link: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">Secondary Button Text</label>
                  <input
                    type="text"
                    value={heroForm.secondary_button_text || ''}
                    onChange={(e) => setHeroForm({ ...heroForm, secondary_button_text: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">Secondary Button Link</label>
                  <input
                    type="text"
                    value={heroForm.secondary_button_link || ''}
                    onChange={(e) => setHeroForm({ ...heroForm, secondary_button_link: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-medium text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/30 hover:opacity-90 transition-opacity"
              >
                <Save className="w-4 h-4" />
                <span>Save Hero Settings</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 4: PROJECTS MANAGER */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
                  Projects Showcase Manager
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Add, edit, reorder, or delete portfolio projects.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingProject({
                    title: '',
                    category: 'Fullstack',
                    short_description: '',
                    long_description: '',
                    image_url: '',
                    live_url: '',
                    github_url: '',
                    tags: ['Next.js', 'React', 'Node.js', 'MySQL'],
                    is_featured: true,
                    display_order: (portfolioData?.projects?.length || 0) + 1,
                  });
                  setIsProjectModalOpen(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-xs font-semibold flex items-center gap-2 shadow-md shadow-indigo-600/30"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Project</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {(portfolioData?.projects || []).map((project: any) => (
                <div key={project.id} className="glass-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                        {project.category}
                      </span>
                      {project.is_featured && (
                        <span className="text-[11px] font-mono text-amber-400 font-bold">★ Featured</span>
                      )}
                    </div>
                    <h3 className="text-lg font-heading font-bold text-white mb-1">{project.title}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mb-3">{project.short_description}</p>
                    
                    {/* Tags */}
                    {project.tags && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {project.tags.map((t: string, i: number) => (
                          <span key={i} className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                    <div className="flex items-center gap-2">
                      {project.live_url && (
                        <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="text-xs text-cyan-400 hover:underline">
                          Demo
                        </a>
                      )}
                      {project.github_url && (
                        <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 hover:underline">
                          Code
                        </a>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setEditingProject(project);
                          setIsProjectModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
                        title="Edit Project"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300"
                        title="Delete Project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Project Edit Modal */}
            {isProjectModalOpen && editingProject && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0d1222] border border-slate-700 rounded-2xl p-6 sm:p-8 space-y-4">
                  <h2 className="text-xl font-heading font-bold text-white">
                    {editingProject.id ? 'Edit Project' : 'Create New Project'}
                  </h2>

                  <form onSubmit={handleSaveProject} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Title *</label>
                        <input
                          type="text"
                          required
                          value={editingProject.title || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-lg glass-input text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Category</label>
                        <input
                          type="text"
                          value={editingProject.category || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                          placeholder="e.g. Fullstack, AI, Mobile, SaaS"
                          className="w-full px-3.5 py-2 rounded-lg glass-input text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Short Description *</label>
                      <textarea
                        required
                        rows={2}
                        value={editingProject.short_description || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, short_description: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-lg glass-input text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Long / Detailed Description</label>
                      <textarea
                        rows={4}
                        value={editingProject.long_description || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, long_description: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-lg glass-input text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Cover Image URL</label>
                      <input
                        type="text"
                        value={editingProject.image_url || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, image_url: e.target.value })}
                        placeholder="https://..."
                        className="w-full px-3.5 py-2 rounded-lg glass-input text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Live Demo URL</label>
                        <input
                          type="text"
                          value={editingProject.live_url || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, live_url: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-lg glass-input text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase text-slate-400 mb-1">GitHub Repo URL</label>
                        <input
                          type="text"
                          value={editingProject.github_url || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, github_url: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-lg glass-input text-sm"
                        />
                      </div>
                    </div>

                    {/* Tags */}
                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Tech Stack Tags</label>
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {(editingProject.tags || []).map((t: string, idx: number) => (
                          <span key={idx} className="px-2.5 py-1 rounded bg-indigo-600/30 text-indigo-300 text-xs flex items-center gap-1">
                            {t}
                            <button
                              type="button"
                              onClick={() => {
                                const newTags = editingProject.tags.filter((_: any, i: number) => i !== idx);
                                setEditingProject({ ...editingProject, tags: newTags });
                              }}
                              className="text-rose-400"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Add a technology tag..."
                          value={projectTagInput}
                          onChange={(e) => setProjectTagInput(e.target.value)}
                          className="flex-1 px-3 py-1.5 rounded-lg glass-input text-xs"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (!projectTagInput.trim()) return;
                            const current = editingProject.tags || [];
                            setEditingProject({ ...editingProject, tags: [...current, projectTagInput.trim()] });
                            setProjectTagInput('');
                          }}
                          className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-medium"
                        >
                          Add Tag
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="is_feat"
                          checked={editingProject.is_featured ?? true}
                          onChange={(e) => setEditingProject({ ...editingProject, is_featured: e.target.checked })}
                          className="w-4 h-4 rounded text-indigo-600"
                        />
                        <label htmlFor="is_feat" className="text-xs text-slate-300 font-medium">
                          Feature on Homepage
                        </label>
                      </div>

                      <div className="flex items-center gap-2">
                        <label className="text-xs text-slate-400 font-mono">Order:</label>
                        <input
                          type="number"
                          value={editingProject.display_order || 1}
                          onChange={(e) => setEditingProject({ ...editingProject, display_order: parseInt(e.target.value) })}
                          className="w-16 px-2 py-1 rounded glass-input text-xs"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                      <button
                        type="button"
                        onClick={() => setIsProjectModalOpen(false)}
                        className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-xs font-semibold"
                      >
                        Save Project
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: SKILLS MANAGER */}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
                  Skills & Technologies Manager
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Manage categories, proficiency percentages, and icons.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingSkill({
                    name: '',
                    category: 'Frontend',
                    proficiency: 85,
                    icon: 'Layers',
                    display_order: (portfolioData?.skills?.length || 0) + 1,
                    is_featured: true,
                  });
                  setIsSkillModalOpen(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-xs font-semibold flex items-center gap-2 shadow-md shadow-indigo-600/30"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Skill</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {(portfolioData?.skills || []).map((skill: any) => (
                <div key={skill.id} className="glass-card p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-heading font-bold text-white text-sm">{skill.name}</div>
                    <div className="text-xs text-slate-400">{skill.category} • {skill.proficiency}%</div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        setEditingSkill(skill);
                        setIsSkillModalOpen(true);
                      }}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteSkill(skill.id)}
                      className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Skill Edit Modal */}
            {isSkillModalOpen && editingSkill && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <div className="w-full max-w-md bg-[#0d1222] border border-slate-700 rounded-2xl p-6 space-y-4">
                  <h2 className="text-lg font-heading font-bold text-white">
                    {editingSkill.id ? 'Edit Skill' : 'Add New Skill'}
                  </h2>
                  <form onSubmit={handleSaveSkill} className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Skill Name *</label>
                      <input
                        type="text"
                        required
                        value={editingSkill.name || ''}
                        onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-lg glass-input text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Category</label>
                      <input
                        type="text"
                        value={editingSkill.category || ''}
                        onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value })}
                        placeholder="Frontend / Backend / Database / Cloud & DevOps / Architecture"
                        className="w-full px-3.5 py-2 rounded-lg glass-input text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                        Proficiency Level ({editingSkill.proficiency || 80}%)
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="100"
                        value={editingSkill.proficiency || 80}
                        onChange={(e) => setEditingSkill({ ...editingSkill, proficiency: parseInt(e.target.value) })}
                        className="w-full accent-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Lucide Icon Name</label>
                      <input
                        type="text"
                        value={editingSkill.icon || ''}
                        onChange={(e) => setEditingSkill({ ...editingSkill, icon: e.target.value })}
                        placeholder="Layers, Server, Database, Cloud, Code, Palette, Cpu..."
                        className="w-full px-3.5 py-2 rounded-lg glass-input text-sm"
                      />
                    </div>
                    <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                      <button
                        type="button"
                        onClick={() => setIsSkillModalOpen(false)}
                        className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-xs font-semibold"
                      >
                        Save Skill
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 6: EXPERIENCE */}
        {activeTab === 'experience' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
                  Experience Timeline Manager
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Manage work history, company details, responsibilities, and technologies.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingExp({
                    company: '',
                    role: '',
                    location: 'Remote',
                    employment_type: 'Full-time',
                    start_date: '2023',
                    end_date: 'Present',
                    is_current: true,
                    description: '',
                    skills_used: ['Next.js', 'Node.js', 'MySQL'],
                    display_order: (portfolioData?.experience?.length || 0) + 1,
                  });
                  setIsExpModalOpen(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-xs font-semibold flex items-center gap-2 shadow-md shadow-indigo-600/30"
              >
                <Plus className="w-4 h-4" />
                <span>Add Experience</span>
              </button>
            </div>

            <div className="space-y-4">
              {(portfolioData?.experience || []).map((exp: any) => (
                <div key={exp.id} className="glass-card p-5 rounded-2xl border border-slate-800 flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-heading font-bold text-white">{exp.role}</h3>
                      <span className="text-xs text-indigo-400 font-semibold">@ {exp.company}</span>
                    </div>
                    <div className="text-xs font-mono text-cyan-400 mt-0.5">
                      {exp.start_date} – {exp.is_current ? 'Present' : exp.end_date} • {exp.location}
                    </div>
                    <p className="text-xs text-slate-300 mt-2 whitespace-pre-line leading-relaxed">{exp.description}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        setEditingExp(exp);
                        setIsExpModalOpen(true);
                      }}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteExperience(exp.id)}
                      className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Experience Edit Modal */}
            {isExpModalOpen && editingExp && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto bg-[#0d1222] border border-slate-700 rounded-2xl p-6 sm:p-8 space-y-4">
                  <h2 className="text-lg font-heading font-bold text-white">
                    {editingExp.id ? 'Edit Experience' : 'Add Experience Entry'}
                  </h2>
                  <form onSubmit={handleSaveExperience} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Company Name *</label>
                        <input
                          type="text"
                          required
                          value={editingExp.company || ''}
                          onChange={(e) => setEditingExp({ ...editingExp, company: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-lg glass-input text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Role / Job Title *</label>
                        <input
                          type="text"
                          required
                          value={editingExp.role || ''}
                          onChange={(e) => setEditingExp({ ...editingExp, role: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-lg glass-input text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Start Date *</label>
                        <input
                          type="text"
                          required
                          value={editingExp.start_date || ''}
                          onChange={(e) => setEditingExp({ ...editingExp, start_date: e.target.value })}
                          placeholder="e.g. 2023 or Jan 2023"
                          className="w-full px-3.5 py-2 rounded-lg glass-input text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase text-slate-400 mb-1">End Date</label>
                        <input
                          type="text"
                          value={editingExp.end_date || ''}
                          onChange={(e) => setEditingExp({ ...editingExp, end_date: e.target.value })}
                          placeholder="Present / 2024"
                          className="w-full px-3.5 py-2 rounded-lg glass-input text-sm"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="is_curr"
                        checked={editingExp.is_current ?? false}
                        onChange={(e) => setEditingExp({ ...editingExp, is_current: e.target.checked })}
                        className="w-4 h-4 rounded text-indigo-600"
                      />
                      <label htmlFor="is_curr" className="text-xs text-slate-300 font-medium">
                        I am currently working here
                      </label>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Responsibilities & Accomplishments</label>
                      <textarea
                        rows={4}
                        value={editingExp.description || ''}
                        onChange={(e) => setEditingExp({ ...editingExp, description: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-lg glass-input text-sm"
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                      <button
                        type="button"
                        onClick={() => setIsExpModalOpen(false)}
                        className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-xs font-semibold"
                      >
                        Save Experience
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 7: EDUCATION */}
        {activeTab === 'education' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
                  Education & Honors Manager
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Manage degrees, universities, and academic accomplishments.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingEdu({
                    institution: '',
                    degree: '',
                    field_of_study: 'Computer Science',
                    start_year: '2018',
                    end_year: '2022',
                    grade: 'First Class',
                    description: '',
                    display_order: (portfolioData?.education?.length || 0) + 1,
                  });
                  setIsEduModalOpen(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-xs font-semibold flex items-center gap-2 shadow-md shadow-indigo-600/30"
              >
                <Plus className="w-4 h-4" />
                <span>Add Education</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {(portfolioData?.education || []).map((edu: any) => (
                <div key={edu.id} className="glass-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-heading font-bold text-white">{edu.degree}</h3>
                    <div className="text-xs text-indigo-400 font-medium">{edu.field_of_study}</div>
                    <div className="text-xs font-mono text-slate-400 mt-1">{edu.institution} ({edu.start_year} - {edu.end_year})</div>
                    {edu.description && <p className="text-xs text-slate-300 mt-2">{edu.description}</p>}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 mt-4">
                    <span className="text-[11px] text-emerald-400 font-medium">{edu.grade}</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setEditingEdu(edu);
                          setIsEduModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteEducation(edu.id)}
                        className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Education Edit Modal */}
            {isEduModalOpen && editingEdu && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <div className="w-full max-w-md bg-[#0d1222] border border-slate-700 rounded-2xl p-6 space-y-4">
                  <h2 className="text-lg font-heading font-bold text-white">
                    {editingEdu.id ? 'Edit Education' : 'Add Education'}
                  </h2>
                  <form onSubmit={handleSaveEducation} className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Institution / University *</label>
                      <input
                        type="text"
                        required
                        value={editingEdu.institution || ''}
                        onChange={(e) => setEditingEdu({ ...editingEdu, institution: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-lg glass-input text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Degree *</label>
                      <input
                        type="text"
                        required
                        value={editingEdu.degree || ''}
                        onChange={(e) => setEditingEdu({ ...editingEdu, degree: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-lg glass-input text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Field of Study</label>
                      <input
                        type="text"
                        value={editingEdu.field_of_study || ''}
                        onChange={(e) => setEditingEdu({ ...editingEdu, field_of_study: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-lg glass-input text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Start Year</label>
                        <input
                          type="text"
                          value={editingEdu.start_year || ''}
                          onChange={(e) => setEditingEdu({ ...editingEdu, start_year: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-lg glass-input text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase text-slate-400 mb-1">End Year</label>
                        <input
                          type="text"
                          value={editingEdu.end_year || ''}
                          onChange={(e) => setEditingEdu({ ...editingEdu, end_year: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-lg glass-input text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Grade / Honors</label>
                      <input
                        type="text"
                        value={editingEdu.grade || ''}
                        onChange={(e) => setEditingEdu({ ...editingEdu, grade: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-lg glass-input text-sm"
                      />
                    </div>
                    <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                      <button
                        type="button"
                        onClick={() => setIsEduModalOpen(false)}
                        className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-xs font-semibold"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 8: MESSAGES INBOX */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
                Contact Messages & Inquiries Inbox
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Submissions from your portfolio contact form stored directly in MySQL.
              </p>
            </div>

            {messages.length === 0 ? (
              <div className="glass-card p-12 text-center rounded-2xl border border-slate-800 text-slate-400">
                <MessageSquare className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                <p className="font-heading text-lg font-bold text-white">Inbox is empty</p>
                <p className="text-xs text-slate-500 mt-1">Incoming contact submissions will show up here.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`glass-card p-5 sm:p-6 rounded-2xl border transition-all ${
                      msg.is_read ? 'border-slate-800' : 'border-indigo-500/60 bg-indigo-950/20'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center font-bold text-cyan-400 font-heading">
                          {msg.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-heading font-bold text-white text-base flex items-center gap-2">
                            {msg.name}
                            {!msg.is_read && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500 text-white">
                                UNREAD
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-400 font-mono">
                            {msg.email} • {new Date(msg.created_at).toLocaleString()}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleMessageRead(msg.id, msg.is_read)}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300"
                        >
                          {msg.is_read ? 'Mark Unread' : 'Mark Read'}
                        </button>
                        <a
                          href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || 'Portfolio Inquiry')}`}
                          className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-xs font-semibold"
                        >
                          Reply Email
                        </a>
                        <button
                          onClick={() => handleDeleteMsg(msg.id)}
                          className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-sm text-slate-200 whitespace-pre-line leading-relaxed">
                      <div className="text-xs font-mono text-cyan-400 mb-1 font-semibold">Subject: {msg.subject}</div>
                      {msg.message}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 9: SITE SETTINGS */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
                Site Settings & Section Toggles
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Configure global title, meta descriptions, accent colors, and toggle sections.
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="glass-card p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">Site Title (SEO)</label>
                  <input
                    type="text"
                    value={settingsForm.site_title || ''}
                    onChange={(e) => setSettingsForm({ ...settingsForm, site_title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">Accent Color Hex</label>
                  <input
                    type="text"
                    value={settingsForm.accent_color || '#6366f1'}
                    onChange={(e) => setSettingsForm({ ...settingsForm, accent_color: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">Meta Description (SEO)</label>
                <textarea
                  rows={2}
                  value={settingsForm.site_description || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, site_description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">Footer Text</label>
                <input
                  type="text"
                  value={settingsForm.footer_text || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, footer_text: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                />
              </div>

              {/* Section Toggles */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                <div className="text-xs font-mono text-cyan-400 uppercase font-bold">Visible Portfolio Sections</div>
                
                {[
                  { key: 'enable_skills_section', label: 'Show Skills & Tech Stack Section' },
                  { key: 'enable_projects_section', label: 'Show Projects Showcase Section' },
                  { key: 'enable_experience_section', label: 'Show Work Experience Section' },
                  { key: 'enable_education_section', label: 'Show Education & Credentials Section' },
                  { key: 'enable_contact_form', label: 'Show Interactive Contact Form' },
                ].map((sec) => (
                  <div key={sec.key} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id={sec.key}
                      checked={settingsForm[sec.key] !== 'false'}
                      onChange={(e) => setSettingsForm({ ...settingsForm, [sec.key]: e.target.checked ? 'true' : 'false' })}
                      className="w-4 h-4 rounded text-indigo-600 bg-slate-900 border-slate-700"
                    />
                    <label htmlFor={sec.key} className="text-xs text-slate-300 font-medium cursor-pointer">
                      {sec.label}
                    </label>
                  </div>
                ))}
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-medium text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/30 hover:opacity-90 transition-opacity"
              >
                <Save className="w-4 h-4" />
                <span>Save Site Settings</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 10: SECURITY */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
                Admin Security & Password
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Update your administrator credentials for acrocoder.com.
              </p>
            </div>

            <form onSubmit={handleChangePassword} className="glass-card p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4 max-w-md">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Current Password</label>
                <input
                  type="password"
                  required
                  value={currentPw}
                  onChange={(e) => setCurrentPw(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">New Password</label>
                <input
                  type="password"
                  required
                  value={newPw}
                  onChange={(e) => setNewPw(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Confirm New Password</label>
                <input
                  type="password"
                  required
                  value={confirmPw}
                  onChange={(e) => setConfirmPw(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 hover:opacity-90 transition-opacity"
              >
                <KeyRound className="w-4 h-4" />
                <span>Update Password</span>
              </button>
            </form>
          </div>
        )}

      </main>
    </div>
  );
}
