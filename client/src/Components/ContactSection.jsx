import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, ShieldCheck, Sparkles, MessageSquare, User, HelpCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

const ContactSection = ({ id = "contact" }) => {
  const { showToast, t } = useApp();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      showToast('Please fill in your name, email, and message.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      showToast('Please enter a valid email address.');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      showToast('Your message has been sent successfully! We will get back to you soon. 💌');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 800);
  };

  return (
    <section id={id} className="py-14 sm:py-20 bg-surface-50 border-t border-surface-200 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-primary-100 text-primary-800 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-3.5 shadow-2xs">
            <Sparkles className="w-4 h-4 text-brand-600" />
            {t('contactBadge', 'Direct Support & Consultation')}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-kdark-900 font-serif mb-3.5 tracking-tight">
            {t('contactTitle', "We're Here for Your Skin Journey")}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            {t('contactSubtitle', 'Need guidance choosing the right Korean serum formula, tracking a shipment, or requesting a personalized routine consultation? Reach out below.')}
          </p>
        </div>

        {/* Contact Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Details Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-surface-200/90 shadow-xs">
              <h3 className="text-xl font-bold font-serif text-kdark-900 mb-2">
                {t('conciergeTitle', 'SEORA Customer Concierge')}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-6">
                {t('conciergeDesc', 'Our Seoul-trained skincare advisors are available 6 days a week to help with formula recommendations and orders.')}
              </p>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-surface-50 border border-surface-200/70">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-700 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-kdark-900 text-sm">{t('emailUs', 'Email Us')}</h4>
                    <a href="mailto:care@seora-skincare.pk" className="text-primary-700 hover:underline text-xs sm:text-sm font-medium">
                      care@seora-skincare.pk
                    </a>
                    <p className="text-[11px] text-gray-400 mt-0.5">{t('emailReplyTime', 'Average reply time under 3 hours')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-surface-50 border border-surface-200/70">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-kdark-900 text-sm">{t('callSupport', 'Call & WhatsApp Support')}</h4>
                    <a href="tel:+923001234567" className="text-kdark-800 hover:text-primary-700 text-xs sm:text-sm font-medium">
                      +92 300 1234567
                    </a>
                    <p className="text-[11px] text-gray-400 mt-0.5">{t('callHours', 'Mon – Sat, 9:00 AM – 9:00 PM PKT')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-surface-50 border border-surface-200/70">
                  <div className="w-10 h-10 rounded-xl bg-sage-50 text-sage-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-kdark-900 text-sm">{t('headquarters', 'Headquarters & Logistics')}</h4>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {t('hqAddress', 'Gulberg III, Lahore, Pakistan')}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{t('hqImport', 'Direct Imports from Seoul, South Korea')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Guarantees */}
            <div className="grid grid-cols-2 gap-3.5">
              <div className="p-4 rounded-2xl bg-white border border-surface-200/80 shadow-2xs flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-xs font-semibold text-kdark-800">{t('trustOriginal', '100% Authentic Korean Products')}</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-surface-200/80 shadow-2xs flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary-600 shrink-0" />
                <span className="text-xs font-semibold text-kdark-800">{t('trustExpress', 'Swift Order Dispatch')}</span>
              </div>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-9 border border-surface-200/90 shadow-sm">
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-kdark-900 mb-1.5">
                  {t('sendUsMessage', 'Send Us a Message')}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  {t('sendUsMessageSub', 'Fill out this quick form and our K-beauty support team will assist you promptly.')}
                </p>
              </div>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-center animate-fade-in my-6">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-emerald-900 mb-2">{t('messageSentTitle', 'Message Received!')}</h4>
                  <p className="text-sm text-emerald-800 max-w-md mx-auto mb-5">
                    {t('messageSentDesc', 'Thank you for reaching out. One of our skincare specialists has received your note and will get back to your email within a few hours.')}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-secondary px-6 py-2.5 text-xs sm:text-sm font-semibold"
                  >
                    {t('sendAnotherBtn', 'Send Another Message')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-kdark-700 mb-1.5">
                        {t('fullNameLabel', 'Your Full Name')} <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          name="name"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder="e.g. Fatima Zahra"
                          className="input-field pl-11 text-sm rounded-xl py-3"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-kdark-700 mb-1.5">
                        {t('emailAddressLabel', 'Email Address')} <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          name="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder="name@example.com"
                          className="input-field pl-11 text-sm rounded-xl py-3"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-kdark-700 mb-1.5">
                        {t('phoneNumberLabel', 'Phone Number (Optional)')}
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+92 300 1234567"
                          className="input-field pl-11 text-sm rounded-xl py-3"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-kdark-700 mb-1.5">
                        {t('subjectLabel', 'Subject / Inquiry Type')}
                      </label>
                      <div className="relative">
                        <HelpCircle className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                        <select
                          name="subject"
                          value={form.subject}
                          onChange={handleChange}
                          className="input-field pl-11 text-sm rounded-xl py-3 bg-white"
                        >
                          <option value="">{t('subjectPlaceholder', 'Select subject topic...')}</option>
                          <option value="Skincare Consultation">{t('subjectOptConsult', 'Personalized Serum Consultation')}</option>
                          <option value="Order Tracking">{t('subjectOptOrder', 'Order & Shipping Status')}</option>
                          <option value="Cash on Delivery">{t('subjectOptCod', 'Payment & COD Questions')}</option>
                          <option value="Product Authenticity">{t('subjectOptAuth', 'Formula & Authenticity Questions')}</option>
                          <option value="Wholesale">{t('subjectOptWholesale', 'Wholesale & Business Inquiries')}</option>
                          <option value="Other">{t('subjectOptOther', 'Other Question')}</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-kdark-700 mb-1.5">
                      {t('messageLabel', 'Your Message')} <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <MessageSquare className="w-4 h-4 text-gray-400 absolute left-4 top-3.5" />
                      <textarea
                        name="message"
                        required
                        rows={4}
                        value={form.message}
                        onChange={handleChange}
                        placeholder={t('messagePlaceholder', 'Tell us about your skin concern, question, or order ID...')}
                        className="input-field pl-11 text-sm rounded-xl py-3 resize-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full btn-primary py-3.5 text-sm sm:text-base font-semibold flex items-center justify-center gap-2 mt-4 shadow-sm active:scale-[0.99] transition-all"
                  >
                    {submitting ? (
                      <span>Sending Your Note...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{t('sendMessageBtn', 'Send Message to Skincare Concierge')}</span>
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-gray-400 text-center mt-2">
                    {t('privacyNotice', '🔒 Your privacy is protected. We will never share your personal information.')}
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
