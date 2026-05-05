import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Eye, EyeOff } from 'lucide-react';
import { useApp } from '../context/AppContext';

const LoginPage = () => {
  const { loginUser, showToast } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const saved = JSON.parse(localStorage.getItem('registered_user') || 'null');
    if (saved && saved.email === email && saved.password === password) {
      loginUser(saved);
      showToast(`Welcome back, ${saved.name}! ✅`);
      navigate('/');
    } else {
      showToast('Invalid credentials. Please sign up first.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-emerald-50 px-4 pt-20">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-blue-500 rounded-2xl flex items-center justify-center"><LogIn className="w-5 h-5 text-white" /></div>
          <div><h1 className="text-xl font-bold text-gray-900">Welcome back</h1><p className="text-xs text-gray-400">Sign in to your account</p></div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com" className="input" />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Password</label>
            <div className="relative">
              <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required placeholder="Password" className="input pr-10" />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <button type="submit" className="btn w-full py-3 rounded-2xl mt-2 text-base flex justify-center">Sign In</button>
        </form>
        <p className="text-sm text-center text-gray-500 mt-6">Don't have an account? <Link to="/signup" className="text-blue-500 font-semibold hover:underline">Create one</Link></p>
      </div>
    </div>
  );
};
export default LoginPage;
