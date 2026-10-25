import React, { useState } from 'react';
import { 
  Sparkles, 
  Upload, 
  Check, 
  Info, 
  Scissors, 
  Layers, 
  Palette, 
  UserCheck, 
  Send, 
  X, 
  CheckCircle2, 
  FileText,
  AlertCircle
} from 'lucide-react';
import { ProductCategory, CustomEnquiryForm } from '../types';
import { productCategories } from '../data/products';
import { siteConfig } from '../data/siteConfig';

interface CustomizationStudioProps {
  onSubmitEnquiry: (enquiry: CustomEnquiryForm) => void;
  preselectedCategory?: ProductCategory;
}

const SILHOUETTES: Record<ProductCategory, string[]> = {
  'Sarees & Drapes': [
    'Classic 6.3m Kanchipuram Drape with Heavy Pallu',
    'Modern Pre-Draped Concept Saree with Pleated Pallu',
    'Translucent Organza Saree with Embroidered Scallop Edge',
    'Contemporary Tissue Silk Saree with Geometric Zari'
  ],
  'Ensembles & Kurtas': [
    'Straight Long Kurta with Tapered Cigarette Pants',
    'A-Line Flared Angrakha Ensemble with Organza Dupatta',
    'Tailored Bandhgala Jacket & Kurta Ensemble',
    'Floor-Length Kalidar Anarkali with Gota Embellishments'
  ],
  'Lehengas & Occasionwear': [
    'High-Volume 16-Kali Heritage Bridal Lehenga',
    'Contemporary Minimalist Silk Lehenga with Paneled Skirt',
    'Modern Mermaid Flared Skirt with Structured Corset Blouse',
    'Traditional Circular Lehenga with Contrasting Double Dupatta'
  ],
  'Shawls & Stoles': [
    'Full Size Heirloom Pashmina Shawl (200cm x 100cm)',
    'Featherlight Evening Stole with Eyelash Fringe (200cm x 70cm)',
    'Silk Velvet Reversible Stole with Zardozi Borders',
    'Double-Ply Changthangi Cashmere Wrap'
  ],
  'Artisan Accessories': [
    'Structured Rectangular Raw Silk Box Clutch with Snake Chain',
    'Handcrafted Round Bridal Potli with Pearl & Dabka Tassels',
    'Envelope Style Embroidered Wedding Clutch',
    'Custom Monogrammed Velvet Groom Pocket Square & Brooch Set'
  ]
};

const FABRIC_OPTIONS = [
  { name: 'Pure Mulberry Katan Silk', desc: 'Lustrous, heirloom density with fluid drape' },
  { name: 'Kanchipuram 3-Ply Silk', desc: 'Heavy, regal handloom weave with authentic silk mark' },
  { name: 'Pure Changthangi Cashmere', desc: 'Featherlight warmth from high-altitude Ladakhi Pashmina' },
  { name: 'Bhagalpur Dupion Raw Silk', desc: 'Rich textural slubs, ideal for structured silhouettes' },
  { name: 'Crisp Silk Organza', desc: 'Ethereal, sheer, and architectural structure' },
  { name: 'Plush Cotton Micro-Velvet', desc: 'Deep royal luster with rich handfeel' },
];

const COLOR_PALETTE = [
  { name: 'Deep Forest', hex: '#243323', class: 'bg-[#243323]' },
  { name: 'Warm Ivory', hex: '#F5F0E7', class: 'bg-[#F5F0E7]' },
  { name: 'Antique Gold', hex: '#B08A45', class: 'bg-[#B08A45]' },
  { name: 'Royal Crimson', hex: '#7A1C29', class: 'bg-[#7A1C29]' },
  { name: 'Midnight Indigo', hex: '#1C283F', class: 'bg-[#1C283F]' },
  { name: 'Heritage Sage', hex: '#6F846E', class: 'bg-[#6F846E]' },
  { name: 'Blush Champagne', hex: '#D9C1B0', class: 'bg-[#D9C1B0]' },
  { name: 'Imperial Ochre', hex: '#C28935', class: 'bg-[#C28935]' },
];

export const CustomizationStudio: React.FC<CustomizationStudioProps> = ({
  onSubmitEnquiry,
  preselectedCategory,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(
    preselectedCategory || 'Sarees & Drapes'
  );
  const [selectedSilhouette, setSelectedSilhouette] = useState<string>(
    SILHOUETTES[selectedCategory][0]
  );
  const [selectedFabric, setSelectedFabric] = useState<string>(FABRIC_OPTIONS[0].name);
  const [selectedColor, setSelectedColor] = useState<string>(COLOR_PALETTE[0].name);

  const [sizeType, setSizeType] = useState<'standard' | 'bespoke'>('standard');
  const [standardSize, setStandardSize] = useState<string>('M (Bust 36-38")');

  // Bespoke measurements
  const [measurements, setMeasurements] = useState({
    bustChest: '',
    waist: '',
    hips: '',
    height: '',
    length: '',
  });

  // Personalization details
  const [monogramText, setMonogramText] = useState('');
  const [monogramPlacement, setMonogramPlacement] = useState('Pallu / Main Border Edge');
  const [specialRequests, setSpecialRequests] = useState('');
  const [budget, setBudget] = useState('');

  // Image Upload state
  const [referenceImage, setReferenceImage] = useState<{
    name: string;
    preview: string;
  } | null>(null);
  const [uploadError, setUploadError] = useState('');

  // Customer Contact Info
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [preferredContact, setPreferredContact] = useState<'whatsapp' | 'email' | 'phone'>('whatsapp');

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleCategoryChange = (cat: ProductCategory) => {
    setSelectedCategory(cat);
    setSelectedSilhouette(SILHOUETTES[cat][0]);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setUploadError('');
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (PNG, JPG, WEBP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image size must be under 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setReferenceImage({
        name: file.name,
        preview: reader.result as string,
      });
    };
    reader.readAsDataURL(file);
  };

  const removeReferenceImage = () => {
    setReferenceImage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!customerName.trim()) {
      errors.name = 'Please provide your full name.';
    }
    if (!customerEmail.trim() || !customerEmail.includes('@')) {
      errors.email = 'Please provide a valid email address.';
    }
    if (!customerPhone.trim() || customerPhone.length < 8) {
      errors.phone = 'Please provide a valid phone or WhatsApp number.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      // scroll to first error
      const el = document.getElementById('contact-details-anchor');
      el?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    setFormErrors({});

    const enquiryPayload: CustomEnquiryForm = {
      category: selectedCategory,
      silhouette: selectedSilhouette,
      fabric: selectedFabric,
      color: selectedColor,
      sizeType,
      standardSize: sizeType === 'standard' ? standardSize : undefined,
      measurements: sizeType === 'bespoke' ? measurements : undefined,
      monogramText: monogramText.trim() ? monogramText.trim() : undefined,
      monogramPlacement: monogramText.trim() ? monogramPlacement : undefined,
      specialRequests: specialRequests.trim() || undefined,
      budget: budget || undefined,
      referenceImageName: referenceImage?.name,
      referenceImageData: referenceImage?.preview,
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim(),
      customerPhone: customerPhone.trim(),
      preferredContact,
    };

    onSubmitEnquiry(enquiryPayload);
  };

  return (
    <div className="customization-shell py-12 sm:py-20 bg-ivory-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Atelier Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-100 border border-gold-300 text-gold-700 text-xs uppercase tracking-widest font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>Pangarkar Prism Bespoke Studio</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-forest-900 tracking-tight">
            Design Your Personalized Creation
          </h1>
          <div className="prism-divider w-40 mx-auto my-4">
            <span className="text-gold-500 text-xs">▲</span>
          </div>
          <p className="text-sm sm:text-base text-forest-600 font-light leading-relaxed">
            Collaborate with our master pattern makers and textile artisans. Select your silhouette, bespoke monogramming, handloom fabrics, and personalized measurements.
          </p>
        </div>

        {/* Clear Mandatory Boutique Disclaimer Notice */}
        <div className="mb-10 bg-ivory-100 border border-gold-400/60 rounded-xl p-5 shadow-sm flex items-start gap-3.5">
          <Info className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-forest-700 leading-relaxed font-light">
            <span className="font-semibold text-forest-900 block mb-0.5">
              Atelier Notice Regarding Custom Creations:
            </span>
            Customization requests may require confirmation of design nuances, exact fabric sourcing, and delivery timeline before an order is finalized. Our bespoke concierge team will review your specifications and arrange a personal consultation.
          </div>
        </div>

        {/* Main Customization Form */}
        <form onSubmit={handleSubmit} className="customization-form space-y-10">
          
          {/* STEP 1: Choose Product Category */}
          <div className="bg-white rounded-xl border border-sand p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-7 h-7 rounded-full bg-forest-900 text-gold-300 text-xs font-semibold flex items-center justify-center">
                1
              </span>
              <h2 className="font-serif text-2xl text-forest-900">
                Choose Product Category
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {productCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryChange(cat)}
                  className={`p-4 rounded-lg text-center transition-all border flex flex-col items-center justify-center gap-2 ${
                    selectedCategory === cat
                      ? 'border-gold-500 bg-gold-50/50 text-forest-900 shadow-sm ring-1 ring-gold-500'
                      : 'border-sand bg-ivory-100/60 text-forest-700 hover:border-gold-300'
                  }`}
                >
                  <span className="text-xs uppercase tracking-wider font-semibold">
                    {cat}
                  </span>
                  {selectedCategory === cat && (
                    <Check className="w-4 h-4 text-gold-600" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* STEP 2: Preferred Silhouette & Cut */}
          <div className="bg-white rounded-xl border border-sand p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-7 h-7 rounded-full bg-forest-900 text-gold-300 text-xs font-semibold flex items-center justify-center">
                2
              </span>
              <h2 className="font-serif text-2xl text-forest-900">
                Select Silhouette & Style
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {SILHOUETTES[selectedCategory].map((silhouette) => (
                <button
                  key={silhouette}
                  type="button"
                  onClick={() => setSelectedSilhouette(silhouette)}
                  className={`p-4 rounded-lg text-left transition-all border flex items-start justify-between ${
                    selectedSilhouette === silhouette
                      ? 'border-gold-500 bg-gold-50/50 text-forest-900 shadow-sm ring-1 ring-gold-500'
                      : 'border-sand bg-ivory-100/60 text-forest-700 hover:border-gold-300'
                  }`}
                >
                  <div className="pr-3">
                    <p className="text-sm font-medium text-forest-900">{silhouette}</p>
                    <p className="text-xs text-forest-500 mt-1">Bespoke pattern drafting available</p>
                  </div>
                  {selectedSilhouette === silhouette && (
                    <Check className="w-4 h-4 text-gold-600 flex-shrink-0 mt-1" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* STEP 3: Fabric & Colour Palette */}
          <div className="bg-white rounded-xl border border-sand p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-7 h-7 rounded-full bg-forest-900 text-gold-300 text-xs font-semibold flex items-center justify-center">
                3
              </span>
              <h2 className="font-serif text-2xl text-forest-900">
                Fabric & Color Selection
              </h2>
            </div>

            {/* Fabrics */}
            <div className="mb-6">
              <label className="block text-xs uppercase tracking-wider font-semibold text-forest-800 mb-3">
                Select Base Fabric:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {FABRIC_OPTIONS.map((f) => (
                  <button
                    key={f.name}
                    type="button"
                    onClick={() => setSelectedFabric(f.name)}
                    className={`p-3.5 rounded-lg text-left border transition-all ${
                      selectedFabric === f.name
                        ? 'border-gold-500 bg-gold-50/40 text-forest-900 ring-1 ring-gold-500'
                        : 'border-sand bg-ivory-100/50 text-forest-700 hover:border-gold-300'
                    }`}
                  >
                    <p className="text-xs font-semibold text-forest-900">{f.name}</p>
                    <p className="text-[11px] text-forest-500 mt-0.5">{f.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-forest-800 mb-3">
                Choose Color Palette: <span className="font-normal text-gold-600 capitalize">({selectedColor})</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {COLOR_PALETTE.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedColor(c.name)}
                    className={`p-2.5 rounded-lg border flex items-center gap-2.5 transition-all ${
                      selectedColor === c.name
                        ? 'border-gold-500 bg-gold-50/40 ring-1 ring-gold-500'
                        : 'border-sand bg-white hover:border-gold-300'
                    }`}
                  >
                    <span
                      className="w-5 h-5 rounded-full border border-sand shadow-xs flex-shrink-0"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span className="text-xs font-medium text-forest-900 truncate">
                      {c.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* STEP 4: Sizing & Measurements */}
          <div className="bg-white rounded-xl border border-sand p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-7 h-7 rounded-full bg-forest-900 text-gold-300 text-xs font-semibold flex items-center justify-center">
                4
              </span>
              <h2 className="font-serif text-2xl text-forest-900">
                Sizing & Fit Preference
              </h2>
            </div>

            {/* Size Type Switcher */}
            <div className="flex items-center gap-3 mb-6">
              <button
                type="button"
                onClick={() => setSizeType('standard')}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-lg border transition-all ${
                  sizeType === 'standard'
                    ? 'bg-forest-900 text-ivory-100 border-forest-900'
                    : 'bg-ivory-100 text-forest-700 border-sand'
                }`}
              >
                Standard Sizing
              </button>
              <button
                type="button"
                onClick={() => setSizeType('bespoke')}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-lg border transition-all flex items-center gap-1.5 ${
                  sizeType === 'bespoke'
                    ? 'bg-gold-500 text-white border-gold-500'
                    : 'bg-ivory-100 text-forest-700 border-sand'
                }`}
              >
                <Scissors className="w-3.5 h-3.5" />
                <span>Made to Measure (Bespoke)</span>
              </button>
            </div>

            {sizeType === 'standard' ? (
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-forest-800 mb-2">
                  Select Standard Size:
                </label>
                <select
                  value={standardSize}
                  onChange={(e) => setStandardSize(e.target.value)}
                  className="w-full sm:w-80 px-4 py-2.5 bg-ivory-100 border border-sand rounded-lg text-sm text-forest-900 focus:outline-none focus:border-gold-500"
                >
                  <option value={'XS (Bust 32-34")'}>{'XS (Bust/Chest 32-34")'}</option>
                  <option value={'S (Bust 34-36")'}>{'S (Bust/Chest 34-36")'}</option>
                  <option value={'M (Bust 36-38")'}>{'M (Bust/Chest 36-38")'}</option>
                  <option value={'L (Bust 38-40")'}>{'L (Bust/Chest 38-40")'}</option>
                  <option value={'XL (Bust 40-42")'}>{'XL (Bust/Chest 40-42")'}</option>
                  <option value={'XXL (Bust 42-44")'}>{'XXL (Bust/Chest 42-44")'}</option>
                  <option value="Free Size (Includes 0.8m Unstitched Blouse Piece)">Free Size (Includes 0.8m Unstitched Blouse Piece)</option>
                </select>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-xs text-forest-600 font-light">
                  Provide your measurements below (in inches or cm). You may also update these during your consultation call.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-forest-600 mb-1">
                      Bust / Chest
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 36 inches"
                      value={measurements.bustChest}
                      onChange={(e) => setMeasurements({ ...measurements, bustChest: e.target.value })}
                      className="w-full px-3 py-2 bg-ivory-100 border border-sand rounded text-xs text-forest-900 focus:outline-none focus:border-gold-500"
                    />
                  </div>
                  <div className="mt-6 max-w-sm">
                    <label className="block text-xs uppercase tracking-wider font-semibold text-forest-800 mb-1">
                      Preferred Budget
                    </label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-4 py-2.5 bg-ivory-100 border border-sand rounded-lg text-sm text-forest-900 focus:outline-none focus:border-gold-500"
                    >
                      <option value="">Select an approximate range</option>
                      <option value="Under ₹25,000">Under ₹25,000</option>
                      <option value="₹25,000 – ₹50,000">₹25,000 – ₹50,000</option>
                      <option value="₹50,000 – ₹1,00,000">₹50,000 – ₹1,00,000</option>
                      <option value="Above ₹1,00,000">Above ₹1,00,000</option>
                      <option value="To be discussed">To be discussed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-forest-600 mb-1">
                      Waist
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 30 inches"
                      value={measurements.waist}
                      onChange={(e) => setMeasurements({ ...measurements, waist: e.target.value })}
                      className="w-full px-3 py-2 bg-ivory-100 border border-sand rounded text-xs text-forest-900 focus:outline-none focus:border-gold-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-forest-600 mb-1">
                      Hips
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 40 inches"
                      value={measurements.hips}
                      onChange={(e) => setMeasurements({ ...measurements, hips: e.target.value })}
                      className="w-full px-3 py-2 bg-ivory-100 border border-sand rounded text-xs text-forest-900 focus:outline-none focus:border-gold-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-forest-600 mb-1">
                      Height
                    </label>
                    <input
                      type="text"
                      placeholder={'e.g. 5 ft 6 in'}
                      value={measurements.height}
                      onChange={(e) => setMeasurements({ ...measurements, height: e.target.value })}
                      className="w-full px-3 py-2 bg-ivory-100 border border-sand rounded text-xs text-forest-900 focus:outline-none focus:border-gold-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-forest-600 mb-1">
                      Desired Length
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 48 inches"
                      value={measurements.length}
                      onChange={(e) => setMeasurements({ ...measurements, length: e.target.value })}
                      className="w-full px-3 py-2 bg-ivory-100 border border-sand rounded text-xs text-forest-900 focus:outline-none focus:border-gold-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* STEP 5: Personalization, Monogramming & Custom Requests */}
          <div className="bg-white rounded-xl border border-sand p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-7 h-7 rounded-full bg-forest-900 text-gold-300 text-xs font-semibold flex items-center justify-center">
                5
              </span>
              <h2 className="font-serif text-2xl text-forest-900">
                Personalization & Monogramming
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-forest-800 mb-1">
                  Initials / Name / Date to Embroider (Optional):
                </label>
                <input
                  type="text"
                  placeholder="e.g. A • P or Priya & Aditya (24.11.26)"
                  value={monogramText}
                  onChange={(e) => setMonogramText(e.target.value)}
                  className="w-full px-4 py-2.5 bg-ivory-100 border border-sand rounded-lg text-sm text-forest-900 focus:outline-none focus:border-gold-500"
                />
                <p className="text-[11px] text-forest-500 mt-1">
                  Rendered in fine gold metallic zari needlework or tone-on-tone silk thread.
                </p>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-forest-800 mb-1">
                  Preferred Placement:
                </label>
                <select
                  value={monogramPlacement}
                  onChange={(e) => setMonogramPlacement(e.target.value)}
                  className="w-full px-4 py-2.5 bg-ivory-100 border border-sand rounded-lg text-sm text-forest-900 focus:outline-none focus:border-gold-500"
                >
                  <option value="Pallu / Main Border Edge">Pallu / Main Border Edge</option>
                  <option value="Cuff or Sleeve Hem">Cuff or Sleeve Hem</option>
                  <option value="Internal Jacquard Lining (Discreet)">Internal Jacquard Lining (Discreet)</option>
                  <option value="Center Clutch / Potli Motif">Center Clutch / Potli Motif</option>
                </select>
              </div>
            </div>

            {/* Custom Requirements Textarea */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-forest-800 mb-1">
                Describe Custom Requirements & Vision:
              </label>
              <textarea
                rows={3}
                placeholder="Mention specific neckline preferences, sleeve length, occasion date, lining requests, or styling nuances..."
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                className="w-full px-4 py-2.5 bg-ivory-100 border border-sand rounded-lg text-sm text-forest-900 focus:outline-none focus:border-gold-500"
              />
            </div>
          </div>

          {/* STEP 6: Upload Reference Image */}
          <div className="bg-white rounded-xl border border-sand p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-7 h-7 rounded-full bg-forest-900 text-gold-300 text-xs font-semibold flex items-center justify-center">
                6
              </span>
              <h2 className="font-serif text-2xl text-forest-900">
                Reference Moodboard or Inspiration (Optional)
              </h2>
            </div>

            {!referenceImage ? (
              <div className="border-2 border-dashed border-sand hover:border-gold-400 rounded-xl p-8 text-center bg-ivory-100/50 transition-colors">
                <Upload className="w-8 h-8 text-gold-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-forest-800 mb-1">
                  Upload sketch, color swatch, or reference photo
                </p>
                <p className="text-xs text-forest-500 mb-4">
                  PNG, JPG, or WEBP up to 5MB (processed locally in browser)
                </p>
                <label className="inline-flex items-center gap-2 px-5 py-2.5 bg-forest-900 text-ivory-100 text-xs uppercase tracking-wider font-semibold rounded cursor-pointer hover:bg-forest-800 transition-colors">
                  <span>Select Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                {uploadError && (
                  <p className="text-xs text-red-600 mt-2">{uploadError}</p>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-4 p-4 bg-ivory-100 rounded-xl border border-sand">
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-white border border-sand flex-shrink-0">
                  <img
                    src={referenceImage.preview}
                    alt="Upload Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-forest-900 truncate">
                    {referenceImage.name}
                  </p>
                  <p className="text-[11px] text-green-700 font-medium flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Image attached successfully</span>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={removeReferenceImage}
                  className="p-2 text-forest-400 hover:text-red-600 transition-colors"
                  title="Remove image"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* STEP 7: Customer Contact & Submission */}
          <div id="contact-details-anchor" className="bg-white rounded-xl border border-sand p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-7 h-7 rounded-full bg-forest-900 text-gold-300 text-xs font-semibold flex items-center justify-center">
                7
              </span>
              <h2 className="font-serif text-2xl text-forest-900">
                Your Contact Information
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-forest-800 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rohini Pangarkar"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className={`w-full px-4 py-2.5 bg-ivory-100 border rounded-lg text-sm text-forest-900 focus:outline-none ${
                    formErrors.name ? 'border-red-400' : 'border-sand focus:border-gold-500'
                  }`}
                />
                {formErrors.name && (
                  <p className="text-[11px] text-red-600 mt-1">{formErrors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-forest-800 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className={`w-full px-4 py-2.5 bg-ivory-100 border rounded-lg text-sm text-forest-900 focus:outline-none ${
                    formErrors.email ? 'border-red-400' : 'border-sand focus:border-gold-500'
                  }`}
                />
                {formErrors.email && (
                  <p className="text-[11px] text-red-600 mt-1">{formErrors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-forest-800 mb-1">
                  Phone / WhatsApp <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="9892924721"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className={`w-full px-4 py-2.5 bg-ivory-100 border rounded-lg text-sm text-forest-900 focus:outline-none ${
                    formErrors.phone ? 'border-red-400' : 'border-sand focus:border-gold-500'
                  }`}
                />
                {formErrors.phone && (
                  <p className="text-[11px] text-red-600 mt-1">{formErrors.phone}</p>
                )}
              </div>
            </div>

            {/* Preferred contact channel */}
            <div className="mb-6">
              <label className="block text-xs uppercase tracking-wider font-semibold text-forest-800 mb-2">
                Preferred Method of Contact:
              </label>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-forest-800">
                  <input
                    type="radio"
                    name="contactMethod"
                    value="whatsapp"
                    checked={preferredContact === 'whatsapp'}
                    onChange={() => setPreferredContact('whatsapp')}
                    className="accent-gold-600"
                  />
                  <span>WhatsApp Concierge</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-forest-800">
                  <input
                    type="radio"
                    name="contactMethod"
                    value="email"
                    checked={preferredContact === 'email'}
                    onChange={() => setPreferredContact('email')}
                    className="accent-gold-600"
                  />
                  <span>Email Consultation</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-forest-800">
                  <input
                    type="radio"
                    name="contactMethod"
                    value="phone"
                    checked={preferredContact === 'phone'}
                    onChange={() => setPreferredContact('phone')}
                    className="accent-gold-600"
                  />
                  <span>Telephone Discussion</span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-sand flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-forest-500 max-w-md">
                By submitting this bespoke enquiry, our atelier will draft an initial craft brief and quote with zero commitment.
              </p>
              
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-4 bg-forest-900 text-ivory-100 text-xs uppercase tracking-[0.2em] font-semibold rounded hover:bg-forest-800 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-3 border border-gold-500/50"
              >
                <Sparkles className="w-4 h-4 text-gold-400" />
                <span>Submit Customization Request</span>
              </button>
            </div>

          </div>

        </form>

      </div>
    </div>
  );
};
