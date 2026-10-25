import React from 'react';
import { ArrowRight, Sparkles, Compass, ShieldCheck, HeartHandshake } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

interface HeroSectionProps {
  onExploreReadyMade: () => void;
  onCreateYourOwn: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreReadyMade,
  onCreateYourOwn,
}) => {
  return (
    <section className="relative overflow-hidden bg-ivory-200 pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-sand/70">
      {/* Delicate background ambient accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-200/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-forest-200/15 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Brand Statement & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ivory-100 border border-gold-400/50 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-gold-500"></span>
              <span className="text-xs uppercase tracking-[0.2em] font-medium text-forest-800">
                {siteConfig.brand.tagline}
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif text-forest-900 leading-[1.08] tracking-tight">
              Elegance, <br />
              <span className="italic font-light text-forest-800">Crafted Around</span>{' '}
              <span className="gold-gradient-text font-normal">You.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-forest-600 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
              Discover thoughtfully curated styles and personalized creations that reflect your individuality.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onExploreReadyMade}
                className="w-full sm:w-auto px-8 py-4 bg-forest-900 text-ivory-100 text-xs uppercase tracking-[0.18em] font-semibold rounded hover:bg-forest-800 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-3 group border border-forest-800"
              >
                <span>Explore Ready-Made</span>
                <ArrowRight className="w-4 h-4 text-gold-400 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onCreateYourOwn}
                className="w-full sm:w-auto px-8 py-4 bg-ivory-100 text-forest-900 text-xs uppercase tracking-[0.18em] font-semibold rounded hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center gap-3 border border-gold-500/80 group"
              >
                <Sparkles className="w-4 h-4 text-gold-600 transition-transform group-hover:scale-110" />
                <span>Create Your Own</span>
              </button>
            </div>

            {/* Micro Highlights / Trust Badges */}
            <div className="pt-8 border-t border-sand/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="flex flex-col">
                <span className="font-serif text-lg font-semibold text-forest-900">100% Pure</span>
                <span className="text-[11px] text-forest-500 tracking-wide">Artisan Textiles</span>
              </div>
              <div className="flex flex-col border-l border-sand pl-4">
                <span className="font-serif text-lg font-semibold text-forest-900">Bespoke</span>
                <span className="text-[11px] text-forest-500 tracking-wide">Custom Monograms</span>
              </div>
              <div className="flex flex-col border-l border-sand pl-4">
                <span className="font-serif text-lg font-semibold text-forest-900">Complimentary</span>
                <span className="text-[11px] text-forest-500 tracking-wide">Styling Concierge</span>
              </div>
            </div>

          </div>

          {/* Right Column: Editorial Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative gold frame */}
              <div className="absolute -inset-3 border border-gold-400/40 rounded-2xl -rotate-1 pointer-events-none hidden sm:block"></div>
              
              {/* Main Editorial Image Card */}
              <div className="relative rounded-xl overflow-hidden shadow-2xl bg-white border border-sand">
                <div className="aspect-[4/5] overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85"
                    alt="Pangarkar Prism Handcrafted Festive Collection"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Subtle gradient overlay at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-transparent to-transparent"></div>

                  {/* Floating Luxury Tag on Image */}
                  <div className="absolute bottom-6 left-6 right-6 text-ivory-100 p-4 rounded-lg bg-forest-900/80 backdrop-blur-md border border-gold-400/40">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[11px] uppercase tracking-widest text-gold-300 font-medium">Bespoke Atelier</p>
                        <h4 className="font-serif text-lg text-white">Handwoven Zari & Pure Silk</h4>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gold-500/20 border border-gold-400 flex items-center justify-center text-gold-300">
                        ✦
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Small Accent Card */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-sand hidden sm:flex items-center gap-3.5 max-w-xs">
                <div className="w-10 h-10 rounded-full bg-gold-100 border border-gold-300 flex items-center justify-center text-gold-600 flex-shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-forest-900">Customized For You</p>
                  <p className="text-[11px] text-forest-500">Initials, colors & custom sizes</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
