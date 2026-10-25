import React, { useState } from 'react';
import { Search, X, Sparkles, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');

  const filtered = query.trim() === ''
    ? []
    : products.filter(p => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
        );
      });

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-start justify-center pt-20 p-4 animate-fade-in">
      <div 
        className="relative bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-sand overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Search Input */}
        <div className="p-4 sm:p-5 border-b border-sand flex items-center gap-3">
          <Search className="w-5 h-5 text-gold-600 flex-shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search ready-made sarees, bespoke ensembles, shawls, clutches..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-forest-900 text-sm sm:text-base placeholder-forest-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-forest-400 hover:text-forest-700"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-forest-500 hover:text-forest-800 ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-96 overflow-y-auto p-4 sm:p-6">
          {query.trim() === '' ? (
            <div className="text-center py-8">
              <p className="text-xs uppercase tracking-widest text-gold-600 font-semibold mb-2">
                Popular Searches
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {['Banarasi Silk', 'Bespoke Saree', 'Zardozi Clutch', 'Raw Silk Sherwani', 'Pashmina Stole'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1.5 rounded-full bg-ivory-100 border border-sand text-xs text-forest-700 hover:border-gold-400 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-8 text-forest-500 text-sm">
              No creations found matching &ldquo;{query}&rdquo;.
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-[11px] uppercase tracking-wider text-forest-400 font-medium mb-2">
                Found {filtered.length} matching pieces:
              </p>
              {filtered.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectProduct(item);
                    onClose();
                  }}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-ivory-100 transition-colors cursor-pointer border border-transparent hover:border-sand group"
                >
                  <div className="w-14 h-16 rounded-lg overflow-hidden bg-ivory-200 flex-shrink-0">
                    <img src={item.images[0]} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase font-semibold text-gold-600">
                        {item.category}
                      </span>
                      {item.type === 'customized' && (
                        <span className="text-[9px] bg-gold-100 text-gold-800 px-1.5 py-0.2 rounded font-medium">
                          Bespoke
                        </span>
                      )}
                    </div>
                    <h4 className="font-serif text-sm font-semibold text-forest-900 group-hover:text-gold-600 truncate">
                      {item.name}
                    </h4>
                    <p className="text-xs text-forest-600 font-serif">
                      {formatPrice(item.price)}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-forest-400 group-hover:text-gold-600 group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
