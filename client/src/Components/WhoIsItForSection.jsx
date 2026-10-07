import { HashLink } from 'react-router-hash-link';
import { Sparkles, Check, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

const WhoIsItForSection = () => {
  const { t } = useApp();

  const audiences = [
    {
      target: t('whoAcneTitle', 'Acne-Prone & Oily Skin'),
      bestFormula: t('whoAcneMatch', 'Ideal Match: Anti-Acne Solution (Green)'),
      concerns: [
        t('whoAcneConcern1', 'Clogged pores & excess oil'),
        t('whoAcneConcern2', 'Blackheads & whiteheads'),
        t('whoAcneConcern3', 'Frequent inflammation'),
      ],
      actives: t('whoAcneActives', 'Salicylic Acid (BHA) + Centella Asiatica + Tea Tree'),
      border: 'border-emerald-200 hover:border-emerald-500',
      accentBg: 'bg-emerald-50 text-emerald-800',
      tag: t('whoAcneTag', 'Purifying & Calming'),
    },
    {
      target: t('whoDullTitle', 'Dull & Hyperpigmented Skin'),
      bestFormula: t('whoDullMatch', 'Ideal Match: Glass Skin 10% Niacinamide (Blue)'),
      concerns: [
        t('whoDullConcern1', 'Post-acne dark marks'),
        t('whoDullConcern2', 'Sun discoloration'),
        t('whoDullConcern3', 'Lack of natural glass glow'),
      ],
      actives: t('whoDullActives', '10% High-Purity Niacinamide + Rice Ferment + Zinc'),
      border: 'border-sky-200 hover:border-sky-500',
      accentBg: 'bg-sky-50 text-sky-800',
      tag: t('whoDullTag', 'Radiance & Clarity'),
    },
    {
      target: t('whoDryTitle', 'Dry, Tight & Dehydrated Skin'),
      bestFormula: t('whoDryMatch', 'Ideal Match: Moisture X Firmness'),
      concerns: [
        t('whoDryConcern1', 'Flaky dry patches'),
        t('whoDryConcern2', 'Tight feeling after washing'),
        t('whoDryConcern3', 'Fine dehydration lines'),
      ],
      actives: t('whoDryActives', 'Multi-Molecular Hyaluronic Acid + Peptides + Ceramides'),
      border: 'border-rose-200 hover:border-rose-500',
      accentBg: 'bg-rose-50 text-rose-800',
      tag: t('whoDryTag', 'Deep Plumping'),
    },
    {
      target: t('whoTiredTitle', 'Tired Skin & Early Aging'),
      bestFormula: t('whoTiredMatch', 'Ideal Match: Vitamin C Brightening (Orange)'),
      concerns: [
        t('whoTiredConcern1', 'Environmental oxidative stress'),
        t('whoTiredConcern2', 'Loss of elasticity'),
        t('whoTiredConcern3', 'Tired, depleted tone'),
      ],
      actives: t('whoTiredActives', 'Pure Ethyl Ascorbic Acid + Ferulic Acid + Vitamin E'),
      border: 'border-amber-200 hover:border-amber-500',
      accentBg: 'bg-amber-50 text-amber-800',
      tag: t('whoTiredTag', 'Antioxidant Defense'),
    },
  ];

  return (
    <section id="who-is-it-for" className="py-14 sm:py-20 bg-white border-b border-surface-200 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-primary-100 text-primary-800 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-3.5 shadow-2xs">
            <Sparkles className="w-4 h-4 text-brand-600" />
            {t('whoBadge', 'Skin Type Matching')}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-kdark-900 font-serif mb-3.5 tracking-tight">
            {t('whoTitle', 'Who Is the SEORA Collection For?')}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            {t(
              'whoSubtitle',
              'Whether you are struggling with breakouts, uneven pigment, dehydration, or simply starting your K-beauty routine, find the formula precisely engineered for your skin goals.'
            )}
          </p>
        </div>

        {/* 4 Audience Persona Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {audiences.map((a) => (
            <div
              key={a.target}
              className={`bg-surface-50 rounded-3xl p-6 sm:p-7 border ${a.border} shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group`}
            >
              <div>
                <span className={`inline-block text-[11px] font-bold px-3 py-1 rounded-full ${a.accentBg} mb-3.5`}>
                  {a.tag}
                </span>

                <h3 className="text-lg sm:text-xl font-bold font-serif text-kdark-900 mb-1.5">
                  {a.target}
                </h3>

                <p className="text-xs font-semibold text-primary-700 mb-4 pb-3 border-b border-surface-200/80">
                  {a.bestFormula}
                </p>

                <div className="space-y-2 mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">
                    {t('commonConcerns', 'Common Concerns:')}
                  </span>
                  {a.concerns.map((c, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-gray-600">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{c}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-white p-3 rounded-2xl border border-surface-200/70 mb-4">
                  <span className="text-[11px] font-bold text-kdark-800 block mb-0.5">
                    {t('heroActives', 'Hero Actives:')}
                  </span>
                  <p className="text-xs text-gray-500">{a.actives}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-surface-200/80">
                <HashLink
                  smooth
                  to="/#products"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-white hover:bg-primary-600 text-kdark-800 hover:text-white border border-surface-200 hover:border-primary-600 font-semibold text-xs sm:text-sm transition-all shadow-2xs group-hover:bg-primary-600 group-hover:text-white"
                >
                  <span>{t('viewFormula', 'View This Formula')}</span>
                  <ArrowRight className="w-4 h-4" />
                </HashLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoIsItForSection;
