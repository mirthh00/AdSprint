import HomeClient from './HomeClient'

export const metadata = {
  title: 'Motion Ads Agency South Africa | Video Ads From R3,000/Month | AdSprint',
  description: 'AdSprint is a Johannesburg-based motion ads agency creating high-converting video ads, explainer videos and Google Ads for South African businesses. CEO strategy call in 20 minutes. Full refund guarantee. From R3,000/month.',
  keywords: 'motion ads south africa, video ads agency south africa, advertising agency johannesburg, facebook video ads south africa, tiktok ads agency south africa, google ads agency south africa, video marketing south africa, social media ads south africa',
  openGraph: {
    title: 'Motion Ads Agency South Africa | AdSprint — From R3,000/Month',
    description: 'High-converting motion ads, explainer videos and Google Ads for South African businesses. CEO call in 20 minutes. Full refund if unhappy.',
    url: 'https://www.adsprint.codesprint.co.za',
    siteName: 'AdSprint',
    locale: 'en_ZA',
    type: 'website',
    images: [{
      url: 'https://www.adsprint.codesprint.co.za/images/team.webp',
      width: 1200,
      height: 630,
      alt: 'AdSprint — Motion Ads Agency South Africa',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Motion Ads Agency South Africa | AdSprint',
    description: 'High-converting video ads for SA businesses from R3,000/month. Full refund guarantee.',
  },
  alternates: {
    canonical: 'https://www.adsprint.codesprint.co.za',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'AdSprint',
  description: 'South African motion ads agency creating high-converting video ads, explainer videos and Google Ads for businesses across South Africa.',
  url: 'https://www.adsprint.codesprint.co.za',
  telephone: '0633217882',
  email: 'hello@adsprint.co.za',
  priceRange: 'R3,000 - R12,000',
  currenciesAccepted: 'ZAR',
  paymentAccepted: 'Credit Card, EFT, PayFast',
  areaServed: { '@type': 'Country', name: 'South Africa' },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Johannesburg',
    addressRegion: 'Gauteng',
    addressCountry: 'ZA',
  },
  founder: {
    '@type': 'Person',
    name: 'Nhlamulo Mabunda',
    jobTitle: 'Founder & CEO',
    alumniOf: 'University of the Witwatersrand',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Motion Ads Plans',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Starter Plan',
        price: '3000',
        priceCurrency: 'ZAR',
        description: '2 motion ads, 2 explainer videos, Google Ads setup, voice overs, 48h delivery',
      },
      {
        '@type': 'Offer',
        name: 'Growth Plan',
        price: '6000',
        priceCurrency: 'ZAR',
        description: '4 motion ads, explainer & FAQ videos, 2D/3D animation, Google Ads management, unlimited revisions',
      },
      {
        '@type': 'Offer',
        name: 'Scale Plan',
        price: '12000',
        priceCurrency: 'ZAR',
        description: 'Double Growth plan, complex animations, Google Ads management, ongoing content flow',
      },
    ],
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much do motion ads cost in South Africa?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Motion ads in South Africa start from R3,000 per month at AdSprint. The Starter plan includes 2 motion ads, 2 explainer videos, Google Ads setup, voice overs, sound effects, and 4 revisions. Growth plans start at R6,000/month and Scale at R12,000/month, all billed monthly with no long-term contracts.',
      },
    },
    {
      '@type': 'Question',
      name: 'How quickly can I get a video ad made in South Africa?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'At AdSprint, your first motion ads are delivered within 48 hours on the Starter plan and within 24 hours on Growth and Scale plans, after your CEO strategy call.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does AdSprint offer a money-back guarantee?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. If you are not satisfied after revisions, AdSprint refunds you in full and adds R1,000 for the inconvenience. If your ad underperforms after launch, we rebuild it strategically at no extra cost.',
      },
    },
    {
      '@type': 'Question',
      name: 'What social media platforms does AdSprint make ads for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AdSprint creates video ads optimised for Meta (Facebook and Instagram), TikTok, YouTube, Google Display, and X (Twitter), across all aspect ratios and platform placements.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where is AdSprint based?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AdSprint is based in Johannesburg, Gauteng, South Africa. We serve businesses across South Africa and internationally. All pricing is in South African Rand (ZAR) and payments are processed securely via PayFast.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need to sign a long-term contract with AdSprint?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. AdSprint operates on flexible monthly plans with no long-term contracts. You can cancel with 30 days written notice at any time, no questions asked.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I get started with AdSprint?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Choose a plan on the AdSprint website and complete payment via PayFast. Within 20 minutes, our CEO will send you a Microsoft Teams invite for a personal strategy call to discuss your brand, audience, and creative direction before production begins.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does AdSprint include Google Ads management?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Every AdSprint plan includes Google Ads and social ads setup or management, designed to reduce wasted ad spend and improve your return on investment. Growth and Scale plans include full ongoing Google Ads management.',
      },
    },
  ],
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HomeClient />
    </>
  )
}
