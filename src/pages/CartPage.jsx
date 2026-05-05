import { ArrowLeft, Trash2, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const CartPage = () => {
  const { cart, cartTotal, updateQty, removeFromCart } = useApp();
  const navigate = useNavigate();

  if (!cart.length) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 pt-20 px-4">
      <ShoppingBag className="w-20 h-20 text-gray-200" />
      <p className="text-xl font-semibold text-gray-400">Your cart is empty</p>
      <Link to="/" className="btn">Browse Products</Link>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 pt-28 pb-16">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-blue-500 transition-colors mb-8">
        <ArrowLeft className="w-4 h-4" />Continue Shopping
      </button>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Cart ({cart.length} items)</h1>
      <div className="flex flex-col gap-3 mb-8">
        {cart.map(({ id, title, price, thumbnail, quantity }) => (
          <div key={id} className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <img src={thumbnail} alt={title} className="w-16 h-16 object-cover rounded-xl shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">{title}</p>
              <p className="text-blue-500 font-bold">${price}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={() => updateQty(id, -1)} className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-gray-600 transition-colors">-</button>
              <span className="w-5 text-center font-semibold text-sm">{quantity}</span>
              <button onClick={() => updateQty(id, 1)} className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-gray-600 transition-colors">+</button>
            </div>
            <span className="font-bold text-gray-800 w-16 text-right shrink-0">${(price * quantity).toFixed(2)}</span>
            <button onClick={() => removeFromCart(id)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors shrink-0">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex justify-between items-center mb-3"><span className="text-gray-500">Subtotal</span><span className="font-bold text-gray-700">${cartTotal().toFixed(2)}</span></div>
        <div className="flex justify-between items-center mb-5 pb-4 border-b border-gray-100"><span className="text-gray-500">Shipping</span><span className="text-emerald-500 font-semibold">Free</span></div>
        <div className="flex justify-between items-center mb-6"><span className="text-lg font-bold text-gray-900">Total</span><span className="text-2xl font-black text-blue-500">${cartTotal().toFixed(2)}</span></div>
        <button onClick={() => navigate('/shipping')} className="btn w-full py-3.5 rounded-2xl text-base flex justify-center">Proceed to Checkout</button>
      </div>
    </div>
  );
};
export default CartPage;
