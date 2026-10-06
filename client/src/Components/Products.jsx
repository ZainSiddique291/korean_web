import { Loader2, WifiOff, ArrowUpDown, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProductCard from './ProductCard';

const Products = () => {
  const { products, loading, error, searchTerm, sortBy, setSortBy } = useApp();

  // Filter by search query
  let filtered = searchTerm
    ? products.filter(
        (p) =>
          p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.tag?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.colorLabel?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (p.keyIngredients &&
            p.keyIngredients.some((k) =>
              k.toLowerCase().includes(searchTerm.toLowerCase())
            ))
      )
    : products;

  // Sort products
  if (sortBy === 'price-asc') {
    filtered = [...filtered].sort((a, b) => Number(a.price) - Number(b.price));
  } else if (sortBy === 'price-desc') {
    filtered = [...filtered].sort((a, b) => Number(b.price) - Number(a.price));
  } else if (sortBy === 'rating') {
    filtered = [...filtered].sort((a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0));
  }

  if (loading) {
    return (
      <div className="min-h-72 flex flex-col items-center justify-center gap-3 py-16">
        <Loader2 className="w-9 h-9 animate-spin text-primary-600" />
        <p className="text-sm font-medium text-gray-500">Preparing authentic SEORA formulations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-72 flex flex-col items-center justify-center gap-3 py-16 text-center">
        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-500">
          <WifiOff className="w-6 h-6" />
        </div>
        <p className="text-sm font-medium text-gray-700">{error}</p>
      </div>
    );
  }

  if (!filtered.length) {
    return (
      <div className="min-h-72 flex flex-col items-center justify-center gap-2 py-16 text-center">
        <Sparkles className="w-8 h-8 text-brand-400" />
        <p className="text-base font-semibold text-kdark-800">No SEORA formula matches your search</p>
        <p className="text-xs text-gray-400">Try searching for &quot;Niacinamide&quot;, &quot;Acne&quot;, &quot;Vitamin C&quot;, or &quot;Firmness&quot;.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Top control bar: item count and sorting */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-3 border-b border-surface-200 text-sm text-gray-600">
        <div className="font-medium text-kdark-800">
          Showing <span className="font-bold text-kdark-900">{filtered.length}</span> SEORA formula
          {filtered.length === 1 ? '' : 's'}
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <ArrowUpDown className="w-4 h-4 text-gray-400" />
          <span className="font-medium">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-surface-200 rounded-xl px-3 py-1.5 text-sm font-medium text-kdark-800 outline-none focus:border-primary-500 shadow-2xs"
          >
            <option value="featured">Featured Collection</option>
            <option value="rating">Top Rated (★)</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 min-[440px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filtered.map((p) => (
          <ProductCard key={p.id || p._id} product={p} />
        ))}
      </div>
    </div>
  );
};

export default Products;
