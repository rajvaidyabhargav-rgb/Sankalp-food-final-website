import React from 'react';
import { ShoppingBag, ShieldCheck, Phone, CheckCircle2 } from 'lucide-react';
import sankalpLogo from '../assets/images/sankalp_official_logo_1786525825712.jpg';

interface HeroProps {
  onExploreShop: () => void;
  onOpenCart: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreShop,
  onOpenCart,
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-amber-100/80 via-orange-50/50 to-amber-50 pt-6 pb-10">
      {/* Decorative Organic Background Elements */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-96 h-96 rounded-full bg-orange-300/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 rounded-full bg-red-300/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Logo & Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-br from-amber-400 via-orange-500 to-red-600 shadow-md overflow-hidden shrink-0">
                <img
                  src={sankalpLogo}
                  alt="Sankalp Fruits & Food Products Official Emblem"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-xs uppercase tracking-wider">
                    Official Brand
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-200/90 text-amber-950 border border-amber-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                    100% Maharashtra Farm Produce
                  </span>
                </div>
                <p className="text-xs text-amber-900 font-bold font-serif">
                  संकल्प फ्रूट्स ॲन्ड फूड प्रोडक्ट्स • "शुद्धं सत्त्वं मधुरं फलम्"
                </p>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-amber-950 font-serif leading-tight">
              100% Farm-Fresh <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-red-600 to-amber-700">Sweetness & Quality Produce</span>
            </h1>

            {/* Slogan & Subtext */}
            <div className="p-3.5 bg-amber-100/90 border-l-4 border-orange-600 rounded-r-xl shadow-xs">
              <p className="text-xs sm:text-sm font-bold text-amber-950 font-serif tracking-wide">
                "शुद्धं सत्त्वं मधुरं फलम्" <span className="font-sans text-[11px] sm:text-xs font-normal text-amber-800">• Pure, wholesome and sweet fruit offerings.</span>
              </p>
            </div>

            <p className="text-xs sm:text-base text-amber-900/90 leading-relaxed max-w-2xl font-normal">
              Sankalp Fruits brings you hand-picked Ratnagiri & Devgad Alphonso mangoes, Nagpuri oranges, Solapur pomegranates, Nashik grapes, Dahanu chikoos, and fresh Maharashtra farm produce. Select your desired products and quantities, then place your order easily via WhatsApp!
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-2">
              <button
                onClick={onExploreShop}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Browse Fresh Fruits</span>
              </button>

              <button
                onClick={onOpenCart}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-200/90 hover:bg-amber-300 text-amber-950 font-bold text-xs sm:text-sm border border-amber-300/80 transition-all shadow-xs"
              >
                <ShoppingBag className="w-4 h-4 text-emerald-700" />
                <span>View My Order</span>
              </button>

              <a
                href="https://wa.me/919604017576?text=Hello%20Sankalp%20Fruits!%20I%20want%20to%20inquire%20about%20fruit%20availability."
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm transition-all shadow-xs"
              >
                <Phone className="w-4 h-4" />
                <span>WhatsApp Inquiry</span>
              </a>
            </div>

            {/* Quick Guarantees Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-amber-200/80">
              <div className="flex items-center gap-2.5 bg-amber-100/40 sm:bg-transparent p-2 sm:p-0 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 font-bold text-xs shrink-0">
                  🌱
                </div>
                <div>
                  <p className="text-xs font-bold text-amber-950">100% Tree Ripened</p>
                  <p className="text-[10px] text-amber-800">Zero carbide or chemicals</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-amber-100/40 sm:bg-transparent p-2 sm:p-0 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-xs shrink-0">
                  ✨
                </div>
                <div>
                  <p className="text-xs font-bold text-amber-950">Hand-Graded Quality</p>
                  <p className="text-[10px] text-amber-800">Inspected farm produce</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-amber-100/40 sm:bg-transparent p-2 sm:p-0 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs shrink-0">
                  📲
                </div>
                <div>
                  <p className="text-xs font-bold text-amber-950">Direct WhatsApp Order</p>
                  <p className="text-[10px] text-amber-800">Quick stock confirmation</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Image Feature Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden bg-white p-3 shadow-xl border border-amber-200">
              <div className="relative h-72 sm:h-80 w-full rounded-xl overflow-hidden group">
                <img
                  src="/src/assets/images/fruit_store_display_1786525124308.jpg"
                  alt="Sankalp Fresh Fruits Store Display"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Floating Badge on Image */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-extrabold text-amber-950 shadow-md flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>100% Farm Fresh Store</span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-3 left-3 right-3 text-white space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300">
                    SANKALP FRESH PRODUCE
                  </span>
                  <h3 className="text-lg font-bold font-serif leading-tight">
                    Premium Alphonso Mangoes, Oranges, Pomegranates & Fresh Produce
                  </h3>
                  <p className="text-xs text-amber-200 font-medium">
                    Order online & confirm availability directly on WhatsApp
                  </p>
                </div>
              </div>

              {/* Bottom Quick Contact Bar */}
              <div className="mt-3 bg-amber-50 rounded-xl p-3 border border-amber-200 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-amber-950">Have questions about stock?</p>
                  <p className="text-[10px] text-amber-800">Chat directly with our store desk</p>
                </div>
                <a
                  href="https://wa.me/919604017576?text=Hi%20Sankalp%20Fruits,%20I%20have%20an%20order%20inquiry."
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>WhatsApp Desk</span>
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
