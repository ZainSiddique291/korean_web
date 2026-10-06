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
  AlertCircle,
  Droplet,
  Globe,
  FileText,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { productService } from '../services/api';

const colorStyles = {
  green: {
    badge: 'bg-emerald-600 text-white',
    pill: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    accentText: 'text-emerald-700',
  },
  blue: {
    badge: 'bg-sky-600 text-white',
    pill: 'bg-sky-50 text-sky-700 border-sky-200',
    accentText: 'text-sky-700',
  },
  maroon: {
    badge: 'bg-rose-900 text-white',
    pill: 'bg-rose-50 text-rose-900 border-rose-200',
    accentText: 'text-rose-900',
  },
  orange: {
    badge: 'bg-amber-600 text-white',
    pill: 'bg-amber-50 text-amber-800 border-amber-200',
    accentText: 'text-amber-700',
  },
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart, showToast, products } = useApp();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('formula');
  const [added, setAdded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    // 1. First check local products in AppContext
    const localMatch = products.find((p) => String(p.id || p._id) === String(id));
    if (localMatch) {
      setProduct(localMatch);
      setSelectedImg(localMatch.thumbnail || (localMatch.images && localMatch.images[0]));
      setLoading(false);
      return;
    }

    // 2. Fetch from backend API
    productService
      .getProductById(id)
      .then((res) => {
        if (res.success && res.product) {
          setProduct(res.product);
          setSelectedImg(res.product.thumbnail || (res.product.images && res.product.images[0]));
        } else {
          setProduct(null);
        }
      })
      .catch(() => {
        setProduct(null);
      })
      .finally(() => {
        setLoading(false);
      });
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
        <p className="text-sm text-gray-500">Loading SEORA Korean skincare formula...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-4 text-center">
        <p className="text-base font-semibold text-kdark-800 mb-4">SEORA Product not found</p>
        <button onClick={() => navigate('/')} className="btn-primary">
          Back to Collection
        </button>
      </div>
    );
  }

  const {
    title,
    subtitle,
    tag,
    description,
    price,
    originalPrice,
    thumbnail,
    images = [],
    rating = 4.9,
    ratingCount = 86,
    brand = 'SEORA',
    category = 'serums',
    stock = 50,
    netVol = '30ml',
    origin = 'Made in Korea',
    colorLabel = 'green',
    keyIngredients = [],
    fullIngredients = '',
    benefits = [],
    skinType = 'All Skin Types',
    howToUse = '',
    precautions = [],
    koreanText = {},
  } = product;

  const colorConfig = colorStyles[colorLabel] || colorStyles.green;
  const allImages = images && images.length > 0 ? images : [thumbnail];

  return (
    <div className="bg-surface-50 min-h-screen pb-20 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link to="/" className="hover:text-primary-700">
            SEORA Collection
          </Link>
          <span>/</span>
          <span className="capitalize">{category || 'Face Serums'}</span>
          <span>/</span>
          <span className="text-kdark-800 truncate max-w-[200px]">{title}</span>
        </div>

        {/* Product Details Grid */}
        <div className="bg-white rounded-3xl border border-surface-200 p-6 sm:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Gallery */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-square rounded-2xl bg-surface-50 border border-surface-200 overflow-hidden flex items-center justify-center p-4">
              <img
                src={selectedImg || thumbnail}
                alt={title}
                className="w-full h-full object-contain rounded-xl transition-all duration-300"
              />
              {tag && (
                <span
                  className={`absolute top-4 left-4 ${colorConfig.badge} text-[11px] font-bold px-3 py-1 rounded-full shadow-sm tracking-wider`}
                >
                  {tag}
                </span>
              )}
              <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-xs text-kdark-800 text-[11px] font-semibold px-2.5 py-1 rounded-full border border-surface-200">
                {netVol} • {origin}
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
                    <img src={img} alt={`View ${idx}`} className="w-full h-full object-cover rounded-lg" />
                  </button>
                ))}
              </div>
            )}

            {/* Key Actives Pills Preview */}
            {keyIngredients && keyIngredients.length > 0 && (
              <div className="pt-2">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                  Key Actives:
                </span>
                <div className="flex flex-wrap gap-2">
                  {keyIngredients.map((item, idx) => (
                    <span
                      key={idx}
                      className={`text-xs px-2.5 py-1 rounded-full border font-medium ${colorConfig.pill}`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Info & Purchase Controls */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs uppercase tracking-widest font-black text-brand-600">
                  {brand} KOREA
                </span>
                <span className="text-gray-300">•</span>
                <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> In Stock ({stock} bottles available)
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-kdark-900 font-serif mb-2.5 leading-snug">
                {title}
              </h1>

              {subtitle && (
                <p className="text-sm sm:text-base font-medium text-gray-500 mb-3.5 italic">
                  {subtitle}
                </p>
              )}

              {/* Rating */}
              <div className="flex items-center gap-2.5 mb-6">
                <div className="flex items-center gap-1.5 bg-brand-50 px-3 py-1 rounded-xl">
                  <Star className="w-4 h-4 text-brand-500 fill-brand-500" />
                  <span className="text-xs sm:text-sm font-bold text-brand-700">
                    {typeof rating === 'number' ? rating.toFixed(1) : '4.9'}
                  </span>
                </div>
                <span className="text-xs sm:text-sm text-gray-500">
                  ({ratingCount} verified reviews)
                </span>
                <span className="text-gray-300">•</span>
                <span className="text-xs sm:text-sm text-gray-600 font-medium">{skinType}</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3.5 mb-6 p-4 sm:p-5 rounded-2xl bg-surface-50 border border-surface-200">
                <span className="text-3xl sm:text-4xl font-bold text-kdark-900 font-serif">
                  ${Number(price).toFixed(2)}
                </span>
                {originalPrice && originalPrice > price && (
                  <span className="text-base sm:text-lg text-gray-400 line-through">
                    ${Number(originalPrice).toFixed(2)}
                  </span>
                )}
                {originalPrice && originalPrice > price && (
                  <span className="text-xs sm:text-sm font-bold text-kaccent-600 bg-kaccent-50 px-3 py-1 rounded-full">
                    Save ${(originalPrice - price).toFixed(2)}
                  </span>
                )}
                <span className="text-xs sm:text-sm text-gray-500 ml-auto">
                  Net Vol: <strong>{netVol}</strong>
                </span>
              </div>

              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-6">
                {description}
              </p>

              {/* Quantity Selector & Action Buttons */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3.5">
                  <span className="text-sm font-semibold text-kdark-800">Quantity:</span>
                  <div className="inline-flex items-center border border-surface-200 rounded-full bg-white p-1 shadow-2xs">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-surface-100 text-gray-700 font-bold transition-colors text-base"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-bold text-base text-kdark-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-surface-100 text-gray-700 font-bold transition-colors text-base"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3.5 pt-2">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 btn-primary py-3.5 px-6 text-base font-semibold flex items-center justify-center gap-2"
                  >
                    {added ? <Check className="w-5 h-5" /> : <ShoppingBag className="w-5 h-5" />}
                    <span>{added ? 'Added to Bag!' : 'Add to Bag'}</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="flex-1 btn-brand py-3.5 px-6 text-base font-semibold flex items-center justify-center gap-2"
                  >
                    <span>Instant Checkout (COD)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Trust Badges in Product Box */}
            <div className="pt-6 border-t border-surface-200 grid grid-cols-3 gap-3 text-center">
              <div className="flex flex-col items-center">
                <ShieldCheck className="w-6 h-6 text-primary-600 mb-1.5" />
                <span className="text-xs sm:text-sm font-bold text-kdark-800">Made in Korea</span>
                <span className="text-xs text-gray-500">Authentic SEORA Lab</span>
              </div>
              <div className="flex flex-col items-center">
                <Truck className="w-6 h-6 text-brand-600 mb-1.5" />
                <span className="text-xs sm:text-sm font-bold text-kdark-800">Express Delivery</span>
                <span className="text-xs text-gray-500">2-4 Business Days</span>
              </div>
              <div className="flex flex-col items-center">
                <RotateCcw className="w-6 h-6 text-emerald-600 mb-1.5" />
                <span className="text-xs sm:text-sm font-bold text-kdark-800">Cash on Delivery</span>
                <span className="text-xs text-gray-500">All Pakistan Cities</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Info Section: Formula & Usage, Actives, Korean Label, Shipping */}
        <div className="mt-10 bg-white rounded-3xl border border-surface-200 p-6 sm:p-8">
          <div className="flex flex-wrap gap-4 sm:gap-6 border-b border-surface-200 pb-3 mb-6">
            <button
              onClick={() => setActiveTab('formula')}
              className={`text-sm font-semibold pb-2 border-b-2 transition-all ${
                activeTab === 'formula'
                  ? 'border-primary-600 text-primary-700'
                  : 'border-transparent text-gray-500 hover:text-kdark-900'
              }`}
            >
              How to Use & Precautions
            </button>
            <button
              onClick={() => setActiveTab('ingredients')}
              className={`text-sm font-semibold pb-2 border-b-2 transition-all ${
                activeTab === 'ingredients'
                  ? 'border-primary-600 text-primary-700'
                  : 'border-transparent text-gray-500 hover:text-kdark-900'
              }`}
            >
              Key Actives & Full Ingredients
            </button>
            <button
              onClick={() => setActiveTab('korean')}
              className={`text-sm font-semibold pb-2 border-b-2 transition-all flex items-center gap-1.5 ${
                activeTab === 'korean'
                  ? 'border-primary-600 text-primary-700'
                  : 'border-transparent text-gray-500 hover:text-kdark-900'
              }`}
            >
              <Globe className="w-4 h-4" /> Korean Label Details (라벨 원문)
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

          {/* TAB 1: Formula & Usage */}
          {activeTab === 'formula' && (
            <div className="space-y-6 text-sm text-gray-600 leading-relaxed">
              <div>
                <h4 className="font-bold text-kdark-900 mb-2 flex items-center gap-2">
                  <Droplet className="w-4 h-4 text-primary-600" /> Directions for Use:
                </h4>
                <p className="bg-surface-50 p-4 rounded-2xl border border-surface-200">
                  {howToUse ||
                    'After washing your face in the morning and evening, take an appropriate amount and gently apply it to your face and neck. For enhanced results, use it while massaging your skin.'}
                </p>
              </div>

              {precautions && precautions.length > 0 && (
                <div>
                  <h4 className="font-bold text-kdark-900 mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600" /> Precautions for Use:
                  </h4>
                  <ul className="space-y-1.5 bg-surface-50 p-4 rounded-2xl border border-surface-200">
                    {precautions.map((p, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-primary-600 font-bold">•</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="text-xs text-gray-500 pt-2 flex items-center gap-4">
                <span>• Made in Korea</span>
                <span>• Net Volume: 30ml</span>
                <span>• Recyclable glass dropper packaging</span>
              </div>
            </div>
          )}

          {/* TAB 2: Ingredients & Benefits */}
          {activeTab === 'ingredients' && (
            <div className="space-y-6">
              {benefits && benefits.length > 0 && (
                <div>
                  <h4 className="font-bold text-kdark-900 mb-3 text-sm flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-brand-500" /> Proven Benefits:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {benefits.map((b, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-surface-50 border border-surface-200 flex items-center gap-2.5 text-xs sm:text-sm text-gray-700 font-medium"
                      >
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {fullIngredients && (
                <div>
                  <h4 className="font-bold text-kdark-900 mb-2 text-sm flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary-600" /> Full Ingredients (전성분):
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed bg-surface-50 p-4 rounded-2xl border border-surface-200 font-mono">
                    {fullIngredients}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Korean Label Text */}
          {activeTab === 'korean' && (
            <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
              <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200/60">
                <span className="text-xs uppercase tracking-wider font-bold text-amber-800 block mb-1">
                  SEORA Korea Official Label Transcription
                </span>
                <h4 className="text-base font-bold text-kdark-900 mb-3">
                  {koreanText?.headline || '엄선된 성분으로 건강한 피부 케어'}
                </h4>

                {koreanText?.notes && (
                  <ul className="space-y-2 mb-4 text-xs sm:text-sm text-gray-800">
                    {koreanText.notes.map((note, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-700 font-bold">•</span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {koreanText?.usage && (
                  <div className="mt-3 pt-3 border-t border-amber-200/60 text-xs text-gray-700">
                    <strong>사용 방법:</strong> {koreanText.usage}
                  </div>
                )}

                {koreanText?.precautions && (
                  <div className="mt-2 text-xs text-gray-700">
                    <strong>사용 시 주의사항:</strong> {koreanText.precautions}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
                <div className="p-3 rounded-xl bg-surface-50 border border-surface-200">
                  <div className="font-bold text-kdark-900">제조국 (Origin)</div>
                  <div className="text-gray-500">대한민국 (Korea)</div>
                </div>
                <div className="p-3 rounded-xl bg-surface-50 border border-surface-200">
                  <div className="font-bold text-kdark-900">용량 (Net Vol)</div>
                  <div className="text-gray-500">30ml (1.01 fl. oz)</div>
                </div>
                <div className="p-3 rounded-xl bg-surface-50 border border-surface-200">
                  <div className="font-bold text-kdark-900">포장 사양</div>
                  <div className="text-gray-500">유리 용기 분리배출</div>
                </div>
                <div className="p-3 rounded-xl bg-surface-50 border border-surface-200">
                  <div className="font-bold text-kdark-900">개봉 후 사용</div>
                  <div className="text-gray-500">12M (12개월 이내 권장)</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Shipping & COD */}
          {activeTab === 'shipping' && (
            <div className="text-xs sm:text-sm text-gray-600 space-y-3">
              <div className="p-4 rounded-2xl bg-surface-50 border border-surface-200 space-y-2">
                <p>
                  • <strong>Cash on Delivery (COD)</strong>: Available nationwide across Pakistan. Pay in cash to the courier upon delivery.
                </p>
                <p>
                  • <strong>JazzCash / Bank Transfer</strong>: Quick pre-payment with instant verification available at checkout.
                </p>
                <p>
                  • <strong>Estimated Delivery</strong>: 2 to 3 working days for major cities (Lahore, Karachi, Islamabad) and 3 to 5 days for other regions.
                </p>
                <p>
                  • <strong>Guaranteed Authentic</strong>: Direct batch dispatch with sealed tamper-evident dropper caps.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
