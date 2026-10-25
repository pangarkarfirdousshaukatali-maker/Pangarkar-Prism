import React, { useState, useMemo } from 'react';
import { Search, Filter, Sparkles, ShoppingBag, Eye, SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';
import { Product, ProductCategory, ProductType } from '../types';
import { productCategories } from '../data/products';

interface ProductCatalogProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: string) => void;
  initialTypeFilter?: 'all' | ProductType;
  initialCategoryFilter?: string;
  onNavigateToStudio: () => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  initialTypeFilter = 'all',
  initialCategoryFilter = 'all',
  onNavigateToStudio,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | ProductType>(initialTypeFilter);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategoryFilter);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Type filter
        if (selectedType !== 'all' && product.type !== selectedType) {
          return false;
        }
        // Category filter
        if (selectedCategory !== 'all' && product.category !== selectedCategory) {
          return false;
        }
        // Search query
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          const matchName = product.name.toLowerCase().includes(q);
          const matchDesc = product.description.toLowerCase().includes(q);
          const matchCat = product.category.toLowerCase().includes(q);
          const matchCraft = product.craftsmanshipDetails.some(c => c.toLowerCase().includes(q));
          return matchName || matchDesc || matchCat || matchCraft;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return 0; // featured retains initial order
      });
  }, [products, selectedType, selectedCategory, searchQuery, sortBy]);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedType('all');
    setSelectedCategory('all');
    setSortBy('featured');
  };

  return (
    <div className="py-10 sm:py-16 bg-ivory-200 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title & Tagline */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="text-xs uppercase tracking-[0.25em] text-gold-600 font-semibold mb-2">
            The Atelier Collections
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-forest-900 tracking-tight">
            Curated Elegance & Bespoke Creations
          </h1>
          <div className="prism-divider w-40 mx-auto my-4">
            <span className="text-gold-500 text-xs">▲</span>
          </div>
          <p className="text-sm sm:text-base text-forest-600 font-light">
            Browse ready-to-ship handloom masterpieces or explore customizable garments tailored with your personal monograms, fabrics, and measurements.
          </p>
        </div>

        {/* Filter & Control Bar */}
        <div className="bg-white rounded-xl border border-sand p-4 sm:p-5 shadow-sm mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-forest-400" />
              <input
                type="text"
                placeholder="Search by weave, fabric, silhouette, or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2.5 bg-ivory-100 border border-sand rounded-lg text-sm text-forest-900 placeholder-forest-400 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-forest-400 hover:text-forest-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Product Type Filter Pills (Ready-Made vs Customized) */}
            <div className="flex items-center gap-1.5 p-1 bg-ivory-100 rounded-lg border border-sand self-start sm:self-auto overflow-x-auto max-w-full">
              <button
                onClick={() => setSelectedType('all')}
                className={`px-3.5 py-1.5 text-xs uppercase tracking-wider font-medium rounded transition-all whitespace-nowrap ${
                  selectedType === 'all'
                    ? 'bg-forest-900 text-ivory-100 shadow-xs'
                    : 'text-forest-700 hover:text-gold-600'
                }`}
              >
                All Works ({products.length})
              </button>
              <button
                onClick={() => setSelectedType('ready-made')}
                className={`px-3.5 py-1.5 text-xs uppercase tracking-wider font-medium rounded transition-all whitespace-nowrap ${
                  selectedType === 'ready-made'
                    ? 'bg-forest-900 text-ivory-100 shadow-xs'
                    : 'text-forest-700 hover:text-gold-600'
                }`}
              >
                Ready-Made
              </button>
              <button
                onClick={() => setSelectedType('customized')}
                className={`px-3.5 py-1.5 text-xs uppercase tracking-wider font-medium rounded transition-all whitespace-nowrap flex items-center gap-1 ${
                  selectedType === 'customized'
                    ? 'bg-gold-500 text-white shadow-xs'
                    : 'text-forest-700 hover:text-gold-600'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                <span>Customized</span>
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2">
              <label htmlFor="sortSelect" className="text-xs uppercase tracking-wider text-forest-500 font-medium whitespace-nowrap">
                Sort:
              </label>
              <select
                id="sortSelect"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-ivory-100 border border-sand text-xs font-medium text-forest-800 rounded-lg px-3 py-2 focus:outline-none focus:border-gold-500 cursor-pointer"
              >
                <option value="featured">Featured Collection</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Alphabetical</option>
              </select>
            </div>

          </div>

          {/* Category Filter Pills */}
          <div className="pt-3 border-t border-sand/60 flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <span className="text-xs uppercase tracking-wider text-forest-400 font-medium mr-1 whitespace-nowrap">
              Categories:
            </span>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-forest-800 text-ivory-100'
                  : 'bg-ivory-100 text-forest-700 hover:bg-sand/60 border border-sand'
              }`}
            >
              All Categories
            </button>
            {productCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-forest-800 text-ivory-100'
                    : 'bg-ivory-100 text-forest-700 hover:bg-sand/60 border border-sand'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter & Active Filter Summary */}
        <div className="flex items-center justify-between mb-6 text-xs text-forest-600">
          <div>
            Showing <span className="font-semibold text-forest-900">{filteredAndSortedProducts.length}</span> pieces
            {selectedType !== 'all' && (
              <span className="ml-1 font-medium text-gold-600">({selectedType === 'ready-made' ? 'Ready-Made only' : 'Customized only'})</span>
            )}
            {selectedCategory !== 'all' && (
              <span className="ml-1 text-forest-500">in &ldquo;{selectedCategory}&rdquo;</span>
            )}
          </div>

          {(selectedType !== 'all' || selectedCategory !== 'all' || searchQuery.trim() !== '') && (
            <button
              onClick={clearAllFilters}
              className="text-xs text-gold-600 hover:text-gold-700 underline font-medium"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Empty State */}
        {filteredAndSortedProducts.length === 0 && (
          <div className="bg-white rounded-2xl border border-sand p-12 text-center max-w-lg mx-auto shadow-sm my-8">
            <div className="w-14 h-14 rounded-full bg-ivory-200 border border-sand mx-auto flex items-center justify-center text-forest-500 mb-4">
              <Search className="w-6 h-6 text-gold-600" />
            </div>
            <h3 className="font-serif text-2xl text-forest-900 mb-2">No Pieces Match Your Search</h3>
            <p className="text-sm text-forest-600 leading-relaxed font-light mb-6">
              We couldn’t find any creations matching your specific filter criteria. You can reset filters or consult our atelier for custom commissions.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={clearAllFilters}
                className="px-6 py-2.5 bg-forest-900 text-ivory-100 text-xs uppercase tracking-wider font-semibold rounded hover:bg-forest-800 transition-colors"
              >
                Reset All Filters
              </button>
              <button
                onClick={onNavigateToStudio}
                className="px-6 py-2.5 bg-ivory-100 border border-gold-400 text-forest-900 text-xs uppercase tracking-wider font-semibold rounded hover:bg-gold-50 transition-colors flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                <span>Open Custom Studio</span>
              </button>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAndSortedProducts.map((product) => {
            const isCustom = product.type === 'customized';
            return (
              <div
                key={product.id}
                className="boutique-card rounded-xl overflow-hidden flex flex-col group cursor-pointer"
                onClick={() => onSelectProduct(product)}
              >
                {/* Image Aspect Box */}
                <div className="relative aspect-[4/5] overflow-hidden bg-ivory-100">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Distinction Pill */}
                  <div className="absolute top-3 left-3">
                    {isCustom ? (
                      <span className="inline-flex items-center gap-1.5 bg-forest-900/90 backdrop-blur-md text-gold-300 text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full border border-gold-400/40 shadow-sm">
                        <Sparkles className="w-2.5 h-2.5 text-gold-400" />
                        Bespoke / Custom
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-white/90 backdrop-blur-md text-forest-800 text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full border border-sand shadow-sm">
                        Ready to Ship
                      </span>
                    )}
                  </div>

                  {/* Category Pill */}
                  <div className="absolute top-3 right-3">
                    <span className="bg-black/35 backdrop-blur-md text-ivory-100 text-[10px] px-2.5 py-0.5 rounded tracking-wide">
                      {product.category}
                    </span>
                  </div>

                  {/* Hover Buttons */}
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/75 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProduct(product);
                      }}
                      className="px-4 py-2 bg-white text-forest-900 text-xs uppercase tracking-wider font-semibold rounded shadow-md hover:bg-gold-50 flex items-center gap-1.5 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 text-gold-600" />
                      <span>Details</span>
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

                {/* Details Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Swatches */}
                    <div className="flex items-center gap-1.5 mb-2.5">
                      {product.colors.map((color, idx) => (
                        <span
                          key={idx}
                          className="w-3.5 h-3.5 rounded-full border border-sand shadow-xs"
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        />
                      ))}
                      <span className="text-[11px] text-forest-500 ml-1">
                        {product.colors.length} {product.colors.length === 1 ? 'shade' : 'shades'}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl text-forest-900 group-hover:text-gold-600 transition-colors line-clamp-1 mb-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-forest-600 line-clamp-2 leading-relaxed mb-4 font-light">
                      {product.shortDescription}
                    </p>
                  </div>

                  <div>
                    {/* Lead time notice */}
                    <div className="text-[11px] text-gold-600 font-medium mb-3 flex items-center gap-1">
                      <span>•</span>
                      <span>{product.leadTime}</span>
                    </div>

                    {/* Price and CTA */}
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
                          className="text-xs uppercase tracking-wider font-semibold text-gold-600 hover:text-gold-700 flex items-center gap-1"
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
                          <ShoppingBag className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
