import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Star, Loader2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart, showToast } = useApp();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`https://dummyjson.com/products/${id}`)
      .then(r => r.json()).then(d => { setProduct(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  const handleAdd = () => { addToCart(product); showToast('Added to cart ✅'); };

  if (loading) return <div className="min-h-screen flex items-center justify-center pt-20"><Loader2 className="w-10 h-10 animate-spin text-blue-500" /></div>;
  if (!product) return <div className="min-h-screen flex flex-col items-center justify-center pt-20 gap-4"><p className="text-red-500 text-lg">Product not found.</p><button onClick={() => navigate(-1)} className="btn">Go Back</button></div>;

  const { title, description, price, thumbnail, images, rating, brand, category, discountPercentage, stock } = product;

  return (
    <div className="max-w-5xl mx-auto px-4 pt-28 pb-16">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-blue-500 transition-colors mb-8">
        <ArrowLeft className="w-4 h-4" />Back to Products
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <div className="rounded-2xl overflow-hidden bg-gray-50 h-80 flex items-center justify-center">
          <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2">{category}</span>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">{title}</h1>
          {brand && <p className="text-sm text-gray-400 mb-3">by {brand}</p>}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-xl"><Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /><span className="text-sm font-bold text-gray-700">{rating?.toFixed(1)}</span></div>
            <span className="text-sm text-gray-400">{stock} in stock</span>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">{description}</p>
          <div className="flex items-end gap-3 mb-6">
            <span className="text-4xl font-black text-gray-900">${price}</span>
            {discountPercentage > 5 && <span className="text-sm font-semibold text-red-400 mb-1">-{Math.round(discountPercentage)}% off</span>}
          </div>
          <button onClick={handleAdd} className="btn flex items-center justify-center gap-2 py-3 rounded-2xl text-base w-full">
            <ShoppingCart className="w-5 h-5" />Add to Cart
          </button>
        </div>
      </div>
      {images?.length > 1 && (
        <div className="mt-8">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">More Images</h3>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {images.map((img, i) => <img key={i} src={img} alt={`view ${i}`} className="h-24 w-24 object-cover rounded-xl border border-gray-100 shrink-0" />)}
          </div>
        </div>
      )}
    </div>
  );
};
export default ProductDetailPage;
