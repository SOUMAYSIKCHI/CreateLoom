import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const project = path.resolve(root, '..');
const prompts = JSON.parse(fs.readFileSync(path.join(project, 'src/data/prompts.json'), 'utf8'));
const blogs = JSON.parse(fs.readFileSync(path.join(project, 'src/data/blogs.json'), 'utf8'));
const site = (process.env.SITE_URL || 'https://createloom.vercel.app').replace(/\/$/, '');
const urls = [
  '/', '/prompts/', '/blog/', '/creator-hub/', '/brands/', '/about/', '/contact/', '/privacy/', '/terms/',
  ...prompts.map(p => `/prompt/${p.id}/`),
  ...blogs.map(b => `/blog/${b.id}/`),
  ...[...new Set(prompts.map(p => p.category))].map(c => `/prompts/${encodeURIComponent(c.toLowerCase())}/`)
];
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>${site}${u}</loc></url>`).join('\n')}\n</urlset>\n`;
fs.mkdirSync(path.join(project, 'public'), { recursive: true });
fs.writeFileSync(path.join(project, 'public/sitemap.xml'), xml);
