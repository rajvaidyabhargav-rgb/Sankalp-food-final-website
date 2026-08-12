import React from 'react';
import { Phone, Clock, ShieldCheck, ShoppingBag, MessageSquare } from 'lucide-react';
import sankalpLogo from '../assets/images/sankalp_official_logo_1786525825712.jpg';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenCart: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenCart }) => {
  return (
    <footer className="bg-amber-950 text-amber-100 border-t-4 border-orange-600 pt-8 sm:pt-10 pb-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
          
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 p-0.5 shadow-md shrink-0 overflow-hidden">
                <img
                  src={sankalpLogo}
                  alt="Sankalp Fruits Official Logo"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold font-serif text-white tracking-wide">
                  SANKALP <span className="text-orange-500 font-sans text-sm font-extrabold">FRUITS</span>
                </h3>
                <p className="text-xs text-amber-300 font-bold">& Food Products • 100% Farm Fresh</p>
              </div>
            </div>

            <div className="p-3 bg-white/5 border-l-2 border-orange-500 rounded-r-lg text-xs space-y-0.5 max-w-md">
              <p className="text-amber-200 font-serif font-bold text-sm">"शुद्धं सत्त्वं मधुरं फलम्"</p>
              <p className="text-amber-400 text-[10px] font-sans">100% Tree-Ripened Farm Fresh Produce • Direct Sourcing</p>
            </div>

            <p className="text-xs text-amber-200/80 leading-relaxed max-w-md">
              Your trusted store for 100% tree-ripened Alphonso mangoes, Nagpuri oranges, Solapur pomegranates, Nashik grapes, Dahanu chikoos, and fresh Maharashtra farm produce. Select your items and order directly via WhatsApp.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-serif">
              Store Navigation
            </h4>
            <ul className="space-y-2 text-xs text-amber-200/90 font-medium">
              <li>
                <button onClick={() => setActiveTab('shop')} className="hover:text-orange-400 transition-colors flex items-center gap-1.5">
                  <ShoppingBag className="w-3.5 h-3.5 text-orange-500" />
                  <span>Fresh Fruits Catalog</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenCart} className="hover:text-orange-400 transition-colors flex items-center gap-1.5">
                  <ShoppingBag className="w-3.5 h-3.5 text-emerald-500" />
                  <span>View My Order Summary</span>
                </button>
              </li>
              <li>
                <a 
                  href="https://wa.me/919604017576?text=Hello%20Sankalp%20Fruits!%20I%20want%20to%20place%20an%20order." 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-orange-400 transition-colors flex items-center gap-1.5 text-emerald-300 font-bold"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp Order Desk</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Store Contact */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-serif">
              Store Desk & Contact
            </h4>

            <div className="space-y-2.5 text-xs text-amber-200">
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Call Desk:</p>
                  <p className="text-amber-300">+91 9923583855, +91 9767826716</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">WhatsApp Orders:</p>
                  <p className="text-emerald-300 font-bold">+91 9604017576, +91 9130301977</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Store Hours:</p>
                  <p className="text-amber-300">Open 7 Days • 7:00 AM to 10:00 PM</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-amber-900/80 flex flex-col sm:flex-row items-center justify-between text-xs text-amber-400 gap-3">
          <p>© {new Date().getFullYear()} Sankalp Fruits & Food Products. All Rights Reserved.</p>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Farm-Fresh Quality Guaranteed</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
