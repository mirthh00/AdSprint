import { NextResponse } from 'next/server'

const BASE_URL = 'https://www.adsprint.co.za'

const pages = [
  {
    url: '/',
    changefreq: 'weekly',
    priority: '1.0',
    lastmod: '2025-06-01',
  },
  {
    url: '/#how-it-works',
    changefreq: 'monthly',
    priority: '0.8',
    lastmod: '2025-06-01',
  },
  {
    url: '/#our-work',
    changefreq: 'monthly',
    priority: '0.8',
    lastmod: '2025-06-01',
  },
  {
    url: '/#guarantees',
    changefreq: 'monthly',
    priority: '0.8',
    lastmod: '2025-06-01',
  },
  {
    url: '/#pricing',
    changefreq: 'weekly',
    priority: '0.9',
    lastmod: '2025-06-01',
  },
  {
    url: '/#faq',
    changefreq: 'monthly',
    priority: '0.7',
    lastmod: '2025-06-01',
  },
  {
    url: '/checkout',
    changefreq: 'weekly',
    priority: '0.9',
    lastmod: '2025-06-01',
  },
  {
    url: '/success',
    changefreq: 'never',
    priority: '0.2',
    lastmod: '2025-06-01',
  },
  {
    url: '/fail',
    changefreq: 'never',
    priority: '0.2',
    lastmod: '2025-06-01',
  },
  {
    url: '/termsofservice',
    changefreq: 'yearly',
    priority: '0.4',
    lastmod: '2025-06-01',
  },
  {
    url: '/privacypolicy',
    changefreq: 'yearly',
    priority: '0.4',
    lastmod: '2025-06-01',
  },
]

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
    http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
>
${pages
  .map(
    (page) => `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=43200',
    },
  })
}
