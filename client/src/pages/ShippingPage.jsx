import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  Package,
  Truck,
  CreditCard,
  Building2,
  Smartphone,
  Banknote,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const ShippingPage = () => {
  const { user, cart, cartTotal, addOrder, showToast } = useApp();
  const navigate = useNavigate();

  // Stepper state
  // 1: Customer & Shipping Info, 2: Payment Method, 3: Order Review, 4: Confirmed
  const [step, setStep] = useState(1);

  // Form Fields
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || 'Lahore',
    province: 'Punjab',
    postalCode: '54000',
    notes: '',
  });

  // Delivery Speed
  const [deliveryMethod, setDeliveryMethod] = useState('Express Delivery (2-3 Days)');

  // Payment Method Selection: 'Cash on Delivery (COD)' | 'Bank Transfer' | 'JazzCash'
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery (COD)');
  const [paymentDetails, setPaymentDetails] = useState('');

  // Confirmed Order
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  // If user state updates (e.g. from guest or login), autofill
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || user.name || '',
        email: prev.email || user.email || '',
        phone: prev.phone || user.phone || '',
        address: prev.address || user.address || '',
      }));
    }
  }, [user]);

  if (!cart.length && !confirmedOrder) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center gap-4 px-4 bg-surface-50 text-center">
        <Package className="w-16 h-16 text-gray-300" />
        <h2 className="text-xl font-bold text-kdark-900 font-serif">Your shopping bag is empty</h2>
        <p className="text-sm text-gray-500">Please add items to your cart before proceeding to checkout.</p>
        <Link to="/" className="btn-primary">
          Browse Korean Skincare
        </Link>
      </div>
    );
  }

  const subtotal = cartTotal();
  const shippingCost = subtotal >= 50 ? 0 : 3.50;
  const grandTotal = subtotal + shippingCost;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address || !formData.city) {
      showToast('Please fill out all delivery details.');
      return;
    }
    setStep(2);
  };

  const handleProceedToReview = (e) => {
    e.preventDefault();
    if (!paymentMethod) {
      showToast('Please select a payment method.');
      return;
    }
    setStep(3);
  };

  const handleFinalConfirm = async () => {
    let paymentStatus = 'Pending (COD)';
    if (paymentMethod === 'Bank Transfer') {
      paymentStatus = 'Pending Verification';
    } else if (paymentMethod === 'JazzCash') {
      paymentStatus = 'Paid';
    }

    const orderPayload = {
      customer: {
        name: formData.name,
        email: formData.email || (user?.email ?? 'guest@store.local'),
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        province: formData.province,
        postalCode: formData.postalCode,
      },
      products: cart,
      deliveryMethod,
      paymentMethod,
      paymentStatus,
      paymentReference: paymentDetails || 'N/A',
      subtotal,
      shippingCost,
      total: grandTotal,
      notes: formData.notes,
    };

    try {
      const newOrder = await addOrder(orderPayload);
      setConfirmedOrder(newOrder);
      setStep(4);
      showToast('Order confirmed successfully! 🎉');
    } catch {
      showToast('Failed to place order. Please try again.');
    }
  };

  // SUCCESS / CONFIRMATION VIEW
  if (confirmedOrder) {
    return (
      <div className="bg-surface-50 min-h-screen py-12 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Success Banner */}
          <div className="bg-white rounded-3xl border border-surface-200 p-8 sm:p-10 shadow-sm text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-100">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
              Order Confirmed
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-kdark-900 font-serif mb-2">
              Thank You for Your Order!
            </h1>
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              Your order <strong className="text-kdark-900 font-mono">#{confirmedOrder.id}</strong> has been logged into our system and is now being prepared for dispatch.
            </p>
          </div>

          {/* Details Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Delivery Info */}
            <div className="bg-white rounded-2xl border border-surface-200 p-6 shadow-xs">
              <h3 className="text-sm font-bold text-kdark-900 font-serif mb-4 flex items-center gap-2">
                <Truck className="w-4 h-4 text-primary-600" /> Delivery Information
              </h3>
              <div className="space-y-2 text-xs text-gray-600">
                <div className="flex justify-between py-1 border-b border-surface-100">
                  <span className="text-gray-400">Recipient</span>
                  <span className="font-semibold text-kdark-800">{confirmedOrder.customer?.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-surface-100">
                  <span className="text-gray-400">Phone</span>
                  <span className="font-semibold text-kdark-800">{confirmedOrder.customer?.phone}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-surface-100">
                  <span className="text-gray-400">Address</span>
                  <span className="font-semibold text-kdark-800 text-right max-w-[180px]">
                    {confirmedOrder.customer?.address}, {confirmedOrder.customer?.city}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-surface-100">
                  <span className="text-gray-400">Shipping Method</span>
                  <span className="font-semibold text-primary-700">{confirmedOrder.deliveryMethod}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-400">Status</span>
                  <span className="font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px]">
                    {confirmedOrder.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-white rounded-2xl border border-surface-200 p-6 shadow-xs">
              <h3 className="text-sm font-bold text-kdark-900 font-serif mb-4 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-brand-600" /> Payment Summary
              </h3>
              <div className="space-y-2 text-xs text-gray-600">
                <div className="flex justify-between py-1 border-b border-surface-100">
                  <span className="text-gray-400">Selected Method</span>
                  <span className="font-bold text-kdark-900">{confirmedOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-surface-100">
                  <span className="text-gray-400">Payment Status</span>
                  <span className="font-semibold text-emerald-700">{confirmedOrder.paymentStatus}</span>
                </div>
                {confirmedOrder.paymentReference !== 'N/A' && (
                  <div className="flex justify-between py-1 border-b border-surface-100">
                    <span className="text-gray-400">Reference / Account</span>
                    <span className="font-mono text-kdark-800">{confirmedOrder.paymentReference}</span>
                  </div>
                )}
                <div className="flex justify-between py-1">
                  <span className="text-gray-400 font-medium">Grand Total</span>
                  <span className="text-base font-bold text-primary-800 font-serif">
                    ${Number(confirmedOrder.total).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Ordered Products Card */}
          <div className="bg-white rounded-2xl border border-surface-200 p-6 shadow-xs mb-8">
            <h3 className="text-sm font-bold text-kdark-900 font-serif mb-4 flex items-center gap-2">
              <Package className="w-4 h-4 text-primary-600" /> Ordered Items ({confirmedOrder.products?.length})
            </h3>
            <div className="divide-y divide-surface-100">
              {confirmedOrder.products?.map((item) => (
                <div key={item.id} className="py-3 flex items-center gap-3">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-12 h-12 object-contain bg-surface-50 rounded-lg p-1 border border-surface-200"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-kdark-900 truncate">{item.title}</p>
                    <p className="text-[11px] text-gray-400">Qty: {item.quantity} × ${Number(item.price).toFixed(2)}</p>
                  </div>
                  <span className="text-xs font-bold text-kdark-900 font-serif">
                    ${(Number(item.price) * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/account" className="btn-primary py-3 px-8 text-center text-sm font-semibold">
              View Order in Customer Panel
            </Link>
            <Link to="/" className="btn-secondary py-3 px-8 text-center text-sm font-semibold">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface-50 min-h-screen py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Navigation back */}
        <div className="mb-6">
          <button
            onClick={() => {
              if (step > 1) setStep(step - 1);
              else navigate('/cart');
            }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-primary-700 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {step === 1 ? 'Return to Bag' : 'Back to previous step'}
          </button>
        </div>

        {/* 5-Step Process Bar */}
        <div className="bg-white rounded-2xl border border-surface-200 p-4 mb-8 shadow-xs">
          <div className="flex items-center justify-between max-w-2xl mx-auto text-xs font-medium text-gray-400">
            <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-primary-700 font-semibold' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-primary-600 text-white' : 'bg-surface-200 text-gray-500'}`}>1</span>
              <span>Shipping</span>
            </div>
            <span className="w-6 sm:w-12 h-px bg-surface-200"></span>
            <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-primary-700 font-semibold' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-primary-600 text-white' : 'bg-surface-200 text-gray-500'}`}>2</span>
              <span>Payment</span>
            </div>
            <span className="w-6 sm:w-12 h-px bg-surface-200"></span>
            <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-primary-700 font-semibold' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 3 ? 'bg-primary-600 text-white' : 'bg-surface-200 text-gray-500'}`}>3</span>
              <span>Review</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Form (8 Cols) */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-surface-200 p-6 sm:p-8 shadow-xs">
            {/* STEP 1: Customer & Delivery Info */}
            {step === 1 && (
              <form onSubmit={handleProceedToPayment} className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-kdark-900 font-serif mb-1">
                    Customer Information
                  </h2>
                  <p className="text-xs text-gray-500">
                    We will send delivery tracking and order updates to these details.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-kdark-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Ayesha Malik"
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-kdark-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ayesha@example.com"
                      className="input-field"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-kdark-700 mb-1">Phone Number (For Courier Contact) *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+92 300 1234567"
                    className="input-field"
                  />
                </div>

                <div className="pt-4 border-t border-surface-200">
                  <h2 className="text-lg font-bold text-kdark-900 font-serif mb-1">
                    Delivery Address
                  </h2>
                  <p className="text-xs text-gray-500 mb-4">
                    Express dispatch nationwide across Pakistan.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-kdark-700 mb-1">Street Address, House #, Apartment *</label>
                      <input
                        type="text"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="House 12, Street 4, Sector G-11/2"
                        className="input-field"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-kdark-700 mb-1">City *</label>
                        <input
                          type="text"
                          name="city"
                          required
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="e.g. Lahore"
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-kdark-700 mb-1">Province *</label>
                        <select
                          name="province"
                          value={formData.province}
                          onChange={handleChange}
                          className="input-field"
                        >
                          <option>Punjab</option>
                          <option>Sindh</option>
                          <option>Khyber Pakhtunkhwa</option>
                          <option>Islamabad Capital</option>
                          <option>Balochistan</option>
                          <option>Azad Kashmir</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-kdark-700 mb-1">Postal Code</label>
                        <input
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleChange}
                          placeholder="54000"
                          className="input-field"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-kdark-700 mb-1">Delivery Speed</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <label className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${deliveryMethod.includes('Express') ? 'border-primary-600 bg-primary-50/50' : 'border-surface-200'}`}>
                          <div className="flex items-center gap-2.5">
                            <input
                              type="radio"
                              name="delSpeed"
                              checked={deliveryMethod.includes('Express')}
                              onChange={() => setDeliveryMethod('Express Delivery (2-3 Days)')}
                              className="text-primary-600"
                            />
                            <div>
                              <p className="text-xs font-bold text-kdark-900">Express Delivery</p>
                              <p className="text-[11px] text-gray-500">2-3 Working Days</p>
                            </div>
                          </div>
                          <span className="text-xs font-semibold text-emerald-700">{subtotal >= 50 ? 'Free' : '$3.50'}</span>
                        </label>

                        <label className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${deliveryMethod.includes('Standard') ? 'border-primary-600 bg-primary-50/50' : 'border-surface-200'}`}>
                          <div className="flex items-center gap-2.5">
                            <input
                              type="radio"
                              name="delSpeed"
                              checked={deliveryMethod.includes('Standard')}
                              onChange={() => setDeliveryMethod('Standard Delivery (3-5 Days)')}
                              className="text-primary-600"
                            />
                            <div>
                              <p className="text-xs font-bold text-kdark-900">Standard Delivery</p>
                              <p className="text-[11px] text-gray-500">3-5 Working Days</p>
                            </div>
                          </div>
                          <span className="text-xs font-semibold text-emerald-700">{subtotal >= 50 ? 'Free' : '$2.50'}</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary py-3.5 text-sm font-semibold flex items-center justify-center gap-2"
                >
                  Continue to Payment Options
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* STEP 2: Payment Method Selection */}
            {step === 2 && (
              <form onSubmit={handleProceedToReview} className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-kdark-900 font-serif mb-1">
                    Select Payment Method
                  </h2>
                  <p className="text-xs text-gray-500">
                    Choose how you would like to pay for your Korean skincare order.
                  </p>
                </div>

                {/* 3 Payment Options: COD, Bank Transfer, JazzCash */}
                <div className="space-y-3">
                  {/* Option 1: Cash on Delivery (COD) */}
                  <div
                    onClick={() => setPaymentMethod('Cash on Delivery (COD)')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === 'Cash on Delivery (COD)'
                        ? 'border-primary-600 bg-primary-50/40 shadow-xs'
                        : 'border-surface-200 hover:border-surface-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentOption"
                          checked={paymentMethod === 'Cash on Delivery (COD)'}
                          onChange={() => setPaymentMethod('Cash on Delivery (COD)')}
                          className="text-primary-600"
                        />
                        <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                          <Banknote className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-kdark-900">Cash on Delivery (COD)</h4>
                          <p className="text-xs text-gray-500">Pay cash directly to courier upon package delivery</p>
                        </div>
                      </div>
                      <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                        Recommended
                      </span>
                    </div>

                    {paymentMethod === 'Cash on Delivery (COD)' && (
                      <div className="mt-3 pt-3 border-t border-primary-200/60 text-xs text-gray-600 pl-11">
                        Please keep the exact amount ready in cash when the rider arrives at your doorstep.
                      </div>
                    )}
                  </div>

                  {/* Option 2: JazzCash */}
                  <div
                    onClick={() => setPaymentMethod('JazzCash')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === 'JazzCash'
                        ? 'border-primary-600 bg-primary-50/40 shadow-xs'
                        : 'border-surface-200 hover:border-surface-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentOption"
                          checked={paymentMethod === 'JazzCash'}
                          onChange={() => setPaymentMethod('JazzCash')}
                          className="text-primary-600"
                        />
                        <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center">
                          <Smartphone className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-kdark-900">JazzCash Mobile Wallet</h4>
                          <p className="text-xs text-gray-500">Instant mobile payment or QR scan</p>
                        </div>
                      </div>
                      <span className="text-[11px] font-semibold text-brand-800 bg-brand-100 px-2.5 py-0.5 rounded-full">
                        Instant
                      </span>
                    </div>

                    {paymentMethod === 'JazzCash' && (
                      <div className="mt-3 pt-3 border-t border-primary-200/60 pl-11 space-y-2">
                        <div className="p-3 rounded-xl bg-white border border-surface-200 text-xs text-kdark-800 space-y-1">
                          <p><strong>JazzCash Till / Mobile:</strong> 0302-8849201</p>
                          <p><strong>Account Title:</strong> SEORA Skincare Pakistan</p>
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-kdark-700 mb-1">
                            Your JazzCash Account Number / Transaction TID:
                          </label>
                          <input
                            type="text"
                            value={paymentDetails}
                            onChange={(e) => setPaymentDetails(e.target.value)}
                            placeholder="e.g. 03001234567 or TID 9847291"
                            className="input-field"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Option 3: Bank Transfer */}
                  <div
                    onClick={() => setPaymentMethod('Bank Transfer')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === 'Bank Transfer'
                        ? 'border-primary-600 bg-primary-50/40 shadow-xs'
                        : 'border-surface-200 hover:border-surface-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentOption"
                          checked={paymentMethod === 'Bank Transfer'}
                          onChange={() => setPaymentMethod('Bank Transfer')}
                          className="text-primary-600"
                        />
                        <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                          <Building2 className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-kdark-900">Direct Bank Transfer</h4>
                          <p className="text-xs text-gray-500">Meezan Bank, HBL, Standard Chartered</p>
                        </div>
                      </div>
                      <span className="text-[11px] font-semibold text-blue-800 bg-blue-100 px-2.5 py-0.5 rounded-full">
                        Online Banking
                      </span>
                    </div>

                    {paymentMethod === 'Bank Transfer' && (
                      <div className="mt-3 pt-3 border-t border-primary-200/60 pl-11 space-y-2">
                        <div className="p-3 rounded-xl bg-white border border-surface-200 text-xs text-kdark-800 space-y-1">
                          <p><strong>Bank:</strong> Meezan Bank Ltd</p>
                          <p><strong>Account Title:</strong> SEORA Skincare Pvt Ltd</p>
                          <p><strong>Account #:</strong> 0102-0105829101</p>
                          <p><strong>IBAN:</strong> PK68MEZN0001020105829101</p>
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-kdark-700 mb-1">
                            Bank Reference / Sender Account Name:
                          </label>
                          <input
                            type="text"
                            value={paymentDetails}
                            onChange={(e) => setPaymentDetails(e.target.value)}
                            placeholder="e.g. Ref # 99482 or Ayesha Khan Meezan"
                            className="input-field"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary py-3.5 text-sm font-semibold flex items-center justify-center gap-2"
                >
                  Review Order Details
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* STEP 3: Order Review & Final Confirmation */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-kdark-900 font-serif mb-1">
                    Review & Confirm Order
                  </h2>
                  <p className="text-xs text-gray-500">
                    Please verify your shipping details and selected payment method before final submission.
                  </p>
                </div>

                {/* Review Boxes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-surface-50 border border-surface-200 text-xs space-y-1.5">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-kdark-900">Ship To</span>
                      <button onClick={() => setStep(1)} className="text-primary-700 font-semibold hover:underline">Edit</button>
                    </div>
                    <p className="font-semibold text-kdark-800">{formData.name}</p>
                    <p className="text-gray-500">{formData.phone}</p>
                    <p className="text-gray-500">{formData.address}, {formData.city}, {formData.province}</p>
                    <p className="text-primary-700 font-medium pt-1">{deliveryMethod}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-surface-50 border border-surface-200 text-xs space-y-1.5">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-kdark-900">Payment Option</span>
                      <button onClick={() => setStep(2)} className="text-primary-700 font-semibold hover:underline">Edit</button>
                    </div>
                    <p className="font-bold text-kdark-900">{paymentMethod}</p>
                    {paymentDetails && <p className="font-mono text-gray-600">Ref: {paymentDetails}</p>}
                    <p className="text-emerald-700 font-medium pt-1">
                      {paymentMethod === 'Cash on Delivery (COD)' ? 'Pay on Delivery' : 'Pre-payment Selected'}
                    </p>
                  </div>
                </div>

                {/* Optional Order Note */}
                <div>
                  <label className="block text-xs font-semibold text-kdark-700 mb-1">
                    Order Notes / Delivery Instructions (Optional)
                  </label>
                  <textarea
                    rows={2}
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="e.g. Ring the doorbell or leave with security"
                    className="input-field resize-none"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-emerald-700 shrink-0" />
                  <span>
                    By clicking <strong>Confirm & Place Order</strong>, your order will be directly saved in the system, and you will be able to track it in your customer account.
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleFinalConfirm}
                  className="w-full btn-primary py-4 text-base font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                >
                  Confirm & Place Order 🎉
                </button>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar (4 Cols) */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-surface-200 p-6 shadow-sm sticky top-24">
            <h3 className="text-sm font-bold text-kdark-900 font-serif mb-4 pb-3 border-b border-surface-200 flex items-center justify-between">
              <span>Order Summary</span>
              <span className="text-xs font-semibold text-gray-500">{cart.length} items</span>
            </h3>

            {/* Compact items list */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1 mb-4 scrollbar-none divide-y divide-surface-100">
              {cart.map((item) => (
                <div key={item.id} className="pt-2 first:pt-0 flex items-center gap-3">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-11 h-11 object-contain bg-surface-50 rounded-lg p-1 border border-surface-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-kdark-900 truncate">{item.title}</p>
                    <p className="text-[11px] text-gray-400">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-xs font-bold text-kdark-900 font-serif">
                    ${(Number(item.price) * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-xs text-gray-600 pt-3 border-t border-surface-200 mb-5">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-kdark-900 font-serif">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-semibold text-emerald-600">
                  {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-surface-200 text-sm">
                <span className="font-bold text-kdark-900">Total Payable</span>
                <span className="font-black text-primary-800 font-serif text-base">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="bg-surface-50 p-3 rounded-2xl border border-surface-200 text-[11px] text-gray-500 space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-kdark-800">
                <ShieldCheck className="w-3.5 h-3.5 text-primary-600" />
                <span>Buyer Protection Guarantee</span>
              </div>
              <p>Authentic Korean goods directly from Seoul warehouse. COD supported nationwide.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPage;
