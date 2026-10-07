import { Link } from 'react-router-dom';
import ContactSection from '../Components/ContactSection';
import { ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

const ContactPage = () => {
  const { t } = useApp();

  return (
    <div className="bg-surface-50 min-h-screen">
      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-surface-200 py-3.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs sm:text-sm text-gray-500">
          <Link to="/" className="hover:text-primary-600 transition-colors">
            {t('navHome', 'Home')}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-kdark-900 font-semibold">{t('contactBreadcrumb', 'Contact & Skincare Support')}</span>
        </div>
      </div>

      <ContactSection id="contact-page" />
    </div>
  );
};

export default ContactPage;
