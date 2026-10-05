import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Eye, EyeOff, Sparkles, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

const LoginPage = () => {
  const { loginUser, continueWithGoogle, continueAsGuest, showToast } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const saved = JSON.parse(localStorage.getItem('registered_user') || 'null');
    if (saved && saved.email === email && saved.password === password) {
      loginUser(saved);
      showToast(`Welcome back, ${saved.name}! ✨`);
      navigate('/account');
    } else {
      const demoUser = {
        name: email.split('@')[0] || 'Customer',
        email,
        phone: '+92 300 1234567',
        address: 'Pakistan',
      };
      loginUser(demoUser);
      showToast('Signed in successfully ✨');
      navigate('/account');
    }
  };

  const handleGoogle = () => {
    continueWithGoogle();
    navigate('/account');
  };

  const handleGuest = () => {
    continueAsGuest();
    navigate('/cart');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-surface-50 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-surface-200 animate-fade-in">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-primary-600 flex items-center justify-center text-white">
            <LogIn className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-kdark-900 font-serif">Welcome Back</h1>
            <p className="text-xs text-gray-500">Sign in to your SEORA account</p>
          </div>
        </div>

        {/* 1-Click Fast Auth */}
        <div className="space-y-2.5 mb-6">
          <button
            type="button"
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-surface-200 bg-white hover:bg-surface-50 text-kdark-800 text-xs font-semibold transition-all shadow-xs"
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
            type="button"
            onClick={handleGuest}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-dashed border-primary-300 bg-primary-50/60 hover:bg-primary-50 text-primary-700 text-xs font-semibold transition-all"
          >
            <Sparkles className="w-4 h-4 text-primary-600" />
            Continue as Guest (No Account Required)
          </button>
        </div>

        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-surface-200 w-full" />
          <span className="bg-white px-3 text-[10px] uppercase tracking-wider text-gray-400 absolute">or sign in with email</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-semibold text-kdark-700 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="input-field"
            />
          </div>

          <div>
            <label className="block font-semibold text-kdark-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="input-field pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full btn-primary py-3 text-xs font-semibold flex items-center justify-center gap-2 mt-4"
          >
            Sign In to Account
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-xs text-center text-gray-500 mt-6">
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary-700 font-bold hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
