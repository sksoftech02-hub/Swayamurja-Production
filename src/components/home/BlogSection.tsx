'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useContent } from '@/context/ContentContext';
import { BookOpen, Clock, Calendar, ArrowRight, X, Sparkles } from 'lucide-react';
import { CMSArticle } from '@/lib/content-store';

export const BlogSection: React.FC = () => {
  const { language } = useLanguage();
  const { content } = useContent();
  const isMr = language === 'mr';

  const [activeArticle, setActiveArticle] = useState<CMSArticle | null>(null);

  const articles = content?.articles || [];

  return (
    <section id="blog" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-emerald-200">
            <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isMr ? 'सोलर ज्ञान व मार्गदर्शन' : 'Clean Energy Insights & Blog'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-['Outfit']">
            {isMr ? 'शासकीय धोरणे आणि तांत्रिक मार्गदर्शक' : 'Solar Policy, Subsidies & Tech Guides'}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            {isMr
              ? 'महाराष्ट्र शासनाचे वीज दर, पीएम सूर्य घर सबसिडी आणि सोलर गुंतवणुकीवर तज्ज्ञ विश्लेषणाचे लेख.'
              : 'Stay informed on MNRE subsidies, MSEDCL net-metering regulations, and financial solar ROI.'}
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art) => (
            <article
              key={art.id}
              className="bg-[#f8faf9] rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              onClick={() => setActiveArticle(art)}
            >
              <div>
                {/* Article Image */}
                <div className="h-52 w-full overflow-hidden relative">
                  <img
                    src={art.image}
                    alt={isMr ? art.titleMr : art.titleEn}
                    width={600}
                    height={400}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-amber-300 border border-slate-700">
                      {art.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                      {art.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                      {art.publishDate}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 font-['Outfit'] leading-snug group-hover:text-emerald-800 transition-colors">
                    {isMr ? art.titleMr : art.titleEn}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {isMr ? art.excerptMr : art.excerptEn}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-200/60 mt-4 flex items-center justify-between text-xs font-bold text-emerald-800">
                <span>{isMr ? 'संपूर्ण लेख वाचा' : 'Read Full Article'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Full Article Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 inline-block">
                {activeArticle.category}
              </span>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit']">
                {isMr ? activeArticle.titleMr : activeArticle.titleEn}
              </h2>

              <div className="flex items-center gap-4 text-xs text-slate-500 pb-4 border-b border-slate-100">
                <span>{activeArticle.publishDate}</span>
                <span>•</span>
                <span>{activeArticle.readTime}</span>
              </div>

              <div className="rounded-2xl overflow-hidden h-64 w-full">
                <img
                  src={activeArticle.image}
                  alt={isMr ? activeArticle.titleMr : activeArticle.titleEn}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-sm sm:text-base text-slate-700 leading-relaxed space-y-4 pt-2">
                <p className="font-semibold text-emerald-950">
                  {isMr ? activeArticle.excerptMr : activeArticle.excerptEn}
                </p>
                <p>
                  {isMr ? activeArticle.contentMr : activeArticle.contentEn}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">Need specific solar advice for your roof?</span>
                <a
                  href="#contact"
                  onClick={() => setActiveArticle(null)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs shadow-md"
                >
                  Book Free Site Feasibility Survey
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
