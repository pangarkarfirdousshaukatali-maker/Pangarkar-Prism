import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ShoppingCategories } from './components/ShoppingCategories';
import { FeaturedCollection } from './components/FeaturedCollection';
import { BrandStory } from './components/BrandStory';
import { ProductCatalog } from './components/ProductCatalog';
import { CustomizationStudio } from './components/CustomizationStudio';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { EnquirySuccessModal } from './components/EnquirySuccessModal';
import { CheckoutModal } from './components/CheckoutModal';
import { PolicyModal } from './components/PolicyModal';
import { AdminPortal } from './components/AdminPortal';

import { products as defaultProducts } from './data/products';
import { siteConfig as defaultSiteConfig } from './data/siteConfig';
import { 
  Product, 
  ProductCategory, 
  CartItem, 
  CustomEnquiryForm, 
  ActiveTab, 
  ProductColor 
} from './types';
import { Edit3 } from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Live editable Site Config with LocalStorage persistence
  const [siteData, setSiteData] = useState(() => {
    try {
      const saved = localStorage.getItem('ppb_custom_site_config');
      return saved ? JSON.parse(saved) : defaultSiteConfig;
    } catch {
      return defaultSiteConfig;
    }
  });

  // Live editable Products with LocalStorage persistence
  const [productList, setProductList] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('ppb_custom_products');
      return saved ? JSON.parse(saved) : defaultProducts;
    } catch {
      return defaultProducts;
    }
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);

  useEffect(() => {
    const checkAdmin = () => {
      const params = new URLSearchParams(window.location.search);
      const isQueryAdmin = params.get('admin') === 'true' || params.get('mode') === 'admin';
      const isHashAdmin = window.location.hash.toLowerCase() === '#admin';
      
      if (isQueryAdmin || isHashAdmin) {
        setIsAdminMode(true);
        // Optionally auto-open editor if requested
        if (params.get('open') === 'true') {
          setIsAdminOpen(true);
        }
      } else {
        setIsAdminMode(false);
      }
    };

    checkAdmin();
    window.addEventListener('popstate', checkAdmin);
    window.addEventListener('hashchange', checkAdmin);
    return () => {
      window.removeEventListener('popstate', checkAdmin);
      window.removeEventListener('hashchange', checkAdmin);
    };
  }, []);

  // Cart State with LocalStorage persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ppb_boutique_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ppb_boutique_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [cart]);

  const handleSaveSiteData = (newData: any) => {
    setSiteData(newData);
    localStorage.setItem('ppb_custom_site_config', JSON.stringify(newData));
  };

  const handleSaveProductList = (newProducts: Product[]) => {
    setProductList(newProducts);
    localStorage.setItem('ppb_custom_products', JSON.stringify(newProducts));
  };

  const handleResetToDefaults = () => {
    if (confirm('Are you sure you want to reset all info and products back to the original boutique defaults?')) {
      setSiteData(defaultSiteConfig);
      setProductList(defaultProducts);
      localStorage.removeItem('ppb_custom_site_config');
      localStorage.removeItem('ppb_custom_products');
    }
  };

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [policyType, setPolicyType] = useState<'privacy' | 'terms' | 'bespoke' | null>(null);

  // Enquiry Success
  const [enquirySuccessData, setEnquirySuccessData] = useState<CustomEnquiryForm | null>(null);
  const [enquiryReference, setEnquiryReference] = useState('');

  // Catalogue filters when navigating from other sections
  const [catalogueTypeFilter, setCatalogueTypeFilter] = useState<'all' | 'ready-made' | 'customized'>('all');
  const [preselectedStudioCat, setPreselectedStudioCat] = useState<ProductCategory | undefined>(undefined);

  // Navigation handlers
  const handleExploreReadyMade = () => {
    setCatalogueTypeFilter('ready-made');
    setActiveTab('catalogue');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreCustomized = () => {
    setCatalogueTypeFilter('customized');
    setActiveTab('custom-studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const handleAddToCart = (
    product: Product,
    selectedSize: string,
    selectedColor?: ProductColor,
    monogramText?: string,
    customNotes?: string
  ) => {
    const colorKey = selectedColor ? selectedColor.name : 'default';
    const monoKey = monogramText || '';
    const noteKey = customNotes || '';
    const cartItemId = `${product.id}-${selectedSize}-${colorKey}-${monoKey}-${noteKey}`;

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === cartItemId);
      if (existing) {
        return prevCart.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [
          ...prevCart,
          {
            id: cartItemId,
            product,
            quantity: 1,
            selectedSize,
            selectedColor: selectedColor || product.colors[0],
            monogramText,
            customNotes,
          },
        ];
      }
    });

    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const handleOrderCompleted = () => {
    setCart([]);
  };

  // Bespoke Enquiry submission
  const handleSubmitEnquiry = (enquiry: CustomEnquiryForm) => {
    const refCode = `PPB-ATELIER-${Math.floor(10000 + Math.random() * 90000)}`;
    setEnquiryReference(refCode);
    setEnquirySuccessData(enquiry);
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-ivory-200 text-forest font-sans selection:bg-gold-200 selection:text-forest-900 relative">
      
      {/* OWNER ONLY: Visual Editor Control Bar (Only visible via secret admin link) */}
      {isAdminMode && (
        <div className="fixed bottom-6 left-6 z-40 print:hidden animate-fade-in">
          <div className="bg-forest-950/95 backdrop-blur-md text-ivory-100 p-2 rounded-2xl shadow-2xl border border-gold-400 flex items-center gap-2">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="bg-gold-500 hover:bg-gold-600 text-forest-950 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all"
              title="Open Visual Editor"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Owner Mode: Edit Details</span>
            </button>

            <button
              onClick={() => {
                window.location.href = window.location.origin + window.location.pathname;
              }}
              className="text-[11px] text-ivory-300 hover:text-red-400 px-2 py-1 transition-colors"
              title="Exit Owner Mode and see the customer view"
            >
              Exit
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={totalCartCount}
        openCart={() => setIsCartOpen(true)}
        openSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Content Area depending on Active Tab */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            {/* 1. Hero Section */}
            <HeroSection
              onExploreReadyMade={handleExploreReadyMade}
              onCreateYourOwn={handleExploreCustomized}
            />

            {/* 2. Shopping Categories (Ready-Made vs Customized Cards) */}
            <ShoppingCategories
              onExploreReadyMade={handleExploreReadyMade}
              onExploreCustomized={handleExploreCustomized}
            />

            {/* 3. Featured Collection Grid */}
            <FeaturedCollection
              products={productList}
              onSelectProduct={(p) => setSelectedProduct(p)}
              onAddToCart={(p, size) => handleAddToCart(p, size)}
              onNavigateToCatalogue={() => {
                setCatalogueTypeFilter('all');
                setActiveTab('catalogue');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onNavigateToStudio={() => {
                setActiveTab('custom-studio');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* 4. Brand Story Section */}
            <BrandStory />

            {/* 5. Contact Section */}
            <ContactSection />
          </>
        )}

        {activeTab === 'catalogue' && (
          <ProductCatalog
            products={productList}
            initialTypeFilter={catalogueTypeFilter}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onAddToCart={(p, size) => handleAddToCart(p, size)}
            onNavigateToStudio={() => {
              setActiveTab('custom-studio');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'custom-studio' && (
          <CustomizationStudio
            onSubmitEnquiry={handleSubmitEnquiry}
            preselectedCategory={preselectedStudioCat}
          />
        )}

        {activeTab === 'about' && (
          <div className="py-12">
            <BrandStory />
            <ContactSection />
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="py-8">
            <ContactSection />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenPrivacyPolicy={() => setPolicyType('privacy')}
        onOpenTerms={() => setPolicyType('terms')}
        onOpenBespokePolicy={() => setPolicyType('bespoke')}
      />

      {/* --- Modals & Drawers --- */}

      {/* Live Admin / Boutique Editor Portal */}
      <AdminPortal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        siteData={siteData}
        onSaveSiteData={handleSaveSiteData}
        productList={productList}
        onSaveProductList={handleSaveProductList}
        onResetToDefaults={handleResetToDefaults}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onOpenCustomStudio={(cat) => {
          setSelectedProduct(null);
          setPreselectedStudioCat(cat);
          setActiveTab('custom-studio');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Quick Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={productList}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* Custom Enquiry Success Modal */}
      <EnquirySuccessModal
        isOpen={!!enquirySuccessData}
        onClose={() => setEnquirySuccessData(null)}
        enquiryData={enquirySuccessData}
        orderReference={enquiryReference}
      />

      {/* Concierge Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* Legal & Policy Modals */}
      <PolicyModal
        type={policyType}
        onClose={() => setPolicyType(null)}
      />

    </div>
  );
};
