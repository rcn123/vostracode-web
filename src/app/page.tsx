import { Navbar } from "@/components/navbar";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { Gradient } from "@/components/gradient";
import { type SanityDocument } from "next-sanity";
import { PortableText } from "@portabletext/react";
import { client } from "@/sanity/client";

type Post = SanityDocument & {
  title: string;
  slug: { current: string };
  publishedAt: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any; // PortableText requires this to be any
};

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...6]{_id, title, slug, publishedAt, body}`;

const options = { next: { revalidate: 30 } };

const tiers = [
  {
    name: 'VostraCode Base' as const,
    slug: 'base',
    description: 'Secure, production-ready on-prem AI coding assistant.',
    href: '#',
    highlights: [
      { description: 'SSO/SAML Integration' },
      { description: 'Role-based access control' },
      { description: 'Kubernetes-ready deployment' },
      { description: 'Plugin support for VS Code & IntelliJ' },
      { description: 'Web-based admin interface' },
      { description: 'Audit logging' },
      { description: 'Up to 250 users (max 1 organization)' },
    ],
  },
  {
    name: 'VostraCode Plus' as const,
    slug: 'growth',
    description: 'All the extras for your growing team.',
    href: '#',
    highlights: [
      { description: 'All features in Base Edition' },
      { description: 'Support for hot switching and Multi-model & multilingual support' },
      { description: 'Repository aware suggestions' },
    ],
  },
  {
    name: 'VostraCode Premium' as const,
    slug: 'premium',
    description: 'All the extras for your growing team.',
    href: '#',
    highlights: [
      { description: 'Unlimited active team members' },
      { description: 'Prompt engineering from UI' },
      { description: 'Rapid protocol client-server communication' },
      { description: 'Plugin server for supported IDEs' },
    ],
  },
]

function Hero() {
  return (
    <div className="relative">
      <Gradient className="absolute inset-2 bottom-0 rounded-4xl ring-1 ring-black/5 ring-inset" />
      <Container className="relative">
        <Navbar />
        <div className="pt-16 pb-24 sm:pt-24 sm:pb-32 md:pt-32 md:pb-48">
          <h1 className="font-display text-6xl/[0.9] font-medium tracking-tight text-balance text-gray-950 sm:text-8xl/[0.8] md:text-9xl/[0.8]">
            VostraCode
          </h1>
          <p className="mt-8 max-w-2xl text-xl/7 font-medium text-gray-950/75 sm:text-2xl/8 whitespace-nowrap">
            AI Coding Assistance - Built Security First - On-Prem by Default
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

function PricingCards() {
  return (
    <div className="relative py-24">
      <Gradient className="absolute inset-x-2 top-48 bottom-0 rounded-4xl ring-1 ring-black/5 ring-inset" />
      <Container className="relative">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {tiers.map((tier, tierIndex) => (
            <PricingCard key={tierIndex} tier={tier} />
          ))}
        </div>        
      </Container>
    </div>
  )
}

function PricingCard({ tier }: { tier: (typeof tiers)[number] }) {
  return (
    <div className="-m-2 grid grid-cols-1 rounded-4xl shadow-[inset_0_0_2px_1px_#ffffff4d] ring-1 ring-black/5 max-lg:mx-auto max-lg:w-full max-lg:max-w-md">
      <div className="grid grid-cols-1 rounded-4xl p-2 shadow-md shadow-black/5">
        <div className="rounded-3xl bg-white p-10 pb-9 shadow-2xl ring-1 ring-black/5">
          <h3 className="text-xl font-semibold text-gray-950">{tier.name}</h3>
          <p className="mt-2 text-sm/6 text-gray-950/75">{tier.description}</p>
          <div className="mt-8">
            <Button href={tier.href}>Start a free trial</Button>
          </div>
          <div className="mt-8">
            <h3 className="text-sm/6 font-medium text-gray-950">
              Start selling with:
            </h3>
            <ul className="mt-3 space-y-3">
              {tier.highlights.map((props, featureIndex) => (
                <FeatureItem key={featureIndex} {...props} />
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

function PostsSection({ posts }: { posts: Post[] }) {
  return (
    <div className="py-8">
      <Container>
        <h2>Sanity Test - Posts ({posts.length})</h2>
        {posts.length === 0 ? (
          <p>No posts found</p>
        ) : (
          <ul>
            {posts.map((post) => (
              <li key={post._id}>
                <strong>{post.title}</strong> - {new Date(post.publishedAt).toLocaleDateString()}
                {post.body && (
                  <div className="text-sm text-gray-600 mt-1">
                    <PortableText value={post.body} />
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </Container>
    </div>
  )
}

export default async function Home() {
  const posts = await client.fetch<Post[]>(POSTS_QUERY, {}, options);
  
  return (
    <main className="min-h-screen">
      <Hero />
      <PostsSection posts={posts} />
      <PricingCards />
    </main>
  )
}