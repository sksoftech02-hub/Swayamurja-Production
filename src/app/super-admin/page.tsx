'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  Users,
  Database,
  Activity,
  Plus,
  Lock,
  Unlock,
  Trash2,
  ExternalLink,
  RefreshCw,
  LogOut,
  ArrowLeft,
  KeyRound,
  FileSpreadsheet,
  Terminal,
  Clock,
  Globe,
  Sliders,
  Palette,
  Phone,
  MessageSquare,
  FolderGit2,
  CheckCircle2,
  TrendingUp,
  Save,
  Check
} from 'lucide-react';
import { THEME_PRESETS, SiteTheme } from '@/lib/types';

interface UserRecord {
  id: string;
  username: string;
  email: string;
  fullName: string;
  phone?: string;
  isActive: boolean;
  role: string;
  roleName: string;
  lastLoginAt?: string;
  createdAt: string;
}

interface AuditRecord {
  id: string;
  username: string;
  action: string;
  targetTable: string;
  targetId: string;
  oldValues: any;
  newValues: any;
  ipAddress: string;
  createdAt: string;
}

interface LeadRecord {
  id: string;
  name: string;
  phone: string;
  email?: string;
  service: string;
  monthlyBill?: string;
  recommendedKw?: string;
  city?: string;
  status: string;
  createdAt: string;
}

interface SystemStats {
  leadsCount: number;
  usersCount: number;
  projectsCount: number;
  articlesCount: number;
  testimonialsCount: number;
  auditLogsCount: number;
  database: string;
  engine: string;
  prismaStudioUrl: string;
  status: string;
}

export default function SuperAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [username, setUsername] = useState('sksoftech_master');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<'users' | 'leads' | 'content' | 'tariffs' | 'theme' | 'audit' | 'database'>('users');

  // Data states
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditRecord[]>([]);
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [cmsContent, setCmsContent] = useState<any>(null);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState('');

  // Form states for tariffs & theme
  const [tariffForm, setTariffForm] = useState({
    residentialUnitRate: 8.5,
    commercialUnitRate: 11.5,
    housingUnitRate: 9.2,
    pmSuryaGhar1Kw: 30000,
    pmSuryaGhar2Kw: 60000,
    pmSuryaGhar3KwMax: 78000,
  });

  // New User Modal State
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [newUserForm, setNewUserForm] = useState({
    username: '',
    email: '',
    fullName: '',
    phone: '',
    password: '',
    roleCode: 'ADMIN',
  });
  const [modalError, setModalError] = useState('');

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/super-admin/me');
      const data = await res.json();
      if (data.authenticated) {
        setIsAuthenticated(true);
        fetchData();
      } else {
        setIsAuthenticated(false);
      }
    } catch (e) {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    fetchUsers();
    fetchLeads();
    fetchAuditLogs();
    fetchStats();
    fetchCms();
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/super-admin/users');
      const data = await res.json();
      if (data.success && data.users) setUsers(data.users);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchLeads = async () => {
    try {
      const res = await fetch('/api/leads');
      const data = await res.json();
      if (data.success && data.leads) setLeads(data.leads);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAuditLogs = async () => {
    try {
      const res = await fetch('/api/super-admin/audit-logs');
      const data = await res.json();
      if (data.success && data.logs) setAuditLogs(data.logs);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/super-admin/stats');
      const data = await res.json();
      if (data.success && data.stats) setStats(data.stats);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCms = async () => {
    try {
      const res = await fetch('/api/content');
      const data = await res.json();
      if (data.success && data.content) {
        setCmsContent(data.content);
        if (data.content.tariffs) {
          setTariffForm(data.content.tariffs);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await fetch('/api/super-admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setPassword('');
        fetchData();
      } else {
        setAuthError(data.error || 'Authentication rejected. Access denied.');
      }
    } catch (e) {
      setAuthError('Connection error. Server unreachable.');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/super-admin/logout', { method: 'POST' });
    } catch (e) {}
    setIsAuthenticated(false);
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalError('');
    try {
      setActionLoading(true);
      const res = await fetch('/api/super-admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUserForm),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setShowCreateModal(false);
        setNewUserForm({
          username: '',
          email: '',
          fullName: '',
          phone: '',
          password: '',
          roleCode: 'ADMIN',
        });
        fetchUsers();
        fetchAuditLogs();
        fetchStats();
      } else {
        setModalError(data.error || 'Failed to create user account.');
      }
    } catch (e) {
      setModalError('Connection failed.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleFreeze = async (user: UserRecord) => {
    if (!confirm(`Are you sure you want to ${user.isActive ? 'FREEZE' : 'ACTIVATE'} user ${user.username}?`)) {
      return;
    }
    try {
      await fetch('/api/super-admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: user.id, isActive: !user.isActive }),
      });
      fetchUsers();
      fetchAuditLogs();
    } catch (e) {
      alert('Action failed.');
    }
  };

  const handleDeleteUser = async (user: UserRecord) => {
    if (!confirm(`CAUTION: Permanently delete admin account "${user.username}"?`)) {
      return;
    }
    try {
      const res = await fetch(`/api/super-admin/users?id=${user.id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        fetchUsers();
        fetchAuditLogs();
        fetchStats();
      } else {
        alert(data.error || 'Failed to delete user.');
      }
    } catch (e) {
      alert('Delete failed.');
    }
  };

  const handleSaveTariffs = async () => {
    if (!cmsContent) return;
    try {
      setActionLoading(true);
      const updated = { ...cmsContent, tariffs: tariffForm };
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      const data = await res.json();
      if (data.success) {
        setCmsContent(data.content);
        setSaveSuccess('✓ Solar tariffs and subsidies updated live!');
        setTimeout(() => setSaveSuccess(''), 4000);
      }
    } catch (e) {
      alert('Save failed.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleApplyThemePreset = async (presetTheme: SiteTheme) => {
    if (!cmsContent) return;
    try {
      setActionLoading(true);
      const updated = { ...cmsContent, theme: presetTheme };
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      const data = await res.json();
      if (data.success) {
        setCmsContent(data.content);
        try {
          localStorage.setItem('swayamurja_cms_updated', Date.now().toString());
        } catch (_) {}
        setSaveSuccess(`✓ Theme palette updated to ${presetTheme.name}!`);
        setTimeout(() => setSaveSuccess(''), 4000);
      }
    } catch (e) {
      alert('Failed to update theme.');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center font-mono">
        <div className="flex items-center gap-3">
          <RefreshCw className="w-5 h-5 animate-spin text-cyan-400" />
          <span>INITIALIZING SK SOFTECH ROOT INTERFACE...</span>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // VIEW 1: SUPER ADMIN LOGIN SCREEN
  // ==========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-center items-center px-4 font-sans">
        <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-2xl p-8 shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">SK SOFTECH</h1>
              <p className="text-xs text-cyan-400 font-mono">ROOT SUPER ADMIN CONSOLE</p>
            </div>
          </div>

          <p className="text-xs text-slate-400 text-center mb-6 leading-relaxed">
            Restricted Master Access. Role management, PostgreSQL telemetry & audit engine for SwayamUrja Renewable Energy Pvt. Ltd.
          </p>

          {authError && (
            <div className="mb-6 p-3.5 bg-red-950/40 border border-red-800/60 rounded-xl text-red-300 text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono">
                Operator Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="sksoftech_master"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 text-sm focus:outline-hidden focus:border-cyan-400 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono">
                Master Security Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter master password (e.g. sksoftech@2026)"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 text-sm focus:outline-hidden focus:border-cyan-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm shadow-lg shadow-cyan-950/40 transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <Terminal className="w-4 h-4" />
              Authenticate Root Session
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
            <Link href="/" className="hover:text-cyan-400 flex items-center gap-1.5 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />
              Visitor Website
            </Link>
            <Link href="/admin" className="hover:text-emerald-400 flex items-center gap-1.5 transition-colors">
              SwayamUrja Admin
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // VIEW 2: AUTHENTICATED SUPER ADMIN DASHBOARD
  // ==========================================================================
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Root Navigation Bar */}
      <header className="border-b border-slate-800 bg-slate-900/80 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm tracking-wide text-white">SK SOFTECH ROOT CONSOLE</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-950 border border-cyan-800 text-cyan-400">
                  SUPER ADMIN
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                PostgreSQL 18.2 | SwayamUrja Renewable Energy Platform
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="http://localhost:5555"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-950 border border-indigo-700/60 text-indigo-300 hover:text-white hover:bg-indigo-900 text-xs font-semibold transition-colors"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-indigo-400" />
              Prisma Studio (:5555)
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>

            <button
              onClick={fetchData}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <Link
              href="/admin"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950 border border-emerald-800 text-emerald-300 hover:bg-emerald-900 text-xs font-medium transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              SwayamUrja Admin
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/60 border border-red-800 text-red-300 hover:bg-red-900 text-xs font-semibold transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              Exit Root
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-6">
        {saveSuccess && (
          <div className="p-4 rounded-xl bg-emerald-900/60 border border-emerald-700 text-emerald-200 text-xs font-bold flex items-center gap-2 shadow-lg">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{saveSuccess}</span>
          </div>
        )}

        {/* Top Telemetry KPI HUD */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>PostgreSQL Leads</span>
              <Activity className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-white font-mono">{stats?.leadsCount ?? '...'}</div>
            <div className="text-[11px] text-emerald-400 mt-1">● CRM Funnel Active</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Staff Accounts</span>
              <Users className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-bold text-white font-mono">{stats?.usersCount ?? '...'}</div>
            <div className="text-[11px] text-cyan-400 mt-1">● Super & Staff Admins</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Commissioned Plants</span>
              <Database className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-white font-mono">{stats?.projectsCount ?? '...'}</div>
            <div className="text-[11px] text-amber-400 mt-1">● 13 MW Solapur & C&I</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Audit Log Trail</span>
              <Clock className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-white font-mono">{stats?.auditLogsCount ?? '...'}</div>
            <div className="text-[11px] text-purple-400 mt-1">● Forensic Events Logged</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-slate-800 flex gap-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('users')}
            className={`pb-3 text-xs font-bold font-mono tracking-wider flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'users'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            STAFF ADMINISTRATION
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            className={`pb-3 text-xs font-bold font-mono tracking-wider flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'leads'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Activity className="w-4 h-4" />
            INBOUND LEADS CRM
          </button>

          <button
            onClick={() => setActiveTab('tariffs')}
            className={`pb-3 text-xs font-bold font-mono tracking-wider flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'tariffs'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Sliders className="w-4 h-4" />
            TARIFFS & SUBSIDIES
          </button>

          <button
            onClick={() => setActiveTab('theme')}
            className={`pb-3 text-xs font-bold font-mono tracking-wider flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'theme'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Palette className="w-4 h-4" />
            COLOR & THEME STUDIO
          </button>

          <button
            onClick={() => setActiveTab('content')}
            className={`pb-3 text-xs font-bold font-mono tracking-wider flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'content'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            VISITOR CONTENT
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`pb-3 text-xs font-bold font-mono tracking-wider flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'audit'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            SECURITY AUDIT TRAIL
          </button>

          <button
            onClick={() => setActiveTab('database')}
            className={`pb-3 text-xs font-bold font-mono tracking-wider flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'database'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Database className="w-4 h-4" />
            POSTGRESQL INFRASTRUCTURE
          </button>
        </div>

        {/* TAB 1: USERS ADMINISTRATION */}
        {activeTab === 'users' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white">SwayamUrja Staff & Admin Accounts</h2>
                <p className="text-xs text-slate-400">
                  Manage business operators who have access to the `/admin` Lead CRM and Visitor Content CRUD.
                </p>
              </div>

              <button
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Plus className="w-4 h-4" />
                Create New Admin
              </button>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase font-mono">
                    <tr>
                      <th className="px-4 py-3.5">Operator</th>
                      <th className="px-4 py-3.5">Email / Phone</th>
                      <th className="px-4 py-3.5">Assigned Role</th>
                      <th className="px-4 py-3.5">Status</th>
                      <th className="px-4 py-3.5">Created Date</th>
                      <th className="px-4 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {users.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="px-4 py-3.5 font-medium text-white">
                          <div className="font-bold">{u.fullName}</div>
                          <div className="text-[11px] text-slate-400 font-mono">@{u.username}</div>
                        </td>
                        <td className="px-4 py-3.5 text-slate-300">
                          <div>{u.email}</div>
                          <div className="text-[11px] text-slate-500">{u.phone || 'No phone'}</div>
                        </td>
                        <td className="px-4 py-3.5">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold ${
                              u.role === 'SUPER_ADMIN'
                                ? 'bg-cyan-950 border border-cyan-800 text-cyan-400'
                                : 'bg-emerald-950 border border-emerald-800 text-emerald-400'
                            }`}
                          >
                            {u.roleName || u.role}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          {u.isActive ? (
                            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium text-[11px]">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 text-red-400 font-medium text-[11px]">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                              Frozen
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3.5 text-slate-400 font-mono text-[11px]">
                          {new Date(u.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3.5 text-right">
                          {u.role !== 'SUPER_ADMIN' ? (
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleToggleFreeze(u)}
                                className={`p-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                                  u.isActive
                                    ? 'bg-amber-950/40 border-amber-800 text-amber-400 hover:bg-amber-900'
                                    : 'bg-emerald-950/40 border-emerald-800 text-emerald-400 hover:bg-emerald-900'
                                }`}
                                title={u.isActive ? 'Freeze Staff Account' : 'Activate Staff Account'}
                              >
                                {u.isActive ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                              </button>

                              <button
                                onClick={() => handleDeleteUser(u)}
                                className="p-1.5 rounded-lg bg-red-950/40 border border-red-800 text-red-400 hover:bg-red-900 transition-colors cursor-pointer"
                                title="Delete Staff Account"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <span className="text-[11px] text-slate-600 font-mono">ROOT PROTECTED</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INBOUND LEADS CRM (SUPER ADMIN VISIBILITY) */}
        {activeTab === 'leads' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white">Inbound Customer Leads CRM</h2>
                <p className="text-xs text-slate-400">
                  Full visibility over prospective inquiries submitted by homeowners and factory owners.
                </p>
              </div>

              <div className="text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800 px-3 py-1.5 rounded-lg">
                Total Leads: {leads.length}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase font-mono">
                    <tr>
                      <th className="px-4 py-3">Client Name</th>
                      <th className="px-4 py-3">Service & City</th>
                      <th className="px-4 py-3">Monthly Bill</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Contact Actions</th>
                      <th className="px-4 py-3">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {leads.map((l) => (
                      <tr key={l.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="px-4 py-3.5 font-medium text-white">
                          <div className="font-bold">{l.name}</div>
                          <div className="text-[11px] text-slate-400 font-mono">{l.phone}</div>
                        </td>
                        <td className="px-4 py-3.5 text-slate-300">
                          <div>{l.service}</div>
                          <div className="text-[11px] text-slate-500">{l.city || 'Maharashtra'}</div>
                        </td>
                        <td className="px-4 py-3.5 text-amber-400 font-mono font-bold">
                          {l.monthlyBill || 'N/A'}
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300">
                            {l.status}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2">
                            <a
                              href={`tel:${l.phone}`}
                              className="p-1.5 rounded-lg bg-emerald-950 border border-emerald-800 text-emerald-400 hover:bg-emerald-900"
                              title="Direct Phone Call"
                            >
                              <Phone className="w-3.5 h-3.5" />
                            </a>
                            <a
                              href={`https://wa.me/91${l.phone.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1.5 rounded-lg bg-green-950 border border-green-800 text-green-400 hover:bg-green-900"
                              title="Chat on WhatsApp"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </td>
                        <td className="px-4 py-3.5 text-slate-500 font-mono text-[11px]">
                          {new Date(l.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TARIFFS & SUBSIDIES (MOVED TO SUPER ADMIN) */}
        {activeTab === 'tariffs' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-white">Solar Tariffs & Subsidy Slabs</h2>
              <p className="text-xs text-slate-400">
                Official DISCOM (MSEDCL) power unit tariffs and PM Surya Ghar government direct bank subsidy slabs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Electricity Grid Rates */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-amber-400" />
                  MSEDCL Grid Tariffs (₹ per Unit)
                </h3>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Residential Tariff (₹/kWh)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={tariffForm.residentialUnitRate}
                    onChange={(e) => setTariffForm({ ...tariffForm, residentialUnitRate: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white font-mono text-sm focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Commercial & Industrial C&I Tariff (₹/kWh)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={tariffForm.commercialUnitRate}
                    onChange={(e) => setTariffForm({ ...tariffForm, commercialUnitRate: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white font-mono text-sm focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Housing Society Common Meter Tariff (₹/kWh)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={tariffForm.housingUnitRate}
                    onChange={(e) => setTariffForm({ ...tariffForm, housingUnitRate: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white font-mono text-sm focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* PM Surya Ghar DBT Subsidies */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  PM Surya Ghar: Muft Bijli Yojana Subsidies (₹)
                </h3>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">1 kW Direct Bank Transfer Subsidy (₹)</label>
                  <input
                    type="number"
                    value={tariffForm.pmSuryaGhar1Kw}
                    onChange={(e) => setTariffForm({ ...tariffForm, pmSuryaGhar1Kw: parseInt(e.target.value, 10) || 0 })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white font-mono text-sm focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">2 kW Direct Bank Transfer Subsidy (₹)</label>
                  <input
                    type="number"
                    value={tariffForm.pmSuryaGhar2Kw}
                    onChange={(e) => setTariffForm({ ...tariffForm, pmSuryaGhar2Kw: parseInt(e.target.value, 10) || 0 })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white font-mono text-sm focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">3 kW & Above Maximum Subsidy (₹)</label>
                  <input
                    type="number"
                    value={tariffForm.pmSuryaGhar3KwMax}
                    onChange={(e) => setTariffForm({ ...tariffForm, pmSuryaGhar3KwMax: parseInt(e.target.value, 10) || 0 })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white font-mono text-sm focus:border-cyan-400"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSaveTariffs}
                disabled={actionLoading}
                className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg"
              >
                {actionLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save Live Tariffs & Subsidies
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: COLOR & THEME STUDIO (MOVED TO SUPER ADMIN) */}
        {activeTab === 'theme' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-white">Color & Brand Theme Studio</h2>
              <p className="text-xs text-slate-400">
                Switch website styling across all visitors’ browsers in real time.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {THEME_PRESETS.map((preset) => {
                const isActive = cmsContent?.theme?.id === preset.id;
                return (
                  <div
                    key={preset.id}
                    className={`bg-slate-900 border rounded-2xl p-5 flex flex-col justify-between transition-all ${
                      isActive ? 'border-amber-400 shadow-xl shadow-amber-950/20' : 'border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-bold text-sm text-white">{preset.name}</span>
                        {isActive && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400 text-slate-950">
                            ACTIVE
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 mb-4">
                        <span className="w-6 h-6 rounded-full border border-slate-700" style={{ backgroundColor: preset.primaryColor }} title="Primary" />
                        <span className="w-6 h-6 rounded-full border border-slate-700" style={{ backgroundColor: preset.secondaryColor }} title="Secondary" />
                        <span className="w-6 h-6 rounded-full border border-slate-700" style={{ backgroundColor: preset.accentColor }} title="Accent" />
                      </div>

                      <p className="text-[11px] text-slate-400 mb-4">{preset.tagline}</p>
                    </div>

                    <button
                      onClick={() => handleApplyThemePreset(preset)}
                      disabled={actionLoading || isActive}
                      className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                          : 'bg-cyan-600 hover:bg-cyan-500 text-white'
                      }`}
                    >
                      {isActive ? <Check className="w-3.5 h-3.5" /> : null}
                      {isActive ? 'Currently Active' : 'Apply Theme'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 5: VISITOR CONTENT OVERVIEW */}
        {activeTab === 'content' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-white">Visitor Content CRUD Modules</h2>
              <p className="text-xs text-slate-400">
                All published content is accessible to both SwayamUrja staff and Super Admin.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <FolderGit2 className="w-6 h-6 text-emerald-400 mb-2" />
                <h3 className="font-bold text-white text-sm">Projects CRUD</h3>
                <p className="text-xs text-slate-400 mb-3">{cmsContent?.projects?.length || 6} Commissioned Plants</p>
                <Link
                  href="/admin"
                  className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  Manage in Admin Portal →
                </Link>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <FileSpreadsheet className="w-6 h-6 text-amber-400 mb-2" />
                <h3 className="font-bold text-white text-sm">Blog Articles</h3>
                <p className="text-xs text-slate-400 mb-3">{cmsContent?.articles?.length || 3} Published Policy Guides</p>
                <Link
                  href="/admin"
                  className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  Manage in Admin Portal →
                </Link>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <Activity className="w-6 h-6 text-purple-400 mb-2" />
                <h3 className="font-bold text-white text-sm">Feedback Reviews</h3>
                <p className="text-xs text-slate-400 mb-3">{cmsContent?.testimonials?.length || 4} Verified Ratings</p>
                <Link
                  href="/admin"
                  className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  Manage in Admin Portal →
                </Link>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <Users className="w-6 h-6 text-cyan-400 mb-2" />
                <h3 className="font-bold text-white text-sm">Careers & Jobs</h3>
                <p className="text-xs text-slate-400 mb-3">{cmsContent?.openJobs?.length || 3} Active Openings</p>
                <Link
                  href="/admin"
                  className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  Manage in Admin Portal →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: AUDIT LOGS */}
        {activeTab === 'audit' && (
          <div className="space-y-4">
            <div>
              <h2 className="text-base font-bold text-white">Immutable Security & Event Audit Logs</h2>
              <p className="text-xs text-slate-400">
                Direct forensic event stream stored in PostgreSQL `audit_logs` table.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase">
                    <tr>
                      <th className="px-4 py-3">Timestamp</th>
                      <th className="px-4 py-3">Operator</th>
                      <th className="px-4 py-3">Action</th>
                      <th className="px-4 py-3">Target Table</th>
                      <th className="px-4 py-3">Details / Diff</th>
                      <th className="px-4 py-3">Source IP</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {auditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="px-4 py-3 text-slate-400 text-[11px] whitespace-nowrap">
                          {new Date(log.createdAt).toLocaleString()}
                        </td>
                        <td className="px-4 py-3 font-bold text-cyan-300">
                          {log.username || 'System'}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-0.5 rounded-sm text-[10px] font-bold ${
                              log.action.includes('DELETE')
                                ? 'bg-red-950 text-red-400 border border-red-800'
                                : log.action.includes('CREATE') || log.action.includes('INSERT')
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            {log.action}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-300">{log.targetTable}</td>
                        <td className="px-4 py-3 text-[11px] text-slate-400 max-w-xs truncate">
                          {log.newValues ? JSON.stringify(log.newValues) : '-'}
                        </td>
                        <td className="px-4 py-3 text-slate-500 text-[11px]">{log.ipAddress}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: DATABASE INFRASTRUCTURE */}
        {activeTab === 'database' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-white">PostgreSQL 18.2 Infrastructure Hub</h2>
              <p className="text-xs text-slate-400">
                Relational schema parameters, live telemetry, and visual management consoles.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Prisma Studio Card */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-4">
                    <FileSpreadsheet className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">Prisma Studio Visual GUI</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    A dedicated spreadsheet interface running on port 5555. Allows you to inspect all 15 relational PostgreSQL tables, filter leads, edit CMS rows, and export data with zero SQL knowledge.
                  </p>
                </div>

                <a
                  href="http://localhost:5555"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  Launch Prisma Studio in New Tab
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Database Schema Overview */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                  <Database className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">swayamurja_db Configuration</h3>
                <div className="space-y-2 text-xs font-mono text-slate-300">
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-500">Database Engine:</span>
                    <span>PostgreSQL 18.2 (x64)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-500">Host & Port:</span>
                    <span>127.0.0.1:5432</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-500">Target Database:</span>
                    <span>swayamurja_db</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-500">ORM Provider:</span>
                    <span>Prisma ORM v6.4.1</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Connection Pool:</span>
                    <span className="text-emerald-400">● 10 Active Worker Pools</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* CREATE NEW ADMIN MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-cyan-400" />
                Create SwayamUrja Admin Account
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            </div>

            {modalError && (
              <div className="p-3 bg-red-950/40 border border-red-800 rounded-xl text-red-300 text-xs">
                {modalError}
              </div>
            )}

            <form onSubmit={handleCreateUser} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anand Kulkarni"
                  value={newUserForm.fullName}
                  onChange={(e) => setNewUserForm({ ...newUserForm, fullName: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-hidden focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1 font-mono">Username</label>
                <input
                  type="text"
                  required
                  placeholder="anand_solar"
                  value={newUserForm.username}
                  onChange={(e) => setNewUserForm({ ...newUserForm, username: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-hidden focus:border-cyan-400 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="anand@swayamurja.com"
                  value={newUserForm.email}
                  onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-hidden focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Phone Number (Optional)</label>
                <input
                  type="text"
                  placeholder="+91 98220 12345"
                  value={newUserForm.phone}
                  onChange={(e) => setNewUserForm({ ...newUserForm, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-hidden focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Initial Staff Password</label>
                <input
                  type="password"
                  required
                  placeholder="Create secure password"
                  value={newUserForm.password}
                  onChange={(e) => setNewUserForm({ ...newUserForm, password: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-hidden focus:border-cyan-400"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold cursor-pointer flex items-center gap-1.5"
                >
                  {actionLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : null}
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
