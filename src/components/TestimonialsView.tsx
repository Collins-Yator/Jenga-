import React from 'react';
import { PageView, TestimonialItem } from '../types';
import { ShieldCheck, MessageSquare, ArrowRight } from 'lucide-react';

interface TestimonialsViewProps {
  testimonials: TestimonialItem[];
  onNavigate: (view: PageView) => void;
  whatsappNumber: string;
}

export const TestimonialsView: React.FC<TestimonialsViewProps> = ({
  testimonials,
  onNavigate,
  whatsappNumber,
}) => {
  const publishedTestimonials = testimonials.filter((t) => t.isApproved && t.isPublished);

  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      {/* Header */}
      <section className="bg-[#111111] text-white py-16 border-b-4 border-[#FFC107]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs font-bold uppercase tracking-widest text-[#FFC107] mb-2">
            Client Commentary &bull; Verification Policy
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Client Testimonials &amp; Reviews
          </h1>
          <p className="text-lg text-neutral-300 max-w-3xl leading-relaxed">
            Verified accounts from project developers, site engineers, and commercial clients across Kenya.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {publishedTestimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {publishedTestimonials.map((t) => (
              <div key={t.id} className="bg-white p-8 rounded-lg border border-neutral-200 shadow-sm flex flex-col">
                <p className="italic text-base text-neutral-700 leading-relaxed mb-6 flex-grow">
                  "{t.content}"
                </p>
                <div className="pt-4 border-t border-neutral-200">
                  <strong className="block text-sm font-bold text-[#111111]">{t.clientName}</strong>
                  <span className="text-xs text-neutral-500">
                    {t.clientRole} {t.organization ? `· ${t.organization}` : ''}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-10 sm:p-14 rounded-lg border border-neutral-200 text-center max-w-2xl mx-auto shadow-sm mb-12">
            <div className="w-14 h-14 bg-amber-50 text-amber-700 rounded-full flex items-center justify-center mx-auto mb-5">
              <ShieldCheck className="w-8 h-8 text-[#FFC107]" />
            </div>
            <h2 className="text-2xl font-extrabold text-[#111111] mb-3">
              Testimonials Under Editorial Moderation
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed mb-8">
              In accordance with Jenga Construction Limited's strict integrity guidelines, client feedback is only published once formally certified by the contracting party and approved in our administrative dashboard.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => onNavigate('quote')}
                className="px-5 py-3 bg-[#FFC107] hover:bg-[#E5A900] text-[#111111] font-bold text-xs uppercase tracking-wider rounded transition-colors"
              >
                Request a Project Quotation
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="px-5 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-xs uppercase tracking-wider rounded transition-colors"
              >
                Contact Our Engineers
              </button>
            </div>
          </div>
        )}

        {/* Bottom CTA Banner */}
        <div className="bg-[#111111] text-white p-8 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">
              Have You Worked with Jenga Construction?
            </h3>
            <p className="text-xs text-neutral-400">
              Submit your feedback or site completion review to our administrative department.
            </p>
          </div>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
              'Hello Jenga Construction Limited, I would like to submit client feedback on our completed project.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs uppercase tracking-wider rounded flex items-center gap-2 shrink-0 transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Send Review on WhatsApp</span>
          </a>
        </div>
      </section>
    </div>
  );
};
