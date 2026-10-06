import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import {
  ShoppingBag,
  ShoppingCart,
  User,
  Menu,
  X,
  Search,
  ChevronDown,
  ShieldCheck,
  Package,
  LogOut,
  SlidersHorizontal,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const Header = () => {
  const { user, login, logout, itemCount, searchTerm, setSearchTerm, openAuthModal } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (window.location.pathname !== '/') {
      navigate('/');
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const handleAccountClick = () => {
    if (login || user) {
      setUserDropdown(!userDropdown);
    } else {
      openAuthModal();
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-surface-200">
      {/* Top Korean Skincare Announcement Bar */}
      <div className="bg-primary-900 text-white text-[11px] sm:text-xs py-1.5 px-4 font-normal tracking-wide">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>100% Authentic Korean Skincare Direct From Seoul • Free Shipping over $50</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-primary-200">
            <Link to="/shipping" className="hover:text-white transition-colors flex items-center gap-1.5 text-xs sm:text-sm">
              <ShieldCheck className="w-4 h-4 text-brand-400" /> Cash on Delivery (COD) Available
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-3 md:gap-8">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:bg-primary-700 transition-colors">
            S
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold tracking-widest text-primary-800 font-serif leading-none">
              SEORA
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-brand-600 font-semibold mt-0.5">
              K-Beauty Solution
            </span>
          </div>
        </Link>

        {/* Search Bar - Desktop */}
        <div className="flex-1 max-w-md hidden md:flex items-center bg-surface-100 border border-surface-200 rounded-full px-4.5 py-2.5 gap-2.5 focus-within:border-primary-500 focus-within:bg-white transition-all shadow-2xs">
          <Search className="w-4.5 h-4.5 text-gray-400 shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search Korean skincare, serums, toners..."
            className="bg-transparent flex-1 text-sm outline-none text-kdark-900 placeholder:text-gray-400"
          />
          {searchTerm && (
            <button onClick={clearSearch} className="text-gray-400 hover:text-gray-600 p-1">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Navigation Links - Desktop */}
        <nav className="hidden lg:flex items-center gap-7">
          <Link to="/" className="text-[15px] font-medium text-kdark-800 hover:text-primary-600 transition-colors">
            Home
          </Link>
          <HashLink smooth to="/#products" className="text-[15px] font-medium text-kdark-800 hover:text-primary-600 transition-colors">
            Shop All
          </HashLink>
          <HashLink smooth to="/#contact" className="text-[15px] font-medium text-kdark-800 hover:text-primary-600 transition-colors">
            Contact & Support
          </HashLink>
        </nav>

        {/* Right Action Icons */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Account Button / Dropdown */}
          <div className="relative">
            <button
              onClick={handleAccountClick}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full hover:bg-surface-100 border border-transparent hover:border-surface-200 transition-all text-kdark-800"
            >
              <User className="w-4 h-4 text-primary-700" />
              <span className="text-xs font-medium hidden sm:inline-block max-w-[100px] truncate">
                {user ? user.name?.split(' ')[0] : 'Sign In'}
              </span>
              {user && <ChevronDown className="w-3 h-3 text-gray-400 hidden sm:block" />}
            </button>

            {/* Dropdown Menu */}
            {userDropdown && user && (
              <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-surface-200 py-1.5 z-50 animate-fade-in">
                <div className="px-4 py-2 border-b border-surface-100">
                  <p className="text-xs font-semibold text-kdark-900 truncate">{user.name}</p>
                  <p className="text-[11px] text-gray-400 truncate">{user.email || 'Guest User'}</p>
                </div>
                <Link
                  to="/account"
                  onClick={() => setUserDropdown(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-kdark-700 hover:bg-surface-100 hover:text-primary-700 transition-colors"
                >
                  <User className="w-3.5 h-3.5 text-primary-600" />
                  Customer Account
                </Link>
                <Link
                  to="/account"
                  onClick={() => setUserDropdown(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-kdark-700 hover:bg-surface-100 hover:text-primary-700 transition-colors"
                >
                  <Package className="w-4 h-4 text-primary-600" />
                  <span className="text-sm">My Orders</span>
                </Link>
                <div className="border-t border-surface-100 my-1"></div>
                <button
                  onClick={() => {
                    logout();
                    setUserDropdown(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-kaccent-600 hover:bg-kaccent-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>

          {/* Cart Icon */}
          <Link
            to="/cart"
            className="relative p-2.5 rounded-full hover:bg-surface-100 text-kdark-800 transition-colors"
            aria-label="View Shopping Cart"
          >
            <ShoppingCart className="w-5.5 h-5.5 text-primary-800" />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-primary-600 text-white text-[11px] rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-xs">
                {itemCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-full hover:bg-surface-100 text-kdark-800 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-surface-200 px-4 sm:px-6 py-4 flex flex-col gap-2.5 animate-fade-in shadow-lg">
          <div className="flex items-center bg-surface-100 border border-surface-200 rounded-full px-4 py-2.5 gap-2.5 mb-2">
            <Search className="w-4.5 h-4.5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search products..."
              className="bg-transparent flex-1 text-sm outline-none text-kdark-900 placeholder:text-gray-400"
            />
          </div>
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="px-3.5 py-2.5 rounded-xl text-base font-medium text-kdark-800 hover:bg-surface-100 hover:text-primary-700 transition-colors"
          >
            Home
          </Link>
          <HashLink
            smooth
            to="/#products"
            onClick={() => setMenuOpen(false)}
            className="px-3.5 py-2.5 rounded-xl text-base font-medium text-kdark-800 hover:bg-surface-100 hover:text-primary-700 transition-colors"
          >
            Shop Products
          </HashLink>
          <Link
            to="/account"
            onClick={() => setMenuOpen(false)}
            className="px-3.5 py-2.5 rounded-xl text-base font-medium text-kdark-800 hover:bg-surface-100 hover:text-primary-700 flex items-center justify-between transition-colors"
          >
            <span>Customer Account</span>
            <span className="text-xs bg-surface-200 px-2.5 py-1 rounded-full text-kdark-600 font-medium">Orders</span>
          </Link>
          <HashLink
            smooth
            to="/#contact"
            onClick={() => setMenuOpen(false)}
            className="px-3.5 py-2.5 rounded-xl text-base font-medium text-kdark-800 hover:bg-surface-100 hover:text-primary-700 transition-colors"
          >
            Contact & Support
          </HashLink>
        </div>
      )}
    </header>
  );
};

export default Header;
