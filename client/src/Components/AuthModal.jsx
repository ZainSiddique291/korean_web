import { useState, useEffect } from 'react';
import { X, Mail, Lock, User, Phone, MapPin, Eye, EyeOff, ShieldCheck, ArrowRight, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

const AuthModal = () => {
  const {
    authModalOpen,
    authModalTab,
    closeAuthModal,
    loginUser,
    registerUser,
    continueWithGoogle,
    showToast,
  } = useApp();

  const [tab, setTab] = useState(authModalTab || 'login'); // 'login' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  // Synchronize tab state with openAuthModal trigger
  useEffect(() => {
    if (authModalTab) {
      setTab(authModalTab);
    }
  }, [authModalTab, authModalOpen]);

  // Handle ESC key and scroll lock
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeAuthModal();
    };

    if (authModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [authModalOpen, closeAuthModal]);

  if (!authModalOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please enter both email and password');
      return;
    }
    setLoading(true);
    try {
      await loginUser({ email, password });
    } catch {
      // Handled in loginUser
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!email || !password || !name) {
      showToast('Please fill out all required fields');
      return;
    }
    if (password.length < 6) {
      showToast('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      await registerUser({
        name,
        email,
        phone: phone || '',
        address: address || '',
        password,
      });
    } catch {
      // Handled in registerUser
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-6 bg-kdark-950/70 backdrop-blur-md animate-fade-in"
      onClick={closeAuthModal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div
        className="relative w-full max-w-md sm:max-w-lg bg-white rounded-3xl shadow-2xl border border-surface-200/90 overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-primary-50/90 via-surface-50 to-primary-100/50 px-5 sm:px-6 py-4 sm:py-5 border-b border-surface-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-primary-600 text-white flex items-center justify-center text-base font-serif font-bold shadow-sm">
              S
            </span>
            <div>
              <h3 id="auth-modal-title" className="text-base sm:text-lg font-bold text-kdark-900 font-serif leading-snug">
                SEORA K-Beauty
              </h3>
              <p className="text-xs text-primary-800/80 font-medium">
                Authentic Korean Skincare • Seoul Labs
              </p>
            </div>
          </div>
          <button
            onClick={closeAuthModal}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-kdark-900 hover:bg-white transition-all border border-transparent hover:border-surface-200 shadow-2xs"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Member Benefits Strip */}
        <div className="bg-emerald-50/80 border-b border-emerald-100/90 px-4 sm:px-6 py-2 text-xs text-emerald-800 flex items-center justify-center gap-2 font-medium shrink-0 text-center">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Member Perks: Free Express Shipping over $50 &amp; Order Tracking</span>
        </div>

        {/* Scrollable Content Area */}
        <div className="overflow-y-auto px-5 sm:px-7 py-5 space-y-4">
          {/* Quick 1-Click Google Auth */}
          <div>
            <button
              type="button"
              onClick={continueWithGoogle}
              className="w-full flex items-center justify-center gap-3 py-2.5 sm:py-3 px-4 rounded-2xl border border-surface-200 bg-white hover:bg-surface-50 text-kdark-800 text-sm font-semibold transition-all shadow-xs active:scale-[0.99]"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>

          <div className="relative flex items-center justify-center my-3">
            <div className="border-t border-surface-200 w-full" />
            <span className="bg-white px-3 text-[11px] uppercase tracking-wider text-gray-400 font-semibold absolute">
              or continue with email
            </span>
          </div>

          {/* Tab Switcher */}
          <div className="flex bg-surface-100 p-1 rounded-2xl border border-surface-200/70">
            <button
              type="button"
              onClick={() => setTab('login')}
              className={`flex-1 py-2 sm:py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all duration-200 ${
                tab === 'login'
                  ? 'bg-white text-primary-900 shadow-xs border border-surface-200/60'
                  : 'text-gray-500 hover:text-kdark-900'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setTab('signup')}
              className={`flex-1 py-2 sm:py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all duration-200 ${
                tab === 'signup'
                  ? 'bg-white text-primary-900 shadow-xs border border-surface-200/60'
                  : 'text-gray-500 hover:text-kdark-900'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Forms */}
          {tab === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-kdark-700 mb-1">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="input-field pl-10 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-kdark-700 mb-1">
                  Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="input-field pl-10 pr-10 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-kdark-800 transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-3 sm:py-3.5 text-sm sm:text-base font-semibold flex items-center justify-center gap-2 mt-4 shadow-sm active:scale-[0.99] disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setTab('signup')}
                  className="text-xs text-gray-500 hover:text-primary-700 font-medium transition-colors"
                >
                  Don't have an account? <span className="font-bold text-primary-700 underline">Create one</span>
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSignup} className="space-y-3">
              {/* Responsive 2-column on tablet/desktop for name and phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-kdark-700 mb-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Fatima Zahra"
                      className="input-field pl-10 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-kdark-700 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+92 300 1234567"
                      className="input-field pl-10 text-sm"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-kdark-700 mb-1">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="input-field pl-10 text-sm"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-kdark-700">
                    Create Password <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-[10px] text-gray-400">Min 6 characters</span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="input-field pl-10 pr-10 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-kdark-800 transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-kdark-700 mb-1">
                  Shipping Address (Optional)
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Street, Area, City"
                    className="input-field pl-10 text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-3 sm:py-3.5 text-sm sm:text-base font-semibold flex items-center justify-center gap-2 mt-4 shadow-sm active:scale-[0.99] disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create My Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setTab('login')}
                  className="text-xs text-gray-500 hover:text-primary-700 font-medium transition-colors"
                >
                  Already have an account? <span className="font-bold text-primary-700 underline">Sign in</span>
                </button>
              </div>
            </form>
          )}

          {/* Trust Guarantees */}
          <div className="pt-3 border-t border-surface-100 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[11px] text-gray-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Authentic Korean Products</span>
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-primary-600" />
              <span>256-Bit SSL Encrypted</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
