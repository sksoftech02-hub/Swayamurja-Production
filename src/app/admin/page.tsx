'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Lead, 
  SiteContent, 
  CMSProject, 
  CMSTestimonial, 
  CMSArticle, 
  CMSJob, 
  SiteTheme, 
  THEME_PRESETS, 
  DEFAULT_THEME,
  CMSClient,
  CMSTeamMember,
  AboutUsContent 
} from '@/lib/types';
import { 
  ShieldCheck, 
  Search, 
  Download, 
  RefreshCw, 
  Phone, 
  MessageSquare, 
  Mail, 
  ArrowLeft, 
  Lock, 
  Filter, 
  CheckCircle2, 
  BarChart3, 
  Sliders, 
  Briefcase, 
  Building2,
  Upload,
  UserPlus, 
  Save, 
  AlertCircle,
  Users,
  FolderGit2,
  Star,
  BookOpen,
  Plus,
  Trash2,
  Edit,
  X,
  TrendingUp,
  Activity,
  Target,
  Award,
  Zap,
  MapPin,
  Clock,
  Calendar,
  ExternalLink,
  Palette,
  Check,
  Eye,
  Sparkles
} from 'lucide-react';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState<boolean>(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState<'dashboard' | 'leads' | 'clients' | 'about' | 'projects' | 'articles' | 'testimonials' | 'jobs' | 'stats' | 'tariffs' | 'contact' | 'theme'>('dashboard');

  // Theme Studio State
  const [themeForm, setThemeForm] = useState<SiteTheme>(DEFAULT_THEME);

  // Leads CRM State
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [statusUpdatingId, setStatusUpdatingId] = useState<string | null>(null);

  // CMS Content State
  const [cmsContent, setCmsContent] = useState<SiteContent | null>(null);
  const [savingCms, setSavingCms] = useState(false);
  const [cmsSaveMessage, setCmsSaveMessage] = useState('');

  // --- CRUD MODAL STATES ---
  // Project CRUD Modal
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectForm, setProjectForm] = useState<Omit<CMSProject, 'id'>>({
    category: 'utility',
    titleEn: '',
    titleMr: '',
    capacity: '',
    locationEn: '',
    locationMr: '',
    image: FALLBACK_IMG,
    highlightEn: '',
    highlightMr: ''
  });

  // Blog Article CRUD Modal
  const [articleModalOpen, setArticleModalOpen] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [articleForm, setArticleForm] = useState<Omit<CMSArticle, 'id'>>({
    titleEn: '',
    titleMr: '',
    category: 'Government Policy',
    readTime: '4 min read',
    publishDate: 'Nov 2026',
    image: FALLBACK_IMG,
    excerptEn: '',
    excerptMr: '',
    contentEn: '',
    contentMr: ''
  });

  // Testimonial CRUD Modal
  const [testimonialModalOpen, setTestimonialModalOpen] = useState(false);
  const [editingTestimonialId, setEditingTestimonialId] = useState<string | null>(null);
  const [testimonialForm, setTestimonialForm] = useState<Omit<CMSTestimonial, 'id'>>({
    clientName: '',
    roleOrg: '',
    city: '',
    rating: 5,
    systemSize: '',
    savingsText: '',
    commentEn: '',
    commentMr: ''
  });

  // Job CRUD Modal
  const [jobModalOpen, setJobModalOpen] = useState(false);

  // Clients Slider CRUD State
  const [showClientModal, setShowClientModal] = useState<boolean>(false);
  const [clientForm, setClientForm] = useState({ name: '', logo: '', website: '' });
  const [uploadingClientLogo, setUploadingClientLogo] = useState<boolean>(false);

  // About Us & Team CRUD State
  const [aboutUsForm, setAboutUsForm] = useState<AboutUsContent | null>(null);
  const [showTeamModal, setShowTeamModal] = useState<boolean>(false);
  const [teamForm, setTeamForm] = useState({
    name: '',
    designationEn: '',
    designationMr: '',
    bioEn: '',
    bioMr: '',
    photo: '',
    linkedin: '',
  });
  const [uploadingCeoPhoto, setUploadingCeoPhoto] = useState<boolean>(false);
  const [uploadingTeamPhoto, setUploadingTeamPhoto] = useState<boolean>(false);
  const [linkedInUrl, setLinkedInUrl] = useState<string>('https://www.linkedin.com/company/swayamurja-renewable-energy-pvt-ltd/');

  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [jobForm, setJobForm] = useState<Omit<CMSJob, 'id'>>({
    titleEn: '',
    titleMr: '',
    department: 'Engineering & Design',
    experienceEn: '2-4 Years',
    experienceMr: '२-४ वर्षे अनुभव',
    locationEn: 'Pune (Baner HQ)',
    locationMr: 'पुणे (बाणेर मुख्यालय)',
    skills: '',
    isActive: true
  });

  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch('/api/admin/me');
        const data = await res.json();
        if (data.authenticated) {
          setIsAuthenticated(true);
          setIsSuperAdmin(!!data.isSuperAdmin);
          fetchLeads();
          fetchCmsContent();
        } else {
          setIsAuthenticated(false);
          setIsSuperAdmin(false);
        }
      } catch (e) {
        setIsAuthenticated(false);
      }
    }
    checkSession();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setPassword('');
        setAuthError('');
        fetchLeads();
        fetchCmsContent();
      } else {
        setAuthError(data.error || 'Invalid credentials. Access denied.');
      }
    } catch (err) {
      setAuthError('Connection error. Could not reach authentication server.');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch (e) {
      console.error('Logout error:', e);
    }
    setIsAuthenticated(false);
    setLeads([]);
  };

  const fetchLeads = async () => {
    setLoadingLeads(true);
    try {
      const res = await fetch('/api/leads');
      const data = await res.json();
      if (data.success && data.leads) setLeads(data.leads);
    } catch (err) {
      console.error('Failed to load leads:', err);
    } finally {
      setLoadingLeads(false);
    }
  };

  useEffect(() => {
    if (cmsContent?.aboutUs && !aboutUsForm) {
      setAboutUsForm(cmsContent.aboutUs);
    }
    if (cmsContent?.blogLinkedInUrl) {
      setLinkedInUrl(cmsContent.blogLinkedInUrl);
    }
  }, [cmsContent]);

  const fetchCmsContent = async () => {
    try {
      const res = await fetch('/api/content', { cache: 'no-store' });
      const data = await res.json();
      if (data.success && data.content) {
        setCmsContent(data.content);
        if (data.content.theme) {
          setThemeForm(data.content.theme);
        }
      }
    } catch (err) {
      console.error('Failed to load CMS content:', err);
    }
  };

  // Persistent Save
  const saveCmsChanges = async (customContent?: SiteContent) => {
    const toSave = customContent || cmsContent;
    if (!toSave) return;
    setSavingCms(true);
    setCmsSaveMessage('');
    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(toSave),
      });
      const data = await res.json();
      if (data.success) {
        setCmsContent(data.content);
        // Signal visitor tabs in the same browser to refresh instantly
        try {
          localStorage.setItem('swayamurja_cms_updated', Date.now().toString());
        } catch (_) {}
        setCmsSaveMessage('✓ Content saved! Updates are now LIVE on the visitor website.');
        setTimeout(() => setCmsSaveMessage(''), 4500);
      }
    } catch (err) {
      console.error('Failed to save CMS:', err);
      setCmsSaveMessage('Failed to save changes. Please try again.');
    } finally {
      setSavingCms(false);
    }
  };

  // ==========================================
  // PROJECT CRUD
  // ==========================================
    // ── CLIENT & TEAM CRUD HANDLERS ──
  const handleUploadClientLogo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingClientLogo(true);
      const fd = new FormData();
      fd.append('file', file);
      fd.append('folder', 'clients');
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.success && data.url) {
        setClientForm(prev => ({ ...prev, logo: data.url }));
      }
    } catch (err) {
      alert('Upload error');
    } finally {
      setUploadingClientLogo(false);
    }
  };

  const handleSaveClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientForm.name || !clientForm.logo) {
      alert('Please enter client name and logo');
      return;
    }
    const currentClients = cmsContent?.clients || [];
    const newClient: CMSClient = {
      id: `c-${Date.now()}`,
      name: clientForm.name,
      logo: clientForm.logo,
      website: clientForm.website,
      order: currentClients.length + 1
    };
    const updated = [...currentClients, newClient];
    await saveCmsChanges({ ...cmsContent!, clients: updated });
    setShowClientModal(false);
    setClientForm({ name: '', logo: '', website: '' });
  };

  const handleDeleteClient = async (id: string) => {
    if (!confirm('Remove this client from the slideshow?')) return;
    const currentClients = cmsContent?.clients || [];
    const updated = currentClients.filter((c: any) => c.id !== id);
    await saveCmsChanges({ ...cmsContent!, clients: updated });
  };

  const handleUploadCeoPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingCeoPhoto(true);
      const fd = new FormData();
      fd.append('file', file);
      fd.append('folder', 'team');
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.success && data.url) {
        setAboutUsForm((prev: any) => ({
          ...prev,
          mdCeoMessage: { ...prev.mdCeoMessage, photo: data.url }
        }));
      }
    } catch (err) {
      alert('Upload error');
    } finally {
      setUploadingCeoPhoto(false);
    }
  };

  const handleSaveAboutUs = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aboutUsForm || !cmsContent) return;
    await saveCmsChanges({ ...cmsContent, aboutUs: aboutUsForm });
  };

  const handleUploadTeamPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingTeamPhoto(true);
      const fd = new FormData();
      fd.append('file', file);
      fd.append('folder', 'team');
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.success && data.url) {
        setTeamForm(prev => ({ ...prev, photo: data.url }));
      }
    } catch (err) {
      alert('Upload error');
    } finally {
      setUploadingTeamPhoto(false);
    }
  };

  const handleSaveTeamMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamForm.name || !teamForm.designationEn || !aboutUsForm || !cmsContent) return;
    const currentTeam = aboutUsForm.teamMembers || [];
    const newMember: CMSTeamMember = {
      id: `tm-${Date.now()}`,
      name: teamForm.name,
      designationEn: teamForm.designationEn,
      designationMr: teamForm.designationMr || teamForm.designationEn,
      bioEn: teamForm.bioEn,
      bioMr: teamForm.bioMr || teamForm.bioEn,
      photo: teamForm.photo || '/uploads/team/rahul-nalawade.jpg',
      linkedin: teamForm.linkedin,
      order: currentTeam.length + 1
    };
    const updatedAbout = {
      ...aboutUsForm,
      teamMembers: [...currentTeam, newMember]
    };
    setAboutUsForm(updatedAbout);
    await saveCmsChanges({ ...cmsContent, aboutUs: updatedAbout });
    setShowTeamModal(false);
    setTeamForm({ name: '', designationEn: '', designationMr: '', bioEn: '', bioMr: '', photo: '', linkedin: '' });
  };

  const handleDeleteTeamMember = async (id: string) => {
    if (!confirm('Remove this team member / designation?')) return;
    if (!aboutUsForm || !cmsContent) return;
    const currentTeam = aboutUsForm.teamMembers || [];
    const updated = currentTeam.filter((m: any) => m.id !== id);
    const updatedAbout = { ...aboutUsForm, teamMembers: updated };
    setAboutUsForm(updatedAbout);
    await saveCmsChanges({ ...cmsContent, aboutUs: updatedAbout });
  };

  const handleSaveLinkedInUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkedInUrl || !cmsContent) return;
    await saveCmsChanges({ ...cmsContent, blogLinkedInUrl: linkedInUrl });
  };

  const openNewProjectModal = () => {
    setEditingProjectId(null);
    setProjectForm({
      category: 'utility',
      titleEn: '',
      titleMr: '',
      capacity: '',
      locationEn: '',
      locationMr: '',
      image: FALLBACK_IMG,
      highlightEn: '',
      highlightMr: ''
    });
    setProjectModalOpen(true);
  };

  const openEditProjectModal = (proj: CMSProject) => {
    setEditingProjectId(proj.id);
    setProjectForm({
      category: proj.category,
      titleEn: proj.titleEn,
      titleMr: proj.titleMr,
      capacity: proj.capacity,
      locationEn: proj.locationEn,
      locationMr: proj.locationMr,
      image: proj.image,
      highlightEn: proj.highlightEn,
      highlightMr: proj.highlightMr
    });
    setProjectModalOpen(true);
  };

  const handleSaveProject = async () => {
    if (!cmsContent || !projectForm.titleEn.trim() || !projectForm.capacity.trim()) {
      alert('Please enter at least a Project Title and Capacity.');
      return;
    }

    let updatedProjects: CMSProject[];
    if (editingProjectId) {
      updatedProjects = cmsContent.projects.map((p) =>
        p.id === editingProjectId
          ? {
              ...projectForm,
              id: editingProjectId,
              titleMr: projectForm.titleMr.trim() || projectForm.titleEn.trim(),
              locationMr: projectForm.locationMr.trim() || projectForm.locationEn.trim(),
              highlightMr: projectForm.highlightMr.trim() || projectForm.highlightEn.trim(),
            }
          : p
      );
    } else {
      const newProj: CMSProject = {
        ...projectForm,
        id: `proj-${Date.now()}`,
        titleMr: projectForm.titleMr.trim() || projectForm.titleEn.trim(),
        locationMr: projectForm.locationMr.trim() || projectForm.locationEn.trim(),
        highlightMr: projectForm.highlightMr.trim() || projectForm.highlightEn.trim(),
      };
      updatedProjects = [newProj, ...cmsContent.projects];
    }

    const updatedContent = { ...cmsContent, projects: updatedProjects };
    setCmsContent(updatedContent);
    setProjectModalOpen(false);
    await saveCmsChanges(updatedContent);
  };

  const handleDeleteProject = async (id: string) => {
    if (!cmsContent) return;
    if (confirm('Are you sure you want to delete this project from the website?')) {
      const updatedContent = {
        ...cmsContent,
        projects: cmsContent.projects.filter((p) => p.id !== id)
      };
      setCmsContent(updatedContent);
      await saveCmsChanges(updatedContent);
    }
  };

  // ==========================================
  // BLOG ARTICLE CRUD
  // ==========================================
  const openNewArticleModal = () => {
    setEditingArticleId(null);
    setArticleForm({
      titleEn: '',
      titleMr: '',
      category: 'Government Policy',
      readTime: '4 min read',
      publishDate: 'Nov 2026',
      image: FALLBACK_IMG,
      excerptEn: '',
      excerptMr: '',
      contentEn: '',
      contentMr: ''
    });
    setArticleModalOpen(true);
  };

  const openEditArticleModal = (art: CMSArticle) => {
    setEditingArticleId(art.id);
    setArticleForm({
      titleEn: art.titleEn,
      titleMr: art.titleMr,
      category: art.category,
      readTime: art.readTime,
      publishDate: art.publishDate,
      image: art.image,
      excerptEn: art.excerptEn,
      excerptMr: art.excerptMr,
      contentEn: art.contentEn,
      contentMr: art.contentMr
    });
    setArticleModalOpen(true);
  };

  const handleSaveArticle = async () => {
    if (!cmsContent || !articleForm.titleEn.trim()) {
      alert('Please enter an Article Title.');
      return;
    }

    let updatedArticles: CMSArticle[];
    if (editingArticleId) {
      updatedArticles = cmsContent.articles.map((a) =>
        a.id === editingArticleId
          ? {
              ...articleForm,
              id: editingArticleId,
              titleMr: articleForm.titleMr.trim() || articleForm.titleEn.trim(),
              excerptMr: articleForm.excerptMr.trim() || articleForm.excerptEn.trim(),
              contentMr: articleForm.contentMr.trim() || articleForm.contentEn.trim()
            }
          : a
      );
    } else {
      const newArt: CMSArticle = {
        ...articleForm,
        id: `art-${Date.now()}`,
        titleMr: articleForm.titleMr.trim() || articleForm.titleEn.trim(),
        excerptMr: articleForm.excerptMr.trim() || articleForm.excerptEn.trim(),
        contentMr: articleForm.contentMr.trim() || articleForm.contentEn.trim()
      };
      updatedArticles = [newArt, ...cmsContent.articles];
    }

    const updatedContent = { ...cmsContent, articles: updatedArticles };
    setCmsContent(updatedContent);
    setArticleModalOpen(false);
    await saveCmsChanges(updatedContent);
  };

  const handleDeleteArticle = async (id: string) => {
    if (!cmsContent) return;
    if (confirm('Delete this blog article from the public website?')) {
      const updatedContent = {
        ...cmsContent,
        articles: cmsContent.articles.filter((a) => a.id !== id)
      };
      setCmsContent(updatedContent);
      await saveCmsChanges(updatedContent);
    }
  };

  // ==========================================
  // TESTIMONIAL CRUD
  // ==========================================
  const openNewTestimonialModal = () => {
    setEditingTestimonialId(null);
    setTestimonialForm({
      clientName: '',
      roleOrg: '',
      city: '',
      rating: 5,
      systemSize: '',
      savingsText: '',
      commentEn: '',
      commentMr: ''
    });
    setTestimonialModalOpen(true);
  };

  const openEditTestimonialModal = (test: CMSTestimonial) => {
    setEditingTestimonialId(test.id);
    setTestimonialForm({
      clientName: test.clientName,
      roleOrg: test.roleOrg,
      city: test.city,
      rating: test.rating || 5,
      systemSize: test.systemSize,
      savingsText: test.savingsText,
      commentEn: test.commentEn,
      commentMr: test.commentMr
    });
    setTestimonialModalOpen(true);
  };

  const handleSaveTestimonial = async () => {
    if (!cmsContent || !testimonialForm.clientName.trim()) {
      alert('Please enter Client Name.');
      return;
    }

    let updatedTestimonials: CMSTestimonial[];
    if (editingTestimonialId) {
      updatedTestimonials = cmsContent.testimonials.map((t) =>
        t.id === editingTestimonialId
          ? {
              ...testimonialForm,
              id: editingTestimonialId,
              commentMr: testimonialForm.commentMr.trim() || testimonialForm.commentEn.trim()
            }
          : t
      );
    } else {
      const newTest: CMSTestimonial = {
        ...testimonialForm,
        id: `test-${Date.now()}`,
        commentMr: testimonialForm.commentMr.trim() || testimonialForm.commentEn.trim()
      };
      updatedTestimonials = [newTest, ...cmsContent.testimonials];
    }

    const updatedContent = { ...cmsContent, testimonials: updatedTestimonials };
    setCmsContent(updatedContent);
    setTestimonialModalOpen(false);
    await saveCmsChanges(updatedContent);
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!cmsContent) return;
    if (confirm('Delete this customer review?')) {
      const updatedContent = {
        ...cmsContent,
        testimonials: cmsContent.testimonials.filter((t) => t.id !== id)
      };
      setCmsContent(updatedContent);
      await saveCmsChanges(updatedContent);
    }
  };

  // ==========================================
  // JOB OPENINGS CRUD
  // ==========================================
  const openNewJobModal = () => {
    setEditingJobId(null);
    setJobForm({
      titleEn: '',
      titleMr: '',
      department: 'Engineering & Design',
      experienceEn: '2-4 Years',
      experienceMr: '२-४ वर्षे अनुभव',
      locationEn: 'Pune (Baner HQ)',
      locationMr: 'पुणे (बाणेर मुख्यालय)',
      skills: '',
      isActive: true
    });
    setJobModalOpen(true);
  };

  const openEditJobModal = (job: CMSJob) => {
    setEditingJobId(job.id);
    setJobForm({
      titleEn: job.titleEn,
      titleMr: job.titleMr,
      department: job.department,
      experienceEn: job.experienceEn,
      experienceMr: job.experienceMr,
      locationEn: job.locationEn,
      locationMr: job.locationMr,
      skills: job.skills,
      isActive: job.isActive
    });
    setJobModalOpen(true);
  };

  const handleSaveJob = async () => {
    if (!cmsContent || !jobForm.titleEn.trim()) {
      alert('Please enter Job Title.');
      return;
    }

    let updatedJobs: CMSJob[];
    if (editingJobId) {
      updatedJobs = cmsContent.openJobs.map((j) =>
        j.id === editingJobId
          ? {
              ...jobForm,
              id: editingJobId,
              titleMr: jobForm.titleMr.trim() || jobForm.titleEn.trim(),
              locationMr: jobForm.locationMr.trim() || jobForm.locationEn.trim(),
              experienceMr: jobForm.experienceMr.trim() || jobForm.experienceEn.trim()
            }
          : j
      );
    } else {
      const newJob: CMSJob = {
        ...jobForm,
        id: `job-${Date.now()}`,
        titleMr: jobForm.titleMr.trim() || jobForm.titleEn.trim(),
        locationMr: jobForm.locationMr.trim() || jobForm.locationEn.trim(),
        experienceMr: jobForm.experienceMr.trim() || jobForm.experienceEn.trim()
      };
      updatedJobs = [newJob, ...cmsContent.openJobs];
    }

    const updatedContent = { ...cmsContent, openJobs: updatedJobs };
    setCmsContent(updatedContent);
    setJobModalOpen(false);
    await saveCmsChanges(updatedContent);
  };

  const handleDeleteJob = async (id: string) => {
    if (!cmsContent) return;
    if (confirm('Delete this career vacancy?')) {
      const updatedContent = {
        ...cmsContent,
        openJobs: cmsContent.openJobs.filter((j) => j.id !== id)
      };
      setCmsContent(updatedContent);
      await saveCmsChanges(updatedContent);
    }
  };

  // Lead Stage Update
  const handleStatusChange = async (id: string, newStatus: Lead['status']) => {
    setStatusUpdatingId(id);
    try {
      const res = await fetch('/api/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) =>
          prev.map((lead) => (lead.id === id ? { ...lead, status: newStatus } : lead))
        );
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setStatusUpdatingId(null);
    }
  };

  const exportToCSV = () => {
    if (leads.length === 0) return;
    const headers = ['ID', 'Date', 'Name', 'Phone', 'Email', 'Service', 'Monthly Bill', 'Recommended kW', 'Subsidy', 'City', 'Status', 'Notes'];
    const rows = leads.map((l) => [
      l.id,
      new Date(l.createdAt).toLocaleDateString('en-IN'),
      `"${l.name.replace(/"/g, '""')}"`,
      l.phone,
      l.email || '',
      `"${l.service.replace(/"/g, '""')}"`,
      l.monthlyBill || '',
      l.recommendedKw || '',
      l.subsidyAmount || '',
      `"${l.city.replace(/"/g, '""')}"`,
      l.status,
      `"${(l.notes || '').replace(/"/g, '""')}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SwayamUrja_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.phone.includes(search) ||
      lead.city.toLowerCase().includes(search.toLowerCase()) ||
      lead.service.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Analytics Metrics
  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === 'New').length;
  const contactedLeads = leads.filter((l) => l.status === 'Contacted').length;
  const surveyLeads = leads.filter((l) => l.status === 'Site Survey Scheduled').length;
  const closedDeals = leads.filter((l) => l.status === 'Deal Closed').length;
  const conversionRate = totalLeads > 0 ? Math.round((closedDeals / totalLeads) * 100) : 0;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-2xl text-white">
          <div className="text-center space-y-3 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center text-amber-400 mx-auto shadow-lg">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold font-['Outfit']">SwayamUrja Enterprise Admin & CMS</h2>
            <p className="text-slate-400 text-xs">
              Direct access to live inbound leads, analytics dashboard, and website content CRUD.
            </p>
          </div>

          {authError && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-900/60 border border-rose-500 text-rose-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Staff Master Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter staff security password"
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-hidden focus:border-amber-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-colors cursor-pointer"
            >
              Sign In to Admin & CMS
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="text-xs text-slate-400 hover:text-white flex items-center justify-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Website</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f1f5f3] text-slate-900 flex flex-col font-sans">
      
      {/* Top Admin Navbar */}
      <header className="bg-slate-950 text-white border-b border-emerald-950 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" target="_blank" className="text-emerald-300 hover:text-white text-xs flex items-center gap-1.5 font-bold bg-emerald-900/60 hover:bg-emerald-800 px-3.5 py-2 rounded-xl border border-emerald-700 transition-colors">
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              <span>View Visitor Website</span>
            </Link>
            <div className="h-5 w-px bg-slate-800" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-700 flex items-center justify-center text-amber-400">
                <Zap className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg font-['Outfit'] text-white">
                SwayamUrja <span className="text-amber-400">Executive Console</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {activeTab === 'leads' && (
              <button
                onClick={exportToCSV}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-xs transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Excel (.CSV)</span>
              </button>
            )}

            <button
              onClick={() => saveCmsChanges()}
              disabled={savingCms}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{savingCms ? 'Saving...' : 'Sync & Save All'}</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Workspace with Sidebar Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 flex flex-col md:flex-row gap-8">
        
        {/* Left Sidebar Navigation */}
        <aside className="w-full md:w-64 shrink-0 space-y-2">
          
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 px-3 pb-1">
            Executive Control
          </div>

          <button
            type="button"
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-emerald-800 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              <span>Progress Dashboard</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('leads')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer ${
              activeTab === 'leads'
                ? 'bg-emerald-800 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Users className="w-4 h-4" />
              <span>Inbound Leads CRM</span>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-400 text-emerald-950 font-extrabold">
              {leads.length}
            </span>
          </button>

          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 px-3 pt-5 pb-1">
            Visitor Content CRUD
          </div>

          <button
            type="button"
            onClick={() => setActiveTab('projects')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer ${
              activeTab === 'projects'
                ? 'bg-emerald-800 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <FolderGit2 className="w-4 h-4" />
              <span>Projects CRUD</span>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold">
              {cmsContent?.projects?.length || 0}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('articles')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer ${
              activeTab === 'articles'
                ? 'bg-emerald-800 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-4 h-4" />
              <span>Blog Articles CRUD</span>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold">
              {cmsContent?.articles?.length || 0}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('testimonials')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer ${
              activeTab === 'testimonials'
                ? 'bg-emerald-800 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Star className="w-4 h-4" />
              <span>Feedback Reviews CRUD</span>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold">
              {cmsContent?.testimonials?.length || 0}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('jobs')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer ${
              activeTab === 'jobs'
                ? 'bg-emerald-800 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Briefcase className="w-4 h-4" />
              <span>Careers CRUD</span>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold">
              {cmsContent?.openJobs?.length || 0}
            </span>
          </button>

                    <button
            type="button"
            onClick={() => setActiveTab('clients')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer ${
              activeTab === 'clients'
                ? 'bg-emerald-800 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Building2 className="w-4 h-4" />
              <span>Our Clients Slider</span>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold">
              {cmsContent?.clients?.length || 0}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('about')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer ${
              activeTab === 'about'
                ? 'bg-emerald-800 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Users className="w-4 h-4" />
              <span>About Us & Leadership</span>
            </div>
          </button>

          {/* SITE SETTINGS & THEME STUDIO: Restricted to Super Admin (SK Softech) */}
          {isSuperAdmin ? (
            <>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 px-3 pt-5 pb-1 flex items-center justify-between">
                <span>Site Settings</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded-sm bg-cyan-950 text-cyan-400 font-mono font-bold">ROOT</span>
              </div>

              <button
                type="button"
                onClick={() => setActiveTab('stats')}
                className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer ${
                  activeTab === 'stats'
                    ? 'bg-emerald-800 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Impact Stats & Banner</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('tariffs')}
                className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer ${
                  activeTab === 'tariffs'
                    ? 'bg-emerald-800 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                <Sliders className="w-4 h-4" />
                <span>Tariffs & Subsidies</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('contact')}
                className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer ${
                  activeTab === 'contact'
                    ? 'bg-emerald-800 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Helpline & Office</span>
              </button>

              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 px-3 pt-5 pb-1 flex items-center justify-between">
                <span>Design & Appearance</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded-sm bg-cyan-950 text-cyan-400 font-mono font-bold">ROOT</span>
              </div>

              <button
                type="button"
                onClick={() => setActiveTab('theme')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer ${
                  activeTab === 'theme'
                    ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Palette className="w-4 h-4 text-amber-500" />
                  <span>Color & Theme Studio</span>
                </div>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                  NEW
                </span>
              </button>
            </>
          ) : (
            <div className="px-3 pt-6 pb-2 text-[11px] text-slate-400 border-t border-slate-200/60 mt-4">
              <div className="flex items-center gap-1.5 font-bold text-slate-600 mb-1">
                <Lock className="w-3 h-3 text-slate-400" />
                Root Settings Protected
              </div>
              <p className="text-[10px] text-slate-400 leading-tight">
                Tariffs, Subsidies & Theme Studio are managed under SK Softech Super Admin.
              </p>
            </div>
          )}
        </aside>

        {/* Right Content View */}
        <div className="flex-1 space-y-6">
          
          {cmsSaveMessage && (
            <div className="p-4 rounded-2xl bg-emerald-800 text-white text-sm font-semibold flex items-center gap-3 shadow-lg">
              <CheckCircle2 className="w-5 h-5 text-amber-300 shrink-0" />
              <span>{cmsSaveMessage}</span>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB: EXECUTIVE PROGRESS & PERFORMANCE DASHBOARD               */}
          {/* ============================================================== */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              
              {/* Executive Welcome & Key Metrics Strip */}
              <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 rounded-3xl p-8 text-white shadow-xl border border-emerald-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-emerald-800/80">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-1">
                      <Award className="w-4 h-4" />
                      Executive Leadership Progress Tracker
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold font-['Outfit']">
                      SwayamUrja Operational Progress & Pipeline
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 text-xs bg-emerald-800/80 px-4 py-2 rounded-xl border border-emerald-700">
                    <Clock className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Real-time Live Sync Active</span>
                  </div>
                </div>

                {/* 4 Core KPI Highlights */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
                  <div>
                    <span className="text-xs text-emerald-300 font-semibold block mb-1">Total Clean Inquiries</span>
                    <span className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit']">{totalLeads}</span>
                    <span className="text-[11px] text-emerald-400 mt-1 block">↑ 18% from last month</span>
                  </div>
                  <div>
                    <span className="text-xs text-emerald-300 font-semibold block mb-1">Commissioned Capacity</span>
                    <span className="text-3xl sm:text-4xl font-extrabold text-amber-300 font-['Outfit']">{cmsContent?.stats?.totalMw || '50+ MW'}</span>
                    <span className="text-[11px] text-amber-200 mt-1 block">Flagship 13 MW Solapur</span>
                  </div>
                  <div>
                    <span className="text-xs text-emerald-300 font-semibold block mb-1">Surveys Scheduled</span>
                    <span className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit']">{surveyLeads}</span>
                    <span className="text-[11px] text-emerald-300 mt-1 block">Feasibility queue active</span>
                  </div>
                  <div>
                    <span className="text-xs text-emerald-300 font-semibold block mb-1">Conversion Ratio</span>
                    <span className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-['Outfit']">{conversionRate}%</span>
                    <span className="text-[11px] text-emerald-300 mt-1 block">{closedDeals} Deals closed</span>
                  </div>
                </div>
              </div>

              {/* Progress Tracker Strip 1: Capacity Target & Sales Funnel */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* 1. Capacity Growth Target Tracker */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-base font-['Outfit']">
                        2026 EPC Capacity Expansion Target
                      </h4>
                      <p className="text-xs text-slate-500">Current Milestone vs. Annual Growth Goal</p>
                    </div>
                    <span className="text-sm font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                      66.7% Achieved
                    </span>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold text-slate-700">
                      <span>Current: 50 MW Commissioned</span>
                      <span>Target: 75 MW</span>
                    </div>
                    <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                      <div className="h-full bg-gradient-to-r from-emerald-600 to-amber-400 rounded-full" style={{ width: '66.7%' }} />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <span className="text-slate-400 block text-[11px]">Utility Scale</span>
                      <strong className="text-slate-900 text-sm">28 MW</strong>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <span className="text-slate-400 block text-[11px]">Commercial Rooftop</span>
                      <strong className="text-slate-900 text-sm">16.5 MW</strong>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <span className="text-slate-400 block text-[11px]">Residential / Agri</span>
                      <strong className="text-slate-900 text-sm">5.5 MW</strong>
                    </div>
                  </div>
                </div>

                {/* 2. Customer Lead Pipeline Progression Funnel */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-base font-['Outfit']">
                        Customer Lead Funnel Progression
                      </h4>
                      <p className="text-xs text-slate-500">Inbound to Closed Deal Conversion</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('leads')}
                      className="text-xs text-emerald-700 font-bold hover:underline"
                    >
                      View All Leads →
                    </button>
                  </div>

                  <div className="space-y-3 pt-1">
                    {/* Stage 1: New */}
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-semibold text-slate-700">1. New Inquiries</span>
                        <span className="font-bold text-slate-900">{newLeads} leads</span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${totalLeads > 0 ? (newLeads/totalLeads)*100 : 0}%` }} />
                      </div>
                    </div>

                    {/* Stage 2: Contacted */}
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-semibold text-slate-700">2. Contacted & Consulted</span>
                        <span className="font-bold text-slate-900">{contactedLeads} leads</span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${totalLeads > 0 ? (contactedLeads/totalLeads)*100 : 0}%` }} />
                      </div>
                    </div>

                    {/* Stage 3: Survey Scheduled */}
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-semibold text-slate-700">3. Site Feasibility Scheduled</span>
                        <span className="font-bold text-slate-900">{surveyLeads} leads</span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: `${totalLeads > 0 ? (surveyLeads/totalLeads)*100 : 0}%` }} />
                      </div>
                    </div>

                    {/* Stage 4: Closed */}
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-semibold text-slate-700">4. Deals Closed & Commissioned</span>
                        <span className="font-bold text-slate-900">{closedDeals} deals</span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-600 rounded-full" style={{ width: `${totalLeads > 0 ? (closedDeals/totalLeads)*100 : 0}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Progress Tracker Strip 2: Regional Deployment & System Health */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Regional Presence across Maharashtra */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                  <h4 className="font-extrabold text-slate-900 text-sm font-['Outfit'] flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    <span>Regional Footprint (Maharashtra)</span>
                  </h4>
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between items-center p-2.5 rounded-xl bg-slate-50">
                      <span className="font-semibold">Pune MIDC (Chakan/Talegaon)</span>
                      <strong className="text-emerald-700">42% (C&I Rooftops)</strong>
                    </div>
                    <div className="flex justify-between items-center p-2.5 rounded-xl bg-slate-50">
                      <span className="font-semibold">Solapur Flagship Plant</span>
                      <strong className="text-amber-600">31% (13 MW Utility)</strong>
                    </div>
                    <div className="flex justify-between items-center p-2.5 rounded-xl bg-slate-50">
                      <span className="font-semibold">Satara District (Agri-Solar)</span>
                      <strong className="text-slate-800">15% (PM-KUSUM)</strong>
                    </div>
                    <div className="flex justify-between items-center p-2.5 rounded-xl bg-slate-50">
                      <span className="font-semibold">Chh. Sambhaji Nagar & Others</span>
                      <strong className="text-slate-800">12%</strong>
                    </div>
                  </div>
                </div>

                {/* Live Platform Health & Speed */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                  <h4 className="font-extrabold text-slate-900 text-sm font-['Outfit'] flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-600" />
                    <span>Platform Performance & Security</span>
                  </h4>
                  <div className="space-y-2.5 text-xs">
                    <div className="flex justify-between items-center p-2 rounded-lg bg-emerald-50 text-emerald-900">
                      <span className="font-semibold">Server Response Time</span>
                      <strong>0.42s (Sub-1s SLA)</strong>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg bg-emerald-50 text-emerald-900">
                      <span className="font-semibold">SSL Encryption</span>
                      <strong>TLS 1.3 Active ✓</strong>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg bg-emerald-50 text-emerald-900">
                      <span className="font-semibold">Bilingual Sync</span>
                      <strong>English & मराठी Active</strong>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg bg-emerald-50 text-emerald-900">
                      <span className="font-semibold">Lead Captures</span>
                      <strong>100% Delivery SLA</strong>
                    </div>
                  </div>
                </div>

                {/* Quick Shortcuts */}
                <div className="bg-gradient-to-br from-emerald-900 to-emerald-950 text-white rounded-3xl p-6 border border-emerald-800 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-1">
                      Quick Content Manager
                    </span>
                    <h4 className="text-lg font-bold font-['Outfit']">Publish Updates Instantly</h4>
                    <p className="text-xs text-emerald-200 mt-1">
                      Edit projects, write solar blog articles, or update electricity tariffs with full CRUD autonomy.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={openNewProjectModal}
                      className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md transition-colors"
                    >
                      + Add New Solar Project
                    </button>
                    <button
                      onClick={openNewArticleModal}
                      className="w-full py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs border border-emerald-600 transition-colors"
                    >
                      + Write New Blog Article
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ============================================================== */}
          {/* TAB: INBOUND LEADS CRM                                         */}
          {/* ============================================================== */}
          {activeTab === 'leads' && (
            <div className="space-y-6">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold font-['Outfit'] text-slate-900">Inbound Customer Leads CRM</h3>
                  <p className="text-slate-500 text-xs mt-0.5">Real-time incoming feasibility surveys and calculator quote inquiries.</p>
                </div>
                <button
                  onClick={exportToCSV}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Excel (.CSV)</span>
                </button>
              </div>

              {/* Search & Filters */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="relative w-full md:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by client, phone, city..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-emerald-600"
                  />
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                  <Filter className="w-4 h-4 text-slate-500" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-white"
                  >
                    <option value="All">All Statuses ({leads.length})</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Site Survey Scheduled">Site Survey Scheduled</option>
                    <option value="Deal Closed">Deal Closed</option>
                    <option value="Dropped">Dropped</option>
                  </select>

                  <button
                    onClick={fetchLeads}
                    disabled={loadingLeads}
                    className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600"
                    title="Refresh"
                  >
                    <RefreshCw className={`w-4 h-4 ${loadingLeads ? 'animate-spin' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-bold">
                      <tr>
                        <th className="py-4 px-6">Client / Contact</th>
                        <th className="py-4 px-6">Service & Sizing</th>
                        <th className="py-4 px-6">Location</th>
                        <th className="py-4 px-6">Stage</th>
                        <th className="py-4 px-6 text-right">Quick Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredLeads.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-12 text-center text-slate-400">
                            No matching leads found.
                          </td>
                        </tr>
                      ) : (
                        filteredLeads.map((lead) => (
                          <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-4 px-6">
                              <div className="font-bold text-slate-900 text-base">{lead.name}</div>
                              <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                                <Phone className="w-3 h-3 text-emerald-600" />
                                <span>+91 {lead.phone}</span>
                              </div>
                              {lead.email && <div className="text-xs text-slate-400 mt-0.5">{lead.email}</div>}
                              <div className="text-[10px] text-slate-400 mt-1">
                                {new Date(lead.createdAt).toLocaleDateString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                              </div>
                            </td>

                            <td className="py-4 px-6">
                              <span className="font-semibold text-slate-800 text-xs block">{lead.service}</span>
                              <div className="text-xs text-slate-600 mt-1">
                                {lead.monthlyBill && <span>Bill: <strong>{lead.monthlyBill}</strong></span>}
                                {lead.recommendedKw && <span> • Req: <strong>{lead.recommendedKw}</strong></span>}
                                {lead.subsidyAmount && <div className="text-emerald-700 font-semibold">{lead.subsidyAmount}</div>}
                              </div>
                              {lead.notes && <p className="text-[11px] text-slate-500 italic mt-1">&ldquo;{lead.notes}&rdquo;</p>}
                            </td>

                            <td className="py-4 px-6">
                              <span className="font-semibold text-slate-700 text-xs">{lead.city}</span>
                            </td>

                            <td className="py-4 px-6">
                              <select
                                value={lead.status}
                                disabled={statusUpdatingId === lead.id}
                                onChange={(e) => handleStatusChange(lead.id, e.target.value as Lead['status'])}
                                className="px-3 py-1.5 rounded-lg text-xs font-bold border bg-white"
                              >
                                <option value="New">● New</option>
                                <option value="Contacted">● Contacted</option>
                                <option value="Site Survey Scheduled">● Survey Scheduled</option>
                                <option value="Deal Closed">● Deal Closed</option>
                                <option value="Dropped">● Dropped</option>
                              </select>
                            </td>

                            <td className="py-4 px-6 text-right">
                              <div className="inline-flex items-center gap-2">
                                <a
                                  href={`https://wa.me/91${lead.phone}?text=Hello%20${encodeURIComponent(lead.name)}%2C%20greetings%20from%20SwayamUrja%20Renewable%20Energy.`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800"
                                  title="WhatsApp"
                                >
                                  <MessageSquare className="w-4 h-4" />
                                </a>
                                <a
                                  href={`tel:+91${lead.phone}`}
                                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800"
                                  title="Call"
                                >
                                  <Phone className="w-4 h-4" />
                                </a>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ============================================================== */}
          {/* TAB: OUR CLIENTS SLIDER CRUD                                   */}
          {/* ============================================================== */}
          {activeTab === 'clients' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-emerald-600" />
                    Our Clients Logo Slideshow
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Manage the logos shown on the homepage client marquee. Files upload directly to the server with paths saved in DB.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setClientForm({ name: '', logo: '', website: '' });
                    setShowClientModal(true);
                  }}
                  className="px-4 py-2.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  Add New Client
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {(cmsContent?.clients || []).map((client: any) => (
                  <div
                    key={client.id}
                    className="border border-slate-200 rounded-2xl p-4 flex flex-col justify-between hover:shadow-md hover:border-emerald-300 transition-all group"
                  >
                    <div className="bg-slate-50 rounded-xl p-3 h-24 flex items-center justify-center mb-2 overflow-hidden">
                      {client.logo ? (
                        <img
                          src={client.logo}
                          alt={client.name}
                          className="max-h-16 max-w-full object-contain transition-all"
                        />
                      ) : (
                        <Building2 className="w-8 h-8 text-slate-400" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs truncate" title={client.name}>
                        {client.name}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-mono truncate" title={client.logo}>
                        {client.logo}
                      </p>
                    </div>
                    <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-end">
                      <button
                        type="button"
                        onClick={() => handleDeleteClient(client.id)}
                        className="text-slate-400 hover:text-red-500 p-1 cursor-pointer"
                        title="Delete Client"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB: ABOUT US & LEADERSHIP                                     */}
          {/* ============================================================== */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              {/* MD & CEO Gratitude Message */}
              {aboutUsForm && (
                <form onSubmit={handleSaveAboutUs} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                    <div>
                      <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                        <Users className="w-5 h-5 text-emerald-600" />
                        Gratitude by MD &amp; CEO (Rahul Nalawade)
                      </h2>
                      <p className="text-xs text-slate-500 mt-1">
                        Updates the official CEO message, photo, and leadership quote on the dedicated <span className="font-semibold text-emerald-700">/about-us</span> page and Homepage teaser.
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href="/about-us"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center gap-1.5 border border-emerald-200 transition-all"
                      >
                        <span>Preview /about-us Page</span>
                        <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
                      </a>
                      <button
                        type="submit"
                        disabled={savingCms}
                        className="px-5 py-2.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        {savingCms ? 'Saving...' : 'Save CEO Message'}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <label className="block text-xs font-bold text-slate-700">CEO Profile Photo</label>
                      <div className="w-40 h-40 rounded-2xl overflow-hidden border border-slate-200 relative bg-slate-50">
                        <img
                          src={aboutUsForm.mdCeoMessage?.photo || '/uploads/team/rahul-nalawade.jpg'}
                          alt="MD &amp; CEO"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <label className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold cursor-pointer inline-flex items-center gap-1.5">
                        <Upload className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{uploadingCeoPhoto ? 'Uploading...' : 'Upload Photo'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleUploadCeoPhoto}
                          disabled={uploadingCeoPhoto}
                        />
                      </label>
                      <input
                        type="text"
                        value={aboutUsForm.mdCeoMessage?.photo || ''}
                        onChange={(e) => setAboutUsForm({
                          ...aboutUsForm,
                          mdCeoMessage: { ...aboutUsForm.mdCeoMessage, photo: e.target.value }
                        })}
                        className="w-full px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-600"
                        placeholder="/uploads/team/..."
                      />
                    </div>

                    <div className="md:col-span-2 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                          <input
                            type="text"
                            value={aboutUsForm.mdCeoMessage?.name || ''}
                            onChange={(e) => setAboutUsForm({
                              ...aboutUsForm,
                              mdCeoMessage: { ...aboutUsForm.mdCeoMessage, name: e.target.value }
                            })}
                            className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Designation (English)</label>
                          <input
                            type="text"
                            value={aboutUsForm.mdCeoMessage?.designationEn || ''}
                            onChange={(e) => setAboutUsForm({
                              ...aboutUsForm,
                              mdCeoMessage: { ...aboutUsForm.mdCeoMessage, designationEn: e.target.value }
                            })}
                            className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Inspirational Quote (English)</label>
                          <textarea
                            rows={2}
                            value={aboutUsForm.mdCeoMessage?.quoteEn || ''}
                            onChange={(e) => setAboutUsForm({
                              ...aboutUsForm,
                              mdCeoMessage: { ...aboutUsForm.mdCeoMessage, quoteEn: e.target.value }
                            })}
                            className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Inspirational Quote (Marathi)</label>
                          <textarea
                            rows={2}
                            value={aboutUsForm.mdCeoMessage?.quoteMr || ''}
                            onChange={(e) => setAboutUsForm({
                              ...aboutUsForm,
                              mdCeoMessage: { ...aboutUsForm.mdCeoMessage, quoteMr: e.target.value }
                            })}
                            className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Detailed Message (English)</label>
                        <textarea
                          rows={3}
                          value={aboutUsForm.mdCeoMessage?.messageEn || ''}
                          onChange={(e) => setAboutUsForm({
                            ...aboutUsForm,
                            mdCeoMessage: { ...aboutUsForm.mdCeoMessage, messageEn: e.target.value }
                          })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              )}

              {/* Team Members & Designations */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <Users className="w-5 h-5 text-emerald-600" />
                      Key Team Members &amp; Designations
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">Manage leadership profiles, roles and photo uploads.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setTeamForm({ name: '', designationEn: '', designationMr: '', bioEn: '', bioMr: '', photo: '', linkedin: '' });
                      setShowTeamModal(true);
                    }}
                    className="px-4 py-2 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer shrink-0"
                  >
                    <UserPlus className="w-4 h-4" />
                    Add Team Designation
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {(aboutUsForm?.teamMembers || []).map((m: any) => (
                    <div key={m.id} className="border border-slate-200 rounded-2xl p-4 flex gap-4 items-start bg-slate-50/50">
                      <img
                        src={m.photo || '/uploads/team/rahul-nalawade.jpg'}
                        alt={m.name}
                        className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-slate-900 text-xs truncate">{m.name}</h4>
                          <button
                            type="button"
                            onClick={() => handleDeleteTeamMember(m.id)}
                            className="text-slate-400 hover:text-red-500 p-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[11px] font-semibold text-emerald-700 truncate">{m.designationEn}</p>
                        <p className="text-[10px] text-slate-500 line-clamp-2 mt-1">{m.bioEn}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}


          {/* ============================================================== */}
          {/* TAB: PROJECTS CRUD                                             */}
          {/* ============================================================== */}
          {activeTab === 'projects' && cmsContent && (
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold font-['Outfit'] text-slate-900">
                    Portfolio Projects CRUD
                  </h3>
                  <p className="text-slate-500 text-xs mt-1">
                    Create, Read, Update, and Delete projects on the visitor portfolio.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={openNewProjectModal}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow-md cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Add New Solar Project</span>
                </button>
              </div>

              {/* Projects Grid with Edit / Delete actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {cmsContent.projects.map((proj) => (
                  <div key={proj.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
                    <div className="space-y-3">
                      <div className="h-44 rounded-xl overflow-hidden relative border border-slate-200 bg-slate-200">
                        <img 
                          src={proj.image || FALLBACK_IMG} 
                          alt={proj.titleEn} 
                          onError={(e) => { e.currentTarget.src = FALLBACK_IMG; }}
                          className="w-full h-full object-cover" 
                        />
                        <span className="absolute top-2 left-2 px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-md text-[10px] font-bold text-amber-300 uppercase">
                          {proj.category}
                        </span>
                        <span className="absolute bottom-2 right-2 px-2.5 py-1 rounded-md bg-emerald-950/80 backdrop-blur-md text-[11px] font-bold text-white">
                          {proj.capacity}
                        </span>
                      </div>

                      <div>
                        <h4 className="font-bold text-slate-900 text-base">{proj.titleEn}</h4>
                        <p className="text-xs text-slate-500">{proj.locationEn}</p>
                        <p className="text-xs text-slate-600 mt-2 bg-white p-2.5 rounded-lg border border-slate-200/80">
                          {proj.highlightEn}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 flex items-center justify-between border-t border-slate-200">
                      <button
                        type="button"
                        onClick={() => openEditProjectModal(proj)}
                        className="text-xs text-emerald-800 hover:text-emerald-950 flex items-center gap-1 font-bold bg-emerald-100 hover:bg-emerald-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Edit Project</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteProject(proj.id)}
                        className="text-xs text-rose-600 hover:text-rose-800 flex items-center gap-1 font-bold bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB: BLOG ARTICLES CRUD                                        */}
          {/* ============================================================== */}
          {activeTab === 'articles' && cmsContent && (
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-8">
              {/* Dynamic Blog LinkedIn URL Configuration */}
              <form onSubmit={handleSaveLinkedInUrl} className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <ExternalLink className="w-4 h-4 text-emerald-600" />
                      Blogs Navigation Route (LinkedIn Page Redirect)
                    </h4>
                    <p className="text-xs text-slate-500">
                      When visitors click &quot;Blogs&quot; in the navigation bar, they are automatically routed to this LinkedIn page in a new tab.
                    </p>
                  </div>
                  <button
                    type="submit"
                    disabled={savingCms}
                    className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-sm"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Save LinkedIn URL
                  </button>
                </div>
                <div className="flex gap-2">
                  <input
                    type="url"
                    required
                    value={linkedInUrl}
                    onChange={(e) => setLinkedInUrl(e.target.value)}
                    placeholder="https://www.linkedin.com/company/swayamurja-renewable-energy-pvt-ltd/"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs font-mono focus:border-emerald-500"
                  />
                </div>
              </form>


              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold font-['Outfit'] text-slate-900">
                    Solar Knowledge & Blog Articles CRUD
                  </h3>
                  <p className="text-slate-500 text-xs mt-1">
                    Publish, edit, and manage educational articles on PM Surya Ghar, tax depreciation, and net-metering.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={openNewArticleModal}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow-md cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Write New Blog Article</span>
                </button>
              </div>

              {/* Articles Grid */}
              <div className="space-y-4">
                {cmsContent.articles.map((art) => (
                  <div key={art.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row gap-4 items-start">
                      <div className="w-32 h-24 rounded-xl overflow-hidden shrink-0 bg-slate-200 border border-slate-200">
                        <img 
                          src={art.image || FALLBACK_IMG} 
                          alt={art.titleEn} 
                          onError={(e) => { e.currentTarget.src = FALLBACK_IMG; }}
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          {art.category}
                        </span>
                        <h4 className="font-bold text-slate-900 text-base">{art.titleEn}</h4>
                        <div className="flex items-center gap-3 text-xs text-slate-500">
                          <span>{art.publishDate}</span>
                          <span>•</span>
                          <span>{art.readTime}</span>
                        </div>
                        <p className="text-xs text-slate-600 line-clamp-2 max-w-xl">
                          {art.excerptEn}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => openEditArticleModal(art)}
                        className="text-xs text-emerald-800 hover:text-emerald-950 flex items-center gap-1 font-bold bg-emerald-100 hover:bg-emerald-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteArticle(art.id)}
                        className="text-xs text-rose-600 hover:text-rose-800 flex items-center gap-1 font-bold bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB: TESTIMONIALS CRUD                                         */}
          {/* ============================================================== */}
          {activeTab === 'testimonials' && cmsContent && (
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold font-['Outfit'] text-slate-900">
                    Happy Customers Feedback CRUD
                  </h3>
                  <p className="text-slate-500 text-xs mt-1">
                    Manage 5-star customer reviews from homes, factories, and farms across Maharashtra.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={openNewTestimonialModal}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow-md cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Add Customer Testimonial</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {cmsContent.testimonials.map((test) => (
                  <div key={test.id} className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-slate-900 text-base">{test.clientName}</h4>
                          <p className="text-xs text-slate-500">{test.roleOrg} • <span className="text-emerald-700 font-semibold">{test.city}</span></p>
                        </div>
                        <div className="flex items-center gap-0.5">
                          {[...Array(test.rating || 5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                      </div>

                      <div className="text-xs text-emerald-800 font-bold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                        {test.savingsText}
                      </div>

                      <p className="text-xs text-slate-700 italic leading-relaxed">
                        &ldquo;{test.commentEn}&rdquo;
                      </p>
                    </div>

                    <div className="pt-3 flex items-center justify-between border-t border-slate-200">
                      <button
                        type="button"
                        onClick={() => openEditTestimonialModal(test)}
                        className="text-xs text-emerald-800 hover:text-emerald-950 flex items-center gap-1 font-bold bg-emerald-100 hover:bg-emerald-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteTestimonial(test.id)}
                        className="text-xs text-rose-600 hover:text-rose-800 flex items-center gap-1 font-bold bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB: CAREERS CRUD                                              */}
          {/* ============================================================== */}
          {activeTab === 'jobs' && cmsContent && (
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold font-['Outfit'] text-slate-900">
                    Career Opportunities & Jobs CRUD
                  </h3>
                  <p className="text-slate-500 text-xs mt-1">
                    Manage job roles, requirements, and WhatsApp application routing.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={openNewJobModal}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow-md cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Post New Job Vacancy</span>
                </button>
              </div>

              <div className="space-y-4">
                {cmsContent.openJobs.map((job) => (
                  <div key={job.id} className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2.5">
                        <h4 className="font-bold text-slate-900 text-base">{job.titleEn}</h4>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-semibold">
                          {job.department}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${job.isActive ? 'bg-emerald-600 text-white' : 'bg-slate-300 text-slate-700'}`}>
                          {job.isActive ? 'Active on Website' : 'Inactive'}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500">
                        {job.experienceEn} • {job.locationEn}
                      </div>
                      <p className="text-xs text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200 max-w-xl">
                        {job.skills}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => openEditJobModal(job)}
                        className="text-xs text-emerald-800 hover:text-emerald-950 flex items-center gap-1 font-bold bg-emerald-100 hover:bg-emerald-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteJob(job.id)}
                        className="text-xs text-rose-600 hover:text-rose-800 flex items-center gap-1 font-bold bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB: IMPACT STATS & ANNOUNCEMENT BANNER                        */}
          {/* ============================================================== */}
          {activeTab === 'stats' && cmsContent && (
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-8">
              <div>
                <h3 className="text-xl font-bold font-['Outfit'] text-slate-900">
                  Manage Impact Numbers & Announcement Banner
                </h3>
                <p className="text-slate-500 text-xs mt-1">Updates made here immediately reflect on the homepage Hero section.</p>
              </div>

              {/* Floating Banner */}
              <div className="p-6 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900">Top Floating Announcement Banner</span>
                  <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={cmsContent.announcement.enabled}
                      onChange={(e) =>
                        setCmsContent({
                          ...cmsContent,
                          announcement: { ...cmsContent.announcement, enabled: e.target.checked },
                        })
                      }
                      className="w-4 h-4 accent-emerald-600 rounded-sm"
                    />
                    <span>Show Banner on Website</span>
                  </label>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Banner Message (English)</label>
                    <input
                      type="text"
                      value={cmsContent.announcement.textEn}
                      onChange={(e) =>
                        setCmsContent({
                          ...cmsContent,
                          announcement: { ...cmsContent.announcement, textEn: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Banner Message (मराठी)</label>
                    <input
                      type="text"
                      value={cmsContent.announcement.textMr}
                      onChange={(e) =>
                        setCmsContent({
                          ...cmsContent,
                          announcement: { ...cmsContent.announcement, textMr: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl border border-slate-200 space-y-2">
                  <label className="block text-xs font-bold uppercase text-slate-500">Total Commissioned Capacity</label>
                  <input
                    type="text"
                    value={cmsContent.stats.totalMw}
                    onChange={(e) =>
                      setCmsContent({
                        ...cmsContent,
                        stats: { ...cmsContent.stats, totalMw: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-base font-extrabold text-amber-600"
                  />
                </div>

                <div className="p-5 rounded-2xl border border-slate-200 space-y-2">
                  <label className="block text-xs font-bold uppercase text-slate-500">Satisfied Solar Clients</label>
                  <input
                    type="text"
                    value={cmsContent.stats.clients}
                    onChange={(e) =>
                      setCmsContent({
                        ...cmsContent,
                        stats: { ...cmsContent.stats, clients: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-base font-extrabold text-slate-900"
                  />
                </div>

                <div className="p-5 rounded-2xl border border-slate-200 space-y-2">
                  <label className="block text-xs font-bold uppercase text-slate-500">Annual CO₂ Offset</label>
                  <input
                    type="text"
                    value={cmsContent.stats.co2Offset}
                    onChange={(e) =>
                      setCmsContent({
                        ...cmsContent,
                        stats: { ...cmsContent.stats, co2Offset: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-base font-extrabold text-emerald-600"
                  />
                </div>

                <div className="p-5 rounded-2xl border border-slate-200 space-y-2">
                  <label className="block text-xs font-bold uppercase text-slate-500">Plant Performance Uptime SLA</label>
                  <input
                    type="text"
                    value={cmsContent.stats.uptime}
                    onChange={(e) =>
                      setCmsContent({
                        ...cmsContent,
                        stats: { ...cmsContent.stats, uptime: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-base font-extrabold text-amber-600"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => saveCmsChanges()}
                  disabled={savingCms}
                  className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-sm shadow-md transition-colors cursor-pointer"
                >
                  {savingCms ? 'Saving...' : 'Save & Publish Stats'}
                </button>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB: TARIFFS & SUBSIDIES                                       */}
          {/* ============================================================== */}
          {activeTab === 'tariffs' && cmsContent && (
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-8">
              <div>
                <h3 className="text-xl font-bold font-['Outfit'] text-slate-900">Solar ROI Calculator & Subsidy Configuration</h3>
                <p className="text-slate-500 text-xs mt-1">Adjust electricity tariffs and PM Surya Ghar direct bank subsidies.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl border border-slate-200 space-y-2">
                  <label className="block text-xs font-bold uppercase text-slate-500">Residential Tariff (₹/Unit)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={cmsContent.tariffs.residentialUnitRate}
                    onChange={(e) =>
                      setCmsContent({
                        ...cmsContent,
                        tariffs: { ...cmsContent.tariffs, residentialUnitRate: Number(e.target.value) },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-lg font-bold text-slate-900"
                  />
                </div>

                <div className="p-5 rounded-2xl border border-slate-200 space-y-2">
                  <label className="block text-xs font-bold uppercase text-slate-500">Commercial & Industrial (₹/Unit)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={cmsContent.tariffs.commercialUnitRate}
                    onChange={(e) =>
                      setCmsContent({
                        ...cmsContent,
                        tariffs: { ...cmsContent.tariffs, commercialUnitRate: Number(e.target.value) },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-lg font-bold text-slate-900"
                  />
                </div>

                <div className="p-5 rounded-2xl border border-slate-200 space-y-2">
                  <label className="block text-xs font-bold uppercase text-slate-500">Housing Society Tariff (₹/Unit)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={cmsContent.tariffs.housingUnitRate}
                    onChange={(e) =>
                      setCmsContent({
                        ...cmsContent,
                        tariffs: { ...cmsContent.tariffs, housingUnitRate: Number(e.target.value) },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-lg font-bold text-slate-900"
                  />
                </div>
              </div>

              {/* Subsidies Slabs */}
              <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-4">
                <span className="font-bold text-sm text-slate-900">PM Surya Ghar Subsidy Caps (₹)</span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">1 kW Direct Subsidy</label>
                    <input
                      type="number"
                      value={cmsContent.tariffs.pmSuryaGhar1Kw}
                      onChange={(e) =>
                        setCmsContent({
                          ...cmsContent,
                          tariffs: { ...cmsContent.tariffs, pmSuryaGhar1Kw: Number(e.target.value) },
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">2 kW Direct Subsidy</label>
                    <input
                      type="number"
                      value={cmsContent.tariffs.pmSuryaGhar2Kw}
                      onChange={(e) =>
                        setCmsContent({
                          ...cmsContent,
                          tariffs: { ...cmsContent.tariffs, pmSuryaGhar2Kw: Number(e.target.value) },
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">3 kW or Higher Max Cap</label>
                    <input
                      type="number"
                      value={cmsContent.tariffs.pmSuryaGhar3KwMax}
                      onChange={(e) =>
                        setCmsContent({
                          ...cmsContent,
                          tariffs: { ...cmsContent.tariffs, pmSuryaGhar3KwMax: Number(e.target.value) },
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-emerald-800"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => saveCmsChanges()}
                  disabled={savingCms}
                  className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-sm shadow-md transition-colors cursor-pointer"
                >
                  {savingCms ? 'Saving...' : 'Save Tariffs & Subsidy Slabs'}
                </button>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB: CONTACT & HELPLINES                                       */}
          {/* ============================================================== */}
          {activeTab === 'contact' && cmsContent && (
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-6">
              <div>
                <h3 className="text-xl font-bold font-['Outfit'] text-slate-900">Company Helplines & Office Location</h3>
                <p className="text-slate-500 text-xs mt-1">Updates here change numbers on WhatsApp buttons, Header, and Footer.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Official WhatsApp Number</label>
                  <input
                    type="text"
                    value={cmsContent.companyContact.whatsapp}
                    onChange={(e) =>
                      setCmsContent({
                        ...cmsContent,
                        companyContact: { ...cmsContent.companyContact, whatsapp: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Direct Helpline Phone</label>
                  <input
                    type="text"
                    value={cmsContent.companyContact.phone}
                    onChange={(e) =>
                      setCmsContent({
                        ...cmsContent,
                        companyContact: { ...cmsContent.companyContact, phone: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Official Enquiries Email</label>
                  <input
                    type="email"
                    value={cmsContent.companyContact.email}
                    onChange={(e) =>
                      setCmsContent({
                        ...cmsContent,
                        companyContact: { ...cmsContent.companyContact, email: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Registered Pune Office Address</label>
                  <input
                    type="text"
                    value={cmsContent.companyContact.address}
                    onChange={(e) =>
                      setCmsContent({
                        ...cmsContent,
                        companyContact: { ...cmsContent.companyContact, address: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => saveCmsChanges()}
                  disabled={savingCms}
                  className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-sm shadow-md transition-colors cursor-pointer"
                >
                  {savingCms ? 'Saving...' : 'Save Contact Information'}
                </button>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB: COLOR PALETTE & BRAND THEME STUDIO                        */}
          {/* ============================================================== */}
          {activeTab === 'theme' && (
            <div className="space-y-6">
              
              {/* Studio Header Banner */}
              <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 rounded-3xl p-8 text-white shadow-xl border border-slate-700 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-sky-400/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-700">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-1">
                      <Palette className="w-4 h-4" />
                      Visual Identity & Color Palette Controller
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold font-['Outfit']">
                      Website Color Theme Studio
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
                      Switch between pre-saved clean-tech color schemes matching the official SwayamUrja logo (Solar Gold, Sky Blue & Fresh Leaf Green) or test custom palettes. Changes take effect on the visitor website in real-time.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (!cmsContent) return;
                      const updated = { ...cmsContent, theme: themeForm };
                      setCmsContent(updated);
                      saveCmsChanges(updated);
                    }}
                    disabled={savingCms}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs shadow-md transition-all cursor-pointer shrink-0"
                  >
                    <Save className="w-4 h-4" />
                    <span>{savingCms ? 'Saving...' : 'Apply Theme Live to Website'}</span>
                  </button>
                </div>

                {/* Active Theme Summary Strip */}
                <div className="pt-5 flex flex-wrap items-center gap-6 text-xs">
                  <div>
                    <span className="text-slate-400 block mb-1">Currently Active Theme:</span>
                    <span className="font-extrabold text-sm text-amber-400 bg-slate-800/80 px-3 py-1 rounded-lg border border-slate-700 inline-block">
                      {themeForm.name}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-1">Hero Style:</span>
                    <span className="font-bold text-sky-300 uppercase tracking-wider bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700 inline-block text-[11px]">
                      {themeForm.heroBackground}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div>
                      <span className="text-slate-400 block mb-1 text-[11px]">Primary</span>
                      <div className="flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full border border-white/40 shadow-xs" style={{ backgroundColor: themeForm.primaryColor }} />
                        <span className="font-mono text-[11px] text-slate-200">{themeForm.primaryColor}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-400 block mb-1 text-[11px]">Secondary</span>
                      <div className="flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full border border-white/40 shadow-xs" style={{ backgroundColor: themeForm.secondaryColor }} />
                        <span className="font-mono text-[11px] text-slate-200">{themeForm.secondaryColor}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-400 block mb-1 text-[11px]">Accent</span>
                      <div className="flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full border border-white/40 shadow-xs" style={{ backgroundColor: themeForm.accentColor }} />
                        <span className="font-mono text-[11px] text-slate-200">{themeForm.accentColor}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5 Curated Pre-Saved Theme Palettes */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-extrabold text-slate-900 font-['Outfit'] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Curated Pre-Saved Color Palettes (1-Click Switch & Test)</span>
                  </h4>
                  <span className="text-xs text-slate-500">Click any card to preview & activate</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {THEME_PRESETS.map((preset) => {
                    const isSelected = themeForm.id === preset.id;
                    return (
                      <div
                        key={preset.id}
                        onClick={() => {
                          setThemeForm(preset);
                          if (cmsContent) {
                            const updated = { ...cmsContent, theme: preset };
                            setCmsContent(updated);
                            saveCmsChanges(updated);
                          }
                        }}
                        className={`rounded-3xl p-6 transition-all cursor-pointer flex flex-col justify-between border-2 ${
                          isSelected
                            ? 'bg-white border-amber-500 shadow-xl ring-2 ring-amber-400/30 scale-[1.02]'
                            : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-md'
                        }`}
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                              {preset.heroBackground.replace('-', ' ')}
                            </span>
                            {isSelected ? (
                              <span className="inline-flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950">
                                <Check className="w-3 h-3" />
                                Active
                              </span>
                            ) : (
                              <span className="text-[11px] text-slate-400 hover:text-slate-600 font-semibold">
                                Click to apply
                              </span>
                            )}
                          </div>

                          <h5 className="font-extrabold text-slate-900 text-base font-['Outfit']">
                            {preset.name}
                          </h5>

                          <p className="text-xs text-slate-600 leading-relaxed">
                            {preset.tagline}
                          </p>

                          {/* 4 Swatch Circles */}
                          <div className="pt-2 flex items-center gap-2">
                            <div className="flex items-center gap-1 text-[10px] text-slate-500">
                              <span
                                className="w-5 h-5 rounded-full shadow-xs border border-slate-300 inline-block"
                                style={{ backgroundColor: preset.primaryColor }}
                                title={`Primary: ${preset.primaryColor}`}
                              />
                            </div>
                            <div className="flex items-center gap-1 text-[10px] text-slate-500">
                              <span
                                className="w-5 h-5 rounded-full shadow-xs border border-slate-300 inline-block"
                                style={{ backgroundColor: preset.secondaryColor }}
                                title={`Secondary: ${preset.secondaryColor}`}
                              />
                            </div>
                            <div className="flex items-center gap-1 text-[10px] text-slate-500">
                              <span
                                className="w-5 h-5 rounded-full shadow-xs border border-slate-300 inline-block"
                                style={{ backgroundColor: preset.accentColor }}
                                title={`Accent: ${preset.accentColor}`}
                              />
                            </div>
                            <div className="flex items-center gap-1 text-[10px] text-slate-500">
                              <span
                                className={`w-5 h-5 rounded-full shadow-xs border border-slate-300 inline-block ${
                                  preset.heroBackground === 'clean-light'
                                    ? 'bg-slate-100'
                                    : preset.heroBackground === 'dark-navy'
                                    ? 'bg-[#0a1528]'
                                    : preset.heroBackground === 'emerald-green'
                                    ? 'bg-[#083825]'
                                    : 'bg-[#0f172a]'
                                }`}
                                title={`Hero: ${preset.heroBackground}`}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="pt-4 mt-4 border-t border-slate-100">
                          <button
                            type="button"
                            className={`w-full py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                              isSelected
                                ? 'bg-amber-400 text-slate-950 font-extrabold shadow-xs'
                                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                            }`}
                          >
                            {isSelected ? 'Currently Live on Website' : 'Switch to this Theme'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Live Interactive Preview Box */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h4 className="text-base font-extrabold text-slate-900 font-['Outfit'] flex items-center gap-2">
                    <Eye className="w-4 h-4 text-emerald-600" />
                    <span>Real-Time Visitor Website Preview</span>
                  </h4>
                  <span className="text-xs text-slate-500">Simulating active theme layout</span>
                </div>

                {/* Simulated Mini-Hero Component */}
                <div
                  className={`rounded-2xl p-6 border transition-all duration-300 ${
                    themeForm.heroBackground === 'clean-light'
                      ? 'bg-gradient-to-br from-slate-50 via-amber-50/40 to-white text-slate-900 border-slate-200'
                      : themeForm.heroBackground === 'dark-navy'
                      ? 'bg-gradient-to-br from-[#060e20] via-[#091530] to-[#060d1b] text-white border-slate-800'
                      : themeForm.heroBackground === 'emerald-green'
                      ? 'bg-gradient-to-br from-[#021f12] via-[#083825] to-[#042016] text-white border-emerald-900'
                      : 'bg-gradient-to-br from-[#0b1329] via-[#0f172a] to-[#0a1528] text-white border-slate-800'
                  }`}
                >
                  <div className="space-y-4 max-w-xl">
                    {/* Simulated Badges */}
                    <div className="flex flex-wrap gap-2">
                      <span
                        className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border"
                        style={{
                          backgroundColor: `${themeForm.secondaryColor}20`,
                          borderColor: `${themeForm.secondaryColor}60`,
                          color: themeForm.secondaryColor,
                        }}
                      >
                        MNRE Registered
                      </span>
                      <span
                        className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border"
                        style={{
                          backgroundColor: `${themeForm.primaryColor}20`,
                          borderColor: `${themeForm.primaryColor}60`,
                          color: themeForm.primaryColor,
                        }}
                      >
                        25-Year Warranty
                      </span>
                      <span
                        className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border"
                        style={{
                          backgroundColor: `${themeForm.accentColor}20`,
                          borderColor: `${themeForm.accentColor}60`,
                          color: themeForm.accentColor,
                        }}
                      >
                        MSEDCL Net-Meter
                      </span>
                    </div>

                    {/* Headline */}
                    <h2 className="text-xl sm:text-2xl font-extrabold font-['Outfit'] leading-tight">
                      Power Your Future with{' '}
                      <span
                        style={{
                          color: themeForm.primaryColor,
                        }}
                      >
                        Clean Solar Energy
                      </span>
                    </h2>

                    <p
                      className={`text-xs leading-relaxed ${
                        themeForm.heroBackground === 'clean-light' ? 'text-slate-600' : 'text-slate-300'
                      }`}
                    >
                      SwayamUrja Renewable Energy — Concept-to-commissioning solutions for homes, industries & farms across Maharashtra.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <button
                        type="button"
                        className="px-5 py-2.5 rounded-xl font-extrabold text-xs shadow-md transition-all"
                        style={{
                          backgroundColor: themeForm.primaryColor,
                          color: '#0f172a',
                        }}
                      >
                        ⚡ Calculate Savings
                      </button>

                      <button
                        type="button"
                        className="px-4 py-2.5 rounded-xl font-bold text-xs border transition-all"
                        style={{
                          borderColor: `${themeForm.secondaryColor}80`,
                          color: themeForm.secondaryColor,
                        }}
                      >
                        Book Free Survey →
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Custom Fine-Tuning Controls */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div>
                  <h4 className="text-base font-extrabold text-slate-900 font-['Outfit']">
                    Advanced Custom Theme Tuner
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Fine-tune specific HEX colors if you want to test a custom combination for client presentations.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Hero Style Selection */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Hero Section Background Style
                    </label>
                    <select
                      value={themeForm.heroBackground}
                      onChange={(e) =>
                        setThemeForm({
                          ...themeForm,
                          heroBackground: e.target.value as any,
                          id: 'custom',
                          name: 'Custom Tailored Theme',
                        })
                      }
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs bg-white font-semibold"
                    >
                      <option value="midnight-slate">Midnight Sapphire Slate (Logo Colors - Recommended)</option>
                      <option value="dark-navy">Corporate Midnight Navy</option>
                      <option value="clean-light">Clean Daylight & Pure White</option>
                      <option value="emerald-green">Classic Deep Forest Green (Legacy)</option>
                    </select>
                  </div>

                  {/* Primary Color Picker */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Primary Color (Solar Gold / Warm Sun)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={themeForm.primaryColor}
                        onChange={(e) =>
                          setThemeForm({
                            ...themeForm,
                            primaryColor: e.target.value,
                            id: 'custom',
                            name: 'Custom Tailored Theme',
                          })
                        }
                        className="w-10 h-10 rounded-xl border border-slate-300 cursor-pointer p-0.5 bg-white"
                      />
                      <input
                        type="text"
                        value={themeForm.primaryColor}
                        onChange={(e) =>
                          setThemeForm({
                            ...themeForm,
                            primaryColor: e.target.value,
                            id: 'custom',
                            name: 'Custom Tailored Theme',
                          })
                        }
                        className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono font-semibold"
                      />
                    </div>
                  </div>

                  {/* Secondary Color Picker */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Secondary Color (Logo Sky / Water Blue)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={themeForm.secondaryColor}
                        onChange={(e) =>
                          setThemeForm({
                            ...themeForm,
                            secondaryColor: e.target.value,
                            id: 'custom',
                            name: 'Custom Tailored Theme',
                          })
                        }
                        className="w-10 h-10 rounded-xl border border-slate-300 cursor-pointer p-0.5 bg-white"
                      />
                      <input
                        type="text"
                        value={themeForm.secondaryColor}
                        onChange={(e) =>
                          setThemeForm({
                            ...themeForm,
                            secondaryColor: e.target.value,
                            id: 'custom',
                            name: 'Custom Tailored Theme',
                          })
                        }
                        className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono font-semibold"
                      />
                    </div>
                  </div>

                  {/* Accent Color Picker */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Accent Color (Logo Leaf Green)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={themeForm.accentColor}
                        onChange={(e) =>
                          setThemeForm({
                            ...themeForm,
                            accentColor: e.target.value,
                            id: 'custom',
                            name: 'Custom Tailored Theme',
                          })
                        }
                        className="w-10 h-10 rounded-xl border border-slate-300 cursor-pointer p-0.5 bg-white"
                      />
                      <input
                        type="text"
                        value={themeForm.accentColor}
                        onChange={(e) =>
                          setThemeForm({
                            ...themeForm,
                            accentColor: e.target.value,
                            id: 'custom',
                            name: 'Custom Tailored Theme',
                          })
                        }
                        className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono font-semibold"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      if (!cmsContent) return;
                      const updated = { ...cmsContent, theme: themeForm };
                      setCmsContent(updated);
                      saveCmsChanges(updated);
                      alert('Custom theme saved and applied live to the website!');
                    }}
                    disabled={savingCms}
                    className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 font-extrabold text-xs shadow-md transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Save className="w-4 h-4 text-amber-400" />
                    <span>Save Custom Palette</span>
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* CLIENT CRUD MODAL */}
      {showClientModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-emerald-600" />
                Add Client to Slideshow
              </h3>
              <button
                type="button"
                onClick={() => setShowClientModal(false)}
                className="text-slate-400 hover:text-slate-700 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveClient} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Client / Company Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tata Motors / Ajanta Universal Fabrics"
                  value={clientForm.name}
                  onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Client Logo Image</label>
                <div className="flex gap-2 items-center mb-2">
                  <label className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold cursor-pointer flex items-center gap-1.5 shrink-0">
                    <Upload className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{uploadingClientLogo ? 'Uploading...' : 'Choose File'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleUploadClientLogo}
                      disabled={uploadingClientLogo}
                    />
                  </label>
                  <span className="text-[11px] text-slate-400">Saves to server&apos;s /uploads/clients/</span>
                </div>
                <input
                  type="text"
                  required
                  placeholder="/uploads/clients/logo.png or https://..."
                  value={clientForm.logo}
                  onChange={(e) => setClientForm({ ...clientForm, logo: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-mono placeholder-slate-400 focus:border-emerald-500"
                />
              </div>

              {clientForm.logo && (
                <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100">
                  <img src={clientForm.logo} alt="Preview" className="max-h-16 max-w-full object-contain" />
                </div>
              )}

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Website URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={clientForm.website}
                  onChange={(e) => setClientForm({ ...clientForm, website: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:border-emerald-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowClientModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-900 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploadingClientLogo}
                  className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold cursor-pointer shadow-sm"
                >
                  Save to Slideshow
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TEAM MEMBER CRUD MODAL */}
      {showTeamModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-emerald-600" />
                Add Team Member / Designation
              </h3>
              <button
                type="button"
                onClick={() => setShowTeamModal(false)}
                className="text-slate-400 hover:text-slate-700 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveTeamMember} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anand Kulkarni"
                    value={teamForm.name}
                    onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Designation (English)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chief Technical Officer"
                    value={teamForm.designationEn}
                    onChange={(e) => setTeamForm({ ...teamForm, designationEn: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Designation (Marathi)</label>
                <input
                  type="text"
                  placeholder="e.g. मुख्य तांत्रिक अधिकारी"
                  value={teamForm.designationMr}
                  onChange={(e) => setTeamForm({ ...teamForm, designationMr: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Profile Photo</label>
                <div className="flex gap-2 items-center mb-2">
                  <label className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold cursor-pointer flex items-center gap-1.5 shrink-0">
                    <Upload className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{uploadingTeamPhoto ? 'Uploading...' : 'Choose File'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleUploadTeamPhoto}
                      disabled={uploadingTeamPhoto}
                    />
                  </label>
                  <span className="text-[11px] text-slate-400">Saves to server&apos;s /uploads/team/</span>
                </div>
                <input
                  type="text"
                  placeholder="/uploads/team/member.jpg"
                  value={teamForm.photo}
                  onChange={(e) => setTeamForm({ ...teamForm, photo: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-mono placeholder-slate-400 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Short Bio / Background (English)</label>
                <textarea
                  rows={2}
                  placeholder="Specialization in solar EPC, substation design, etc."
                  value={teamForm.bioEn}
                  onChange={(e) => setTeamForm({ ...teamForm, bioEn: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">LinkedIn Profile Link (Optional)</label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/in/..."
                  value={teamForm.linkedin}
                  onChange={(e) => setTeamForm({ ...teamForm, linkedin: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:border-emerald-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowTeamModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-900 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploadingTeamPhoto}
                  className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold cursor-pointer shadow-sm"
                >
                  Add Team Designation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


      {/* ============================================================== */}
      {/* MODAL 1: PROJECT CRUD (ADD / EDIT)                            */}
      {/* ============================================================== */}
      {projectModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-extrabold text-slate-900 text-lg font-['Outfit']">
                {editingProjectId ? 'Edit Solar Project' : 'Add New Solar Project'}
              </h3>
              <button
                type="button"
                onClick={() => setProjectModalOpen(false)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Category *</label>
                <select
                  value={projectForm.category}
                  onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white font-semibold"
                >
                  <option value="utility">13 MW Utility Scale</option>
                  <option value="commercial">Commercial & Industrial (C&I)</option>
                  <option value="residential">Residential Rooftop</option>
                  <option value="agri">Agri-Solar (PM-KUSUM)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Capacity (e.g. 500 kW / 13 MW) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 2.5 MW (2,500 kW)"
                  value={projectForm.capacity}
                  onChange={(e) => setProjectForm({ ...projectForm, capacity: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Project Title (English) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Solapur Ground Mount Solar Plant"
                  value={projectForm.titleEn}
                  onChange={(e) => setProjectForm({ ...projectForm, titleEn: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Project Title (मराठी)</label>
                <input
                  type="text"
                  placeholder="उदा. सोलापूर १३ मेगावॅट सोलर प्रकल्प"
                  value={projectForm.titleMr}
                  onChange={(e) => setProjectForm({ ...projectForm, titleMr: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Location (English) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chakan MIDC, Pune"
                  value={projectForm.locationEn}
                  onChange={(e) => setProjectForm({ ...projectForm, locationEn: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Location (मराठी)</label>
                <input
                  type="text"
                  placeholder="उदा. चाकण MIDC, पुणे"
                  value={projectForm.locationMr}
                  onChange={(e) => setProjectForm({ ...projectForm, locationMr: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Photo Image URL</label>
                <input
                  type="text"
                  placeholder="Paste URL (https://...)"
                  value={projectForm.image}
                  onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Technical Highlight</label>
                <input
                  type="text"
                  placeholder="e.g. Tier-1 Mono Perc modules with 40% Tax Depreciation"
                  value={projectForm.highlightEn}
                  onChange={(e) => setProjectForm({ ...projectForm, highlightEn: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                />
              </div>
            </div>

            <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setProjectModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveProject}
                disabled={savingCms}
                className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow-md"
              >
                {savingCms ? 'Saving...' : editingProjectId ? 'Update Project' : 'Publish Project'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 2: BLOG ARTICLE CRUD (ADD / EDIT)                        */}
      {/* ============================================================== */}
      {articleModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-extrabold text-slate-900 text-lg font-['Outfit']">
                {editingArticleId ? 'Edit Solar Article' : 'Write New Solar Blog Article'}
              </h3>
              <button
                type="button"
                onClick={() => setArticleModalOpen(false)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={articleForm.category}
                    onChange={(e) => setArticleForm({ ...articleForm, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Read Time</label>
                  <input
                    type="text"
                    value={articleForm.readTime}
                    onChange={(e) => setArticleForm({ ...articleForm, readTime: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Publish Date</label>
                  <input
                    type="text"
                    value={articleForm.publishDate}
                    onChange={(e) => setArticleForm({ ...articleForm, publishDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Article Title (English) *</label>
                <input
                  type="text"
                  required
                  value={articleForm.titleEn}
                  onChange={(e) => setArticleForm({ ...articleForm, titleEn: e.target.value })}
                  placeholder="e.g. PM Surya Ghar 2026: Complete Subsidy Guide for Maharashtra"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Article Title (मराठी)</label>
                <input
                  type="text"
                  value={articleForm.titleMr}
                  onChange={(e) => setArticleForm({ ...articleForm, titleMr: e.target.value })}
                  placeholder="उदा. पीएम सूर्य घर योजना: महाराष्ट्रातील घरमालकांसाठी थेट बँक सबसिडी"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Cover Image URL</label>
                <input
                  type="text"
                  value={articleForm.image}
                  onChange={(e) => setArticleForm({ ...articleForm, image: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Short Excerpt (English)</label>
                <textarea
                  rows={2}
                  value={articleForm.excerptEn}
                  onChange={(e) => setArticleForm({ ...articleForm, excerptEn: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Article Body Content</label>
                <textarea
                  rows={4}
                  value={articleForm.contentEn}
                  onChange={(e) => setArticleForm({ ...articleForm, contentEn: e.target.value })}
                  placeholder="Enter detailed technical or policy guide content..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white resize-none"
                />
              </div>
            </div>

            <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setArticleModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveArticle}
                disabled={savingCms}
                className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow-md"
              >
                {savingCms ? 'Saving...' : editingArticleId ? 'Update Article' : 'Publish Article'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 3: TESTIMONIAL CRUD (ADD / EDIT)                         */}
      {/* ============================================================== */}
      {testimonialModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-xl w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-extrabold text-slate-900 text-lg font-['Outfit']">
                {editingTestimonialId ? 'Edit Customer Review' : 'Add Customer Testimonial'}
              </h3>
              <button
                type="button"
                onClick={() => setTestimonialModalOpen(false)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Client Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Shri Dilip Deshpande"
                  value={testimonialForm.clientName}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, clientName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">City / Location *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kothrud, Pune"
                  value={testimonialForm.city}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, city: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Role / Organization</label>
                <input
                  type="text"
                  placeholder="e.g. Homeowner / Factory MD"
                  value={testimonialForm.roleOrg}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, roleOrg: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Installed System Size</label>
                <input
                  type="text"
                  placeholder="e.g. 8 kW Rooftop / 350 kW"
                  value={testimonialForm.systemSize}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, systemSize: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white font-semibold"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Savings Highlight</label>
                <input
                  type="text"
                  placeholder="e.g. Bill reduced from ₹9,500 to ₹180/mo"
                  value={testimonialForm.savingsText}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, savingsText: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white font-bold text-emerald-800"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Review Feedback (English) *</label>
                <textarea
                  rows={3}
                  required
                  value={testimonialForm.commentEn}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, commentEn: e.target.value })}
                  placeholder="Enter the customer's quote..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white resize-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Review Feedback (मराठी)</label>
                <textarea
                  rows={2}
                  value={testimonialForm.commentMr}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, commentMr: e.target.value })}
                  placeholder="मराठीमध्ये ग्राहक अभिप्राय..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white resize-none"
                />
              </div>
            </div>

            <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setTestimonialModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveTestimonial}
                disabled={savingCms}
                className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow-md"
              >
                {savingCms ? 'Saving...' : editingTestimonialId ? 'Update Review' : 'Publish Review'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 4: JOB OPENINGS CRUD (ADD / EDIT)                        */}
      {/* ============================================================== */}
      {jobModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-xl w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-extrabold text-slate-900 text-lg font-['Outfit']">
                {editingJobId ? 'Edit Career Vacancy' : 'Post New Job Vacancy'}
              </h3>
              <button
                type="button"
                onClick={() => setJobModalOpen(false)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Job Title (English) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Solar Design & PVsyst Engineer"
                  value={jobForm.titleEn}
                  onChange={(e) => setJobForm({ ...jobForm, titleEn: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Department</label>
                <input
                  type="text"
                  value={jobForm.department}
                  onChange={(e) => setJobForm({ ...jobForm, department: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Experience (English)</label>
                <input
                  type="text"
                  placeholder="e.g. 2-4 Years"
                  value={jobForm.experienceEn}
                  onChange={(e) => setJobForm({ ...jobForm, experienceEn: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Location (English)</label>
                <input
                  type="text"
                  placeholder="e.g. Pune (Baner HQ)"
                  value={jobForm.locationEn}
                  onChange={(e) => setJobForm({ ...jobForm, locationEn: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Key Required Skills</label>
                <input
                  type="text"
                  placeholder="AutoCAD, PVsyst, MSEDCL Net-metering..."
                  value={jobForm.skills}
                  onChange={(e) => setJobForm({ ...jobForm, skills: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={jobForm.isActive}
                    onChange={(e) => setJobForm({ ...jobForm, isActive: e.target.checked })}
                    className="w-4 h-4 accent-emerald-600 rounded-sm"
                  />
                  <span>Active & Accepting WhatsApp Applications</span>
                </label>
              </div>
            </div>

            <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setJobModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveJob}
                disabled={savingCms}
                className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow-md"
              >
                {savingCms ? 'Saving...' : editingJobId ? 'Update Role' : 'Publish Vacancy'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
