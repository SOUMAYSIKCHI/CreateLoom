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
const trends = readJson('src/data/trends.json');
const guides = readJson('src/data/ai-photo-guides.json');

const site = (
  process.env.SITE_URL ||
  'https://www.createwithsoumay.store'
).replace(/\/+$/, '');

const today = new Date();
today.setHours(23, 59, 59, 999);

/**
 * Returns true when an item should be included
 * in the sitemap.
 *
 * Explicitly unpublished/draft content is excluded.
 * Future-dated content is also excluded when its
 * date field is in the future.
 */
const isPublished = (item) => {
  if (!item || typeof item !== 'object') return false;

  if (item.published === false) return false;
  if (item.isPublished === false) return false;
  if (item.draft === true) return false;
  if (item.noIndex === true) return false;
  if (item.indexable === false) return false;

  const possibleDate =
    item.publishedAt ||
    item.publishDate ||
    item.date ||
    item.createdAt;

  if (possibleDate) {
    const date = new Date(possibleDate);

    if (!Number.isNaN(date.getTime()) && date > today) {
      return false;
    }
  }

  return true;
};

/**
 * Prevent invalid/future lastmod values.
 */
const getLastMod = (...values) => {
  const value = values.find(Boolean);

  if (!value) return null;

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  if (date > today) {
    return null;
  }

  return value;
};

/**
 * Static pages
 */
const staticUrls = [
  '/',
  '/prompts/',
  '/blog/',
  '/trends/',
  '/ai-photo-guides/',
  '/creator-hub/',
  '/creator-tools/trending-hashtags/',
  '/brands/',
  '/about/',
  '/contact/',
];

/**
 * Prompt detail pages
 */
const promptUrls = prompts
  .filter(isPublished)
  .filter((p) => p?.id)
  .map((p) => ({
    url: `/prompt/${encodeURIComponent(p.id)}/`,
    lastmod: getLastMod(
      p.updatedAt,
      p.createdAt
    ),
  }));

/**
 * Blog detail pages
 */
const blogUrls = blogs
  .filter(isPublished)
  .filter((b) => b?.id)
  .map((b) => ({
    url: `/blog/${encodeURIComponent(b.id)}/`,
    lastmod: getLastMod(
      b.updatedAt,
      b.date,
      b.createdAt
    ),
  }));

/**
 * AI Photo Trend detail pages
 *
 * Route:
 * /trends/[slug]/
 */
const trendUrls = trends
  .filter(isPublished)
  .filter((trend) => trend?.slug)
  .map((trend) => ({
    url: `/trends/${encodeURIComponent(trend.slug)}/`,
    lastmod: getLastMod(
      trend.updatedAt,
      trend.updatedDate,
      trend.date,
      trend.createdAt
    ),
  }));

/**
 * AI Photo Guide detail pages
 *
 * Route:
 * /ai-photo-guides/[slug]/
 */
const guideUrls = guides
  .filter(isPublished)
  .filter((guide) => guide?.slug)
  .map((guide) => ({
    url: `/ai-photo-guides/${encodeURIComponent(guide.slug)}/`,
    lastmod: getLastMod(
      guide.updatedAt,
      guide.updatedDate,
      guide.date,
      guide.createdAt
    ),
  }));

/**
 * Prompt category pages
 */
const categoryUrls = [
  ...new Set(
    prompts
      .filter(isPublished)
      .map((p) => p?.category)
      .filter(Boolean)
      .map((category) =>
        category.trim().toLowerCase()
      )
  ),
].map((category) => ({
  url: `/prompts/${encodeURIComponent(category)}/`,
  lastmod: null,
}));

/**
 * Combine everything
 */
const urls = [
  ...staticUrls.map((url) => ({
    url,
    lastmod: null,
  })),

  ...promptUrls,
  ...blogUrls,
  ...trendUrls,
  ...guideUrls,
  ...categoryUrls,
];

/**
 * Remove duplicate URLs
 */
const uniqueUrls = [
  ...new Map(
    urls.map((item) => [item.url, item])
  ).values(),
];

/**
 * XML escaping
 */
const escapeXml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

/**
 * Generate sitemap XML
 */
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

/**
 * Write sitemap
 */
const publicDir = path.join(project, 'public');

fs.mkdirSync(publicDir, {
  recursive: true,
});

const sitemapPath = path.join(
  publicDir,
  'sitemap.xml'
);

fs.writeFileSync(
  sitemapPath,
  xml,
  'utf8'
);

/**
 * Useful build output
 */
console.log('');
console.log('========================================');
console.log(' Create With Soumay Sitemap Generated');
console.log('========================================');
console.log(`Prompts:       ${promptUrls.length}`);
console.log(`Blogs:         ${blogUrls.length}`);
console.log(`Trends:        ${trendUrls.length}`);
console.log(`AI Guides:     ${guideUrls.length}`);
console.log(`Categories:    ${categoryUrls.length}`);
console.log(`Static pages:  ${staticUrls.length}`);
console.log('----------------------------------------');
console.log(`TOTAL URLs:    ${uniqueUrls.length}`);
console.log('========================================');
console.log('');
