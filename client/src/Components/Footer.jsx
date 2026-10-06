import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { ShieldCheck, Mail, Phone, MapPin, Truck, Award, Sparkles } from 'lucide-react';

const Footer = () => (
  <footer id="contact" className="bg-kdark-900 text-gray-300 pt-16 pb-8 px-4 sm:px-6 border-t border-surface-200">
    <div className="max-w-7xl mx-auto">
      {/* 4 Pillars Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 mb-12 border-b border-kdark-700/80 text-xs">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-white mb-0.5">100% Original Seoul Formulations</h4>
            <p className="text-gray-400 text-[11px]">Direct brand chain of custody from South Korea</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Truck className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-white mb-0.5">Express Delivery Nationwide</h4>
            <p className="text-gray-400 text-[11px]">2-4 business days express courier tracking</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Award className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-white mb-0.5">Cash on Delivery & JazzCash</h4>
            <p className="text-gray-400 text-[11px]">Multiple convenient payment options</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-white mb-0.5">Skin Barrier Consultation</h4>
            <p className="text-gray-400 text-[11px]">Dedicated K-beauty skincare guidance</p>
          </div>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        {/* Brand Overview */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-8 rounded-lg bg-primary-600 text-white flex items-center justify-center font-bold text-sm">
              S
            </span>
            <span className="text-xl font-bold text-white font-serif tracking-wider">
              SEORA
            </span>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed mb-4">
            Pakistan’s premier source for authentic Korean skincare. We bridge Seoul’s most celebrated cosmetic labs with your daily skincare routine.
          </p>
          <div className="flex items-center gap-2 text-xs text-primary-300 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>K-FDA & Dermatologist Approved</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-serif font-bold text-sm mb-4 tracking-wide uppercase">
            Quick Navigation
          </h3>
          <div className="flex flex-col gap-2.5 text-xs text-gray-400">
            <Link to="/" className="hover:text-brand-300 transition-colors">
              Home Page
            </Link>
            <HashLink smooth to="/#products" className="hover:text-brand-300 transition-colors">
              Korean Skincare Catalog
            </HashLink>
            <Link to="/cart" className="hover:text-brand-300 transition-colors">
              Shopping Bag
            </Link>
            <Link to="/account" className="hover:text-brand-300 transition-colors">
              Customer Account & Orders
            </Link>
            <Link to="/admin" className="hover:text-brand-300 transition-colors text-primary-300">
              Admin Portal
            </Link>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-serif font-bold text-sm mb-4 tracking-wide uppercase">
            Customer Care
          </h3>
          <div className="flex flex-col gap-3 text-xs text-gray-400">
            <span className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-brand-400 shrink-0" />
              <span>care@seora-skincare.pk</span>
            </span>
            <span className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-brand-400 shrink-0" />
              <span>+92 300 1234567 (Mon-Sat, 9am - 9pm)</span>
            </span>
            <span className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-brand-400 shrink-0" />
              <span>Gulberg III, Lahore / Seoul Logistics Hub</span>
            </span>
          </div>
        </div>

        {/* Newsletter & Payment Methods */}
        <div>
          <h3 className="text-white font-serif font-bold text-sm mb-3 tracking-wide uppercase">
            Payment Methods
          </h3>
          <p className="text-xs text-gray-400 mb-3">
            We accept trusted and verified payment solutions across Pakistan:
          </p>
          <div className="flex flex-wrap gap-2 text-[11px] font-semibold text-gray-300 mb-6">
            <span className="bg-kdark-800 px-3 py-1.5 rounded-lg border border-kdark-700">Cash on Delivery (COD)</span>
            <span className="bg-kdark-800 px-3 py-1.5 rounded-lg border border-kdark-700">JazzCash</span>
            <span className="bg-kdark-800 px-3 py-1.5 rounded-lg border border-kdark-700">Bank Transfer</span>
          </div>

          <h4 className="text-xs font-bold text-white mb-2">Join the K-Beauty Club</h4>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-3 py-2 rounded-xl bg-kdark-800 border border-kdark-700 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-500"
            />
            <button className="bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-xl text-xs font-semibold transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Legal / Copyright */}
      <div className="pt-6 border-t border-kdark-700/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
        <div>© 2026 SEORA K-Beauty Solutions. All rights reserved.</div>
        <div className="flex items-center gap-4 text-[11px]">
          <span>Privacy Policy</span>
          <span>•</span>
          <span>Terms of Service</span>
          <span>•</span>
          <span>COD Policy</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
