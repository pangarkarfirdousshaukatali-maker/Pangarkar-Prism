import React, { useState } from 'react';
import { X, ShoppingBag, ShieldCheck, CheckCircle2, MessageSquare, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';
import { siteConfig } from '../data/siteConfig';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderCompleted: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderCompleted,
}) => {
  if (!isOpen) return null;

  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    shippingAddress: '',
    deliveryNotes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [orderRef, setOrderRef] = useState('');

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.name || !customer.phone) return;

    const ref = `PPB-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderRef(ref);
    setSubmitted(true);
  };

  const handleWhatsAppSend = () => {
    const itemsList = items
      .map(
        (it) =>
          `• ${it.quantity}x ${it.product.name} (Size: ${it.selectedSize}${
            it.monogramText ? `, Monogram: "${it.monogramText}"` : ''
          }) - ${formatPrice(it.product.price * it.quantity)}`
      )
      .join('\n');

    const msg = encodeURIComponent(
      `Hello Pangarkar Prism Boutique,\n\nI would like to place an order:\n*Order Ref:* ${orderRef}\n*Client:* ${customer.name}\n*Phone:* ${customer.phone}\n*Address:* ${customer.shippingAddress || 'Not provided'}\n\n*Items:*\n${itemsList}\n\n*Total:* ${formatPrice(subtotal)}\n\nPlease confirm availability and payment details.`
    );

    window.open(`https://wa.me/919823045678?text=${msg}`, '_blank');
    onOrderCompleted();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div 
        className="relative bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-sand my-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-forest-400 hover:text-forest-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ShoppingBag className="w-5 h-5 text-gold-600" />
              <span className="text-xs uppercase tracking-widest text-gold-600 font-semibold">
                Boutique Checkout
              </span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-forest-900 mb-1">
              Concierge Order Request
            </h3>
            <p className="text-xs sm:text-sm text-forest-600 font-light leading-relaxed mb-6">
              Please share your contact details. Our atelier will verify fabric availability and arrange direct concierge payment (UPI, Net Banking, or International Wire).
            </p>

            {/* Order Summary Miniature */}
            <div className="bg-ivory-100 rounded-xl p-4 border border-sand mb-6">
              <div className="text-xs uppercase tracking-wider font-semibold text-forest-900 mb-2">
                Order Review ({items.reduce((a, b) => a + b.quantity, 0)} items)
              </div>
              <div className="space-y-1.5 max-h-32 overflow-y-auto text-xs text-forest-700">
                {items.map((it) => (
                  <div key={it.id} className="flex justify-between items-center">
                    <span className="truncate pr-2">
                      {it.quantity}x {it.product.name} ({it.selectedSize})
                    </span>
                    <span className="font-serif font-medium whitespace-nowrap">
                      {formatPrice(it.product.price * it.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-sand/70 pt-2 mt-2 flex justify-between items-center text-sm font-semibold text-forest-900">
                <span>Subtotal (Complimentary Shipping)</span>
                <span className="font-serif text-base">{formatPrice(subtotal)}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-forest-800 mb-1">
                  Recipient Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rohini Pangarkar"
                  value={customer.name}
                  onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-ivory-100 border border-sand rounded-lg text-sm text-forest-900 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-forest-800 mb-1">
                    WhatsApp / Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98230 00000"
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    className="w-full px-4 py-2.5 bg-ivory-100 border border-sand rounded-lg text-sm text-forest-900 focus:outline-none focus:border-gold-500"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-forest-800 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={customer.email}
                    onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-ivory-100 border border-sand rounded-lg text-sm text-forest-900 focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-forest-800 mb-1">
                  Delivery Destination / Address
                </label>
                <textarea
                  rows={2}
                  placeholder="City, State, Postal Code, Country"
                  value={customer.shippingAddress}
                  onChange={(e) => setCustomer({ ...customer, shippingAddress: e.target.value })}
                  className="w-full px-4 py-2 bg-ivory-100 border border-sand rounded-lg text-xs text-forest-900 focus:outline-none focus:border-gold-500"
                />
              </div>

              {/* Technical Transparency Note */}
              <div className="bg-white p-3 rounded-lg border border-gold-300 text-[11px] text-forest-600 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Atelier Policy:</strong> In line with boutique high-touch service, payments and sizing confirmations are finalized directly with our concierge team before dispatch.
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-forest-900 text-ivory-100 text-xs uppercase tracking-[0.2em] font-semibold rounded hover:bg-forest-800 transition-all shadow-md flex items-center justify-center gap-2 border border-forest-800 mt-2"
              >
                <span>Generate Order Review & Connect</span>
                <ArrowRight className="w-4 h-4 text-gold-400" />
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center space-y-4 py-4">
            <div className="w-16 h-16 rounded-full bg-green-100 border border-green-300 text-green-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-forest-900">
              Order Draft Created
            </h3>

            <p className="text-xs sm:text-sm text-forest-600 font-light leading-relaxed">
              Thank you, <strong className="font-medium text-forest-900">{customer.name}</strong>. Your order draft has been logged under reference code:
            </p>

            <div className="bg-ivory-100 p-3 rounded-lg border border-sand font-mono font-bold text-forest-900 text-base">
              {orderRef}
            </div>

            <p className="text-xs text-forest-500 leading-relaxed font-light">
              You may now transmit this order directly to our boutique WhatsApp concierge for priority reservation and personal assistance.
            </p>

            <div className="pt-2 space-y-2">
              <button
                onClick={handleWhatsAppSend}
                className="w-full py-3.5 px-4 bg-[#1E3B2B] text-ivory-100 rounded-lg text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 hover:bg-forest-950 transition-colors shadow-sm"
              >
                <MessageSquare className="w-4 h-4 text-gold-400" />
                <span>Transmit Order to WhatsApp Concierge</span>
              </button>

              <button
                onClick={() => {
                  onOrderCompleted();
                  onClose();
                }}
                className="w-full py-2.5 px-4 text-forest-700 hover:text-forest-900 text-xs uppercase tracking-wider font-medium"
              >
                Close & Clear Bag
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
