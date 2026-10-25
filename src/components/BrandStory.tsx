import React from 'react';
import { Sparkles, Scissors, Gem, Heart, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

export const BrandStory: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-ivory-100 relative overflow-hidden border-b border-sand/70">
      
      {/* Background watermark / decorative prism motif */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-200/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Centered Brand Emblem */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="w-16 h-16 rounded-full bg-ivory-200 border border-gold-400/50 flex items-center justify-center p-3 mb-4 shadow-sm">
            <img
              src={siteConfig.brand.logoUrl}
              alt="Pangarkar Prism Monogram"
              className="w-full h-full object-contain"
            />
          </div>
          <p className="text-xs uppercase tracking-[0.25em] text-gold-600 font-semibold mb-2">
            The Pangarkar Prism Philosophy
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-forest-900 tracking-tight max-w-2xl">
            {siteConfig.brandStory.title}
          </h2>
          <div className="prism-divider w-48 my-5">
            <span className="text-gold-500 text-xs">▲</span>
          </div>
        </div>

        {/* Narrative Text */}
        <div className="max-w-3xl mx-auto space-y-6 text-center text-forest-700 text-base sm:text-lg font-light leading-relaxed mb-16">
          {siteConfig.brandStory.narrative.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* Three Core Brand Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-sand">
          
          {/* Pillar 1 */}
          <div className="bg-white p-8 rounded-xl border border-sand shadow-sm text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-ivory-200 border border-gold-400/40 flex items-center justify-center text-gold-600 mb-5">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl text-forest-900 mb-2">
              Artisan Traditions
            </h3>
            <p className="text-xs sm:text-sm text-forest-600 leading-relaxed font-light">
              Collaborating directly with master weavers, zardozi artisans, and pattern cutters preserving centuries of textile mastery.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white p-8 rounded-xl border border-gold-400/50 shadow-sm text-center flex flex-col items-center relative">
            <div className="absolute -top-3 bg-gold-500 text-white text-[10px] uppercase font-bold tracking-widest px-3 py-0.5 rounded-full">
              Boutique Signature
            </div>
            <div className="w-12 h-12 rounded-full bg-gold-50 border border-gold-300 flex items-center justify-center text-gold-600 mb-5">
              <Scissors className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl text-forest-900 mb-2">
              Bespoke Personalization
            </h3>
            <p className="text-xs sm:text-sm text-forest-600 leading-relaxed font-light">
              Your choice of heritage weaves, bespoke monograms, custom color palettes, and made-to-measure silhouetting.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white p-8 rounded-xl border border-sand shadow-sm text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-ivory-200 border border-gold-400/40 flex items-center justify-center text-gold-600 mb-5">
              <Gem className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl text-forest-900 mb-2">
              Contemporary Silhouette
            </h3>
            <p className="text-xs sm:text-sm text-forest-600 leading-relaxed font-light">
              Graceful fluidity and architectural drape engineered for modern comfort, festive gatherings, and global occasions.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
