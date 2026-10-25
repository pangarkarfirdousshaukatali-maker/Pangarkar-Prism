import type { Metadata } from 'next';
import '../src/index.css';
import { siteConfig } from '../src/data/siteConfig';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Pangarkar Prism Boutique | Tradition • Craft • Contemporary',
    template: '%s | Pangarkar Prism Boutique',
  },
  description:
    'Discover Pangarkar Prism Boutique collections and personalized creations shaped by traditional craftsmanship and contemporary style.',
  keywords: [
    'Pangarkar Prism',
    'fashion boutique',
    'bespoke fashion',
    'custom clothing',
    'Indian craftsmanship',
    'fashion design collaboration',
  ],
  openGraph: {
    title: 'Pangarkar Prism Boutique | Tradition • Craft • Contemporary',
    description:
      'Discover handcrafted collections, bespoke customization, and creative collaboration with Pangarkar Prism Boutique.',
    type: 'website',
    images: [{ url: siteConfig.brand.logoUrl, alt: siteConfig.brand.name }],
  },
  twitter: {
    card: 'summary',
    title: 'Pangarkar Prism Boutique',
    description:
      'Handcrafted collections, bespoke customization, and contemporary fashion shaped by tradition.',
    images: [siteConfig.brand.logoUrl],
  },
  icons: { icon: '/assets/logo.png' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: siteConfig.brand.name,
        description: siteConfig.brand.positioning,
        logo: siteConfig.brand.logoUrl,
        sameAs: Object.values(siteConfig.social),
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: siteConfig.contact.phone,
          contactType: 'customer service',
          availableLanguage: ['en'],
        },
      },
      {
        '@type': 'WebSite',
        name: siteConfig.brand.name,
        description: siteConfig.brand.positioning,
        potentialAction: {
          '@type': 'SearchAction',
          target: '/catalogue?search={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
