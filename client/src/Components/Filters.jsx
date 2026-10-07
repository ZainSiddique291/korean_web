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
    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full py-1">
      {CATS.map((c) => {
        const isActive = filter === c.value;
        const IconComponent = c.icon;
        const labelText = t(c.translationKey, c.defaultLabel);

        return (
          <button
            key={c.id}
            onClick={() => setFilter(c.value)}
            className={`whitespace-nowrap px-4 sm:px-6 md:px-7 py-2 sm:py-2.5 md:py-3 rounded-full text-xs sm:text-sm md:text-base font-medium transition-all duration-200 flex items-center justify-center gap-2 sm:gap-2.5 leading-none ${
              isActive
                ? 'bg-primary-600 text-white shadow-md shadow-primary-600/20 ring-2 ring-primary-600/30 font-semibold scale-[1.02]'
                : 'bg-white text-kdark-700 border border-surface-200 hover:border-primary-300 hover:text-primary-700 hover:bg-surface-50 shadow-2xs'
            }`}
          >
            {IconComponent && (
              <IconComponent
                className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : c.color || 'text-brand-500'}`}
              />
            )}
            <span className="translate-y-px">{labelText}</span>
          </button>
        );
      })}
    </div>
  );
};

export default Filters;
