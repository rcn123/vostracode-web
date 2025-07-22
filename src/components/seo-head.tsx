import Head from 'next/head'

interface SEOHeadProps {
  title: string
  description: string
  canonical?: string
  ogImage?: string
  ogType?: string
  twitterCard?: string
  keywords?: string[]
  structuredData?: object
}

export function SEOHead({
  title,
  description,
  canonical,
  ogImage = '/dark-project-app-screenshot.png',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  keywords = [],
  structuredData,
}: SEOHeadProps) {
  const fullTitle = title.includes('VostraCode') ? title : `${title} - VostraCode`
  const fullCanonical = canonical || `https://vostracode.com${canonical || ''}`

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      <link rel="canonical" href={fullCanonical} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={`https://vostracode.com${ogImage}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="VostraCode" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`https://vostracode.com${ogImage}`} />
      <meta name="twitter:creator" content="@vostraai" />

      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      )}

      {/* Additional Meta Tags */}
      <meta name="author" content="Vostra AI" />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
    </Head>
  )
} 