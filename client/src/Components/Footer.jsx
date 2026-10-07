import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { ShieldCheck, Mail, Phone, MapPin, Truck, Award, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Footer = () => {
  const { t } = useApp();

  return (
    <footer className="bg-kdark-900 text-gray-300 pt-16 pb-8 px-4 sm:px-6 border-t border-surface-200">
      <div className="max-w-7xl mx-auto">
        {/* 4 Pillars Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12 mb-12 border-b border-kdark-700/80">
          <div className="flex items-start gap-3.5">
            <ShieldCheck className="w-6 h-6 text-brand-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-white text-sm sm:text-base mb-1">{t('footerOriginalTitle', '100% Original Seoul Formulations')}</h4>
              <p className="text-gray-400 text-xs sm:text-sm">{t('footerOriginalSub', 'Direct brand chain of custody from South Korea')}</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <Truck className="w-6 h-6 text-brand-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-white text-sm sm:text-base mb-1">{t('footerExpressTitle', 'Express Delivery Nationwide')}</h4>
              <p className="text-gray-400 text-xs sm:text-sm">{t('footerExpressSub', '2-4 business days express courier tracking')}</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <Award className="w-6 h-6 text-brand-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-white text-sm sm:text-base mb-1">{t('footerPaymentTitle', 'Cash on Delivery & JazzCash')}</h4>
              <p className="text-gray-400 text-xs sm:text-sm">{t('footerPaymentSub', 'Multiple convenient payment options')}</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <Sparkles className="w-6 h-6 text-brand-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-white text-sm sm:text-base mb-1">{t('footerConsultTitle', 'Skin Barrier Consultation')}</h4>
              <p className="text-gray-400 text-xs sm:text-sm">{t('footerConsultSub', 'Dedicated K-beauty skincare guidance')}</p>
            </div>
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Overview */}
          <div>
            <div className="flex items-center gap-2.5 mb-3.5">
              <span className="w-9 h-9 rounded-xl bg-primary-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
                S
              </span>
              <span className="text-2xl font-bold text-white font-serif tracking-wider">
                SEORA
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              {t('footerBrandDesc', 'Pakistan’s premier source for authentic Korean skincare. We bridge Seoul’s most celebrated cosmetic labs with your daily skincare routine.')}
            </p>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-primary-300 font-medium">
              <ShieldCheck className="w-4.5 h-4.5 text-emerald-400" />
              <span>{t('footerKFDA', 'K-FDA & Dermatologist Approved')}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-serif font-bold text-base mb-4 tracking-wide uppercase">
              {t('footerQuickNav', 'Quick Navigation')}
            </h3>
            <div className="flex flex-col gap-3 text-sm text-gray-300">
              <Link to="/" className="hover:text-brand-300 transition-colors">
                {t('navHome', 'Home Page')}
              </Link>
              <HashLink smooth to="/#products" className="hover:text-brand-300 transition-colors">
                {t('footerCatalog', 'Korean Skincare Catalog')}
              </HashLink>
              <HashLink smooth to="/#how-to-use" className="hover:text-brand-300 transition-colors">
                {t('footerHowToUse', 'How to Use Serums')}
              </HashLink>
              <HashLink smooth to="/#why-choose-us" className="hover:text-brand-300 transition-colors">
                {t('footerWhyUs', 'Why Choose SEORA')}
              </HashLink>
              <Link to="/contact" className="hover:text-brand-300 transition-colors">
                {t('footerContactForm', 'Contact & Support Form')}
              </Link>
              <Link to="/cart" className="hover:text-brand-300 transition-colors">
                {t('shoppingBag', 'Shopping Bag')}
              </Link>
              <Link to="/account" className="hover:text-brand-300 transition-colors">
                {t('customerAccount', 'Customer Account & Orders')}
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-serif font-bold text-base mb-4 tracking-wide uppercase">
              {t('footerCustomerCare', 'Customer Care')}
            </h3>
            <div className="flex flex-col gap-3 text-sm text-gray-300 mb-4">
              <span className="flex items-center gap-2.5">
                <Mail className="w-4.5 h-4.5 text-brand-400 shrink-0" />
                <span>care@seora-skincare.pk</span>
              </span>
              <span className="flex items-center gap-2.5">
                <Phone className="w-4.5 h-4.5 text-brand-400 shrink-0" />
                <span>+92 300 1234567 (Mon-Sat, 9am - 9pm)</span>
              </span>
              <span className="flex items-center gap-2.5">
                <MapPin className="w-4.5 h-4.5 text-brand-400 shrink-0" />
                <span>Gulberg III, Lahore / Seoul Logistics Hub</span>
              </span>
            </div>

            {/* Prominent Contact Us Button */}
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-primary-600 hover:bg-primary-500 text-white font-semibold text-xs sm:text-sm transition-all shadow-sm active:scale-95 border border-primary-500/40"
            >
              <Mail className="w-4 h-4" />
              <span>{t('openContactBtn', 'Open Contact Us Form →')}</span>
            </Link>
          </div>

          {/* Newsletter & Payment Methods */}
          <div>
            <h3 className="text-white font-serif font-bold text-base mb-3.5 tracking-wide uppercase">
              {t('footerPaymentMethods', 'Payment Methods')}
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 mb-3.5">
              {t('footerPaymentSubText', 'We accept trusted and verified payment solutions across Pakistan:')}
            </p>
            <div className="flex flex-wrap gap-2 text-xs font-semibold text-gray-200 mb-6">
              <span className="bg-kdark-800 px-3.5 py-1.5 rounded-lg border border-kdark-700">Cash on Delivery (COD)</span>
              <span className="bg-kdark-800 px-3.5 py-1.5 rounded-lg border border-kdark-700">JazzCash</span>
              <span className="bg-kdark-800 px-3.5 py-1.5 rounded-lg border border-kdark-700">Bank Transfer</span>
            </div>

            <h4 className="text-xs sm:text-sm font-bold text-white mb-2">{t('footerJoinClub', 'Join the K-Beauty Club')}</h4>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-kdark-800 border border-kdark-700 text-xs sm:text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-500"
              />
              <button className="bg-brand-500 hover:bg-brand-600 text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors">
                {t('footerSubscribe', 'Subscribe')}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Legal / Copyright */}
        <div className="pt-6 border-t border-kdark-700/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-gray-400">
          <div>{t('footerCopyright', '© 2026 SEORA K-Beauty Solutions. All rights reserved.')}</div>
          <div className="flex items-center gap-4 text-xs">
            <span>{t('footerPrivacy', 'Privacy Policy')}</span>
            <span>•</span>
            <span>{t('footerTerms', 'Terms of Service')}</span>
            <span>•</span>
            <span>{t('footerCodPolicy', 'COD Policy')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
