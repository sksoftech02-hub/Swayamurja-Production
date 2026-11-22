'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useContent } from '@/context/ContentContext';
import { Briefcase, MessageSquare, MapPin, Clock } from 'lucide-react';
import { CMSJob } from '@/lib/types';

const DEFAULT_JOBS: CMSJob[] = [
  {
    id: 'j-1',
    titleEn: 'Solar Design & PVsyst Engineer',
    titleMr: 'सोलर डिझाईन आणि PVsyst इंजिनिअर',
    department: 'Engineering & Design',
    experienceEn: '2-4 Years',
    experienceMr: '२-४ वर्षे अनुभव',
    locationEn: 'Pune (New Kalyani Nagar HQ)',
    locationMr: 'पुणे (न्यू कल्याणी नगर मुख्यालय)',
    skills: 'AutoCAD, PVsyst, 3D SketchUp, Single Line Diagrams (SLD), MSEDCL Net-metering rules.',
    isActive: true,
  },
  {
    id: 'j-2',
    titleEn: 'Solar Site Supervisor / EPC Project Incharge',
    titleMr: 'सोलर साइट सुपरवायझर / EPC प्रकल्प इनचार्ज',
    department: 'Operations & Execution',
    experienceEn: '1-3 Years',
    experienceMr: '१-३ वर्षे अनुभव',
    locationEn: 'Pune / Solapur Sites',
    locationMr: 'पुणे / सोलापूर प्रकल्प',
    skills: 'Civil foundation, module mounting structure (MMS), HT/LT cabling, invertor commissioning.',
    isActive: true,
  },
  {
    id: 'j-3',
    titleEn: 'Business Development Manager (C&I Solar)',
    titleMr: 'बिझनेस डेव्हलपमेंट मॅनेजर (C&I सोलर)',
    department: 'Corporate Sales',
    experienceEn: '3-6 Years',
    experienceMr: '३-६ वर्षे अनुभव',
    locationEn: 'Pune (MIDC Belt: Chakan/Talegaon)',
    locationMr: 'पुणे (चाकण व तळेगाव MIDC)',
    skills: 'B2B industrial client acquisition, 40% tax depreciation presentations, CAPEX/OPEX models.',
    isActive: true,
  }
];

export const CareersSection: React.FC = () => {
  const { language } = useLanguage();
  const { content } = useContent();
  const isMr = language === 'mr';

  const jobsList: CMSJob[] = (content?.openJobs && content.openJobs.length > 0)
    ? content.openJobs.filter(j => j.isActive !== false)
    : DEFAULT_JOBS;

  const whatsappDigits =
    (content?.companyContact?.whatsapp || content?.companyContact?.phone || '919272100623').replace(/[^0-9]/g, '') ||
    '919272100623';

  const applyViaWhatsApp = (jobTitle: string) => {
    const text = encodeURIComponent(
      `Hello SwayamUrja HR Team, I am interested in applying for the position of "${jobTitle}". Please let me know how to share my CV / resume.`
    );
    window.open(`https://wa.me/${whatsappDigits}?text=${text}`, '_blank');
  };

  return (
    <section id="careers" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-emerald-200">
            <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isMr ? 'करिअर संधी' : 'Career Opportunities'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-['Outfit']">
            {isMr ? 'स्वयम्ऊर्जा परिवारात सामील व्हा' : 'Build India’s Clean Energy Future'}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            {isMr
              ? 'सोलर क्षेत्रातील अनुभवी अभियंते व प्रोफेशनल्ससाठी आकर्षक संधी. १-क्लिकमध्ये थेट व्हॉट्सअ‍ॅपवर अर्ज करा.'
              : 'Join our mission to power homes and factories with sustainable energy. Fast-track your application directly via WhatsApp.'}
          </p>
        </div>

        {/* Job Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {jobsList.map((job) => (
            <div
              key={job.id}
              className="bg-[#f8faf9] rounded-3xl p-8 border border-slate-200 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 inline-block">
                  {job.department}
                </span>

                <h3 className="text-xl font-bold text-slate-900 font-['Outfit']">
                  {isMr ? job.titleMr : job.titleEn}
                </h3>

                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    <span>{isMr ? job.experienceMr : job.experienceEn}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    <span>{isMr ? job.locationMr : job.locationEn}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-xs font-semibold text-slate-500 block mb-1">
                    {isMr ? 'अपेक्षित कौशल्ये:' : 'Key Skills:'}
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed bg-white p-3 rounded-xl border border-slate-200/60">
                    {job.skills}
                  </p>
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="button"
                  onClick={() => applyViaWhatsApp(job.titleEn)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-amber-300" />
                  <span>{isMr ? 'व्हॉट्सअ‍ॅपवर अर्ज करा' : 'Apply via WhatsApp'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
