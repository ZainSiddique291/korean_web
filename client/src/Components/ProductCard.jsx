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
          <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
            {tag && (
              <span className={`${tagStyle} text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs tracking-wide`}>
                {tag}
              </span>
            )}
            <span className="bg-white/95 backdrop-blur-xs text-kdark-800 border border-surface-200 text-[10px] font-semibold px-2 py-0.5 rounded-full w-max">
              SEORA • Korea
            </span>
          </div>

          <span className="absolute bottom-2.5 right-2.5 bg-black/40 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded-md">
            {netVol}
          </span>
        </div>

        {/* Product Details */}
        <div className="p-4">
          <div className="flex items-center justify-between gap-1 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-700">
              SEORA
            </span>
            <div className="flex items-center gap-1 text-[11px] font-bold text-kdark-800 shrink-0">
              <Star className="w-3.5 h-3.5 text-brand-500 fill-brand-500" />
              <span>{typeof rating === 'number' ? rating.toFixed(1) : '4.9'}</span>
            </div>
          </div>

          <h3 className="text-sm sm:text-base font-bold text-kdark-900 line-clamp-1 group-hover:text-primary-700 transition-colors">
            {title}
          </h3>

          {subtitle && (
            <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
              {subtitle}
            </p>
          )}

          {keyIngredients && keyIngredients.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2.5">
              {keyIngredients.slice(0, 2).map((ing, i) => (
                <span
                  key={i}
                  className="text-[10px] font-medium px-2 py-0.5 bg-surface-100 text-gray-600 rounded-full"
                >
                  {ing}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Price & Action Button */}
      <div className="p-4 pt-0">
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-lg sm:text-xl font-black text-kdark-900 font-serif">
            ${Number(price).toFixed(2)}
          </span>
          {originalPrice && originalPrice > price && (
            <span className="text-xs text-gray-400 line-through">
              ${Number(originalPrice).toFixed(2)}
            </span>
          )}
        </div>

        <button
          onClick={handleAdd}
          className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 active:scale-[0.98] ${
            justAdded
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-primary-600 hover:bg-primary-700 text-white shadow-xs'
          }`}
        >
          {justAdded ? (
            <>
              <Check className="w-3.5 h-3.5" /> Added to Bag
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
