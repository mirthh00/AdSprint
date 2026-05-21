'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

function useTheme() {
  const [theme, setTheme] = useState('dark')
  useEffect(() => {
    const saved = localStorage.getItem('adsprint-theme') || 'dark'
    setTheme(saved)
    document.documentElement.setAttribute('data-theme', saved)
  }, [])
  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next); document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('adsprint-theme', next)
  }
  return { theme, toggle }
}

const Dot = () => (
  <div style={{ width:8,height:8,background:'var(--green)',borderRadius:'50%',boxShadow:'0 0 12px var(--green)',animation:'pulse-dot 2s infinite',flexShrink:0 }} />
)

export default function LegalLayout({ children, activePage }) {
  const { theme, toggle } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      {/* ── NAV ── */}
      <nav className="navbar">
        <Link href="/" className="nav-logo"><Dot />AdSprint</Link>
        <ul className="nav-links">
          {[['How It Works','/#how-it-works'],['Pricing','/#pricing'],['FAQ','/#faq']].map(([label,href]) => (
            <li key={href}><Link href={href} style={{ fontSize:'.875rem',color:'var(--text-secondary)',textDecoration:'none' }}>{label}</Link></li>
          ))}
        </ul>
        <div className="nav-right">
          <button className="theme-toggle" onClick={toggle} aria-label="Toggle theme">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <Link href="/checkout" className="btn-primary">Get Started</Link>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span style={menuOpen?{transform:'rotate(45deg) translate(5px,5px)'}:{}} />
            <span style={menuOpen?{opacity:0}:{}} />
            <span style={menuOpen?{transform:'rotate(-45deg) translate(5px,-5px)'}:{}} />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${menuOpen?' open':''}`}>
        {[['How It Works','/#how-it-works'],['Pricing','/#pricing'],['FAQ','/#faq'],['Get Started','/checkout']].map(([label,href]) => (
          <Link key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</Link>
        ))}
      </div>

      {/* ── CONTENT ── */}
      <div className="legal-page">
        <div className="container">

          {/* Page switcher */}
          <div className="legal-page-nav" style={{ paddingTop:32 }}>
            <Link href="/terms" className={`${activePage==='terms'?'active':''}`}>Terms of Service</Link>
            <Link href="/privacy" className={`${activePage==='privacy'?'active':''}`}>Privacy Policy</Link>
            <Link href="/">← Back to AdSprint</Link>
          </div>

          {children}
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer>
        <div className="container">
          <div className="footer-inner">
            <div>
              <Link href="/" className="nav-logo" style={{ fontSize:'1.2rem',textDecoration:'none',display:'inline-flex' }}>
                <Dot />AdSprint
              </Link>
              <p className="footer-copy" style={{ marginTop:8 }}>© {new Date().getFullYear()} AdSprint. All rights reserved.</p>
            </div>
            <div className="footer-links">
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
              <Link href="/checkout">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}