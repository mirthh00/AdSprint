'use client'

import Link from 'next/link'

const Section = ({ number, title, children }) => (
  <div style={{ marginBottom: '56px' }}>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      marginBottom: '18px'
    }}>
      <div style={{
        width: '42px',
        height: '42px',
        borderRadius: '12px',
        background: 'rgba(0,232,122,0.08)',
        border: '1px solid rgba(0,232,122,0.18)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--green)',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.72rem',
        fontWeight: 700,
        letterSpacing: '0.08em',
        flexShrink: 0,
      }}>
        {number}
      </div>

      <h2 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 'clamp(1.5rem, 3vw, 2rem)',
        fontWeight: 600,
        color: 'var(--text-primary)',
        letterSpacing: '-0.03em',
        lineHeight: 1.1,
      }}>
        {title}
      </h2>
    </div>

    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '14px',
      fontSize: '0.94rem',
      lineHeight: 1.85,
      color: 'var(--text-secondary)',
      fontWeight: 300,
    }}>
      {children}
    </div>
  </div>
)

const P = ({ children }) => (
  <p>{children}</p>
)

const Ul = ({ items }) => (
  <ul style={{
    paddingLeft: '22px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  }}>
    {items.map((item, i) => (
      <li key={i} style={{ paddingLeft: '6px' }}>
        {item}
      </li>
    ))}
  </ul>
)

const InfoBox = ({ label, children }) => (
  <div style={{
    background: 'rgba(0,232,122,0.05)',
    border: '1px solid rgba(0,232,122,0.18)',
    borderRadius: '18px',
    padding: '22px 24px',
  }}>
    {label && (
      <p style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.68rem',
        fontWeight: 600,
        color: 'var(--green)',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        marginBottom: '10px',
      }}>
        {label}
      </p>
    )}

    <div style={{
      fontSize: '0.9rem',
      color: 'var(--text-secondary)',
      lineHeight: 1.8,
      fontWeight: 300,
    }}>
      {children}
    </div>
  </div>
)

export default function TermsPage() {
  return (
    <div
      style={{
        minHeight: '100svh',
        paddingTop: '68px',
        background: 'var(--bg)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >

      {/* Background */}
      <div
        style={{
          position: 'fixed',
          top: -220,
          right: -180,
          width: 520,
          height: 520,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, var(--green) 0%, transparent 70%)',
          opacity: 0.06,
          filter: 'blur(90px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage:
            'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage:
            'radial-gradient(ellipse 80% 60% at 50% 20%, black 20%, transparent 100%)',
          opacity: 0.25,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '860px',
          margin: '0 auto',
          padding: 'clamp(40px, 6vw, 90px) 24px 100px',
        }}
      >

        {/* Back */}
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.82rem',
            color: 'var(--text-tertiary)',
            textDecoration: 'none',
            marginBottom: '42px',
            transition: 'color 0.2s',
          }}
        >
          ← Back to AdSprint
        </Link>

        {/* Header */}
        <div
          style={{
            marginBottom: '56px',
            paddingBottom: '42px',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.72rem',
              fontWeight: 600,
              color: 'var(--green)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: '14px',
            }}
          >
            // Legal
          </p>

          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.6rem, 6vw, 4rem)',
              fontWeight: 600,
              letterSpacing: '-0.04em',
              color: 'var(--text-primary)',
              lineHeight: 1,
              marginBottom: '18px',
            }}
          >
            Terms of <em style={{ color: 'var(--green)' }}>Service</em>
          </h1>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '18px',
            }}
          >
            {[
              'Effective: 1 June 2025',
              'Republic of South Africa',
              'AdSprint (Pty) Ltd',
            ].map((item) => (
              <div
                key={item}
                style={{
                  padding: '10px 14px',
                  borderRadius: '999px',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  fontSize: '0.76rem',
                  color: 'var(--text-secondary)',
                  fontWeight: 400,
                }}
              >
                {item}
              </div>
            ))}
          </div>

          <p
            style={{
              fontSize: '0.92rem',
              color: 'var(--text-secondary)',
              fontWeight: 300,
              lineHeight: 1.8,
              maxWidth: '700px',
            }}
          >
            These Terms govern your use of AdSprint and all services
            provided by us. By purchasing a plan or using our services,
            you agree to these Terms and all applicable South African
            legislation including the CPA, ECT Act, and POPIA.
          </p>
        </div>

        <InfoBox label="Important">
          <p>
            By purchasing our services, you acknowledge that you have
            read, understood, and agreed to these Terms. If you do not
            agree, you should not use our website or services.
          </p>
        </InfoBox>

        <div style={{ height: '52px' }} />

        <Section number="01" title="Agreement to Terms">
          <P>
            These Terms constitute a legally binding agreement between
            you ("Client") and AdSprint (Pty) Ltd ("AdSprint", "we",
            "our").
          </P>

          <P>
            Continued use of our website or services constitutes ongoing
            acceptance of these Terms.
          </P>
        </Section>

        <Section number="02" title="Our Services">
          <P>
            AdSprint provides premium digital advertising production
            services including:
          </P>

          <Ul
            items={[
              'Motion advertisements for Meta, TikTok, Instagram, YouTube, and Google.',
              'Creative strategy consulting and positioning guidance.',
              'Explainer videos, FAQ content, and branded ad creatives.',
              'High-volume ad production for scaling brands.',
            ]}
          />

          <InfoBox label="Strategy Call">
            Following successful payment, our CEO will contact you via
            Microsoft Teams within 20 minutes during business hours
            (Mon–Fri, 08:00–18:00 SAST).
          </InfoBox>
        </Section>

        <Section number="03" title="Orders & Payment">
          <P>
            All prices are listed in South African Rand (ZAR).
          </P>

          <P>
            Payments are securely processed via PayFast. AdSprint does
            not store your card information.
          </P>

          <P>
            Monthly plans renew automatically until cancelled in
            accordance with these Terms.
          </P>
        </Section>

        <Section number="04" title="Intellectual Property">
          <P>
            Upon full payment, ownership of final deliverables produced
            specifically for you transfers fully to you.
          </P>

          <P>
            We maintain strict confidentiality regarding client work,
            strategy, results, and creative assets unless explicit
            written consent is provided.
          </P>

          <InfoBox label="Confidentiality">
            Your best-performing ad is a competitive advantage. We treat
            it that way.
          </InfoBox>
        </Section>

        <Section number="05" title="Guarantees & Refunds">
          <Ul
            items={[
              'If the work does not match the agreed brief, we revise it free of charge.',
              'If you remain unsatisfied after revisions, you may request a full refund.',
              'If an ad materially underperforms agreed benchmarks, we will strategically rebuild it at no additional cost.',
              'Monthly plans may be cancelled with 30 days written notice.',
            ]}
          />

          <P>
            These guarantees exist in addition to your statutory rights
            under the Consumer Protection Act 68 of 2008.
          </P>
        </Section>

        <Section number="06" title="Limitation of Liability">
          <P>
            To the maximum extent permitted under South African law,
            AdSprint’s liability shall not exceed the fees paid by you
            within the preceding 3 months.
          </P>

          <P>
            We are not liable for indirect or consequential damages
            including loss of revenue, business interruption, or loss of
            goodwill except where prohibited by law.
          </P>
        </Section>

        <Section number="07" title="Termination">
          <P>
            Clients may cancel recurring plans with 30 calendar days’
            written notice.
          </P>

          <P>
            AdSprint reserves the right to suspend or terminate services
            for material breach, non-payment, or prohibited conduct.
          </P>
        </Section>

        <Section number="08" title="Governing Law">
          <P>
            These Terms are governed by the laws of the Republic of
            South Africa.
          </P>

          <P>
            Any disputes shall fall under the jurisdiction of South
            African courts.
          </P>
        </Section>

        <Section number="09" title="Contact Us">
          <div
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '18px',
              padding: '24px',
            }}
          >
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.15rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: '12px',
              }}
            >
              AdSprint — Legal & Compliance
            </p>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                fontSize: '0.9rem',
                color: 'var(--text-secondary)',
              }}
            >
              <p>
                Email:{' '}
                <a
                  href="mailto:legal@adsprint.co.za"
                  style={{
                    color: 'var(--green)',
                    textDecoration: 'none',
                  }}
                >
                  legal@adsprint.co.za
                </a>
              </p>

              <p>
                Johannesburg, Gauteng, South Africa
              </p>

              <p>
                Mon–Fri, 08:00–18:00 SAST
              </p>
            </div>
          </div>
        </Section>

        {/* Footer */}
        <div
          style={{
            paddingTop: '42px',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '18px',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <p
            style={{
              fontSize: '0.8rem',
              color: 'var(--text-tertiary)',
              fontWeight: 300,
            }}
          >
            © {new Date().getFullYear()} AdSprint. All rights reserved.
          </p>

          <div
            style={{
              display: 'flex',
              gap: '22px',
            }}
          >
            <Link
              href="/privacy"
              style={{
                fontSize: '0.8rem',
                color: 'var(--text-tertiary)',
                textDecoration: 'none',
              }}
            >
              Privacy Policy
            </Link>

            <Link
              href="/"
              style={{
                fontSize: '0.8rem',
                color: 'var(--text-tertiary)',
                textDecoration: 'none',
              }}
            >
              Home
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}