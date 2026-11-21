const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'app', 'admin', 'page.tsx');
let code = fs.readFileSync(filePath, 'utf8');

// 1. Update types import
code = code.replace(
  "DEFAULT_THEME \n} from '@/lib/types';",
  "DEFAULT_THEME,\n  CMSClient,\n  CMSTeamMember,\n  AboutUsContent\n} from '@/lib/types';"
);

// 2. Update lucide-react imports to include Upload and UserPlus
if (!code.includes('UserPlus')) {
  code = code.replace("Building2,", "Building2,\n  Upload,\n  UserPlus,");
}

// 3. Update activeTab type
code = code.replace(
  "const [activeTab, setActiveTab] = useState<'dashboard' | 'leads' | 'projects' | 'articles' | 'testimonials' | 'jobs' | 'stats' | 'tariffs' | 'contact' | 'theme'>('dashboard');",
  "const [activeTab, setActiveTab] = useState<'dashboard' | 'leads' | 'clients' | 'about' | 'projects' | 'articles' | 'testimonials' | 'jobs' | 'stats' | 'tariffs' | 'contact' | 'theme'>('dashboard');"
);

// 4. Add client and team state variables right after job form states
const targetAfterJobStates = "const [jobModalOpen, setJobModalOpen] = useState(false);";
const additionalStates = `const [jobModalOpen, setJobModalOpen] = useState(false);

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
`;
code = code.replace(targetAfterJobStates, additionalStates);

// 5. Update fetchCmsContent to load aboutUs and blogLinkedInUrl
code = code.replace(
  `        if (data.content.theme) {\n          setThemeForm(data.content.theme);\n        }`,
  `        if (data.content.theme) {\n          setThemeForm(data.content.theme);\n        }\n        if (data.content.aboutUs) {\n          setAboutUsForm(data.content.aboutUs);\n        }\n        if (data.content.blogLinkedInUrl) {\n          setLinkedInUrl(data.content.blogLinkedInUrl);\n        }`
);

// 6. Add client, about us, upload, and linkedin handlers right before openNewProjectModal
const targetBeforeProjectModal = "const openNewProjectModal = () => {";
const newHandlers = `  // ── CLIENT & TEAM CRUD HANDLERS ──
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
      id: \`c-\${Date.now()}\`,
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
      id: \`tm-\${Date.now()}\`,
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

  const openNewProjectModal = () => {`;
code = code.replace(targetBeforeProjectModal, newHandlers);

// 7. Add left navigation buttons for Clients & About Us
const targetNavTab = `{/* SITE SETTINGS & THEME STUDIO: Restricted to Super Admin (SK Softech) */}`;
const newNavButtons = `          <button
            type="button"
            onClick={() => setActiveTab('clients')}
            className={\`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer \${
              activeTab === 'clients'
                ? 'bg-emerald-800 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }\`}
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
            className={\`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer \${
              activeTab === 'about'
                ? 'bg-emerald-800 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }\`}
          >
            <div className="flex items-center gap-2.5">
              <Users className="w-4 h-4" />
              <span>About Us & Leadership</span>
            </div>
          </button>

          ` + targetNavTab;
code = code.replace(targetNavTab, newNavButtons);

// 8. Add panels for Clients and About Us right before TAB: PROJECTS CRUD
const targetTabPanel = `{/* TAB: PROJECTS CRUD */}`;
const newTabPanels = `{/* TAB: OUR CLIENTS SLIDER CRUD */}
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
                          className="max-h-16 max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all"
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

          {/* TAB: ABOUT US & LEADERSHIP */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              {/* MD & CEO Gratitude Message */}
              {aboutUsForm && (
                <form onSubmit={handleSaveAboutUs} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                    <div>
                      <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                        <Users className="w-5 h-5 text-emerald-600" />
                        Gratitude by MD & CEO (Rahul Nalawade)
                      </h2>
                      <p className="text-xs text-slate-500 mt-1">
                        Updates the official CEO message, photo, and leadership quote on the homepage.
                      </p>
                    </div>
                    <button
                      type="submit"
                      disabled={savingCms}
                      className="px-5 py-2.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer shrink-0"
                    >
                      <Save className="w-4 h-4" />
                      {savingCms ? 'Saving...' : 'Save CEO Message'}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <label className="block text-xs font-bold text-slate-700">CEO Profile Photo</label>
                      <div className="w-40 h-40 rounded-2xl overflow-hidden border border-slate-200 relative bg-slate-50">
                        <img
                          src={aboutUsForm.mdCeoMessage?.photo || '/uploads/team/rahul-nalawade.jpg'}
                          alt="MD & CEO"
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
                      Key Team Members & Designations
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

          ` + targetTabPanel;
code = code.replace(targetTabPanel, newTabPanels);

// 9. Add Blog LinkedIn URL input at top of articles tab
const targetArticlesTab = `{/* TAB: BLOG ARTICLES CRUD */}\n          {activeTab === 'articles' && (\n            <div className="space-y-6">`;
const newArticlesTab = `{/* TAB: BLOG ARTICLES CRUD */}
          {activeTab === 'articles' && (
            <div className="space-y-6">
              {/* Dynamic Blog LinkedIn URL Configuration */}
              <form onSubmit={handleSaveLinkedInUrl} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <ExternalLink className="w-4 h-4 text-emerald-600" />
                      Blogs Navigation Route (LinkedIn Page Redirect)
                    </h3>
                    <p className="text-xs text-slate-500">
                      When visitors click "Blogs" in the navigation bar, they are automatically routed to this LinkedIn page in a new tab.
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
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-mono focus:border-emerald-500"
                  />
                </div>
              </form>`;
code = code.replace(targetArticlesTab, newArticlesTab);

// 10. Add modals for client and team member at the end of the file
const targetModalEnd = `{/* PROJECT CRUD MODAL */}`;
const newAdminModals = `{/* CLIENT CRUD MODAL */}
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
                  <span className="text-[11px] text-slate-400">Saves to server's /uploads/clients/</span>
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
                  <span className="text-[11px] text-slate-400">Saves to server's /uploads/team/</span>
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

      ` + targetModalEnd;
code = code.replace(targetModalEnd, newAdminModals);

fs.writeFileSync(filePath, code, 'utf8');
console.log('Successfully upgraded AdminPage with Clients, About Us, and LinkedIn features!');
