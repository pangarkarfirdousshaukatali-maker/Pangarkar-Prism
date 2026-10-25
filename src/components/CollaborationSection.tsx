import React from 'react';
import { ArrowRight, MessageCircle, Palette, Users } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

export const CollaborationSection: React.FC = () => {
  const openWhatsApp = () => {
    const message = encodeURIComponent(
      'Hello Pangarkar Prism Boutique, I am a fashion design professional interested in exploring a collaboration.'
    );
    window.open(
      `https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${message}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <section className="relative overflow-hidden border-b border-sand/70 bg-forest-900 py-16 sm:py-20">
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl" />
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-7">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-gold-400">
            Open to Creative Collaboration
          </p>
          <h2 className="max-w-2xl font-serif text-3xl tracking-tight text-ivory-100 sm:text-4xl lg:text-5xl">
            Are you shaping the future of fashion?
          </h2>
          <p className="mt-5 max-w-2xl text-sm font-light leading-relaxed text-ivory-300 sm:text-base">
            Pangarkar Prism welcomes conversations with fashion designers, stylists, textile artists,
            and creative professionals who share our respect for craft and contemporary expression.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 lg:col-span-5">
          <div className="border border-forest-600 bg-forest-800/70 p-4 text-center">
            <Palette className="mx-auto mb-3 h-5 w-5 text-gold-400" />
            <p className="text-[10px] uppercase tracking-wider text-ivory-300">Design</p>
          </div>
          <div className="border border-forest-600 bg-forest-800/70 p-4 text-center">
            <Users className="mx-auto mb-3 h-5 w-5 text-gold-400" />
            <p className="text-[10px] uppercase tracking-wider text-ivory-300">Connect</p>
          </div>
          <div className="border border-forest-600 bg-forest-800/70 p-4 text-center">
            <MessageCircle className="mx-auto mb-3 h-5 w-5 text-gold-400" />
            <p className="text-[10px] uppercase tracking-wider text-ivory-300">Create</p>
          </div>
        </div>

        <div className="lg:col-span-12">
          <button
            type="button"
            onClick={openWhatsApp}
            className="inline-flex items-center gap-3 border border-gold-400 bg-gold-500 px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-forest-950 transition-colors hover:bg-gold-300"
          >
            <span>Explore a Collaboration</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
