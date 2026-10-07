import { Link } from 'react-router-dom';
import { ShoppingBag, Star, Check } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '../context/AppContext';

const colorPills = {
  green: 'bg-emerald-600 text-white',
  blue: 'bg-sky-600 text-white',
  maroon: 'bg-rose-900 text-white',
  orange: 'bg-amber-600 text-white',
};

const ProductCard = ({ product }) => {
  const { addToCart, showToast } = useApp();
  const [justAdded, setJustAdded] = useState(false);
  const {
    id,
    title,
    subtitle,
    tag,
    price,
    originalPrice,
    thumbnail,
    rating = 4.9,
    netVol = '30ml',
    colorLabel = 'green',
    keyIngredients = [],
  } = product;

  const prodId = id || product._id;

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setJustAdded(true);
    showToast(`Added to your bag ✨`);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const tagStyle = colorPills[colorLabel] || 'bg-primary-600 text-white';

  return (
    <Link
      to={`/product/${prodId}`}
      className="group bg-white rounded-3xl border border-surface-200/90 hover:border-primary-400 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between"
    >
      <div>
        {/* Thumbnail Container */}
        <div className="relative overflow-hidden bg-surface-50 aspect-square flex items-center justify-center p-3">
          <img
            src={thumbnail}
            alt={title}
            loading="lazy"
            className="w-full h-full object-contain rounded-2xl group-hover:scale-105 transition-transform duration-500 ease-out"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {tag && (
              <span className={`${tagStyle} text-xs font-bold px-3.5 py-1 rounded-full shadow-xs tracking-wide`}>
                {tag}
              </span>
            )}
            <span className="bg-white/95 backdrop-blur-xs text-kdark-800 border border-surface-200 text-xs font-semibold px-3 py-0.5 rounded-full w-max shadow-2xs">
              SEORA • Korea
            </span>
          </div>

          <span className="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-xs text-white text-xs font-medium px-3 py-1 rounded-md">
            {netVol}
          </span>
        </div>

        {/* Product Details */}
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between gap-1 mb-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
              SEORA
            </span>
            <div className="flex items-center gap-1.5 text-xs font-bold text-kdark-800 shrink-0">
              <Star className="w-4 h-4 text-brand-500 fill-brand-500" />
              <span>{typeof rating === 'number' ? rating.toFixed(1) : '4.9'}</span>
            </div>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-kdark-900 line-clamp-1 group-hover:text-primary-700 transition-colors">
            {title}
          </h3>

          {subtitle && (
            <p className="text-xs sm:text-sm text-gray-500 line-clamp-1 mt-1">
              {subtitle}
            </p>
          )}

          {keyIngredients && keyIngredients.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {keyIngredients.slice(0, 2).map((ing, i) => (
                <span
                  key={i}
                  className="text-xs font-medium px-3 py-1 bg-surface-100 text-gray-700 rounded-full border border-surface-200/60"
                >
                  {ing}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Price & Action Button */}
      <div className="p-4 sm:p-5 pt-0">
        <div className="flex items-baseline gap-2 mb-3.5">
          <span className="text-xl sm:text-2xl font-bold text-kdark-900 font-serif">
            ${Number(price).toFixed(2)}
          </span>
          {originalPrice && originalPrice > price && (
            <span className="text-xs sm:text-sm text-gray-400 line-through">
              ${Number(originalPrice).toFixed(2)}
            </span>
          )}
        </div>

        <button
          onClick={handleAdd}
          className={`w-full py-3 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] ${
            justAdded
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-primary-600 hover:bg-primary-700 text-white shadow-xs'
          }`}
        >
          {justAdded ? (
            <>
              <Check className="w-4 h-4" /> Added to Bag
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" /> Add to Bag
            </>
          )}
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
