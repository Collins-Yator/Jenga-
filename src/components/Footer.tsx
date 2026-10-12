import React from 'react';
import { PageView } from '../types';
import { MessageSquare, MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: PageView) => void;
  whatsappNumber: string;
  localPhone: string;
  publicEmail?: string;
  location: string;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  whatsappNumber,
  localPhone,
  publicEmail,
  location,
}) => {
  return (
    <footer className="bg-[#111111] text-[#9CA3AF] border-t-2 border-[#242424] pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand & Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white font-extrabold text-lg">
              <span className="bg-[#FFC107] text-[#111111] font-black px-2 py-0.5 rounded text-sm">
                J
              </span>
              <span>
                JENGA <span className="text-[#FFC107]">CONSTRUCTION</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-[#9CA3AF]">
              Specialized civil engineering, arterial roads, reinforced concrete bridges, building developments, and landscape spaces in Nairobi and nationwide Kenya.
            </p>
            <div className="space-y-2 text-xs text-neutral-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#FFC107] shrink-0" />
                <span>{location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#FFC107] shrink-0" />
                <span>{localPhone} (Local) / +{whatsappNumber}</span>
              </div>
              {publicEmail ? (
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#FFC107] shrink-0" />
                  <span>{publicEmail}</span>
                </div>
              ) : null}
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">
              Core Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-[#FFC107] transition-colors text-left"
                >
                  Road Construction &amp; Rehabilitation
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-[#FFC107] transition-colors text-left"
                >
                  Bridge Structures &amp; Culverts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-[#FFC107] transition-colors text-left"
                >
                  Commercial &amp; Residential Buildings
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-[#FFC107] transition-colors text-left"
                >
                  Landscaping &amp; Cabro Paving
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-[#FFC107] transition-colors text-left"
                >
                  Site Earthworks &amp; Bulk Grading
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-[#FFC107] transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#FFC107] transition-colors">
                  About Us &amp; Standards
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('projects')} className="hover:text-[#FFC107] transition-colors">
                  Portfolio Projects
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('testimonials')} className="hover:text-[#FFC107] transition-colors">
                  Client Testimonials
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-[#FFC107] transition-colors">
                  Contact Information
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('django-code')} className="hover:text-[#FFC107] transition-colors">
                  Django Backend Architecture
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Action & WhatsApp */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">
              Request a Quotation
            </h4>
            <p className="text-sm text-[#9CA3AF] mb-4">
              Connect directly with our engineering estimation desk in Nairobi for formal proposals.
            </p>
            <div className="space-y-2.5">
              <button
                onClick={() => onNavigate('quote')}
                className="w-full py-2.5 px-4 bg-[#FFC107] hover:bg-[#E5A900] text-[#111111] font-bold text-xs uppercase tracking-wider rounded transition-colors"
              >
                Submit Project Details
              </button>
              <a
                href={`https://wa.me/${whatsappNumber}?text=Hello+Jenga+Construction+Limited%2C+I+would+like+to+enquire+about+your+services.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Open WhatsApp Chat</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#242424] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>&copy; {new Date().getFullYear()} Jenga Construction Limited. All rights reserved.</p>
          <div className="flex items-center gap-4 text-neutral-500">
            <span>Nairobi, Kenya</span>
            <span>&bull;</span>
            <span>Currency: KES</span>
            <span>&bull;</span>
            <span>Timezone: Africa/Nairobi (EAT)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
