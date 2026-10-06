import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useApp } from './context/AppContext';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Toast from './Components/Toast';
import AuthModal from './Components/AuthModal';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CartPage from './pages/CartPage';
import ShippingPage from './pages/ShippingPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CustomerPanelPage from './pages/CustomerPanelPage';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]);
  return null;
};

const App = () => {
  const { toast } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-surface-50 text-kdark-900 font-sans selection:bg-primary-100 selection:text-primary-800">
      <ScrollToTop />
      <Header />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/shipping" element={<ShippingPage />} />
          <Route path="/checkout" element={<ShippingPage />} />
          <Route path="/account" element={<CustomerPanelPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/admin" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
      <AuthModal />
      {toast && <Toast msg={toast} />}
    </div>
  );
};

export default App;
