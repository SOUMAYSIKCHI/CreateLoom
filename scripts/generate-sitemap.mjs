import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const project = path.resolve(root, '..');

const prompts = JSON.parse(
  fs.readFileSync(
    path.join(project, 'src/data/prompts.json'),
    'utf8'
  )
);

const blogs = JSON.parse(
  fs.readFileSync(
    path.join(project, 'src/data/blogs.json'),
    'utf8'
  )
);

const site = (
  process.env.SITE_URL || 'https://createloom.vercel.app'
).replace(/\/$/, '');

const staticUrls = [
  '/',
  '/prompts/',
  '/blog/',
  '/creator-hub/',
  '/brands/',
  '/about/',
  '/contact/',
  '/privacy/',
  '/terms/',
];

const promptUrls = prompts.map(
  (p) => `/prompt/${encodeURIComponent(p.id)}/`
);

const blogUrls = blogs.map(
  (b) => `/blog/${encodeURIComponent(b.id)}/`
);

const categoryUrls = [
  ...new Set(
    prompts
      .map((p) => p.category)
      .filter(Boolean)
  ),
].map(
  (category) =>
    `/prompts/${encodeURIComponent(category.toLowerCase())}/`
);

const urls = [
  ...staticUrls,
  ...promptUrls,
  ...blogUrls,
  ...categoryUrls,
];

const uniqueUrls = [...new Set(urls)];

const escapeXml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniqueUrls
  .map(
    (url) =>
      `  <url><loc>${escapeXml(`${site}${url}`)}</loc></url>`
  )
  .join('\n')}
</urlset>
`;

const publicDir = path.join(project, 'public');

fs.mkdirSync(publicDir, { recursive: true });

fs.writeFileSync(
  path.join(publicDir, 'sitemap.xml'),
  xml,
  'utf8'
);

console.log(
  `Generated sitemap.xml with ${uniqueUrls.length} URLs.`
);
