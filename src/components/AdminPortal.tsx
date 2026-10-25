import React, { useState } from 'react';
import { 
  Settings, 
  Save, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  RotateCcw, 
  ShoppingBag, 
  Phone, 
  FileText, 
  Printer, 
  X,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { Product, ProductCategory, ProductType } from '../types';
import { productCategories } from '../data/products';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
  siteData: any;
  onSaveSiteData: (updatedData: any) => void;
  productList: Product[];
  onSaveProductList: (updatedProducts: Product[]) => void;
  onResetToDefaults: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  isOpen,
  onClose,
  siteData,
  onSaveSiteData,
  productList,
  onSaveProductList,
  onResetToDefaults,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'info' | 'products'>('info');
  const [formData, setFormData] = useState(JSON.parse(JSON.stringify(siteData)));
  const [editableProducts, setEditableProducts] = useState<Product[]>(
    JSON.parse(JSON.stringify(productList))
  );
  const [selectedProductId, setSelectedProductId] = useState<string>(
    productList[0]?.id || ''
  );
  const [saveToast, setSaveToast] = useState(false);

  // Selected product being edited
  const currentProduct = editableProducts.find((p) => p.id === selectedProductId);

  const handleInfoChange = (section: string, field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleProductFieldChange = (field: keyof Product, value: any) => {
    setEditableProducts((prev) =>
      prev.map((p) => (p.id === selectedProductId ? { ...p, [field]: value } : p))
    );
  };

  const handleAddNewProduct = () => {
    const newId = `prod-${Date.now()}`;
    const newProduct: Product = {
      id: newId,
      name: 'New Boutique Creation',
      type: 'ready-made',
      category: 'Sarees & Drapes',
      price: 15000,
      shortDescription: 'Handcrafted pure artisan textile with delicate detailing.',
      description: 'Exclusive boutique piece crafted with time-honored artisanal precision.',
      images: [
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
      ],
      sizes: ['Standard'],
      colors: [{ name: 'Deep Forest', hex: '#243323' }],
      leadTime: 'Ready to Ship • Dispatches in 24 Hours',
      craftsmanshipDetails: ['100% Pure Certified Silk', 'Hand-finished borders'],
      fabricCare: ['Dry Clean Only'],
      isFeatured: true,
    };
    setEditableProducts([newProduct, ...editableProducts]);
    setSelectedProductId(newId);
  };

  const handleDeleteProduct = (id: string) => {
    if (editableProducts.length <= 1) {
      alert('You must have at least one product in your catalogue.');
      return;
    }
    const filtered = editableProducts.filter((p) => p.id !== id);
    setEditableProducts(filtered);
    setSelectedProductId(filtered[0]?.id || '');
  };

  const handleSaveAll = () => {
    onSaveSiteData(formData);
    onSaveProductList(editableProducts);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const handlePrintSummary = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div 
        className="relative bg-white rounded-2xl max-w-5xl w-full shadow-2xl border border-sand my-6 flex flex-col max-h-[92vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="p-5 sm:p-6 bg-forest-950 text-ivory-100 flex items-center justify-between border-b border-gold-600/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-forest-900 border border-gold-400/50 flex items-center justify-center text-gold-400">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl text-ivory-100 tracking-tight flex items-center gap-2">
                <span>Pangarkar Prism Live Boutique Editor</span>
                <span className="text-[10px] bg-gold-500 text-forest-950 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  Live
                </span>
              </h2>
              <p className="text-xs text-ivory-300 font-light">
                Edit boutique details, phone numbers, WhatsApp, and products here. Changes update on the website immediately!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrintSummary}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded bg-forest-900 border border-forest-700 text-xs text-gold-300 hover:text-white transition-colors"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Save as PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-ivory-400 hover:text-white transition-colors"
              aria-label="Close Editor"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center justify-between px-6 pt-4 pb-2 bg-ivory-100 border-b border-sand">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('info')}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-lg transition-all ${
                activeTab === 'info'
                  ? 'bg-forest-900 text-ivory-100 shadow-sm'
                  : 'bg-white text-forest-700 hover:bg-ivory-200 border border-sand'
              }`}
            >
              1. Boutique Info & Contact Details
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-lg transition-all ${
                activeTab === 'products'
                  ? 'bg-forest-900 text-ivory-100 shadow-sm'
                  : 'bg-white text-forest-700 hover:bg-ivory-200 border border-sand'
              }`}
            >
              2. Product Catalogue & Prices ({editableProducts.length})
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveAll}
              className="px-5 py-2 bg-gold-500 hover:bg-gold-600 text-white text-xs uppercase tracking-wider font-bold rounded-lg shadow-md flex items-center gap-2 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Apply Changes Live</span>
            </button>
          </div>
        </div>

        {/* Success Alert Toast */}
        {saveToast && (
          <div className="bg-green-700 text-white text-xs font-semibold py-2.5 px-6 flex items-center justify-center gap-2 animate-fade-in shadow-inner">
            <CheckCircle2 className="w-4 h-4" />
            <span>Success! All changes have been applied live to your website.</span>
          </div>
        )}

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-ivory-50 space-y-6">
          
          {/* TAB 1: Boutique Info & Contact Form */}
          {activeTab === 'info' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              
              {/* Brand Details */}
              <div className="bg-white p-6 rounded-xl border border-sand shadow-sm">
                <h3 className="font-serif text-lg text-forest-900 mb-4 pb-2 border-b border-sand">
                  Brand Identity & Taglines
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-forest-800 mb-1">
                      Brand Name:
                    </label>
                    <input
                      type="text"
                      value={formData.brand.name}
                      onChange={(e) => handleInfoChange('brand', 'name', e.target.value)}
                      className="w-full px-3 py-2 bg-ivory-100 border border-sand rounded text-xs text-forest-900 focus:outline-none focus:border-gold-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-forest-800 mb-1">
                      Brand Tagline:
                    </label>
                    <input
                      type="text"
                      value={formData.brand.tagline}
                      onChange={(e) => handleInfoChange('brand', 'tagline', e.target.value)}
                      className="w-full px-3 py-2 bg-ivory-100 border border-sand rounded text-xs text-forest-900 focus:outline-none focus:border-gold-500"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-xs uppercase tracking-wider font-semibold text-forest-800 mb-1">
                    Top Announcement Banner Message:
                  </label>
                  <input
                    type="text"
                    value={formData.announcement.message}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        announcement: { message: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 bg-ivory-100 border border-sand rounded text-xs text-forest-900 focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              {/* Contact Information & WhatsApp */}
              <div className="bg-white p-6 rounded-xl border border-sand shadow-sm">
                <h3 className="font-serif text-lg text-forest-900 mb-4 pb-2 border-b border-sand">
                  Boutique Studio Coordinates & Customer Concierge
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-forest-800 mb-1">
                      WhatsApp Number (Used for Customer Orders):
                    </label>
                    <input
                      type="text"
                      value={formData.contact.whatsapp}
                      onChange={(e) => handleInfoChange('contact', 'whatsapp', e.target.value)}
                      className="w-full px-3 py-2 bg-ivory-100 border border-sand rounded text-xs text-forest-900 focus:outline-none focus:border-gold-500 font-mono"
                    />
                    <p className="text-[11px] text-forest-500 mt-1">
                      Customers who click &quot;Chat on WhatsApp&quot; or submit orders will connect here.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-forest-800 mb-1">
                      Display Phone Number:
                    </label>
                    <input
                      type="text"
                      value={formData.contact.phone}
                      onChange={(e) => handleInfoChange('contact', 'phone', e.target.value)}
                      className="w-full px-3 py-2 bg-ivory-100 border border-sand rounded text-xs text-forest-900 focus:outline-none focus:border-gold-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-forest-800 mb-1">
                      Concierge Email:
                    </label>
                    <input
                      type="email"
                      value={formData.contact.email}
                      onChange={(e) => handleInfoChange('contact', 'email', e.target.value)}
                      className="w-full px-3 py-2 bg-ivory-100 border border-sand rounded text-xs text-forest-900 focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-forest-800 mb-1">
                      Appointment Timings:
                    </label>
                    <input
                      type="text"
                      value={formData.contact.hours}
                      onChange={(e) => handleInfoChange('contact', 'hours', e.target.value)}
                      className="w-full px-3 py-2 bg-ivory-100 border border-sand rounded text-xs text-forest-900 focus:outline-none focus:border-gold-500"
                    />
                  </div>
                </div>

              </div>

              {/* Social Media Links */}
              <div className="bg-white p-6 rounded-xl border border-sand shadow-sm">
                <h3 className="font-serif text-lg text-forest-900 mb-4 pb-2 border-b border-sand">
                  Social Media Links
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-forest-800 mb-1">
                      Instagram Profile URL:
                    </label>
                    <input
                      type="text"
                      value={formData.social.instagram}
                      onChange={(e) => handleInfoChange('social', 'instagram', e.target.value)}
                      className="w-full px-3 py-2 bg-ivory-100 border border-sand rounded text-xs text-forest-900 focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-forest-800 mb-1">
                      Pinterest Profile URL:
                    </label>
                    <input
                      type="text"
                      value={formData.social.pinterest}
                      onChange={(e) => handleInfoChange('social', 'pinterest', e.target.value)}
                      className="w-full px-3 py-2 bg-ivory-100 border border-sand rounded text-xs text-forest-900 focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-forest-800 mb-1">
                      Facebook Page URL:
                    </label>
                    <input
                      type="text"
                      value={formData.social.facebook}
                      onChange={(e) => handleInfoChange('social', 'facebook', e.target.value)}
                      className="w-full px-3 py-2 bg-ivory-100 border border-sand rounded text-xs text-forest-900 focus:outline-none focus:border-gold-500"
                    />
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: Product Catalogue Manager */}
          {activeTab === 'products' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Product List Sidebar */}
              <div className="lg:col-span-4 bg-white p-4 rounded-xl border border-sand shadow-sm flex flex-col max-h-[600px]">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-sand">
                  <span className="text-xs uppercase tracking-wider font-semibold text-forest-900">
                    Products ({editableProducts.length})
                  </span>
                  <button
                    onClick={handleAddNewProduct}
                    className="px-2.5 py-1 bg-forest-900 text-ivory-100 text-[11px] uppercase tracking-wider font-semibold rounded flex items-center gap-1 hover:bg-forest-800"
                  >
                    <Plus className="w-3.5 h-3.5 text-gold-400" />
                    <span>Add New</span>
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                  {editableProducts.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => setSelectedProductId(p.id)}
                      className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all flex items-center gap-3 ${
                        p.id === selectedProductId
                          ? 'border-gold-500 bg-gold-50/60 ring-1 ring-gold-500'
                          : 'border-sand hover:bg-ivory-100'
                      }`}
                    >
                      <img
                        src={p.images[0]}
                        alt=""
                        className="w-10 h-12 object-cover rounded bg-ivory-200 border border-sand flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-forest-900 truncate">
                          {p.name}
                        </p>
                        <p className="text-[11px] text-forest-500">
                          ₹{p.price.toLocaleString('en-IN')} •{' '}
                          <span className={p.type === 'customized' ? 'text-gold-700 font-medium' : ''}>
                            {p.type === 'customized' ? 'Bespoke' : 'Ready'}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Editor Details Form */}
              <div className="lg:col-span-8 bg-white p-6 rounded-xl border border-sand shadow-sm space-y-4">
                {currentProduct ? (
                  <>
                    <div className="flex items-center justify-between pb-3 border-b border-sand">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-gold-600 font-bold">
                          Editing Product
                        </span>
                        <h4 className="font-serif text-xl text-forest-900">
                          {currentProduct.name}
                        </h4>
                      </div>

                      <button
                        onClick={() => handleDeleteProduct(currentProduct.id)}
                        className="px-3 py-1.5 text-red-600 hover:bg-red-50 border border-red-200 rounded text-xs flex items-center gap-1.5 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete Product</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider font-semibold text-forest-800 mb-1">
                          Product Name:
                        </label>
                        <input
                          type="text"
                          value={currentProduct.name}
                          onChange={(e) => handleProductFieldChange('name', e.target.value)}
                          className="w-full px-3 py-2 bg-ivory-100 border border-sand rounded text-xs text-forest-900 focus:outline-none focus:border-gold-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider font-semibold text-forest-800 mb-1">
                          Category:
                        </label>
                        <select
                          value={currentProduct.category}
                          onChange={(e) => handleProductFieldChange('category', e.target.value as ProductCategory)}
                          className="w-full px-3 py-2 bg-ivory-100 border border-sand rounded text-xs text-forest-900 focus:outline-none focus:border-gold-500"
                        >
                          {productCategories.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider font-semibold text-forest-800 mb-1">
                          Price in INR (₹):
                        </label>
                        <input
                          type="number"
                          value={currentProduct.price}
                          onChange={(e) =>
                            handleProductFieldChange('price', Number(e.target.value) || 0)
                          }
                          className="w-full px-3 py-2 bg-ivory-100 border border-sand rounded text-xs text-forest-900 focus:outline-none focus:border-gold-500 font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider font-semibold text-forest-800 mb-1">
                          Original / Strike Price (₹):
                        </label>
                        <input
                          type="number"
                          value={currentProduct.originalPrice || ''}
                          placeholder="Optional"
                          onChange={(e) =>
                            handleProductFieldChange(
                              'originalPrice',
                              e.target.value ? Number(e.target.value) : undefined
                            )
                          }
                          className="w-full px-3 py-2 bg-ivory-100 border border-sand rounded text-xs text-forest-900 focus:outline-none focus:border-gold-500 font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider font-semibold text-forest-800 mb-1">
                          Offering Type:
                        </label>
                        <select
                          value={currentProduct.type}
                          onChange={(e) =>
                            handleProductFieldChange('type', e.target.value as ProductType)
                          }
                          className="w-full px-3 py-2 bg-ivory-100 border border-sand rounded text-xs text-forest-900 focus:outline-none focus:border-gold-500"
                        >
                          <option value="ready-made">Ready-Made (Direct Purchase)</option>
                          <option value="customized">Customized (Bespoke / Monogram)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-forest-800 mb-1">
                        Image URL:
                      </label>
                      <input
                        type="text"
                        value={currentProduct.images[0] || ''}
                        onChange={(e) => handleProductFieldChange('images', [e.target.value])}
                        className="w-full px-3 py-2 bg-ivory-100 border border-sand rounded text-xs text-forest-900 focus:outline-none focus:border-gold-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-forest-800 mb-1">
                        Short Description:
                      </label>
                      <input
                        type="text"
                        value={currentProduct.shortDescription}
                        onChange={(e) =>
                          handleProductFieldChange('shortDescription', e.target.value)
                        }
                        className="w-full px-3 py-2 bg-ivory-100 border border-sand rounded text-xs text-forest-900 focus:outline-none focus:border-gold-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-forest-800 mb-1">
                        Full Atelier Description:
                      </label>
                      <textarea
                        rows={3}
                        value={currentProduct.description}
                        onChange={(e) =>
                          handleProductFieldChange('description', e.target.value)
                        }
                        className="w-full px-3 py-2 bg-ivory-100 border border-sand rounded text-xs text-forest-900 focus:outline-none focus:border-gold-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-forest-800 mb-1">
                        Lead Time Note:
                      </label>
                      <input
                        type="text"
                        value={currentProduct.leadTime}
                        onChange={(e) => handleProductFieldChange('leadTime', e.target.value)}
                        className="w-full px-3 py-2 bg-ivory-100 border border-sand rounded text-xs text-forest-900 focus:outline-none focus:border-gold-500"
                      />
                    </div>
                  </>
                ) : (
                  <div className="py-12 text-center text-forest-400">
                    Select a product from the left to edit its details.
                  </div>
                )}
              </div>

            </div>
          )}

        </div>

        {/* Modal Bottom Action Bar */}
        <div className="p-4 sm:p-5 bg-white border-t border-sand flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onResetToDefaults}
            className="text-xs text-forest-500 hover:text-red-600 flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Back to Default</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-ivory-100 border border-sand text-forest-800 text-xs uppercase tracking-wider font-semibold rounded hover:bg-ivory-200"
            >
              Close
            </button>

            <button
              onClick={handleSaveAll}
              className="px-6 py-2.5 bg-forest-900 text-ivory-100 text-xs uppercase tracking-wider font-semibold rounded hover:bg-forest-800 shadow-md flex items-center gap-2 border border-forest-800"
            >
              <Save className="w-4 h-4 text-gold-400" />
              <span>Save & Apply Changes Live</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
