import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: '/', changeFrequency: 'weekly', priority: 1 },
    { url: '/catalogue', changeFrequency: 'weekly', priority: 0.9 },
    { url: '/customization', changeFrequency: 'monthly', priority: 0.9 },
    { url: '/about', changeFrequency: 'monthly', priority: 0.7 },
    { url: '/contact', changeFrequency: 'monthly', priority: 0.8 },
  ];
}
