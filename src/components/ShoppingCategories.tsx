import React from 'react';
import { ArrowRight, Sparkles, ShoppingBag, SlidersHorizontal } from 'lucide-react';

interface ShoppingCategoriesProps {
  onExploreReadyMade: () => void;
  onExploreCustomized: () => void;
}

export const ShoppingCategories: React.FC<ShoppingCategoriesProps> = ({
  onExploreReadyMade,
  onExploreCustomized,
}) => {
  return (
    <section className="py-16 sm:py-20 bg-ivory-100 border-b border-sand/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-gold-600 font-semibold mb-2">
            Two Distinct Journeys
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-forest-900 tracking-tight">
            Curated For Immediate Joy or Crafted To Your Vision
          </h2>
          <div className="prism-divider my-4">
            <span className="text-gold-500 text-xs">▲</span>
          </div>
          <p className="text-sm sm:text-base text-forest-600 font-light">
            Choose ready-to-wear artisanal elegance ready to dispatch, or begin an intimate bespoke creation tailored specifically around you.
          </p>
        </div>

        {/* Dual Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          
          {/* Card 1: Ready-Made Collection */}
          <div className="group relative rounded-2xl overflow-hidden bg-white border border-sand shadow-luxury hover:shadow-luxury-hover transition-all duration-500 flex flex-col justify-between">
            {/* Image Container with Editorial Aspect Ratio */}
            <div className="relative aspect-[16/11] overflow-hidden bg-forest-950">
              <img
                src="https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1200&q=80"
                alt="Ready-Made Collection Pangarkar Prism"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 filter brightness-[0.96]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
              
              {/* Category Pill */}
              <div className="absolute top-5 left-5 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-gold-300 shadow-sm flex items-center gap-2">
                <ShoppingBag className="w-3.5 h-3.5 text-forest-800" />
                <span className="text-[11px] uppercase tracking-wider font-semibold text-forest-900">
                  Ready to Dispatch
                </span>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-8 sm:p-10 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl sm:text-3xl font-serif text-forest-900 mb-3 group-hover:text-gold-600 transition-colors">
                  Ready-Made Collection
                </h3>
                <p className="text-forest-600 text-sm sm:text-base leading-relaxed mb-6 font-light">
                  Explore a curated collection of products selected for your style.
                </p>
              </div>

              <div>
                <button
                  onClick={onExploreReadyMade}
                  className="w-full sm:w-auto px-7 py-3.5 bg-forest-900 text-ivory-100 text-xs uppercase tracking-[0.16em] font-semibold rounded hover:bg-forest-800 transition-all flex items-center justify-center gap-3 group/btn shadow-sm"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4 text-gold-400 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Customized Creations */}
          <div className="group relative rounded-2xl overflow-hidden bg-white border border-gold-400/50 shadow-luxury hover:shadow-luxury-hover transition-all duration-500 flex flex-col justify-between">
            {/* Image Container with Editorial Aspect Ratio */}
            <div className="relative aspect-[16/11] overflow-hidden bg-forest-950">
              <img
                src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=80"
                alt="Customized Creations Pangarkar Prism"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 filter brightness-[0.96]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
              
              {/* Category Pill */}
              <div className="absolute top-5 left-5 bg-gold-500 text-white px-3.5 py-1.5 rounded-full border border-gold-300 shadow-sm flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-ivory-100" />
                <span className="text-[11px] uppercase tracking-wider font-semibold text-ivory-100">
                  Bespoke & Personalized
                </span>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-8 sm:p-10 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl sm:text-3xl font-serif text-forest-900 mb-3 group-hover:text-gold-600 transition-colors">
                  Customized Creations
                </h3>
                <p className="text-forest-600 text-sm sm:text-base leading-relaxed mb-6 font-light">
                  Bring your ideas to life with products personalized to your preferences.
                </p>
              </div>

              <div>
                <button
                  onClick={onExploreCustomized}
                  className="w-full sm:w-auto px-7 py-3.5 bg-ivory-100 text-forest-900 text-xs uppercase tracking-[0.16em] font-semibold rounded hover:bg-gold-500 hover:text-white transition-all flex items-center justify-center gap-3 group/btn border border-gold-500/80 shadow-sm"
                >
                  <Sparkles className="w-4 h-4 text-gold-600 group-hover/btn:text-white transition-colors" />
                  <span>Customize Yours</span>
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
