import React, { useState } from 'react';
import { Sparkles, Eye, ShoppingBag, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { Product, ProductType } from '../types';

interface FeaturedCollectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: string) => void;
  onNavigateToCatalogue: () => void;
  onNavigateToStudio: () => void;
}

export const FeaturedCollection: React.FC<FeaturedCollectionProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onNavigateToCatalogue,
  onNavigateToStudio,
}) => {
  const [filterType, setFilterType] = useState<'all' | ProductType>('all');

  // Filter products by type for featured tabs
  const filteredProducts = products.filter((p) => {
    if (filterType === 'all') return true;
    return p.type === filterType;
  });

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section className="py-16 sm:py-24 bg-ivory-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-sand pb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-gold-600 font-semibold mb-2">
              Curated Atelier Showcase
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-forest-900 tracking-tight">
              Featured Creations
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="mt-6 md:mt-0 flex items-center space-x-2 bg-ivory-100 p-1.5 rounded-lg border border-sand">
            <button
              onClick={() => setFilterType('all')}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-medium rounded transition-all ${
                filterType === 'all'
                  ? 'bg-forest-900 text-ivory-100 shadow-sm'
                  : 'text-forest-700 hover:text-gold-600'
              }`}
            >
              All Pieces
            </button>
            <button
              onClick={() => setFilterType('ready-made')}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-medium rounded transition-all ${
                filterType === 'ready-made'
                  ? 'bg-forest-900 text-ivory-100 shadow-sm'
                  : 'text-forest-700 hover:text-gold-600'
              }`}
            >
              Ready-Made
            </button>
            <button
              onClick={() => setFilterType('customized')}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-medium rounded transition-all flex items-center gap-1.5 ${
                filterType === 'customized'
                  ? 'bg-gold-500 text-white shadow-sm'
                  : 'text-forest-700 hover:text-gold-600'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>Customized</span>
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const isCustom = product.type === 'customized';
            return (
              <div
                key={product.id}
                className="boutique-card rounded-xl overflow-hidden flex flex-col group cursor-pointer"
                onClick={() => onSelectProduct(product)}
              >
                {/* Product Image Area */}
                <div className="relative aspect-[4/5] overflow-hidden bg-ivory-100">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Badge: Ready-Made vs Customized */}
                  <div className="absolute top-3 left-3">
                    {isCustom ? (
                      <span className="inline-flex items-center gap-1.5 bg-forest-900/90 backdrop-blur-md text-gold-300 text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full border border-gold-400/40 shadow-sm">
                        <Sparkles className="w-2.5 h-2.5" />
                        Bespoke / Custom
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-white/90 backdrop-blur-md text-forest-800 text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full border border-sand shadow-sm">
                        Ready to Ship
                      </span>
                    )}
                  </div>

                  {/* Category overlay */}
                  <div className="absolute top-3 right-3">
                    <span className="bg-black/30 backdrop-blur-md text-ivory-100 text-[10px] px-2 py-0.5 rounded tracking-wide">
                      {product.category}
                    </span>
                  </div>

                  {/* Quick Action Overlay on Desktop Hover */}
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProduct(product);
                      }}
                      className="px-4 py-2 bg-white text-forest-900 text-xs uppercase tracking-wider font-semibold rounded shadow-md hover:bg-gold-50 flex items-center gap-1.5 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 text-gold-600" />
                      <span>View Details</span>
                    </button>
                    {!isCustom && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(product, product.sizes[0] || 'Standard');
                        }}
                        className="px-4 py-2 bg-forest-900 text-ivory-100 text-xs uppercase tracking-wider font-semibold rounded shadow-md hover:bg-forest-800 flex items-center gap-1.5 transition-colors border border-gold-500/40"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-gold-400" />
                        <span>Add</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Card Content Area */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Color Swatch Dots */}
                    <div className="flex items-center gap-1.5 mb-2.5">
                      {product.colors.map((color, i) => (
                        <span
                          key={i}
                          className="w-3.5 h-3.5 rounded-full border border-sand shadow-xs"
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        />
                      ))}
                      <span className="text-[11px] text-forest-500 ml-1">
                        {product.colors.length} {product.colors.length === 1 ? 'color' : 'colors'}
                      </span>
                    </div>

                    {/* Product Name */}
                    <h3 className="font-serif text-xl text-forest-900 group-hover:text-gold-600 transition-colors line-clamp-1 mb-1">
                      {product.name}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs text-forest-600 line-clamp-2 leading-relaxed mb-4 font-light">
                      {product.shortDescription}
                    </p>
                  </div>

                  <div>
                    {/* Sizes available preview */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {product.sizes.slice(0, 3).map((size, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-ivory-100 border border-sand text-forest-700"
                        >
                          {size}
                        </span>
                      ))}
                      {product.sizes.length > 3 && (
                        <span className="text-[10px] px-1.5 py-0.5 text-forest-500">
                          +{product.sizes.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Price & Action Button */}
                    <div className="pt-3 border-t border-sand/60 flex items-center justify-between">
                      <div>
                        <span className="text-lg font-serif font-semibold text-forest-900">
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-forest-400 line-through ml-2">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>

                      {isCustom ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectProduct(product);
                          }}
                          className="text-xs uppercase tracking-wider font-semibold text-gold-600 group-hover:text-gold-700 flex items-center gap-1"
                        >
                          <span>Customize</span>
                          <Sparkles className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart(product, product.sizes[0] || 'Standard');
                          }}
                          className="text-xs uppercase tracking-wider font-semibold text-forest-800 hover:text-gold-600 flex items-center gap-1"
                        >
                          <span>Add to Bag</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View Full Catalogue CTA */}
        <div className="mt-14 text-center">
          <button
            onClick={onNavigateToCatalogue}
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-ivory-100 border border-gold-500/70 text-forest-900 text-xs uppercase tracking-[0.18em] font-semibold rounded hover:bg-forest-900 hover:text-ivory-100 transition-all duration-300 shadow-sm"
          >
            <span>Explore Complete Catalogue</span>
            <ArrowRight className="w-4 h-4 text-gold-500" />
          </button>
        </div>

      </div>
    </section>
  );
};
