import React from 'react';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';
import { siteConfig } from '../data/siteConfig';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fade-in">
      <div 
        className="w-full max-w-md bg-ivory-100 h-full shadow-2xl flex flex-col justify-between border-l border-sand animate-slide-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-6 bg-white border-b border-sand flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-gold-600" />
            <h2 className="font-serif text-xl text-forest-900 tracking-tight">
              Your Boutique Bag ({items.reduce((acc, item) => acc + item.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-forest-500 hover:text-forest-900 transition-colors"
            aria-label="Close bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items List / Empty State */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-ivory-200 border border-sand flex items-center justify-center text-forest-400 mb-4">
                <ShoppingBag className="w-7 h-7 text-gold-500" />
              </div>
              <h3 className="font-serif text-xl text-forest-900 mb-1">Your Bag is Empty</h3>
              <p className="text-xs text-forest-500 max-w-xs mb-6 font-light">
                Discover our ready-made heirloom sarees or commission a customized creation today.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-forest-900 text-ivory-100 text-xs uppercase tracking-wider font-semibold rounded hover:bg-forest-800 transition-colors"
              >
                Continue Browsing
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-sand p-4 shadow-sm flex gap-4"
              >
                {/* Thumbnail */}
                <div className="w-20 h-24 rounded-lg overflow-hidden bg-ivory-200 border border-sand flex-shrink-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-serif text-sm font-semibold text-forest-900 line-clamp-1">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-forest-400 hover:text-red-600 transition-colors p-0.5"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-[11px] text-forest-500 mt-0.5">
                      Size: <span className="text-forest-800 font-medium">{item.selectedSize}</span>
                    </p>

                    {item.selectedColor && (
                      <div className="flex items-center gap-1.5 mt-0.5 text-[11px] text-forest-500">
                        <span>Color:</span>
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-sand"
                          style={{ backgroundColor: item.selectedColor.hex }}
                        />
                        <span className="text-forest-800 font-medium">{item.selectedColor.name}</span>
                      </div>
                    )}

                    {item.monogramText && (
                      <p className="text-[11px] text-gold-700 font-medium mt-1 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-gold-500" />
                        <span>Monogram: &ldquo;{item.monogramText}&rdquo;</span>
                      </p>
                    )}
                  </div>

                  {/* Quantity & Item Total */}
                  <div className="flex items-center justify-between pt-2 border-t border-sand/60 mt-2">
                    <div className="flex items-center border border-sand rounded bg-ivory-100">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-forest-600 hover:text-forest-900"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-semibold text-forest-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-forest-600 hover:text-forest-900"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-xs font-semibold text-forest-900 font-serif">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && (
          <div className="p-6 bg-white border-t border-sand space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-forest-600 font-light">Subtotal</span>
              <span className="font-serif text-xl font-bold text-forest-900">
                {formatPrice(subtotal)}
              </span>
            </div>

            <div className="text-[11px] text-forest-500 flex items-center gap-1.5 font-light">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-600" />
              <span>Complimentary insured shipping included on boutique orders.</span>
            </div>

            <button
              onClick={onProceedToCheckout}
              className="w-full py-4 bg-forest-900 text-ivory-100 text-xs uppercase tracking-[0.2em] font-semibold rounded hover:bg-forest-800 transition-all shadow-md flex items-center justify-center gap-3 border border-forest-800"
            >
              <span>Proceed to Concierge Checkout</span>
              <ArrowRight className="w-4 h-4 text-gold-400" />
            </button>

            <p className="text-[10px] text-center text-forest-400">
              Orders and custom tailoring requests are confirmed directly with our boutique concierge.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
