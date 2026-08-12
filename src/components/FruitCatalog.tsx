import React, { useState } from 'react';
import { FRUIT_PRODUCTS } from '../data/fruitData';
import { FruitProduct, CartItem } from '../types';
import { CustomImageModal } from './CustomImageModal';
import {
  getCustomImageConfigs,
  saveCustomImageConfig,
  removeCustomImageConfig,
  CustomImagesMap,
  ProductImageConfig,
} from '../utils/imageStorage';
import {
  ShoppingBag,
  Info,
  Check,
  Plus,
  Minus,
  MessageSquare,
  MapPin,
  Sparkles,
  Star,
  Camera,
} from 'lucide-react';

interface FruitCatalogProps {
  onAddToCart: (item: CartItem) => void;
  searchQuery: string;
}

export const FruitCatalog: React.FC<FruitCatalogProps> = ({
  onAddToCart,
  searchQuery,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedNutritionModal, setSelectedNutritionModal] = useState<FruitProduct | null>(null);
  const [selectedImageEditFruit, setSelectedImageEditFruit] = useState<FruitProduct | null>(null);
  const [addedToastId, setAddedToastId] = useState<string | null>(null);
  const [itemQuantities, setItemQuantities] = useState<{ [key: string]: number }>({});

  // Custom Image State Map
  const [customImages, setCustomImages] = useState<CustomImagesMap>(() =>
    getCustomImageConfigs()
  );

  // Get current local quantity for a product card (default 1)
  const getQuantity = (id: string) => itemQuantities[id] || 1;

  const updateCardQuantity = (id: string, delta: number) => {
    setItemQuantities((prev) => {
      const current = prev[id] || 1;
      const next = Math.max(1, current + delta);
      return { ...prev, [id]: next };
    });
  };

  // Custom Image Management Handlers
  const handleSaveCustomImage = (fruitId: string, newConfig: ProductImageConfig) => {
    const updatedMap = saveCustomImageConfig(fruitId, newConfig);
    setCustomImages(updatedMap);
  };

  const handleRemoveCustomImage = (fruitId: string) => {
    const updatedMap = removeCustomImageConfig(fruitId);
    setCustomImages(updatedMap);
  };

  // Filter fruits based on search & category
  const filteredFruits = FRUIT_PRODUCTS.filter((fruit) => {
    const matchesSearch =
      fruit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fruit.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fruit.category.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'exotic') return fruit.category === 'exotic';
    if (selectedCategory === 'seasonal') return fruit.category === 'seasonal';
    if (selectedCategory === 'daily') return fruit.category === 'daily';
    if (selectedCategory === 'citrus-berries') return fruit.category === 'citrus-berries';

    return true;
  });

  const categories = [
    { id: 'all', label: 'All Fresh Produce' },
    { id: 'seasonal', label: '🥭 Seasonal Specials' },
    { id: 'exotic', label: '🥑 Exotic Superfruits' },
    { id: 'citrus-berries', label: '🍊 Citrus & Berries' },
    { id: 'daily', label: '🍎 Farm Fresh Daily' },
  ];

  const triggerToast = (id: string) => {
    setAddedToastId(id);
    setTimeout(() => setAddedToastId(null), 2000);
  };

  const handleAddFruitToCart = (fruit: FruitProduct, qty?: number) => {
    const finalQty = qty || getQuantity(fruit.id);
    const imgConfig = customImages[fruit.id];
    const activeImage = imgConfig?.customImage || fruit.image;

    const item: CartItem = {
      id: fruit.id,
      type: 'fruit',
      title: fruit.name,
      subtitle: `${fruit.origin} • ${fruit.unit}`,
      price: fruit.price,
      quantity: finalQty,
      unit: fruit.unit,
      image: activeImage,
      details: [
        `Origin: ${fruit.origin}`,
        `Season: ${fruit.season}`,
        `Sweetness: ${fruit.sweetness}/5`,
      ],
    };
    onAddToCart(item);
    triggerToast(fruit.id);
  };

  // Directly Open WhatsApp for a single fruit purchase
  const handleLaunchWhatsAppDirect = (fruit: FruitProduct, qty: number) => {
    const unitStr = fruit.unit ? ` ${fruit.unit}` : '';
    const rawMessage =
      `Sankalp Fruits & Food Products\n\n` +
      `New Order Request\n\n` +
      `Items:\n\n` +
      `1. ${fruit.name} — ${qty}${unitStr}\n\n` +
      `Total Items: ${qty}\n\n` +
      `Please confirm availability and current price.`;

    const waUrl = `https://wa.me/919604017576?text=${encodeURIComponent(rawMessage)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
      
      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none max-w-full">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shadow-xs ${
                isActive
                  ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-md scale-102'
                  : 'bg-white text-amber-950 border border-amber-200/90 hover:bg-amber-100/60'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Main Fresh Produce Section Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
              <h2 className="text-lg sm:text-2xl font-bold font-serif text-amber-950">
                100% Farm-Fresh Maharashtra Harvest
              </h2>
            </div>
            <p className="text-[11px] sm:text-xs text-amber-800 pt-0.5">
              {filteredFruits.length} hand-graded 100% farm-fresh items • Direct WhatsApp ordering with personal price confirmation
            </p>
          </div>
        </div>

        {/* 3D Fruit Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredFruits.map((fruit) => {
            const cardQty = getQuantity(fruit.id);
            const isAdded = addedToastId === fruit.id;

            // Custom Image Settings for this product
            const imgConfig = customImages[fruit.id];
            const activeImage = imgConfig?.customImage || fruit.image;
            const zoom = imgConfig?.imageZoom ?? 1.0;
            const posX = imgConfig?.imagePositionX ?? 0;
            const posY = imgConfig?.imagePositionY ?? 0;
            const hasCustomPhoto = Boolean(imgConfig?.customImage);

            return (
              <div
                key={fruit.id}
                className="perspective-1000 group relative bg-gradient-to-b from-amber-50/90 via-white to-amber-100/30 rounded-3xl border border-amber-200/90 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2.5 hover:rotate-x-2 hover:rotate-y-1 hover:border-amber-400 flex flex-col justify-between"
              >
                {/* 3D Photorealistic Stage */}
                <div className="relative h-48 sm:h-56 overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-200/80 via-amber-100/50 to-amber-50/20 p-3 sm:p-4 flex flex-col items-center justify-center">
                  
                  {/* Subtle Soft Radial Backlight */}
                  <div className="absolute w-40 h-40 rounded-full bg-gradient-to-tr from-orange-400/30 to-amber-300/40 blur-2xl group-hover:scale-130 transition-transform duration-700 pointer-events-none" />

                  {/* Photorealistic 3D Fruit Image Container */}
                  <div className="relative w-full h-36 sm:h-40 flex items-center justify-center overflow-hidden z-10">
                    <img
                      src={activeImage}
                      alt={fruit.name}
                      onError={(e) => {
                        // Fallback if custom image fails
                        const target = e.currentTarget;
                        if (target.src !== fruit.image) {
                          target.src = fruit.image;
                        }
                      }}
                      style={{
                        transform: `translate(${posX}px, ${posY}px) scale(${zoom})`,
                      }}
                      referrerPolicy="no-referrer"
                      className="max-w-full max-h-full object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.35)] group-hover:scale-105 transition-transform duration-300 ease-out transform-gpu pointer-events-none"
                    />
                  </div>

                  {/* Contact Shadow Under Fruit */}
                  <div className="w-3/4 h-3 bg-amber-950/25 rounded-[100%] blur-md animate-contact-shadow mx-auto -mt-2 z-0" />

                  {/* Floating Badges Top Left */}
                  <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 flex flex-col gap-1 z-20">
                    <span className="bg-emerald-700/90 backdrop-blur-md text-white text-[9px] font-extrabold px-2 sm:px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1 border border-emerald-500/30">
                      ✓ In Stock
                    </span>
                    {hasCustomPhoto && (
                      <span className="bg-purple-800/90 backdrop-blur-md text-white text-[9px] font-extrabold px-2 sm:px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1 border border-purple-400/30">
                        📷 Custom Photo
                      </span>
                    )}
                  </div>

                  {/* Top Right Action Buttons (Customize Image & Info) */}
                  <div className="absolute top-2.5 sm:top-3 right-2.5 sm:right-3 flex items-center gap-1.5 z-20">
                    
                    {/* Customize Fruit Image Button */}
                    <button
                      onClick={() => setSelectedImageEditFruit(fruit)}
                      className="p-1.5 sm:p-2 rounded-full bg-white/90 backdrop-blur-md hover:bg-white text-amber-900 shadow-md border border-amber-200 hover:scale-110 transition-all cursor-pointer"
                      title="Upload or Customize Fruit Photo"
                    >
                      <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-700" />
                    </button>

                    {/* Nutrition Info Trigger Button */}
                    <button
                      onClick={() => setSelectedNutritionModal(fruit)}
                      className="p-1.5 sm:p-2 rounded-full bg-white/90 backdrop-blur-md hover:bg-white text-amber-900 shadow-md border border-amber-200 hover:scale-110 transition-all cursor-pointer"
                      title="Nutrition & Health Benefits"
                    >
                      <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-700" />
                    </button>
                  </div>

                  {/* Sourcing Location Badge Bottom Left */}
                  <div className="absolute bottom-2.5 sm:bottom-3 left-2.5 sm:left-3 bg-amber-950/80 backdrop-blur-md text-amber-100 text-[9px] sm:text-[10px] font-extrabold px-2 sm:px-2.5 py-0.5 rounded-full border border-amber-700/50 shadow-md flex items-center gap-1 z-20">
                    <MapPin className="w-3 h-3 text-orange-400 shrink-0" />
                    <span className="truncate max-w-[120px]">{fruit.origin}</span>
                  </div>
                </div>

                {/* Card Details Body */}
                <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm sm:text-base font-bold text-amber-950 font-serif leading-tight">
                        {fruit.name}
                      </h3>
                    </div>
                    {fruit.marathiName && (
                      <p className="text-[11px] text-amber-800 font-bold tracking-wide">{fruit.marathiName}</p>
                    )}
                    <p className="text-[11px] text-amber-800 line-clamp-2 leading-relaxed pt-0.5">{fruit.description}</p>
                  </div>

                  {/* Unit, Availability & Customize Photo trigger */}
                  <div className="flex items-center justify-between text-[11px] text-amber-900 bg-amber-100/60 p-2 rounded-xl border border-amber-200/80">
                    <div className="flex items-center gap-1.5 font-bold">
                      <span className="text-amber-950 font-serif">Unit:</span>
                      <span className="text-orange-800 font-extrabold">{fruit.unit}</span>
                    </div>

                    <button
                      onClick={() => setSelectedImageEditFruit(fruit)}
                      className="text-[10px] font-bold text-orange-700 hover:text-orange-900 hover:underline flex items-center gap-1 bg-white/80 px-2 py-0.5 rounded-md border border-amber-200 cursor-pointer whitespace-nowrap"
                    >
                      <Camera className="w-3 h-3 shrink-0" />
                      <span>{hasCustomPhoto ? 'Edit Photo' : 'Upload Photo'}</span>
                    </button>
                  </div>

                  {/* Quantity & Direct Purchase Controls */}
                  <div className="pt-2 border-t border-amber-200/60 space-y-2">
                    
                    {/* Quantity Selector */}
                    <div className="flex items-center justify-between gap-2 bg-amber-50 p-1 rounded-2xl border border-amber-200">
                      <span className="text-[11px] font-extrabold text-amber-950 pl-1.5">Select Qty:</span>
                      <div className="flex items-center bg-white border border-amber-300 rounded-xl p-0.5 shadow-xs">
                        <button
                          onClick={() => updateCardQuantity(fruit.id, -1)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-amber-200 text-amber-950 font-bold transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-7 text-center text-xs font-black text-amber-950">
                          {cardQty}
                        </span>
                        <button
                          onClick={() => updateCardQuantity(fruit.id, 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-amber-200 text-amber-950 font-bold transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Action Buttons: Direct Purchase on WhatsApp & Summary List */}
                    <div className="flex items-center gap-1.5 pt-1">
                      
                      {/* Direct WhatsApp Purchase Button */}
                      <button
                        onClick={() => handleLaunchWhatsAppDirect(fruit, cardQty)}
                        className="flex-1 py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-extrabold text-[11px] sm:text-xs flex items-center justify-center gap-1 sm:gap-1.5 shadow-md transition-all transform active:scale-98 cursor-pointer whitespace-nowrap"
                        title="Directly Open WhatsApp to confirm availability & order"
                      >
                        <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-200 fill-amber-200/20 shrink-0" />
                        <span>Purchase via WhatsApp</span>
                      </button>

                      {/* Add to Summary Button */}
                      <button
                        onClick={() => handleAddFruitToCart(fruit)}
                        className={`py-2 sm:py-2.5 px-2.5 sm:px-3 rounded-xl text-xs font-bold flex items-center justify-center shadow-xs transition-all border cursor-pointer shrink-0 ${
                          isAdded
                            ? 'bg-amber-800 text-white border-amber-900'
                            : 'bg-amber-100 hover:bg-amber-200 text-amber-950 border-amber-300'
                        }`}
                        title="Add to order summary list for multiple items"
                      >
                        {isAdded ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4 text-orange-700" />}
                      </button>

                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Custom Image Editor Modal */}
      {selectedImageEditFruit && (
        <CustomImageModal
          fruit={selectedImageEditFruit}
          currentConfig={customImages[selectedImageEditFruit.id]}
          onSave={handleSaveCustomImage}
          onRemove={handleRemoveCustomImage}
          onClose={() => setSelectedImageEditFruit(null)}
        />
      )}

      {/* Nutrition Modal Popup */}
      {selectedNutritionModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-4 sm:p-6 space-y-4 shadow-2xl border border-amber-200 relative max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setSelectedNutritionModal(null)}
              className="absolute top-3.5 right-3.5 text-amber-700 hover:text-amber-950 font-bold text-sm bg-amber-100 p-1.5 rounded-full cursor-pointer z-10"
              aria-label="Close modal"
            >
              ✕
            </button>

            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl bg-amber-50 p-2 border border-amber-200 relative overflow-hidden flex items-center justify-center">
                <img
                  src={
                    customImages[selectedNutritionModal.id]?.customImage ||
                    selectedNutritionModal.image
                  }
                  alt={selectedNutritionModal.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain drop-shadow-md"
                />
              </div>
              <div>
                <h3 className="text-base font-bold text-amber-950 font-serif">
                  {selectedNutritionModal.name}
                </h3>
                {selectedNutritionModal.marathiName && (
                  <p className="text-xs text-amber-800 font-bold">{selectedNutritionModal.marathiName}</p>
                )}
                <p className="text-[11px] text-amber-800 font-medium pt-1">
                  Origin: {selectedNutritionModal.origin} • Unit: {selectedNutritionModal.unit}
                </p>
              </div>
            </div>

            <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200 space-y-2">
              <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wider">
                Nutritional Highlights (per 100g)
              </h4>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-white p-2 rounded-xl border border-amber-200">
                  <p className="text-[10px] text-amber-700 font-medium">Calories</p>
                  <p className="font-bold text-amber-950">{selectedNutritionModal.nutritionalHighlights.calories}</p>
                </div>
                <div className="bg-white p-2 rounded-xl border border-amber-200">
                  <p className="text-[10px] text-amber-700 font-medium">Vitamin C</p>
                  <p className="font-bold text-amber-950">{selectedNutritionModal.nutritionalHighlights.vitaminC}</p>
                </div>
                <div className="bg-white p-2 rounded-xl border border-amber-200">
                  <p className="text-[10px] text-amber-700 font-medium">Dietary Fiber</p>
                  <p className="font-bold text-amber-950">{selectedNutritionModal.nutritionalHighlights.fiber}</p>
                </div>
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <h4 className="font-bold text-amber-950">Health & Wellness Benefits:</h4>
              <ul className="space-y-1 text-amber-800 list-disc list-inside">
                {selectedNutritionModal.healthBenefits.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                onClick={() => {
                  handleLaunchWhatsAppDirect(selectedNutritionModal, getQuantity(selectedNutritionModal.id));
                  setSelectedNutritionModal(null);
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-amber-200" />
                <span>Purchase via WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
