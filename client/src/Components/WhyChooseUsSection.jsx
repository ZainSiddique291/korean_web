import { Award, Leaf, Target, ShieldCheck, Sparkles, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

const WhyChooseUsSection = () => {
  const { t } = useApp();

  const reasons = [
    {
      title: t('whyCard1Title', 'Authentic Seoul Labs'),
      badge: t('whyCard1Badge', '100% Genuine'),
      description: t('whyCard1Desc', 'Direct supply chain from certified biotechnology laboratories in South Korea, adhering strictly to K-FDA standards.'),
      icon: Award,
      color: 'text-primary-700 bg-primary-50',
    },
    {
      title: t('whyCard2Title', 'Clean 5-Free Actives'),
      badge: t('whyCard2Badge', 'Non-Toxic'),
      description: t('whyCard2Desc', 'Zero parabens, artificial fragrances, harsh sulfates, drying alcohols, or synthetic dyes. Pure skin-first formulations.'),
      icon: Leaf,
      color: 'text-emerald-700 bg-emerald-50',
    },
    {
      title: t('whyCard3Title', 'Clinically Targeted Solutions'),
      badge: t('whyCard3Badge', 'Proven Potency'),
      description: t('whyCard3Desc', 'Optimized dermatological percentages—10% pure Niacinamide, BHA Salicylic Acid, and multi-molecular Hyaluronic Acid.'),
      icon: Target,
      color: 'text-brand-700 bg-brand-50',
    },
    {
      title: t('whyCard4Title', 'Restores Skin Barrier'),
      badge: t('whyCard4Badge', 'Barrier Safe'),
      description: t('whyCard4Desc', 'We prioritize acid-mantle health. Our serums nourish lipid bilayers so your skin resists pollution and irritation naturally.'),
      icon: ShieldCheck,
      color: 'text-sky-700 bg-sky-50',
    },
    {
      title: t('whyCard5Title', 'Fast-Absorbing Texture'),
      badge: t('whyCard5Badge', 'Zero Residue'),
      description: t('whyCard5Desc', 'Ultra-lightweight aqueous suspensions that sink in within 30 seconds with no greasy film or pore-clogging heaviness.'),
      icon: Sparkles,
      color: 'text-amber-700 bg-amber-50',
    },
    {
      title: t('whyCard6Title', 'Cash on Delivery & Care'),
      badge: t('whyCard6Badge', 'Pakistan-Wide'),
      description: t('whyCard6Desc', 'Peace of mind with verified Cash on Delivery across Pakistan, fast tracking, and dedicated K-beauty consultation.'),
      icon: HeartHandshake,
      color: 'text-rose-700 bg-rose-50',
    },
  ];

  return (
    <section id="why-choose-us" className="py-14 sm:py-20 bg-surface-50 border-b border-surface-200 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-primary-100 text-primary-800 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-3.5 shadow-2xs">
            <Sparkles className="w-4 h-4 text-brand-600" />
            {t('whyBadge', 'The SEORA Distinction')}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-kdark-900 font-serif mb-3.5 tracking-tight">
            {t('whyTitle', 'Why Choose SEORA Korean Skincare?')}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            {t('whySubtitle', 'Formulated in Korea for high efficacy and gentle daily performance. Here is what makes our face serum range trusted by thousands of customers.')}
          </p>
        </div>

        {/* 6 Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r) => {
            const Icon = r.icon;
            return (
              <div
                key={r.title}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-surface-200/90 shadow-xs hover:border-primary-400 hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${r.color} shadow-2xs group-hover:scale-105 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-surface-100 text-kdark-700 border border-surface-200">
                      {r.badge}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-kdark-900 mb-2 font-serif">
                    {r.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {r.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-surface-100 flex items-center gap-1.5 text-xs text-primary-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-primary-600" />
                  <span>{t('dermApproved', 'Dermatologically Validated')}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
