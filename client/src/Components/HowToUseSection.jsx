import { Droplets, Sparkles, Hand, Clock, ShieldCheck, CheckCircle2, Lightbulb } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    title: 'Cleanse Thoroughly',
    subtitle: 'Prepare the canvas',
    description: 'Start with a gentle, low-pH cleanser. Pat face lightly with a clean towel, leaving skin slightly damp for optimal absorption.',
    icon: Droplets,
    badge: 'Clean Canvas',
  },
  {
    step: '02',
    title: 'Dispense 2–3 Drops',
    subtitle: 'Targeted dose',
    description: 'Using the calibrated glass dropper, release 2 to 3 drops of your chosen SEORA active serum directly onto cheeks and forehead.',
    icon: Sparkles,
    badge: 'Precision Dose',
  },
  {
    step: '03',
    title: 'Gently Press & Massage',
    subtitle: 'Micro-circulation',
    description: 'Smooth gently across face and neck using upward, circular motions. Lightly tap with fingertips to stimulate lymphatic circulation.',
    icon: Hand,
    badge: 'Gentle Press',
  },
  {
    step: '04',
    title: 'Allow to Absorb',
    subtitle: '60-second rule',
    description: 'Wait 30–60 seconds for the Korean bioactive peptides and botanical actives to fully penetrate cellular lipid layers.',
    icon: Clock,
    badge: 'Dermal Penetration',
  },
  {
    step: '05',
    title: 'Lock In with SPF',
    subtitle: 'Seal & protect',
    description: 'Follow with your daily moisturizer to seal in hydration. In the morning, always complete your ritual with broad-spectrum SPF 50+.',
    icon: ShieldCheck,
    badge: 'Barrier Seal',
  },
];

const HowToUseSection = () => {
  return (
    <section id="how-to-use" className="py-14 sm:py-20 bg-white border-b border-surface-200 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-primary-100 text-primary-800 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-3.5 shadow-2xs">
            <Sparkles className="w-4 h-4 text-brand-600" />
            Simple 5-Step Routine
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-kdark-900 font-serif mb-3.5 tracking-tight">
            How to Use Your SEORA Serums
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Korean skincare philosophy relies on gentle layering and deliberate micro-absorption. Follow this effortless ritual morning and night for peak glass-skin radiance.
          </p>
        </div>

        {/* 5-Step Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6">
          {STEPS.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="relative bg-surface-50 rounded-3xl p-6 sm:p-7 border border-surface-200/90 shadow-xs flex flex-col justify-between hover:border-primary-400 hover:shadow-md transition-all duration-200 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-9 h-9 rounded-xl bg-primary-600 text-white font-mono font-bold text-sm flex items-center justify-center shadow-xs">
                      {s.step}
                    </span>
                    <span className="text-[11px] font-semibold text-primary-800 bg-primary-50 px-2.5 py-1 rounded-full border border-primary-100">
                      {s.badge}
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-white border border-surface-200 text-primary-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-2xs">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-kdark-900 mb-1 leading-snug">
                    {s.title}
                  </h3>
                  <p className="text-xs font-medium text-brand-600 mb-2">
                    {s.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {s.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-surface-200/70 flex items-center gap-1.5 text-[11px] text-gray-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>K-Derm Approved</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dermatologist Layering Pro-Tip */}
        <div className="mt-10 sm:mt-14 p-5 sm:p-7 rounded-3xl bg-primary-50/70 border border-primary-200/80 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 shadow-2xs">
          <div className="w-12 h-12 rounded-2xl bg-primary-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h4 className="text-base font-bold text-primary-900 mb-1">
              Seoul Dermatology Layering Rule:
            </h4>
            <p className="text-xs sm:text-sm text-primary-800/90 leading-relaxed">
              If pairing multiple SEORA serums (e.g. Vitamin C and Moisture X Firmness), always apply from the <strong>thinnest aqueous texture to the richest</strong>. For morning routines, Vitamin C followed by SPF is the ultimate antioxidant shield; at night, layer Niacinamide or Anti-Acne with Moisture Firmness for overnight barrier repair.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToUseSection;
