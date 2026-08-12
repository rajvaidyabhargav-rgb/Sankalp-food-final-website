import React from 'react';
import { CartItem } from '../types';
import { X, Trash2, ShoppingBag, Plus, Minus, MessageSquare } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const totalItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleConfirmWhatsAppOrder = () => {
    if (cartItems.length === 0) return;

    const itemLines = cartItems
      .map((item, index) => {
        const unitStr = item.unit ? ` ${item.unit}` : '';
        return `${index + 1}. ${item.title} — ${item.quantity}${unitStr}`;
      })
      .join('\n');

    const rawMessage =
      `Sankalp Fruits & Food Products\n\n` +
      `New Order Request\n\n` +
      `Items:\n\n` +
      `${itemLines}\n\n` +
      `Total Items: ${totalItemCount}\n\n` +
      `Please confirm availability and current price.`;

    const waUrl = `https://wa.me/919604017576?text=${encodeURIComponent(rawMessage)}`;
    window.open(waUrl, '_blank');
  };

  return (
  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="relative w-full max-w-md bg-white border-l border-amber-200 shadow-2xl flex flex-col justify-between h-full">
        
        {/* Header */}
        <div className="p-3.5 sm:p-5 bg-gradient-to-r from-amber-900 via-orange-900 to-amber-950 text-white flex items-center justify-between shadow-xs shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-300 shrink-0" />
            <div>
              <h2 className="text-sm sm:text-base font-bold font-serif leading-tight">Your Order Summary</h2>
              <p className="text-[10px] text-amber-200 font-sans">Sankalp Fruits & Food Products</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-amber-200 transition-colors font-bold cursor-pointer"
            aria-label="Close Order Summary"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-5 space-y-4 sm:space-y-5">
          {cartItems.length === 0 ? (
            <div className="text-center py-12 sm:py-16 space-y-3">
              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto text-3xl">
                🧺
              </div>
              <h3 className="text-sm font-bold text-amber-950 font-serif">Your order summary is currently empty</h3>
              <p className="text-xs text-amber-800 px-2">
                Select 100% farm-fresh Maharashtra fruits from our catalog and click "Purchase via WhatsApp" or "+ Order List".
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2.5 rounded-xl bg-orange-600 text-white text-xs font-bold shadow-xs hover:bg-orange-700 cursor-pointer"
              >
                Browse Fresh Fruits
              </button>
            </div>
          ) : (
            <>
              {/* Product List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-amber-950">
                    Selected Items ({totalItemCount})
                  </h3>
                  <button
                    onClick={onClearCart}
                    className="text-[11px] text-red-600 hover:underline font-semibold cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>

                <div className="space-y-2 max-h-72 sm:max-h-80 overflow-y-auto pr-1">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-amber-50/70 p-2.5 sm:p-3 rounded-2xl border border-amber-200/80 flex items-center gap-2.5 sm:gap-3"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover shrink-0 border border-amber-200"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-amber-950 font-serif truncate">
                          {item.title}
                        </h4>
                        {item.unit && (
                          <p className="text-[10px] text-amber-800 font-medium">Unit: {item.unit}</p>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-0.5 sm:gap-1 bg-white border border-amber-300 rounded-lg p-0.5 shrink-0 shadow-xs">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="w-6 h-6 flex items-center justify-center hover:bg-amber-100 rounded text-amber-900 font-bold cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-extrabold w-5 sm:w-6 text-center text-amber-950">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="w-6 h-6 flex items-center justify-center hover:bg-amber-100 rounded text-amber-900 font-bold cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Remove Item */}
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-amber-500 hover:text-red-600 p-1 shrink-0 transition-colors cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Seller Confirmation Note */}
              <div className="p-3 bg-amber-100/80 rounded-xl border border-amber-300/80 text-[11px] text-amber-900 space-y-1">
                <p className="font-bold flex items-center gap-1">
                  <span className="text-orange-700">📌 Direct Seller Confirmation:</span>
                </p>
                <p className="text-[10px] text-amber-800 leading-relaxed">
                  Our store desk (+91 9604017576) will personally confirm product availability, current daily rates, and final order amount on WhatsApp.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer & WhatsApp Confirm Button */}
        {cartItems.length > 0 && (
          <div className="p-3.5 sm:p-5 border-t border-amber-200 bg-amber-50/90 space-y-2.5 sm:space-y-3 shrink-0">
            <div className="flex justify-between items-center text-xs text-amber-900 font-bold border-b border-amber-200 pb-2">
              <span className="text-xs sm:text-sm font-extrabold text-amber-950">Total Items Selected</span>
              <span className="text-xs sm:text-sm font-extrabold text-orange-700 bg-orange-100 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full">
                {totalItemCount} items
              </span>
            </div>

            <div className="space-y-1.5 pt-1">
              <button
                onClick={handleConfirmWhatsAppOrder}
                className="w-full py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md transition-all transform active:scale-98 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-amber-200 fill-amber-200/20" />
                <span>Confirm Order on WhatsApp</span>
              </button>

              <p className="text-center text-[10px] sm:text-[11px] text-amber-900 font-medium leading-tight">
                Availability and final order amount will be confirmed directly on WhatsApp.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
    </div>
  );
};
