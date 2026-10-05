import { useApp } from '../context/AppContext';
import { Sparkles } from 'lucide-react';

const CATS = [
  { id: 1, label: 'All Products', value: 'all' },
  { id: 5, label: 'Beauty & Skincare', value: 'beauty' },
  { id: 4, label: 'Fragrances & Mists', value: 'fragrances' },
  { id: 2, label: 'Smartphones', value: 'smartphones' },
  { id: 3, label: 'Laptops', value: 'laptops' },
  { id: 6, label: 'Groceries & Health', value: 'groceries' },
  { id: 7, label: 'Home & Living', value: 'furniture' },
  { id: 8, label: 'Kitchen Care', value: 'kitchen-accessories' },
];

const Filters = () => {
  const { filter, setFilter } = useApp();

  return (
    <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none">
      {CATS.map((c) => {
        const isActive = filter === c.value;
        return (
          <button
            key={c.id}
            onClick={() => setFilter(c.value)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 shrink-0 ${
              isActive
                ? 'bg-primary-600 text-white shadow-sm ring-2 ring-primary-600/20'
                : 'bg-white text-kdark-700 border border-surface-200 hover:border-primary-300 hover:text-primary-700'
            }`}
          >
            {c.value === 'beauty' && <Sparkles className="w-3.5 h-3.5 inline mr-1 text-brand-400" />}
            {c.label}
          </button>
        );
      })}
    </div>
  );
};

export default Filters;
