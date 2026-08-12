import React, { useState } from 'react';
import { ShoppingBag, Search, Phone, Menu, X, MessageSquare } from 'lucide-react';
import sankalpLogo from '../assets/images/sankalp_official_logo_1786525825712.jpg';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-amber-50/95 backdrop-blur-md border-b border-amber-200/80 shadow-xs transition-all">
      {/* Top Banner Ticker */}
      <div className="bg-gradient-to-r from-amber-800 via-orange-700 to-red-700 text-white text-[11px] sm:text-xs py-1.5 px-2 sm:px-4 font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-1.5 sm:gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <span className="bg-white/20 text-white px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] uppercase font-bold tracking-wider shrink-0">
              100% MAHARASHTRA FRESH
            </span>
            <span className="hidden sm:inline text-amber-100 truncate">
              🍎 Direct Sourcing From Maharashtra Orchards & Farms
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 text-[10px] sm:text-[11px] shrink-0">
            <a
              href="https://wa.me/919604017576?text=Hello%20Sankalp%20Fruits!%20I%20want%20to%20place%20an%20order."
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 hover:underline font-semibold bg-emerald-700/90 px-2 sm:px-2.5 py-0.5 rounded text-white whitespace-nowrap"
            >
              <MessageSquare className="w-3 h-3 shrink-0" />
              <span>WhatsApp: +91 9604017576</span>
            </a>
            <a
              href="tel:919923583855"
              className="hidden md:flex items-center gap-1 text-amber-100 hover:text-white font-medium"
            >
              <Phone className="w-3 h-3 text-amber-300" />
              <span>Call: +91 9923583855</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          
          {/* Brand Logo & Name */}
          <div 
            onClick={() => setActiveTab('shop')} 
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group shrink-0"
          >
            <div className="relative w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-amber-400 via-orange-500 to-red-600 p-0.5 shadow-md group-hover:scale-105 transition-transform overflow-hidden shrink-0">
              <img
                src={sankalpLogo}
                alt="Sankalp Fruits & Food Products Logo"
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <h1 className="text-base sm:text-xl font-bold tracking-tight text-amber-950 font-serif leading-none">
                  SANKALP <span className="text-orange-600 font-sans text-xs sm:text-base font-extrabold">FRUITS</span>
                </h1>
                <span className="hidden xs:inline-block text-[9px] sm:text-[10px] bg-red-100 text-red-700 font-bold px-1 sm:px-1.5 py-0.5 rounded border border-red-200 shrink-0">
                  & Food Products
                </span>
              </div>
              <p className="text-[9px] sm:text-[11px] text-amber-800 font-semibold tracking-wide mt-0.5 flex items-center gap-1 truncate">
                <span>शुद्धं सत्त्वं मधुरं फलम्</span>
                <span className="text-amber-400">•</span>
                <span className="text-orange-700 font-sans font-medium text-[9px] sm:text-[10px]">Direct Farm Fresh</span>
              </p>
            </div>
          </div>

          {/* Desktop Search Input */}
          <div className="hidden md:flex flex-1 max-w-xs relative">
            <input
              type="text"
              placeholder="Search Alphonso, Anar, Chikoo, Grapes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-white/90 border border-amber-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-amber-950 placeholder-amber-500/70 shadow-inner"
            />
            <Search className="w-4 h-4 text-amber-600 absolute left-3 top-2.5" />
          </div>

          {/* Clean Navigation Links: Fresh Fruits & Order */}
          <nav className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={() => setActiveTab('shop')}
              className={`hidden sm:flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'shop'
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'text-amber-950 hover:bg-amber-100/80'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Fresh Fruits</span>
            </button>

            {/* Order / Cart Button */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs font-bold shadow-xs hover:shadow transition-all relative shrink-0"
              aria-label="View Order"
            >
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-200" />
              <span>Order {cartCount > 0 ? `(${cartCount})` : ''}</span>
              {cartCount > 0 && (
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-300 animate-ping absolute top-1 right-1" />
              )}
            </button>

            {/* Quick Contact Buttons Desktop */}
            <a
              href="https://wa.me/919604017576?text=Hello%20Sankalp%20Fruits!%20I%20have%20an%20order%20inquiry."
              target="_blank"
              rel="noreferrer"
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-200/80 hover:bg-amber-300 text-amber-950 text-xs font-bold border border-amber-300 transition-all"
              title="Chat on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
              <span>WhatsApp</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-lg text-amber-900 hover:bg-amber-200"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </nav>

        </div>

        {/* Search Bar Mobile */}
        <div className="md:hidden pb-2.5 pt-0.5">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Alphonso, Grapes, Chikoo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-white border border-amber-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 text-amber-950 shadow-inner"
            />
            <Search className="w-4 h-4 text-amber-600 absolute left-3 top-2" />
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-amber-200 bg-amber-100/95 px-4 pt-2 pb-4 space-y-2">
          <button
            onClick={() => {
              setActiveTab('shop');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
              activeTab === 'shop'
                ? 'bg-orange-600 text-white'
                : 'text-amber-950 hover:bg-amber-200'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Fresh Fruits</span>
          </button>

          <button
            onClick={() => {
              onOpenCart();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-semibold bg-emerald-700 text-white"
          >
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-4 h-4" />
              <span>View Order</span>
            </div>
            {cartCount > 0 && (
              <span className="bg-amber-300 text-amber-950 px-2 py-0.5 rounded-full text-xs font-bold">
                {cartCount} items
              </span>
            )}
          </button>

          <a
            href="https://wa.me/919604017576?text=Hello%20Sankalp%20Fruits!%20I%20have%20an%20inquiry."
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold bg-emerald-600 text-white"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat on WhatsApp (+91 9604017576)</span>
          </a>
        </div>
      )}
    </header>
  );
};
