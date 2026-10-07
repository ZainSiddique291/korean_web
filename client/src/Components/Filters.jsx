import { useApp } from '../context/AppContext';
import { Sparkles, ShieldCheck, Droplet, Sun } from 'lucide-react';

const CATS = [
  { id: 'all', translationKey: 'filterAll', defaultLabel: 'All Core Serums', value: 'all', icon: Sparkles },
  { id: 'green', translationKey: 'filterGreen', defaultLabel: 'Anti-Acne Solution (Green)', value: 'green', icon: ShieldCheck, color: 'text-emerald-600' },
  { id: 'blue', translationKey: 'filterBlue', defaultLabel: 'Glass Skin 10% Niacinamide (Blue)', value: 'blue', icon: Droplet, color: 'text-sky-600' },
  { id: 'orange', translationKey: 'filterOrange', defaultLabel: 'Vitamin C Brightening (Orange)', value: 'orange', icon: Sun, color: 'text-amber-600' },
];

const Filters = () => {
  const { filter, setFilter, t } = useApp();

  return (
    <div className="w-full">
      {/* 
        Mobile: Single horizontal scrollable row, exactly ~2 options visible, smooth swipe, hidden scrollbar.
        Desktop (md+): Centered, balanced flex row with zero scroll.
      */}
      <div className="flex md:flex-wrap items-center md:justify-center overflow-x-auto md:overflow-visible no-scrollbar scroll-smooth gap-2.5 sm:gap-3 md:gap-4 w-full py-1.5 px-1 sm:px-0 snap-x snap-mandatory">
        {CATS.map((c) => {
          const isActive = filter === c.value;
          const IconComponent = c.icon;
          const labelText = t(c.translationKey, c.defaultLabel);

          return (
            <button
              key={c.id}
              onClick={() => setFilter(c.value)}
              className={`whitespace-nowrap shrink-0 snap-start w-[calc(48vw-18px)] min-w-[145px] max-w-[210px] md:w-auto md:min-w-0 md:max-w-none h-11 sm:h-12 md:h-auto px-3.5 sm:px-4 md:px-7 py-2.5 md:py-3 rounded-full text-xs sm:text-sm md:text-base font-medium transition-all duration-200 flex items-center justify-center gap-2 sm:gap-2.5 leading-none select-none ${
                isActive
                  ? 'bg-primary-600 text-white shadow-md shadow-primary-600/20 ring-2 ring-primary-600/30 font-semibold scale-[1.01] md:scale-[1.02]'
                  : 'bg-white text-kdark-700 border border-surface-200 hover:border-primary-300 hover:text-primary-700 hover:bg-surface-50 shadow-2xs'
              }`}
            >
              {IconComponent && (
                <IconComponent
                  className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : c.color || 'text-brand-500'}`}
                />
              )}
              <span className="truncate translate-y-px">{labelText}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Filters;
