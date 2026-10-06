import { useState } from 'react';
import { X, Mail, Lock, User, Phone, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

const AuthModal = () => {
  const { authModalOpen, closeAuthModal, loginUser, registerUser, continueWithGoogle, continueAsGuest, showToast } = useApp();
  const [tab, setTab] = useState('login'); // 'login' | 'signup' | 'guest'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

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
      // Toast error handled in loginUser
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
    setLoading(true);
    try {
      await registerUser({
        name,
        email,
        phone: phone || '+92 300 0000000',
        address: address || 'Pakistan',
        password,
      });
    } catch {
      // Toast error handled in registerUser
    } finally {
      setLoading(false);
    }
  };

  const handleGuest = () => {
    continueAsGuest();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-kdark-900/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-surface-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Banner */}
        <div className="bg-surface-100 px-6 py-5 border-b border-surface-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center text-sm font-semibold">
              S
            </span>
            <div>
              <h3 className="text-base font-semibold text-kdark-900 tracking-tight">SEORA K-Beauty</h3>
              <p className="text-xs text-gray-500">Korean Skincare & Modern Wellness</p>
            </div>
          </div>
          <button
            onClick={closeAuthModal}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-kdark-900 hover:bg-surface-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6">
          {/* Quick 1-Click Auth Options */}
          <div className="space-y-2.5 mb-6">
            <button
              onClick={continueWithGoogle}
              className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-surface-200 bg-white hover:bg-surface-50 text-kdark-800 text-sm font-medium transition-all shadow-sm active:scale-[0.99]"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
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
              Continue with Google
            </button>

            <button
              onClick={handleGuest}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-dashed border-primary-300 bg-primary-50/50 hover:bg-primary-50 text-primary-700 text-sm font-medium transition-all active:scale-[0.99]"
            >
              <Sparkles className="w-4 h-4 text-primary-600" />
              Continue as Guest (No Password Required)
            </button>
          </div>

          <div className="relative flex items-center justify-center my-5">
            <div className="border-t border-surface-200 w-full" />
            <span className="bg-white px-3 text-xs uppercase tracking-wider text-gray-400 absolute">or email</span>
          </div>

          {/* Tab Switcher */}
          <div className="flex bg-surface-100 p-1.5 rounded-xl mb-6">
            <button
              type="button"
              onClick={() => setTab('login')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                tab === 'login'
                  ? 'bg-white text-kdark-900 shadow-sm'
                  : 'text-gray-500 hover:text-kdark-900'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setTab('signup')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                tab === 'signup'
                  ? 'bg-white text-kdark-900 shadow-sm'
                  : 'text-gray-500 hover:text-kdark-900'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Form */}
          {tab === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-kdark-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="input-field pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-kdark-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="input-field pl-10"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-2.5 mt-2 text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? 'Signing In...' : 'Sign In to Account'}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignup} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-kdark-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Fatima Zahra"
                    className="input-field pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-kdark-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="input-field pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-kdark-700 mb-1">Phone Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+92 300 1234567"
                    className="input-field pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-kdark-700 mb-1">Shipping Address</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Street, Area, City"
                    className="input-field pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-kdark-700 mb-1">Create Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="input-field pl-10"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-2.5 mt-2 text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? 'Creating Account...' : 'Create My Account'}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          )}

          <p className="text-[11px] text-center text-gray-400 mt-5 leading-normal">
            By continuing, you agree to SEORA's Terms of Service and Privacy Policy. All products 100% authentic.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
