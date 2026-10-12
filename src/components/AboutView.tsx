import React from 'react';
import { PageView, SiteSettingsData } from '../types';
import { HardHat, ShieldCheck, CheckCircle2, MessageSquare, ArrowRight } from 'lucide-react';

interface AboutViewProps {
  onNavigate: (view: PageView) => void;
  siteSettings: SiteSettingsData;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate, siteSettings }) => {
  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      {/* Header */}
      <section className="bg-[#111111] text-white py-16 border-b-4 border-[#FFC107]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs font-bold uppercase tracking-widest text-[#FFC107] mb-2">
            Company Profile &bull; Nairobi, Kenya
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            About Jenga Construction Limited
          </h1>
          <p className="text-lg text-neutral-300 max-w-3xl leading-relaxed">
            Committed to engineering discipline, durable structural works, and transparent partnership across Kenya's infrastructure and residential sectors.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Who We Are */}
        <div className="bg-white p-8 sm:p-10 rounded-lg border border-neutral-200 shadow-sm space-y-4">
          <h2 className="text-2xl font-extrabold text-[#111111] tracking-tight">
            Who We Are
          </h2>
          <p className="text-base text-neutral-700 leading-relaxed">
            {siteSettings.aboutText}
          </p>
          <p className="text-base text-neutral-700 leading-relaxed">
            Operating from Nairobi, Kenya, our field engineers and project supervisors bring focused technical know-how to high-traffic road rehabilitation, reinforced concrete culverts, commercial multi-level developments, and private estate outdoor spaces.
          </p>
        </div>

        {/* Mission & Vision (Explicitly labelled Draft) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg border-l-4 border-[#FFC107] border border-neutral-200 shadow-sm space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
              Draft Statement &bull; Subject to Approval
            </span>
            <h3 className="text-xl font-bold text-[#111111]">Our Mission</h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              {siteSettings.missionStatement}
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg border-l-4 border-[#111111] border border-neutral-200 shadow-sm space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded">
              Draft Statement &bull; Subject to Approval
            </span>
            <h3 className="text-xl font-bold text-[#111111]">Our Vision</h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              {siteSettings.visionStatement}
            </p>
          </div>
        </div>

        {/* Pillars of Execution */}
        <div className="bg-white p-8 sm:p-10 rounded-lg border border-neutral-200 shadow-sm space-y-6">
          <h2 className="text-2xl font-extrabold text-[#111111] tracking-tight">
            Our Four Core Execution Pillars
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-neutral-200 p-5 rounded">
              <h4 className="font-bold text-base text-[#111111] mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#FFC107] shrink-0" />
                <span>1. Engineering Integrity</span>
              </h4>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Zero compromises on aggregate gradations, steel tensile specifications, or concrete curing cycles. Quality testing at every structural stage.
              </p>
            </div>

            <div className="border border-neutral-200 p-5 rounded">
              <h4 className="font-bold text-base text-[#111111] mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#FFC107] shrink-0" />
                <span>2. Site Safety &amp; Environment</span>
              </h4>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Strict occupational safety rules, personal protective equipment compliance, and responsible earth debris disposal minimizing ecological impact.
              </p>
            </div>

            <div className="border border-neutral-200 p-5 rounded">
              <h4 className="font-bold text-base text-[#111111] mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#FFC107] shrink-0" />
                <span>3. Transparent Costing &amp; Timelines</span>
              </h4>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Clear bill of quantities (BOQ) with documented payment milestones. Eliminating unexpected price escalations mid-project.
              </p>
            </div>

            <div className="border border-neutral-200 p-5 rounded">
              <h4 className="font-bold text-base text-[#111111] mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#FFC107] shrink-0" />
                <span>4. Collaborative Planning</span>
              </h4>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Thorough discussions with property owners and architects before breaking soil, ensuring alignment with your functional requirements.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#111111] text-white p-8 sm:p-10 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">
              Discuss Your Project with Jenga Engineers
            </h3>
            <p className="text-sm text-neutral-400">
              Submit an online quotation request or message our desk on WhatsApp.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('quote')}
              className="px-5 py-3 bg-[#FFC107] hover:bg-[#E5A900] text-[#111111] font-bold text-xs uppercase tracking-wider rounded transition-colors"
            >
              Request a Quote
            </button>
            <a
              href={`https://wa.me/${siteSettings.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors"
            >
              WhatsApp Chat
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
