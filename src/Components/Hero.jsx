import { ShoppingBag, Zap } from 'lucide-react';

const Hero = () => (
  <section id="home" className="hero-bg min-h-[72vh] flex items-center justify-center text-center px-4 py-24">
    <div className="max-w-4xl mx-auto">
      <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-semibold mb-8">
        <Zap className="w-4 h-4 text-yellow-300" />Winter Sale — Up to 50% Off
      </span>
      <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
        Discover Amazing<br />
        <span className="bg-gradient-to-r from-yellow-300 via-emerald-300 to-blue-300 bg-clip-text text-transparent">Deals Today</span>
      </h1>
      <p className="text-lg md:text-xl text-white/80 max-w-xl mx-auto mb-10 font-medium">Fashion, electronics and home essentials — curated just for you.</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="#products" className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-50 active:scale-95 transition-all shadow-xl">
          <ShoppingBag className="w-5 h-5" />Shop Now
        </a>
        <a href="#contact" className="inline-flex items-center justify-center px-8 py-4 rounded-2xl font-semibold text-lg border-2 border-white/50 text-white hover:bg-white/10 transition-all">
          Contact Us
        </a>
      </div>
    </div>
  </section>
);
export default Hero;
