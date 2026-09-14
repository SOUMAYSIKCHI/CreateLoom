import rss from '@astrojs/rss';
import blogs from '../data/blogs.json';

export function GET(context) {
  const site =
    context.site?.toString() ||
    'https://createloom.vercel.app';

  const items = [...blogs]
    .filter((blog) => blog?.id && blog?.title)
    .sort(
      (a, b) =>
        new Date(b.updatedAt || b.date || b.createdAt || 0) -
        new Date(a.updatedAt || a.date || a.createdAt || 0)
    )
    .map((blog) => ({
      title: blog.title,
      description: blog.excerpt || '',
      link: `/blog/${encodeURIComponent(blog.id)}/`,
      pubDate: new Date(
        blog.updatedAt ||
          blog.date ||
          blog.createdAt
      ),
      categories: [
        ...(blog.category ? [blog.category] : []),
        ...(Array.isArray(blog.tags) ? blog.tags : []),
      ],
    }));

  return rss({
    title: 'CreateLoom — AI Prompts & Creator Resources',
    description:
      'AI image prompts, creator resources, Instagram ideas, growth guides and more from CreateLoom.',
    site,
    items,
    customData: '<language>en-us</language>',
  });
}
