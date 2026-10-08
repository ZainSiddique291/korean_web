import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import {
  authService,
  productService,
  orderService,
  adminService,
  cartService,
  getStoredAccessToken,
  clearStoredAuth,
} from '../services/api';
import { translations } from '../utils/translations';
import { DEFAULT_SEORA_PRODUCTS } from '../data/defaultProducts';

const AppContext = createContext();

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};

const INITIAL_ORDERS = [
  {
    id: 'ORD-9482',
    date: '2026-10-02T10:30:00Z',
    customer: {
      name: 'Amina Tariq',
      email: 'amina.t@example.com',
      phone: '+92 321 8847291',
      address: 'House 42, Street 8, DHA Phase 5',
      city: 'Lahore',
    },
    products: [
      {
        id: 1,
        title: 'Essence Toner Hyaluronic Acid Deep Hydration',
        price: 34.0,
        quantity: 2,
        thumbnail: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80',
      },
      {
        id: 2,
        title: 'Centella Calming Relief Ampoule',
        price: 28.0,
        quantity: 1,
        thumbnail: 'https://images.unsplash.com/photo-1608248597359-0a91176b6ffc?w=400&q=80',
      },
    ],
    deliveryMethod: 'Express Delivery (2-3 Days)',
    paymentMethod: 'Cash on Delivery (COD)',
    paymentStatus: 'Pending (COD)',
    status: 'Delivered',
    total: 96.0,
  },
  {
    id: 'ORD-9485',
    date: '2026-10-04T15:15:00Z',
    customer: {
      name: 'Zainab Noor',
      email: 'zainab.noor@example.com',
      phone: '+92 300 4592019',
      address: 'Apartment 4B, Gulberg Heights',
      city: 'Lahore',
    },
    products: [
      {
        id: 3,
        title: 'Glow Niacinamide Serum 10% + Zinc',
        price: 26.5,
        quantity: 1,
        thumbnail: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80',
      },
    ],
    deliveryMethod: 'Standard Delivery (3-5 Days)',
    paymentMethod: 'JazzCash',
    paymentStatus: 'Paid',
    status: 'Processing',
    total: 26.5,
  },
];

export const AppProvider = ({ children }) => {
  // Language & Translation (EN / KO)
  const [language, setLanguageState] = useState(() => {
    try {
      return localStorage.getItem('k_lang') || 'en';
    } catch {
      return 'en';
    }
  });

  const setLanguage = (lang) => {
    const next = lang === 'ko' ? 'ko' : 'en';
    setLanguageState(next);
    try {
      localStorage.setItem('k_lang', next);
    } catch {}
  };

  const t = useCallback((key, fallback) => {
    const langDict = translations[language] || translations.en;
    if (langDict && langDict[key] !== undefined) {
      return langDict[key];
    }
    const enDict = translations.en;
    if (enDict && enDict[key] !== undefined) {
      return enDict[key];
    }
    return fallback !== undefined ? fallback : key;
  }, [language]);

  // 1. Auth & Session
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('k_user')) || null;
    } catch {
      return null;
    }
  });

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const openAuthModal = () => setAuthModalOpen(true);
  const closeAuthModal = () => setAuthModalOpen(false);

  // 6. Toast Notification
  const [toast, setToast] = useState('');
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2800);
  };

  // Validate active session on mount & auto-refresh expired access tokens
  useEffect(() => {
    const initAuth = async () => {
      const token = getStoredAccessToken();
      if (token) {
        try {
          const data = await authService.getMe();
          if (data?.success && data.user) {
            setUser(data.user);
            localStorage.setItem('k_user', JSON.stringify(data.user));

            // HYBRID MODEL: Merge guest localStorage cart with server database cart
            try {
              const localItems = JSON.parse(localStorage.getItem('k_cart') || '[]');
              const syncRes = await cartService.syncCart(localItems, true);
              if (syncRes.success && syncRes.cart) {
                setCart(syncRes.cart);
                localStorage.setItem('k_cart', JSON.stringify(syncRes.cart));
              }
            } catch (cartErr) {
              console.warn('Cart sync on mount warning:', cartErr.message);
            }
          }
        } catch {
          // If token refresh failed, user will be logged out cleanly
        }
      }
    };
    initAuth();

    const handleSessionExpired = () => {
      setUser(null);
      clearStoredAuth();
      showToast('Session expired. Please sign in again.');
    };

    window.addEventListener('auth:session_expired', handleSessionExpired);
    return () => window.removeEventListener('auth:session_expired', handleSessionExpired);
  }, []);

  const loginUser = async (credentials) => {
    if (credentials.email && credentials.password) {
      try {
        const res = await authService.login(credentials);
        if (res.success) {
          setUser(res.user);
          closeAuthModal();
          showToast(`Welcome back, ${res.user.name}! ✨`);

          // HYBRID MODEL: Merge guest localStorage cart with user's MongoDB cart on login
          try {
            const localItems = JSON.parse(localStorage.getItem('k_cart') || '[]');
            const syncRes = await cartService.syncCart(localItems, true);
            if (syncRes.success && syncRes.cart) {
              setCart(syncRes.cart);
              localStorage.setItem('k_cart', JSON.stringify(syncRes.cart));
            }
          } catch (cartErr) {
            console.warn('Hybrid cart merge error:', cartErr.message);
          }

          return res.user;
        }
      } catch (err) {
        const msg = err.response?.data?.message || 'Login failed. Please check your credentials.';
        showToast(msg);
        throw err;
      }
    } else {
      // Social/Guest fallback
      const fullUser = {
        isGuest: false,
        ...credentials,
      };
      setUser(fullUser);
      localStorage.setItem('k_user', JSON.stringify(fullUser));
      closeAuthModal();
      return fullUser;
    }
  };

  const registerUser = async (formData) => {
    try {
      const res = await authService.register(formData);
      if (res.success) {
        setUser(res.user);
        closeAuthModal();
        showToast(`Account created! Welcome, ${res.user.name} ✨`);

        // HYBRID MODEL: Persist guest cart to new MongoDB account
        try {
          const localItems = JSON.parse(localStorage.getItem('k_cart') || '[]');
          if (localItems.length > 0) {
            const syncRes = await cartService.syncCart(localItems, false);
            if (syncRes.success && syncRes.cart) {
              setCart(syncRes.cart);
            }
          }
        } catch (cartErr) {
          console.warn('Hybrid cart sync on register:', cartErr.message);
        }

        return res.user;
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed.';
      showToast(msg);
      throw err;
    }
  };

  const continueWithGoogle = () => {
    const googleUser = {
      name: 'Ayesha Khan',
      email: 'ayesha.khan@gmail.com',
      phone: '+92 302 9845112',
      address: 'Block C, Model Town, Lahore',
      city: 'Lahore',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      isGuest: false,
      provider: 'Google',
    };
    loginUser(googleUser);
    showToast('Signed in with Google ✅');
  };

  const continueAsGuest = (guestInfo = {}) => {
    const guestUser = {
      name: guestInfo.name || 'Guest Shopper',
      email: guestInfo.email || 'guest@store.local',
      phone: guestInfo.phone || '',
      address: guestInfo.address || '',
      city: guestInfo.city || '',
      isGuest: true,
    };
    setUser(guestUser);
    localStorage.setItem('k_user', JSON.stringify(guestUser));
    closeAuthModal();
    showToast('Continuing as Guest Shopper');
    return guestUser;
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch {
      // Ignore network errors on logout
    }
    setUser(null);
    clearStoredAuth();
    setCart([]);
    localStorage.removeItem('k_cart');
    showToast('Logged out successfully');
  };

  const updateUserProfile = async (updatedFields) => {
    if (user && !user.isGuest && getStoredAccessToken()) {
      try {
        const res = await authService.updateProfile(updatedFields);
        if (res.success) {
          setUser(res.user);
          showToast('Profile updated ✅');
          return;
        }
      } catch (err) {
        showToast(err.response?.data?.message || 'Failed to update profile');
        return;
      }
    }
    // Local / Guest update
    setUser((prev) => {
      const next = { ...prev, ...updatedFields };
      localStorage.setItem('k_user', JSON.stringify(next));
      return next;
    });
    showToast('Profile updated ✅');
  };

  const login = !!user && !user.isGuest;

  // 2. Cart Management
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('k_cart')) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('k_cart', JSON.stringify(cart));

    // HYBRID MODEL: When logged in, sync changes to MongoDB in background
    if (user && !user.isGuest && getStoredAccessToken()) {
      const timer = setTimeout(() => {
        cartService.syncCart(cart, false).catch(() => {});
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [cart, user]);

  const itemCount = cart.reduce((s, i) => s + (i.quantity || 1), 0);
  const cartTotal = () => cart.reduce((s, i) => s + Number(i.price) * (i.quantity || 1), 0);

  const addToCart = (product, qty = 1) => {
    if (!product) return;
    const prodId = String(product.id || product._id || '');
    const numQty = Math.max(1, parseInt(qty, 10) || 1);

    setCart((prev) => {
      const existingIndex = prev.findIndex((p) => String(p.id || p._id) === prodId);
      if (existingIndex > -1) {
        return prev.map((item, idx) =>
          idx === existingIndex
            ? { ...item, id: prodId, quantity: (item.quantity || 1) + numQty }
            : item
        );
      }
      return [
        ...prev,
        {
          ...product,
          id: prodId,
          price: Number(product.price) || 0,
          quantity: numQty,
        },
      ];
    });
  };

  const updateQty = (id, delta) => {
    const targetId = String(id);
    setCart((prev) =>
      prev
        .map((p) => {
          if (String(p.id || p._id) === targetId) {
            const newQ = (p.quantity || 1) + delta;
            return newQ > 0 ? { ...p, quantity: newQ } : null;
          }
          return p;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (id) => {
    const targetId = String(id);
    setCart((prev) => prev.filter((p) => String(p.id || p._id) !== targetId));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('k_cart');
    if (user && !user.isGuest && getStoredAccessToken()) {
      cartService.clearCart().catch(() => {});
    }
  };

  // 3. Products Management (MongoDB Backend + Fallback)
  const [products, setProducts] = useState(() => {
    try {
      const cached = localStorage.getItem('k_custom_products');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return DEFAULT_SEORA_PRODUCTS;
    } catch {
      return DEFAULT_SEORA_PRODUCTS;
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (filter && filter !== 'all') params.category = filter;
      if (searchTerm) params.search = searchTerm;
      if (sortBy) params.sort = sortBy;

      const data = await productService.getProducts(params);
      if (data.success && Array.isArray(data.products) && data.products.length > 0) {
        setProducts(data.products);
      } else {
        setProducts((prev) => (prev && prev.length > 0 ? prev : DEFAULT_SEORA_PRODUCTS));
      }
    } catch {
      // Backend API offline or deploying: retain authentic SEORA fallback catalog smoothly
      setProducts((prev) => (prev && prev.length > 0 ? prev : DEFAULT_SEORA_PRODUCTS));
    } finally {
      setLoading(false);
    }
  }, [filter, searchTerm, sortBy]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const addProduct = async (newProd) => {
    try {
      const res = await productService.createProduct(newProd);
      if (res.success && res.product) {
        setProducts((prev) => [res.product, ...prev]);
        showToast('Product added successfully ✅');
        return res.product;
      }
    } catch {
      // Local fallback
      const product = {
        ...newProd,
        id: Date.now(),
        rating: newProd.rating || 5.0,
        stock: Number(newProd.stock) || 20,
        price: Number(newProd.price) || 25,
        thumbnail:
          newProd.thumbnail ||
          'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80',
      };
      setProducts((prev) => [product, ...prev]);
      showToast('Product added successfully ✅');
      return product;
    }
  };

  const updateProduct = async (id, fields) => {
    try {
      await productService.updateProduct(id, fields);
      setProducts((prev) =>
        prev.map((p) => (p.id === id || p._id === id ? { ...p, ...fields } : p))
      );
      showToast('Product updated ✅');
    } catch {
      setProducts((prev) =>
        prev.map((p) => (p.id === id || p._id === id ? { ...p, ...fields } : p))
      );
      showToast('Product updated ✅');
    }
  };

  const deleteProduct = async (id) => {
    try {
      await productService.deleteProduct(id);
    } catch {
      // Ignore network errors for local delete
    }
    setProducts((prev) => prev.filter((p) => p.id !== id && p._id !== id));
    showToast('Product removed');
  };

  // 4. Orders Management (MongoDB Backend + Persistence)
  const [orders, setOrders] = useState(() => {
    try {
      const stored = localStorage.getItem('k_orders');
      return stored ? JSON.parse(stored) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const fetchOrders = useCallback(async () => {
    if (!user || user.isGuest) return;
    try {
      if (user.role === 'admin') {
        const res = await orderService.getAllOrders();
        if (res.success && res.orders) {
          setOrders(res.orders);
        }
      } else {
        const res = await orderService.getMyOrders();
        if (res.success && res.orders) {
          setOrders(res.orders);
        }
      }
    } catch {
      // Keep cached orders if offline
    }
  }, [user]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  useEffect(() => {
    localStorage.setItem('k_orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = async (orderData) => {
    try {
      const res = await orderService.createOrder(orderData);
      if (res.success && res.order) {
        setOrders((prev) => [res.order, ...prev]);
        clearCart();
        return res.order;
      }
    } catch {
      // Fallback offline order creation
    }

    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id: orderId,
      date: new Date().toISOString(),
      status: 'Processing',
      ...orderData,
    };
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await orderService.updateOrderStatus(orderId, { status: newStatus });
    } catch {
      // Offline fallback
    }
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId || ord.orderId === orderId ? { ...ord, status: newStatus } : ord))
    );
    showToast(`Order #${orderId} marked as ${newStatus}`);
  };

  // 5. Admin Dashboard Backend Data
  const [adminStats, setAdminStats] = useState(null);
  const [adminCustomers, setAdminCustomers] = useState([]);
  const [adminLoading, setAdminLoading] = useState(false);

  const fetchAdminData = useCallback(async () => {
    if (!user || user.role !== 'admin') return;
    setAdminLoading(true);
    try {
      const [statsRes, custRes, ordersRes] = await Promise.allSettled([
        adminService.getStats(),
        adminService.getCustomers(),
        orderService.getAllOrders(),
      ]);

      if (statsRes.status === 'fulfilled' && statsRes.value?.success) {
        setAdminStats(statsRes.value.stats);
      }
      if (custRes.status === 'fulfilled' && custRes.value?.success) {
        setAdminCustomers(custRes.value.customers);
      }
      if (ordersRes.status === 'fulfilled' && ordersRes.value?.success) {
        setOrders(ordersRes.value.orders);
      }
    } catch (err) {
      console.warn('Admin sync error:', err.message);
    } finally {
      setAdminLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetchAdminData();
    }
  }, [user, fetchAdminData]);

  // 6. Customers Directory (Backend Aggregate + Offline Fallback)
  const customers = useMemo(() => {
    if (adminCustomers && adminCustomers.length > 0) {
      return adminCustomers;
    }
    const map = new Map();
    orders.forEach((ord) => {
      if (!ord.customer?.email) return;
      const key = ord.customer.email.toLowerCase();
      if (!map.has(key)) {
        map.set(key, {
          name: ord.customer.name,
          email: ord.customer.email,
          phone: ord.customer.phone || 'N/A',
          city: ord.customer.city || 'N/A',
          orderCount: 1,
          totalSpent: Number(ord.total) || 0,
          latestOrderDate: ord.date || ord.createdAt,
        });
      } else {
        const item = map.get(key);
        item.orderCount += 1;
        item.totalSpent += Number(ord.total) || 0;
        const ordDate = ord.date || ord.createdAt;
        if (new Date(ordDate) > new Date(item.latestOrderDate)) {
          item.latestOrderDate = ordDate;
        }
      }
    });

    if (user && user.email && !map.has(user.email.toLowerCase())) {
      map.set(user.email.toLowerCase(), {
        name: user.name,
        email: user.email,
        phone: user.phone || 'N/A',
        city: user.city || 'Lahore',
        orderCount: 0,
        totalSpent: 0,
        latestOrderDate: new Date().toISOString(),
      });
    }

    return Array.from(map.values());
  }, [orders, user, adminCustomers]);

  return (
    <AppContext.Provider
      value={{
        // Auth
        user,
        login,
        loginUser,
        registerUser,
        continueWithGoogle,
        continueAsGuest,
        logout,
        updateUserProfile,
        authModalOpen,
        openAuthModal,
        closeAuthModal,

        // Cart
        cart,
        itemCount,
        cartTotal,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,

        // Products
        products,
        loading,
        error,
        filter,
        setFilter,
        searchTerm,
        setSearchTerm,
        sortBy,
        setSortBy,
        addProduct,
        updateProduct,
        deleteProduct,
        fetchProducts,

        // Orders
        orders,
        fetchOrders,
        addOrder,
        updateOrderStatus,

        // Admin Backend Data
        adminStats,
        adminLoading,
        fetchAdminData,

        // Customers
        customers,

        // Language & Translation
        language,
        setLanguage,
        t,

        // Toast
        toast,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
