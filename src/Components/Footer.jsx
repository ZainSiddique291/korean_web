import { Link } from 'react-router-dom';
import { ShoppingBag, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => (
  <footer id="contact" className="bg-gray-900 text-gray-300 pt-14 pb-6 px-6 mt-16">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
      <div>
        <div className="flex items-center gap-2 text-white font-bold text-xl mb-3"><ShoppingBag className="w-6 h-6 text-blue-400" />MyShop</div>
        <p className="text-sm text-gray-400 leading-relaxed">Your trusted destination for quality, affordability, and effortless shopping.</p>
      </div>
      <div>
        <h3 className="text-white font-bold mb-4">Quick Links</h3>
        <div className="flex flex-col gap-2 text-sm">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <a href="#products" className="hover:text-white transition-colors">Products</a>
          <Link to="/cart" className="hover:text-white transition-colors">Cart</Link>
        </div>
      </div>
      <div>
        <h3 className="text-white font-bold mb-4">Contact</h3>
        <div className="flex flex-col gap-2 text-sm">
          <span className="flex items-center gap-2"><Mail className="w-4 h-4 text-blue-400" />myshop00031@gmail.com</span>
          <span className="flex items-center gap-2"><Phone className="w-4 h-4 text-blue-400" />+92 300 1234567</span>
          <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-blue-400" />University of Sargodha, Punjab</span>
        </div>
      </div>
      <div>
        <h3 className="text-white font-bold mb-4">Stay Updated</h3>
        <p className="text-sm text-gray-400 mb-3">Subscribe for latest deals and updates.</p>
        <div className="flex gap-2">
          <input type="email" placeholder="Your email" className="flex-1 px-3 py-2 rounded-xl bg-gray-800 border border-gray-700 text-sm text-gray-200 focus:outline-none focus:border-blue-500" />
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors active:scale-95">Join</button>
        </div>
      </div>
    </div>
    <div className="border-t border-gray-800 pt-6 text-center text-xs text-gray-500">© 2025 MyShop. All rights reserved.</div>
  </footer>
);
export default Footer;
