import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const project = path.resolve(root, '..');

const readJson = (file) =>
  JSON.parse(
    fs.readFileSync(
      path.join(project, file),
      'utf8'
    )
  );

const prompts = readJson('src/data/prompts.json');
const blogs = readJson('src/data/blogs.json');

const site = (
  process.env.SITE_URL || 'https://createloom.vercel.app'
).replace(/\/+$/, '');

const staticUrls = [
  '/',
  '/prompts/',
  '/blog/',
  '/creator-hub/',
  '/creator-tools/trending-hashtags/',
  '/brands/',
  '/about/',
  '/contact/',
];

const promptUrls = prompts
  .filter((p) => p?.id)
  .map(
    (p) => `/prompt/${encodeURIComponent(p.id)}/`
  );

const blogUrls = blogs
  .filter((b) => b?.id)
  .map(
    (b) => `/blog/${encodeURIComponent(b.id)}/`
  );

const categoryUrls = [
  ...new Set(
    prompts
      .map((p) => p?.category)
      .filter(Boolean)
      .map((category) => category.trim().toLowerCase())
  ),
].map(
  (category) =>
    `/prompts/${encodeURIComponent(category)}/`
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

const sitemapPath = path.join(publicDir, 'sitemap.xml');

fs.writeFileSync(
  sitemapPath,
  xml,
  'utf8'
);

console.log(
  `Generated sitemap.xml with ${uniqueUrls.length} URLs.`
);
