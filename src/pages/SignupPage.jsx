import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { useApp } from '../context/AppContext';

const SignupPage = () => {
  const { showToast } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:'', email:'', password:'', phone:'', address:'' });
  const set = (f) => (e) => setForm(p => ({ ...p, [f]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('registered_user', JSON.stringify(form));
    showToast('Account created! Please log in ✅');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-blue-50 px-4 pt-20 pb-10">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-emerald-500 rounded-2xl flex items-center justify-center"><UserPlus className="w-5 h-5 text-white" /></div>
          <div><h1 className="text-xl font-bold text-gray-900">Create Account</h1><p className="text-xs text-gray-400">Join MyShop today</p></div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {[['Full Name','name','text','John Doe'],['Email','email','email','you@example.com'],['Password','password','password','••••••••'],['Phone','phone','text','+92 300 1234567']].map(([label,field,type,ph]) => (
            <div key={field}>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">{label}</label>
              <input type={type} value={form[field]} onChange={set(field)} required placeholder={ph} className="input" />
            </div>
          ))}
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Address</label>
            <textarea value={form.address} onChange={set('address')} required placeholder="Street, City, Province" rows={2} className="input resize-none" />
          </div>
          <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-2xl font-bold mt-2 active:scale-95 transition-all shadow-md text-base">Create Account</button>
        </form>
        <p className="text-sm text-center text-gray-500 mt-6">Already have an account? <Link to="/login" className="text-blue-500 font-semibold hover:underline">Sign in</Link></p>
      </div>
    </div>
  );
};
export default SignupPage;
