import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ShoppingBag,
  Star,
  Loader2,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Check,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart, showToast, products } = useApp();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [added, setAdded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    // First check local products in AppContext
    const localMatch = products.find((p) => String(p.id) === String(id));
    if (localMatch) {
      setProduct(localMatch);
      setSelectedImg(localMatch.thumbnail || (localMatch.images && localMatch.images[0]));
      setLoading(false);
      return;
    }

    // Otherwise fetch
    fetch(`https://dummyjson.com/products/${id}`)
      .then((r) => r.json())
      .then((d) => {
        setProduct(d);
        setSelectedImg(d.thumbnail || (d.images && d.images[0]));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id, products]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    setAdded(true);
    showToast(`Added ${quantity} item(s) to bag ✨`);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = () => {
    if (!product) return;
    addToCart(product, quantity);
    navigate('/shipping');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 pt-20">
        <Loader2 className="w-9 h-9 animate-spin text-primary-600" />
        <p className="text-sm text-gray-500">Loading Korean skincare formula...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-4 text-center">
        <p className="text-base font-semibold text-kdark-800 mb-4">Product not found</p>
        <button onClick={() => navigate('/')} className="btn-primary">
          Back to Store
        </button>
      </div>
    );
  }

  const {
    title,
    description,
    price,
    thumbnail,
    images = [],
    rating = 4.9,
    brand,
    category,
    discountPercentage,
    stock = 15,
  } = product;

  const originalPrice =
    discountPercentage && discountPercentage > 5
      ? (price / (1 - discountPercentage / 100)).toFixed(2)
      : null;

  const allImages = images && images.length > 0 ? images : [thumbnail];

  return (
    <div className="bg-surface-50 min-h-screen pb-20 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link to="/" className="hover:text-primary-700">
            Home
          </Link>
          <span>/</span>
          <span className="capitalize">{category || 'Skincare'}</span>
          <span>/</span>
          <span className="text-kdark-800 truncate max-w-[200px]">{title}</span>
        </div>

        {/* Product Details Grid */}
        <div className="bg-white rounded-3xl border border-surface-200 p-6 sm:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Gallery */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-square rounded-2xl bg-surface-50 border border-surface-200 overflow-hidden flex items-center justify-center p-6">
              <img
                src={selectedImg || thumbnail}
                alt={title}
                className="w-full h-full object-contain mix-blend-multiply transition-all duration-300"
              />
              <span className="absolute top-4 left-4 bg-primary-600 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-xs">
                Authentic K-Beauty
              </span>
            </div>

            {/* Thumbnail selector */}
            {allImages.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImg(img)}
                    className={`w-16 h-16 rounded-xl border-2 p-1 bg-surface-50 shrink-0 transition-all ${
                      selectedImg === img ? 'border-primary-600 shadow-xs' : 'border-surface-200 hover:border-primary-300'
                    }`}
                  >
                    <img src={img} alt={`View ${idx}`} className="w-full h-full object-contain mix-blend-multiply" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info & Purchase Controls */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs uppercase tracking-widest font-bold text-brand-600">
                  {brand || 'K-Beauty Pure'}
                </span>
                <span className="text-gray-300">•</span>
                <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> In Stock ({stock} available)
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-kdark-900 font-serif mb-3 leading-snug">
                {title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-5">
                <div className="flex items-center gap-1 bg-brand-50 px-2.5 py-1 rounded-lg">
                  <Star className="w-3.5 h-3.5 text-brand-500 fill-brand-500" />
                  <span className="text-xs font-bold text-brand-700">
                    {typeof rating === 'number' ? rating.toFixed(1) : '4.9'}
                  </span>
                </div>
                <span className="text-xs text-gray-400">Based on 120+ verified customer reviews</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6 p-4 rounded-2xl bg-surface-50 border border-surface-200">
                <span className="text-3xl font-black text-kdark-900 font-serif">
                  ${Number(price).toFixed(2)}
                </span>
                {originalPrice && (
                  <span className="text-base text-gray-400 line-through">
                    ${originalPrice}
                  </span>
                )}
                {discountPercentage > 5 && (
                  <span className="text-xs font-bold text-kaccent-600 bg-kaccent-50 px-2.5 py-0.5 rounded-full">
                    Save {Math.round(discountPercentage)}%
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                {description}
              </p>

              {/* Quantity Selector & Action Buttons */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-kdark-800">Quantity:</span>
                  <div className="inline-flex items-center border border-surface-200 rounded-full bg-white p-1">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-100 text-gray-600 font-bold transition-colors"
                    >
                      -
                    </button>
                    <span className="w-10 text-center font-bold text-sm text-kdark-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-100 text-gray-600 font-bold transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 btn-primary py-3 text-sm font-semibold flex items-center justify-center gap-2"
                  >
                    {added ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                    {added ? 'Added to Bag!' : 'Add to Bag'}
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="flex-1 btn-brand py-3 text-sm font-semibold flex items-center justify-center gap-2"
                  >
                    Instant Checkout (COD)
                  </button>
                </div>
              </div>
            </div>

            {/* Trust Badges in Product Box */}
            <div className="pt-6 border-t border-surface-200 grid grid-cols-3 gap-3 text-center">
              <div className="flex flex-col items-center">
                <ShieldCheck className="w-5 h-5 text-primary-600 mb-1" />
                <span className="text-[11px] font-semibold text-kdark-800">100% Authentic</span>
                <span className="text-[10px] text-gray-400">Direct from Seoul</span>
              </div>
              <div className="flex flex-col items-center">
                <Truck className="w-5 h-5 text-brand-600 mb-1" />
                <span className="text-[11px] font-semibold text-kdark-800">Express Delivery</span>
                <span className="text-[10px] text-gray-400">2-4 Business Days</span>
              </div>
              <div className="flex flex-col items-center">
                <RotateCcw className="w-5 h-5 text-sage-600 mb-1" />
                <span className="text-[11px] font-semibold text-kdark-800">Cash on Delivery</span>
                <span className="text-[10px] text-gray-400">Or Bank / JazzCash</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Info Section: Description, Ingredients, Delivery */}
        <div className="mt-10 bg-white rounded-3xl border border-surface-200 p-6 sm:p-8">
          <div className="flex gap-6 border-b border-surface-200 pb-3 mb-6">
            <button
              onClick={() => setActiveTab('description')}
              className={`text-sm font-semibold pb-2 border-b-2 transition-all ${
                activeTab === 'description'
                  ? 'border-primary-600 text-primary-700'
                  : 'border-transparent text-gray-500 hover:text-kdark-900'
              }`}
            >
              Formula Description
            </button>
            <button
              onClick={() => setActiveTab('ingredients')}
              className={`text-sm font-semibold pb-2 border-b-2 transition-all ${
                activeTab === 'ingredients'
                  ? 'border-primary-600 text-primary-700'
                  : 'border-transparent text-gray-500 hover:text-kdark-900'
              }`}
            >
              Key Actives & Benefits
            </button>
            <button
              onClick={() => setActiveTab('shipping')}
              className={`text-sm font-semibold pb-2 border-b-2 transition-all ${
                activeTab === 'shipping'
                  ? 'border-primary-600 text-primary-700'
                  : 'border-transparent text-gray-500 hover:text-kdark-900'
              }`}
            >
              Shipping & COD Details
            </button>
          </div>

          {activeTab === 'description' && (
            <div className="text-sm text-gray-600 leading-relaxed space-y-3">
              <p>{description}</p>
              <p>
                Crafted following strict Korean skincare manufacturing standards (K-FDA approved), this formula focuses on barrier recovery, deep cellular hydration, and soothing irritated skin.
              </p>
            </div>
          )}

          {activeTab === 'ingredients' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-gray-600">
              <div className="p-4 rounded-xl bg-surface-50 border border-surface-200">
                <h4 className="font-bold text-kdark-900 mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-500" /> Centella Asiatica & Heartleaf
                </h4>
                <p>Calms redness, speeds up micro-barrier healing, and prevents future flare-ups.</p>
              </div>
              <div className="p-4 rounded-xl bg-surface-50 border border-surface-200">
                <h4 className="font-bold text-kdark-900 mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-500" /> Multi-Molecular Hyaluronic Acid
                </h4>
                <p>Draws moisture deep into inner epidermal layers for all-day plumpness.</p>
              </div>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="text-xs sm:text-sm text-gray-600 space-y-2">
              <p>• <strong>Cash on Delivery (COD)</strong>: Available nationwide across Pakistan. Pay in cash to the courier upon delivery.</p>
              <p>• <strong>JazzCash / Bank Transfer</strong>: Quick pre-payment with instant verification available at checkout.</p>
              <p>• <strong>Estimated Delivery</strong>: 2 to 3 working days for major cities (Lahore, Karachi, Islamabad) and 3 to 5 days for other regions.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
