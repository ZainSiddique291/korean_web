import { Loader2, WifiOff } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProductCard from './ProductCard';

const Products = () => {
  const { products, loading, error, searchTerm } = useApp();
  const filtered = searchTerm
    ? products.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.category.toLowerCase().includes(searchTerm.toLowerCase()))
    : products;

  if (loading) return <div className="min-h-64 flex flex-col items-center justify-center gap-3"><Loader2 className="w-10 h-10 animate-spin text-blue-500" /><p className="text-sm text-gray-400">Loading products...</p></div>;
  if (error) return <div className="min-h-64 flex flex-col items-center justify-center gap-3 text-red-400"><WifiOff className="w-10 h-10" /><p className="text-sm">{error}</p></div>;
  if (!filtered.length) return <div className="min-h-64 flex items-center justify-center"><p className="text-gray-400 text-lg font-medium">No products found.</p></div>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {filtered.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  );
};
export default Products;
