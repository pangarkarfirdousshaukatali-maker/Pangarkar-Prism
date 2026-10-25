import React from 'react';
import { CheckCircle2, Sparkles, MessageSquare, Mail, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { CustomEnquiryForm } from '../types';
import { siteConfig } from '../data/siteConfig';

interface EnquirySuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  enquiryData: CustomEnquiryForm | null;
  orderReference: string;
}

export const EnquirySuccessModal: React.FC<EnquirySuccessModalProps> = ({
  isOpen,
  onClose,
  enquiryData,
  orderReference,
}) => {
  if (!isOpen || !enquiryData) return null;

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `Hello Pangarkar Prism Boutique,\n\nI have submitted a bespoke customization enquiry.\n*Reference ID:* ${orderReference}\n*Client:* ${enquiryData.customerName}\n*Category:* ${enquiryData.category}\n*Silhouette:* ${enquiryData.silhouette}\n*Fabric:* ${enquiryData.fabric}\n*Color:* ${enquiryData.color}\n${enquiryData.monogramText ? `*Monogram:* ${enquiryData.monogramText}\n` : ''}\nLooking forward to hearing from your concierge team!`
    );
    window.open(`https://wa.me/919823045678?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div 
        className="relative bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-sand"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-forest-400 hover:text-forest-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-4">
          
          {/* Success Badge */}
          <div className="w-16 h-16 rounded-full bg-gold-50 border border-gold-300 text-gold-600 flex items-center justify-center mx-auto shadow-sm">
            <Sparkles className="w-8 h-8 text-gold-600" />
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl text-forest-900">
            Enquiry Received With Pleasure
          </h3>

          <p className="text-xs sm:text-sm text-forest-600 font-light leading-relaxed">
            Thank you, <strong className="font-medium text-forest-900">{enquiryData.customerName}</strong>. Your bespoke requirements have been cataloged in our atelier queue.
          </p>

          {/* Reference ID Card */}
          <div className="bg-ivory-100 rounded-xl p-4 border border-sand text-left space-y-2">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-sand/70">
              <span className="text-forest-500 uppercase tracking-wider font-semibold text-[10px]">
                Atelier Reference Code
              </span>
              <span className="font-mono font-bold text-forest-900 text-sm">
                {orderReference}
              </span>
            </div>

            <div className="text-xs text-forest-700 space-y-1 pt-1 font-light">
              <p><strong className="font-medium">Category:</strong> {enquiryData.category}</p>
              <p><strong className="font-medium">Silhouette:</strong> {enquiryData.silhouette}</p>
              <p><strong className="font-medium">Fabric & Color:</strong> {enquiryData.fabric} ({enquiryData.color})</p>
              {enquiryData.monogramText && (
                <p><strong className="font-medium">Custom Monogram:</strong> &ldquo;{enquiryData.monogramText}&rdquo;</p>
              )}
            </div>
          </div>

          {/* Clear Next Steps Notice */}
          <div className="text-[11px] text-forest-500 leading-relaxed bg-white p-3 rounded-lg border border-sand/70 text-left flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Next Atelier Step:</strong> Our bespoke team will review your pattern drafting and fabric requirements. We will contact you via {enquiryData.preferredContact} within 24 hours to confirm final measurements, quotation, and crafting timeline.
            </span>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 space-y-2.5">
            <button
              onClick={handleWhatsAppShare}
              className="w-full py-3.5 px-4 bg-[#1E3B2B] text-ivory-100 rounded-lg text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 hover:bg-forest-950 transition-colors shadow-sm"
            >
              <MessageSquare className="w-4 h-4 text-gold-400" />
              <span>Connect Immediately on WhatsApp</span>
            </button>

            <button
              onClick={onClose}
              className="w-full py-3 px-4 bg-ivory-100 border border-sand text-forest-800 rounded-lg text-xs uppercase tracking-wider font-semibold hover:bg-sand/60 transition-colors"
            >
              Return to Boutique Collections
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
