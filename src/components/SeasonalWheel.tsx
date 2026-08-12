import React, { useState } from 'react';
import { MONTHLY_SEASONALITY } from '../data/fruitData';
import { Calendar, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface SeasonalWheelProps {
  onSelectCategory: (cat: string) => void;
}

export const SeasonalWheel: React.FC<SeasonalWheelProps> = ({ onSelectCategory }) => {
  const currentMonthIndex = new Date().getMonth(); // 0-11
  const [activeMonthIndex, setActiveMonthIndex] = useState<number>(currentMonthIndex);

  const selectedData = MONTHLY_SEASONALITY[activeMonthIndex];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-200">
          <Calendar className="w-3.5 h-3.5" />
          Indian Fruit Harvest Calendar
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold font-serif text-amber-950">
          Seasonal Availability & Peak Harvest Guide
        </h2>
        <p className="text-xs sm:text-sm text-amber-800">
          At Sankalp Fruits, we source fruits directly at their peak sweetness and optimal ripeness. Click any month below to discover what is naturally at its best right now!
        </p>
      </div>

      {/* 12 Months Pills Selector */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
        {MONTHLY_SEASONALITY.map((item, index) => {
          const isActive = activeMonthIndex === index;
          const isCurrent = currentMonthIndex === index;

          return (
            <button
              key={item.month}
              onClick={() => setActiveMonthIndex(index)}
              className={`p-3 rounded-xl text-center border transition-all relative ${
                isActive
                  ? 'bg-orange-600 text-white border-orange-600 shadow-md transform -translate-y-0.5'
                  : 'bg-white text-amber-950 border-amber-200 hover:bg-amber-100/50'
              }`}
            >
              {isCurrent && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[8px] font-extrabold px-1.5 py-0.2 rounded-full uppercase">
                  NOW
                </span>
              )}
              <p className="text-xs font-bold">{item.month}</p>
              <p className={`text-[9px] mt-0.5 font-medium truncate ${isActive ? 'text-orange-100' : 'text-amber-700'}`}>
                {item.status}
              </p>
            </button>
          );
        })}
      </div>

      {/* Selected Month Harvest Card */}
      <div className="bg-gradient-to-r from-amber-900 via-orange-900 to-amber-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        <div className="md:col-span-8 space-y-4">
          <div className="flex items-center gap-2">
            <span className="bg-amber-400 text-amber-950 font-extrabold text-xs px-3 py-1 rounded-full uppercase">
              {selectedData.month} Harvest Highlight
            </span>
            <span className="text-xs text-amber-200 font-semibold">• {selectedData.status}</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold font-serif leading-tight">
            {selectedData.highlight}
          </h3>

          <div className="space-y-2 pt-2">
            <p className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              Peak Quality Produce Available This Month:
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedData.fruits.map((fruit, idx) => (
                <span
                  key={idx}
                  className="bg-white/10 backdrop-blur-md text-amber-100 text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/20 flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{fruit}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-4 bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 space-y-4 text-center">
          <div className="w-12 h-12 rounded-full bg-amber-400/20 flex items-center justify-center mx-auto text-2xl">
            🧺
          </div>
          <div>
            <h4 className="text-sm font-bold text-amber-200">100% Tree-Ripened Guarantee</h4>
            <p className="text-xs text-amber-100/80 mt-1">
              Sourced directly from orchards in Maharashtra, Kashmir, and Tamil Nadu.
            </p>
          </div>
          <button
            onClick={() => onSelectCategory('seasonal')}
            className="w-full py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all"
          >
            <span>Shop Seasonal Fruits</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
