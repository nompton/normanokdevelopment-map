// One static build serves every city's map, so its <head> metadata is baked to
// the build's default (Norman). This rewrites title/description/OG per hostname
// so map.bixbyokdevelopment.com reports Bixby — including in link/social cards,
// which read the static HTML and can't run the client-side hostname detection.
const META = {
  norman: { name: 'Norman Development', place: 'Norman, Oklahoma', url: 'https://map.normanokdevelopment.com' },
  bixby: { name: 'Bixby Development', place: 'Bixby, Oklahoma', url: 'https://map.bixbyokdevelopment.com' },
  noble: { name: 'Noble Development', place: 'Noble, Oklahoma', url: 'https://map.nobleokdevelopment.com' },
}
const setAttr = (attr, value) => ({ element(el) { el.setAttribute(attr, value) } })

export async function onRequest(context) {
  const res = await context.next()
  if (!(res.headers.get('content-type') || '').includes('text/html')) return res

  const host = new URL(context.request.url).hostname.toLowerCase()
  const m = /bixby/i.test(host) ? META.bixby : /noble/i.test(host) ? META.noble : META.norman
  const title = `${m.name} Map — ${m.place}`
  const desc = `Interactive map of commercial and residential development projects across ${m.place}. Track proposed, planned, and under-construction projects with site plans and coverage from ${m.name}.`
  const ogDesc = `Track development projects across ${m.place}.`

  return new HTMLRewriter()
    .on('title', { element(el) { el.setInnerContent(title) } })
    .on('meta[name="description"]', setAttr('content', desc))
    .on('meta[property="og:title"]', setAttr('content', `${m.name} Map`))
    .on('meta[property="og:description"]', setAttr('content', ogDesc))
    .on('meta[property="og:url"]', setAttr('content', m.url))
    .on('meta[property="og:site_name"]', setAttr('content', m.name))
    .transform(res)
}
