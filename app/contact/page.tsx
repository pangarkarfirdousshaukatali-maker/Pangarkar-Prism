import type { Metadata } from 'next';
import { App } from '../../src/App';

export const metadata: Metadata = {
  title: 'Contact & Appointments',
  description: 'Contact Pangarkar Prism Boutique or request an appointment with our concierge.',
};

export default function ContactPage() {
  return <App initialTab="contact" />;
}
