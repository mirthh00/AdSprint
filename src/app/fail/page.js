// app/fail/page.jsx
'use client'

import Link from 'next/link'
import { XCircle, RefreshCcw, ArrowLeft } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import {Suspense } from 'react'

function PaymentFailPageContent() {
    const searchParams = useSearchParams()
const name = searchParams.get('name')
  return (
    <div style={{
      minHeight: '100svh',
      background: 'var(--bg)',
      position: 'relative',
      overflow: 'hidden',
      paddingTop: '72px',
    }}>

      {/* Background */}
      <div style={{
        position: 'fixed',
        top: -180,
        right: -120,
        width: 520,
        height: 520,
        borderRadius: '50%',
        background: 'radial-gradient(circle, #FF4D6A 0%, transparent 70%)',
        opacity: 0.08,
        filter: 'blur(90px)',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '720px',
        margin: '0 auto',
        padding: 'clamp(40px,6vw,80px) 24px 100px',
      }}>

        <Link
          href="/checkout"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--text-tertiary)',
            textDecoration: 'none',
            fontSize: '0.82rem',
            marginBottom: '44px',
          }}
        >
          <ArrowLeft size={16} />
          Back to Checkout
        </Link>

        <div style={{
          border: '1px solid rgba(255,77,106,0.14)',
          background: 'rgba(255,255,255,0.02)',
          backdropFilter: 'blur(18px)',
          borderRadius: '28px',
          padding: '42px',
        }}>

          <div style={{
            width: 74,
            height: 74,
            borderRadius: '22px',
            background: 'rgba(255,77,106,0.12)',
            border: '1px solid rgba(255,77,106,0.18)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '28px',
          }}>
            <XCircle size={38} strokeWidth={2.2} color="#FF4D6A" />
          </div>

          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.72rem',
            color: '#FF4D6A',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            marginBottom: '14px',
          }}>
            // Payment Failed
          </p>

       <h1 style={{
  fontFamily: "'Cormorant Garamond', serif",
  fontSize: 'clamp(2.8rem,7vw,4.5rem)',
  lineHeight: 0.95,
  fontWeight: 600,
  color: 'var(--text-primary)',
  letterSpacing: '-0.04em',
  marginBottom: '20px',
}}>
  {name ? (
    <>
      Sorry,<br />
      <em>{name}.</em>
    </>
  ) : (
    <>
      Payment was not <em>completed.</em>
    </>
  )}
</h1>

        <p style={{
  fontSize: '1rem',
  lineHeight: 1.85,
  color: 'var(--text-secondary)',
  fontWeight: 300,
  maxWidth: '580px',
  marginBottom: '34px',
}}>
  {name
    ? `Your transaction could not be completed, ${name}. No successful payment was processed.`
    : `Your transaction was cancelled or could not be processed. No funds were deducted successfully.`
  }
</p>

          <Link
            href="/checkout"
            style={{
              height: '54px',
              padding: '0 28px',
              borderRadius: '16px',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
              textDecoration: 'none',
              fontWeight: 500,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
            }}
          >
            <RefreshCcw size={16} />
            Try Again
          </Link>

        </div>
      </div>
    </div>
  )
}

export default function PaymentFailPage() {
  return (
    <Suspense fallback={<div />}>
      <PaymentFailPageContent />
    </Suspense>
  )
}