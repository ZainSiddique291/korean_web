import axios from 'axios';

// Create configured Axios instance
const api = axios.create({
  baseURL: '/api',
  withCredentials: true, // Send HTTP-only cookies (refreshToken) with requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Storage token keys
export const TOKEN_KEYS = {
  ACCESS: 'k_access_token',
  REFRESH: 'k_refresh_token',
  USER: 'k_user',
};

export const getStoredAccessToken = () => localStorage.getItem(TOKEN_KEYS.ACCESS);
export const getStoredRefreshToken = () => localStorage.getItem(TOKEN_KEYS.REFRESH);

export const setStoredTokens = ({ accessToken, refreshToken, user }) => {
  if (accessToken) localStorage.setItem(TOKEN_KEYS.ACCESS, accessToken);
  if (refreshToken) localStorage.setItem(TOKEN_KEYS.REFRESH, refreshToken);
  if (user) localStorage.setItem(TOKEN_KEYS.USER, JSON.stringify(user));
};

export const clearStoredAuth = () => {
  localStorage.removeItem(TOKEN_KEYS.ACCESS);
  localStorage.removeItem(TOKEN_KEYS.REFRESH);
  localStorage.removeItem(TOKEN_KEYS.USER);
};

// 1. Request Interceptor: Attach Access Token to every outgoing request
api.interceptors.request.use(
  (config) => {
    const token = getStoredAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Variables for managing token refresh concurrency
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// 2. Response Interceptor: Catch 401s (Expired Access Token) and silently refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if error is 401 and request has not already been retried
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/auth/login') &&
      !originalRequest.url.includes('/auth/refresh')
    ) {
      if (isRefreshing) {
        // Queue parallel requests while refresh is in flight
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = getStoredRefreshToken();

        // Call the refresh endpoint (passes cookie and/or body refreshToken)
        const { data } = await axios.post(
          '/api/auth/refresh',
          { refreshToken },
          { withCredentials: true }
        );

        if (data.success && data.accessToken) {
          // Save updated tokens
          setStoredTokens({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          });

          api.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

          processQueue(null, data.accessToken);
          return api(originalRequest);
        }
      } catch (refreshErr) {
        processQueue(refreshErr, null);
        clearStoredAuth();
        // Notify listeners if necessary
        window.dispatchEvent(new Event('auth:session_expired'));
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// API Service Functions
export const authService = {
  login: async (credentials) => {
    const res = await api.post('/auth/login', credentials);
    if (res.data.success) {
      setStoredTokens({
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
        user: res.data.user,
      });
    }
    return res.data;
  },

  register: async (userData) => {
    const res = await api.post('/auth/register', userData);
    if (res.data.success) {
      setStoredTokens({
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
        user: res.data.user,
      });
    }
    return res.data;
  },

  logout: async () => {
    try {
      const refreshToken = getStoredRefreshToken();
      await api.post('/auth/logout', { refreshToken });
    } catch (err) {
      console.warn('Logout API warning:', err.message);
    } finally {
      clearStoredAuth();
    }
  },

  getMe: async () => {
    const res = await api.get('/auth/me');
    return res.data;
  },

  updateProfile: async (fields) => {
    const res = await api.put('/auth/profile', fields);
    if (res.data.success && res.data.user) {
      localStorage.setItem(TOKEN_KEYS.USER, JSON.stringify(res.data.user));
    }
    return res.data;
  },
};

export const productService = {
  getProducts: async (params = {}) => {
    const res = await api.get('/products', { params });
    return res.data;
  },

  getProductById: async (id) => {
    const res = await api.get(`/products/${id}`);
    return res.data;
  },

  createProduct: async (productData) => {
    const res = await api.post('/products', productData);
    return res.data;
  },

  updateProduct: async (id, fields) => {
    const res = await api.put(`/products/${id}`, fields);
    return res.data;
  },

  deleteProduct: async (id) => {
    const res = await api.delete(`/products/${id}`);
    return res.data;
  },
};

export const orderService = {
  createOrder: async (orderData) => {
    const res = await api.post('/orders', orderData);
    return res.data;
  },

  getMyOrders: async () => {
    const res = await api.get('/orders/my-orders');
    return res.data;
  },

  getAllOrders: async (params = {}) => {
    const res = await api.get('/orders', { params });
    return res.data;
  },

  getOrderById: async (id) => {
    const res = await api.get(`/orders/${id}`);
    return res.data;
  },

  updateOrderStatus: async (id, statusData) => {
    const res = await api.put(`/orders/${id}/status`, statusData);
    return res.data;
  },
};

export const adminService = {
  getStats: async () => {
    const res = await api.get('/admin/stats');
    return res.data;
  },

  getCustomers: async () => {
    const res = await api.get('/admin/customers');
    return res.data;
  },
};

export const cartService = {
  getCart: async () => {
    const res = await api.get('/cart');
    return res.data;
  },

  syncCart: async (items, merge = false) => {
    const res = await api.post('/cart/sync', { items, merge });
    return res.data;
  },

  clearCart: async () => {
    const res = await api.delete('/cart');
    return res.data;
  },
};

export default api;
