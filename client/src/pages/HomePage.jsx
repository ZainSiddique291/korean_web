import Hero from '../Components/Hero';
import Filters from '../Components/Filters';
import Products from '../Components/Products';
import WhoIsItForSection from '../Components/WhoIsItForSection';
import HowToUseSection from '../Components/HowToUseSection';
import WhyChooseUsSection from '../Components/WhyChooseUsSection';
import ContactSection from '../Components/ContactSection';
import { Sparkles } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="bg-surface-50">
      {/* 1. Hero Section with high-resolution SEORA banner & value props */}
      <Hero />

      {/* 2. Main SEORA Face Serum Range */}
      <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 scroll-mt-16">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-primary-100 text-primary-800 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-3.5 shadow-2xs">
            <Sparkles className="w-4 h-4 text-brand-600" />
            Made in Korea • 30ml Concentrates
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-kdark-900 font-serif mb-3 tracking-tight">
            The SEORA Face Serum Collection
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Formulated in Korea with targeted active dermatological concentrations. Clean 5-Free botanical science designed to restore the skin barrier, clear pores, and reveal your natural glass-skin glow.
          </p>
        </div>

        {/* Filter Pills with proper horizontal padding & spacing */}
        <div className="mb-8">
          <Filters />
        </div>

        {/* Product Grid */}
        <Products />
      </section>

      {/* 3. Who's It For? (Skin Type & Target Matching) */}
      <WhoIsItForSection />

      {/* 4. How to Use (Step-by-Step 5-Step Korean Application Ritual) */}
      <HowToUseSection />

      {/* 5. Why Choose Us? (Authentic Seoul Labs, Clean Actives, Barrier Health) */}
      <WhyChooseUsSection />

      {/* 6. Contact Us Form Section */}
      <ContactSection id="contact" />
    </div>
  );
};

export default HomePage;
