const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

async function migrateContent() {
  const contentFile = path.join(__dirname, '..', 'data', 'site-content.json');
  if (!fs.existsSync(contentFile)) {
    console.log('No site-content.json found.');
    return;
  }

  const content = JSON.parse(fs.readFileSync(contentFile, 'utf-8'));
  const client = new Client({
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: 'root',
    database: 'swayamurja_db',
  });
  await client.connect();

  console.log('Migrating Projects...');
  if (Array.isArray(content.projects)) {
    for (const [idx, p] of content.projects.entries()) {
      await client.query(`
        INSERT INTO projects (id, category, title_en, title_mr, capacity, location_en, location_mr, highlight_en, highlight_mr, image_url, display_order)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        ON CONFLICT (id) DO UPDATE SET 
          title_en = EXCLUDED.title_en,
          title_mr = EXCLUDED.title_mr,
          capacity = EXCLUDED.capacity,
          image_url = EXCLUDED.image_url;
      `, [p.id, p.category, p.titleEn, p.titleMr, p.capacity, p.locationEn, p.locationMr, p.highlightEn, p.highlightMr, p.image, idx]);
    }
    console.log(`Migrated ${content.projects.length} projects.`);
  }

  console.log('Migrating Testimonials...');
  if (Array.isArray(content.testimonials)) {
    for (const t of content.testimonials) {
      await client.query(`
        INSERT INTO testimonials (id, client_name, role_org, city, rating, system_size, savings_text, comment_en, comment_mr)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        ON CONFLICT (id) DO UPDATE SET 
          comment_en = EXCLUDED.comment_en,
          comment_mr = EXCLUDED.comment_mr;
      `, [t.id, t.clientName, t.roleOrg, t.city, t.rating || 5, t.systemSize, t.savingsText, t.commentEn, t.commentMr]);
    }
    console.log(`Migrated ${content.testimonials.length} testimonials.`);
  }

  console.log('Migrating Articles...');
  if (Array.isArray(content.articles)) {
    for (const a of content.articles) {
      await client.query(`
        INSERT INTO articles (id, title_en, title_mr, category, read_time, publish_date, image_url, excerpt_en, excerpt_mr, content_en, content_mr)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        ON CONFLICT (id) DO UPDATE SET 
          title_en = EXCLUDED.title_en,
          title_mr = EXCLUDED.title_mr,
          content_en = EXCLUDED.content_en;
      `, [a.id, a.titleEn, a.titleMr, a.category, a.readTime, a.publishDate, a.image, a.excerptEn, a.excerptMr, a.contentEn, a.contentMr]);
    }
    console.log(`Migrated ${content.articles.length} articles.`);
  }

  console.log('Migrating Job Postings...');
  if (Array.isArray(content.openJobs)) {
    for (const j of content.openJobs) {
      await client.query(`
        INSERT INTO job_postings (id, title_en, title_mr, department, experience_en, experience_mr, location_en, location_mr, skills, is_active)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        ON CONFLICT (id) DO UPDATE SET 
          title_en = EXCLUDED.title_en,
          skills = EXCLUDED.skills;
      `, [j.id, j.titleEn, j.titleMr, j.department, j.experienceEn, j.experienceMr, j.locationEn, j.locationMr, j.skills, j.isActive ?? true]);
    }
    console.log(`Migrated ${content.openJobs.length} job postings.`);
  }

  await client.end();
  console.log('Content migration to PostgreSQL complete!');
}

migrateContent().catch(err => {
  console.error('Migration error:', err);
  process.exit(1);
});
