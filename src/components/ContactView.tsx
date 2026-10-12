import React, { useState } from 'react';
import { PageView, ContactMessageItem, SiteSettingsData } from '../types';
import { MessageSquare, MapPin, Phone, Mail, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

interface ContactViewProps {
  onNavigate: (view: PageView) => void;
  onSubmitContact: (message: ContactMessageItem) => void;
  siteSettings: SiteSettingsData;
}

export const ContactView: React.FC<ContactViewProps> = ({
  onNavigate,
  onSubmitContact,
  siteSettings,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(true);
  const [honeypot, setHoneypot] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (honeypot) {
      newErrors.bot = 'Spam trap triggered.';
      setErrors(newErrors);
      return;
    }

    if (!name.trim()) newErrors.name = 'Name is required.';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Valid email is required.';
    }
    if (!subject.trim()) newErrors.subject = 'Subject is required.';
    if (!message.trim() || message.length < 10) {
      newErrors.message = 'Please provide a message with at least 10 characters.';
    }
    if (!consent) newErrors.consent = 'Consent is required.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newMessage: ContactMessageItem = {
      id: String(Date.now()),
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
      subject: subject.trim(),
      message: message.trim(),
      consentGiven: consent,
      isRead: false,
      createdAt: new Date().toISOString(),
    };

    onSubmitContact(newMessage);
    setIsSuccess(true);
    setName('');
    setEmail('');
    setPhone('');
    setSubject('');
    setMessage('');
    setErrors({});
  };

  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      {/* Header */}
      <section className="bg-[#111111] text-white py-16 border-b-4 border-[#FFC107]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs font-bold uppercase tracking-widest text-[#FFC107] mb-2">
            Get In Touch &bull; Nairobi, Kenya
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Contact Jenga Construction Limited
          </h1>
          <p className="text-lg text-neutral-300 max-w-3xl leading-relaxed">
            Reach out directly for civil contracts, building consultations, and quotation enquiries across Kenya.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left 5 Cols: Contact Information */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-8 rounded-lg border border-neutral-200 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-[#111111] border-b border-neutral-200 pb-3">
                Company Direct Channels
              </h2>

              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded bg-[#111111] text-[#FFC107] flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-neutral-900 font-bold">WhatsApp Direct (Recommended)</strong>
                    <span className="text-neutral-600 block">{siteSettings.localWhatsappDisplay} / +{siteSettings.whatsappNumber}</span>
                    <a
                      href={`https://wa.me/${siteSettings.whatsappNumber}?text=${encodeURIComponent(
                        'Hello Jenga Construction Limited, I would like to enquire about your services.'
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-xs font-bold text-emerald-600 hover:text-emerald-700 underline"
                    >
                      Open WhatsApp Click-to-Chat &rarr;
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded bg-[#111111] text-[#FFC107] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-neutral-900 font-bold">Primary Location</strong>
                    <span className="text-neutral-600 block">{siteSettings.locationGeneral}</span>
                    <span className="text-xs text-neutral-400 block mt-0.5">
                      Executing projects across Nairobi, Kiambu, Machakos &amp; nationwide.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded bg-[#111111] text-[#FFC107] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-neutral-900 font-bold">Operating Hours</strong>
                    <span className="text-neutral-600 block leading-relaxed">{siteSettings.businessHours}</span>
                  </div>
                </div>

                {siteSettings.publicEmail && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded bg-[#111111] text-[#FFC107] flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="block text-neutral-900 font-bold">Official Email</strong>
                      <span className="text-neutral-600 block">{siteSettings.publicEmail}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-[#FEF3C7] border border-[#FDE68A] p-4 rounded text-xs text-[#92400E] leading-relaxed">
                <strong>Need a structured price proposal?</strong> We recommend using the dedicated{' '}
                <button
                  onClick={() => onNavigate('quote')}
                  className="font-bold underline text-[#78350F] hover:text-black cursor-pointer"
                >
                  Quotation Request Form
                </button>{' '}
                to receive an immediate reference number.
              </div>
            </div>

            {/* Google Maps Embed Section */}
            <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-sm">
              <h3 className="font-bold text-sm text-[#111111] uppercase tracking-wider mb-2">
                Nairobi Regional Hub
              </h3>
              <p className="text-xs text-neutral-500 mb-4 leading-relaxed">
                Jenga Construction Limited is based in Nairobi, Kenya. Specific GPS map coordinates and embed iframe can be configured in the Django Admin once physical offices are validated.
              </p>

              {siteSettings.googleMapsEmbedUrl ? (
                <div className="aspect-video w-full rounded overflow-hidden border border-neutral-300">
                  <iframe
                    src={siteSettings.googleMapsEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="Jenga Construction Google Maps"
                  />
                </div>
              ) : (
                <div className="bg-[#F5F5F5] border border-dashed border-neutral-300 rounded p-6 text-center text-xs text-neutral-500">
                  <MapPin className="w-6 h-6 text-neutral-400 mx-auto mb-2" />
                  <span>General Regional Pin: Nairobi, Kenya</span>
                </div>
              )}
            </div>
          </div>

          {/* Right 7 Cols: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 sm:p-10 rounded-lg border border-neutral-200 shadow-sm">
              <h2 className="text-xl font-bold text-[#111111] mb-2">
                Send a General Message
              </h2>
              <p className="text-sm text-neutral-600 mb-6">
                Have a question or looking to discuss an upcoming project? Fill in your details below.
              </p>

              {isSuccess && (
                <div className="mb-6 p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded text-sm flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold">Message Delivered Successfully!</strong>
                    <span>Your inquiry has been stored in our communications database. Our Nairobi office will get back to you shortly.</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Honeypot trap */}
                <div className="hidden">
                  <input
                    type="text"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-700 mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Grace Achieng"
                      className={`w-full p-3 text-sm border rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#FFC107] ${
                        errors.name ? 'border-red-500' : 'border-neutral-300'
                      }`}
                    />
                    {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-700 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. grace@example.com"
                      className={`w-full p-3 text-sm border rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#FFC107] ${
                        errors.email ? 'border-red-500' : 'border-neutral-300'
                      }`}
                    />
                    {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-700 mb-1.5">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 07XX XXX XXX"
                      className="w-full p-3 text-sm border border-neutral-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#FFC107]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-700 mb-1.5">
                      Subject *
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Road Tenders / Commercial Foundation"
                      className={`w-full p-3 text-sm border rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#FFC107] ${
                        errors.subject ? 'border-red-500' : 'border-neutral-300'
                      }`}
                    />
                    {errors.subject && <p className="text-xs text-red-600 mt-1">{errors.subject}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-700 mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe how our civil engineers and construction teams can support your goals..."
                    className={`w-full p-3 text-sm border rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#FFC107] ${
                      errors.message ? 'border-red-500' : 'border-neutral-300'
                    }`}
                  />
                  {errors.message && <p className="text-xs text-red-600 mt-1">{errors.message}</p>}
                </div>

                <div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-neutral-300 text-black focus:ring-[#FFC107]"
                    />
                    <span className="text-xs text-neutral-600 leading-normal">
                      I agree to Jenga Construction Limited processing my message to respond to this inquiry.
                    </span>
                  </label>
                  {errors.consent && <p className="text-xs text-red-600 mt-1">{errors.consent}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#111111] hover:bg-[#242424] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer"
                >
                  Send Inquiry Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
