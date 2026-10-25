import React, { useState } from 'react';
import { X, Sparkles, ShoppingBag, ShieldCheck, Truck, RotateCcw, Check, ArrowRight, Heart } from 'lucide-react';
import { Product, ProductColor } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (
    product: Product, 
    size: string, 
    color?: ProductColor, 
    monogram?: string, 
    customNotes?: string
  ) => void;
  onOpenCustomStudio: (category: any) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onOpenCustomStudio,
}) => {
  if (!product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [customMonogram, setCustomMonogram] = useState('');
  const [customNote, setCustomNote] = useState('');
  const [addedSuccess, setAddedSuccess] = useState(false);

  const isCustom = product.type === 'customized';

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleAdd = () => {
    onAddToCart(
      product,
      selectedSize,
      selectedColor,
      customMonogram.trim() || undefined,
      customNote.trim() || undefined
    );
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div 
        className="relative bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-sand my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 text-forest-800 hover:text-gold-600 flex items-center justify-center shadow-md transition-colors border border-sand"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left: Product Images Gallery */}
          <div className="p-6 sm:p-8 bg-ivory-100 flex flex-col justify-between border-b md:border-b-0 md:border-r border-sand">
            <div>
              {/* Main Image */}
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-white shadow-sm border border-sand mb-4">
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-top"
                />

                {/* Badge */}
                <div className="absolute top-3 left-3">
                  {isCustom ? (
                    <span className="inline-flex items-center gap-1.5 bg-forest-900/90 backdrop-blur-md text-gold-300 text-[10px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full border border-gold-400/40">
                      <Sparkles className="w-3 h-3 text-gold-400" />
                      Bespoke Crafted
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 bg-white/95 backdrop-blur-md text-forest-800 text-[10px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full border border-sand">
                      Ready to Ship
                    </span>
                  )}
                </div>
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2.5 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-16 h-20 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                        activeImageIndex === idx ? 'border-gold-500 shadow-sm' : 'border-sand opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Craftsmanship highlights */}
            <div className="pt-6 border-t border-sand/70 mt-6 space-y-2 text-xs text-forest-600 font-light">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-gold-600 flex-shrink-0" />
                <span>Certified Pure Artisan Textiles & Zari</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-gold-600 flex-shrink-0" />
                <span>{product.leadTime}</span>
              </div>
            </div>
          </div>

          {/* Right: Product Details & Purchase Form */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              {/* Category & Name */}
              <div className="mb-2">
                <span className="text-[11px] uppercase tracking-[0.2em] text-gold-600 font-semibold">
                  {product.category}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-forest-900 mt-1">
                  {product.name}
                </h2>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-5">
                <span className="text-2xl font-serif font-bold text-forest-900">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-forest-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                <span className="text-xs text-forest-500 font-light">
                  (Inclusive of all luxury taxes)
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-forest-600 leading-relaxed font-light mb-6">
                {product.description}
              </p>

              {/* Color Selection */}
              <div className="mb-5">
                <label className="block text-xs uppercase tracking-wider font-semibold text-forest-800 mb-2">
                  Color Shade: <span className="font-normal text-gold-600">{selectedColor.name}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs transition-all ${
                        selectedColor.name === color.name
                          ? 'border-gold-500 bg-gold-50/50 text-forest-900 font-semibold ring-1 ring-gold-500'
                          : 'border-sand bg-white text-forest-700 hover:border-gold-300'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-sand"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs uppercase tracking-wider font-semibold text-forest-800">
                    Size / Variant:
                  </label>
                  {isCustom && (
                    <button
                      onClick={() => onOpenCustomStudio(product.category)}
                      className="text-[11px] text-gold-600 hover:text-gold-700 underline font-medium"
                    >
                      Need Custom Measurements?
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`px-3.5 py-2 rounded-lg border text-xs uppercase tracking-wider transition-all ${
                        selectedSize === size
                          ? 'border-forest-900 bg-forest-900 text-ivory-100 font-semibold'
                          : 'border-sand bg-white text-forest-700 hover:border-gold-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* If Customizable: Monogram & Notes inputs */}
              {isCustom && (
                <div className="bg-ivory-100 p-4 rounded-xl border border-gold-300/70 mb-5 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-forest-900">
                    <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                    <span>Personalization Options</span>
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-forest-700 mb-1">
                      Monogram / Initials to Embroider:
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. R • P"
                      value={customMonogram}
                      onChange={(e) => setCustomMonogram(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-sand rounded text-xs text-forest-900 focus:outline-none focus:border-gold-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-forest-700 mb-1">
                      Custom Fitting or Color Notes:
                    </label>
                    <input
                      type="text"
                      placeholder="Any specific instructions or adjustments..."
                      value={customNote}
                      onChange={(e) => setCustomNote(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-sand rounded text-xs text-forest-900 focus:outline-none focus:border-gold-500"
                    />
                  </div>
                </div>
              )}

              {/* Craftsmanship Specs Accordion / List */}
              <div className="border-t border-sand/70 pt-4 mb-6">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-forest-900 mb-2">
                  Atelier Craftsmanship Details
                </h4>
                <ul className="text-xs text-forest-600 space-y-1 font-light">
                  {product.craftsmanshipDetails.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-gold-500 mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-sand space-y-2.5">
              <button
                type="button"
                onClick={handleAdd}
                className="w-full py-4 bg-forest-900 text-ivory-100 text-xs uppercase tracking-[0.2em] font-semibold rounded hover:bg-forest-800 transition-all shadow-md flex items-center justify-center gap-3 border border-forest-800"
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-green-400" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-gold-400" />
                    <span>{isCustom ? 'Add Custom Piece to Bag' : 'Add to Shopping Bag'}</span>
                  </>
                )}
              </button>

              {isCustom && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenCustomStudio(product.category);
                  }}
                  className="w-full py-3 bg-ivory-100 border border-gold-400 text-forest-900 text-xs uppercase tracking-wider font-semibold rounded hover:bg-gold-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                  <span>Configure Full Custom Ensemble in Studio</span>
                </button>
              )}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
