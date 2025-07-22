import '@/styles/tailwind.css'
import type { Metadata } from 'next'
import GoogleAnalytics from '@/components/google-analytics'

export const metadata: Metadata = {
  title: {
    template: '%s - Vostra AI',
    default: 'VostraCode - AI Coding Assistant | On-Premise & Secure',
  },
  description: 'VostraCode is your AI-powered coding assistant built security-first for on-premise deployment. Get context-aware code suggestions, refactoring, and debugging while keeping your codebase private and secure.',
  keywords: ['AI coding assistant', 'on-premise AI', 'secure coding', 'privacy-first AI', 'enterprise AI', 'VostraCode', 'Vostra AI'],
  authors: [{ name: 'Vostra AI' }],
  creator: 'Vostra AI',
  publisher: 'Vostra AI',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vostracode.com',
    siteName: 'VostraCode',
    title: 'VostraCode - AI Coding Assistant | On-Premise & Secure',
    description: 'VostraCode is your AI-powered coding assistant built security-first for on-premise deployment.',
    images: [
      {
        url: '/dark-project-app-screenshot.png',
        width: 1200,
        height: 630,
        alt: 'VostraCode AI Coding Assistant Interface',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VostraCode - AI Coding Assistant | On-Premise & Secure',
    description: 'VostraCode is your AI-powered coding assistant built security-first for on-premise deployment.',
    images: ['/dark-project-app-screenshot.png'],
    creator: '@vostraai',
  },
  alternates: {
    canonical: 'https://vostracode.com',
  },
  other: {
    'application-name': 'VostraCode',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'VostraCode',
    'format-detection': 'telephone=no',
    'mobile-web-app-capable': 'yes',
    'msapplication-config': '/browserconfig.xml',
    'msapplication-TileColor': '#000000',
    'msapplication-tap-highlight': 'no',
    'theme-color': '#000000',
    'viewport': 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
                <link
          rel="stylesheet"
          href="https://api.fontshare.com/css?f%5B%5D=switzer@400,500,600,700&amp;display=swap"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        {/* <link
          rel="alternate"
          type="application/rss+xml"
          title="The Vostra AI Blog"
          href="/blog/feed.xml"
        /> */}
        </head>
      <body className="text-gray-950 antialiased">
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  )
}
