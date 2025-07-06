import { Navbar } from "@/components/navbar";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { Gradient } from "@/components/gradient";
import { type SanityDocument } from "next-sanity";
import { PortableText } from "@portabletext/react";
import { client } from "@/sanity/client";
import Image from "next/image";
import { Fragment } from 'react';
import { CheckIcon, MinusIcon } from '@heroicons/react/20/solid';

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

type TierFeatureSection = SanityDocument & {
  title: string;
  tierFeatures?: Array<{
    title: string;
    values: string;
  }>;
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

const TIER_FEATURE_SECTION_QUERY = `*[_type == "tierFeatureSection"]{
  _id,
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
      <Gradient className="absolute inset-2 bottom-0 rounded-4xl ring-1 ring-black/5 ring-inset" />
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
            alt="VostraCode Product Screenshot"
            src="/dark-project-app-screenshot.png"
            width={800}
            height={600}
            className="w-3xl max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-228"
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
  if (!startPage?.tierCards || !Array.isArray(startPage.tierCards) || startPage.tierCards.length === 0) {
    return null;
  }

  // Transform Sanity data to match the new tier structure
  const tiers = startPage.tierCards.map((tier: unknown, index: number) => {
    const tierData = tier as { header?: string; subHeader?: string; features?: Array<{ text: string; checked?: boolean }> };
    return {
      name: tierData.header || `Tier ${index + 1}`,
      id: `tier-${index}`,
      href: '#',
      priceMonthly: tierData.subHeader || 'Contact us',
      mostPopular: index === 1, // Make the second tier most popular
    };
  });

  // Create sections from features
  const sections = [
    {
      name: 'Features',
      features: startPage.tierCards.map((tier: unknown, tierIndex: number) => {
        const tierData = tier as { header?: string; features?: Array<{ text: string; checked?: boolean }> };
        const tierName = tierData.header || `Tier ${tierIndex + 1}`;
        return tierData.features?.map((feature) => ({
          name: feature.text,
          tiers: {
            [tierName]: feature.checked ? true : false
          }
        })) || [];
      }).flat()
    }
  ];

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base/7 font-semibold text-indigo-600">Pricing</h2>
          <p className="mt-2 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl">
            Pricing that grows with you
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-gray-600 sm:text-xl/8">
          Choose an affordable plan that&apos;s packed with the best features for engaging your audience, creating customer
          loyalty, and driving sales.
        </p>

        {/* xs to lg */}
        <div className="mx-auto mt-12 max-w-md space-y-8 sm:mt-16 lg:hidden">
          {tiers.map((tier) => (
            <section
              key={tier.id}
              className={`${tier.mostPopular ? 'rounded-xl bg-gray-400/5 ring-1 ring-gray-200 ring-inset' : ''} p-8`}
            >
              <h3 id={tier.id} className="text-sm/6 font-semibold text-gray-900">
                {tier.name}
              </h3>
              <p className="mt-2 flex items-baseline gap-x-1 text-gray-900">
                <span className="text-4xl font-semibold">{tier.priceMonthly}</span>
                <span className="text-sm font-semibold">/month</span>
              </p>
              <a
                href={tier.href}
                aria-describedby={tier.id}
                className={`${tier.mostPopular
                    ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                    : 'text-indigo-600 ring-1 ring-indigo-200 ring-inset hover:ring-indigo-300'} mt-8 block rounded-md px-3 py-2 text-center text-sm/6 font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              >
                Buy plan
              </a>
              <ul role="list" className="mt-10 space-y-4 text-sm/6 text-gray-900">
                {sections.map((section) => (
                  <li key={section.name}>
                    <ul role="list" className="space-y-4">
                      {section.features.map((feature) =>
                        feature.tiers[tier.name] ? (
                          <li key={feature.name} className="flex gap-x-3">
                            <CheckIcon aria-hidden="true" className="h-6 w-5 flex-none text-indigo-600" />
                            <span>
                              {feature.name}{' '}
                              {typeof feature.tiers[tier.name] === 'string' ? (
                                <span className="text-sm/6 text-gray-500">({feature.tiers[tier.name]})</span>
                              ) : null}
                            </span>
                          </li>
                        ) : null,
                      )}
                    </ul>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* lg+ */}
        <div className="isolate mt-20 hidden lg:block">
          <div className="relative -mx-8">
            {tiers.some((tier) => tier.mostPopular) ? (
              <div className="absolute inset-x-4 inset-y-0 -z-10 flex">
                <div
                  style={{ marginLeft: `${(tiers.findIndex((tier) => tier.mostPopular) + 1) * 25}%` }}
                  aria-hidden="true"
                  className="flex w-1/4 px-4"
                >
                  <div className="w-full rounded-t-xl border-x border-t border-gray-900/10 bg-gray-400/5" />
                </div>
              </div>
            ) : null}
            <table className="w-full table-fixed border-separate border-spacing-x-8 text-left">
              <caption className="sr-only">Pricing plan comparison</caption>
              <colgroup>
                <col className="w-1/4" />
                <col className="w-1/4" />
                <col className="w-1/4" />
                <col className="w-1/4" />
              </colgroup>
              <thead>
                <tr>
                  <td />
                  {tiers.map((tier) => (
                    <th key={tier.id} scope="col" className="px-6 pt-6 xl:px-8 xl:pt-8">
                      <div className="text-sm/7 font-semibold text-gray-900">{tier.name}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">
                    <span className="sr-only">Price</span>
                  </th>
                  {tiers.map((tier) => (
                    <td key={tier.id} className="px-6 pt-2 xl:px-8">
                      <div className="flex items-baseline gap-x-1 text-gray-900">
                        <span className="text-4xl font-semibold">{tier.priceMonthly}</span>
                        <span className="text-sm/6 font-semibold">/month</span>
                      </div>
                      <a
                        href={tier.href}
                        className={`${tier.mostPopular
                            ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                            : 'text-indigo-600 ring-1 ring-indigo-200 ring-inset hover:ring-indigo-300'} mt-8 block rounded-md px-3 py-2 text-center text-sm/6 font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                      >
                        Buy plan
                      </a>
                    </td>
                  ))}
                </tr>
                {sections.map((section, sectionIdx) => (
                  <Fragment key={section.name}>
                    <tr>
                      <th
                        scope="colgroup"
                        colSpan={4}
                        className={`${sectionIdx === 0 ? 'pt-8' : 'pt-16'} pb-4 text-sm/6 font-semibold text-gray-900`}
                      >
                        {section.name}
                        <div className="absolute inset-x-8 mt-4 h-px bg-gray-900/10" />
                      </th>
                    </tr>
                    {section.features.map((feature) => (
                      <tr key={feature.name}>
                        <th scope="row" className="py-4 text-sm/6 font-normal text-gray-900">
                          {feature.name}
                          <div className="absolute inset-x-8 mt-4 h-px bg-gray-900/5" />
                        </th>
                        {tiers.map((tier) => (
                          <td key={tier.id} className="px-6 py-4 xl:px-8">
                            {typeof feature.tiers[tier.name] === 'string' ? (
                              <div className="text-center text-sm/6 text-gray-500">{feature.tiers[tier.name]}</div>
                            ) : (
                              <>
                                {feature.tiers[tier.name] === true ? (
                                  <CheckIcon aria-hidden="true" className="mx-auto size-5 text-indigo-600" />
                                ) : (
                                  <MinusIcon aria-hidden="true" className="mx-auto size-5 text-gray-400" />
                                )}
                              </>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureTable({ tierFeatureSections, startPage }: { tierFeatureSections: TierFeatureSection[]; startPage: StartPage }) {
  if (!tierFeatureSections || !Array.isArray(tierFeatureSections) || tierFeatureSections.length === 0) {
    console.log('No tier feature sections found');
    return null;
  }

  console.log('Feature sections found:', tierFeatureSections.length);
  tierFeatureSections.forEach((section, index) => {
    console.log(`Section ${index}:`, section.title, 'Features:', section.tierFeatures?.length || 0);
  });

  // Get tier names from the tierCards data
  const tierNames = startPage.tierCards?.map((tier: unknown, index: number) => {
    const tierData = tier as { header?: string };
    return tierData.header || `Tier ${index + 1}`;
  }) || [];

  // Helper to parse values string
  function parseValues(values: string): string[] {
    return values.split(';').map(v => v.trim());
  }

  return (
    <div className="bg-white py-24 sm:py-32">
      <Container>
        {tierFeatureSections.map((section, sectionIndex) => (
          <div key={section._id || sectionIndex} className="mb-16">
            <div className="mx-auto max-w-4xl text-center mb-16">
              <h2 className="text-base/7 font-semibold text-indigo-600">Feature Comparison</h2>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
                {section.title || 'Feature Comparison'}
              </p>
            </div>

            {section.tierFeatures && section.tierFeatures.length > 0 ? (
              <>
                {/* Mobile view */}
                <div className="lg:hidden">
                  <div className="space-y-8">
                    {section.tierFeatures.map((feature: { title: string; values: string }, featureIndex: number) => {
                      const values = parseValues(typeof feature.values === 'string' ? feature.values : '');
                      return (
                        <div key={featureIndex} className="bg-gray-50 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">{feature.title}</h3>
                          <div className="space-y-3">
                            {values.map((value: string, valueIndex: number) => (
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
                      );
                    })}
                  </div>
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
                          {tierNames.map((tierName: string, index: number) => (
                            <th key={index} scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                              {tierName}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {section.tierFeatures.map((feature: { title: string; values: string }, featureIndex: number) => {
                          const values = parseValues(typeof feature.values === 'string' ? feature.values : '');
                          return (
                            <tr key={featureIndex} className={featureIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {feature.title}
                              </td>
                              {tierNames.map((_: string, valueIndex: number) => {
                                const value = values[valueIndex];
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
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center text-gray-500">No features found in this section</div>
            )}
          </div>
        ))}
      </Container>
    </div>
  );
}

export default async function PricingPage() { 
  const startPage = await client.fetch<StartPage>(STARTPAGE_QUERY, {}, options);
  const tierFeatureSections = await client.fetch<TierFeatureSection[]>(TIER_FEATURE_SECTION_QUERY, {}, options);
  
  return (
    <main className="min-h-screen">
      <Hero startPage={startPage} />
      <ProductOverview startPage={startPage} />
      <HowItWorks startPage={startPage} /> 
      <TierCards startPage={startPage} />
      {/* DEBUG: Show fetched feature sections as JSON */}
      <pre style={{background:'#eee',padding:'1em',overflow:'auto',fontSize:'0.9em'}}>{JSON.stringify(tierFeatureSections, null, 2)}</pre>
      <FeatureTable tierFeatureSections={tierFeatureSections} startPage={startPage} />
    </main>
  );
} 