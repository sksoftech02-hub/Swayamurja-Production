'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useContent } from '@/context/ContentContext';
import { DEFAULT_THEME, SiteTheme } from '@/lib/theme-presets';
import { Send, MessageSquare, Phone, Mail, MapPin, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const { t, language } = useLanguage();
  const { content } = useContent();
  const theme: SiteTheme = content?.theme || DEFAULT_THEME;
  const isMr = language === 'mr';

  const contactPhone = content?.companyContact?.phone || '+91 92721 00623';
  const contactTelHref = contactPhone.replace(/[^+0-9]/g, '');
  const contactWaDigits = (content?.companyContact?.whatsapp || contactPhone).replace(/[^0-9]/g, '') || '919272100623';
  const contactEmail = content?.companyContact?.email || 'crm@swayamurja.com';
  const contactAddressEn =
    content?.companyContact?.address ||
    'T9, A-1001, Brahma Business Park, New Kalyani Nagar, Wadgaon Sheri, Pune 411014';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Residential Rooftop Solar',
    monthlyBill: '',
    city: '',
    notes: '',
  });

  // Receive Solar Calculator estimates cleanly via React state (fixes controlled-input wipe)
  useEffect(() => {
    const handlePrefill = (event: Event) => {
      const detail = (event as CustomEvent<{ monthlyBill?: string; notes?: string; service?: string }>).detail;
      if (!detail) return;
      setSuccess(false);
      setFormData((prev) => ({
        ...prev,
        monthlyBill: detail.monthlyBill ?? prev.monthlyBill,
        notes: detail.notes ?? prev.notes,
        service: detail.service ?? prev.service,
      }));
    };
    window.addEventListener('swayamurja:prefill-contact', handlePrefill);
    return () => window.removeEventListener('swayamurja:prefill-contact', handlePrefill);
  }, []);

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Phone validation
    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      setErrorMsg(
        isMr
          ? 'कृपया वैध १० अंकी भारतीय मोबाईल नंबर प्रविष्ट करा.'
          : 'Please enter a valid 10-digit Indian mobile number.'
      );
      return;
    }

    if (formData.name.trim().length < 2) {
      setErrorMsg(
        isMr
          ? 'कृपया तुमचे पूर्ण नाव प्रविष्ट करा.'
          : 'Please enter your full name.'
      );
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setFormData({
          name: '',
          phone: '',
          email: '',
          service: 'Residential Rooftop Solar',
          monthlyBill: '',
          city: '',
          notes: '',
        });
      } else {
        setErrorMsg(data.error || 'Failed to submit inquiry. Please try again.');
      }
    } catch (err) {
      setErrorMsg('Network error. Please try again or message via WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleWhatsAppDirect = () => {
    const name = formData.name || 'Customer';
    const city = formData.city || 'Maharashtra';
    const msg = encodeURIComponent(
      `Hi SwayamUrja Team, my name is ${name} from ${city}. I am interested in ${formData.service} with monthly electricity bill of ${formData.monthlyBill || 'N/A'}. Please share technical proposal and quotation.`
    );
    window.open(`https://wa.me/${contactWaDigits}?text=${msg}`, '_blank');
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-slate-900 to-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-800">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t('contact_tag')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-['Outfit']">
            {t('contact_title')}
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            {t('contact_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-slate-800/80 rounded-3xl p-8 border border-slate-700/80 space-y-6">
              <h3 className="text-2xl font-bold font-['Outfit'] text-amber-400">
                {isMr ? 'थेट संपर्क माहिती' : 'Direct Solar Consultation'}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {isMr
                  ? 'तुमच्या घरासाठी किंवा कारखान्यासाठी सौर ऊर्जेची व्यवहार्यता समजून घेण्यासाठी आमचे सिनियर इंजिनिअर्स २४ तासांत संपर्क करतील.'
                  : 'Speak directly with our EPC project leads to discuss net-metering, subsidy approvals, or high-capacity utility solar plants.'}
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-4 text-sm">
                  <div className="w-10 h-10 rounded-xl bg-emerald-900/60 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-700">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">{isMr ? 'थेट फोन' : 'Direct Helpline'}</span>
                    <a href={`tel:${contactTelHref}`} className="font-bold text-white hover:text-emerald-400 transition-colors">
                      {contactPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <div className="w-10 h-10 rounded-xl bg-emerald-900/60 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-700">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">{isMr ? 'अधिकृत ईमेल' : 'Official Enquiries'}</span>
                    <a href={`mailto:${contactEmail}`} className="font-bold text-white hover:text-emerald-400 transition-colors">
                      {contactEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 text-sm">
                  <div className="w-10 h-10 rounded-xl bg-emerald-900/60 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-700 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">{isMr ? 'पुणे मुख्य कार्यालय' : 'Pune Headquarters'}</span>
                    <span className="font-semibold text-white text-xs leading-relaxed block">
                      {isMr 
                        ? 'टी९, ए-१००१, ब्रह्मा बिझनेस पार्क, न्यू कल्याणी नगर, वडगाव शेरी, पुणे ४११०१४'
                        : contactAddressEn
                      }
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-amber-300" />
                  <span>{t('f_submit_wa')}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7">
            <div className="bg-slate-800 rounded-3xl p-8 sm:p-10 border border-slate-700 shadow-2xl">
              
              {success ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/50">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold font-['Outfit'] text-white">
                    {isMr ? 'माहिती यशस्वीरित्या नोंदवली गेली!' : 'Survey Request Received!'}
                  </h3>
                  <p className="text-slate-300 text-sm max-w-md mx-auto">
                    {t('f_success')}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSuccess(false)}
                    className="mt-6 px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs"
                  >
                    {isMr ? 'दुसरा अर्ज करा' : 'Submit Another Inquiry'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {errorMsg && (
                    <div className="p-4 rounded-xl bg-rose-900/60 border border-rose-500 text-rose-200 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-slate-300">
                        {t('f_name')} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={isMr ? 'उदा. रमेश पाटील' : 'e.g. Ramesh Patil'}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-hidden focus:border-amber-400 transition-colors"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-slate-300">
                        {t('f_phone')} *
                      </label>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder={isMr ? 'उदा. ९८२२०१२३४५' : 'e.g. 9822012345'}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-hidden focus:border-amber-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-slate-300">
                        {t('f_email')}
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={isMr ? 'उदा. name@example.com' : 'e.g. name@example.com'}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-hidden focus:border-amber-400 transition-colors"
                      />
                    </div>

                    {/* Service */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-slate-300">
                        {t('f_service')}
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-hidden focus:border-amber-400 transition-colors"
                      >
                        <option value="Residential Rooftop Solar">Residential Rooftop (PM Surya Ghar)</option>
                        <option value="Commercial & Industrial (C&I)">Commercial & Industrial (C&I)</option>
                        <option value="13 MW+ Utility Scale Solar">13 MW+ Utility Scale Plant</option>
                        <option value="Agri-Solar (PM-KUSUM)">Agri-Solar (PM-KUSUM)</option>
                        <option value="BESS Battery Storage">BESS Energy Storage</option>
                        <option value="Solar Maintenance & O&M">Solar Maintenance & O&M</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Monthly Bill */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-slate-300">
                        {t('f_bill')}
                      </label>
                      <input
                        id="clientBill"
                        type="text"
                        value={formData.monthlyBill}
                        onChange={(e) => setFormData({ ...formData, monthlyBill: e.target.value })}
                        placeholder={isMr ? 'उदा. ₹ ४,५००' : 'e.g. ₹ 4,500'}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-hidden focus:border-amber-400 transition-colors"
                      />
                    </div>

                    {/* City */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-slate-300">
                        {t('f_city')} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder={isMr ? 'उदा. पुणे, सोलापूर, सातारा, चाकण' : 'e.g. Pune, Solapur, Satara, Chakan'}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-hidden focus:border-amber-400 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Notes / Details */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-300">
                      {t('f_msg')}
                    </label>
                    <textarea
                      id="clientNotes"
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder={
                        isMr
                          ? 'छताचे क्षेत्रफळ, वीज वापर किंवा इतर माहिती प्रविष्ट करा...'
                          : 'Describe roof type, monthly units, or specific queries...'
                      }
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-hidden focus:border-amber-400 transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      style={{
                        backgroundColor: theme.primaryColor || '#f59e0b',
                        color: '#ffffff',
                        boxShadow: `0 10px 25px -5px ${theme.primaryColor || '#f59e0b'}80`,
                      }}
                      className="w-full py-4 rounded-2xl hover:opacity-95 font-extrabold text-base shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <Send className="w-4 h-4 text-white" />
                      <span>{submitting ? (isMr ? 'नोंदणी करत आहे...' : 'Submitting Request...') : t('f_submit')}</span>
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
