import React, { useState } from 'react';
import { PageView, ServiceItem } from '../types';
import { Route, Layers, Building, Trees, Shovel, ArrowRight, MessageSquare, X } from 'lucide-react';

interface ServicesViewProps {
  services: ServiceItem[];
  onNavigate: (view: PageView) => void;
  onPreselectServiceForQuote: (serviceSlug: string) => void;
  whatsappNumber: string;
}

export const ServicesView: React.FC<ServicesViewProps> = ({
  services,
  onNavigate,
  onPreselectServiceForQuote,
  whatsappNumber,
}) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const getServiceIcon = (title: string) => {
    if (title.toLowerCase().includes('road')) return <Route className="w-7 h-7 text-[#FFC107]" />;
    if (title.toLowerCase().includes('bridge')) return <Layers className="w-7 h-7 text-[#FFC107]" />;
    if (title.toLowerCase().includes('building')) return <Building className="w-7 h-7 text-[#FFC107]" />;
    if (title.toLowerCase().includes('landscap')) return <Trees className="w-7 h-7 text-[#FFC107]" />;
    return <Shovel className="w-7 h-7 text-[#FFC107]" />;
  };

  const handleQuoteClick = (serviceSlug: string) => {
    onPreselectServiceForQuote(serviceSlug);
    onNavigate('quote');
  };

  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      {/* Header */}
      <section className="bg-[#111111] text-white py-16 border-b-4 border-[#FFC107]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs font-bold uppercase tracking-widest text-[#FFC107] mb-2">
            Engineering Capabilities
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Construction &amp; Civil Engineering Services
          </h1>
          <p className="text-lg text-neutral-300 max-w-3xl leading-relaxed">
            Delivering precision infrastructure, civil earthworks, structural building developments, and outdoor landscape environments tailored to Kenya.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services
            .filter((s) => s.isPublished)
            .map((service) => (
              <div
                key={service.id}
                className="bg-white border border-neutral-200 rounded-lg p-8 flex flex-col hover:border-[#FFC107] hover:shadow-lg transition-all group"
              >
                <div className="w-14 h-14 rounded-lg bg-[#111111] flex items-center justify-center mb-6">
                  {getServiceIcon(service.title)}
                </div>

                <h2 className="text-xl font-bold text-[#111111] mb-3 group-hover:text-amber-800 transition-colors">
                  {service.title}
                </h2>

                <p className="text-sm text-neutral-600 leading-relaxed mb-6 flex-grow">
                  {service.shortDescription}
                </p>

                <div className="pt-6 border-t border-neutral-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="text-xs font-bold text-[#111111] hover:text-[#E5A900] transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Read Full Scope</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleQuoteClick(service.slug)}
                    className="px-3.5 py-1.5 bg-[#FFC107] hover:bg-[#E5A900] text-[#111111] font-bold text-xs rounded transition-colors cursor-pointer"
                  >
                    Request Quote
                  </button>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-neutral-900 p-1 rounded-full cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded bg-[#111111] flex items-center justify-center">
                {getServiceIcon(selectedService.title)}
              </div>
              <h3 className="text-2xl font-bold text-[#111111]">{selectedService.title}</h3>
            </div>

            <div className="space-y-4 text-sm text-neutral-700 leading-relaxed mb-8">
              <div className="bg-neutral-50 p-4 rounded border border-neutral-200">
                <strong>Executive Summary:</strong> {selectedService.shortDescription}
              </div>
              <div>
                <h4 className="font-bold text-neutral-900 mb-2">Technical Description &amp; Scope:</h4>
                <p className="whitespace-pre-line">{selectedService.description}</p>
              </div>
            </div>

            <div className="border-t border-neutral-200 pt-6 flex flex-wrap gap-4">
              <button
                onClick={() => {
                  handleQuoteClick(selectedService.slug);
                  setSelectedService(null);
                }}
                className="px-5 py-2.5 bg-[#FFC107] hover:bg-[#E5A900] text-[#111111] font-bold text-xs uppercase tracking-wider rounded transition-colors"
              >
                Request Quote for this Service
              </button>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                  `Hello Jenga Construction Limited, I would like to enquire about your ${selectedService.title} services.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs uppercase tracking-wider rounded flex items-center gap-2 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Enquire via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
