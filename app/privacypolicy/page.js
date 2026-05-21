'use client'

import Link from 'next/link'

const Section = ({ title, children }) => (
  <div style={{ marginBottom: '48px' }}>
    <h2 style={{
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: 'clamp(1.4rem, 3vw, 1.9rem)',
      fontWeight: 600,
      color: 'var(--text-primary)',
      letterSpacing: '-0.02em',
      marginBottom: '16px',
      lineHeight: 1.15,
    }}>{title}</h2>
    <div style={{
      fontSize: '0.9375rem',
      color: 'var(--text-secondary)',
      lineHeight: 1.8,
      fontWeight: 300,
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    }}>
      {children}
    </div>
  </div>
)

const P = ({ children }) => <p>{children}</p>

const Ul = ({ items }) => (
  <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
    {items.map((item, i) => (
      <li key={i} style={{ paddingLeft: '6px' }}>{item}</li>
    ))}
  </ul>
)

const InfoBox = ({ label, children }) => (
  <div style={{ background: 'rgba(0,232,122,0.05)', border: '1px solid rgba(0,232,122,0.18)', borderRadius: '14px', padding: '18px 22px' }}>
    {label && <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', fontWeight: 600, color: 'var(--green)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>{label}</p>}
    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7, fontWeight: 300 }}>{children}</div>
  </div>
)

export default function PrivacyPolicy() {
  return (
    <div style={{ minHeight: '100svh', paddingTop: '68px', background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>

      {/* Background */}
      <div style={{ position: 'fixed', top: -200, right: -150, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, var(--green) 0%, transparent 70%)', opacity: 0.06, filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', inset: 0, backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)', backgroundSize: '60px 60px', maskImage: 'radial-gradient(ellipse 80% 60% at 50% 20%, black 20%, transparent 100%)', opacity: 0.25, pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto', padding: 'clamp(40px, 6vw, 80px) 24px 100px' }}>

        {/* Back */}
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-tertiary)', textDecoration: 'none', marginBottom: '40px', letterSpacing: '0.02em', transition: 'color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--green)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-tertiary)'}
        >
          ← Back to AdSprint
        </Link>

        {/* Header */}
        <div style={{ marginBottom: '56px', paddingBottom: '40px', borderBottom: '1px solid var(--border)' }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem', fontWeight: 500, color: 'var(--green)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '14px' }}>
            // Legal
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.4rem, 6vw, 3.8rem)', fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--text-primary)', lineHeight: 1, marginBottom: '16px' }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)', fontWeight: 300, lineHeight: 1.65 }}>
            Last updated: May 2025 &nbsp;·&nbsp; Effective immediately
          </p>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 300, lineHeight: 1.7, marginTop: '14px', maxWidth: '620px' }}>
            AdSprint is committed to protecting your personal information in compliance with the Protection of Personal Information Act 4 of 2013 (POPIA). This policy explains what we collect, why we collect it, how we use it, and your rights as a data subject.
          </p>
        </div>

        <InfoBox label="Your rights in plain English">
          <p>You have the right to know what data we hold about you, request corrections, request deletion, and object to how we use it. We will never sell your data. We collect only what we need to deliver our services. Contact us at <a href="mailto:privacy@adsprint.co.za" style={{ color: 'var(--green)', textDecoration: 'none' }}>privacy@adsprint.co.za</a> to exercise any of your rights.</p>
        </InfoBox>

        <div style={{ marginTop: '48px' }} />

        <Section title="1. Who We Are (Responsible Party)">
          <P>Under POPIA, AdSprint is the <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Responsible Party</strong> — the entity that determines the purpose and means of processing your personal information.</P>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', padding: '20px 24px' }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '10px' }}>AdSprint</p>
            <p>Information Officer: John Doe (Founder & CEO)</p>
            <p>Email: <a href="mailto:privacy@adsprint.co.za" style={{ color: 'var(--green)', textDecoration: 'none' }}>privacy@adsprint.co.za</a></p>
            <p>Jurisdiction: Republic of South Africa</p>
          </div>
          <P>You may contact our Information Officer directly with any POPIA-related queries, access requests, or complaints.</P>
        </Section>

        <Section title="2. Personal Information We Collect">
          <P>We collect personal information that you voluntarily provide and information generated through your use of our services. This includes:</P>
          <Ul items={[
            'Identity information: First name, last name, company name.',
            'Contact information: Email address, phone number.',
            'Payment information: Processed and stored securely by PayFast. AdSprint does not store card details.',
            'Communication records: Emails, Microsoft Teams call notes, strategy documents you share with us.',
            'Usage data: IP address, browser type, pages visited, time on site, referral source (collected via cookies and analytics tools).',
            'Business information: Brand assets, marketing goals, target audience data you share during onboarding.',
          ]} />
          <P>We do not intentionally collect sensitive personal information (such as race, religion, health data, or biometric data) and ask that you do not share such information with us.</P>
        </Section>

        <Section title="3. Lawful Basis for Processing (POPIA Conditions)">
          <P>AdSprint processes your personal information only where we have a lawful basis to do so, in accordance with the eight conditions for lawful processing under POPIA:</P>
          <Ul items={[
            'Accountability: We are responsible for ensuring POPIA compliance across all processing activities.',
            'Processing limitation: We collect only the minimum information necessary for the stated purpose.',
            'Purpose specification: Information is collected for specific, explicit, and legitimate purposes.',
            'Further processing limitation: We will not process information in a way incompatible with the original purpose.',
            'Information quality: We take reasonable steps to ensure your information is accurate and up to date.',
            'Openness: We are transparent about what we collect and why (this policy).',
            'Security safeguards: We apply appropriate technical and organisational security measures.',
            'Data subject participation: You have the right to access, correct, and delete your information.',
          ]} />
        </Section>

        <Section title="4. How We Use Your Information">
          <P>We use your personal information for the following purposes:</P>
          <Ul items={[
            'To deliver the services you have purchased — including ad production and strategy sessions.',
            'To schedule and conduct your Microsoft Teams strategy call with our CEO.',
            'To process payments securely via PayFast.',
            'To send you service-related communications: receipts, delivery notifications, revision requests.',
            'To send you important account updates, including changes to pricing or Terms.',
            'To improve our services through aggregated, anonymised usage analysis.',
            'To comply with South African legal obligations.',
          ]} />
          <P>We will not use your information for unsolicited marketing without your explicit opt-in consent. If you consent to marketing communications, you may withdraw that consent at any time by clicking "Unsubscribe" in any email we send, or by contacting us directly.</P>
        </Section>

        <Section title="5. Sharing of Personal Information">
          <P>AdSprint does not sell, rent, or trade your personal information. We share your information only in the following limited circumstances:</P>
          <Ul items={[
            'PayFast: Your name, email, and payment amount are shared with PayFast to process your transaction. PayFast is bound by its own privacy policy and PCI-DSS compliance obligations.',
            'Microsoft: Your email address is used to send a Teams calendar invite. Microsoft processes this data under its own privacy policy.',
            'Service providers: We may share anonymised or aggregated data with analytics providers (e.g. Google Analytics) strictly for improving our website.',
            'Legal obligations: We may disclose your information if required by South African law, court order, or a competent regulatory authority.',
          ]} />
          <P>All third parties with whom we share data are required to handle your information in compliance with applicable privacy laws. We will never share your business strategy, campaign results, or creative assets with any third party without your explicit written consent.</P>
        </Section>

        <Section title="6. Cross-Border Data Transfers">
          <P>Some of our third-party service providers (such as Microsoft and Google) may process and store data outside of South Africa. In accordance with Section 72 of POPIA, we ensure that any cross-border transfer of personal information occurs only where:</P>
          <Ul items={[
            'The recipient country has adequate data protection laws, or',
            'The recipient is bound by a binding agreement that upholds substantially similar standards to POPIA, or',
            'You have consented to the transfer.',
          ]} />
        </Section>

        <Section title="7. Cookies & Website Tracking">
          <P>Our website uses cookies and similar tracking technologies to improve your browsing experience and understand how visitors use our site. Cookies are small text files stored on your device.</P>
          <P>We use the following types of cookies:</P>
          <Ul items={[
            'Strictly necessary cookies: Required for the website to function (e.g. session management, theme preference). Cannot be disabled.',
            'Analytics cookies: Help us understand visitor behaviour (e.g. pages visited, time on site) using tools like Google Analytics. These use anonymised data.',
            'Preference cookies: Store your settings (e.g. dark/light mode) across sessions.',
          ]} />
          <P>You may disable non-essential cookies via your browser settings. Note that disabling cookies may affect certain website features. By continuing to use our website, you consent to our use of strictly necessary cookies.</P>
        </Section>

        <Section title="8. Data Retention">
          <P>We retain personal information only for as long as necessary to fulfil the purpose for which it was collected, or as required by South African law:</P>
          <Ul items={[
            'Client account data: Retained for the duration of the service relationship and 5 years thereafter, as required by the Companies Act and SARS regulations.',
            'Payment records: Retained for 5 years in compliance with tax obligations.',
            'Strategy call notes and creative briefs: Retained for the duration of the engagement and 2 years thereafter.',
            'Website analytics data: Retained for up to 26 months in anonymised form.',
            'Marketing consent records: Retained until consent is withdrawn and for 3 years thereafter.',
          ]} />
          <P>Upon expiry of the retention period, personal information will be securely deleted or anonymised.</P>
        </Section>

        <Section title="9. Security Safeguards">
          <P>AdSprint implements appropriate technical and organisational measures to protect your personal information against unauthorised access, disclosure, alteration, or destruction. These include:</P>
          <Ul items={[
            '256-bit SSL/TLS encryption for all data transmitted via our website.',
            'Secure payment processing via PayFast (PCI-DSS Level 1 compliant).',
            'Access controls limiting staff access to personal data on a need-to-know basis.',
            'Regular security assessments and software updates.',
            'Secure cloud storage with access logging.',
          ]} />
          <P>In the event of a data breach that is likely to result in harm to you, we will notify the Information Regulator and affected data subjects within the timeframes prescribed by POPIA.</P>
        </Section>

        <Section title="10. Your Rights as a Data Subject (POPIA)">
          <P>Under POPIA, you have the following rights regarding your personal information:</P>
          <Ul items={[
            'Right to access: You may request a copy of all personal information we hold about you.',
            'Right to correction: You may request that inaccurate or incomplete information be corrected.',
            'Right to deletion: You may request that we delete your personal information, subject to our legal retention obligations.',
            'Right to object: You may object to the processing of your personal information for direct marketing at any time.',
            'Right to restriction: You may request that we restrict the processing of your information in certain circumstances.',
            'Right to data portability: You may request that we provide your information in a structured, machine-readable format.',
            'Right to lodge a complaint: You may lodge a complaint with the Information Regulator of South Africa.',
          ]} />
          <P>To exercise any of these rights, submit a written request to <a href="mailto:privacy@adsprint.co.za" style={{ color: 'var(--green)', textDecoration: 'none' }}>privacy@adsprint.co.za</a>. We will respond within 30 days as required by POPIA. We may require you to verify your identity before processing your request.</P>
        </Section>

        <Section title="11. Direct Marketing">
          <P>AdSprint will only send you marketing communications if you have expressly opted in to receive them. Each marketing email will include a clear and easy unsubscribe mechanism.</P>
          <P>You may withdraw your marketing consent at any time by:</P>
          <Ul items={[
            'Clicking the "Unsubscribe" link in any marketing email.',
            'Sending a written request to privacy@adsprint.co.za.',
          ]} />
          <P>Withdrawal of marketing consent does not affect service-related communications, which we are obligated to send as part of your service agreement.</P>
        </Section>

        <Section title="12. Information Regulator">
          <P>If you believe AdSprint has violated your privacy rights under POPIA and we have been unable to resolve your complaint satisfactorily, you have the right to lodge a complaint with the Information Regulator of South Africa:</P>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', padding: '20px 24px' }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '10px' }}>Information Regulator (South Africa)</p>
            <p>Website: <a href="https://inforegulator.org.za" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--green)', textDecoration: 'none' }}>inforegulator.org.za</a></p>
            <p>Email: <a href="mailto:inforeg@justice.gov.za" style={{ color: 'var(--green)', textDecoration: 'none' }}>inforeg@justice.gov.za</a></p>
            <p>Tel: 010 023 5207</p>
            <p>Physical: JD House, 27 Stiemens Street, Braamfontein, Johannesburg, 2001</p>
          </div>
        </Section>

        <Section title="13. Children's Privacy">
          <P>Our services are intended for businesses and individuals aged 18 years and older. We do not knowingly collect personal information from persons under the age of 18. If you believe a minor has provided us with personal information, please contact us immediately and we will delete it.</P>
        </Section>

        <Section title="14. Changes to This Policy">
          <P>AdSprint may update this Privacy Policy from time to time to reflect changes in law, technology, or our business practices. We will notify you of material changes via email or a prominent notice on our website at least 14 days before they take effect.</P>
          <P>The "Last updated" date at the top of this policy reflects when it was most recently revised. We encourage you to review this policy periodically.</P>
        </Section>

        <Section title="15. Contact Us">
          <P>For any privacy-related queries, access requests, or to exercise your POPIA rights:</P>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', padding: '20px 24px' }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '10px' }}>AdSprint — Information Officer</p>
            <p>Name: John Doe</p>
            <p>Email: <a href="mailto:privacy@adsprint.co.za" style={{ color: 'var(--green)', textDecoration: 'none' }}>privacy@adsprint.co.za</a></p>
            <p>Johannesburg, Gauteng, Republic of South Africa</p>
          </div>
          <P>We aim to acknowledge all privacy requests within 3 business days and resolve them within 30 days.</P>
        </Section>

        {/* Footer nav */}
        <div style={{ paddingTop: '40px', borderTop: '1px solid var(--border)', display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', fontWeight: 300 }}>
            © {new Date().getFullYear()} AdSprint. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            <Link href="/terms" style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--green)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-tertiary)'}
            >Terms of Service</Link>
            <Link href="/" style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--green)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-tertiary)'}
            >Home</Link>
          </div>
        </div>

      </div>
    </div>
  )
}