import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

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
        price: 34.00,
        quantity: 2,
        thumbnail: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80',
      },
      {
        id: 2,
        title: 'Centella Calming Relief Ampoule',
        price: 28.00,
        quantity: 1,
        thumbnail: 'https://images.unsplash.com/photo-1608248597359-0a91176b6ffc?w=400&q=80',
      }
    ],
    deliveryMethod: 'Express Delivery (2-3 Days)',
    paymentMethod: 'Cash on Delivery (COD)',
    paymentStatus: 'Pending (COD)',
    status: 'Delivered',
    total: 96.00,
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
        price: 26.50,
        quantity: 1,
        thumbnail: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80',
      }
    ],
    deliveryMethod: 'Standard Delivery (3-5 Days)',
    paymentMethod: 'JazzCash',
    paymentStatus: 'Paid',
    status: 'Processing',
    total: 26.50,
  }
];

export const AppProvider = ({ children }) => {
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

  const loginUser = (userData) => {
    const fullUser = {
      isGuest: false,
      ...userData,
    };
    setUser(fullUser);
    localStorage.setItem('k_user', JSON.stringify(fullUser));
    closeAuthModal();
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

  const logout = () => {
    setUser(null);
    localStorage.removeItem('k_user');
    showToast('Logged out successfully');
  };

  const updateUserProfile = (updatedFields) => {
    setUser(prev => {
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
  }, [cart]);

  const itemCount = cart.reduce((s, i) => s + (i.quantity || 1), 0);
  const cartTotal = () => cart.reduce((s, i) => s + Number(i.price) * (i.quantity || 1), 0);

  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) {
        return prev.map(p =>
          p.id === product.id ? { ...p, quantity: (p.quantity || 1) + qty } : p
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });
  };

  const updateQty = (id, delta) => {
    setCart(prev =>
      prev
        .map(p => {
          if (p.id === id) {
            const newQ = (p.quantity || 1) + delta;
            return newQ > 0 ? { ...p, quantity: newQ } : null;
          }
          return p;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(p => p.id !== id));
  const clearCart = () => setCart([]);

  // 3. Products Management (with DummyJSON + Local Overrides/Admin support)
  const [products, setProducts] = useState(() => {
    try {
      const cached = localStorage.getItem('k_custom_products');
      return cached ? JSON.parse(cached) : [];
    } catch {
      return [];
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  const fetchProducts = useCallback(async () => {
    // If we already have stored custom products from localStorage, keep them unless empty
    setLoading(true);
    setError(null);
    try {
      const url = filter === 'all'
        ? 'https://dummyjson.com/products?limit=60'
        : `https://dummyjson.com/products/category/${filter}`;
      const res = await fetch(url);
      const data = await res.json();
      const fetched = data.products || [];

      // Merge with any custom local products
      const localCustom = JSON.parse(localStorage.getItem('k_custom_products') || '[]');
      if (localCustom.length > 0) {
        // Overlay local custom additions/edits
        const idMap = new Map();
        fetched.forEach(p => idMap.set(p.id, p));
        localCustom.forEach(p => idMap.set(p.id, p));
        setProducts(Array.from(idMap.values()));
      } else {
        setProducts(fetched);
      }
    } catch {
      setError('Unable to load products. Check your connection.');
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const addProduct = (newProd) => {
    const product = {
      ...newProd,
      id: Date.now(),
      rating: newProd.rating || 5.0,
      stock: Number(newProd.stock) || 20,
      price: Number(newProd.price) || 25,
      thumbnail: newProd.thumbnail || 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80',
    };
    setProducts(prev => {
      const updated = [product, ...prev];
      const customOnly = updated.filter(p => typeof p.id === 'number' && p.id > 100000000000);
      localStorage.setItem('k_custom_products', JSON.stringify(customOnly));
      return updated;
    });
    showToast('Product added successfully ✅');
    return product;
  };

  const updateProduct = (id, fields) => {
    setProducts(prev => {
      const updated = prev.map(p => (p.id === id ? { ...p, ...fields } : p));
      const customOnly = updated.filter(p => typeof p.id === 'number' && p.id > 100000000000);
      localStorage.setItem('k_custom_products', JSON.stringify(customOnly));
      return updated;
    });
    showToast('Product updated ✅');
  };

  const deleteProduct = (id) => {
    setProducts(prev => {
      const updated = prev.filter(p => p.id !== id);
      const customOnly = updated.filter(p => typeof p.id === 'number' && p.id > 100000000000);
      localStorage.setItem('k_custom_products', JSON.stringify(customOnly));
      return updated;
    });
    showToast('Product removed');
  };

  // 4. Orders Management (Persistence & Admin Control)
  const [orders, setOrders] = useState(() => {
    try {
      const stored = localStorage.getItem('k_orders');
      return stored ? JSON.parse(stored) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  useEffect(() => {
    localStorage.setItem('k_orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (orderData) => {
    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id: orderId,
      date: new Date().toISOString(),
      status: 'Processing',
      ...orderData,
    };
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev =>
      prev.map(ord => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );
    showToast(`Order #${orderId} marked as ${newStatus}`);
  };

  // 5. Customers List (for Admin Dashboard)
  const customers = useMemo(() => {
    const map = new Map();
    orders.forEach(ord => {
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
          latestOrderDate: ord.date,
        });
      } else {
        const item = map.get(key);
        item.orderCount += 1;
        item.totalSpent += Number(ord.total) || 0;
        if (new Date(ord.date) > new Date(item.latestOrderDate)) {
          item.latestOrderDate = ord.date;
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
  }, [orders, user]);

  // 6. Toast Notification
  const [toast, setToast] = useState('');
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2800);
  };

  return (
    <AppContext.Provider
      value={{
        // Auth
        user,
        login,
        loginUser,
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
        addOrder,
        updateOrderStatus,

        // Customers
        customers,

        // Toast
        toast,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
