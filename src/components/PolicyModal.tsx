import React from 'react';
import { X, Shield, FileText, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

interface PolicyModalProps {
  type: 'privacy' | 'terms' | 'bespoke' | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div 
        className="relative bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-sand my-8 max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-forest-400 hover:text-forest-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {type === 'privacy' && (
          <div className="space-y-4">
            <h3 className="font-serif text-2xl text-forest-900 border-b border-sand pb-3">
              Privacy Policy
            </h3>
            <div className="text-xs sm:text-sm text-forest-600 space-y-3 font-light leading-relaxed">
              <p>
                At {siteConfig.brand.name}, we value and respect your privacy. Personal information collected during consultations, measurement bookings, and bespoke inquiries is handled with absolute confidentiality.
              </p>
              <h4 className="font-medium text-forest-900 text-sm">Information We Collect</h4>
              <p>
                We collect names, contact coordinates (email and WhatsApp numbers), delivery addresses, and personal garment measurements strictly for fulfilling orders and tailoring consultations.
              </p>
              <h4 className="font-medium text-forest-900 text-sm">Data Protection</h4>
              <p>
                We do not sell, rent, or trade your personal data to any external marketing agencies. Your custom monogram designs and sizing details remain securely archived in our private atelier archives.
              </p>
            </div>
          </div>
        )}

        {type === 'terms' && (
          <div className="space-y-4">
            <h3 className="font-serif text-2xl text-forest-900 border-b border-sand pb-3">
              Terms & Conditions
            </h3>
            <div className="text-xs sm:text-sm text-forest-600 space-y-3 font-light leading-relaxed">
              <p>
                Welcome to {siteConfig.brand.name}. By browsing or commissioning creations from our boutique, you agree to our service terms.
              </p>
              <h4 className="font-medium text-forest-900 text-sm">Artisanal Variations</h4>
              <p>
                Because our creations incorporate authentic hand-spun silks, organic dye baths, handloom weaves, and zardozi needlework, slight natural variations in texture, slubs, and finish are signatures of genuine human craftsmanship rather than imperfections.
              </p>
              <h4 className="font-medium text-forest-900 text-sm">Pricing & Availability</h4>
              <p>
                Prices are listed in Indian Rupees (INR) and include luxury artisan taxes. Quotes for bespoke orders remain valid for 14 calendar days from date of consultation.
              </p>
            </div>
          </div>
        )}

        {type === 'bespoke' && (
          <div className="space-y-4">
            <h3 className="font-serif text-2xl text-forest-900 border-b border-sand pb-3">
              Bespoke Craft Policy & Lead Times
            </h3>
            <div className="text-xs sm:text-sm text-forest-600 space-y-3 font-light leading-relaxed">
              <p>
                Bespoke garments are individual works of art drafted and woven exclusively for you.
              </p>
              <h4 className="font-medium text-forest-900 text-sm">Confirmation Protocol</h4>
              <p>
                Every customization request undergoes technical pattern review and fabric availability checks. An order is finalized only after our atelier team confirms exact measurements, swatch tone, monogram spelling, and delivery schedule with you.
              </p>
              <h4 className="font-medium text-forest-900 text-sm">Lead Times & Fittings</h4>
              <p>
                Standard bespoke commissions require 2 to 4 weeks depending on hand-embroidery density. We provide complimentary virtual fitting sessions and up to two minor alteration revisions upon delivery to ensure flawless fit.
              </p>
            </div>
          </div>
        )}

        <div className="pt-6 border-t border-sand mt-6 text-right">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-forest-900 text-ivory-100 text-xs uppercase tracking-wider font-semibold rounded hover:bg-forest-800 transition-colors"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
