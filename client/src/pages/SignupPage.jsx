import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Sparkles, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

const SignupPage = () => {
  const { registerUser, continueWithGoogle, continueAsGuest, showToast } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', address: '' });
  const [loading, setLoading] = useState(false);

  const set = (f) => (e) => setForm((p) => ({ ...p, [f]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      showToast('Please fill in your name, email, and password');
      return;
    }
    setLoading(true);
    try {
      await registerUser(form);
      navigate('/account');
    } catch {
      // Toast error handled in registerUser
    } finally {
      setLoading(false);
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
            <UserPlus className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-kdark-900 font-serif">Create Account</h1>
            <p className="text-xs text-gray-500">Join the SEORA Korean Skincare community</p>
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
            Sign Up with Google
          </button>

          <button
            type="button"
            onClick={handleGuest}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-dashed border-primary-300 bg-primary-50/60 hover:bg-primary-50 text-primary-700 text-xs font-semibold transition-all"
          >
            <Sparkles className="w-4 h-4 text-primary-600" />
            Continue as Guest (Skip Account Creation)
          </button>
        </div>

        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-surface-200 w-full" />
          <span className="bg-white px-3 text-[10px] uppercase tracking-wider text-gray-400 absolute">or sign up with form</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-semibold text-kdark-700 mb-1">Full Name *</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={set('name')}
              placeholder="e.g. Fatima Zahra"
              className="input-field"
            />
          </div>

          <div>
            <label className="block font-semibold text-kdark-700 mb-1">Email Address *</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={set('email')}
              placeholder="name@example.com"
              className="input-field"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-kdark-700 mb-1">Password *</label>
              <input
                type="password"
                required
                value={form.password}
                onChange={set('password')}
                placeholder="••••••••"
                className="input-field"
              />
            </div>
            <div>
              <label className="block font-semibold text-kdark-700 mb-1">Phone Number</label>
              <input
                type="tel"
                value={form.phone}
                onChange={set('phone')}
                placeholder="+92 300 1234567"
                className="input-field"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-kdark-700 mb-1">Shipping Address</label>
            <textarea
              rows={2}
              value={form.address}
              onChange={set('address')}
              placeholder="Street, City, Postal Code"
              className="input-field resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3 text-xs font-semibold flex items-center justify-center gap-2 mt-4 disabled:opacity-60"
          >
            {loading ? 'Creating Account...' : 'Create My Account'}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        <p className="text-xs text-center text-gray-500 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-700 font-bold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
