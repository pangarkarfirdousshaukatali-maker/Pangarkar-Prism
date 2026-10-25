import type { Metadata } from 'next';
import { App } from '../../src/App';

export const metadata: Metadata = {
  title: 'Customization Studio',
  description: 'Create a personalized Pangarkar Prism piece with our bespoke customization studio.',
};

export default function CustomizationPage() {
  return <App initialTab="custom-studio" />;
}
