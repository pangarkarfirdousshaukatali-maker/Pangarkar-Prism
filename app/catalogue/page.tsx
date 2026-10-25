import type { Metadata } from 'next';
import { App } from '../../src/App';

export const metadata: Metadata = {
  title: 'Ready-Made Collection',
  description: 'Explore Pangarkar Prism ready-made handcrafted collections.',
};

export default function CataloguePage() {
  return <App initialTab="catalogue" />;
}
