import React, { useState } from 'react';
import { Phone, Mail, Clock, Send, MessageSquare, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

export const ContactSection: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'Private Boutique Consultation',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setFormSubmitted(true);
  };

  const openWhatsApp = () => {
    const encoded = encodeURIComponent(
      `Hello Pangarkar Prism Boutique, I would like to inquire about your handcrafted collections and appointment booking.`
    );
    window.open(`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${encoded}`, '_blank');
  };

  return (
    <section className="py-20 sm:py-28 bg-ivory-200 border-b border-sand/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-gold-600 font-semibold mb-2">
            Connect & Create
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-forest-900 tracking-tight">
            The Pangarkar Prism Atelier
          </h2>
          <div className="prism-divider w-40 mx-auto my-4">
            <span className="text-gold-500 text-xs">▲</span>
          </div>
          <p className="text-sm sm:text-base text-forest-600 font-light">
            Schedule an appointment, start a virtual consultation, or discuss your bespoke design requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Atelier Contact Details & Direct Concierge */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-2xl border border-sand p-8 shadow-sm space-y-6">
              
              <h3 className="font-serif text-2xl text-forest-900 mb-6">
                Boutique Information
              </h3>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-ivory-200 border border-gold-300 flex items-center justify-center text-gold-600 flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-forest-900 mb-1">
                    Appointment Timings
                  </h4>
                  <p className="text-xs sm:text-sm text-forest-600 leading-relaxed font-light">
                    {siteConfig.contact.hours}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-ivory-200 border border-gold-300 flex items-center justify-center text-gold-600 flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-forest-900 mb-1">
                    Telephone Concierge
                  </h4>
                  <p className="text-xs sm:text-sm text-forest-600 font-light">
                    {siteConfig.contact.phone}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-ivory-200 border border-gold-300 flex items-center justify-center text-gold-600 flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-forest-900 mb-1">
                    Direct Email
                  </h4>
                  <p className="text-xs sm:text-sm text-forest-600 font-light">
                    {siteConfig.contact.email || 'Official email coming soon'}
                  </p>
                </div>
              </div>

              {/* WhatsApp Concierge Action Card */}
              <div className="pt-4 border-t border-sand">
                <button
                  type="button"
                  onClick={openWhatsApp}
                  className="w-full py-3.5 px-4 bg-[#1E3B2B] text-ivory-100 rounded-lg text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2.5 hover:bg-forest-950 transition-colors shadow-sm"
                >
                  <MessageSquare className="w-4 h-4 text-gold-400" />
                  <span>Chat on WhatsApp Concierge</span>
                </button>
              </div>

            </div>
          </div>

          {/* Contact & Appointment Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-sand p-8 sm:p-10 shadow-sm">
              <h3 className="font-serif text-2xl sm:text-3xl text-forest-900 mb-2">
                Request a Consultation or Enquiry
              </h3>
              <p className="text-xs sm:text-sm text-forest-600 font-light leading-relaxed mb-8">
                Please complete the form below. Our boutique concierge will respond within 24 hours to confirm your appointment or answer your questions.
              </p>

              {formSubmitted ? (
                <div className="bg-ivory-100 border border-gold-400 rounded-xl p-8 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-green-100 border border-green-300 text-green-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-2xl text-forest-900">
                    Thank You, {formData.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-forest-600 font-light max-w-md mx-auto leading-relaxed">
                    Your inquiry has been received by our atelier concierge. We look forward to conversing with you shortly.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        inquiryType: 'Private Boutique Consultation',
                        message: '',
                      });
                    }}
                    className="px-6 py-2.5 bg-forest-900 text-ivory-100 text-xs uppercase tracking-wider font-semibold rounded hover:bg-forest-800 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-forest-800 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 bg-ivory-100 border border-sand rounded-lg text-sm text-forest-900 focus:outline-none focus:border-gold-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-forest-800 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="yourname@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 bg-ivory-100 border border-sand rounded-lg text-sm text-forest-900 focus:outline-none focus:border-gold-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-forest-800 mb-1">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        placeholder="9892924721"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 bg-ivory-100 border border-sand rounded-lg text-sm text-forest-900 focus:outline-none focus:border-gold-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-forest-800 mb-1">
                        Inquiry Nature
                      </label>
                      <select
                        value={formData.inquiryType}
                        onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                        className="w-full px-4 py-2.5 bg-ivory-100 border border-sand rounded-lg text-sm text-forest-900 focus:outline-none focus:border-gold-500"
                      >
                        <option value="Private Boutique Consultation">Private Studio Consultation</option>
                        <option value="Bespoke Bridal Trousseau">Bespoke Bridal Trousseau</option>
                        <option value="Custom Monogram Inquiry">Custom Monogram Inquiry</option>
                        <option value="International Order / Delivery">International Delivery Inquiry</option>
                        <option value="General Question">General Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-forest-800 mb-1">
                      Your Message or Occasion Details
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Share details regarding your preferred dates, desired outfits, or custom requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 bg-ivory-100 border border-sand rounded-lg text-sm text-forest-900 focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-4 bg-forest-900 text-ivory-100 text-xs uppercase tracking-[0.2em] font-semibold rounded hover:bg-forest-800 transition-all shadow-md flex items-center justify-center gap-3 border border-forest-800"
                  >
                    <Send className="w-4 h-4 text-gold-400" />
                    <span>Submit Atelier Request</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
