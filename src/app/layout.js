import './globals.css'

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
    </html>
  )
}
