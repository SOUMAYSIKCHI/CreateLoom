import prompts from '../../data/prompts.json';

const pageSizeDefault = 12;

const normalize = (value) =>
  String(value || '').trim().toLowerCase();

const sortByNoIdDesc = (a, b) =>
  Number(b.noId || 0) - Number(a.noId || 0);

const getSlug = (p) => {
  if (p.slug) return p.slug;
  if (p.id) return p.id;
  return String(p.title || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
};

export async function GET({ url }) {
  const page = Math.max(1, Number(url.searchParams.get('page') || 1));
  const limit = Math.min(
    24,
    Math.max(1, Number(url.searchParams.get('limit') || pageSizeDefault))
  );
  const category = url.searchParams.get('category') || 'All';
  const type = url.searchParams.get('type') || 'All';
  const query = normalize(url.searchParams.get('q') || '');

  let filtered = [...prompts].sort(sortByNoIdDesc);

  if (category !== 'All') {
    filtered = filtered.filter((p) =>
      category === 'Trending'
        ? p.trending === true
        : normalize(p.category) === normalize(category)
    );
  }

  if (type !== 'All') {
    filtered = filtered.filter(
      (p) => normalize(p.type || 'Unisex') === normalize(type)
    );
  }

  if (query) {
    filtered = filtered.filter((p) => {
      const haystack = [
        p.title,
        p.category,
        p.type,
        p.description
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return haystack.includes(query);
    });
  }

  const total = filtered.length;
  const start = (page - 1) * limit;

  const pagePrompts = filtered.slice(start, start + limit).map((p) => ({
    id: p.id || '',
    noId: p.noId ?? '',
    title: p.title || '',
    category: p.category || '',
    type: p.type || 'Unisex',
    trending: p.trending === true,
    image: p.image || '/images/prompts/createloom.png',
    description: p.description || '',
    url: `/prompts/${getSlug(p)}/`
  }));

  return new Response(
    JSON.stringify({
      page,
      limit,
      total,
      hasMore: start + pagePrompts.length < total,
      prompts: pagePrompts
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=300, s-maxage=3600'
      }
    }
  );
}
