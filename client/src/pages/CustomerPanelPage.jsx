import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Package,
  Clock,
  CheckCircle,
  Truck,
  CreditCard,
  MapPin,
  Phone,
  Mail,
  LogOut,
  Edit2,
  ChevronRight,
  ShieldCheck,
  ShoppingBag,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const CustomerPanelPage = () => {
  const { user, login, logout, orders, updateUserProfile, openAuthModal, showToast } = useApp();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'profile'
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || 'Lahore',
  });

  // Filter orders related to this user if email is set, or show all customer orders
  const customerOrders = orders.filter((o) => {
    if (!user?.email) return true;
    return o.customer?.email?.toLowerCase() === user.email.toLowerCase();
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateUserProfile(editForm);
    setIsEditingProfile(false);
  };

  // If user is not logged in at all, offer prompt
  if (!user) {
    return (
      <div className="bg-surface-50 min-h-[80vh] flex flex-col items-center justify-center px-4 py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-surface-200 text-primary-700 flex items-center justify-center mb-4">
          <User className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-kdark-900 font-serif mb-2">Customer Account</h2>
        <p className="text-sm text-gray-500 max-w-md mb-6">
          Sign in to view your order history, track live deliveries, and manage your shipping address.
        </p>
        <div className="flex gap-3">
          <button onClick={openAuthModal} className="btn-primary">
            Sign In / Register
          </button>
          <Link to="/" className="btn-secondary">
            Browse Store
          </Link>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Cancelled':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-amber-100 text-amber-800 border-amber-200';
    }
  };

  return (
    <div className="bg-surface-50 min-h-screen py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Customer Header Card */}
        <div className="bg-white rounded-3xl border border-surface-200 p-6 sm:p-8 shadow-xs mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-primary-100 text-primary-700 flex items-center justify-center text-xl font-bold font-serif shrink-0 border border-primary-200">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full rounded-2xl object-cover" />
              ) : (
                user.name?.charAt(0).toUpperCase() || 'C'
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-kdark-900 font-serif">
                  {user.name}
                </h1>
                {user.isGuest ? (
                  <span className="text-xs font-semibold bg-surface-200 text-gray-700 px-2.5 py-0.5 rounded-full">
                    Guest Account
                  </span>
                ) : (
                  <span className="text-xs font-semibold bg-primary-100 text-primary-800 px-2.5 py-0.5 rounded-full">
                    Verified Member
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                <span>{user.email || 'No email attached'}</span>
                <span>•</span>
                <span>{user.phone || 'No phone attached'}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-stretch md:self-auto justify-end">
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-kaccent-600 bg-kaccent-50 hover:bg-kaccent-100 transition-colors"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>

        {/* Dashboard Tabs & Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar Nav (4 Cols) */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-surface-200 p-4 sm:p-5 shadow-xs space-y-2">
            <button
              onClick={() => {
                setActiveTab('orders');
                setSelectedOrder(null);
              }}
              className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-sm sm:text-base font-semibold transition-all ${
                activeTab === 'orders'
                  ? 'bg-primary-600 text-white shadow-xs'
                  : 'text-kdark-700 hover:bg-surface-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Package className="w-5 h-5" />
                <span>My Orders & Status</span>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${activeTab === 'orders' ? 'bg-primary-700 text-white' : 'bg-surface-200 text-kdark-800'}`}>
                {customerOrders.length}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab('profile');
                setSelectedOrder(null);
              }}
              className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-sm sm:text-base font-semibold transition-all ${
                activeTab === 'profile'
                  ? 'bg-primary-600 text-white shadow-xs'
                  : 'text-kdark-700 hover:bg-surface-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <User className="w-5 h-5" />
                <span>Profile & Addresses</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </button>

            <div className="pt-4 border-t border-surface-200 mt-3 p-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary-800 mb-1">
                <ShieldCheck className="w-4.5 h-4.5 text-primary-600" />
                <span>SEORA Korean Guarantee</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Direct importation from Seoul. If you have any inquiries regarding your order, our helpline is open 24/7.
              </p>
            </div>
          </div>

          {/* Main Display Area (8 Cols) */}
          <div className="lg:col-span-8">
            {/* TAB 1: ORDERS */}
            {activeTab === 'orders' && (
              <div>
                {customerOrders.length === 0 ? (
                  <div className="bg-white rounded-3xl border border-surface-200 p-10 text-center shadow-xs">
                    <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-base font-bold text-kdark-900 font-serif mb-1">No Orders Yet</h3>
                    <p className="text-xs text-gray-500 mb-4">You haven't placed any Korean skincare orders yet.</p>
                    <Link to="/" className="btn-primary text-xs">Start Shopping</Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {customerOrders.map((ord) => (
                      <div
                        key={ord.id}
                        className="bg-white rounded-2xl border border-surface-200 p-5 shadow-xs hover:border-primary-300 transition-all"
                      >
                        {/* Order Header */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-surface-100 text-xs">
                          <div>
                            <span className="font-bold text-kdark-900 font-mono text-sm mr-2">
                              #{ord.id}
                            </span>
                            <span className="text-gray-400">
                              Placed on {new Date(ord.date).toLocaleDateString()}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusBadge(ord.status)}`}>
                              {ord.status}
                            </span>
                          </div>
                        </div>

                        {/* Order Item Previews */}
                        <div className="py-3 flex flex-wrap items-center gap-3">
                          {ord.products?.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2 bg-surface-50 p-1.5 rounded-xl border border-surface-200">
                              <img
                                src={item.thumbnail}
                                alt={item.title}
                                className="w-10 h-10 object-contain rounded-lg mix-blend-multiply"
                              />
                              <div className="max-w-[130px]">
                                <p className="text-[11px] font-semibold text-kdark-900 truncate">{item.title}</p>
                                <p className="text-[10px] text-gray-500">Qty: {item.quantity}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Order Footer & Metadata */}
                        <div className="pt-3 border-t border-surface-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                          <div className="space-y-0.5">
                            <p className="text-gray-500">
                              Payment: <strong className="text-kdark-800">{ord.paymentMethod}</strong> ({ord.paymentStatus})
                            </p>
                            <p className="text-gray-500">
                              Ship to: <span className="text-kdark-800">{ord.customer?.address}, {ord.customer?.city}</span>
                            </p>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <span className="text-[11px] text-gray-400 block">Total</span>
                              <span className="text-sm font-bold text-primary-800 font-serif">
                                ${Number(ord.total).toFixed(2)}
                              </span>
                            </div>

                            <button
                              onClick={() => setSelectedOrder(selectedOrder?.id === ord.id ? null : ord)}
                              className="px-3 py-1.5 rounded-xl border border-surface-200 hover:border-primary-400 text-xs font-semibold text-kdark-800 transition-colors"
                            >
                              {selectedOrder?.id === ord.id ? 'Hide Details' : 'View Details'}
                            </button>
                          </div>
                        </div>

                        {/* Expanded Details Drawer */}
                        {selectedOrder?.id === ord.id && (
                          <div className="mt-4 pt-4 border-t border-surface-200 bg-surface-50 -mx-5 -mb-5 p-5 rounded-b-2xl space-y-4 text-xs">
                            <h4 className="font-bold text-kdark-900 font-serif">Full Order Breakdown</h4>

                            {/* Tracking progress steps */}
                            <div className="p-3 bg-white rounded-xl border border-surface-200">
                              <div className="flex items-center justify-between text-[11px] font-semibold mb-2">
                                <span className={ord.status ? 'text-primary-700' : 'text-gray-400'}>1. Placed</span>
                                <span className={ord.status !== 'Pending' ? 'text-primary-700' : 'text-gray-400'}>2. Processing</span>
                                <span className={ord.status === 'Shipped' || ord.status === 'Delivered' ? 'text-primary-700' : 'text-gray-400'}>3. Shipped</span>
                                <span className={ord.status === 'Delivered' ? 'text-emerald-700' : 'text-gray-400'}>4. Delivered</span>
                              </div>
                              <div className="w-full bg-surface-200 h-1.5 rounded-full overflow-hidden">
                                <div
                                  className="bg-primary-600 h-full rounded-full transition-all duration-500"
                                  style={{
                                    width:
                                      ord.status === 'Delivered'
                                        ? '100%'
                                        : ord.status === 'Shipped'
                                        ? '75%'
                                        : ord.status === 'Cancelled'
                                        ? '0%'
                                        : '40%',
                                  }}
                                ></div>
                              </div>
                            </div>

                            <div className="space-y-1">
                              {ord.products?.map((p, idx) => (
                                <div key={idx} className="flex justify-between py-1 border-b border-surface-200/50">
                                  <span>{p.title} × {p.quantity}</span>
                                  <span className="font-bold">${(Number(p.price) * p.quantity).toFixed(2)}</span>
                                </div>
                              ))}
                              <div className="flex justify-between pt-2 font-bold text-sm text-kdark-900">
                                <span>Grand Total Paid:</span>
                                <span className="font-serif text-primary-800">${Number(ord.total).toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: PROFILE & ADDRESSES */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-3xl border border-surface-200 p-6 sm:p-8 shadow-xs">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-surface-200">
                  <div>
                    <h3 className="text-base font-bold text-kdark-900 font-serif">Account Information</h3>
                    <p className="text-xs text-gray-500">Manage your default shipping details and contact information.</p>
                  </div>
                  {!isEditingProfile && (
                    <button
                      onClick={() => {
                        setEditForm({
                          name: user.name || '',
                          phone: user.phone || '',
                          address: user.address || '',
                          city: user.city || 'Lahore',
                        });
                        setIsEditingProfile(true);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-surface-200 hover:border-primary-400 text-xs font-semibold text-primary-700 transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" /> Edit Profile
                    </button>
                  )}
                </div>

                {isEditingProfile ? (
                  <form onSubmit={handleSaveProfile} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-kdark-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        required
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-kdark-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value={editForm.phone}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                        className="input-field"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-kdark-700 mb-1">Address</label>
                        <input
                          type="text"
                          value={editForm.address}
                          onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-kdark-700 mb-1">City</label>
                        <input
                          type="text"
                          value={editForm.city}
                          onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                          className="input-field"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button type="submit" className="btn-primary text-xs">
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditingProfile(false)}
                        className="btn-secondary text-xs"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-3 text-xs text-gray-600">
                    <div className="flex items-center gap-3 p-3 rounded-2xl bg-surface-50 border border-surface-200">
                      <User className="w-4 h-4 text-primary-600 shrink-0" />
                      <div>
                        <span className="text-[10px] text-gray-400 block uppercase">Name</span>
                        <span className="font-semibold text-kdark-900">{user.name}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-2xl bg-surface-50 border border-surface-200">
                      <Mail className="w-4 h-4 text-primary-600 shrink-0" />
                      <div>
                        <span className="text-[10px] text-gray-400 block uppercase">Email</span>
                        <span className="font-semibold text-kdark-900">{user.email || 'N/A'}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-2xl bg-surface-50 border border-surface-200">
                      <Phone className="w-4 h-4 text-primary-600 shrink-0" />
                      <div>
                        <span className="text-[10px] text-gray-400 block uppercase">Phone Number</span>
                        <span className="font-semibold text-kdark-900">{user.phone || 'Not provided yet'}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-2xl bg-surface-50 border border-surface-200">
                      <MapPin className="w-4 h-4 text-primary-600 shrink-0" />
                      <div>
                        <span className="text-[10px] text-gray-400 block uppercase">Saved Shipping Address</span>
                        <span className="font-semibold text-kdark-900">
                          {user.address ? `${user.address}, ${user.city || 'Pakistan'}` : 'No address saved yet'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerPanelPage;
