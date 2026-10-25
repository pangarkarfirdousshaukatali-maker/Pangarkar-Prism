import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X, ArrowRight, Sparkles } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { ActiveTab } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  cartCount: number;
  openCart: () => void;
  openSearch: () => void;
  onSelectCategory?: (category: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  openCart,
  openSearch,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (tab: ActiveTab) => {
    setMobileMenuOpen(false);
    const paths: Record<ActiveTab, string> = {
      home: '/',
      catalogue: '/catalogue',
      'custom-studio': '/customization',
      about: '/about',
      contact: '/contact',
    };
    if (window.location.pathname !== paths[tab]) {
      window.location.href = paths[tab];
      return;
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Luxury Announcement Bar */}
      <div className="bg-forest-900 text-ivory-200 text-xs py-2 px-4 text-center tracking-widest uppercase border-b border-gold-600/30 font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
          <span className="hidden sm:inline-block text-gold-400">✦</span>
          <span>{siteConfig.announcement.message}</span>
          <span className="hidden sm:inline-block text-gold-400">✦</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-ivory-200/95 backdrop-blur-md shadow-sm border-b border-sand'
            : 'bg-ivory-200 border-b border-sand/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-24">
            
            {/* Mobile Hamburger Button */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-forest-700 hover:text-gold-600 focus:outline-none transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              
              <button
                type="button"
                onClick={openSearch}
                className="p-2 text-forest-700 hover:text-gold-600 focus:outline-none transition-colors ml-1"
                aria-label="Search collection"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Desktop Left Nav Links */}
            <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium tracking-wide">
              <button
                onClick={() => handleNav('home')}
                className={`transition-colors uppercase tracking-wider text-xs pb-1 border-b-2 ${
                  activeTab === 'home'
                    ? 'border-gold-500 text-forest-900 font-semibold'
                    : 'border-transparent text-forest-700 hover:text-gold-600'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => handleNav('catalogue')}
                className={`transition-colors uppercase tracking-wider text-xs pb-1 border-b-2 ${
                  activeTab === 'catalogue'
                    ? 'border-gold-500 text-forest-900 font-semibold'
                    : 'border-transparent text-forest-700 hover:text-gold-600'
                }`}
              >
                Ready-Made
              </button>
              <button
                onClick={() => handleNav('custom-studio')}
                className={`transition-colors uppercase tracking-wider text-xs pb-1 border-b-2 flex items-center gap-1.5 ${
                  activeTab === 'custom-studio'
                    ? 'border-gold-500 text-gold-600 font-semibold'
                    : 'border-transparent text-forest-700 hover:text-gold-600'
                }`}
              >
                <span>Customized</span>
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse"></span>
              </button>
            </nav>

            {/* Brand Logo (Center) */}
            <div className="flex-1 lg:flex-initial flex justify-center items-center">
              <button
                onClick={() => handleNav('home')}
                className="group flex flex-col items-center focus:outline-none text-center py-1"
              >
                {/* Logo Image */}
                <div className="relative h-14 sm:h-16 flex items-center justify-center">
                  <img
                    src={siteConfig.brand.logoUrl}
                    alt={siteConfig.brand.name}
                    className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02] filter drop-shadow-sm"
                  />
                </div>
              </button>
            </div>

            {/* Desktop Right Nav Links & Actions */}
            <div className="flex items-center space-x-6 text-sm font-medium tracking-wide">
              <nav className="hidden lg:flex items-center space-x-8">
                <button
                  onClick={() => handleNav('about')}
                  className={`transition-colors uppercase tracking-wider text-xs pb-1 border-b-2 ${
                    activeTab === 'about'
                      ? 'border-gold-500 text-forest-900 font-semibold'
                      : 'border-transparent text-forest-700 hover:text-gold-600'
                  }`}
                >
                  About Us
                </button>
                <button
                  onClick={() => handleNav('contact')}
                  className={`transition-colors uppercase tracking-wider text-xs pb-1 border-b-2 ${
                    activeTab === 'contact'
                      ? 'border-gold-500 text-forest-900 font-semibold'
                      : 'border-transparent text-forest-700 hover:text-gold-600'
                  }`}
                >
                  Contact
                </button>
              </nav>

              {/* Desktop Search Button */}
              <button
                type="button"
                onClick={openSearch}
                className="hidden lg:flex items-center text-forest-700 hover:text-gold-600 transition-colors p-2"
                aria-label="Search collection"
                title="Search collection"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Shopping Bag Button */}
              <button
                type="button"
                onClick={openCart}
                className="relative p-2 text-forest-800 hover:text-gold-600 transition-colors group flex items-center"
                aria-label={`Shopping bag with ${cartCount} items`}
              >
                <div className="relative">
                  <ShoppingBag className="w-6 h-6 transition-transform group-hover:scale-105" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1.5 bg-forest-900 text-gold-300 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-gold-400 shadow-sm animate-scale-up">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="hidden xl:inline-block ml-2 text-xs uppercase tracking-wider font-semibold text-forest-800">
                  Bag {cartCount > 0 && `(${cartCount})`}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-[112px] bottom-0 bg-ivory-100 z-50 overflow-y-auto border-t border-sand px-6 py-8 flex flex-col justify-between shadow-2xl animate-fade-in">
            <div className="space-y-6">
              <div className="text-center pb-4 border-b border-sand">
                <img
                  src={siteConfig.brand.logoUrl}
                  alt={siteConfig.brand.name}
                  className="h-16 mx-auto object-contain mb-2"
                />
                <p className="text-xs uppercase tracking-widest text-gold-600 font-serif">
                  {siteConfig.brand.tagline}
                </p>
              </div>

              <nav className="flex flex-col space-y-4 text-center">
                <button
                  onClick={() => handleNav('home')}
                  className={`text-base uppercase tracking-wider py-2 font-medium ${
                    activeTab === 'home' ? 'text-gold-600 font-semibold' : 'text-forest-800'
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => handleNav('catalogue')}
                  className={`text-base uppercase tracking-wider py-2 font-medium ${
                    activeTab === 'catalogue' ? 'text-gold-600 font-semibold' : 'text-forest-800'
                  }`}
                >
                  Ready-Made Collection
                </button>
                <button
                  onClick={() => handleNav('custom-studio')}
                  className={`text-base uppercase tracking-wider py-2 font-medium flex items-center justify-center gap-2 ${
                    activeTab === 'custom-studio' ? 'text-gold-600 font-semibold' : 'text-forest-800'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-gold-500" />
                  <span>Customized Creations</span>
                </button>
                <button
                  onClick={() => handleNav('about')}
                  className={`text-base uppercase tracking-wider py-2 font-medium ${
                    activeTab === 'about' ? 'text-gold-600 font-semibold' : 'text-forest-800'
                  }`}
                >
                  Brand Story & Heritage
                </button>
                <button
                  onClick={() => handleNav('contact')}
                  className={`text-base uppercase tracking-wider py-2 font-medium ${
                    activeTab === 'contact' ? 'text-gold-600 font-semibold' : 'text-forest-800'
                  }`}
                >
                  Contact & Atelier
                </button>
              </nav>

              <div className="pt-4 border-t border-sand text-center">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openCart();
                  }}
                  className="w-full py-3 bg-forest-900 text-ivory-100 uppercase tracking-widest text-xs font-semibold rounded flex items-center justify-center gap-2 shadow-md hover:bg-forest-800 transition-colors"
                >
                  <ShoppingBag className="w-4 h-4 text-gold-400" />
                  <span>View Shopping Bag ({cartCount})</span>
                </button>
              </div>
            </div>

            <div className="pt-8 text-center text-xs text-forest-500 space-y-2">
              <p>{siteConfig.contact.hours}</p>
              <p className="text-gold-600 font-medium">{siteConfig.contact.phone}</p>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
