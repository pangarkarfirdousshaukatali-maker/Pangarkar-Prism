import { Product, ProductCategory } from '../types';

export const products: Product[] = [
  // --- READY-MADE PRODUCTS ---
  {
    id: 'rm-101',
    name: 'Sylvan Gold Banarasi Katan Silk Saree',
    type: 'ready-made',
    category: 'Sarees & Drapes',
    price: 32500,
    originalPrice: 38000,
    shortDescription: 'Pure handwoven Katan silk adorned with antique gold zari kadhwa motifs and an opulent pallu.',
    description: 'A masterpiece from master weavers, this Sylvan Gold Banarasi saree merges deep forest undertones with antique zari work. Handwoven over 180 artisan hours, it features a fluid drape, rich floral jaal, and an ornate traditional temple border.',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80'
    ],
    sizes: ['Free Size (Includes Unstitched Blouse Piece)'],
    colors: [
      { name: 'Forest Gold', hex: '#243323' },
      { name: 'Royal Crimson', hex: '#7A1F2D' },
      { name: 'Warm Ivory', hex: '#F5F0E7' }
    ],
    leadTime: 'Ready to Ship • Dispatches in 24-48 Hours',
    craftsmanshipDetails: [
      '100% Pure Certified Mulberry Katan Silk',
      'Handcrafted Kadhwa Zari weave technique',
      'Accompanied by silk-mark certification',
      'Includes 0.8m coordinating unstitched blouse piece'
    ],
    fabricCare: [
      'Strictly Dry Clean Only',
      'Store wrapped in breathable muslin or mulmul cloth',
      'Iron on lowest silk setting with protective press cloth'
    ],
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
  },
  {
    id: 'rm-102',
    name: 'Aurelia Hand-Embroidered Chanderi Kurta Set',
    type: 'ready-made',
    category: 'Ensembles & Kurtas',
    price: 18900,
    originalPrice: 22000,
    shortDescription: 'Subtle ivory Chanderi tunic detailed with antique marodi needlework and matching tapered trousers.',
    description: 'Designed for effortless festive gatherings, the Aurelia ensemble combines breezy Chanderi silk with delicate thread and gota patti craftsmanship. Finished with scalloped sleeve hems and an airy sheer silk-organza dupatta.',
    images: [
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=1200&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Warm Ivory', hex: '#FAF7F2' },
      { name: 'Sage Green', hex: '#7D8C7B' },
      { name: 'Dusty Rose', hex: '#B88686' }
    ],
    leadTime: 'Ready to Ship • Dispatches in 24-48 Hours',
    craftsmanshipDetails: [
      'Handwoven Chanderi cotton-silk blend with cotton voil lining',
      'Fine Marodi and Zari thread hand embroidery on neckline',
      'Paired with straight-cut trousers featuring side pockets',
      'Includes a 2.5m hand-block printed organza dupatta'
    ],
    fabricCare: [
      'Gentle Dry Clean Only',
      'Steam iron gently on reverse'
    ],
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
  },
  {
    id: 'rm-103',
    name: 'Zardozi Gilded Raw Silk Box Clutch',
    type: 'ready-made',
    category: 'Artisan Accessories',
    price: 8400,
    originalPrice: 9800,
    shortDescription: 'Structured evening clutch hand-embellished with bullion wire, dabka, and micro-pearls.',
    description: 'An exquisite accent for evening events, this structured clutch is hand-stretched in deep forest green raw silk and encrusted with antique gold zardozi motifs. Accompanied by a detachable gold brass snake chain.',
    images: [
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80'
    ],
    sizes: ['Standard (20cm x 12cm x 5cm)'],
    colors: [
      { name: 'Deep Forest', hex: '#243323' },
      { name: 'Antique Gold', hex: '#B08A45' },
      { name: 'Onyx Black', hex: '#1C1C1C' }
    ],
    leadTime: 'Ready to Ship • Dispatches in 24 Hours',
    craftsmanshipDetails: [
      'Hand-stretched pure Dupion raw silk base',
      'Traditional Lucknowi zardozi and dabka wire embroidery',
      'Branded magnetic clasp closure with suede interior lining',
      'Accompanied by dust pouch and protective presentation box'
    ],
    fabricCare: [
      'Spot clean with a clean dry microfiber cloth',
      'Keep away from moisture, perfume, and direct sprays'
    ],
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
  },
  {
    id: 'rm-104',
    name: 'Loom-Spun Pashmina Cashmere Stole',
    type: 'ready-made',
    category: 'Shawls & Stoles',
    price: 21500,
    shortDescription: 'Featherlight pure Ladakhi Cashmere woven with delicate sozni embroidery accents.',
    description: 'Spun from grade-A Changthangi cashmere fibres, this stole offers unmatched warmth with cloud-like weightlessness. Finished with classic eyelash fringe and discreet corner sozni motifs.',
    images: [
      'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1608748010899-18f300247112?auto=format&fit=crop&w=1200&q=80'
    ],
    sizes: ['200cm x 70cm Stole'],
    colors: [
      { name: 'Oatmeal Ivory', hex: '#EDE6D6' },
      { name: 'Camel Tan', hex: '#C2A378' },
      { name: 'Forest Olive', hex: '#3B4A3A' }
    ],
    leadTime: 'Ready to Ship • Dispatches in 24-48 Hours',
    craftsmanshipDetails: [
      '100% Certified Pashmina Cashmere (GI tagged)',
      'Hand-spun and hand-loomed in the Kashmir Valley',
      'Subtle tone-on-tone fine needle embroidery'
    ],
    fabricCare: [
      'Professional Cashmere Dry Clean only',
      'Store folded with cedar blocks or lavender sachets'
    ],
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
  },
  {
    id: 'rm-105',
    name: 'Regal Velvet Bandhgala Evening Jacket',
    type: 'ready-made',
    category: 'Ensembles & Kurtas',
    price: 36000,
    originalPrice: 42000,
    shortDescription: 'Tailored micro-velvet jacket with antique gold engraved buttons and mandarin collar.',
    description: 'A timeless silhouette for black-tie gatherings and festive soirées. Crafted from plush cotton micro-velvet with a bespoke structured shoulder, double vents, and custom crest buttons.',
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1200&q=80'
    ],
    sizes: ['38 (S)', '40 (M)', '42 (L)', '44 (XL)'],
    colors: [
      { name: 'Midnight Forest', hex: '#1C2B1C' },
      { name: 'Imperial Navy', hex: '#1B243B' },
      { name: 'Royal Wine', hex: '#4A1521' }
    ],
    leadTime: 'Ready to Ship • Dispatches in 48 Hours',
    craftsmanshipDetails: [
      'High-density cotton velvet shell with breathable cupro lining',
      'Hand-cast antique gold brass buttons',
      'Concealed inner breast pockets with hand-pick stitching'
    ],
    fabricCare: [
      'Dry Clean Only',
      'Never iron directly; steam lightly on hanger'
    ],
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
  },
  {
    id: 'rm-106',
    name: 'Celeste Hand-Painted Organza Saree',
    type: 'ready-made',
    category: 'Sarees & Drapes',
    price: 24500,
    shortDescription: 'Translucent pure organza silk adorned with botanical flora in watercolours and gota borders.',
    description: 'An airy, ethereal creation capturing the poetry of garden blossoms. Each saree is individually hand-painted by artisan painters and framed with a hand-stitched fine antique gold sequin hem.',
    images: [
      'https://images.unsplash.com/photo-1610030469668-93510cb2866c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80'
    ],
    sizes: ['Free Size (Includes Unstitched Blouse Piece)'],
    colors: [
      { name: 'Pearl Ivory', hex: '#F9F7F1' },
      { name: 'Sage Mist', hex: '#B5C4B5' },
      { name: 'Blush Sand', hex: '#DECBBF' }
    ],
    leadTime: 'Ready to Ship • Dispatches in 24 Hours',
    craftsmanshipDetails: [
      '100% Pure Crisp Organza Silk',
      'Individual botanical hand-painted motifs',
      'Fine gota patti and micro-sequin edge binding'
    ],
    fabricCare: [
      'Dry Clean Only',
      'Store flat in cotton dust bag'
    ],
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
  },

  // --- CUSTOMIZED PRODUCTS ---
  {
    id: 'cust-201',
    name: 'Bespoke Heritage Kanjeevaram Saree with Woven Initials',
    type: 'customized',
    category: 'Sarees & Drapes',
    price: 58000,
    originalPrice: 65000,
    shortDescription: 'Made-to-order pure mulberry silk woven with your custom monogram in gold zari on the pallu.',
    description: 'A genuine heirloom tailored to your personal legacy. Commissioned through our master weavers in Kanchipuram, this saree allows you to select your preferred body tone, contrasting border motif, and we incorporate your custom monogram or family insignia directly into the antique gold zari weave of the pallu.',
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80'
    ],
    sizes: ['Custom Draped Cut', 'Standard 6.3m (Includes Blouse Piece)'],
    colors: [
      { name: 'Bespoke Choice (Ivory & Gold)', hex: '#F5F0E7' },
      { name: 'Deep Forest & Zari', hex: '#243323' },
      { name: 'Antique Bronze & Gold', hex: '#B08A45' },
      { name: 'Royal Crimson & Vermilion', hex: '#8B1E2B' }
    ],
    leadTime: 'Crafted to Order • 3 to 4 Weeks',
    craftsmanshipDetails: [
      'Pure 3-ply Mulberry Silk with certified 2G silver-gilt zari',
      'Bespoke monogram or wedding date woven seamlessly into the pallu',
      'Complimentary consultation with our textile curator',
      'Numbered certificate of authenticity and custom presentation trunk'
    ],
    fabricCare: [
      'Strictly Professional Dry Clean',
      'Wrap in pristine unbleached cotton mulmul'
    ],
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    customization: {
      allowMonogram: true,
      allowCustomSizing: true,
      allowColorChoice: true,
      allowFabricChoice: true,
      availableFabrics: ['Pure Kanchipuram Silk', 'Tissue Katan Silk', 'Tussar Brocade'],
      embroideryStyles: ['Monogram Zari Weave', 'Corner Sozni Stitch', 'Embroidered Border Calligraphy']
    }
  },
  {
    id: 'cust-202',
    name: 'Personalized Raw Silk Sherwani with Monogrammed Lining',
    type: 'customized',
    category: 'Ensembles & Kurtas',
    price: 49500,
    shortDescription: 'Hand-tailored to exact body measurements with custom crest embroidery and jacquard silk lining.',
    description: 'Impeccable bespoke tailoring for the modern groom or occasion connoisseur. Constructed from structured Bhagalpur raw silk, this sherwani features personalized silk jacquard lining stitched with your initials, hand-cut antique brass buttons, and custom sleeve cuff embroidery.',
    images: [
      'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80'
    ],
    sizes: ['Made to Measure (Virtual / Studio Fitting)', 'Standard Sizing 38 - 46'],
    colors: [
      { name: 'Ivory Cream', hex: '#F5F0E7' },
      { name: 'Forest Gold Accent', hex: '#243323' },
      { name: 'Champagne Tan', hex: '#D2C19E' },
      { name: 'Midnight Charcoal', hex: '#212529' }
    ],
    leadTime: 'Crafted to Order • 2 to 3 Weeks',
    craftsmanshipDetails: [
      'Individually drafted paper pattern based on 18 body measurements',
      'Internal silk lining personalized with embroidered crest or initials',
      'Hand-set canvas interlining for lifelong drape structure',
      'Includes churidar / breeches and tailored pocket square'
    ],
    fabricCare: [
      'Specialist Dry Clean Only',
      'Store hung on contoured wooden hanger'
    ],
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    customization: {
      allowMonogram: true,
      allowCustomSizing: true,
      allowColorChoice: true,
      allowFabricChoice: true,
      availableFabrics: ['Pure Bhagalpur Raw Silk', 'Matka Silk', 'Silk Velvet'],
      embroideryStyles: ['Tone-on-tone Resham', 'Antique Gold Marodi', 'Discreet Cuff Initials']
    }
  },
  {
    id: 'cust-203',
    name: 'Monogrammed Artisan Cashmere Shawl',
    type: 'customized',
    category: 'Shawls & Stoles',
    price: 28000,
    shortDescription: 'Personalized heirloom Pashmina shawl embroidered with bespoke initials in metallic gold filament.',
    description: 'Elevate gifting or personal indulgence. Pure 100% hand-spun Pashmina Cashmere delicately embroidered with your initials, wedding monogram, or memorable date in micro antique gold thread by veteran Kashmiri needle artisans.',
    images: [
      'https://images.unsplash.com/photo-1608748010899-18f300247112?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=1200&q=80'
    ],
    sizes: ['200cm x 100cm Full Shawl'],
    colors: [
      { name: 'Warm Cream', hex: '#F7F3E9' },
      { name: 'Forest Moss', hex: '#2F402E' },
      { name: 'Sand Taupe', hex: '#B8A892' },
      { name: 'Charcoal Slate', hex: '#3E424B' }
    ],
    leadTime: 'Customized in 10-12 Days',
    craftsmanshipDetails: [
      'Authentic Changthangi Cashmere wool',
      'Bespoke needle monogram in choice of cursive, serif, or modern typography',
      'Hand-twisted fringe details',
      'Presented in our signature velvet-lined keepsake box'
    ],
    fabricCare: [
      'Strictly Specialist Dry Clean',
      'Store with natural cedar or neem sachets'
    ],
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    customization: {
      allowMonogram: true,
      allowCustomSizing: false,
      allowColorChoice: true,
      allowFabricChoice: false,
      availableFabrics: ['Grade-A Changthangi Cashmere'],
      embroideryStyles: ['Antique Gold Needlework', 'Tone-on-Tone Silk Thread', 'Rose-Gold Metallic Cord']
    }
  },
  {
    id: 'cust-204',
    name: 'Custom Bridal Occasion Lehenga & Blouse Ensemble',
    type: 'customized',
    category: 'Lehengas & Occasionwear',
    price: 88000,
    originalPrice: 98000,
    shortDescription: 'Comprehensive bespoke bridal or festive ensemble customized in silhouette, can-can volume, and motifs.',
    description: 'A collaborative couture journey. Work with the Pangarkar Prism design team to select custom flare panels, zardozi hand-embroidery density, neckline cuts, and subtle hidden embroidery details such as love vows or wedding dates.',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1610030469668-93510cb2866c?auto=format&fit=crop&w=1200&q=80'
    ],
    sizes: ['Bespoke Custom Measurements with Swatch Kit'],
    colors: [
      { name: 'Ivory & Antique Gold', hex: '#F5F0E7' },
      { name: 'Forest Emerald', hex: '#243323' },
      { name: 'Bespoke Bridal Red', hex: '#8F1D2C' },
      { name: 'Sunset Ochre', hex: '#B08A45' }
    ],
    leadTime: 'Crafted to Order • 4 to 6 Weeks',
    craftsmanshipDetails: [
      'Custom kali pattern tailored to your height and desired flare volume',
      'Over 250 hours of hand zardozi, badla, and resham needlework',
      'Dual dupatta styling: one heavy hand-worked veil, one lightweight drape',
      'Includes complimentary virtual fitting consultations and physical fabric swatches'
    ],
    fabricCare: [
      'Museum-Grade Specialist Dry Clean Only',
      'Store in provided breathable garment trunk'
    ],
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    customization: {
      allowMonogram: true,
      allowCustomSizing: true,
      allowColorChoice: true,
      allowFabricChoice: true,
      availableFabrics: ['Pure Raw Silk & Organza', 'Tissue Banarasi Brocade', 'Chanderi Silk'],
      embroideryStyles: ['Zardozi & Pearl Floral Jaal', 'Heritage Marodi Needlework', 'Geometric Architectural Zari']
    }
  },
  {
    id: 'cust-205',
    name: 'Personalized Bridal Potli & Custom Monogram Purse',
    type: 'customized',
    category: 'Artisan Accessories',
    price: 9800,
    shortDescription: 'Heirloom evening bag embroidered with couple initials, wedding coordinates, or custom floral motifs.',
    description: 'Designed as a treasured keepsake, this handcrafted potli pouch features your chosen monogram surrounded by hand-sewn micro pearls and gold dabka bullion wire. Finished with handmade pearl latkans and a braided raw silk drawstring.',
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1200&q=80'
    ],
    sizes: ['Dimensions: 22cm x 18cm'],
    colors: [
      { name: 'Warm Ivory', hex: '#FAF7F2' },
      { name: 'Forest Green', hex: '#243323' },
      { name: 'Antique Gold', hex: '#B08A45' },
      { name: 'Ruby Wine', hex: '#631B27' }
    ],
    leadTime: 'Crafted to Order • 7 to 10 Days',
    craftsmanshipDetails: [
      'Silk velvet or raw silk base of your selection',
      'Hand-embroidered couple monogram or initials',
      'Artisan crafted pearl and beaded tassel latkans',
      'Satin lined with internal phone pocket'
    ],
    fabricCare: [
      'Spot clean with gentle dry cloth',
      'Store in satin pouch'
    ],
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    customization: {
      allowMonogram: true,
      allowCustomSizing: false,
      allowColorChoice: true,
      allowFabricChoice: true,
      availableFabrics: ['Pure Silk Velvet', 'Raw Dupion Silk', 'Tissue Chanderi'],
      embroideryStyles: ['Hand-beaded Pearl Monogram', 'Gilded Dabka Initials', 'Minimalist Gold Zari Stitch']
    }
  }
];

export const productCategories: ProductCategory[] = [
  'Sarees & Drapes',
  'Ensembles & Kurtas',
  'Lehengas & Occasionwear',
  'Shawls & Stoles',
  'Artisan Accessories'
];
