🧵 CreateLoom

Create. Inspire. Repeat.

CreateLoom is a modern, premium AI prompt library and Instagram Creator Hub built for creators.

It provides ready-to-use AI image prompts, creator resources, Instagram growth guides, and SEO-friendly content — all through a lightweight, frontend-focused architecture.

✨ Features
🤖 AI Prompt Library
Ready-to-copy AI prompts
Prompt categories
Prompt search
Tag-based filtering
Latest and popular prompts
Copy prompt functionality
Shareable prompt links
Individual prompt pages
Favorite prompts using browser localStorage
Related prompts
📝 Blog
SEO-focused articles
Blog categories
Blog search
Article filtering
Individual article pages
Related articles
JSON-powered content
Advertisement-ready article layouts
🚀 Instagram Creator Hub

Resources for Instagram creators, including:

Reel ideas
Reel hooks
Instagram growth
Captions
Content ideas
Creator tips
Brand collaborations
Media kit resources
Brand deal guidance
🤝 Brand Collaborations

A dedicated area for:

Sponsored Reels
Story promotions
Brand integrations
Affiliate partnerships
Custom creator campaigns
🎨 Design

CreateLoom uses a:

Dark premium interface
Purple accent system
Minimal and smooth animations
Responsive layout
Mobile-first experience
Clean typography
Lightweight UI
No unnecessary images
🧩 Content Management

CreateLoom is designed so that new content can be added without modifying the website UI.

Add a new prompt

Edit:

src/data/prompts.json

Example:

{
  "id": "cinematic-couple",
  "title": "Cinematic Couple Prompt",
  "category": "Couple",
  "tags": ["couple", "cinematic"],
  "prompt": "Create an ultra-realistic cinematic photograph..."
}

After deployment, the new prompt becomes available throughout the website.

Add a new blog article

Edit:

src/data/blogs.json

Example:

{
  "id": "best-ai-couple-prompts",
  "title": "Best AI Couple Photo Prompts",
  "category": "AI Prompts",
  "tags": ["ai", "couple", "prompts"],
  "date": "2026-09-12",
  "readTime": "5 min",
  "excerpt": "Discover powerful AI prompts for creating realistic couple photos.",
  "content": "Your article content..."
}
🔗 Prompt Sharing

Every prompt has its own shareable URL.

Example:

/prompt/couple-mirror-selfie

When a user shares a prompt from Instagram, the visitor can open the exact prompt directly.

The page provides:

📋 Copy Prompt
🔗 Share
↗ Open
♡ Favorite

The Share button can use the native device sharing functionality when supported, with URL copying as a fallback.

🔎 Search

CreateLoom provides multiple search experiences.

Global Search

Search across:

Prompts
Blog articles
Creator resources
Prompt Search

Search by:

Title
Category
Tags
Prompt content
Blog Search

Search by:

Article title
Category
Tags
Article content
❤️ Favorites

Favorites are stored locally using:

localStorage

No account or backend is required.

Favorites therefore remain specific to the user's browser/device.

📈 SEO

CreateLoom is designed with SEO as a core requirement.

The architecture supports:

Semantic HTML
Unique page titles
Meta descriptions
Canonical URLs
Open Graph metadata
Clean URLs
Individual prompt pages
Individual blog pages
Internal linking
Breadcrumbs
Sitemap
robots.txt
Responsive design
Fast-loading pages

The goal is to create useful, search-intent-focused content rather than generating large amounts of thin content.

💰 Monetization

CreateLoom is designed to support multiple future revenue streams:

Google AdSense
Affiliate partnerships
Sponsored content
Brand collaborations
Sponsored creator campaigns
Featured resources

Advertisement placements are designed primarily for:

Prompt pages
Blog articles

while keeping the primary user experience clean.

🏗️ Technology

CreateLoom is built around a frontend/static architecture.

Core
HTML
CSS
JavaScript
JSON
Framework
Astro
Content
prompts.json
blogs.json
Hosting
Vercel
Repository
GitHub
📁 Project Structure
CreateLoom/
│
├── public/
│   ├── robots.txt
│   └── ...
│
├── src/
│   ├── data/
│   │   ├── prompts.json
│   │   └── blogs.json
│   │
│   ├── layouts/
│   │   └── ...
│   │
│   ├── pages/
│   │   ├── index
│   │   ├── prompts
│   │   ├── prompt
│   │   ├── blog
│   │   ├── article
│   │   ├── creator-hub
│   │   ├── brands
│   │   ├── about
│   │   └── contact
│   │
│   ├── components/
│   │   └── ...
│   │
│   └── styles/
│       └── ...
│
├── package.json
├── astro.config.*
└── README.md
🚀 Getting Started
1. Clone the repository
git clone https://github.com/YOUR_USERNAME/CreateLoom.git
2. Enter the project
cd CreateLoom
3. Install dependencies
npm install
4. Start the development server
npm run dev

The local development site will normally be available at:

http://localhost:4321
5. Build for production
npm run build
6. Preview the production build
npm run preview
☁️ Vercel Deployment

CreateLoom is designed for deployment on Vercel.

Basic workflow
Edit JSON
    ↓
Commit changes
    ↓
Push to GitHub
    ↓
Vercel detects the change
    ↓
Automatic deployment
    ↓
Website updated 🚀

Once the GitHub repository is connected to Vercel, future changes can be deployed automatically.

📝 Content Workflow

The main content workflow is intentionally simple.

New Instagram Reel
Create Reel
     ↓
Create prompt
     ↓
Add prompt to prompts.json
     ↓
Push to GitHub
     ↓
Vercel deploys
     ↓
Prompt becomes available
New Blog Article
Write article
     ↓
Add article to blogs.json
     ↓
Push to GitHub
     ↓
Vercel deploys
     ↓
Article becomes available

No database is required for the content workflow.

🛣️ Roadmap
Phase 1
Website foundation
Prompt library
JSON content system
Prompt search
Categories
Copy functionality
Share functionality
Favorites
Blog architecture
Creator Hub
Brands page
SEO foundation

Phase 2
Advanced prompt filtering
Improved global search
Prompt popularity system
More creator resources
Expanded blog library
Analytics integration
Google AdSense integration
Affiliate resource sections
Phase 3
Prompt generator
Prompt enhancer
Image-to-prompt tool
Creator utilities
Creator profiles
Community submissions
Premium features

⚠️ Disclaimer
CreateLoom provides creative prompts and educational resources.
AI-generated results can vary depending on the AI platform, model, input images, settings, and other factors.
Users are responsible for ensuring that their generated content complies with the rules, policies, copyrights, trademarks, and applicable laws relevant to the tools and platforms they use.

🧵 CreateLoom

Create. Inspire. Repeat.

Built for creators who want to turn ideas into creations.
