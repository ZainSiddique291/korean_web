import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  DollarSign,
  TrendingUp,
  Search,
  Plus,
  Trash2,
  Edit3,
  X,
  CheckCircle2,
  Clock,
  Truck,
  AlertCircle,
  ExternalLink,
  ChevronDown,
  Filter,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const AdminPage = () => {
  const {
    orders,
    updateOrderStatus,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    customers,
    showToast,
  } = useApp();

  // Navigation tab: 'dashboard' | 'orders' | 'products' | 'customers'
  const [tab, setTab] = useState('dashboard');

  // Search & Filter States
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('All');
  const [productSearch, setProductSearch] = useState('');

  // Modals
  const [viewingOrder, setViewingOrder] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  // New Product Form
  const [newProdForm, setNewProdForm] = useState({
    title: '',
    category: 'beauty',
    price: '',
    stock: '',
    description: '',
    thumbnail: '',
  });

  // Calculate KPIs
  const totalRevenue = orders.reduce((sum, ord) => sum + Number(ord.total || 0), 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const totalCustomers = customers.length;

  const deliveredCount = orders.filter((o) => o.status === 'Delivered').length;
  const processingCount = orders.filter((o) => o.status === 'Processing').length;
  const shippedCount = orders.filter((o) => o.status === 'Shipped').length;

  // Filtered Orders
  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id?.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customer?.name?.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.paymentMethod?.toLowerCase().includes(orderSearch.toLowerCase());
    const matchesStatus = orderStatusFilter === 'All' || o.status === orderStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filtered Products
  const filteredProducts = products.filter((p) =>
    p.title?.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.category?.toLowerCase().includes(productSearch.toLowerCase())
  );

  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (!newProdForm.title || !newProdForm.price) {
      showToast('Please provide a title and price.');
      return;
    }
    addProduct({
      ...newProdForm,
      price: parseFloat(newProdForm.price),
      stock: parseInt(newProdForm.stock) || 15,
      thumbnail:
        newProdForm.thumbnail ||
        'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80',
    });
    setNewProdForm({ title: '', category: 'beauty', price: '', stock: '', description: '', thumbnail: '' });
    setIsAddProductOpen(false);
  };

  const handleUpdateProductSubmit = (e) => {
    e.preventDefault();
    if (!editingProduct) return;
    updateProduct(editingProduct.id, {
      title: editingProduct.title,
      price: parseFloat(editingProduct.price),
      stock: parseInt(editingProduct.stock),
      category: editingProduct.category,
      description: editingProduct.description,
      thumbnail: editingProduct.thumbnail,
    });
    setEditingProduct(null);
  };

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
    <div className="bg-surface-100 min-h-screen pb-16">
      {/* Admin Top Navbar */}
      <div className="bg-white border-b border-surface-200 sticky top-0 z-40 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary-800 text-white flex items-center justify-center font-serif font-bold text-sm">
            S
          </div>
          <div>
            <h1 className="text-base font-bold text-kdark-900 font-serif leading-none">
              SEORA Admin Panel
            </h1>
            <span className="text-[10px] text-emerald-600 font-medium">Store Live & Synchronized</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-surface-200 text-xs font-semibold text-kdark-700 hover:bg-surface-50 transition-colors"
          >
            <span>View Live Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <div className="flex items-center gap-2 pl-3 border-l border-surface-200">
            <span className="w-7 h-7 rounded-full bg-brand-500 text-white flex items-center justify-center text-xs font-bold">
              AD
            </span>
            <span className="text-xs font-bold text-kdark-900 hidden md:block">Master Administrator</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-surface-200 scrollbar-none">
          <button
            onClick={() => setTab('dashboard')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
              tab === 'dashboard'
                ? 'bg-primary-600 text-white shadow-xs'
                : 'bg-white text-kdark-700 hover:bg-surface-200 border border-surface-200'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setTab('orders')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
              tab === 'orders'
                ? 'bg-primary-600 text-white shadow-xs'
                : 'bg-white text-kdark-700 hover:bg-surface-200 border border-surface-200'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setTab('products')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
              tab === 'products'
                ? 'bg-primary-600 text-white shadow-xs'
                : 'bg-white text-kdark-700 hover:bg-surface-200 border border-surface-200'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Products Catalog ({products.length})</span>
          </button>

          <button
            onClick={() => setTab('customers')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
              tab === 'customers'
                ? 'bg-primary-600 text-white shadow-xs'
                : 'bg-white text-kdark-700 hover:bg-surface-200 border border-surface-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Customers Directory ({customers.length})</span>
          </button>
        </div>

        {/* 1. DASHBOARD OVERVIEW */}
        {tab === 'dashboard' && (
          <div className="space-y-8 animate-fade-in">
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {/* Total Revenue */}
              <div className="bg-white p-6 rounded-3xl border border-surface-200 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">
                    Total Revenue
                  </span>
                  <h3 className="text-2xl font-black text-kdark-900 font-serif">
                    ${totalRevenue.toFixed(2)}
                  </h3>
                  <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" /> Live Gross Volume
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <DollarSign className="w-6 h-6" />
                </div>
              </div>

              {/* Total Orders */}
              <div className="bg-white p-6 rounded-3xl border border-surface-200 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">
                    Total Orders
                  </span>
                  <h3 className="text-2xl font-black text-kdark-900 font-serif">
                    {totalOrders}
                  </h3>
                  <span className="text-[11px] text-gray-400 mt-1 block">
                    {processingCount} processing • {shippedCount} in transit
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center">
                  <Package className="w-6 h-6" />
                </div>
              </div>

              {/* Total Products */}
              <div className="bg-white p-6 rounded-3xl border border-surface-200 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">
                    Active Catalog
                  </span>
                  <h3 className="text-2xl font-black text-kdark-900 font-serif">
                    {totalProducts}
                  </h3>
                  <span className="text-[11px] text-gray-400 mt-1 block">All categories in stock</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6" />
                </div>
              </div>

              {/* Total Customers */}
              <div className="bg-white p-6 rounded-3xl border border-surface-200 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">
                    Total Customers
                  </span>
                  <h3 className="text-2xl font-black text-kdark-900 font-serif">
                    {totalCustomers}
                  </h3>
                  <span className="text-[11px] text-emerald-600 font-medium mt-1 block">
                    Guest & Registered buyers
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-sage-50 text-sage-600 flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Order Status Breakdown & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-surface-200 shadow-xs">
                <h3 className="text-sm font-bold text-kdark-900 font-serif mb-4">
                  Order Status Breakdown
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center p-3 rounded-2xl bg-amber-50/70 border border-amber-200">
                    <span className="font-semibold text-amber-900 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-600" /> Processing Orders
                    </span>
                    <span className="font-bold text-amber-900">{processingCount}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-2xl bg-blue-50/70 border border-blue-200">
                    <span className="font-semibold text-blue-900 flex items-center gap-2">
                      <Truck className="w-4 h-4 text-blue-600" /> Shipped & In-Transit
                    </span>
                    <span className="font-bold text-blue-900">{shippedCount}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                    <span className="font-semibold text-emerald-900 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Completed Deliveries
                    </span>
                    <span className="font-bold text-emerald-900">{deliveredCount}</span>
                  </div>
                </div>
              </div>

              {/* Payment Method Volume */}
              <div className="bg-white p-6 rounded-3xl border border-surface-200 shadow-xs">
                <h3 className="text-sm font-bold text-kdark-900 font-serif mb-4">
                  Payment Channels Overview
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-2xl bg-surface-50 border border-surface-200 flex justify-between">
                    <span className="text-gray-600 font-medium">Cash on Delivery (COD)</span>
                    <span className="font-bold text-kdark-900">
                      {orders.filter((o) => o.paymentMethod?.includes('COD')).length} orders
                    </span>
                  </div>
                  <div className="p-3 rounded-2xl bg-surface-50 border border-surface-200 flex justify-between">
                    <span className="text-gray-600 font-medium">JazzCash Mobile</span>
                    <span className="font-bold text-kdark-900">
                      {orders.filter((o) => o.paymentMethod?.includes('JazzCash')).length} orders
                    </span>
                  </div>
                  <div className="p-3 rounded-2xl bg-surface-50 border border-surface-200 flex justify-between">
                    <span className="text-gray-600 font-medium">Bank Transfer</span>
                    <span className="font-bold text-kdark-900">
                      {orders.filter((o) => o.paymentMethod?.includes('Bank')).length} orders
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Admin Actions */}
              <div className="bg-white p-6 rounded-3xl border border-surface-200 shadow-xs flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-kdark-900 font-serif mb-2">
                    Catalog & Operations
                  </h3>
                  <p className="text-xs text-gray-500 mb-4">
                    Quickly add new skincare products or view pending customer requests.
                  </p>
                </div>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setTab('products');
                      setIsAddProductOpen(true);
                    }}
                    className="w-full btn-primary py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" /> Add New Product to Store
                  </button>
                  <button
                    onClick={() => setTab('orders')}
                    className="w-full btn-secondary py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5"
                  >
                    <Package className="w-4 h-4" /> Manage All Customer Orders
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Orders Table */}
            <div className="bg-white rounded-3xl border border-surface-200 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-kdark-900 font-serif">Recent Orders</h3>
                <button
                  onClick={() => setTab('orders')}
                  className="text-xs font-semibold text-primary-700 hover:underline"
                >
                  View All Orders →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-surface-50 text-gray-500 border-y border-surface-200 font-semibold">
                    <tr>
                      <th className="py-2.5 px-3">Order ID</th>
                      <th className="py-2.5 px-3">Customer</th>
                      <th className="py-2.5 px-3">Payment Method</th>
                      <th className="py-2.5 px-3">Total</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-100">
                    {orders.slice(0, 5).map((ord) => (
                      <tr key={ord.id} className="hover:bg-surface-50 transition-colors">
                        <td className="py-3 px-3 font-mono font-bold text-kdark-900">#{ord.id}</td>
                        <td className="py-3 px-3">
                          <p className="font-semibold text-kdark-800">{ord.customer?.name}</p>
                          <p className="text-[11px] text-gray-400">{ord.customer?.city || 'Pakistan'}</p>
                        </td>
                        <td className="py-3 px-3 font-medium text-kdark-700">{ord.paymentMethod}</td>
                        <td className="py-3 px-3 font-bold text-primary-800 font-serif">
                          ${Number(ord.total).toFixed(2)}
                        </td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${getStatusBadge(ord.status)}`}>
                            {ord.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => setViewingOrder(ord)}
                            className="text-primary-700 font-semibold hover:underline"
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 2. ORDER MANAGEMENT */}
        {tab === 'orders' && (
          <div className="space-y-6 animate-fade-in">
            {/* Search and Status Filters */}
            <div className="bg-white p-4 rounded-2xl border border-surface-200 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  placeholder="Search by order ID, customer name, payment..."
                  className="input-field pl-9 text-xs"
                />
              </div>

              <div className="flex items-center gap-2 self-stretch sm:self-auto overflow-x-auto">
                <Filter className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                {['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setOrderStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                      orderStatusFilter === st
                        ? 'bg-primary-600 text-white'
                        : 'bg-surface-100 text-kdark-700 hover:bg-surface-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-3xl border border-surface-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-surface-50 text-gray-500 border-b border-surface-200 font-semibold">
                    <tr>
                      <th className="py-3 px-4">Order ID & Date</th>
                      <th className="py-3 px-4">Customer Details</th>
                      <th className="py-3 px-4">Ordered Items</th>
                      <th className="py-3 px-4">Payment Method</th>
                      <th className="py-3 px-4">Total Amount</th>
                      <th className="py-3 px-4">Status & Control</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-100">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-gray-400">
                          No orders found matching criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-surface-50 transition-colors">
                          <td className="py-3.5 px-4">
                            <span className="font-mono font-bold text-kdark-900 block text-sm">#{ord.id}</span>
                            <span className="text-[11px] text-gray-400">
                              {new Date(ord.date).toLocaleDateString()}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <p className="font-semibold text-kdark-900">{ord.customer?.name}</p>
                            <p className="text-[11px] text-gray-500">{ord.customer?.phone}</p>
                            <p className="text-[11px] text-gray-400 truncate max-w-[150px]">
                              {ord.customer?.address}, {ord.customer?.city}
                            </p>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-semibold text-kdark-800">
                              {ord.products?.length || 0} product(s)
                            </span>
                            <p className="text-[11px] text-gray-400 truncate max-w-[140px]">
                              {ord.products?.map((p) => p.title).join(', ')}
                            </p>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-medium text-kdark-800 block">{ord.paymentMethod}</span>
                            <span className="text-[10px] text-gray-500">Status: {ord.paymentStatus}</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-bold text-primary-800 font-serif text-sm">
                              ${Number(ord.total).toFixed(2)}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="relative inline-block">
                              <select
                                value={ord.status}
                                onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                                className={`text-xs font-semibold px-2.5 py-1 rounded-full border outline-none cursor-pointer ${getStatusBadge(
                                  ord.status
                                )}`}
                              >
                                <option value="Processing">Processing</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => setViewingOrder(ord)}
                              className="px-3 py-1.5 rounded-xl border border-surface-200 hover:border-primary-400 text-xs font-semibold text-kdark-800 transition-colors"
                            >
                              Inspect Order
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 3. PRODUCT MANAGEMENT */}
        {tab === 'products' && (
          <div className="space-y-6 animate-fade-in">
            {/* Top Toolbar */}
            <div className="bg-white p-4 rounded-2xl border border-surface-200 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Search products by title or category..."
                  className="input-field pl-9 text-xs"
                />
              </div>

              <button
                onClick={() => setIsAddProductOpen(true)}
                className="w-full sm:w-auto btn-primary py-2.5 px-4 text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Add New Product
              </button>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-3xl border border-surface-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-surface-50 text-gray-500 border-b border-surface-200 font-semibold">
                    <tr>
                      <th className="py-3 px-4">Product Details</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Price</th>
                      <th className="py-3 px-4">Stock</th>
                      <th className="py-3 px-4">Rating</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-100">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-surface-50 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={p.thumbnail}
                              alt={p.title}
                              className="w-10 h-10 object-contain bg-surface-50 rounded-lg p-1 border border-surface-200 shrink-0 mix-blend-multiply"
                            />
                            <div className="max-w-[240px]">
                              <p className="font-semibold text-kdark-900 truncate">{p.title}</p>
                              <p className="text-[10px] text-gray-400 truncate">{p.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-full bg-surface-100 text-kdark-700 text-[11px] font-medium capitalize">
                            {p.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-bold text-kdark-900 font-serif">
                          ${Number(p.price).toFixed(2)}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`font-semibold ${
                              (p.stock || 10) < 5 ? 'text-rose-600' : 'text-emerald-700'
                            }`}
                          >
                            {p.stock ?? 15} units
                          </span>
                        </td>
                        <td className="py-3 px-4 font-medium text-amber-700">
                          ★ {typeof p.rating === 'number' ? p.rating.toFixed(1) : '4.9'}
                        </td>
                        <td className="py-3 px-4 text-right space-x-2">
                          <button
                            onClick={() => setEditingProduct({ ...p })}
                            className="p-1.5 text-primary-700 hover:bg-primary-50 rounded-lg transition-colors inline-block"
                            title="Edit Product"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to remove "${p.title}"?`)) {
                                deleteProduct(p.id);
                              }
                            }}
                            className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors inline-block"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 4. CUSTOMER MANAGEMENT */}
        {tab === 'customers' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white rounded-3xl border border-surface-200 shadow-xs overflow-hidden">
              <div className="p-5 border-b border-surface-200 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-kdark-900 font-serif">Customer Directory</h3>
                  <p className="text-xs text-gray-500">
                    Showing all registered buyers and guest customers with placed orders.
                  </p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-surface-100 text-kdark-800">
                  {customers.length} Total Customers
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-surface-50 text-gray-500 border-b border-surface-200 font-semibold">
                    <tr>
                      <th className="py-3 px-4">Customer Name</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Phone</th>
                      <th className="py-3 px-4">City</th>
                      <th className="py-3 px-4">Orders Placed</th>
                      <th className="py-3 px-4">Total Spent</th>
                      <th className="py-3 px-4 text-right">Latest Activity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-100">
                    {customers.map((c, i) => (
                      <tr key={i} className="hover:bg-surface-50 transition-colors">
                        <td className="py-3 px-4 font-semibold text-kdark-900 flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-[10px]">
                            {c.name?.charAt(0).toUpperCase()}
                          </span>
                          {c.name}
                        </td>
                        <td className="py-3 px-4 text-gray-600">{c.email}</td>
                        <td className="py-3 px-4 text-gray-600">{c.phone}</td>
                        <td className="py-3 px-4 text-gray-600">{c.city}</td>
                        <td className="py-3 px-4 font-bold text-kdark-900">{c.orderCount} orders</td>
                        <td className="py-3 px-4 font-bold text-primary-800 font-serif">
                          ${Number(c.totalSpent).toFixed(2)}
                        </td>
                        <td className="py-3 px-4 text-right text-gray-400 text-[11px]">
                          {new Date(c.latestOrderDate).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MODAL 1: VIEW ORDER DETAILS */}
      {viewingOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-kdark-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-surface-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-surface-200 mb-5">
              <div>
                <span className="text-xs uppercase tracking-widest text-primary-700 font-bold block">
                  Order Inspection
                </span>
                <h3 className="text-xl font-bold text-kdark-900 font-serif">
                  Order #{viewingOrder.id}
                </h3>
              </div>
              <button
                onClick={() => setViewingOrder(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-kdark-900 hover:bg-surface-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6 text-xs">
              {/* Customer & Shipping Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-surface-50 border border-surface-200 space-y-1.5">
                  <h4 className="font-bold text-kdark-900 text-sm">Customer Info</h4>
                  <p><strong>Name:</strong> {viewingOrder.customer?.name}</p>
                  <p><strong>Email:</strong> {viewingOrder.customer?.email}</p>
                  <p><strong>Phone:</strong> {viewingOrder.customer?.phone}</p>
                </div>
                <div className="p-4 rounded-2xl bg-surface-50 border border-surface-200 space-y-1.5">
                  <h4 className="font-bold text-kdark-900 text-sm">Delivery Address</h4>
                  <p>{viewingOrder.customer?.address}</p>
                  <p>{viewingOrder.customer?.city}, {viewingOrder.customer?.province}</p>
                  <p className="text-primary-700 font-semibold">{viewingOrder.deliveryMethod}</p>
                </div>
              </div>

              {/* Payment Summary */}
              <div className="p-4 rounded-2xl bg-surface-50 border border-surface-200 flex flex-wrap justify-between items-center gap-3">
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase">Payment Method</span>
                  <span className="font-bold text-kdark-900 text-sm">{viewingOrder.paymentMethod}</span>
                  {viewingOrder.paymentReference && (
                    <span className="text-[11px] text-gray-500 block">
                      Ref: {viewingOrder.paymentReference}
                    </span>
                  )}
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase">Current Order Status</span>
                  <select
                    value={viewingOrder.status}
                    onChange={(e) => {
                      updateOrderStatus(viewingOrder.id, e.target.value);
                      setViewingOrder({ ...viewingOrder, status: e.target.value });
                    }}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-full border outline-none cursor-pointer ${getStatusBadge(
                      viewingOrder.status
                    )}`}
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Ordered Products List */}
              <div>
                <h4 className="font-bold text-kdark-900 text-sm mb-2">Ordered Products</h4>
                <div className="divide-y divide-surface-100 border border-surface-200 rounded-2xl overflow-hidden">
                  {viewingOrder.products?.map((item) => (
                    <div key={item.id} className="p-3 bg-white flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-10 h-10 object-contain rounded-lg p-1 bg-surface-50 border border-surface-200"
                        />
                        <div>
                          <p className="font-semibold text-kdark-900">{item.title}</p>
                          <p className="text-gray-400 text-[11px]">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-bold text-kdark-900 font-serif">
                        ${(Number(item.price) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                  <div className="p-3 bg-surface-50 flex justify-between items-center font-bold text-sm">
                    <span>Order Total:</span>
                    <span className="text-base text-primary-800 font-serif">
                      ${Number(viewingOrder.total).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD PRODUCT */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-kdark-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-surface-200">
            <div className="flex items-center justify-between pb-3 border-b border-surface-200 mb-5">
              <h3 className="text-lg font-bold text-kdark-900 font-serif">Add New Product</h3>
              <button
                onClick={() => setIsAddProductOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-kdark-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-kdark-700 mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={newProdForm.title}
                  onChange={(e) => setNewProdForm({ ...newProdForm, title: e.target.value })}
                  placeholder="e.g. Centella Blemish Ampoule 50ml"
                  className="input-field"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-kdark-700 mb-1">Category</label>
                  <select
                    value={newProdForm.category}
                    onChange={(e) => setNewProdForm({ ...newProdForm, category: e.target.value })}
                    className="input-field"
                  >
                    <option value="beauty">Beauty & Skincare</option>
                    <option value="fragrances">Fragrances</option>
                    <option value="groceries">Health & Groceries</option>
                    <option value="furniture">Home Living</option>
                    <option value="kitchen-accessories">Kitchen Care</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-kdark-700 mb-1">Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newProdForm.price}
                    onChange={(e) => setNewProdForm({ ...newProdForm, price: e.target.value })}
                    placeholder="28.00"
                    className="input-field"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-kdark-700 mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    value={newProdForm.stock}
                    onChange={(e) => setNewProdForm({ ...newProdForm, stock: e.target.value })}
                    placeholder="25"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-kdark-700 mb-1">Image URL</label>
                  <input
                    type="url"
                    value={newProdForm.thumbnail}
                    onChange={(e) => setNewProdForm({ ...newProdForm, thumbnail: e.target.value })}
                    placeholder="https://..."
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-kdark-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newProdForm.description}
                  onChange={(e) => setNewProdForm({ ...newProdForm, description: e.target.value })}
                  placeholder="Korean active ingredients and skin benefits..."
                  className="input-field resize-none"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button type="submit" className="flex-1 btn-primary py-2.5 font-semibold">
                  Publish Product
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="btn-secondary py-2.5 px-5 font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: EDIT PRODUCT */}
      {editingProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-kdark-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-surface-200">
            <div className="flex items-center justify-between pb-3 border-b border-surface-200 mb-5">
              <h3 className="text-lg font-bold text-kdark-900 font-serif">Edit Product</h3>
              <button
                onClick={() => setEditingProduct(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-kdark-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateProductSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-kdark-700 mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={editingProduct.title}
                  onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                  className="input-field"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-kdark-700 mb-1">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-kdark-700 mb-1">Stock</label>
                  <input
                    type="number"
                    value={editingProduct.stock}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-kdark-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="input-field resize-none"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button type="submit" className="flex-1 btn-primary py-2.5 font-semibold">
                  Update Product
                </button>
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="btn-secondary py-2.5 px-5 font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
