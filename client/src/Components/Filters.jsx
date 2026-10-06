import { useApp } from '../context/AppContext';
import { Sparkles, ShieldCheck, Droplet, Sun, Zap } from 'lucide-react';

const CATS = [
  { id: 'all', label: 'All 4 Core Serums', value: 'all', icon: Sparkles },
  { id: 'green', label: 'Anti-Acne Solution (Green)', value: 'green', icon: ShieldCheck, color: 'text-emerald-600' },
  { id: 'blue', label: 'Glass Skin 10% Niacinamide (Blue)', value: 'blue', icon: Droplet, color: 'text-sky-600' },
  { id: 'maroon', label: 'Moisture X Firmness (Maroon)', value: 'maroon', icon: Zap, color: 'text-rose-700' },
  { id: 'orange', label: 'Vitamin C Brightening (Orange)', value: 'orange', icon: Sun, color: 'text-amber-600' },
];

const Filters = () => {
  const { filter, setFilter } = useApp();

  return (
    <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none">
      {CATS.map((c) => {
        const isActive = filter === c.value;
        const IconComponent = c.icon;
        return (
          <button
            key={c.id}
            onClick={() => setFilter(c.value)}
            className={`whitespace-nowrap px-4.5 py-2.5 rounded-full text-sm sm:text-base font-semibold transition-all duration-200 shrink-0 flex items-center gap-2 ${
              isActive
                ? 'bg-primary-600 text-white shadow-sm ring-2 ring-primary-600/20'
                : 'bg-white text-kdark-700 border border-surface-200 hover:border-primary-300 hover:text-primary-700'
            }`}
          >
            {IconComponent && (
              <IconComponent
                className={`w-4 h-4 ${isActive ? 'text-white' : c.color || 'text-brand-500'}`}
              />
            )}
            {c.label}
          </button>
        );
      })}
    </div>
  );
};

export default Filters;
