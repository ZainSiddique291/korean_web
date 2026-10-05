import { Link } from 'react-router-dom';
import { ShoppingBag, Star, Check } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '../context/AppContext';

const ProductCard = ({ product }) => {
  const { addToCart, showToast } = useApp();
  const [justAdded, setJustAdded] = useState(false);
  const { id, title, price, thumbnail, rating, discountPercentage, category } = product;

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setJustAdded(true);
    showToast(`Added to your shopping bag ✨`);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const originalPrice = discountPercentage && discountPercentage > 5
    ? (price / (1 - discountPercentage / 100)).toFixed(2)
    : null;

  return (
    <Link
      to={`/product/${id}`}
      className="group bg-white rounded-2xl border border-surface-200/90 hover:border-primary-300 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between"
    >
      <div>
        {/* Thumbnail Container */}
        <div className="relative overflow-hidden bg-surface-50 aspect-square flex items-center justify-center p-3">
          <img
            src={thumbnail}
            alt={title}
            loading="lazy"
            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500 ease-out"
          />

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
            {discountPercentage > 8 && (
              <span className="bg-kaccent-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                -{Math.round(discountPercentage)}%
              </span>
            )}
            <span className="bg-white/90 backdrop-blur-xs text-primary-800 border border-surface-200 text-[10px] font-semibold px-2 py-0.5 rounded-full">
              Seoul Sourced
            </span>
          </div>
        </div>

        {/* Product Details */}
        <div className="p-3.5 sm:p-4">
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-medium uppercase tracking-wider text-brand-600 truncate">
              {category || 'Skincare'}
            </span>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-kdark-700 shrink-0">
              <Star className="w-3 h-3 text-brand-500 fill-brand-500" />
              <span>{rating ? rating.toFixed(1) : '4.9'}</span>
            </div>
          </div>

          <h3 className="text-xs sm:text-sm font-semibold text-kdark-900 line-clamp-2 min-h-[2.5rem] leading-snug group-hover:text-primary-700 transition-colors">
            {title}
          </h3>
        </div>
      </div>

      {/* Price & Action Button */}
      <div className="p-3.5 sm:p-4 pt-0">
        <div className="flex items-baseline gap-1.5 mb-3">
          <span className="text-base sm:text-lg font-bold text-kdark-900 font-serif">
            ${Number(price).toFixed(2)}
          </span>
          {originalPrice && (
            <span className="text-xs text-gray-400 line-through">
              ${originalPrice}
            </span>
          )}
        </div>

        <button
          onClick={handleAdd}
          className={`w-full py-2 sm:py-2.5 px-3 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 active:scale-[0.98] ${
            justAdded
              ? 'bg-emerald-600 text-white'
              : 'bg-primary-600 hover:bg-primary-700 text-white shadow-xs'
          }`}
        >
          {justAdded ? (
            <>
              <Check className="w-3.5 h-3.5" /> Added
            </>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5" /> Add to Bag
            </>
          )}
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
