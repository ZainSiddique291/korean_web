import { ArrowLeft, Trash2, ShoppingBag, ShieldCheck, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const CartPage = () => {
  const { cart, cartTotal, updateQty, removeFromCart } = useApp();
  const navigate = useNavigate();

  if (!cart.length) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center gap-4 px-4 bg-surface-50 text-center">
        <div className="w-20 h-20 rounded-full bg-surface-100 flex items-center justify-center text-primary-600 mb-2">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-kdark-900 font-serif">
          Your Shopping Bag is Empty
        </h2>
        <p className="text-sm text-gray-500 max-w-sm mb-4">
          Explore our authentic Korean skincare selection and discover formulas tailored for your skin type.
        </p>
        <Link to="/" className="btn-primary">
          Explore Korean Skincare
        </Link>
      </div>
    );
  }

  const subtotal = cartTotal();
  const freeShippingThreshold = 50;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const shippingFee = isFreeShipping ? 0 : 3.50;
  const finalTotal = subtotal + shippingFee;

  return (
    <div className="bg-surface-50 min-h-screen py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Back Link & Title */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-primary-700 transition-colors mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Continue Shopping
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold text-kdark-900 font-serif">
              Shopping Bag ({cart.length} {cart.length === 1 ? 'item' : 'items'})
            </h1>
          </div>

          {/* Free shipping indicator */}
          <div className="bg-white p-3 rounded-2xl border border-surface-200 text-xs text-kdark-800 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-500 shrink-0" />
            {isFreeShipping ? (
              <span className="font-semibold text-emerald-700">
                🎉 Congratulations! You have unlocked Free Express Shipping!
              </span>
            ) : (
              <span>
                Add <strong className="text-primary-700">${(freeShippingThreshold - subtotal).toFixed(2)}</strong> more to get <strong>Free Delivery</strong>
              </span>
            )}
          </div>
        </div>

        {/* Cart Layout: List on Left, Summary on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Items List */}
          <div className="lg:col-span-8 space-y-3">
            {cart.map((item) => {
              const itemId = item.id || item._id;
              const { title, price, thumbnail, quantity, category } = item;
              return (
                <div
                  key={itemId}
                  className="bg-white p-4 sm:p-5 rounded-2xl border border-surface-200/90 shadow-xs flex items-center gap-4 hover:border-primary-200 transition-colors"
                >
                  <div className="w-18 h-18 sm:w-20 sm:h-20 bg-surface-50 rounded-xl overflow-hidden shrink-0 flex items-center justify-center p-2 border border-surface-200">
                    <img
                      src={thumbnail}
                      alt={title}
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-brand-600 block mb-0.5">
                      {category || 'Skincare'}
                    </span>
                    <Link
                      to={`/product/${itemId}`}
                      className="text-xs sm:text-sm font-semibold text-kdark-900 hover:text-primary-700 transition-colors line-clamp-1"
                    >
                      {title}
                    </Link>
                    <p className="text-xs font-bold text-primary-800 mt-1 font-serif">
                      ${Number(price).toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-1.5 shrink-0 bg-surface-100 rounded-full p-1 border border-surface-200">
                    <button
                      onClick={() => updateQty(itemId, -1)}
                      className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-xs font-bold text-gray-600 hover:bg-surface-200 transition-colors"
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-xs font-bold text-kdark-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQty(itemId, 1)}
                      className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-xs font-bold text-gray-600 hover:bg-surface-200 transition-colors"
                    >
                      +
                    </button>
                  </div>

                  {/* Subtotal for line item */}
                  <div className="text-right shrink-0 min-w-[70px]">
                    <span className="text-sm font-bold text-kdark-900 font-serif">
                      ${(Number(price) * quantity).toFixed(2)}
                    </span>
                  </div>

                  {/* Delete button */}
                  <button
                    onClick={() => removeFromCart(itemId)}
                    className="p-2 text-gray-400 hover:text-kaccent-600 hover:bg-kaccent-50 rounded-xl transition-colors shrink-0"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-surface-200 p-6 shadow-sm sticky top-24">
            <h2 className="text-base font-bold text-kdark-900 font-serif mb-4 pb-3 border-b border-surface-200">
              Order Summary
            </h2>

            <div className="space-y-3 text-xs sm:text-sm text-gray-600 mb-6">
              <div className="flex justify-between items-center">
                <span>Items Subtotal</span>
                <span className="font-semibold text-kdark-900 font-serif">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span>Shipping & Handling</span>
                {isFreeShipping ? (
                  <span className="font-semibold text-emerald-600">Free</span>
                ) : (
                  <span className="font-semibold text-kdark-900 font-serif">$3.50</span>
                )}
              </div>

              <div className="pt-3 border-t border-surface-200 flex justify-between items-center text-base sm:text-lg">
                <span className="font-bold text-kdark-900 font-serif">Estimated Total</span>
                <span className="font-black text-primary-800 font-serif">
                  ${finalTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => navigate('/shipping')}
              className="w-full btn-primary py-3.5 text-sm font-semibold flex items-center justify-center gap-2 mb-4"
            >
              Proceed to Checkout
            </button>

            {/* Payment Trust Badges */}
            <div className="bg-surface-50 rounded-2xl p-3 border border-surface-200 text-center">
              <span className="text-[11px] font-semibold text-kdark-700 block mb-1">
                Accepted Payment Methods:
              </span>
              <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500 font-medium flex-wrap">
                <span className="bg-white px-2 py-0.5 rounded border border-surface-200">Bank Transfer</span>
                <span className="bg-white px-2 py-0.5 rounded border border-surface-200">JazzCash</span>
                <span className="bg-white px-2 py-0.5 rounded border border-surface-200">Cash on Delivery</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
              <ShieldCheck className="w-4 h-4 text-primary-600" />
              <span>Safe & Encrypted Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
