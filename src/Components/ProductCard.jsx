import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';

const ProductCard = ({ product }) => {
  const { addToCart, showToast } = useApp();
  const { id, title, price, thumbnail, rating, discountPercentage } = product;

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart(product);
    showToast(`Added to cart ✅`);
  };

  return (
    <Link to={`/product/${id}`} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
      <div className="relative overflow-hidden bg-gray-50 h-52">
        <img src={thumbnail} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        {discountPercentage > 10 && <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-lg">-{Math.round(discountPercentage)}%</span>}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2 flex-1">{title}</h3>
        <div className="flex items-center gap-1 mb-3">
          <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
          <span className="text-xs text-gray-500">{rating?.toFixed(1)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">${price}</span>
          <button onClick={handleAdd} className="flex items-center gap-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold px-3 py-2 rounded-xl active:scale-95 transition-all">
            <ShoppingCart className="w-3.5 h-3.5" />Add
          </button>
        </div>
      </div>
    </Link>
  );
};
export default ProductCard;
