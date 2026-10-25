import type { Metadata } from 'next';
import '../src/index.css';

export const metadata: Metadata = {
  title: {
    default: 'Pangarkar Prism Boutique | Tradition • Craft • Contemporary',
    template: '%s | Pangarkar Prism Boutique',
  },
  description:
    'Discover Pangarkar Prism Boutique collections and personalized creations shaped by traditional craftsmanship and contemporary style.',
  icons: { icon: '/assets/logo.png' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
