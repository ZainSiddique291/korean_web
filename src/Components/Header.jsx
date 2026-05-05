import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { ShoppingBag, ShoppingCart, User, Menu, X, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Header = () => {
  const { login, user, logout, itemCount, setSearchTerm } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => { setSearchTerm(e.target.value); if (window.location.pathname !== '/') navigate('/'); };
  const handleLogout = () => { logout(); setDropOpen(false); navigate('/'); };

  return (
    <header className="glass fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-blue-500 to-emerald-500 bg-clip-text text-transparent shrink-0">
          <ShoppingBag className="w-7 h-7 text-blue-500" />MyShop
        </Link>
        <div className="flex-1 hidden md:flex items-center bg-gray-100 rounded-xl px-3 py-2 gap-2 mx-4">
          <Search className="w-4 h-4 text-gray-400 shrink-0" />
          <input onChange={handleSearch} placeholder="Search products..." className="bg-transparent flex-1 text-sm outline-none text-gray-700 placeholder-gray-400" />
        </div>
        <nav className="hidden md:flex items-center gap-5 mr-2">
          <HashLink smooth to="/#home" className="text-sm font-medium text-gray-600 hover:text-blue-500 transition-colors">Home</HashLink>
          <HashLink smooth to="/#products" className="text-sm font-medium text-gray-600 hover:text-blue-500 transition-colors">Products</HashLink>
          <HashLink smooth to="#contact" className="text-sm font-medium text-gray-600 hover:text-blue-500 transition-colors">Contact</HashLink>
        </nav>
        <div className="flex items-center gap-1 ml-auto">
          <div className="relative">
            <button onClick={() => setDropOpen(!dropOpen)} className="flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-gray-100 transition-colors">
              <User className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700 hidden sm:block">{login ? user?.name?.split(' ')[0] : 'Account'}</span>
            </button>
            {dropOpen && (
              <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded-2xl shadow-2xl border border-gray-100 py-1 z-50">
                {login ? (
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 rounded-xl">Logout</button>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setDropOpen(false)} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl">Login</Link>
                    <Link to="/signup" onClick={() => setDropOpen(false)} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-xl">Sign Up</Link>
                  </>
                )}
              </div>
            )}
          </div>
          <button onClick={() => navigate('/cart')} className="relative p-2.5 rounded-xl hover:bg-gray-100 transition-colors">
            <ShoppingCart className="w-5 h-5 text-gray-600" />
            {itemCount > 0 && <span className="absolute -top-0.5 -right-0.5 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">{itemCount}</span>}
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2.5 rounded-xl hover:bg-gray-100 transition-colors">
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 flex flex-col gap-1">
          <div className="flex items-center bg-gray-100 rounded-xl px-3 py-2 gap-2 mb-2">
            <Search className="w-4 h-4 text-gray-400" />
            <input onChange={handleSearch} placeholder="Search products..." className="bg-transparent flex-1 text-sm outline-none" />
          </div>
          <Link to="/" onClick={() => setMenuOpen(false)} className="px-3 py-2 rounded-xl text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600">Home</Link>
          <HashLink smooth to="/#products" onClick={() => setMenuOpen(false)} className="px-3 py-2 rounded-xl text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600">Products</HashLink>
          <HashLink smooth to="#contact" onClick={() => setMenuOpen(false)} className="px-3 py-2 rounded-xl text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600">Contact</HashLink>
        </div>
      )}
    </header>
  );
};
export default Header;
