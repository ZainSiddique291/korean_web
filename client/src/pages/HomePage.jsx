import Hero from '../Components/Hero';
import Filters from '../Components/Filters';
import Products from '../Components/Products';
import { Sparkles, Droplets, SunMedium, ShieldCheck, Heart } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="bg-surface-50">
      {/* 1. Hero Section with official SEORA banner */}
      <Hero />

      {/* 2. Main SEORA Face Serum Range */}
      <section id="products" className="max-w-7xl mx-auto px-4 py-12 sm:py-16 scroll-mt-16">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary-100 text-primary-800 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-3">
            <Sparkles className="w-4 h-4 text-brand-600" />
            Made in Korea • 30ml
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-kdark-900 font-serif mb-3 tracking-tight">
            The SEORA Face Serum Collection
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Formulated in Korea with targeted active dermatological concentrations. Clean 5-Free botanical science designed to restore the skin barrier, clear pores, and reveal your natural glass-skin glow.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="mb-8">
          <Filters />
        </div>

        {/* Product Grid */}
        <Products />
      </section>

      {/* 3. 4-Step Korean Skincare Ritual */}
      <section className="bg-white border-y border-surface-200 py-14 sm:py-18 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-kdark-900 font-serif mb-2.5">
              The 4-Step Glass Skin Ritual
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              Layering philosophy perfected in Korean dermatology for long-lasting barrier resilience and luminous glow.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-surface-50 border border-surface-200">
              <span className="text-xs font-bold text-brand-600 uppercase tracking-widest block mb-2">Step 01</span>
              <div className="w-11 h-11 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center mb-3.5">
                <Droplets className="w-5.5 h-5.5" />
              </div>
              <h4 className="text-base font-bold text-kdark-900 mb-1.5">Double Cleanse</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Remove makeup, excess sebum, and daily micro-dust with a gentle subacidic wash.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface-50 border border-surface-200">
              <span className="text-xs font-bold text-brand-600 uppercase tracking-widest block mb-2">Step 02</span>
              <div className="w-11 h-11 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center mb-3.5">
                <Sparkles className="w-5.5 h-5.5" />
              </div>
              <h4 className="text-base font-bold text-kdark-900 mb-1.5">Hydrate & Prep</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Balance epidermal pH and replenish cellular moisture so serums absorb deeply.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface-50 border border-surface-200">
              <span className="text-xs font-bold text-brand-600 uppercase tracking-widest block mb-2">Step 03</span>
              <div className="w-11 h-11 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center mb-3.5">
                <Heart className="w-5.5 h-5.5" />
              </div>
              <h4 className="text-base font-bold text-kdark-900 mb-1.5">Targeted SEORA Serum</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Apply 2~3 drops of your customized SEORA serum (Anti-Acne, Glass Skin, Moisture X Firmness, or Vitamin C).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface-50 border border-surface-200">
              <span className="text-xs font-bold text-brand-600 uppercase tracking-widest block mb-2">Step 04</span>
              <div className="w-11 h-11 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center mb-3.5">
                <SunMedium className="w-5.5 h-5.5" />
              </div>
              <h4 className="text-base font-bold text-kdark-900 mb-1.5">Lock-in & Protect</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Seal with a moisturizing cream and finish with broad-spectrum SPF every morning.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
