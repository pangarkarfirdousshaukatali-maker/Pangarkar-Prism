import type { Metadata } from 'next';
import { App } from '../../src/App';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about the Pangarkar Prism approach to heritage craft and contemporary design.',
};

export default function AboutPage() {
  return <App initialTab="about" />;
}
