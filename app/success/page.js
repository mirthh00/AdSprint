// app/success/page.jsx
'use client'

import Link from 'next/link'
import { CheckCircle2, Mail, ReceiptText, Video, ArrowLeft } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

export default function PaymentSuccessPage() {
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
        background: 'radial-gradient(circle, var(--green) 0%, transparent 70%)',
        opacity: 0.08,
        filter: 'blur(90px)',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundImage:
          'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        maskImage:
          'radial-gradient(ellipse 80% 60% at 50% 20%, black 20%, transparent 100%)',
        opacity: 0.22,
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '760px',
        margin: '0 auto',
        padding: 'clamp(40px,6vw,80px) 24px 100px',
      }}>

        {/* Back */}
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--text-tertiary)',
            textDecoration: 'none',
            fontSize: '0.82rem',
            marginBottom: '44px',
            transition: 'color .2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--green)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-tertiary)'}
        >
          <ArrowLeft size={16} />
          Back to AdSprint
        </Link>

        {/* Hero */}
        <div style={{
          border: '1px solid rgba(0,232,122,0.14)',
          background: 'rgba(255,255,255,0.02)',
          backdropFilter: 'blur(18px)',
          borderRadius: '28px',
          padding: '42px clamp(24px,4vw,42px)',
          marginBottom: '32px',
        }}>

          <div style={{
            width: 74,
            height: 74,
            borderRadius: '22px',
            background: 'rgba(0,232,122,0.12)',
            border: '1px solid rgba(0,232,122,0.18)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '28px',
          }}>
            <CheckCircle2 size={38} strokeWidth={2.2} color="var(--green)" />
          </div>

          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.72rem',
            color: 'var(--green)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            marginBottom: '14px',
          }}>
            // Payment Successful
          </p>

         <h1 style={{
  fontFamily: "'Cormorant Garamond', serif",
  fontSize: 'clamp(2.8rem,7vw,4.8rem)',
  lineHeight: 0.95,
  fontWeight: 600,
  color: 'var(--text-primary)',
  letterSpacing: '-0.04em',
  marginBottom: '20px',
}}>
  {name ? (
    <>
      Welcome aboard,<br />
      <em>{name}.</em>
    </>
  ) : (
    <>
      You're officially <em>in.</em>
    </>
  )}
</h1>

         <p style={{
  fontSize: '1rem',
  lineHeight: 1.85,
  color: 'var(--text-secondary)',
  fontWeight: 300,
  maxWidth: '620px',
}}>
  {name
    ? `Your payment has been received successfully, ${name}. Our team is now preparing your onboarding details and strategy session.`
    : `Your payment has been received successfully. Our team is now preparing your onboarding details and strategy session.`
  }
</p>
        </div>

        {/* Email notice */}
        <div style={{
          background: 'rgba(0,232,122,0.05)',
          border: '1px solid rgba(0,232,122,0.14)',
          borderRadius: '22px',
          padding: '26px',
          marginBottom: '30px',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '16px',
          }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: '14px',
              background: 'rgba(0,232,122,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Mail size={22} color="var(--green)" />
            </div>

            <div>
              <h3 style={{
                fontSize: '1rem',
                color: 'var(--text-primary)',
                marginBottom: '10px',
                fontWeight: 600,
              }}>
                Watch your inbox
              </h3>

              <p style={{
                fontSize: '0.92rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.8,
                fontWeight: 300,
              }}>
                You will receive an email shortly containing:
              </p>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                marginTop: '18px',
              }}>
                {[
                  { icon: ReceiptText, text: 'Payment confirmation & invoice' },
                  { icon: Video, text: 'Microsoft Teams strategy meeting details' },
                  { icon: Mail, text: 'Onboarding and next-step instructions' },
                ].map((item, i) => {
                  const Icon = item.icon

                  return (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        color: 'var(--text-secondary)',
                        fontSize: '0.88rem',
                      }}
                    >
                      <Icon size={16} color="var(--green)" />
                      {item.text}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Maintenance notice */}
        <div style={{
          border: '1px solid var(--border)',
          background: 'var(--surface)',
          borderRadius: '22px',
          padding: '24px',
          marginBottom: '40px',
        }}>
          <p style={{
            fontSize: '0.9rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.8,
            fontWeight: 300,
          }}>
            We apologise if your confirmation email does not arrive instantly.
            Our mailing servers are currently undergoing maintenance and delivery
            may take slightly longer than usual. Your email is still being processed
            and should arrive shortly.
          </p>
        </div>

        {/* CTA */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <Link
            href="/"
            style={{
              height: '54px',
              padding: '0 28px',
              borderRadius: '16px',
              background: 'var(--green)',
              color: '#04110A',
              textDecoration: 'none',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform .2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0px)'}
          >
            Back to Home
          </Link>
        </div>

      </div>
    </div>
  )
}