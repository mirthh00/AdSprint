import { NextResponse } from 'next/server'

export async function GET() {
  const content = `# AdSprint — robots.txt
# https://www.adsprint.co.za

User-agent: *
Allow: /
Allow: /#how-it-works
Allow: /#our-work
Allow: /#guarantees
Allow: /#pricing
Allow: /#faq
Allow: /checkout
Allow: /termsofservice
Allow: /privacypolicy

# Block payment result pages from indexing
Disallow: /success
Disallow: /fail

# Block API routes
Disallow: /api/

# Sitemap
Sitemap: https://www.adsprint.co.za/sitemap.xml
`

  return new NextResponse(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
