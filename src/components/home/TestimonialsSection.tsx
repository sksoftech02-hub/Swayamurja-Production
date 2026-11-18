'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useContent } from '@/context/ContentContext';
import { Star, Quote, CheckCircle, ShieldCheck, IndianRupee } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { language } = useLanguage();
  const { content } = useContent();
  const isMr = language === 'mr';

  const testimonials = content?.testimonials || [];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-[#f4f8f6] relative overflow-hidden">
      {/* Decorative Blur elements */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>{isMr ? 'समाधानी ग्राहक अभिप्राय' : 'Verified Client Testimonials'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-['Outfit']">
            {isMr ? 'ग्राहकांचा स्वयमऊर्जेवरील दृढ विश्वास' : 'Loved by 1,200+ Homes, Factories & Farms'}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            {isMr
              ? 'पुणे, सोलापूर, सातारा आणि संपूर्ण महाराष्ट्रातील ग्राहकांचे प्रत्यक्ष अनुभव व वीजबिल बचतीचे पुरावे.'
              : 'Real stories and verified electricity bill savings from our solar power plant installations across Maharashtra.'}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between relative group"
            >
              <Quote className="w-12 h-12 text-emerald-100 absolute top-6 right-6 pointer-events-none group-hover:text-emerald-200/60 transition-colors" />

              <div className="space-y-4">
                {/* 5 Star Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs font-bold text-slate-500 ml-2">5.0 / 5.0</span>
                </div>

                {/* Savings Pill */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                  <IndianRupee className="w-3 h-3 text-emerald-700" />
                  <span>{item.savingsText}</span>
                </div>

                {/* Review Text */}
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed italic">
                  &ldquo;{isMr ? item.commentMr : item.commentEn}&rdquo;
                </p>
              </div>

              {/* Client Info Strip */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-slate-900 text-base font-['Outfit']">
                    {item.clientName}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {item.roleOrg} • <span className="font-semibold text-emerald-700">{item.city}</span>
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                    {item.systemSize}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
