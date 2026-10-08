import { Link } from 'react-router-dom';
import { ShoppingBag, Star, Check, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '../context/AppContext';

const colorPills = {
  green: 'bg-emerald-600 text-white',
  blue: 'bg-sky-600 text-white',
  maroon: 'bg-rose-900 text-white',
  orange: 'bg-amber-600 text-white',
};

const ProductCard = ({ product }) => {
  const { addToCart, showToast, t } = useApp();
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
    benefits = [],
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

  // Extract a clean, concise one-line benefit / description
  const cleanBenefit = (() => {
    if (benefits && benefits.length > 0) {
      return benefits[0];
    }
    if (subtitle) {
      return subtitle.replace(/^SKIN SOLUTION\s*[-–:]\s*/i, '').trim();
    }
    return 'Korean active skincare formula';
  })();

  return (
    <Link
      to={`/product/${prodId}`}
      className="group bg-white rounded-2xl sm:rounded-3xl border border-surface-200/80 hover:border-primary-400 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between h-full"
    >
      <div>
        {/* Product Image Container */}
        <div className="relative overflow-hidden bg-surface-50/70 aspect-square flex items-center justify-center p-2.5 sm:p-3">
          <img
            src={thumbnail}
            alt={title}
            loading="lazy"
            className="w-full h-full object-contain rounded-xl group-hover:scale-105 transition-transform duration-500 ease-out max-h-[140px] min-[440px]:max-h-[160px] sm:max-h-[185px]"
          />

          {/* Minimal Tag Badge */}
          {tag && (
            <span
              className={`absolute top-2 left-2 ${tagStyle} text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-0.5 rounded-full shadow-2xs tracking-wider uppercase`}
            >
              {tag}
            </span>
          )}

          {/* Quick Add Floating Button (Accessible without adding vertical card height) */}
          <button
            onClick={handleAdd}
            title={t('addToBag', 'Add to Bag')}
            aria-label={t('addToBag', 'Add to Bag')}
            className={`absolute top-2 right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full shadow-xs flex items-center justify-center transition-all duration-200 ${
              justAdded
                ? 'bg-emerald-600 text-white opacity-100 scale-105'
                : 'bg-white/95 text-kdark-700 hover:bg-primary-600 hover:text-white opacity-90 sm:opacity-0 sm:group-hover:opacity-100'
            }`}
          >
            {justAdded ? <Check className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
          </button>

          {/* Net Volume Pill */}
          <span className="absolute bottom-2 right-2 text-[10px] font-medium text-gray-500 bg-white/90 backdrop-blur-xs px-1.5 py-0.5 rounded border border-surface-200/60 shadow-2xs">
            {netVol}
          </span>
        </div>

        {/* Product Information */}
        <div className="p-3 sm:p-4 pb-2">
          {/* Product Name */}
          <h3 className="font-bold text-xs sm:text-[14px] text-kdark-900 line-clamp-1 group-hover:text-primary-700 transition-colors leading-snug">
            {title}
          </h3>

          {/* Short One-Line Benefit / Description */}
          <p className="text-[11px] sm:text-xs text-gray-500 line-clamp-1 mt-0.5 sm:mt-1 leading-tight">
            {cleanBenefit}
          </p>

          {/* Price & Rating in Balanced Single Row */}
          <div className="flex items-center justify-between gap-1.5 mt-2.5 pt-2 border-t border-surface-100">
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm sm:text-base font-bold text-kdark-900 font-serif">
                ${Number(price).toFixed(2)}
              </span>
              {originalPrice && originalPrice > price && (
                <span className="text-[10px] sm:text-xs text-gray-400 line-through">
                  ${Number(originalPrice).toFixed(2)}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-amber-700 bg-amber-50/90 px-1.5 py-0.5 rounded-md shrink-0">
              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
              <span>{typeof rating === 'number' ? rating.toFixed(1) : '4.9'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button: Clear "View Details" */}
      <div className="p-3 sm:p-4 pt-0">
        <div className="w-full py-1.5 sm:py-2 px-3 rounded-lg sm:rounded-xl text-xs sm:text-[13px] font-semibold text-primary-700 bg-primary-50/80 group-hover:bg-primary-600 group-hover:text-white border border-primary-200/80 group-hover:border-primary-600 transition-all duration-200 flex items-center justify-center gap-1.5 shadow-2xs">
          <span>{t('viewDetails', 'View Details')}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
