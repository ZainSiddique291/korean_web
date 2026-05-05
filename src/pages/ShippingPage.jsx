import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Package, Truck } from 'lucide-react';
import { useApp } from '../context/AppContext';

const ShippingPage = () => {
  const { user, cart, cartTotal, clearCart, showToast } = useApp();
  const navigate = useNavigate();
  const [delivery, setDelivery] = useState('Express Delivery');
  const [confirmed, setConfirmed] = useState(false);
  const [order, setOrder] = useState(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  if (!cart.length && !confirmed) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 pt-20 px-4">
      <p className="text-red-400 text-lg font-medium">Your cart is empty.</p>
      <Link to="/" className="btn">Shop Now</Link>
    </div>
  );

  const handleConfirm = () => {
    const newOrder = { id: Date.now(), ...user, products: cart, deliveryMethod: delivery, total: cartTotal(), status: 'Processing' };
    setOrder(newOrder);
    clearCart();
    setConfirmed(true);
    showToast('Order placed successfully! 🎉');
  };

  if (confirmed && order) return (
    <div className="max-w-3xl mx-auto px-4 pt-28 pb-16">
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle2 className="w-9 h-9 text-emerald-500" /></div>
        <h1 className="text-2xl font-bold text-gray-900">Order Confirmed!</h1>
        <p className="text-gray-500 mt-1">Order #{order.id}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Truck className="w-5 h-5 text-blue-400" />Delivery Info</h2>
          {[['Name',order.name],['Email',order.email],['Phone',order.phone],['Address',order.address],['Method',order.deliveryMethod],['Total',`$${order.total?.toFixed(2)}`]].map(([k,v]) => (
            <div key={k} className="flex justify-between py-1.5 border-b border-gray-50 last:border-0">
              <span className="text-sm text-gray-500">{k}</span><span className="text-sm font-semibold text-gray-800">{v}</span>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Package className="w-5 h-5 text-blue-400" />Items Ordered</h2>
          <div className="flex flex-col gap-2">
            {order.products.map(p => (
              <div key={p.id} className="flex justify-between items-center py-1.5 border-b border-gray-50 last:border-0">
                <span className="text-sm text-gray-700 truncate flex-1">{p.title}</span>
                <span className="text-sm font-bold text-gray-800 ml-2 shrink-0">×{p.quantity} — ${(p.price*p.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 pt-3 border-t border-gray-100">
            <span className="font-bold text-gray-900">Grand Total</span>
            <span className="font-black text-blue-500">${order.total?.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <div className="text-center mt-8"><button onClick={() => navigate('/')} className="btn px-10 py-3 rounded-2xl text-base">Back to Shop</button></div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-emerald-50 px-4 pt-20 pb-10">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        <button onClick={() => navigate('/cart')} className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-blue-500 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />Back to Cart
        </button>
        <h1 className="text-xl font-bold text-gray-900 mb-6">Confirm Shipping</h1>
        <div className="flex flex-col gap-3 bg-gray-50 rounded-2xl p-4 mb-6">
          {[['Name',user?.name],['Email',user?.email],['Phone',user?.phone],['Address',user?.address]].map(([k,v]) => (
            <div key={k} className="flex justify-between"><span className="text-sm text-gray-500">{k}</span><span className="text-sm font-semibold text-gray-800">{v}</span></div>
          ))}
        </div>
        <div className="mb-6">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Delivery Method</label>
          <select value={delivery} onChange={e => setDelivery(e.target.value)} className="input">
            <option>Express Delivery</option>
            <option>Standard Delivery</option>
          </select>
        </div>
        <div className="flex justify-between items-center bg-blue-50 rounded-2xl px-4 py-3 mb-6">
          <span className="font-semibold text-gray-700">Total</span>
          <span className="text-xl font-black text-blue-500">${cartTotal().toFixed(2)}</span>
        </div>
        <button onClick={handleConfirm} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3.5 rounded-2xl font-bold text-base active:scale-95 transition-all shadow-md">
          Place Order 🎉
        </button>
      </div>
    </div>
  );
};
export default ShippingPage;
