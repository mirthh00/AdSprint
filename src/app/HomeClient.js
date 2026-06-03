'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import {
  ShieldCheck,
  RefreshCcw,
  BarChart3,
  DoorOpen,
  Lock,
  Trophy,
  FolderLock,
  LineChart,
  TrendingUp,
  Zap,
  Eye,
  ShoppingCart,
  Repeat,
  Target,
} from 'lucide-react'

/* ─── Theme ─── */
function useTheme() {
  const [theme, setTheme] = useState('dark')
  useEffect(() => {
    const saved = localStorage.getItem('adsprint-theme') || 'dark'
    setTheme(saved)
    document.documentElement.setAttribute('data-theme', saved)
  }, [])
  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('adsprint-theme', next)
  }
  return { theme, toggle }
}

/* ─── Scroll reveal ─── */
function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('revealed') }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

/* ─── Count-up ─── */
function useCountUp(target, duration = 1800) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const start = Date.now()
        const num = parseInt(target.replace(/\D/g, ''))
        const tick = () => {
          const elapsed = Date.now() - start
          const p = Math.min(elapsed / duration, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          setCount(Math.floor(eased * num))
          if (p < 1) requestAnimationFrame(tick)
          else setCount(num)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration])
  return { count, ref }
}

function StatItem({ number, suffix, label }) {
  const { count, ref } = useCountUp(number)
  return (
    <div className="stat-item" ref={ref}>
      <div className="stat-number">{count.toLocaleString()}<span>{suffix}</span></div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

const Check = () => <span className="check-icon" aria-hidden="true">✓</span>
const Arrow = () => <span style={{ fontSize: '0.75rem' }}>→</span>

/* ═══════════════════════════════════════════════════════════ */
export default function HomeClient() {
  const { theme, toggle } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  useReveal()

  const scrollTo = (id) => {
    setMenuOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const navLinks = [
    { label: 'How It Works', id: 'how-it-works' },
    { label: 'Our Work',     id: 'our-work'     },
    { label: 'Our Team',     id: 'our-team'     },
    { label: 'Guarantees',   id: 'guarantees'   },
    { label: 'Pricing',      id: 'pricing'      },
    { label: 'FAQ',          id: 'faq'          },
  ]

  /* Platforms SA e-commerce brands advertise on */
  const platforms = ['Meta', 'Instagram', 'TikTok', 'YouTube', 'Google Shopping', 'Takealot', 'Shopify', 'WooCommerce']

  /* Ad type features — e-commerce framed */
  const features = [
    {
      icon: '⚡',
      title: 'Product Motion Ads',
      desc: 'Show your product in motion — in use, in context, in real life. Motion ads generate 42% higher ROAS than static product images on Meta and TikTok.',
      preview: '/images/image5.webp',
    },
    {
      icon: '💬',
      title: 'Product Explainer Videos',
      desc: 'Turn browser hesitation into purchase confidence. 96% of online shoppers say a product video directly influences their buying decision.',
      preview: '/images/image4.webp',
    },
    {
      icon: '🛒',
      title: 'Social Commerce Content',
      desc: 'Native-style video for TikTok Shop, Instagram Shopping, and Facebook Marketplace — content that feels organic but performs like a paid ad.',
      preview: '/images/image3.webp',
    },
  ]

  /* Pricing plans */
  const plans = [
    {
      plan: 'entry',
      name: 'Starter',
      tagline: 'Test it on your store',
      currency: 'R',
      price: '3,000',
      period: 'Monthly',
      popular: false,
      features: [
        '2 product motion ads',
        '2 product explainer videos',
        'Google Shopping & Meta Ads setup',
        'Sound effects & voice overs',
        'Simple animations',
        'Fast delivery (48h)',
        '4 revisions included',
      ],
      cta: 'Get Started',
      ctaClass: 'outlined',
    },
    {
      plan: 'growth',
      name: 'Growth',
      tagline: 'Scale your store revenue',
      currency: 'R',
      price: '6,000',
      period: 'Monthly',
      popular: true,
      features: [
        '4 product motion ads, explainers & social commerce videos',
        '2D & 3D product animations',
        'Sound effects & voice overs',
        'Unlimited revisions',
        'Google Shopping & Meta Ads management',
        'Performance optimisation & A/B testing',
        'Fast delivery (24h)',
        'Priority support',
      ],
      cta: 'Scale My Store',
      ctaClass: 'solid',
    },
    {
      plan: 'scale',
      name: 'Scale',
      tagline: 'Dominate your product category',
      currency: 'R',
      price: '12,000',
      period: 'Monthly',
      popular: false,
      features: [
        'Double of everything in Growth',
        'Complex 2D & 3D product animations',
        'Multiple creative variations for testing',
        'Advanced product messaging direction',
        'Full Google & Meta Ads management',
        'Ongoing content flow — never run dry',
        'Priority handling',
      ],
      cta: 'Dominate Your Category',
      ctaClass: 'outlined',
    },
  ]

  /* Guarantees */
  const guarantees = [
    {
      icon: LineChart,
      title: 'Free Google & Meta Ads Management',
      desc: 'Every plan includes ads setup and management designed to reduce wasted spend, improve product targeting, and maximise your store\'s ROAS — at no extra cost.',
    },
    {
      icon: ShieldCheck,
      title: "Doesn't match the brief — we fix it free",
      desc: "If the delivered creative doesn't align with your agreed product brief, we rebuild it at no additional cost. Your brief is our contract.",
    },
    {
      icon: RefreshCcw,
      title: 'Still not satisfied — full refund plus R1,000',
      desc: "After revisions, if you're still not happy, we refund you in full and add R1,000 to compensate for your time. No holdbacks, no fine print.",
    },
    {
      icon: BarChart3,
      title: 'Ad underperforms after launch — we rebuild it',
      desc: "If your product ad launches and underperforms against agreed benchmarks, we strategically rebuild it from the ground up at zero extra cost.",
    },
    {
      icon: DoorOpen,
      title: 'Leave any time — 30 days notice, no penalty',
      desc: "Cancel your monthly plan with 30 days written notice. No lock-ins, no exit fees, no awkward calls. Your files stay yours regardless.",
    },
  ]

  /* FAQs — e-commerce focused */
  const faqs = [
    // Getting started
    { q: 'How quickly will I get my first product ads?', a: 'Starter plan ads are delivered within 48 hours of your strategy call. Growth and Scale plan ads are delivered within 24 hours. All plans operate on a rolling monthly production schedule — typically 5–7 business days per batch.' },
    { q: 'Which platforms are the ads built for?', a: 'We create product ads optimised for Meta (Facebook & Instagram), TikTok, YouTube, Google Shopping, and Google Display — across all placements, aspect ratios (9:16, 1:1, 16:9), and platform-specific format requirements. Every ad is mobile-first.' },
    { q: 'How quickly do I hear from you after I pay?', a: 'Within 20 minutes of payment you receive a Microsoft Teams invite directly from our CEO, Nhlamulo Mabunda, to discuss your products, brand, target audience, and creative direction personally. If you pay outside business hours (Mon–Fri, 08:00–18:00 SAST), your invite arrives first thing the next morning.' },
    { q: 'Do you help write the script or hook for the ad?', a: 'Yes. Growth and Scale plans include full hook strategy, script direction, and messaging guidance. We identify your product\'s strongest selling angle before a single frame is produced. Starter clients receive basic creative direction during the strategy call.' },
    { q: 'How many revisions do I get?', a: 'Starter includes 4 revision rounds. Growth and Scale plans include unlimited revisions within the billing cycle. We work until the creative genuinely performs — that is our commitment.' },

    // About AdSprint
    { q: 'Who actually makes the ads?', a: 'Your ads are produced by our in-house creative team led by Nhlamulo Mabunda (Founder & CEO). We do not outsource to freelancers or third-party studios. Every deliverable goes through our internal quality review before it reaches you.' },
    { q: 'Where is AdSprint based?', a: 'We are based in Johannesburg, South Africa. We work with e-commerce brands across South Africa and internationally. All pricing is in ZAR and payments are processed securely via PayFast.' },
    { q: 'Does AdSprint work with online stores outside South Africa?', a: 'Yes. Our team works with SA-based and international e-commerce brands. Deliverables are shared digitally and strategy calls are held via Microsoft Teams — location is never a barrier.' },

    // Pricing & payment
    { q: 'Are there any hidden fees?', a: 'None. The price you see is the price you pay. No setup fees, no onboarding fees, no licensing charges. Third-party assets (like licensed music) are always flagged and approved by you first — we never add costs without your explicit sign-off.' },
    { q: 'Can I upgrade or downgrade my plan?', a: 'Yes. Upgrades take effect immediately. Downgrades take effect at the start of the next billing cycle. Email us and we handle the transition with no friction.' },
    { q: 'What payment methods do you accept?', a: 'All major payment methods via PayFast — Visa, Mastercard, Instant EFT, Mobicred, and more. 256-bit SSL encryption on all transactions. We never store your payment details.' },

    // The process
    { q: 'What must I provide to get started?', a: 'Ideally: your logo and brand colours, product images or footage, and a brief description of your target customer and campaign goal. If you do not have everything — the strategy call is exactly where we figure it out together.' },
    { q: 'How do I receive the final video files?', a: 'Via a secure download link or shared Google Drive folder in your required formats — MP4, MOV, or platform-specific exports. We always confirm the correct resolution and format for each platform before exporting.' },

    // Results & quality
    { q: 'What if my product ad does not perform after launch?', a: 'If it underperforms against mutually agreed benchmarks, we rebuild it strategically at no extra cost. Provide the analytics data showing the underperformance and we get to work immediately with a fresh creative approach.' },
    { q: 'Can you guarantee my store\'s ROAS will improve?', a: 'No ethical agency can guarantee specific ROAS numbers — performance is also influenced by your product price, landing page, targeting, and offer. What we guarantee is the quality and strategic integrity of every creative, and a full rebuild if it underperforms.' },
    { q: 'Why are motion ads better than the static images I\'m running now?', a: 'Video ads generate 42% higher ROAS than static image ads and receive 52% more engagement on Meta. In a product feed full of white-background photos, a motion ad showing your product in use stops the scroll. That is the entire difference between a sale and a skip.' },
    { q: 'What makes AdSprint different from other SA marketing agencies?', a: 'We specialise exclusively in motion ads for e-commerce — not branding, not PR, not print. Our CEO is personally on every strategy call within 20 minutes of payment. We offer a refund plus R1,000 if you are not satisfied. And everything we build for you stays 100% confidential.' },

    // Ownership & confidentiality
    { q: 'Who owns the product ads once delivered?', a: 'You do — 100%. Full copyright and intellectual property is assigned to you on delivery. No licences, no usage restrictions, no strings attached.' },
    { q: 'Will you post my ads online without my permission?', a: 'Never. We default to complete confidentiality. Your product ads, sales data, and brand strategy are never shared publicly or used in our marketing without your explicit written consent.' },

    // Refunds & cancellations
    { q: 'What is your refund policy?', a: 'If delivered work does not match your agreed brief, we fix it free. If you remain unsatisfied after revisions, full refund plus R1,000 — requested within 14 days of delivery and processed within 7 business days via your original payment method.' },
    { q: 'Can I cancel my monthly plan?', a: 'Yes, at any time with 30 days written notice via email. No cancellation penalties, no lock-in clauses. Your completed deliverables remain yours permanently regardless of cancellation.' },

    // Support
    { q: 'How do I contact AdSprint after I sign up?', a: 'Via phone (063 321 7882) and Microsoft Teams. Growth and Scale clients have priority support with faster response times. We respond to all queries within 1 business day.' },
    { q: 'What are your business hours?', a: 'Monday to Friday, 08:00–18:00 SAST. We monitor messages outside these hours for urgent matters but all formal responses and deliveries are processed within business hours.' },
  ]

  const logoIcon = (name) => ({
    Meta: '∞', Instagram: '◻', TikTok: '♪', YouTube: '▶',
    'Google Shopping': 'G', Takealot: 'T', Shopify: '◈', WooCommerce: '⊕',
  }[name] || '•')

  const pricingRef = useRef(null)
  useEffect(() => {
    const el = pricingRef.current
    if (!el) return
    if (window.innerWidth <= 600) {
      requestAnimationFrame(() => {
        const middleCard = el.children[1]
        if (middleCard) el.scrollLeft = middleCard.offsetLeft - 16
      })
    }
  }, [])

  return (
    <>
      {/* ─── NAVBAR ─── */}
      <nav className="navbar">
        <a href="#" className="nav-logo" onClick={(e) => { e.preventDefault(); scrollTo('hero') }}>
          <div className="nav-logo-dot" />
          <div>
            AdSprint
            <div style={{ fontSize: '0.52rem', fontFamily: "'JetBrains Mono', monospace", fontWeight: 400, color: 'var(--text-tertiary)', letterSpacing: '0.04em', marginTop: '1px', lineHeight: 1 }}>
              By CodeSprint under Mirthh (Pty) Ltd
            </div>
          </div>
        </a>

        <ul className="nav-links">
          {navLinks.map((l) => (
            <li key={l.id}>
              <a href={`#${l.id}`} onClick={(e) => { e.preventDefault(); scrollTo(l.id) }}>{l.label}</a>
            </li>
          ))}
        </ul>

        <div className="nav-right">
          <button className="theme-toggle" onClick={toggle} aria-label="Toggle theme">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <a href="/checkout" className="btn-primary">
            Get Started
          </a>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span style={menuOpen ? { transform: 'rotate(45deg) translate(5px, 5px)' } : {}} />
            <span style={menuOpen ? { opacity: 0 } : {}} />
            <span style={menuOpen ? { transform: 'rotate(-45deg) translate(5px, -5px)' } : {}} />
          </button>
        </div>
      </nav>

      {/* ─── MOBILE MENU ─── */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {navLinks.map((l) => (
          <a key={l.id} href={`#${l.id}`} onClick={(e) => { e.preventDefault(); scrollTo(l.id) }}>{l.label}</a>
        ))}
        <a href="/checkout" className="btn-primary">Get Started <Arrow /></a>
      </div>

      <main>
        {/* ════════════════════════════════════════
            HERO
        ════════════════════════════════════════ */}
        <section id="hero" className="hero">
          <div className="hero-bg">
            <div className="hero-grid" />
            <div className="hero-orb hero-orb-1" />
            <div className="hero-orb hero-orb-2" />
          </div>

          <div className="container">
            <div className="hero-inner">
              <div>
                

                <h1 className="hero-title reveal reveal-delay-1">
                  Your SA Online Store<br />
                  <em>Deserves Better Ads.</em>
                </h1>

                <p className="hero-subtitle reveal reveal-delay-2">
                  AdSprint creates motion ads, product videos, and Google Shopping campaigns that help South African e-commerce brands compete — and win — against Shein, Temu, and Amazon. From R3,000/month with a full refund guarantee.
                </p>

                <div className="hero-cta reveal reveal-delay-3">
                  <a href="/checkout" className="btn-primary" style={{ fontSize: '1rem', padding: '14px 28px' }}>
                    Get My First Ads <Arrow />
                  </a>
                  <button className="btn-ghost" style={{ fontSize: '1rem', padding: '14px 24px' }} onClick={() => scrollTo('guarantees')}>
                    See Our Guarantees
                  </button>
                </div>

                {/* Proof bar */}
                <div className="hero-trust reveal reveal-delay-4">
                  <div className="hero-avatars">
                    {['/images/logo0.webp', '/images/logo2.webp', '/images/logo3.webp', '/images/logo00.webp'].map((img, i) => (
                      <div key={i} className="avatar-image-wrap">
                        <Image src={img} alt="South African e-commerce brand using AdSprint motion ads" width={80} height={80} className="avatar-image" />
                      </div>
                    ))}
                  </div>
                  <p className="hero-trust-text">
                    Trusted by <strong>20+ SA online stores</strong><br />to grow and scale
                  </p>
                </div>
              </div>

              {/* Hero visual */}
              <div className="hero-visual reveal reveal-delay-2">
                <div className="">
                  <Image
                    src="/images/image2.webp"
                    alt="South African e-commerce motion ads — product video advertising by AdSprint Johannesburg"
                    width={1200}
                    height={800}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            URGENCY BANNER — THE SHEIN PROBLEM
        ════════════════════════════════════════ */}
        <section aria-label="The e-commerce competition problem in South Africa" style={{ padding: '48px 0', background: 'var(--bg-2)', borderBottom: '1px solid var(--border)', borderTop: '1px solid var(--border)' }}>
          <div className="container" style={{ maxWidth: 900 }}>
            <p style={{
              fontSize: 'clamp(0.875rem, 1.8vw, 1.0625rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.85,
              fontWeight: 300,
              textAlign: 'center',
            }}>
              Shein and Temu spent millions on motion ads, influencer content, and social commerce to capture{' '}
              <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>37% of South Africa's online fashion market</strong> in under 5 years.
              Their weapon was not price alone — it was{' '}
              <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>video creative that stopped the scroll</strong>.
              Local SA online stores running static product photos are losing to that every single day.{' '}
              <strong style={{ color: 'var(--green)', fontWeight: 500 }}>AdSprint exists to close that gap.</strong>
            </p>

            {/* Mini stat row */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(12px, 3vw, 32px)', marginTop: 36, flexWrap: 'wrap' }}>
              {[
                { stat: '42%', label: 'higher ROAS with video vs static ads' },
                { stat: '52%', label: 'more engagement on Meta with video' },
                { stat: '70%+', label: 'of new SA online shoppers come from social video' },
              ].map(({ stat, label }) => (
                <div key={stat} style={{ textAlign: 'center', minWidth: 140 }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 700, color: 'var(--green)', lineHeight: 1, letterSpacing: '-0.04em' }}>{stat}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 300, marginTop: 6, maxWidth: 140 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            PLATFORMS MARQUEE
        ════════════════════════════════════════ */}
        <section className="logos-section">
          <p className="logos-label">Motion ads built to perform on every platform SA shoppers use</p>
          <div className="logos-track-wrapper">
            <div className="logos-track">
              {[0, 1].map((set) => (
                <div key={set} className="logos-track-inner" aria-hidden={set === 1}>
                  {[...platforms, ...platforms].map((name, i) => (
                    <div key={`${set}-${i}`} className="logo-item">
                      <span style={{ fontSize: '1.3rem' }}>{logoIcon(name)}</span>
                      {name}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

      

        {/* ════════════════════════════════════════
            HOW IT WORKS
        ════════════════════════════════════════ */}
        <section id="how-it-works" className="section" aria-label="How AdSprint works for South African e-commerce brands">
          <div className="container">
            <div className="section-header">
              <p className="section-label reveal">// How It Works</p>
              <h2 className="section-title reveal reveal-delay-1">
                From payment to<br />
                <em style={{ fontStyle: 'italic', color: 'var(--green)' }}>live product ads</em> in days
              </h2>
              <p className="section-subtitle reveal reveal-delay-2">
                Three steps. No agency politics. No waiting weeks. Your store starts advertising better immediately.
              </p>
            </div>

            <div className="process-grid">
              <div className="process-connector">
                <div className="process-connector-dot" />
                <div className="process-connector-dot" />
              </div>

              {/* Step 1 */}
              <div className="process-card reveal reveal-delay-1">
                <div className="process-step-num">Step 01</div>
                <div className="process-teams-wrap">
                  <Image src="/images/image0.webp" alt="Choose a motion ads plan for your South African online store" width={1200} height={800} style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>
                <h3>Choose Your Plan</h3>
                <p>
                  Pick the plan that matches your store's current revenue stage — Starter, Growth, or Scale. Payment is secure via PayFast and takes under 2 minutes.
                </p>
              </div>

              {/* Step 2 */}
              <div className="process-card reveal reveal-delay-2">
                <div className="process-step-num">Step 02</div>
                <div
                  className="twenty-min-badge"
                  style={{ marginBottom: 14 }}
                >
                  Within 20 minutes of payment
                </div>
                <div className="process-teams-wrap">
                  <Image src="/images/teams-meeting.webp" alt="CEO strategy call via Microsoft Teams — AdSprint motion ads for South African e-commerce" width={1200} height={800} style={{ width: '100%', height: 'auto', display: 'block' }} />
                  <div className="teams-badge"><span>🟦</span> Microsoft Teams</div>
                </div>
                <h3>Strategy Call With the CEO</h3>
                <p>
                  Within <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>20 minutes of payment</strong>, our CEO personally invites you to a Microsoft Teams call to align on your products, audience, creative direction, and ad goals before production begins.
                </p>
              </div>

              {/* Step 3 */}
              <div className="process-card reveal reveal-delay-3">
                <div className="process-step-num">Step 03</div>
                <div className="process-teams-wrap">
                  <Image src="/images/image1.webp" alt="Product video ads delivered for South African e-commerce stores — AdSprint" width={1200} height={800} style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>
                <h3>Product Ads Delivered on Schedule</h3>
                <p>
                  Your motion ads are produced, refined, and delivered per your plan timeline — ready to launch on Meta, TikTok, Google Shopping, and beyond. First batch delivered in 24–48 hours.
                </p>
                <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {['Starter: 2 product ads + 2 explainers, 48h delivery', 'Growth: 4 ads + animations, 24h delivery, ads managed', 'Scale: Double Growth, complex 3D, ongoing content flow'].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 300 }}>
                      <span style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--green-subtle)', border: '1px solid rgba(0,232,122,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.5rem', color: 'var(--green)', flexShrink: 0, marginTop: 1 }}>✓</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            OUR WORK — VIDEO SHOWCASE + AD TYPES
        ════════════════════════════════════════ */}
        <section id="our-work" className="section" style={{ paddingTop: 0 }} aria-label="Motion ad services for South African e-commerce stores">
          <div className="container">
            <div className="section-header">
              <p className="section-label reveal">// Our Work</p>
              <h2 className="section-title reveal reveal-delay-1">
                The ads that make<br />SA shoppers stop scrolling.
              </h2>
              <p className="section-subtitle reveal reveal-delay-2">
                Watch the quality of creative your store could be launching next week.
              </p>
            </div>

            <div className="video-showcase reveal reveal-delay-3">
              <div style={{ paddingTop: '49.17%', position: 'relative' }} className="video-showcase-inner">
                <iframe
                  src="https://player.vimeo.com/video/1196583478?autoplay=1&muted=1&loop=1&controls=1&title=0&byline=0&portrait=0"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  title="AdSprint product motion ads showcase — South African e-commerce"
                />
                <div className="video-overlay-shadow" />
              </div>
            </div>
          </div>

          <div className="container" style={{ marginTop: 80 }}>
            <div className="section-header">
              <h2 className="section-title reveal reveal-delay-1">
                Three ad types.<br />One store that converts.
              </h2>
              <p className="section-subtitle reveal reveal-delay-2">
                Every format your SA online store needs to capture, persuade, and convert shoppers on every platform.
              </p>
            </div>

            <div className="features-grid">
              {features.map((f, i) => (
                <div key={f.title} className={`feature-card reveal reveal-delay-${i + 1}`}>
                  <div className="process-teams-wrap">
                    <img src={f.preview} alt={`${f.title} for South African e-commerce brands — AdSprint`} style={{ width: '100%', height: 'auto', display: 'block' }} />
                  </div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            THE PROBLEM WE SOLVE — E-COMMERCE SPECIFIC
        ════════════════════════════════════════ */}
        <section aria-label="Why South African e-commerce brands need motion ads" style={{ padding: '80px 0', background: 'var(--bg-2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
              {[
                {
                  icon: Target,
                  headline: 'Your Competitor Has Better Creative',
                  body: 'Right now there are SA online stores in your product category running motion ads that look like global brands. You are running the same static photo you uploaded two years ago. That is the entire gap.',
                },
                {
                  icon: ShoppingCart,
                  headline: 'Static Ads Are Getting More Expensive',
                  body: 'Meta CPMs rose 19% in 2024 alone. The same budget buys fewer impressions every year. The only way to protect your ROAS is to increase your creative quality — not your budget.',
                },
                {
                  icon: Eye,
                  headline: 'SA Shoppers Decide in 1.5 Seconds',
                  body: '77% of South African shoppers browse on mobile. They scroll at full speed. Your product has 1.5 seconds to stop them. A static image rarely does that. A motion ad almost always does.',
                },
                {
                  icon: Repeat,
                  headline: 'You Need Fresh Creative Every Month',
                  body: 'Ad fatigue hits SA audiences within 2–4 weeks. Running the same creative kills performance even when targeting is perfect. A monthly motion ads partner solves this permanently.',
                },
                {
                  icon: TrendingUp,
                  headline: 'Social Commerce Is Your Biggest Growth Channel',
                  body: 'Over 70% of new SA online shoppers discover products via social media. TikTok Shop, Instagram Shopping, and Facebook Marketplace are where your next 1,000 customers are. They need video to convert.',
                },
                {
                  icon: Zap,
                  headline: 'Google Shopping Rewards Better Ads Too',
                  body: 'Google\'s Performance Max uses your creative quality as a bidding signal. Better product videos and motion ads lower your cost per click and increase your Shopping ad placements automatically.',
                },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <div key={item.headline} className={`feature-card reveal reveal-delay-${(i % 3) + 1}`} style={{ padding: '28px 24px' }}>
                    <div className="feature-icon">
                      <Icon size={22} strokeWidth={2.1} />
                    </div>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 10, letterSpacing: '-0.01em' }}>
                      {item.headline}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.72, fontWeight: 300, margin: 0 }}>
                      {item.body}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            TEAM BANNER
        ════════════════════════════════════════ */}
        <section id="our-team" className="team-section">
          <div className="team-photo-wrap">
            <img
              src="/images/team.webp"
              alt="AdSprint creative team — motion ads agency for South African e-commerce brands, Johannesburg"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%', display: 'block' }}
            />
            <div className="team-photo-overlay" />
            <div className="team-photo-content">
              <p className="team-eyebrow">// The Team Behind Your Ads</p>
              <h2 className="team-headline">
                SA-built creative that<br />
                <span style={{ color: 'var(--green)' }}>competes with the world.</span>
              </h2>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            CEO SECTION
        ════════════════════════════════════════ */}
        <section className="ceo-section" id="ceo">
          <div className="container">
            <div className="ceo-grid">
              <div className="reveal">
                <div className="ceo-photo-frame">
                  <Image
                    src="/images/ceo.webp"
                    alt="Nhlamulo Mabunda — Founder and CEO of AdSprint, motion ads agency for SA e-commerce"
                    width={500}
                    height={500}
                    style={{ width: '100%', height: 'auto' }}
                  />
                  <div className="ceo-name-card">
                    <div className="ceo-name-main">Nhlamulo Mabunda</div>
                    <div className="ceo-name-role">Founder & CEO — AdSprint, Johannesburg</div>
                  </div>
                </div>
              </div>

              <div className="ceo-col reveal reveal-delay-2">
                <p className="section-label">// Words From The Founder</p>

                <blockquote className="ceo-quote">
                  "I watched too many great South African online stores lose to Shein — not because their products were worse, but because their ads were invisible. That ends here."
                </blockquote>

                <div className="ceo-bio">
                  <p>
                    Nhlamulo Mabunda is a Computer Science graduate from the University of the Witwatersrand (Wits), Johannesburg. He built AdSprint with one specific purpose: to give South African e-commerce brands access to motion ad production that actually competes with global players — without the global agency price tag.
                  </p>
                  <p>
                    His technical background means he does not just make ads that look good. He engineers them for performance — hooks calibrated to SA consumer psychology, creative structured around real purchase objections, and formats optimised for the specific platform where your audience buys.
                  </p>
                  <p>
                    Every new client gets a personal strategy call with Nhlamulo within 20 minutes of payment. Because the difference between an ad that grows your store and one that burns your budget usually comes down to one honest conversation about your product.
                  </p>
                </div>

                <div className="ceo-credentials">
                  {['BSc Computer Science — Wits', 'Founder & CEO', '20+ SA Online Stores Scaled', 'Based in Johannesburg, SA', 'E-Commerce Motion Ads'].map((pill) => (
                    <span key={pill} className="cred-pill">
                      <span style={{ fontSize: '0.7rem' }}>◆</span>
                      {pill}
                    </span>
                  ))}
                </div>

                <div className="ceo-divider" />

                <div className="ceo-sign-row">
                  <div className="ceo-sign-avatar">
                    <img src="/images/ceo.webp" alt="Nhlamulo Mabunda — Founder and CEO of AdSprint" />
                  </div>
                  <div className="ceo-sign-text">
                    <strong>Nhlamulo Mabunda</strong>
                    <span>Founder & CEO, AdSprint — Johannesburg, South Africa</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            GUARANTEES
        ════════════════════════════════════════ */}
        <section id="guarantees" className="guarantees-section" style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }} aria-label="AdSprint e-commerce guarantees and refund policy">
          <div className="container">
            <div className="section-header" style={{ textAlign: 'center' }}>
              <p className="section-label reveal" style={{ textAlign: 'center' }}>// Zero Risk</p>
              <h2 className="section-title reveal reveal-delay-1" style={{ textAlign: 'center' }}>
                Why SA Online Stores<br />
                <em style={{ fontStyle: 'italic', color: 'var(--green)' }}>Trust AdSprint</em>
              </h2>
              <p className="section-subtitle reveal reveal-delay-2" style={{ textAlign: 'center', margin: '0 auto' }}>
                You carry enough risk running an online store in South Africa. Your motion ads agency should not add to it.
              </p>
            </div>

            <div className="guarantee-grid">
              {guarantees.map((g, i) => {
                const Icon = g.icon
                return (
                  <div key={g.title} className={`guarantee-card reveal reveal-delay-${(i % 2) + 1}`}>
                    <div className="guarantee-icon-wrap">
                      <Icon size={28} strokeWidth={2.2} />
                    </div>
                    <h3>{g.title}</h3>
                    <p>{g.desc}</p>
                  </div>
                )
              })}
            </div>

            <div className="guarantees-footer reveal" style={{ marginTop: 40 }}>
              <p>
                "We're not asking you to trust us blindly.<br />
                We're removing every reason not to try us."
              </p>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            CONFIDENTIALITY
        ════════════════════════════════════════ */}
        <section className="conf-section">
          <div className="container">
            <div className="conf-inner">
              <div>
                <div className="conf-badge reveal">
                  <Lock size={16} strokeWidth={2.2} />
                  <span>Your Ads Stay Yours</span>
                </div>
                <h2 className="section-title reveal reveal-delay-1">
                  Your best product ad<br />is a <em style={{ fontStyle: 'italic', color: 'var(--green)' }}>competitive advantage.</em>
                </h2>
                <p className="section-subtitle reveal reveal-delay-2" style={{ marginBottom: 0 }}>
                  When an ad is converting at 4× ROAS, the last thing you want is your agency posting it for your competitors to copy. We default to complete confidentiality on everything.
                </p>

                <div className="conf-points">
                  {[
                    { icon: ShieldCheck, title: 'Never Shared Without Your Permission', body: 'Your product ads, performance data, and brand strategy are never shared publicly or used in our own marketing without your explicit written consent.' },
                    { icon: Trophy,      title: 'Your High-Performing Ad Is Protected', body: 'A 4× ROAS ad is not just content — it is a revenue asset. We treat it like one. Your best creative never appears in our portfolio without your say-so.' },
                    { icon: FolderLock,  title: '100% Creative Ownership on Delivery', body: 'Full copyright is transferred to you the moment we deliver. No licences, no usage restrictions, no strings — the creative is yours forever.' },
                  ].map((pt, i) => {
                    const Icon = pt.icon
                    return (
                      <div key={pt.title} className={`conf-point reveal reveal-delay-${i + 1}`}>
                        <div className="conf-point-icon"><Icon size={24} strokeWidth={2.1} /></div>
                        <div className="conf-point-body">
                          <h4>{pt.title}</h4>
                          <p>{pt.body}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="reveal reveal-delay-2">
                <div className="conf-quote-card">
                  <span className="conf-quote-mark">"</span>
                  <p className="conf-quote-text">
                    We've seen too many agencies use client work as their own marketing currency — sharing strategies, results, and creative work without fully considering what that means for their clients' competitive position. An ad that converts at 4× ROAS in your product category is valuable intelligence. We protect it by default. What we build for your store is yours — and it stays that way.
                  </p>
                  <div className="conf-quote-footer">
                    <div>
                      <strong>Nhlamulo Mabunda</strong>
                      <span>Founder & CEO, AdSprint</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            PRICING
        ════════════════════════════════════════ */}
        <section id="pricing" className="pricing-section" aria-label="Motion ads pricing for South African e-commerce stores">
          <div className="container">
            <div className="section-header" style={{ textAlign: 'center' }}>
              <p className="section-label reveal" style={{ textAlign: 'center' }}>// Pricing</p>
              <h2 className="section-title reveal reveal-delay-1" style={{ textAlign: 'center' }}>
                Motion Ads Pricing for<br />
                <em style={{ fontStyle: 'italic', color: 'var(--green)' }}>SA Online Stores</em>
              </h2>
              <p className="section-subtitle reveal reveal-delay-2" style={{ textAlign: 'center', margin: '0 auto' }}>
                Transparent monthly plans in ZAR. Includes production, ads management, and strategy — no hidden fees, cancel any time.
              </p>
            </div>

            <div className="pricing-grid" ref={pricingRef}>
              {plans.map((plan, i) => (
                <div key={plan.name} className={`pricing-card${plan.popular ? ' popular' : ''} reveal reveal-delay-${i + 1}`}>
                  {plan.popular && <div className="popular-badge">Most Popular</div>}
                  <div className="pricing-plan">{plan.plan}</div>
                  <div className="pricing-name">{plan.name}</div>
                  <div className="pricing-tagline">{plan.tagline}</div>
                  <div className="pricing-price">
                    <span className="price-currency">{plan.currency}</span>
                    <span className="price-amount">{plan.price}</span>
                    <span className="price-period"> / {plan.period}</span>
                  </div>
                  <div className="pricing-divider" />
                  <ul className="pricing-features">
                    {plan.features.map((f) => (
                      <li key={f}><Check />{f}</li>
                    ))}
                  </ul>
                  <a href={`/checkout?plan=${plan.name}`} className={`pricing-cta ${plan.ctaClass}`}>
                    {plan.cta}
                    {plan.popular && <span style={{ fontSize: '0.8rem' }}>→</span>}
                  </a>
                </div>
              ))}
            </div>

            {/* Pricing footnote */}
            <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-tertiary)', fontWeight: 300, marginTop: 32 }}>
              All plans include a personal CEO strategy call within 20 minutes of payment · Full refund + R1,000 if not satisfied · Cancel any time with 30 days notice
            </p>
          </div>
        </section>

        {/* ════════════════════════════════════════
            FAQ
        ════════════════════════════════════════ */}
        <section id="faq" className="section" style={{ paddingTop: 0 }} aria-label="Frequently asked questions about AdSprint e-commerce motion ads">
          <div className="container" style={{ maxWidth: 720 }}>
            <div className="section-header" style={{ textAlign: 'center' }}>
              <p className="section-label reveal" style={{ textAlign: 'center' }}>// FAQ</p>
              <h2 className="section-title reveal reveal-delay-1" style={{ textAlign: 'center' }}>
                Frequently Asked Questions
              </h2>
              <p style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 300, marginTop: 8, marginBottom: 36 }}>
                Everything SA online store owners ask before signing up with AdSprint
              </p>
            </div>
          </div>

          <div style={{ width: '100%', maxWidth: 720, margin: '0 auto', padding: '0 clamp(16px, 5vw, 24px)', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className={`feature-card reveal reveal-delay-${i % 3 + 1}`}
                  style={{ cursor: 'pointer', padding: '24px 28px' }}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
                    <h3 style={{ fontSize: '1rem', fontFamily: 'Outfit,sans-serif', fontWeight: 500, letterSpacing: 0, margin: 0 }}>
                      {faq.q}
                    </h3>
                    <span style={{ color: 'var(--green)', fontSize: '1.2rem', transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.3s', flexShrink: 0 }}>
                      +
                    </span>
                  </div>
                  {openFaq === i && (
                    <p style={{ marginTop: 16, marginBottom: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 300, lineHeight: 1.65, animation: 'slideDown 0.25s ease' }}>
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            CTA BANNER
        ════════════════════════════════════════ */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-inner reveal">
    
              <h2 className="cta-title">
                Your store deserves ads<br />that actually <em style={{ fontStyle: 'italic', color: 'var(--green)' }}>sell.</em>
              </h2>
              <p className="cta-subtitle">
                Pay today. CEO call in 20 minutes. First product ads live within 48 hours.
              </p>
              <div className="cta-actions">
                <a href="/checkout" className="btn-primary-lg">
                  Get My Store's Ads <Arrow />
                </a>
                <button className="btn-ghost" style={{ fontSize: '1rem', padding: '16px 28px' }} onClick={() => scrollTo('guarantees')}>
                  See All Guarantees
                </button>
              </div>
              <p style={{ marginTop: 24, fontSize: '0.8rem', color: 'var(--text-tertiary)', fontWeight: 300 }}>
                Full refund + R1,000 if not satisfied · Cancel any time · 100% confidential
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* ─── FOOTER ─── */}
      <footer>
        <div className="container">
          <div className="footer-inner">
            <div>
              <a href="#" className="nav-logo" style={{ fontSize: '1.2rem', textDecoration: 'none', display: 'inline-flex' }} onClick={(e) => { e.preventDefault(); scrollTo('hero') }}>
                <div className="nav-logo-dot" />
                AdSprint
              </a>
              <p className="footer-copy" style={{ marginTop: 8 }}>
                © {new Date().getFullYear()} AdSprint — Motion Ads for SA E-Commerce, Johannesburg, South Africa.
              </p>
              <p className="footer-copy" style={{ marginTop: 4, fontSize: '0.72rem' }}>
                A CodeSprint product under Mirthh (Pty) Ltd.
              </p>
              <address style={{ fontStyle: 'normal', fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 300, marginTop: 10, lineHeight: 1.7 }}>
                Johannesburg, Gauteng, South Africa<br />
                <a href="tel:0633217882" style={{ color: 'var(--text-tertiary)', textDecoration: 'none' }}>063 321 7882</a>
                {' · '}
                <a href="mailto:hello@adsprint.co.za" style={{ color: 'var(--text-tertiary)', textDecoration: 'none' }}>hello@adsprint.co.za</a>
              </address>
            </div>
            <div className="footer-links">
              <a href="/#how-it-works">How It Works</a>
              <a href="/#our-work">Our Work</a>
              <a href="/#pricing">Pricing</a>
              <a href="/#faq">FAQ</a>
              <a href="/privacypolicy">Privacy Policy</a>
              <a href="/termsofservice">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
