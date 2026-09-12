# CreateLoom

CreateLoom is a frontend-only, static AI prompt and creator-resource site designed for Vercel.

## Content workflow

### Add a prompt
Edit `src/data/prompts.json` and add an object with:
- `id`
- `title`
- `category`
- `tags`
- `prompt`

The build generates an individual SEO-friendly route at `/prompt/<id>/` and the prompt appears in search, filters, related prompts and the homepage automatically.

### Add a blog post
Edit `src/data/blogs.json` and add:
- `id`
- `title`
- `category`
- `tags`
- `date`
- `readTime`
- `excerpt`
- `content` (array of paragraphs)

The build generates `/blog/<id>/` automatically.

## Features

- Dark premium responsive UI
- Prompt search and category filtering
- Blog-only search and category filtering
- Global search across prompts and blogs
- Copy, share and favorite actions
- Local favorites using browser storage; no account required
- SEO titles, descriptions, canonical URLs and Open Graph metadata
- Static prompt/blog/category routes
- Sitemap generation from JSON content
- Ad placeholders on prompt and article pages
- Instagram Creator Hub and Brands pages
- No backend, database or image dependency

## Vercel

Push this project to GitHub and import it into Vercel. Vercel will run `npm run build`.

Optional environment variable:

`SITE_URL=https://your-live-vercel-url.vercel.app`

This is used to generate `sitemap.xml` with the correct absolute URLs.

## Local development

```bash
npm install
npm run dev
```

For production build:

```bash
npm run build
npm run preview
```

## Important before launch

Replace the starter Privacy Policy and Terms with your final legal text. Add your business contact email. When you receive Google AdSense approval, replace the ad placeholders with the approved ad code and make sure the site's privacy/cookie disclosures match the providers you actually use.
