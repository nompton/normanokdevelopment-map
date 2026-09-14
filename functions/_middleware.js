// One static build (Norman default) serves every city's map, so the baked <head>
// is Norman's. This Pages middleware rewrites title/description/OG/canonical per
// hostname and injects robots + JSON-LD, so map.bixbyokdevelopment.com reports
// Bixby to crawlers and social cards (which read the static HTML and can't run
// the client-side hostname detection). It also serves /robots.txt and
// /sitemap.xml per host — neither exists as a static file in the export.
const META = {
  norman: {
    name: 'Norman Development', place: 'Norman, Oklahoma', url: 'https://map.normanokdevelopment.com',
    home: 'https://normanokdevelopment.com', icon: '/icon.png', theme: '#3a8a6e',
    social: ['https://www.facebook.com/normandevelopment', 'https://www.instagram.com/normanokdevelopment'],
  },
  bixby: {
    name: 'Bixby Development', place: 'Bixby, Oklahoma', url: 'https://map.bixbyokdevelopment.com',
    home: 'https://bixbyokdevelopment.com', icon: '/icon-bixby.png', theme: '#c8203a',
    social: ['https://www.facebook.com/bixbyokdevelopment', 'https://www.instagram.com/bixbyokdevelopment'],
  },
  noble: {
    name: 'Noble Development', place: 'Noble, Oklahoma', url: 'https://map.nobleokdevelopment.com',
    home: 'https://nobleokdevelopment.com', icon: '/icon-noble.png', theme: '#1e5fbf',
    social: ['https://www.facebook.com/nobleokdevelopment', 'https://www.instagram.com/nobleokdevelopment'],
  },
}
const setAttr = (attr, value) => ({ element(el) { el.setAttribute(attr, value) } })
const esc = (s) => String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function siteFor(host) {
  return /bixby/i.test(host) ? META.bixby : /noble/i.test(host) ? META.noble : META.norman
}

export async function onRequest(context) {
  const url = new URL(context.request.url)
  const host = url.hostname.toLowerCase()
  // Redirect www.map.* → map.* so both don't get indexed.
  if (host.startsWith('www.')) {
    url.hostname = host.slice(4)
    return Response.redirect(url.toString(), 301)
  }
  const m = siteFor(host)
  const isPreview = host.endsWith('.pages.dev')

  // ── robots.txt (per host) ──────────────────────────────────────────────────
  if (url.pathname === '/robots.txt') {
    const body = isPreview
      ? `User-agent: *\nDisallow: /\n`
      : `User-agent: *\nAllow: /\n\nSitemap: ${m.url}/sitemap.xml\n`
    return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'public, max-age=86400' } })
  }

  // ── sitemap.xml (per host) — the map is a single indexable page ─────────────
  if (url.pathname === '/sitemap.xml') {
    const body = `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
      `<url><loc>${m.url}/</loc><changefreq>daily</changefreq><priority>0.8</priority></url>` +
      `</urlset>`
    return new Response(body, { headers: { 'content-type': 'application/xml; charset=utf-8', 'cache-control': 'public, max-age=3600' } })
  }

  const res = await context.next()
  // Only rewrite HTML documents; static assets (icons, logos) pass through.
  if (!(res.headers.get('content-type') || '').includes('text/html')) return res

  const title = `${m.name} Map — ${m.place}`
  const desc = `Interactive map of commercial and residential development projects across ${m.place}. Track proposed, planned, and under-construction projects with site plans and coverage from ${m.name}.`
  const ogDesc = `Track development projects across ${m.place}.`

  // Structured data: a WebApplication (the map tool) published by the local news
  // Organization, plus the geographic area it serves. Helps Google understand
  // what the page is and tie it to the brand.
  const jsonld = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: `${m.name} Map`,
    url: m.url,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    browserRequirements: 'Requires JavaScript.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description: desc,
    about: { '@type': 'Place', name: m.place },
    areaServed: { '@type': 'City', name: m.place.split(',')[0] },
    publisher: {
      '@type': 'Organization', name: m.name, url: m.home,
      logo: { '@type': 'ImageObject', url: m.url + m.icon },
      ...(m.social ? { sameAs: m.social } : {}),
    },
    isAccessibleForFree: true,
  }

  const headExtra =
    `<link rel="preconnect" href="https://unpkg.com" crossorigin>` +
    `<link rel="preconnect" href="https://a.tile.openstreetmap.org" crossorigin>` +
    `<link rel="preconnect" href="https://server.arcgisonline.com" crossorigin>` +
    `<script type="application/ld+json">${JSON.stringify(jsonld).replace(/</g, '\\u003c')}</script>` +
    (isPreview
      ? `<meta name="robots" content="noindex, nofollow">`
      : `<meta name="robots" content="index, follow, max-image-preview:large">`)

  return new HTMLRewriter()
    .on('title', { element(el) { el.setInnerContent(title) } })
    .on('meta[name="description"]', setAttr('content', desc))
    .on('meta[name="theme-color"]', setAttr('content', m.theme))
    .on('meta[property="og:title"]', setAttr('content', `${m.name} Map`))
    .on('meta[property="og:description"]', setAttr('content', ogDesc))
    .on('meta[property="og:url"]', setAttr('content', m.url))
    .on('meta[property="og:site_name"]', setAttr('content', m.name))
    .on('link[rel="canonical"]', setAttr('href', m.url))
    .on('head', { element(el) { el.append(headExtra, { html: true }) } })
    .transform(res)
}
