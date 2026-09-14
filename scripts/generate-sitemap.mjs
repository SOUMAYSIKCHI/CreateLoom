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
  process.env.SITE_URL || 'https://createwithsoumay.store'
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
  .map((p) => ({
    url: `/prompt/${encodeURIComponent(p.id)}/`,
    lastmod: p.updatedAt || p.createdAt || null,
  }));

const blogUrls = blogs
  .filter((b) => b?.id)
  .map((b) => ({
    url: `/blog/${encodeURIComponent(b.id)}/`,
    lastmod: b.updatedAt || b.date || b.createdAt || null,
  }));

const categoryUrls = [
  ...new Set(
    prompts
      .map((p) => p?.category)
      .filter(Boolean)
      .map((category) => category.trim().toLowerCase())
  ),
].map((category) => ({
  url: `/prompts/${encodeURIComponent(category)}/`,
  lastmod: null,
}));

const urls = [
  ...staticUrls.map((url) => ({
    url,
    lastmod: null,
  })),
  ...promptUrls,
  ...blogUrls,
  ...categoryUrls,
];

const uniqueUrls = [
  ...new Map(
    urls.map((item) => [item.url, item])
  ).values(),
];

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
  .map(({ url, lastmod }) => {
    const lastmodXml = lastmod
      ? `\n    <lastmod>${escapeXml(lastmod)}</lastmod>`
      : '';

    return `  <url>
    <loc>${escapeXml(`${site}${url}`)}</loc>${lastmodXml}
  </url>`;
  })
  .join('\n')}
</urlset>
`;

const publicDir = path.join(project, 'public');

fs.mkdirSync(publicDir, { recursive: true });

const sitemapPath = path.join(
  publicDir,
  'sitemap.xml'
);

fs.writeFileSync(
  sitemapPath,
  xml,
  'utf8'
);

console.log(
  `Generated sitemap.xml with ${uniqueUrls.length} URLs.`
);
