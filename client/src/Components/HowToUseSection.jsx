import { Droplets, Pipette, Sparkles, ShieldCheck, CheckCircle2, Lightbulb, Clock, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

const HowToUseSection = () => {
  const { t } = useApp();

  const steps = [
    {
      step: '01',
      title: t('step1Title', 'Cleanse & Prep'),
      subtitle: t('step1Sub', 'Prepare the canvas'),
      description: t(
        'step1Desc',
        'Start with a gentle, low-pH cleanser. Pat lightly with a clean towel, leaving skin slightly damp so active serums penetrate deeply.'
      ),
      icon: Droplets,
      badge: t('step1Badge', 'Clean Canvas'),
      timing: t('step1Time', 'Step 01 • Morning & Night'),
    },
    {
      step: '02',
      title: t('step2Title', 'Dispense & Dose'),
      subtitle: t('step2Sub', 'Targeted active measure'),
      description: t(
        'step2Desc',
        'Using the calibrated glass dropper, release 2 to 3 concentrated drops of your chosen SEORA serum directly onto cheeks and forehead.'
      ),
      icon: Pipette,
      badge: t('step2Badge', 'Precision Dose'),
      timing: t('step2Time', 'Step 02 • 2–3 Drops'),
    },
    {
      step: '03',
      title: t('step3Title', 'Press, Tap & Absorb'),
      subtitle: t('step3Sub', 'Micro-circulation & penetration'),
      description: t(
        'step3Desc',
        'Smooth outwards in gentle circular motions. Tap softly with warm fingertips and allow 30–60 seconds for active botanicals to fully absorb.'
      ),
      icon: Sparkles,
      badge: t('step3Badge', 'Dermal Absorption'),
      timing: t('step3Time', 'Step 03 • 60s Absorption'),
    },
    {
      step: '04',
      title: t('step4Title', 'Lock In & Shield'),
      subtitle: t('step4Sub', 'Seal & protect barrier'),
      description: t(
        'step4Desc',
        'Seal in hydration with your daily barrier cream. In the morning, always complete your ritual with broad-spectrum SPF 50+ to protect actives.'
      ),
      icon: ShieldCheck,
      badge: t('step4Badge', 'Barrier Seal'),
      timing: t('step4Time', 'Step 04 • All-Day Shield'),
    },
  ];

  return (
    <section id="how-to-use" className="py-14 sm:py-20 bg-white border-b border-surface-200 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-primary-100 text-primary-800 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-3.5 shadow-2xs">
            <Sparkles className="w-4 h-4 text-brand-600" />
            {t('howBadge', 'The 4-Step Glass-Skin Ritual')}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-kdark-900 font-serif mb-3.5 tracking-tight">
            {t('howTitle', 'How to Use Your SEORA Serums')}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            {t(
              'howSubtitle',
              'Korean skincare philosophy relies on gentle layering and deliberate micro-absorption. Follow this effortless 4-step ritual morning and night for peak glass-skin radiance.'
            )}
          </p>
        </div>

        {/* 4-Step Cards Grid with Subtle Connecting Progression */}
        <div className="relative">
          {/* Subtle Desktop Connector Line */}
          <div className="hidden lg:block absolute top-[52px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-primary-200 via-brand-200 to-primary-200 -z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {steps.map((s, index) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.step}
                  className="bg-surface-50 hover:bg-white rounded-3xl p-6 sm:p-7 border border-surface-200/90 hover:border-primary-400 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group relative"
                >
                  <div>
                    {/* Top Step Number & Badge */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-10 h-10 rounded-2xl bg-white group-hover:bg-primary-600 text-primary-800 group-hover:text-white font-serif font-bold text-sm flex items-center justify-center border border-surface-200 group-hover:border-primary-600 shadow-xs transition-colors duration-300">
                        {s.step}
                      </div>
                      <span className="text-[11px] font-semibold text-primary-800 bg-primary-100/70 group-hover:bg-primary-100 px-3 py-1 rounded-full border border-primary-200/60 shadow-2xs">
                        {s.badge}
                      </span>
                    </div>

                    {/* Attractive Icon Box */}
                    <div className="w-14 h-14 rounded-2xl bg-white border border-surface-200/80 text-primary-700 flex items-center justify-center mb-5 group-hover:scale-105 group-hover:border-primary-300 group-hover:shadow-sm transition-all duration-300">
                      <Icon className="w-7 h-7 text-primary-600" />
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="text-lg sm:text-xl font-bold text-kdark-900 mb-1 font-serif group-hover:text-primary-700 transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-xs font-semibold text-brand-600 uppercase tracking-wider mb-3">
                      {s.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {s.description}
                    </p>
                  </div>

                  {/* Timing & Approval Footer */}
                  <div className="mt-6 pt-4 border-t border-surface-200/80 flex items-center justify-between text-[11px] text-gray-500 font-medium">
                    <span className="flex items-center gap-1.5 text-primary-700 font-semibold">
                      <Clock className="w-3.5 h-3.5 text-brand-600" />
                      <span>{s.timing}</span>
                    </span>
                    <span className="flex items-center gap-1 text-emerald-600">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Approved</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dermatologist Layering Pro-Tip */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-primary-50/90 via-surface-50 to-primary-50/70 border border-primary-200/80 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-primary-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Lightbulb className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="text-base sm:text-lg font-bold text-primary-900 font-serif mb-1.5 flex items-center gap-2">
              <span>{t('layeringTipTitle', 'Seoul Dermatology Layering Rule:')}</span>
            </h4>
            <p className="text-xs sm:text-sm text-primary-800/90 leading-relaxed">
              {t(
                'layeringTipDesc',
                'If pairing multiple SEORA serums (e.g. Vitamin C and Moisture X Firmness), always apply from the thinnest aqueous texture to the richest. For morning routines, Vitamin C followed by SPF is the ultimate antioxidant shield; at night, layer Niacinamide or Anti-Acne with Moisture Firmness for overnight barrier repair.'
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToUseSection;
