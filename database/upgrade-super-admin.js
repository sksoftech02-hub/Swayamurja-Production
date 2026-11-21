const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'app', 'super-admin', 'page.tsx');
let code = fs.readFileSync(filePath, 'utf8');

// 1. Ensure Award and UserPlus are imported
if (!code.includes('Award,')) {
  code = code.replace("Image as ImageIcon", "Image as ImageIcon,\n  Award");
}

// 2. Insert TAB panels for clients and about right before {/* TAB 5: VISITOR CONTENT OVERVIEW */}
const targetMarker = "{/* TAB 5: VISITOR CONTENT OVERVIEW */}";
const clientsAndAboutPanels = `
        {/* TAB: OUR CLIENTS SLIDESHOW CRUD */}
        {activeTab === 'clients' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-cyan-400" />
                  Our Clients Logo Slideshow
                </h2>
                <p className="text-xs text-slate-400">
                  Manage the logos displayed on the homepage client marquee. Files are saved to the server and paths stored in DB.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setClientForm({ name: '', logo: '', website: '' });
                  setShowClientModal(true);
                }}
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                Add New Client Logo
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {(cmsContent?.clients || []).map((client: any) => (
                <div
                  key={client.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between group hover:border-cyan-500/50 transition-all"
                >
                  <div className="bg-white rounded-xl p-3 h-24 flex items-center justify-center mb-3 overflow-hidden">
                    {client.logo ? (
                      <img
                        src={client.logo}
                        alt={client.name}
                        className="max-h-16 max-w-full object-contain"
                      />
                    ) : (
                      <Building2 className="w-8 h-8 text-slate-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-xs truncate" title={client.name}>
                      {client.name}
                    </h3>
                    <p className="text-[10px] text-slate-500 font-mono truncate mt-0.5" title={client.logo}>
                      {client.logo}
                    </p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-slate-800 flex items-center justify-end">
                    <button
                      type="button"
                      onClick={() => handleDeleteClient(client.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-950/40 transition-colors cursor-pointer"
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

        {/* TAB: ABOUT US & LEADERSHIP CRUD */}
        {activeTab === 'about' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-cyan-400" />
                About Us & Leadership Management
              </h2>
              <p className="text-xs text-slate-400">
                Manage the MD & CEO gratitude message, vision, mission, and team designations.
              </p>
            </div>

            {/* 1. MD & CEO Message Card */}
            {aboutUsForm && (
              <form onSubmit={handleSaveAboutUs} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-400" />
                    Gratitude by MD & CEO (Rahul Nalawade)
                  </h3>
                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Save Leadership Message
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Photo & Upload */}
                  <div className="space-y-3">
                    <label className="block text-xs font-semibold text-slate-300">Profile Photo</label>
                    <div className="w-36 h-36 rounded-2xl overflow-hidden border-2 border-slate-700 relative bg-slate-950">
                      <img
                        src={aboutUsForm.mdCeoMessage?.photo || '/uploads/team/rahul-nalawade.jpg'}
                        alt="MD & CEO"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold cursor-pointer flex items-center gap-1.5">
                        <Upload className="w-3 h-3 text-cyan-400" />
                        <span>{uploadingCeoPhoto ? 'Uploading...' : 'Upload New Photo'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleUploadCeoPhoto}
                          disabled={uploadingCeoPhoto}
                        />
                      </label>
                    </div>
                    <input
                      type="text"
                      value={aboutUsForm.mdCeoMessage?.photo || ''}
                      onChange={(e) => setAboutUsForm({
                        ...aboutUsForm,
                        mdCeoMessage: { ...aboutUsForm.mdCeoMessage, photo: e.target.value }
                      })}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-400"
                      placeholder="/uploads/team/..."
                    />
                  </div>

                  {/* Names & Designations */}
                  <div className="md:col-span-2 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                        <input
                          type="text"
                          value={aboutUsForm.mdCeoMessage?.name || ''}
                          onChange={(e) => setAboutUsForm({
                            ...aboutUsForm,
                            mdCeoMessage: { ...aboutUsForm.mdCeoMessage, name: e.target.value }
                          })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Designation (English)</label>
                        <input
                          type="text"
                          value={aboutUsForm.mdCeoMessage?.designationEn || ''}
                          onChange={(e) => setAboutUsForm({
                            ...aboutUsForm,
                            mdCeoMessage: { ...aboutUsForm.mdCeoMessage, designationEn: e.target.value }
                          })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Inspirational Quote (English)</label>
                        <textarea
                          rows={2}
                          value={aboutUsForm.mdCeoMessage?.quoteEn || ''}
                          onChange={(e) => setAboutUsForm({
                            ...aboutUsForm,
                            mdCeoMessage: { ...aboutUsForm.mdCeoMessage, quoteEn: e.target.value }
                          })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Inspirational Quote (Marathi)</label>
                        <textarea
                          rows={2}
                          value={aboutUsForm.mdCeoMessage?.quoteMr || ''}
                          onChange={(e) => setAboutUsForm({
                            ...aboutUsForm,
                            mdCeoMessage: { ...aboutUsForm.mdCeoMessage, quoteMr: e.target.value }
                          })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Detailed Message / Gratitude (English)</label>
                      <textarea
                        rows={3}
                        value={aboutUsForm.mdCeoMessage?.messageEn || ''}
                        onChange={(e) => setAboutUsForm({
                          ...aboutUsForm,
                          mdCeoMessage: { ...aboutUsForm.mdCeoMessage, messageEn: e.target.value }
                        })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              </form>
            )}

            {/* 2. Team Members & Designations CRUD */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Users className="w-4 h-4 text-cyan-400" />
                    Key Team Members & Designations
                  </h3>
                  <p className="text-xs text-slate-400">Add profile photos, roles, designations and bios.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setTeamForm({ name: '', designationEn: '', designationMr: '', bioEn: '', bioMr: '', photo: '', linkedin: '' });
                    setShowTeamModal(true);
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  Add Team Designation
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(aboutUsForm?.teamMembers || []).map((m: any) => (
                  <div key={m.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex gap-4 items-start">
                    <img
                      src={m.photo || '/uploads/team/rahul-nalawade.jpg'}
                      alt={m.name}
                      className="w-16 h-16 rounded-xl object-cover border border-slate-700 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-white text-xs truncate">{m.name}</h4>
                        <button
                          type="button"
                          onClick={() => handleDeleteTeamMember(m.id)}
                          className="text-slate-500 hover:text-red-400 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] font-semibold text-emerald-400 truncate">{m.designationEn}</p>
                      <p className="text-[10px] text-slate-400 line-clamp-2 mt-1">{m.bioEn}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

`;

code = code.replace(targetMarker, clientsAndAboutPanels + "\n        " + targetMarker);

// 3. In TAB 5 (content tab), add the LinkedIn Blog URL editor card
const contentTarget = `<div className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-white">Visitor Content CRUD Modules</h2>`;

const linkedInCard = `<div className="space-y-6">
            {/* Dynamic Blog LinkedIn URL Configuration */}
            <form onSubmit={handleSaveLinkedInUrl} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-bold text-white text-sm flex items-center gap-2">
                    <Globe className="w-4 h-4 text-cyan-400" />
                    Blogs Navigation Route (LinkedIn Page Redirect)
                  </h3>
                  <p className="text-xs text-slate-400">
                    When visitors click "Blogs" in the navigation bar, they are automatically routed to this LinkedIn page in a new tab.
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
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
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:border-cyan-400"
                />
              </div>
            </form>

            <div>
              <h2 className="text-base font-bold text-white">Visitor Content CRUD Modules</h2>`;

code = code.replace(contentTarget, linkedInCard);

// 4. Add modals for Add Client and Add Team Member at the end of the file
const modalMarker = `{/* MODAL: CREATE NEW ADMIN USER */}`;
const newModals = `
      {/* MODAL: ADD CLIENT LOGO */}
      {showClientModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Building2 className="w-4 h-4 text-cyan-400" />
                Add Client to Slideshow
              </h3>
              <button
                type="button"
                onClick={() => setShowClientModal(false)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveClient} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Client / Company Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tata Motors / Ajanta Universal Fabrics"
                  value={clientForm.name}
                  onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Client Logo Image</label>
                <div className="flex gap-2 items-center mb-2">
                  <label className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold cursor-pointer flex items-center gap-1.5 shrink-0">
                    <Upload className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{uploadingClientLogo ? 'Uploading...' : 'Choose File'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleUploadClientLogo}
                      disabled={uploadingClientLogo}
                    />
                  </label>
                  <span className="text-[11px] text-slate-400">Saved to server's /uploads/clients/</span>
                </div>
                <input
                  type="text"
                  required
                  placeholder="/uploads/clients/logo.png or https://..."
                  value={clientForm.logo}
                  onChange={(e) => setClientForm({ ...clientForm, logo: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs font-mono placeholder-slate-600 focus:border-cyan-400"
                />
              </div>

              {clientForm.logo && (
                <div className="p-3 bg-white rounded-xl flex items-center justify-center">
                  <img src={clientForm.logo} alt="Preview" className="max-h-16 max-w-full object-contain" />
                </div>
              )}

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Website URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={clientForm.website}
                  onChange={(e) => setClientForm({ ...clientForm, website: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:border-cyan-400"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowClientModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading || uploadingClientLogo}
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold cursor-pointer"
                >
                  Save to Slideshow
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD TEAM MEMBER / DESIGNATION */}
      {showTeamModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-cyan-400" />
                Add Team Member / Designation
              </h3>
              <button
                type="button"
                onClick={() => setShowTeamModal(false)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveTeamMember} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anand Kulkarni"
                    value={teamForm.name}
                    onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Designation (English)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chief Technical Officer"
                    value={teamForm.designationEn}
                    onChange={(e) => setTeamForm({ ...teamForm, designationEn: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Designation (Marathi)</label>
                <input
                  type="text"
                  placeholder="e.g. मुख्य तांत्रिक अधिकारी"
                  value={teamForm.designationMr}
                  onChange={(e) => setTeamForm({ ...teamForm, designationMr: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Profile Photo</label>
                <div className="flex gap-2 items-center mb-2">
                  <label className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold cursor-pointer flex items-center gap-1.5 shrink-0">
                    <Upload className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{uploadingTeamPhoto ? 'Uploading...' : 'Choose File'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleUploadTeamPhoto}
                      disabled={uploadingTeamPhoto}
                    />
                  </label>
                  <span className="text-[11px] text-slate-400">Saved to server's /uploads/team/</span>
                </div>
                <input
                  type="text"
                  placeholder="/uploads/team/member.jpg"
                  value={teamForm.photo}
                  onChange={(e) => setTeamForm({ ...teamForm, photo: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs font-mono placeholder-slate-600 focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Short Bio / Background (English)</label>
                <textarea
                  rows={2}
                  placeholder="Specialization in solar EPC, substation design, etc."
                  value={teamForm.bioEn}
                  onChange={(e) => setTeamForm({ ...teamForm, bioEn: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">LinkedIn Profile Link (Optional)</label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/in/..."
                  value={teamForm.linkedin}
                  onChange={(e) => setTeamForm({ ...teamForm, linkedin: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:border-cyan-400"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowTeamModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading || uploadingTeamPhoto}
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold cursor-pointer"
                >
                  Add Team Designation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
`;

code = code.replace(modalMarker, newModals + "\n      " + modalMarker);

fs.writeFileSync(filePath, code, 'utf8');
console.log('Successfully upgraded SuperAdminPage with Clients, About Us, and LinkedIn features!');
