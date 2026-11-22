import { prisma } from './db';
import { SiteContent } from './types';

/**
 * Mirrors CMS content updates cleanly into relational PostgreSQL tables
 * so Prisma Studio (:5555) and Super Admin KPI telemetry stay 100% synchronized.
 */
export async function syncContentToDatabase(content: SiteContent): Promise<void> {
  try {
    if (Array.isArray(content.projects)) {
      await prisma.$transaction(async (tx) => {
        await tx.project.deleteMany({});
        for (let i = 0; i < content.projects.length; i++) {
          const p = content.projects[i];
          await tx.project.create({
            data: {
              id: String(p.id).slice(0, 50),
              category: String(p.category || 'commercial').slice(0, 50),
              titleEn: String(p.titleEn || '').slice(0, 255),
              titleMr: String(p.titleMr || p.titleEn || '').slice(0, 255),
              capacity: String(p.capacity || '').slice(0, 100),
              locationEn: String(p.locationEn || '').slice(0, 150),
              locationMr: String(p.locationMr || p.locationEn || '').slice(0, 150),
              highlightEn: p.highlightEn || null,
              highlightMr: p.highlightMr || null,
              imageUrl: String(p.image || ''),
              displayOrder: i + 1,
              isPublished: true,
            },
          });
        }
      });
    }

    if (Array.isArray(content.testimonials)) {
      await prisma.$transaction(async (tx) => {
        await tx.testimonial.deleteMany({});
        for (const t of content.testimonials) {
          await tx.testimonial.create({
            data: {
              id: String(t.id).slice(0, 50),
              clientName: String(t.clientName || '').slice(0, 150),
              roleOrg: t.roleOrg ? String(t.roleOrg).slice(0, 200) : null,
              city: t.city ? String(t.city).slice(0, 100) : null,
              rating: Math.min(5, Math.max(1, Number(t.rating) || 5)),
              systemSize: t.systemSize ? String(t.systemSize).slice(0, 100) : null,
              savingsText: t.savingsText ? String(t.savingsText).slice(0, 150) : null,
              commentEn: String(t.commentEn || ''),
              commentMr: String(t.commentMr || t.commentEn || ''),
              isPublished: true,
            },
          });
        }
      });
    }

    if (Array.isArray(content.articles)) {
      await prisma.$transaction(async (tx) => {
        await tx.article.deleteMany({});
        for (const a of content.articles) {
          await tx.article.create({
            data: {
              id: String(a.id).slice(0, 50),
              titleEn: String(a.titleEn || '').slice(0, 255),
              titleMr: String(a.titleMr || a.titleEn || '').slice(0, 255),
              category: String(a.category || 'General').slice(0, 100),
              readTime: String(a.readTime || '4 min read').slice(0, 50),
              publishDate: a.publishDate ? String(a.publishDate).slice(0, 50) : null,
              imageUrl: String(a.image || ''),
              excerptEn: a.excerptEn || null,
              excerptMr: a.excerptMr || null,
              contentEn: String(a.contentEn || ''),
              contentMr: String(a.contentMr || a.contentEn || ''),
              isPublished: true,
            },
          });
        }
      });
    }

    if (Array.isArray(content.openJobs)) {
      await prisma.$transaction(async (tx) => {
        await tx.jobPosting.deleteMany({});
        for (const j of content.openJobs) {
          await tx.jobPosting.create({
            data: {
              id: String(j.id).slice(0, 50),
              titleEn: String(j.titleEn || '').slice(0, 200),
              titleMr: String(j.titleMr || j.titleEn || '').slice(0, 200),
              department: String(j.department || 'General').slice(0, 100),
              experienceEn: j.experienceEn ? String(j.experienceEn).slice(0, 100) : null,
              experienceMr: j.experienceMr ? String(j.experienceMr).slice(0, 100) : null,
              locationEn: j.locationEn ? String(j.locationEn).slice(0, 100) : null,
              locationMr: j.locationMr ? String(j.locationMr).slice(0, 100) : null,
              skills: j.skills || null,
              isActive: j.isActive !== false,
            },
          });
        }
      });
    }

    if (content.tariffs) {
      const existingTariff = await prisma.solarTariff.findFirst({ orderBy: { id: 'asc' } });
      const tariffData = {
        residentialUnitRate: Number(content.tariffs.residentialUnitRate) || 8.5,
        commercialUnitRate: Number(content.tariffs.commercialUnitRate) || 11.5,
        housingSocietyRate: Number(content.tariffs.housingUnitRate) || 9.2,
        pmSuryaGhar1kw: Number(content.tariffs.pmSuryaGhar1Kw) || 30000,
        pmSuryaGhar2kw: Number(content.tariffs.pmSuryaGhar2Kw) || 60000,
        pmSuryaGhar3kwMax: Number(content.tariffs.pmSuryaGhar3KwMax) || 78000,
      };
      if (existingTariff) {
        await prisma.solarTariff.update({ where: { id: existingTariff.id }, data: tariffData });
      } else {
        await prisma.solarTariff.create({ data: tariffData });
      }
    }

    if (content.theme) {
      const existingTheme = await prisma.themeSetting.findFirst({ orderBy: { id: 'asc' } });
      const themeData = {
        themeId: String(content.theme.id || 'solar-gold-navy').slice(0, 50),
        name: String(content.theme.name || 'Default Theme').slice(0, 100),
        primaryColor: String(content.theme.primaryColor || '#f59e0b').slice(0, 20),
        secondaryColor: String(content.theme.secondaryColor || '#0284c7').slice(0, 20),
        accentColor: String(content.theme.accentColor || '#16a34a').slice(0, 20),
        backgroundColor: '#f8faf9',
        cardBgColor: '#ffffff',
        textColor: '#0f172a',
        fontFamily: 'Outfit, Inter',
        isActive: true,
      };
      if (existingTheme) {
        await prisma.themeSetting.update({ where: { id: existingTheme.id }, data: themeData });
      } else {
        await prisma.themeSetting.create({ data: themeData });
      }
    }
  } catch (err) {
    console.error('Non-fatal PostgreSQL CMS sync warning:', err);
  }
}
