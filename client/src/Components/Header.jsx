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
  Globe,
  Sparkles,
  Droplets,
  MessageSquare,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const Header = () => {
  const { user, login, logout, itemCount, searchTerm, setSearchTerm, openAuthModal, language, setLanguage, t } = useApp();
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
            <span>{t('announcement', '100% Authentic Korean Skincare Direct From Seoul • Free Shipping over $50')}</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-primary-200">
            <Link to="/shipping" className="hover:text-white transition-colors flex items-center gap-1.5 text-xs sm:text-sm">
              <ShieldCheck className="w-4 h-4 text-brand-400" /> {t('codAvailable', 'Cash on Delivery (COD) Available')}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between gap-2 sm:gap-4 md:gap-6">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 sm:gap-2.5 shrink-0 group">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-primary-600 flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-sm group-hover:bg-primary-700 transition-colors">
            S
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-bold tracking-widest text-primary-800 font-serif leading-none">
              SEORA
            </span>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-brand-600 font-semibold mt-0.5 hidden xs:block">
              {language === 'ko' ? 'K-뷰티 스킨 솔루션' : 'K-Beauty Solution'}
            </span>
          </div>
        </Link>

        {/* Search Bar - Desktop */}
        <div className="flex-1 max-w-md hidden md:flex items-center bg-surface-100/90 border border-surface-200/90 rounded-full px-6 py-2.5 gap-3.5 focus-within:border-primary-500 focus-within:bg-white focus-within:shadow-sm transition-all shadow-xs">
          <Search className="w-4 h-4 text-gray-400 shrink-0 ml-0.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder={t('searchPlaceholder', 'Search Korean skincare, serums, toners...')}
            className="bg-transparent flex-1 text-sm outline-none text-kdark-900 placeholder:text-gray-400 pr-1"
          />
          {searchTerm && (
            <button onClick={clearSearch} className="text-gray-400 hover:text-gray-600 p-1 mr-0.5">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Navigation Buttons - Desktop */}
        <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
          <Link
            to="/"
            className="px-4 py-1.5 rounded-full text-[13px] font-semibold tracking-wide text-kdark-800 bg-surface-100/90 hover:bg-primary-600 hover:text-white border border-surface-200/90 hover:border-primary-600 shadow-2xs hover:shadow-xs hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 select-none"
          >
            {t('navHome', 'Home')}
          </Link>
          <HashLink
            smooth
            to="/#products"
            className="px-4 py-1.5 rounded-full text-[13px] font-semibold tracking-wide text-kdark-800 bg-surface-100/90 hover:bg-primary-600 hover:text-white border border-surface-200/90 hover:border-primary-600 shadow-2xs hover:shadow-xs hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 select-none"
          >
            {t('navShop', 'Shop')}
          </HashLink>
          <HashLink
            smooth
            to="/#how-to-use"
            className="px-4 py-1.5 rounded-full text-[13px] font-semibold tracking-wide text-kdark-800 bg-surface-100/90 hover:bg-primary-600 hover:text-white border border-surface-200/90 hover:border-primary-600 shadow-2xs hover:shadow-xs hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 select-none"
          >
            {t('navRitual', 'Ritual')}
          </HashLink>
          <HashLink
            smooth
            to="/#why-choose-us"
            className="px-4 py-1.5 rounded-full text-[13px] font-semibold tracking-wide text-kdark-800 bg-surface-100/90 hover:bg-primary-600 hover:text-white border border-surface-200/90 hover:border-primary-600 shadow-2xs hover:shadow-xs hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 select-none"
          >
            {t('navAbout', 'About')}
          </HashLink>
          <Link
            to="/contact"
            className="px-4 py-1.5 rounded-full text-[13px] font-semibold tracking-wide text-kdark-800 bg-surface-100/90 hover:bg-primary-600 hover:text-white border border-surface-200/90 hover:border-primary-600 shadow-2xs hover:shadow-xs hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 select-none"
          >
            {t('navContact', 'Contact')}
          </Link>
        </nav>

        {/* Right Action Icons & Compact Language Translator */}
        <div className="flex items-center gap-1 sm:gap-2 md:gap-2.5 shrink-0">
          {/* Language Switcher: Sleek, Compact, strictly Non-wrapping Pill */}
          <div className="inline-flex items-center bg-surface-100/95 border border-surface-200/90 rounded-full p-0.5 text-[11px] sm:text-xs font-semibold shadow-2xs shrink-0 whitespace-nowrap select-none h-7 sm:h-8">
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full transition-all duration-150 shrink-0 whitespace-nowrap leading-none flex items-center gap-1 ${
                language === 'en'
                  ? 'bg-primary-600 text-white shadow-xs font-bold'
                  : 'text-gray-600 hover:text-kdark-900'
              }`}
              title="Switch to English"
              aria-label="Switch to English"
            >
              <Globe className="w-3 h-3 hidden sm:inline" />
              <span>EN</span>
            </button>
            <button
              type="button"
              onClick={() => setLanguage('ko')}
              className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full transition-all duration-150 shrink-0 whitespace-nowrap leading-none flex items-center gap-1 ${
                language === 'ko'
                  ? 'bg-primary-600 text-white shadow-xs font-bold'
                  : 'text-gray-600 hover:text-kdark-900'
              }`}
              title="한국어로 번역 (Translate to Korean)"
              aria-label="Translate to Korean"
            >
              <span>한국어</span>
            </button>
          </div>

          {/* Account Button / Dropdown */}
          <div className="relative shrink-0">
            <button
              onClick={handleAccountClick}
              className="flex items-center gap-1.5 p-1.5 sm:px-3 sm:py-2 rounded-full hover:bg-surface-100 border border-transparent hover:border-surface-200 transition-all text-kdark-800"
              aria-label="Account Menu"
            >
              <User className="w-4 h-4 text-primary-700" />
              <span className="text-xs font-medium hidden sm:inline-block max-w-[90px] truncate">
                {user ? user.name?.split(' ')[0] : t('signIn', 'Sign In')}
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
                  {t('customerAccount', 'Customer Account')}
                </Link>
                <Link
                  to="/account"
                  onClick={() => setUserDropdown(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-kdark-700 hover:bg-surface-100 hover:text-primary-700 transition-colors"
                >
                  <Package className="w-3.5 h-3.5 text-primary-600" />
                  <span className="text-sm">{t('myOrders', 'My Orders')}</span>
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
                  <span>{t('signOut', 'Sign Out')}</span>
                </button>
              </div>
            )}
          </div>

          {/* Cart Icon */}
          <Link
            to="/cart"
            className="relative p-1.5 sm:p-2.5 rounded-full hover:bg-surface-100 text-kdark-800 transition-colors shrink-0"
            aria-label="View Shopping Cart"
          >
            <ShoppingCart className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-primary-800" />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-primary-600 text-white text-[10px] sm:text-[11px] rounded-full w-4.5 h-4.5 sm:w-5 sm:h-5 flex items-center justify-center font-bold shadow-xs">
                {itemCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-1.5 sm:p-2 rounded-full hover:bg-surface-100 text-kdark-800 transition-colors shrink-0"
            aria-label="Toggle Navigation Menu"
          >
            {menuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-surface-200 px-4 sm:px-6 py-5 flex flex-col gap-2 animate-fade-in shadow-lg">
          {/* Mobile Language Switcher */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-surface-50 border border-surface-200/80 mb-2">
            <span className="text-xs font-semibold text-kdark-700 flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary-600" />
              <span>Language / 언어 설정</span>
            </span>
            <div className="flex items-center bg-white border border-surface-200 rounded-full p-0.5 text-xs font-semibold shadow-2xs">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-full transition-all ${
                  language === 'en' ? 'bg-primary-600 text-white shadow-xs' : 'text-gray-500'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('ko')}
                className={`px-3 py-1 rounded-full transition-all ${
                  language === 'ko' ? 'bg-primary-600 text-white shadow-xs' : 'text-gray-500'
                }`}
              >
                한국어
              </button>
            </div>
          </div>

          <div className="flex items-center bg-surface-100 border border-surface-200 rounded-full px-5 py-2.5 gap-3 mb-2">
            <Search className="w-4 h-4 text-gray-400 shrink-0 ml-0.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder={t('searchMobilePlaceholder', 'Search Korean skincare...')}
              className="bg-transparent flex-1 text-sm outline-none text-kdark-900 placeholder:text-gray-400 pr-1"
            />
            {searchTerm && (
              <button onClick={clearSearch} className="text-gray-400 hover:text-gray-600 p-0.5">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          {/* Mobile One-Word Navigation Buttons */}
          <div className="grid grid-cols-2 gap-2 my-1">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="py-2.5 px-3 rounded-xl text-xs font-semibold text-kdark-800 bg-surface-50 hover:bg-primary-600 hover:text-white border border-surface-200/90 hover:border-primary-600 transition-all duration-200 flex items-center justify-center gap-1.5 shadow-2xs active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-500" />
              <span>{t('navHome', 'Home')}</span>
            </Link>
            <HashLink
              smooth
              to="/#products"
              onClick={() => setMenuOpen(false)}
              className="py-2.5 px-3 rounded-xl text-xs font-semibold text-kdark-800 bg-surface-50 hover:bg-primary-600 hover:text-white border border-surface-200/90 hover:border-primary-600 transition-all duration-200 flex items-center justify-center gap-1.5 shadow-2xs active:scale-95"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-primary-600" />
              <span>{t('navShop', 'Shop')}</span>
            </HashLink>
            <HashLink
              smooth
              to="/#how-to-use"
              onClick={() => setMenuOpen(false)}
              className="py-2.5 px-3 rounded-xl text-xs font-semibold text-kdark-800 bg-surface-50 hover:bg-primary-600 hover:text-white border border-surface-200/90 hover:border-primary-600 transition-all duration-200 flex items-center justify-center gap-1.5 shadow-2xs active:scale-95"
            >
              <Droplets className="w-3.5 h-3.5 text-sky-600" />
              <span>{t('navRitual', 'Ritual')}</span>
            </HashLink>
            <HashLink
              smooth
              to="/#why-choose-us"
              onClick={() => setMenuOpen(false)}
              className="py-2.5 px-3 rounded-xl text-xs font-semibold text-kdark-800 bg-surface-50 hover:bg-primary-600 hover:text-white border border-surface-200/90 hover:border-primary-600 transition-all duration-200 flex items-center justify-center gap-1.5 shadow-2xs active:scale-95"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t('navAbout', 'About')}</span>
            </HashLink>
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="col-span-2 py-2.5 px-3 rounded-xl text-xs font-semibold text-kdark-800 bg-surface-50 hover:bg-primary-600 hover:text-white border border-surface-200/90 hover:border-primary-600 transition-all duration-200 flex items-center justify-center gap-1.5 shadow-2xs active:scale-95"
            >
              <MessageSquare className="w-3.5 h-3.5 text-brand-600" />
              <span>{t('navContact', 'Contact')}</span>
            </Link>
          </div>
          <Link
            to="/account"
            onClick={() => setMenuOpen(false)}
            className="px-4 py-2.5 rounded-xl text-base font-medium text-kdark-800 hover:bg-surface-100 hover:text-primary-700 flex items-center justify-between transition-colors border-t border-surface-100 pt-3 mt-1"
          >
            <span>{t('customerAccount', 'Customer Account')}</span>
            <span className="text-xs bg-surface-200 px-3 py-1 rounded-full text-kdark-600 font-medium">{t('myOrders', 'Orders')}</span>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
