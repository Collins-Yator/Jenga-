import React, { useState } from 'react';
import { PageView, QuoteRequestItem, ServiceItem } from '../types';
import { CheckCircle2, MessageSquare, AlertCircle, ArrowLeft } from 'lucide-react';

interface QuoteRequestViewProps {
  services: ServiceItem[];
  preselectedServiceSlug?: string;
  onNavigate: (view: PageView) => void;
  onSubmitQuote: (quote: QuoteRequestItem) => void;
  whatsappNumber: string;
}

export const QuoteRequestView: React.FC<QuoteRequestViewProps> = ({
  services,
  preselectedServiceSlug,
  onNavigate,
  onSubmitQuote,
  whatsappNumber,
}) => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [serviceCategory, setServiceCategory] = useState(
    preselectedServiceSlug
      ? services.find((s) => s.slug === preselectedServiceSlug)?.title || 'Road Construction'
      : 'Road Construction'
  );
  const [projectLocation, setProjectLocation] = useState('Nairobi, Kenya');
  const [projectDescription, setProjectDescription] = useState('');
  const [estimatedBudget, setEstimatedBudget] = useState('');
  const [preferredStartDate, setPreferredStartDate] = useState('');
  const [preferredContactMethod, setPreferredContactMethod] = useState<'WHATSAPP' | 'PHONE_CALL' | 'EMAIL'>('WHATSAPP');
  const [consentGiven, setConsentGiven] = useState(true);
  const [honeypot, setHoneypot] = useState(''); // Anti-bot trap

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedQuote, setSubmittedQuote] = useState<QuoteRequestItem | null>(null);

  // Validate Kenyan Phone Number formats
  const validateKenyanPhone = (phone: string): boolean => {
    const cleaned = phone.replace(/[\s\-()]/g, '');
    const regex = /^(?:(?:\+?254)|0)?([17]\d{8})$/;
    return regex.test(cleaned);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Bot honeypot check
    if (honeypot.trim() !== '') {
      newErrors.bot = 'Spam verification triggered.';
      setErrors(newErrors);
      return;
    }

    if (!fullName.trim()) newErrors.fullName = 'Full Name is required.';
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'Kenyan Phone Number is required.';
    } else if (!validateKenyanPhone(phoneNumber)) {
      newErrors.phoneNumber = 'Enter a valid Kenyan number (e.g. 0792 729 492 or +254 792 729 492).';
    }

    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Enter a valid email address.';
    }

    if (!projectLocation.trim()) newErrors.projectLocation = 'Project location in Kenya is required.';
    if (!projectDescription.trim() || projectDescription.length < 15) {
      newErrors.projectDescription = 'Please provide at least 15 characters describing the project scope.';
    }

    if (!consentGiven) {
      newErrors.consentGiven = 'Consent to process your construction enquiry is required.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    // Generate unique reference number JCL-YYYYMMDD-XXXX
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randSuffix = Math.floor(1000 + Math.random() * 9000);
    const refNumber = `JCL-${dateStr}-${randSuffix}`;

    const newQuote: QuoteRequestItem = {
      id: String(Date.now()),
      referenceNumber: refNumber,
      fullName: fullName.trim(),
      phoneNumber: phoneNumber.trim(),
      email: email.trim() || undefined,
      serviceCategory,
      projectLocation: projectLocation.trim(),
      projectDescription: projectDescription.trim(),
      estimatedBudget: estimatedBudget.trim() || undefined,
      preferredStartDate: preferredStartDate || undefined,
      preferredContactMethod,
      consentGiven,
      status: 'NEW',
      internalNotes: '',
      createdAt: new Date().toISOString(),
    };

    onSubmitQuote(newQuote);
    setSubmittedQuote(newQuote);
  };

  if (submittedQuote) {
    const followUpMsg = `Hello Jenga Construction Limited, I have submitted a quotation request (Ref: ${submittedQuote.referenceNumber}). My name is ${submittedQuote.fullName}.`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(followUpMsg)}`;

    return (
      <div className="bg-[#F5F5F5] min-h-screen py-16 flex items-center justify-center px-4">
        <div className="max-w-xl w-full bg-white rounded-lg p-8 sm:p-10 border border-neutral-200 shadow-md text-center">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <h2 className="text-2xl font-extrabold text-[#111111] mb-2">
            Quotation Request Received
          </h2>
          <p className="text-sm text-neutral-600 mb-6 leading-relaxed">
            Thank you, <strong>{submittedQuote.fullName}</strong>. Your civil engineering and construction specifications have been saved to the database.
          </p>

          <div className="bg-[#F5F5F5] border-2 border-dashed border-[#FFC107] p-5 rounded-lg mb-8">
            <span className="block text-xs uppercase font-bold text-neutral-500 tracking-wider mb-1">
              Your Tracking Reference Code
            </span>
            <span className="font-heading text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-wide">
              {submittedQuote.referenceNumber}
            </span>
            <p className="text-xs text-neutral-500 mt-2">
              Save this reference code for site visits and formal Bill of Quantities (BOQ) tracking.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-sm rounded flex items-center justify-center gap-2 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Connect on WhatsApp with Ref: {submittedQuote.referenceNumber}</span>
            </a>
          </div>

          <div className="flex items-center justify-center gap-4 pt-4 border-t border-neutral-200">
            <button
              onClick={() => onNavigate('home')}
              className="text-xs font-bold text-neutral-600 hover:text-black cursor-pointer"
            >
              Return to Homepage
            </button>
            <span className="text-neutral-300">&bull;</span>
            <button
              onClick={() => onNavigate('admin')}
              className="text-xs font-bold text-[#FFC107] hover:underline cursor-pointer"
            >
              Inspect in Django Admin Portal
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      {/* Header */}
      <section className="bg-[#111111] text-white py-16 border-b-4 border-[#FFC107]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs font-bold uppercase tracking-widest text-[#FFC107] mb-2">
            Estimation &bull; Tender Enquiry
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Request a Construction Quotation
          </h1>
          <p className="text-lg text-neutral-300 max-w-3xl leading-relaxed">
            Provide your project location and engineering requirements. Our estimation engineers in Nairobi will review your specifications.
          </p>
        </div>
      </section>

      {/* Form Container */}
      <section className="py-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 sm:p-10 rounded-lg border border-neutral-200 shadow-sm">
          {errors.bot && (
            <div className="mb-6 p-4 bg-red-50 text-red-800 border border-red-200 rounded text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errors.bot}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-8">
            {/* Hidden honeypot */}
            <div className="hidden">
              <input
                type="text"
                name="website_url"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* Section 1: Contact Information */}
            <div>
              <h3 className="text-base font-bold text-[#111111] uppercase tracking-wider pb-3 border-b border-neutral-200 mb-5">
                1. Client Contact Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-700 mb-1.5">
                    Full Name or Entity *
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. David Mwangi / Apex Estates"
                    className={`w-full p-3 text-sm border rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#FFC107] ${
                      errors.fullName ? 'border-red-500' : 'border-neutral-300'
                    }`}
                  />
                  {errors.fullName && <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-700 mb-1.5">
                    Kenyan Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="e.g. 0792 729 492"
                    className={`w-full p-3 text-sm border rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#FFC107] ${
                      errors.phoneNumber ? 'border-red-500' : 'border-neutral-300'
                    }`}
                  />
                  <span className="text-[11px] text-neutral-500">Local or +254 Kenyan format</span>
                  {errors.phoneNumber && <p className="text-xs text-red-600 mt-1">{errors.phoneNumber}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-700 mb-1.5">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. name@domain.com"
                    className={`w-full p-3 text-sm border rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#FFC107] ${
                      errors.email ? 'border-red-500' : 'border-neutral-300'
                    }`}
                  />
                  <span className="text-[11px] text-neutral-500">For formal written quotations</span>
                  {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-700 mb-1.5">
                    Preferred Contact Method
                  </label>
                  <select
                    value={preferredContactMethod}
                    onChange={(e) => setPreferredContactMethod(e.target.value as any)}
                    className="w-full p-3 text-sm border border-neutral-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#FFC107]"
                  >
                    <option value="WHATSAPP">WhatsApp Message</option>
                    <option value="PHONE_CALL">Direct Phone Call</option>
                    <option value="EMAIL">Email Correspondence</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: Project Specifications */}
            <div>
              <h3 className="text-base font-bold text-[#111111] uppercase tracking-wider pb-3 border-b border-neutral-200 mb-5">
                2. Project Scope &amp; Specifications
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-700 mb-1.5">
                    Construction Discipline
                  </label>
                  <select
                    value={serviceCategory}
                    onChange={(e) => setServiceCategory(e.target.value)}
                    className="w-full p-3 text-sm border border-neutral-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#FFC107]"
                  >
                    {services.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-700 mb-1.5">
                    Site Location in Kenya *
                  </label>
                  <input
                    type="text"
                    value={projectLocation}
                    onChange={(e) => setProjectLocation(e.target.value)}
                    placeholder="e.g. Kilimani, Nairobi / Thika Road"
                    className={`w-full p-3 text-sm border rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#FFC107] ${
                      errors.projectLocation ? 'border-red-500' : 'border-neutral-300'
                    }`}
                  />
                  {errors.projectLocation && (
                    <p className="text-xs text-red-600 mt-1">{errors.projectLocation}</p>
                  )}
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-xs font-bold uppercase text-neutral-700 mb-1.5">
                  Detailed Project Description &amp; Scope *
                </label>
                <textarea
                  rows={4}
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  placeholder="Detail the scope of work (approximate road distance, number of residential storeys, soil conditions, culvert size, or cabro area)..."
                  className={`w-full p-3 text-sm border rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#FFC107] ${
                    errors.projectDescription ? 'border-red-500' : 'border-neutral-300'
                  }`}
                />
                {errors.projectDescription && (
                  <p className="text-xs text-red-600 mt-1">{errors.projectDescription}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-700 mb-1.5">
                    Estimated Budget (KES, Optional)
                  </label>
                  <input
                    type="text"
                    value={estimatedBudget}
                    onChange={(e) => setEstimatedBudget(e.target.value)}
                    placeholder="e.g. KES 2,500,000 - 5,000,000"
                    className="w-full p-3 text-sm border border-neutral-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#FFC107]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-700 mb-1.5">
                    Preferred Start Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={preferredStartDate}
                    onChange={(e) => setPreferredStartDate(e.target.value)}
                    className="w-full p-3 text-sm border border-neutral-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#FFC107]"
                  />
                </div>
              </div>
            </div>

            {/* Consent & Policy Notice */}
            <div className="space-y-4 pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consentGiven}
                  onChange={(e) => setConsentGiven(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-neutral-300 text-black focus:ring-[#FFC107]"
                />
                <span className="text-xs text-neutral-600 leading-normal">
                  I consent to Jenga Construction Limited contacting me via my chosen communication method regarding this quotation request.
                </span>
              </label>
              {errors.consentGiven && <p className="text-xs text-red-600">{errors.consentGiven}</p>}

              <div className="p-3 bg-neutral-100 rounded text-xs text-neutral-500 leading-relaxed">
                <strong>Preliminary Estimation Notice:</strong> Quotation requests submitted through this form represent non-binding preliminary project scoping. A final contract is formalized only upon joint site inspection and an agreed Bill of Quantities (BOQ).
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#FFC107] hover:bg-[#E5A900] text-[#111111] font-bold text-sm uppercase tracking-wider rounded shadow cursor-pointer transition-all active:scale-98"
            >
              Submit Quotation Request
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};
