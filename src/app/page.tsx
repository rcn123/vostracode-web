import { Navbar } from "@/components/navbar";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { Gradient } from "@/components/gradient";
import { type SanityDocument } from "next-sanity";
import { PortableText } from "@portabletext/react";
import { client } from "@/sanity/client";
import Image from "next/image";
import { CheckIcon, MinusIcon } from '@heroicons/react/20/solid';
import React from "react"; // Added missing import for React
import type { Metadata } from 'next';

// Post type removed since it's no longer used

type StartPage = SanityDocument & {
  logoTitle: string;
  title: string;
  subtitle: string;
  productOverviewTitle?: string;
  productOverview?: unknown[]; // PortableText requires this to be any
  howItWorksTitle?: string;
  howItWorks?: unknown[]; // PortableText requires this to be any
  tierCards?: unknown[];
};

type TierFeatureGroup = SanityDocument & {
  order: number;
  title: string;
  tierFeatures?: Array<{
    title: string;
    values: string;
  }>;
};

// SEO Metadata
export const metadata: Metadata = {
  title: 'VostraCode - AI Coding Assistant | On-Premise & Secure',
  description: 'VostraCode is your AI-powered coding assistant built security-first for on-premise deployment. Get context-aware code suggestions, refactoring, and debugging while keeping your codebase private and secure.',
  keywords: ['AI coding assistant', 'on-premise AI', 'secure coding', 'code suggestions', 'refactoring', 'debugging', 'privacy-first AI', 'enterprise AI'],
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
    description: 'VostraCode is your AI-powered coding assistant built security-first for on-premise deployment. Get context-aware code suggestions, refactoring, and debugging while keeping your codebase private and secure.',
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
  },
};

// Structured Data for Organization
const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "VostraCode",
  "description": "AI-powered coding assistant built security-first for on-premise deployment",
  "url": "https://vostracode.com",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Cross-platform",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "author": {
    "@type": "Organization",
    "name": "Vostra AI",
    "url": "https://vostracode.com"
  },
  "featureList": [
    "Context-aware code suggestions",
    "Code refactoring assistance", 
    "Debugging support",
    "On-premise deployment",
    "Privacy-first design",
    "Enterprise security"
  ]
};
 
const STARTPAGE_QUERY = `*[_type == "startPage"][0]{
  _id,
  logoTitle,
  title,
  subtitle,
  productOverviewTitle,
  productOverview,
  howItWorksTitle,
  howItWorks,
  tierCards[]->
}`;

const TIER_FEATURE_GROUP_QUERY = `*[_type == "tierFeatureGroup"]|order(order asc){
  _id,
  order,
  title,
  tierFeatures[]{
    title,
    values
  }
}`;

const options = { next: { revalidate: 30 } };
 

function Hero({ startPage }: { startPage: StartPage }) {
  return (
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
          <h1 className="font-display text-6xl/[0.9] font-medium tracking-tight text-balance text-gray-950 sm:text-8xl/[0.8] md:text-9xl/[0.8]">
            {startPage?.title}
          </h1>
          <p className="mt-8 max-w-2xl text-xl/7 font-medium text-gray-950/75 sm:text-2xl/8 whitespace-nowrap">
            {startPage?.subtitle}
          </p>
          <div className="mt-12 flex flex-col gap-x-6 gap-y-4 sm:flex-row">
            <Button href="#">Get started</Button>
            <Button variant="secondary" href="/tiers">
              See pricing
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}

function ProductOverview({ startPage }: { startPage: StartPage }) {
  if (!startPage?.productOverview || !Array.isArray(startPage.productOverview) || startPage.productOverview.length === 0) {
    return null;
  }

  return (
    <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          aria-hidden="true"
          className="absolute top-0 left-[max(50%,25rem)] h-256 w-512 -translate-x-1/2 mask-[radial-gradient(64rem_64rem_at_top,white,transparent)] stroke-gray-200"
        >
          <defs>
            <pattern
              x="50%"
              y={-1}
              id="e813992c-7d03-4cc4-a2bd-151760b470a0"
              width={200}
              height={200}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" width="100%" height="100%" strokeWidth={0} />
        </svg>
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <p className="text-base/7 font-semibold text-indigo-600">Product Overview</p>
              <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                {startPage.productOverviewTitle || 'Product Overview'}
              </h1>
              <div className="mt-6 text-base/7 text-gray-700">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                <PortableText value={startPage.productOverview as any} />
              </div>
            </div>
          </div>
        </div>
        <div className="-mt-12 -ml-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <Image
            alt="VostraCode AI Coding Assistant Interface - Dark theme showing code suggestions and AI-powered features"
            src="/dark-project-app-screenshot.png"
            width={800}
            height={600}
            className="w-3xl max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-228"
            priority
          />
        </div>

      </div>
    </div>
  )
}

function HowItWorks({ startPage }: { startPage: StartPage }) {
  if (!startPage?.howItWorks || !Array.isArray(startPage.howItWorks) || startPage.howItWorks.length === 0) {
    return null;
  }

  return (
    <div className="py-24 bg-gray-50">
      <Container>
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-4xl font-medium tracking-tight text-gray-950 mb-8">
            {startPage.howItWorksTitle || 'How It Works'}
          </h2>
          <div className="prose prose-lg text-gray-950/75">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <PortableText value={startPage.howItWorks as any} />
          </div>
        </div>
      </Container>
    </div>
  )
}

function TierCards({ startPage }: { startPage: StartPage }) {
  return (
    <div className="relative py-24">
      <Gradient className="absolute inset-x-2 top-48 bottom-0 rounded-4xl ring-1 ring-black/5 ring-inset" />
      <Container className="relative">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {startPage.tierCards?.map((tier, tierIndex) => (
            <TierCard key={tierIndex} tier={tier} />
          ))}
        </div>        
      </Container>
    </div>
  )
}

function TierCard({ tier }: { tier: unknown }) {
  const tierData = tier as { header?: string; subHeader?: string; features?: Array<{ text: string }> };
  
  return (
    <div className="-m-2 grid grid-cols-1 rounded-4xl shadow-[inset_0_0_2px_1px_#ffffff4d] ring-1 ring-black/5 max-lg:mx-auto max-lg:w-full max-lg:max-w-md">
      <div className="grid grid-cols-1 rounded-4xl p-2 shadow-md shadow-black/5">
        <div className="rounded-3xl bg-white p-10 pb-9 shadow-2xl ring-1 ring-black/5">
          <h3 className="text-xl font-semibold text-gray-950">{tierData.header}</h3>
          <p className="mt-2 text-sm/6 text-gray-950/75">{tierData.subHeader}</p>
          <div className="mt-8">
            <h3 className="text-sm/6 font-medium text-gray-950">
              Features
            </h3>
            <ul className="mt-3 space-y-3">
              {tierData.features?.map((feature, featureIndex: number) => (
                <FeatureItem key={featureIndex} description={feature.text} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function FeatureItem({
  description, 
}: {
  description: string
  disabled?: boolean
}) {
  return (
    <li
      className="flex items-start gap-4 text-sm/6 text-gray-950/75"
    >
      <span className="inline-flex h-6 items-center">
        <PlusIcon className="size-3.75 shrink-0 fill-gray-950/25" />
      </span>
      {description}
    </li>
  )
}

function PlusIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 15 15" aria-hidden="true" {...props}>
      <path clipRule="evenodd" d="M8 0H7v7H0v1h7v7h1V8h7V7H8V0z" />
    </svg>
  )
}

function FeatureTable({ tierFeatureGroups, startPage }: { tierFeatureGroups: TierFeatureGroup[]; startPage: StartPage }) {
  if (!tierFeatureGroups || !Array.isArray(tierFeatureGroups) || tierFeatureGroups.length === 0) {
    return null;
  }

  // Get tier names from the tierCards data
  const tierNames = startPage.tierCards?.map((tier: unknown, index: number) => {
    const tierData = tier as { header?: string };
    return tierData.header || `Tier ${index + 1}`;
  }) || [];

  // Helper to parse values string
  function parseValues(values: string): string[] {
    return values.split(';').map(v => v.trim());
  }

  // Prepare grouped features by group
  const groupedGroups = tierFeatureGroups.map(group => ({
    groupTitle: group.title,
    features: (group.tierFeatures || []).map(feature => ({
      featureTitle: feature.title,
      values: parseValues(typeof feature.values === 'string' ? feature.values : ''),
    })),
  }));

  // If no features at all, return null
  if (groupedGroups.every(group => group.features.length === 0)) {
    return null;
  }

  return (
    <div className="bg-white py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-4xl text-center mb-16">
          <h2 className="text-base/7 font-semibold text-indigo-600">Feature Comparison</h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
            Complete Feature Overview
          </p>
        </div>

        {/* Desktop view */}
        <div className="hidden lg:block">
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Feature
                  </th>
                  {tierNames.map((tierName, index) => (
                    <th key={index} scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {tierName}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {groupedGroups.map((group, groupIdx) => (
                  <React.Fragment key={group.groupTitle || groupIdx}>
                    {/* Group header row */}
                    <tr>
                      <th colSpan={tierNames.length + 1} className="bg-gray-50 px-6 py-4 text-left text-base font-semibold text-gray-900">
                        {group.groupTitle}
                      </th>
                    </tr>
                    {/* Feature rows */}
                    {group.features.map((feature, featureIndex) => (
                      <tr key={feature.featureTitle || featureIndex}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {feature.featureTitle}
                        </td>
                        {tierNames.map((_, valueIndex) => {
                          const value = feature.values[valueIndex];
                          return (
                            <td key={valueIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                              {value === 'true' ? (
                                <CheckIcon className="h-5 w-5 text-green-600 mx-auto" />
                              ) : value === 'false' ? (
                                <MinusIcon className="h-5 w-5 text-gray-400 mx-auto" />
                              ) : (
                                <span>{value}</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile view (ungrouped, for simplicity) */}
        <div className="lg:hidden">
          <div className="space-y-8">
            {groupedGroups.map((group, groupIdx) => (
              <div key={group.groupTitle || groupIdx}>
                <div className="text-base font-semibold text-gray-900 bg-gray-50 rounded-t-lg px-4 py-2 mb-2">
                  {group.groupTitle}
                </div>
                {group.features.map((feature, featureIndex) => (
                  <div key={feature.featureTitle || featureIndex} className="bg-gray-50 rounded-b-lg p-6 mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{feature.featureTitle}</h3>
                    <div className="space-y-3">
                      {feature.values.map((value, valueIndex) => (
                        <div key={valueIndex} className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-600">{tierNames[valueIndex] || `Tier ${valueIndex + 1}`}</span>
                          <div className="text-sm text-gray-900">
                            {value === 'true' ? (
                              <CheckIcon className="h-5 w-5 text-green-600" />
                            ) : value === 'false' ? (
                              <MinusIcon className="h-5 w-5 text-gray-400" />
                            ) : (
                              <span>{value}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
 

export default async function Home() { 
  const startPage = await client.fetch<StartPage>(STARTPAGE_QUERY, {}, options);
  const tierFeatureGroups = await client.fetch<TierFeatureGroup[]>(TIER_FEATURE_GROUP_QUERY, {}, options);
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <main className="min-h-screen">
        <Hero startPage={startPage} />
        <ProductOverview startPage={startPage} />
        <HowItWorks startPage={startPage} /> 
        <TierCards startPage={startPage} />
        <FeatureTable tierFeatureGroups={tierFeatureGroups} startPage={startPage} />
      </main>
    </>
  )
}