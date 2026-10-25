export type ProductType = 'ready-made' | 'customized';

export type ProductCategory = 
  | 'Sarees & Drapes'
  | 'Ensembles & Kurtas'
  | 'Lehengas & Occasionwear'
  | 'Shawls & Stoles'
  | 'Artisan Accessories';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface CustomizationOption {
  allowMonogram?: boolean;
  allowCustomSizing?: boolean;
  allowFabricChoice?: boolean;
  allowColorChoice?: boolean;
  availableFabrics?: string[];
  embroideryStyles?: string[];
}

export interface Product {
  id: string;
  name: string;
  type: ProductType;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  shortDescription: string;
  description: string;
  images: string[];
  sizes: string[];
  colors: ProductColor[];
  leadTime: string; // e.g. "Ships in 24-48 hours" or "Crafted to Order: 12-14 Days"
  craftsmanshipDetails: string[];
  fabricCare: string[];
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  customization?: CustomizationOption;
}

export interface CartItem {
  id: string; // cart item unique key: productId + size + color + customNote
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor?: ProductColor;
  customNotes?: string;
  monogramText?: string;
}

export interface CustomEnquiryForm {
  category: ProductCategory;
  silhouette: string;
  fabric: string;
  color: string;
  sizeType: 'standard' | 'bespoke';
  standardSize?: string;
  measurements?: {
    bustChest?: string;
    waist?: string;
    hips?: string;
    height?: string;
    length?: string;
  };
  monogramText?: string;
  monogramPlacement?: string;
  specialRequests?: string;
  referenceImageName?: string;
  referenceImageData?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  preferredContact: 'whatsapp' | 'email' | 'phone';
}

export type ActiveTab = 'home' | 'catalogue' | 'custom-studio' | 'about' | 'contact';
