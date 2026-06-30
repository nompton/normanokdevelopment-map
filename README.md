# Norman Development Map

Interactive map for [normanokdevelopment.com](https://normanokdevelopment.com) tracking development projects across Norman, OK.

## Adding a new site

Edit [`data/sites.ts`](data/sites.ts). Copy an existing entry and fill in:

```ts
{
  id: "unique-kebab-id",               // no spaces, used internally
  name: "Project Name",
  address: "123 Main St, Norman, OK",
  lat: 35.2226,                        // right-click in Google Maps → "What's here?"
  lng: -97.4395,
  status: "proposed",                  // proposed | planned | under-construction | completed
  description: "One paragraph about the project.",
  articles: [
    {
      title: "Article headline",
      url: "https://normanokdevelopment.com/your-slug/",
      date: "June 1, 2026",
    },
  ],
  planPdf: "your-file.pdf",            // drop PDF into /public/plans/ — or leave as undefined
}
```

## Adding a site plan PDF

1. Drop the PDF into `/public/plans/` (e.g. `public/plans/sooner-mall-dicks.pdf`)
2. Set `planPdf: "sooner-mall-dicks.pdf"` on the site entry in `data/sites.ts`
3. A "View site plan" button will appear in the marker detail panel

## Deploy

```bash
npm run build
npx wrangler pages deploy out --project-name normanokdevelopment-map
```

Point `map.normanokdevelopment.com` as a custom domain in Cloudflare Pages.
