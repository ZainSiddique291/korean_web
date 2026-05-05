import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useApp } from './context/AppContext';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Toast from './Components/Toast';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CartPage from './pages/CartPage';
import ShippingPage from './pages/ShippingPage';
import ProductDetailPage from './pages/ProductDetailPage';

const Protected = ({ children }) => {
  const { login } = useApp();
  return login ? children : <Navigate to="/login" replace />;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);
  return null;
};

const App = () => {
  const { toast } = useApp();
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<Protected><CartPage /></Protected>} />
          <Route path="/shipping" element={<Protected><ShippingPage /></Protected>} />
        </Routes>
      </main>
      <Footer />
      {toast && <Toast msg={toast} />}
    </div>
  );
};

export default App;
