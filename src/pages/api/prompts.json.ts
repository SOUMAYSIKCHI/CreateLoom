import prompts from '../../data/prompts.json';

const getSlug = (p) => {
  if (p.slug) return p.slug;
  if (p.id) return p.id;
  return String(p.title || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
};

export async function GET() {
  const listing = [...prompts]
    .sort((a, b) => Number(b.noId || 0) - Number(a.noId || 0))
    .map((p) => ({
      id: p.id || '',
      noId: p.noId ?? '',
      title: p.title || '',
      category: p.category || '',
      type: p.type || 'Unisex',
      trending: p.trending === true,
      trendStatus: p.trendStatus || '',
      image: p.image || '/images/prompts/createloom.png',
      description: p.description || '',
      url: `/prompt/${getSlug(p)}/`
    }));

  return new Response(
    JSON.stringify({
      total: listing.length,
      prompts: listing
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
