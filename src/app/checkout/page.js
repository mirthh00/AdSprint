'use client'

import {Suspense, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  Video,
  Wallet,
  DoorOpen,
  Lock,
} from 'lucide-react'
/* ─── tiny SVG icons (no extra dep) ─── */
const IconArrowLeft = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 3L5 8l5 5"/>
  </svg>
)

const IconShield = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
)

const IconLock = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
)

const CheckIcon = () => (
  <span className="check-icon" aria-hidden="true">✓</span>
)

/* ─── Plans data ─── */
const PLANS = [
  {
    id: 'Starter',
    name: 'Starter',
    tagline: 'Try it out',
    price: '3,000',
    priceNum: 3000,
    period: 'Monthly',
    popular: false,
    features: [
      '2 custom motion ads',
      '2 custom motion explainer videos',
      'Sound effects',
      'Voice overs',
      'Simple animations',
      'Fast delivery (48h)',
      '4 revisions included',
    ],
  },
  {
    id: 'Growth',
    name: 'Growth',
    tagline: 'Get consistent customers',
    price: '6,000',
    priceNum: 6000,
    period: 'Monthly',
    popular: true,
    features: [
      '4 custom motion ads, explainer videos & FAQ videos',
      '2D & 3D Animations',
      'Sound effects',
      'Voice overs',
      'Unlimited revisions',
      'Google / Social ads setup - designed to reduce wasted spend',
      'Performance optimisation',
      'Fast delivery (24h)',
      'Priority support',
    ],
  },
  {
    id: 'Scale',
    name: 'Scale',
    tagline: 'Accelerate your growth',
    price: '12,000',
    priceNum: 12000,
    period: 'Monthly',
    popular: false,
    features: [
      'Double of everything in Growth',
      'Complex 2D & 3D animations',
      'Multiple variations for testing',
      'Advanced messaging direction',
      'Google / Social ads management',
      'Ongoing content flow',
      'Priority handling',
    ],
  },
]

function CheckoutContent() {
  /* ── Get plan from URL param ── */
  const searchParams = useSearchParams()

const getInitialPlan = () => {
  const planParam = searchParams.get('plan')

  if (['Starter', 'Growth', 'Scale'].includes(planParam)) {
    return planParam
  }

  return 'growth'
}
const [selectedPlan, setSelectedPlan] = useState(getInitialPlan)
useEffect(() => {
  const planParam = searchParams.get('plan')

  if (['Starter', 'Growth', 'Scale'].includes(planParam)) {
    setSelectedPlan(planParam)
  } else {
    setSelectedPlan('growth')
  }
}, [searchParams])
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
  })

  const plan = PLANS.find((p) => p.id === selectedPlan) || PLANS[1]

  /* ── Field change ── */
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  /* ── Validate ── */
  const validate = () => {
    const newErrors = {}
    if (!form.firstName.trim()) newErrors.firstName = 'Required'
    if (!form.lastName.trim()) newErrors.lastName = 'Required'
    if (!form.email.trim()) newErrors.email = 'Required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Enter a valid email'
    if (!form.phone.trim()) newErrors.phone = 'Required'
    else if (form.phone.replace(/\D/g, '').length < 9) newErrors.phone = 'Enter a valid number'
    return newErrors
  }

  /* ── Submit ── */
  /* ── Submit ── */
const handleSubmit = async (e) => {
  e.preventDefault()

  const errs = validate()

  if (Object.keys(errs).length > 0) {
    setErrors(errs)
    return
  }

  try {
    setLoading(true)

    // 1. Create user/order in DB
    const response = await fetch('/api/submit', {
      method: 'POST',
      body: JSON.stringify({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        company: form.company,
        plan: plan.name,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const result = await response.json()

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Something went wrong')
    }

    // 2. Redirect to PayFast
    window.location.href = result.paymentUrl

  } catch (error) {
    console.error(error)
    alert('Something went wrong. Please try again.')
  } finally {
    setLoading(false)
  }
}

  /* ════════════════════════════════
     SUCCESS STATE
  ════════════════════════════════ */
  if (submitted) {
    return (
      <div className="checkout-page">
        <div className="checkout-page-bg">
          <div className="checkout-orb-1" />
          <div className="checkout-orb-2" />
          <div className="checkout-grid-bg" />
        </div>

        <div className="checkout-success">
          <div className="success-icon-wrap">✅</div>
          <h1 className="success-title">
            You're in.<br /><em>Let's build.</em>
          </h1>
          <p className="success-subtitle">
            Payment confirmed for the <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{plan.name}</strong> plan.
            Check your inbox for a receipt — and watch for a Microsoft Teams invite from our CEO.
          </p>

          <div className="success-steps">
            <div className="success-step">
              <div className="success-step-num">01</div>
              <div className="success-step-body">
                <strong>Payment confirmed</strong>
                <span>Receipt sent to {form.email || 'your email'}</span>
              </div>
            </div>
            <div className="success-step" style={{ borderColor: 'rgba(0,120,212,0.3)', background: 'rgba(0,120,212,0.05)' }}>
              <div className="success-step-num" style={{ background: 'rgba(0,120,212,0.12)', borderColor: 'rgba(0,120,212,0.25)', color: '#4BA3E3' }}>02</div>
              <div className="success-step-body">
                <strong>Microsoft Teams invite — within 20 min</strong>
                <span>Our CEO will send a personal strategy call invite to {form.email || 'your email'}</span>
              </div>
            </div>
            <div className="success-step">
              <div className="success-step-num">03</div>
              <div className="success-step-body">
                <strong>Creative production begins</strong>
                <span>After your strategy call, production kicks off immediately</span>
              </div>
            </div>
          </div>

          <Link
            href="/"
            className="btn-primary"
            style={{ fontSize: '0.9375rem', padding: '14px 28px' }}
          >
            ← Back to AdSprint
          </Link>
        </div>
      </div>
    )
  }

  /* ════════════════════════════════
     MAIN CHECKOUT
  ════════════════════════════════ */
  return (
    <div className="checkout-page">
      {/* Background */}
      <div className="checkout-page-bg">
        <div className="checkout-orb-1" />
        <div className="checkout-orb-2" />
        <div className="checkout-grid-bg" />
      </div>

      <div className="checkout-wrap">

        {/* ══════════════════════════
            LEFT — FORM
        ══════════════════════════ */}
        <div>
          <Link href="/" className="checkout-back">
            <IconArrowLeft /> Back to AdSprint
          </Link>

          <p className="checkout-eyebrow">// Secure Checkout</p>
          <h1 className="checkout-title">
            One step to<br /><em>growth.</em>
          </h1>
          <p className="checkout-subtitle">
            Fill in your details, choose your plan, and proceed to secure payment via PayFast. Our CEO will personally reach out within 20 minutes.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="checkout-form-card">

              {/* ── Personal details ── */}
              <div style={{ marginBottom: '6px' }}>
                <div style={{ fontSize: '0.75rem', fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, color: 'var(--green)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '18px' }}>
                  Your Details
                </div>
                <div className="field-group">
                  <div className="field-row">
                    <div className="field">
                      <label className="field-label" htmlFor="firstName">First Name</label>
                      <input
                        className="field-input"
                        id="firstName"
                        name="firstName"
                        type="text"
                        autoComplete="given-name"
                        placeholder="John"
                        value={form.firstName}
                        onChange={handleChange}
                        style={errors.firstName ? { borderColor: '#FF4D6A' } : {}}
                      />
                      {errors.firstName && <span style={{ fontSize: '0.72rem', color: '#FF4D6A', fontWeight: 500 }}>{errors.firstName}</span>}
                    </div>
                    <div className="field">
                      <label className="field-label" htmlFor="lastName">Last Name</label>
                      <input
                        className="field-input"
                        id="lastName"
                        name="lastName"
                        type="text"
                        autoComplete="family-name"
                        placeholder="Doe"
                        value={form.lastName}
                        onChange={handleChange}
                        style={errors.lastName ? { borderColor: '#FF4D6A' } : {}}
                      />
                      {errors.lastName && <span style={{ fontSize: '0.72rem', color: '#FF4D6A', fontWeight: 500 }}>{errors.lastName}</span>}
                    </div>
                  </div>

                  <div className="field">
                    <label className="field-label" htmlFor="email">Email Address</label>
                    <input
                      className="field-input"
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="john@company.co.za"
                      value={form.email}
                      onChange={handleChange}
                      style={errors.email ? { borderColor: '#FF4D6A' } : {}}
                    />
                    {errors.email && <span style={{ fontSize: '0.72rem', color: '#FF4D6A', fontWeight: 500 }}>{errors.email}</span>}
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', fontWeight: 300 }}>
                      Your Teams call invite & receipt will be sent here
                    </span>
                  </div>

                  <div className="field-row">
                    <div className="field">
                      <label className="field-label" htmlFor="phone">Phone Number</label>
                      <input
                        className="field-input"
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+27 82 000 0000"
                        value={form.phone}
                        onChange={handleChange}
                        style={errors.phone ? { borderColor: '#FF4D6A' } : {}}
                      />
                      {errors.phone && <span style={{ fontSize: '0.72rem', color: '#FF4D6A', fontWeight: 500 }}>{errors.phone}</span>}
                    </div>
                    <div className="field">
                      <label className="field-label" htmlFor="company">Company (optional)</label>
                      <input
                        className="field-input"
                        id="company"
                        name="company"
                        type="text"
                        autoComplete="organization"
                        placeholder="Your Business"
                        value={form.company}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-divider" />

              {/* ── Plan selector ── */}
              <div className="plan-selector">
                <div className="plan-selector-label">Select Your Plan</div>
                {PLANS.map((p) => (
                  <div
                    key={p.id}
                    className={`plan-option${selectedPlan === p.id ? ' selected' : ''}`}
                    onClick={() => setSelectedPlan(p.id)}
                    role="radio"
                    aria-checked={selectedPlan === p.id}
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedPlan(p.id) }}
                  >
                    {p.popular && <div className="plan-popular-tag">Most Popular</div>}
                    <div className="plan-option-left">
                      <div className="plan-radio">
                        <div className="plan-radio-dot" />
                      </div>
                      <div>
                        <div className="plan-option-name">{p.name}</div>
                        <div className="plan-option-desc">{p.tagline} · {p.period}</div>
                      </div>
                    </div>
                    <div className="plan-option-price">R{p.price}</div>
                  </div>
                ))}
              </div>

              <div className="form-divider" />

              {/* ── Submit ── */}
              <button
                type="submit"
                className="checkout-submit"
                disabled={loading}
                aria-label="Proceed to secure payment"
              >
                {loading ? (
                  <>
                    <span style={{ display: 'inline-block', width: 18, height: 18, border: '2px solid rgba(5,10,6,0.3)', borderTopColor: '#050A06', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                    Redirecting to PayFast…
                  </>
                ) : (
                  <>
                    
                    Pay R{plan.price} Securely
                    <span style={{ fontSize: '0.8rem' }}>→</span>
                  </>
                )}
              </button>

              {/* PayFast trust row */}
              <div className="payfast-row">
                <div className="payfast-badge">
                  <IconShield />
                  Secured by <strong>PayFast</strong>
                </div>
                <div className="payfast-badge">
                  <IconLock />
                  256-bit SSL encryption
                </div>
              </div>

              {/* Fine print */}
              <p style={{ textAlign: 'center', fontSize: '0.72rem', color: 'var(--text-tertiary)', fontWeight: 300, lineHeight: 1.6, marginTop: '16px' }}>
                By proceeding you agree to our{' '}
                <a href="/termsofservice" style={{ color: 'var(--green)', textDecoration: 'none' }}>Terms of Service</a>
                {' '}and{' '}
                <a href="/privacypolicy" style={{ color: 'var(--green)', textDecoration: 'none' }}>Privacy Policy</a>.
                {' '}We never store your payment details.
              </p>
            </div>
          </form>
        </div>

        {/* ══════════════════════════
            RIGHT — SIDEBAR
        ══════════════════════════ */}
        <aside className="checkout-sidebar">

          {/* Order summary — liquid glass */}
          <div className="summary-card">
            <div className="summary-header">
              <div className="summary-label">// Order Summary</div>
              <div className="summary-plan-name">{plan.name} Plan</div>
              <div className="summary-plan-tag">{plan.tagline}</div>
            </div>

            <div className="summary-price-row" style={{ position: 'relative', zIndex: 1 }}>
              <span className="summary-currency">R</span>
              <span className="summary-amount">{plan.price}</span>
              <span className="summary-period"> / {plan.period}</span>
            </div>

            <div style={{ height: 1, background: 'var(--border)', margin: '16px 0 20px', position: 'relative', zIndex: 1 }} />

            <ul className="summary-features">
              {plan.features.map((f) => (
                <li key={f}>
                  <CheckIcon />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Microsoft Teams call */}
          <div className="teams-highlight-card">
           <div className="trust-icon-wrap">
  <Video size={22} strokeWidth={2.2} />
</div>
            <div className="teams-body">
              <strong>Strategy Call With Our CEO</strong>
              <p>
                Immediately after payment, Nhlamulo Mabunda (Founder & CEO) will personally send you a Microsoft Teams invite to align on your brand, audience, and creative direction.
              </p>
              <div className="teams-timer">
                Expect your invite within 20 minutes
              </div>
            </div>
          </div>

          {/* Refund guarantee */}
          <div className="trust-card">
            <div className="trust-icon-wrap">
  <Wallet size={22} strokeWidth={2.2} />
</div>
            <div className="trust-body">
              <strong>Full Refund Guarantee</strong>
              <p>
                If the work doesn't match your brief, we fix it free. If you're still not satisfied — we refund you completely, no questions asked.
              </p>
            </div>
          </div>

          {/* No lock-in */}
          <div className="trust-card">
          <div className="trust-icon-wrap">
  <DoorOpen size={22} strokeWidth={2.2} />
</div>
            <div className="trust-body">
              <strong>Exit Any Time — 30 Days Notice</strong>
              <p>
                Monthly plans can be cancelled with just 30 days notice. No hidden clauses, no penalties, no awkward conversations.
              </p>
            </div>
          </div>

          {/* Confidentiality */}
          <div className="trust-card">
            <div className="trust-icon-wrap">
  <Lock size={22} strokeWidth={2.2} />
</div>
            <div className="trust-body">
              <strong>Your Strategy Stays Yours</strong>
              <p>
                We default to complete confidentiality. Your creative work, your results, your strategy — never shared without your explicit permission.
              </p>
            </div>
          </div>

        </aside>
      </div>

      {/* Spinner keyframe */}
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}

export default function Checkout() {
  return (
    <Suspense fallback={<div />}>
      <CheckoutContent />
    </Suspense>
  )
}
