import Hero from '../Components/Hero';
import Filters from '../Components/Filters';
import Products from '../Components/Products';
import { Sparkles, Droplets, SunMedium, ShieldCheck, Heart } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="bg-surface-50">
      {/* 1. Hero Section with provided banner */}
      <Hero />

      {/* 2. Main Product Catalog */}
      <section id="products" className="max-w-7xl mx-auto px-4 py-12 sm:py-16 scroll-mt-16">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-100 text-primary-800 text-xs font-semibold tracking-wide uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            Direct from Seoul
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-kdark-900 font-serif mb-3 tracking-tight">
            Curated Skincare & Essentials
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            Discover gentle, science-backed formulas designed to strengthen the skin barrier, restore hydration, and reveal a natural, healthy glow.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="mb-8">
          <Filters />
        </div>

        {/* Product Grid */}
        <Products />
      </section>

      {/* 3. 4-Step Korean Skincare Ritual (Educational section inspired by K-Beauty reference) */}
      <section className="bg-white border-y border-surface-200 py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="text-xl sm:text-2xl font-bold text-kdark-900 font-serif mb-2">
              The 4-Step Glass Skin Ritual
            </h3>
            <p className="text-xs sm:text-sm text-gray-500">
              Layering philosophy perfected in Korean dermatology for long-lasting barrier resilience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-surface-50 border border-surface-200">
              <span className="text-xs font-bold text-brand-600 uppercase tracking-widest block mb-2">Step 01</span>
              <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center mb-3">
                <Droplets className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-kdark-900 mb-1">Double Cleanse</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Remove pollutants, sunscreen, and excess sebum without stripping natural moisture.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-surface-50 border border-surface-200">
              <span className="text-xs font-bold text-brand-600 uppercase tracking-widest block mb-2">Step 02</span>
              <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center mb-3">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-kdark-900 mb-1">Hydrate & Tone</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Balances optimal skin pH and preps the lipid matrix to absorb active serums deeper.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-surface-50 border border-surface-200">
              <span className="text-xs font-bold text-brand-600 uppercase tracking-widest block mb-2">Step 03</span>
              <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center mb-3">
                <Heart className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-kdark-900 mb-1">Targeted Serums</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Address acne, hyperpigmentation, or dullness with Centella, Niacinamide & Snail Mucin.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-surface-50 border border-surface-200">
              <span className="text-xs font-bold text-brand-600 uppercase tracking-widest block mb-2">Step 04</span>
              <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center mb-3">
                <SunMedium className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-kdark-900 mb-1">Moisturize & SPF</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Lock in cellular moisture with ceramides and defend against photoaging every morning.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
