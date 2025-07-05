import '@/styles/tailwind.css'
import type { Metadata } from 'next'
import GoogleAnalytics from '@/components/google-analytics'

export const metadata: Metadata = {
  title: {
    template: '%s - Vostra AI',
    default: 'Your Data. Your Control. Your AI.',
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
