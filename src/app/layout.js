import './globals.css'
import Script from "next/script";

export const metadata = {
  title: 'AdSprint — Turn Attention Into Customers',
  description: 'High-converting motion ads that help businesses attract, engage and convert.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
       <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=AW-10978293447"
      />

      <Script id="google-ads">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'AW-10978293447');
        `}
      </Script>
    </html>
  )
}
