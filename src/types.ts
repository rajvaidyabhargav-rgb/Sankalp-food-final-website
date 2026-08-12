export interface FruitProduct {
  id: string;
  name: string;
  marathiName?: string;
  category: 'exotic' | 'seasonal' | 'daily' | 'citrus-berries' | 'wholesale-crate';
  price: number; // in INR ₹
  wholesalePrice?: number; // bulk rate per kg/box
  unit: string; // e.g., 'kg', '500g', 'box', 'crate (10kg)', 'piece'
  image: string;
  origin: string;
  sweetness: number; // 1-5 scale
  season: string; // e.g. 'Peak Summer', 'All Year', 'Monsoon Special'
  isOrganic?: boolean;
  isBestseller?: boolean;
  description: string;
  healthBenefits: string[];
  nutritionalHighlights: {
    calories: string;
    vitaminC: string;
    fiber: string;
  };
  inStock: boolean;
}

export interface PreMadeBasket {
  id: string;
  title: string;
  marathiTitle?: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  image: string;
  occasion: 'festival' | 'wedding' | 'corporate' | 'get-well' | 'everyday' | 'vip';
  contents: string[];
  weightApprox: string;
  rating: number;
  reviewsCount: number;
  badge?: string;
}

export interface BasketStyle {
  id: string;
  name: string;
  price: number;
  description: string;
  iconName: string;
  maxCapacityKg: number;
  image?: string;
}

export interface AddOnItem {
  id: string;
  name: string;
  category: 'dry-fruits' | 'chocolates' | 'greeting-card' | 'decoration';
  price: number;
  icon: string;
}

export interface CustomBasketSelection {
  basketStyle: BasketStyle;
  fruits: { fruit: FruitProduct; quantityKg: number }[];
  addOns: AddOnItem[];
  greetingMessage: string;
  recipientName: string;
}

export interface CartItem {
  id: string; // unique cart item id
  type: 'fruit' | 'pre-made-basket' | 'custom-basket';
  title: string;
  subtitle?: string;
  price: number;
  quantity: number;
  unit?: string;
  image: string;
  details?: string[];
  customData?: CustomBasketSelection;
}

export interface WholesaleQuoteRequest {
  fullName: string;
  phone: string;
  email: string;
  businessType: 'hotel' | 'wedding-planner' | 'retailer' | 'corporate' | 'other';
  selectedFruit: string;
  estimatedQuantityKg: number;
  deliveryDate: string;
  deliveryLocation: string;
  notes?: string;
}

export interface AiRecipeResult {
  title: string;
  category: string;
  prepTime: string;
  servings: string;
  ingredients: string[];
  instructions: string[];
  healthTip: string;
  recommendedFruitsFromStore: string[];
}

export interface AiHamperRecommendation {
  hamperName: string;
  recommendedFruits: { name: string; quantity: string; reason: string }[];
  suggestedAddOns: string[];
  estimatedCostRange: string;
  cardMessage: string;
}
