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
export default function Home() {
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
    { label: 'Our Work', id: 'our-work' },
    { label: 'Guarantees', id: 'guarantees' },
    { label: 'Pricing', id: 'pricing' },
    { label: 'FAQ', id: 'faq' },
  ]

  const logos = ['Meta', 'Instagram', 'TikTok', 'YouTube', 'Google', 'X / Twitter', 'LinkedIn', 'Pinterest']

  const features = [
    { icon: '⚡', title: 'Motion Ads', desc: 'Scroll-stopping ads engineered to capture attention in the first 1.5 seconds and drive measurable action.', preview: '/images/image5.jpeg', previewText: 'SUMMER\nSALE' },
    { icon: '💬', title: 'Explainer Videos', desc: 'Simplify your message with visually compelling narratives that make your offer irresistible.', preview: '/images/image4.jpeg', previewText: 'What is\nAdSprint?' },
    { icon: '❓', title: 'FAQ Videos', desc: 'Build trust, remove objections, and convert hesitant prospects into confident buyers.', preview: '/images/image3.jpeg', previewText: 'FAQ\nAnswered' },
  ]

  const plans = [
    { plan: 'entry', name: 'Starter', tagline: 'Try it out', currency: 'R', price: '1,100', period: 'One-time', features: ['1 custom motion ad', 'Clean, modern design', 'Fast delivery (48h)', '1 revision included'], cta: 'Get Started', ctaClass: 'outlined', popular: false },
    { plan: 'growth', name: 'Growth', tagline: 'Get consistent customers', currency: 'R', price: '3,000', period: 'Monthly', features: ['3–5 high-converting motion ads', 'Multiple styles & variations', 'Messaging guidance', 'Optimised for social & ads', 'Fast turnaround', 'Priority support'], cta: 'Start Growing', ctaClass: 'solid', popular: true },
    { plan: 'scale', name: 'Scale', tagline: 'Accelerate your growth', currency: 'R', price: '6,000+', period: 'Monthly', features: ['High-volume ad creation', 'Multiple variations for testing', 'Advanced messaging direction', 'Faster delivery timelines', 'Ongoing content flow', 'Priority handling'], cta: 'Scale My Business', ctaClass: 'outlined', popular: false },
  ]

const guarantees = [
  {
    icon: ShieldCheck,
    title: "If it doesn't match — we fix it free",
    desc: "If the delivered work doesn't align with your agreed brief, we go back to the drawing board at no additional cost. Your brief is our contract."
  },
  {
    icon: RefreshCcw,
    title: "If you're still not satisfied — full refund",
    desc: "After we've revised the work and you're still not happy, we refund you completely. No awkward conversations, no holdbacks."
  },
  {
    icon: BarChart3,
    title: "If your ad underperforms — we rebuild it",
    desc: "If your ad launches and underperforms against benchmarks, we strategically rebuild it from the ground up — at no extra cost to you."
  },
  {
    icon: DoorOpen,
    title: "Leave any time — 30 days notice",
    desc: "If you feel we're simply not the right fit for your business, you can exit with just 30 days notice. No lock-ins, no questions asked."
  },
]

  const faqs = [
    { q: 'How long does it take to deliver?', a: 'Starter ads are delivered within 48 hours. Growth and Scale plans have faster turnarounds with dedicated pipeline priority.' },
    { q: 'What platforms are the ads optimised for?', a: 'We create ads optimised for Meta, TikTok, Instagram, YouTube, and Google — across all placements and aspect ratios.' },
    { q: 'Can you help with the script?', a: 'Absolutely. All Growth and Scale plans include messaging guidance and script direction as part of the package.' },
    { q: 'Do you offer revisions?', a: 'Starter includes 1 revision. Growth and Scale plans include unlimited revisions within the billing cycle.' },
    { q: 'How quickly do I hear from you after signing up?', a: 'Within 20 minutes of payment you will receive a Microsoft Teams invite from our CEO to discuss your strategy, goals, and creative direction personally.' },
  ]

  const logoIcon = (name) => ({ Meta: '∞', Instagram: '◻', TikTok: '♪', YouTube: '▶', Google: 'G', 'X / Twitter': '✕', LinkedIn: 'in', Pinterest: '⊕' }[name] || '•')
const pricingRef = useRef(null)
useEffect(() => {
  const el = pricingRef.current

  if (!el) return

  if (window.innerWidth <= 600) {
    requestAnimationFrame(() => {
      const middleCard = el.children[1]

      if (middleCard) {
        el.scrollLeft =
          middleCard.offsetLeft -
          16
      }
    })
  }
}, [])
  return (
    <>
      {/* ─── NAVBAR ─── */}
      <nav className="navbar">
        <a href="#" className="nav-logo" onClick={(e) => { e.preventDefault(); scrollTo('hero') }}>
          <div className="nav-logo-dot" />
          AdSprint
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
          <a href="#pricing" className="btn-primary" onClick={(e) => { e.preventDefault(); scrollTo('pricing') }}>
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
        <a href="#pricing" className="btn-primary" onClick={(e) => { e.preventDefault(); scrollTo('pricing') }}>
          Get Started <Arrow />
        </a>
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
                <div className="hero-badge reveal">
                  <div className="hero-badge-dot" />
                  High-Converting Motion Ads
                </div>
                <h1 className="hero-title reveal reveal-delay-1">
                  Turn attention<br />into <em>customers.</em>
                </h1>
                <p className="hero-subtitle reveal reveal-delay-2">
                  We craft high-converting motion ads that help businesses attract, engage, and convert — beautifully.
                </p>
                <div className="hero-cta reveal reveal-delay-3">
                  <a href="#pricing" className="btn-primary" style={{ fontSize: '1rem', padding: '14px 28px' }} onClick={(e) => { e.preventDefault(); scrollTo('pricing') }}>
                    Get Started <Arrow />
                  </a>
                  <button className="btn-ghost" style={{ fontSize: '1rem', padding: '14px 24px' }} onClick={() => scrollTo('how-it-works')}>
                    ▶ See How It Works
                  </button>
                </div>
                <div className="hero-trust reveal reveal-delay-4">
                  <div className="hero-avatars">
  {[
    '/images/logo0.jpeg',
    '/images/logo2.jpeg',
    '/images/logo3.jpeg',
    '/images/logo00.jpeg',
  ].map((img, i) => (
    <div key={i} className="avatar-image-wrap">
      <img
        src={img}
        alt="Client"
        className="avatar-image"
      />
    </div>
  ))}
</div>
                  <p className="hero-trust-text">
                    Trusted by <strong>200+ businesses</strong><br />to grow and scale
                  </p>
                </div>
              </div>

              {/* Phone mockup */}
              <div className="hero-visual reveal reveal-delay-2">
                

 <div className="">
                  <img
                    src="/images/image2.png"
                    alt="Microsoft Teams strategy call"
                    style={{ width: '100%', height: '100%', display: 'block' }}
                  />
                </div>
             
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            LOGOS
        ════════════════════════════════════════ */}
        <section className="logos-section">
          <p className="logos-label">Ads that look different. Results that make a difference.</p>
          <div className="logos-track-wrapper">
            <div className="logos-track">
              {[0, 1].map((set) => (
                <div key={set} className="logos-track-inner" aria-hidden={set === 1}>
                  {[...logos, ...logos].map((name, i) => (
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
            HOW IT WORKS — 3-STEP PROCESS
        ════════════════════════════════════════ */}
        <section id="how-it-works" className="section">
          <div className="container">
            <div className="section-header">
              <p className="section-label reveal">// How It Works</p>
              <h2 className="section-title reveal reveal-delay-1">
                From sign-up to<br /><em style={{ fontStyle: 'italic', color: 'var(--green)' }}>live ads</em> — in days
              </h2>
              <p className="section-subtitle reveal reveal-delay-2">
                Three steps. No confusion. No waiting weeks to get started.
              </p>
            </div>

            <div className="process-grid">
              {/* Connector line */}
              <div className="process-connector">
                <div className="process-connector-dot" />
                <div className="process-connector-dot" />
              </div>

              {/* Step 1 */}
              <div className="process-card reveal reveal-delay-1">
                <div className="process-step-num">Step 01</div>
                <div className="process-teams-wrap">
                  <img
                    src="/images/image0.png"
                    alt="Microsoft Teams strategy call"
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                </div>
             
                <h3>Choose Your Plan</h3>
                <p>
                  Select the plan that fits your current growth stage — Starter, Growth, or Scale. Payment is simple and secure, and your journey begins the moment you check out.
                </p>
              </div>

              {/* Step 2 */}
              <div className="process-card reveal reveal-delay-2">
                <div className="process-step-num">Step 02</div>
                {/* Teams meeting illustration */}
                <div className="process-teams-wrap">
                  <img
                    src="/images/teams-meeting.png"
                    alt="Microsoft Teams strategy call"
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                </div>
                <h3>Strategy Call With the CEO</h3>
                <p>
                  Within <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>20 minutes of payment</strong>, you'll receive a Microsoft Teams invite directly from our CEO. Together you'll align on your brand voice, target audience, and creative direction before a single frame is produced.
                </p>
               
              </div>

              {/* Step 3 */}
              <div className="process-card reveal reveal-delay-3">
                <div className="process-step-num">Step 03</div>
                <div className="process-teams-wrap">
                  <img
                    src="/images/image1.png"
                    alt="Microsoft Teams strategy call"
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                </div>
               
                <h3>Content Released Per Your Plan</h3>
                <p>
                  With strategy locked in, our team gets to work. Your ads are produced, refined, and delivered on the schedule your plan promises — ready to launch across Meta, TikTok, YouTube, and beyond.
                </p>
                <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {['Starter: 1 ad, 48h delivery', 'Growth: 3–5 ads, monthly cadence', 'Scale: High-volume, ongoing flow'].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.825rem', color: 'var(--text-secondary)', fontWeight: 300 }}>
                      <span style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--green-subtle)', border: '1px solid rgba(0,232,122,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.55rem', color: 'var(--green)', flexShrink: 0 }}>✓</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            OUR WORK — AD TYPES
        ════════════════════════════════════════ */}
        <section id="our-work" className="section" style={{ paddingTop: 0 }}>
           <div className="container">
            <div className="section-header">
              <p className="section-label reveal">// Our Work</p>
              <h2 className="section-title reveal reveal-delay-1">
                What we can do<br />for your business.
              </h2>
              <p className="section-subtitle reveal reveal-delay-2">
                Watch the kind of premium advertising content your business could be launching next.
              </p>
            </div>

   <div className="video-showcase reveal reveal-delay-3">
  <div className="video-showcase-inner">
    <video
      className="showcase-video"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      onPlay={(e) => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              e.target.play()
            } else {
              e.target.pause()
            }
          },
          { threshold: 0.45 }
        )

        observer.observe(e.target)
      }}
    >
      <source src="/videos/showcase.mp4" type="video/mp4" />
    </video>

    <div className="video-overlay-shadow" />
</div>
</div>
          </div>
          <div className="container">
            <div className="section-header">
              <h2 className="section-title reveal reveal-delay-1">
                Ads that work<br />for every goal
              </h2>
              <p className="section-subtitle reveal reveal-delay-2">
                Different types of content. Designed to get results across every platform and funnel stage.
              </p>
            </div>

            <div className="features-grid">
              {features.map((f, i) => (
                <div key={f.title} className={`feature-card reveal reveal-delay-${i + 1}`}>
                   <div className="process-teams-wrap ">
                  <img
                    src={f.preview}
                    alt="Microsoft Teams strategy call"
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                </div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            TEAM BANNER
        ════════════════════════════════════════ */}
        <section className="team-section">
          <div className="team-photo-wrap">
            <img
              src="/images/team.jpg"
              alt="The AdSprint team"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%', display: 'block' }}
            />
            <div className="team-photo-overlay" />
            <div className="team-photo-content">
              <p className="team-eyebrow">// Our People</p>
              <h2 className="team-headline">
                Crafting ads that convert.<br />
                <span style={{ color: 'var(--green)' }}>Every single time.</span>
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
              {/* Photo */}
              <div className="reveal">
                <div className="ceo-photo-frame">
                  <img
                    src="/images/ceo.jpg"
                    alt="John Doe — Founder & CEO of AdSprint"
                  />
                  <div className="ceo-name-card">
                    <div className="ceo-name-main">John Doe</div>
                    <div className="ceo-name-role">Founder & CEO · AdSprint</div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="ceo-col reveal reveal-delay-2">
                <p className="section-label">// Words From The Founder</p>

                <blockquote className="ceo-quote">
                  "I started AdSprint because I watched too many great businesses get ignored — not because their product was weak, but because their ads were invisible. We fix that."
                </blockquote>

                <div className="ceo-bio">
                  <p>
                    John Doe is a Computer Science graduate from the University of the Witwatersrand (Wits), Johannesburg. His background in systems thinking and data gave him an edge most creatives don't have — he builds ads that don't just look good, they perform with measurable precision.
                  </p>
                  <p>
                    His vision is straightforward: every business deserves world-class creative, not just those who can afford agency retainers. AdSprint was built to close that gap — combining elite-level production with transparent pricing and direct founder access from day one.
                  </p>
                  <p>
                    John personally leads the strategy call with every new client within 20 minutes of sign-up. Because he believes the difference between an ad that converts and one that doesn't often comes down to one conversation at the right time.
                  </p>
                </div>

                <div className="ceo-credentials">
                  {['BSc Computer Science — Wits', 'Founder & CEO', '200+ Brands Scaled', 'Based in Johannesburg, SA', 'Motion & Performance Ads'].map((pill) => (
                    <span key={pill} className="cred-pill">
                      <span style={{ fontSize: '0.7rem' }}>◆</span>
                      {pill}
                    </span>
                  ))}
                </div>

                <div className="ceo-divider" />

                <div className="ceo-sign-row">
                  <div className="ceo-sign-avatar">
                    <img src="/images/ceo.jpg" alt="John Doe" />
                  </div>
                  <div className="ceo-sign-text">
                    <strong>John Doe</strong>
                    <span>Founder & CEO, AdSprint — Johannesburg</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            GUARANTEES
        ════════════════════════════════════════ */}
        <section id="guarantees" className="guarantees-section" style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
          <div className="container">
            <div className="section-header" style={{ textAlign: 'center' }}>
              <p className="section-label reveal" style={{ textAlign: 'center' }}>// Our Promise</p>
              <h2 className="section-title reveal reveal-delay-1" style={{ textAlign: 'center' }}>
                Here's what we<br /><em style={{ fontStyle: 'italic', color: 'var(--green)' }}>guarantee.</em>
              </h2>
              <p className="section-subtitle reveal reveal-delay-2" style={{ textAlign: 'center', margin: '0 auto' }}>
                We're not asking you to trust us blindly. We're removing every reason not to try us.
              </p>
            </div>

           <div className="guarantee-grid">
  {guarantees.map((g, i) => {
    const Icon = g.icon

    return (
      <div
        key={g.title}
        className={`guarantee-card reveal reveal-delay-${(i % 2) + 1}`}
      >
        <div className="guarantee-icon-wrap">
          <Icon size={28} strokeWidth={2.2} />
        </div>

        <h3>{g.title}</h3>
        <p>{g.desc}</p>
      </div>
    )
  })}
</div>

            <div className="guarantees-footer reveal" style={{ marginTop: '40px' }}>
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
              {/* Left — text */}
              <div>
                <div className="conf-badge reveal">
                  <Lock size={16} strokeWidth={2.2} />
<span>Client Confidentiality</span>
                </div>
                <h2 className="section-title reveal reveal-delay-1">
                  Your marketing<br />strategy stays <em style={{ fontStyle: 'italic', color: 'var(--green)' }}>yours.</em>
                </h2>
                <p className="section-subtitle reveal reveal-delay-2" style={{ marginBottom: 0 }}>
                  We've seen too many agencies treat client work as their own marketing currency. We do things differently.
                </p>

                <div className="conf-points">
                  {[
                    { icon: ShieldCheck, title: 'Zero Sharing Without Permission', body: 'What we build for you is yours. We default to complete confidentiality and only share your work with your explicit written permission.' },
                    { icon: Trophy, title: 'Your Ad Is a Competitive Advantage', body: 'Your best performing ad isn\'t just content — it\'s a strategic asset. We treat it that way, and protect it accordingly.' },
                    { icon: FolderLock, title: 'Full Creative Ownership', body: 'You own 100% of every file, frame, and piece of creative we produce for you. No licensing, no strings, no surprises.' },
                  ].map((pt, i) => {
                        const Icon = pt.icon
                    return(
                    <div key={pt.title} className={`conf-point reveal reveal-delay-${i + 1}`}>
                          <div className="conf-point-icon">
          <Icon size={24} strokeWidth={2.1} />
        </div>
                      <div className="conf-point-body">
                        <h4>{pt.title}</h4>
                        <p>{pt.body}</p>
                      </div>
                    </div>
                  )})}
                </div>
              </div>

              {/* Right — quote card */}
              <div className="reveal reveal-delay-2">
                <div className="conf-quote-card">
                  <span className="conf-quote-mark">"</span>
                  <p className="conf-quote-text">
                    We've seen too many agencies use client work as their own marketing currency — sharing strategies, results, and creative work without fully considering the competitive implications for their clients. What we build for you is yours. We default to complete confidentiality and only share your work with your explicit permission. Because we understand that your best performing ad isn't just content — it's a competitive advantage.
                  </p>
                  <div className="conf-quote-footer">
               
                    <div>
              
                      <span>AdSprint</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            PRICING — LIQUID GLASS
        ════════════════════════════════════════ */}
        <section id="pricing" className="pricing-section">
          <div className="container">
            <div className="section-header" style={{ textAlign: 'center' }}>
              <p className="section-label reveal" style={{ textAlign: 'center' }}>// Pricing</p>
              <h2 className="section-title reveal reveal-delay-1" style={{ textAlign: 'center' }}>
                Choose the plan that<br />fits your growth
              </h2>
              <p className="section-subtitle reveal reveal-delay-2" style={{ textAlign: 'center', margin: '0 auto' }}>
                Simple. Transparent. Results-driven.
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
                  <a href={`/checkout?plan=${plan.name}`} className={`pricing-cta ${plan.ctaClass}`} >
                    {plan.cta}
                    {plan.popular && <span style={{ fontSize: '0.8rem' }}>→</span>}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            FAQ
        ════════════════════════════════════════ */}
        <section id="faq" className="section" style={{ paddingTop: 0 }}>
          <div className="container" style={{ maxWidth: 720 }}>
            <div className="section-header" style={{ textAlign: 'center' }}>
              <p className="section-label reveal" style={{ textAlign: 'center' }}>// FAQ</p>
              <h2 className="section-title reveal reveal-delay-1" style={{ textAlign: 'center' }}>Questions answered</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
                    <p style={{ marginTop: '16px', marginBottom: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 300, lineHeight: 1.65, animation: 'slideDown 0.25s ease' }}>
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            CTA
        ════════════════════════════════════════ */}
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
                © {new Date().getFullYear()} AdSprint. All rights reserved.
              </p>
            </div>
            <div className="footer-links">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#" onClick={(e) => { e.preventDefault(); scrollTo('pricing') }}>Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
