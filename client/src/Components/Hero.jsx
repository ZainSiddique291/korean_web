import { HashLink } from 'react-router-hash-link';
import { Sparkles, ShieldCheck, Truck, Banknote, Award } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative bg-[#FAF3EB] border-b border-surface-200">
      {/* Main Hero Banner Container */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 pt-3 sm:pt-6 pb-4 sm:pb-8">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm border border-[#ede3d8] bg-[#FAF3EB]">
          {/* Hero Banner Image */}
          <picture className="w-full block">
            <img
              src="/hero-banner.png"
              alt="SEORA K-Beauty Skin Solution - Clear, Glowing Skin Starts Here"
              className="w-full h-auto object-contain max-h-[580px] mx-auto select-none"
              loading="eager"
            />
          </picture>

          {/* Invisible / Interactive Link Layer for Shop Now Button */}
          <HashLink
            smooth
            to="/#products"
            className="absolute inset-0 z-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-3xl"
            aria-label="Shop Korean Skincare Collection"
          >
            <span className="sr-only">Shop Now</span>
          </HashLink>
        </div>

        {/* Korean Skincare Trust & Value Props Strip (Inspired by reference site) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-4 sm:mt-6">
          <div className="flex items-center gap-3 p-3 sm:p-4 rounded-2xl bg-white border border-surface-200/80 shadow-xs">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-kdark-900 leading-snug">100% Original</h4>
              <p className="text-[11px] text-gray-500 hidden sm:block">Direct from official Seoul labs</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 sm:p-4 rounded-2xl bg-white border border-surface-200/80 shadow-xs">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-50 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5 text-brand-600" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-kdark-900 leading-snug">Express Delivery</h4>
              <p className="text-[11px] text-gray-500 hidden sm:block">Fast shipping nationwide</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 sm:p-4 rounded-2xl bg-white border border-surface-200/80 shadow-xs">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-sage-50 flex items-center justify-center shrink-0">
              <Banknote className="w-5 h-5 text-sage-600" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-kdark-900 leading-snug">COD Available</h4>
              <p className="text-[11px] text-gray-500 hidden sm:block">Pay securely on delivery</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 sm:p-4 rounded-2xl bg-white border border-surface-200/80 shadow-xs">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-kdark-900 leading-snug">Korean Science</h4>
              <p className="text-[11px] text-gray-500 hidden sm:block">Gentle & clinically proven</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
