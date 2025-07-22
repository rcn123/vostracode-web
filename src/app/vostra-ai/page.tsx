import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { Gradient } from '@/components/gradient'
import { Navbar } from '@/components/navbar'
import { Heading, Lead, Subheading } from '@/components/text'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vostra AI - Privacy-First AI Solutions | On-Premise AI Tools',
  description: 'Vostra AI builds privacy-first AI tools for secure, on-premise environments. Complete data sovereignty with VostraCode, VostraSentinel, VostraCarta, and more. Your data, your control, your AI.',
  keywords: ['privacy-first AI', 'on-premise AI', 'data sovereignty', 'enterprise AI', 'VostraCode', 'VostraSentinel', 'VostraCarta', 'AI security', 'private AI', 'enterprise AI tools'],
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
    url: 'https://vostracode.com/vostra-ai',
    siteName: 'Vostra AI',
    title: 'Vostra AI - Privacy-First AI Solutions | On-Premise AI Tools',
    description: 'Vostra AI builds privacy-first AI tools for secure, on-premise environments. Complete data sovereignty with VostraCode, VostraSentinel, VostraCarta, and more.',
    images: [
      {
        url: '/dark-project-app-screenshot.png',
        width: 1200,
        height: 630,
        alt: 'Vostra AI Product Suite - Privacy-First AI Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vostra AI - Privacy-First AI Solutions | On-Premise AI Tools',
    description: 'Vostra AI builds privacy-first AI tools for secure, on-premise environments. Your data, your control, your AI.',
    images: ['/dark-project-app-screenshot.png'],
    creator: '@vostraai',
  },
  alternates: {
    canonical: 'https://vostracode.com/vostra-ai',
  },
  other: {
    'application-name': 'Vostra AI',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Vostra AI',
    'format-detection': 'telephone=no',
    'mobile-web-app-capable': 'yes',
    'msapplication-config': '/browserconfig.xml',
    'msapplication-TileColor': '#000000',
    'msapplication-tap-highlight': 'no',
    'theme-color': '#000000',
  },
};

// Structured Data for Organization and Product Suite
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Vostra AI",
  "url": "https://vostracode.com",
  "logo": "https://vostracode.com/vostracode-logo.svg",
  "description": "Privacy-first AI solutions for secure, on-premise environments",
  "sameAs": [
    "https://twitter.com/vostraai"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Vostra AI Product Suite",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "SoftwareApplication",
          "name": "VostraCode",
          "description": "AI-powered coding assistant for secure, on-premise deployment"
        }
      },
      {
        "@type": "Offer", 
        "itemOffered": {
          "@type": "SoftwareApplication",
          "name": "VostraSentinel",
          "description": "AI-powered support chat agent for 24/7 incident response"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "SoftwareApplication", 
          "name": "VostraCarta",
          "description": "AI-assisted chatbot for internal documentation and knowledge management"
        }
      }
    ]
  }
};



function ProductCard({ 
  name, 
  description, 
  features = [],
  icon, 
  status = "Available" 
}: { 
  name: string
  description: string
  features?: string[]
  icon: string
  status?: string
}) {
  return (
    <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
      <div className="flex items-start justify-between mb-6">
        <div className="text-4xl">{icon}</div>
        <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
          {status}
        </span>
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
        {name}
      </h3>
      
      <div className="text-gray-600 leading-relaxed text-lg mb-6 flex-grow">
        <p>{description}</p>
      </div>

      {features.length > 0 && (
        <div className="mt-auto">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Key Features:</h4>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start text-sm text-gray-600">
                <span className="text-blue-500 mr-2 mt-1">•</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

function ProductSuite() {
  return (
    <Container className="mt-32">
      <div className="text-center mb-16">
        <Heading as="h2" className="mt-4 text-5xl lg:text-6xl">
          Product Suite
        </Heading> 
        <Lead className="mt-8 max-w-4xl mx-auto text-xl leading-relaxed">
          Vostra is the Italian word for &ldquo;Your&rdquo; - and that&apos;s exactly what we believe AI should be. 
          At Vostra AI, we build privacy-first AI tools for secure, on-prem environments. With no external dependencies, 
          complete data sovereignty, and full control over deployment, your AI runs where it belongs — in your own infrastructure.
        </Lead>

        <Lead className="mt-8 max-w-3xl mx-auto text-xl">
          VostraCode is just the beginning — the first release in a growing suite of on-prem AI tools designed to boost productivity, 
          simplify internal workflows, and keep your organization competitive, while keeping full data integrity and operational independence.
        </Lead>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <ProductCard
          name="VostraCode"
          description="VostraCode is an AI-powered coding assistant that helps developers write, refactor, and understand code directly inside their existing development tools. It provides real-time completions, code explanations, and suggestions — without sending any code or data externally."
          features={[
            "Real-time code completions",
            "Code refactoring assistance", 
            "Multi-file operations",
            "Command-line interface",
            "Automated code reviewer",
            "CI/CD pipeline integration"
          ]}
          icon="💻"
          status="Available"
        />

        <ProductCard
          name="VostraSentinel"
          description="A support chat assistant for First Line Support and interactive users manual. The AI combines users input with internal application data, such as logs and system information."
          features={[
            "First Line Support chat assistant",
            "Interactive users manual",
            "Internal application data integration",
            "Automatic bug ticket creation",
            "Self-healing capabilities",
            "Early anomaly detection"
          ]}
          icon="🛡️"
          status="Coming Soon"
        />

        <ProductCard
          name="VostraGPT"
          description="A private, self-hosted chat assistant. Supports working with documents outside of the chat and local reasoning. Used for drafting policies, reports, and internal documents or just the next after work."
          features={[
            "Private, self-hosted chat",
            "Document processing capabilities",
            "Local reasoning engine",
            "Policy and report drafting",
            "Internal document creation",
            "RAG-style document search"
          ]}
          icon="🤖"
          status="Coming Soon"
        />
      </div>

      <div className="mt-20 text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-12">
        <h3 className="text-3xl font-bold text-gray-900 mb-6">
          Built for Your Infrastructure
        </h3>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Each product is built to work seamlessly with the others — sharing context, data, and local models — 
          so you get the power of an AI platform, not just isolated tools.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-lg font-medium text-gray-700">
          <span className="bg-white px-4 py-2 rounded-full shadow-sm">GPU Infrastructure</span>
          <span className="bg-white px-4 py-2 rounded-full shadow-sm">Real Security</span>
          <span className="bg-white px-4 py-2 rounded-full shadow-sm">AI Integration</span>
        </div>
      </div>

      <div className="mt-16 text-center">
        <p className="text-2xl font-bold text-gray-900">
          Vostra AI — all data stays yours.
        </p>
      </div>
    </Container>
  )
}

function Features() {
  return (
    <Container className="mt-32">
      <div className="text-center mb-16">
        <Subheading className="text-blue-600 font-semibold">Why Vostra AI</Subheading>
        <Heading as="h2" className="mt-4 text-5xl lg:text-6xl">
          Privacy-First AI Solutions
        </Heading>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">🔒</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Complete Privacy</h3>
          <p className="text-gray-600 text-lg leading-relaxed">
            Your data never leaves your infrastructure. No cloud dependencies, no external APIs, 
            complete control over your AI deployment.
          </p>
        </div>

        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">⚡</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">High Performance</h3>
          <p className="text-gray-600 text-lg leading-relaxed">
            Optimized for your GPU infrastructure with local model deployment for 
            lightning-fast responses and real-time processing.
          </p>
        </div>

        <div className="text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">🔗</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Seamless Integration</h3>
          <p className="text-gray-600 text-lg leading-relaxed">
            All products work together, sharing context and data to provide a unified 
            AI experience across your entire organization.
          </p>
        </div>
      </div>
    </Container>
  )
}

export default function VostraAI() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <main className="min-h-screen">
        <div className="relative">
          {/* Gradient layer (bottom) */}
          <Gradient className="absolute inset-2 bottom-0 rounded-4xl ring-1 ring-black/5 ring-inset" />
          
          {/* Background image layer (on top of gradient) */}
          <div 
            className="absolute inset-2 bottom-0 bg-cover bg-center bg-no-repeat opacity-80 rounded-4xl"
            style={{
              backgroundImage: 'url(/images/hero/hero-white-vostra-code_tran9.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          
          {/* Content layer */}
          <Container className="relative">
            <Navbar />
            <div className="pt-16 pb-24 sm:pt-24 sm:pb-32 md:pt-32 md:pb-48">
              <div>
                <h1 className="font-display text-6xl/[0.9] font-medium tracking-tight text-balance text-gray-950 sm:text-8xl/[0.8] md:text-9xl/[0.8]">
                  Vostra AI
                </h1>
                <p className="mt-8 max-w-2xl text-xl/7 font-medium text-gray-950/75 sm:text-2xl/8 whitespace-nowrap">
                  Your Data. Your Control. Your AI.
                </p>
              </div>

              <div className="mt-20 text-center">
                <Button href="#" className="text-lg px-8 py-4">
                  Get Started
                </Button>
              </div>
            </div>
          </Container>
        </div>
        <ProductSuite />
        <Features />
        <Footer />
      </main>
    </>
  )
} 