import React from 'react';
import { ArrowUp, Sparkles, Instagram, Facebook, Globe, Shield, FileText } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { ActiveTab } from '../types';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenPrivacyPolicy: () => void;
  onOpenTerms: () => void;
  onOpenBespokePolicy: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setActiveTab,
  onOpenPrivacyPolicy,
  onOpenTerms,
  onOpenBespokePolicy,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-forest-950 text-ivory-100 pt-16 pb-12 border-t border-gold-600/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-forest-800">
          
          {/* Column 1: Brand Wordmark & Description */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="h-16 flex items-center">
                <img
                  src={siteConfig.brand.logoUrl}
                  alt={siteConfig.brand.name}
                  className="h-full w-auto object-contain brightness-105"
                />
              </div>
            </div>

            <p className="text-xs sm:text-sm text-ivory-300 font-light leading-relaxed max-w-sm">
              {siteConfig.brand.positioning}
            </p>

            <div className="text-xs tracking-widest uppercase text-gold-400 font-medium">
              {siteConfig.brand.tagline}
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4 pt-2">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-forest-900 border border-forest-700 flex items-center justify-center text-ivory-200 hover:text-gold-400 hover:border-gold-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-forest-900 border border-forest-700 flex items-center justify-center text-ivory-200 hover:text-gold-400 hover:border-gold-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-forest-900 border border-forest-700 flex items-center justify-center text-ivory-200 hover:text-gold-400 hover:border-gold-500 transition-colors"
                aria-label="WhatsApp Concierge"
              >
                <Sparkles className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-gold-400">
              The Boutique
            </h4>
            <ul className="space-y-2.5 text-xs text-ivory-300">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-gold-300 transition-colors"
                >
                  Home & Curations
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('catalogue')}
                  className="hover:text-gold-300 transition-colors"
                >
                  Ready-Made Catalogue
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('custom-studio')}
                  className="hover:text-gold-300 transition-colors flex items-center gap-1.5"
                >
                  <span>Customized Creations</span>
                  <span className="text-[10px] text-gold-400 bg-gold-950 px-1.5 py-0.2 rounded border border-gold-700">Studio</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-gold-300 transition-colors"
                >
                  Brand Heritage & Craft Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-gold-300 transition-colors"
                >
                  Atelier & Consultations
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Atelier Info */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-gold-400">
              Atelier & Inquiries
            </h4>
            <div className="text-xs text-ivory-300 space-y-2 leading-relaxed font-light">
              <p>
                <strong className="text-ivory-100 font-medium block">Studio Address:</strong>
                {siteConfig.contact.studioAddress}
              </p>
              <p>
                <strong className="text-ivory-100 font-medium block">Hours:</strong>
                {siteConfig.contact.hours}
              </p>
              <p>
                <strong className="text-ivory-100 font-medium block">Concierge Desk:</strong>
                <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-gold-300">
                  {siteConfig.contact.phone}
                </a>
              </p>
              <p>
                <strong className="text-ivory-100 font-medium block">Email:</strong>
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-gold-300">
                  {siteConfig.contact.email}
                </a>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-ivory-400 gap-4">
          <p>
            © {new Date().getFullYear()} {siteConfig.brand.name}. All rights reserved.
          </p>

          <div className="flex items-center space-x-6">
            <button
              onClick={onOpenPrivacyPolicy}
              className="hover:text-gold-300 transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={onOpenTerms}
              className="hover:text-gold-300 transition-colors"
            >
              Terms & Conditions
            </button>
            <button
              onClick={onOpenBespokePolicy}
              className="hover:text-gold-300 transition-colors text-gold-400"
            >
              Bespoke Craft Policy
            </button>
            <button
              onClick={scrollToTop}
              className="p-2 rounded bg-forest-900 border border-forest-800 text-ivory-300 hover:text-gold-300 transition-colors ml-2"
              title="Return to top"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
