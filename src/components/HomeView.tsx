import React from 'react';
import { PageView, ServiceItem, ProjectItem, TestimonialItem, SiteSettingsData } from '../types';
import {
  ArrowRight,
  MessageSquare,
  ShieldCheck,
  HardHat,
  CheckCircle2,
  Building,
  Route,
  Trees,
  Layers,
  Shovel,
  AlertTriangle
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (view: PageView) => void;
  onSelectService: (service: ServiceItem) => void;
  onSelectProject: (project: ProjectItem) => void;
  services: ServiceItem[];
  projects: ProjectItem[];
  testimonials: TestimonialItem[];
  siteSettings: SiteSettingsData;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onSelectService,
  onSelectProject,
  services,
  projects,
  testimonials,
  siteSettings,
}) => {
  const publishedServices = services.filter((s) => s.isPublished).slice(0, 4);
  const featuredProjects = projects.filter((p) => p.isPublished && p.isFeatured).slice(0, 3);
  const approvedTestimonials = testimonials.filter((t) => t.isApproved && t.isPublished);

  const getServiceIcon = (title: string) => {
    if (title.toLowerCase().includes('road')) return <Route className="w-6 h-6 text-[#FFC107]" />;
    if (title.toLowerCase().includes('bridge')) return <Layers className="w-6 h-6 text-[#FFC107]" />;
    if (title.toLowerCase().includes('building')) return <Building className="w-6 h-6 text-[#FFC107]" />;
    if (title.toLowerCase().includes('landscap')) return <Trees className="w-6 h-6 text-[#FFC107]" />;
    return <Shovel className="w-6 h-6 text-[#FFC107]" />;
  };

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="bg-[#111111] text-white pt-16 pb-20 border-b-4 border-[#FFC107] relative overflow-hidden">
        {/* Subtle geometric grid background */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#FFFFFF 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left 7 Cols */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#FFC107] bg-[#242424] px-3 py-1.5 rounded">
                <HardHat className="w-4 h-4 text-[#FFC107]" />
                <span>Civil Engineering &bull; Nairobi, Kenya</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] text-balance">
                Building Strong Foundations. <br className="hidden sm:inline" />
                <span className="text-[#FFC107]">Creating Lasting Futures.</span>
              </h1>

              <p className="text-lg text-neutral-300 max-w-2xl leading-relaxed">
                From roads and bridges to residential buildings and landscaped spaces, explore construction solutions designed around your project's needs.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigate('quote')}
                  className="px-6 py-3.5 bg-[#FFC107] hover:bg-[#E5A900] text-[#111111] font-bold text-sm rounded shadow-sm flex items-center gap-2 transition-all cursor-pointer active:scale-95"
                >
                  <span>Request a Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('services')}
                  className="px-6 py-3.5 bg-transparent hover:bg-white/10 text-white font-semibold text-sm border border-neutral-600 rounded transition-colors cursor-pointer"
                >
                  Explore Our Services
                </button>

                <a
                  href={`https://wa.me/${siteSettings.whatsappNumber}?text=${encodeURIComponent(
                    'Hello Jenga Construction Limited, I would like to enquire about your construction services.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-sm rounded flex items-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>
            </div>

            {/* Right 5 Cols: Engineering Discipline Card */}
            <div className="lg:col-span-5">
              <div className="bg-[#242424] border border-white/10 rounded-lg p-6 sm:p-8 shadow-xl relative">
                <div className="text-xs font-bold text-[#FFC107] uppercase tracking-wider mb-2">
                  Technical Capabilities
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Civil, Structural &amp; Pavement Works
                </h3>
                <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                  Rigorous engineering, structural testing, and site supervision matching Kenyan building authority standards.
                </p>

                <div className="space-y-3.5 text-sm">
                  <div className="flex items-start gap-3 text-neutral-200">
                    <CheckCircle2 className="w-5 h-5 text-[#FFC107] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">Road &amp; Feeder Pavements:</strong> Bitumen surfacing, sub-base compaction &amp; drainage.
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-neutral-200">
                    <CheckCircle2 className="w-5 h-5 text-[#FFC107] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">Bridge Engineering:</strong> Reinforced concrete piers, abutments &amp; box culverts.
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-neutral-200">
                    <CheckCircle2 className="w-5 h-5 text-[#FFC107] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">Commercial &amp; Residential:</strong> Foundation columns, masonry &amp; finishing.
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-neutral-200">
                    <CheckCircle2 className="w-5 h-5 text-[#FFC107] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">Landscape Architecture:</strong> Interlocking cabro paving, turf &amp; perimeter grading.
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-neutral-700/60 flex items-center justify-between text-xs text-neutral-400">
                  <span>Location: {siteSettings.locationGeneral}</span>
                  <span className="text-[#FFC107] font-semibold">KES Billing Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services Section */}
      <section className="py-20 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
                Construction Disciplines
              </div>
              <h2 className="text-3xl font-extrabold text-[#111111] tracking-tight">
                Specialized Services
              </h2>
            </div>
            <button
              onClick={() => onNavigate('services')}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#111111] hover:text-[#E5A900] transition-colors group cursor-pointer"
            >
              <span>View All Services</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {publishedServices.map((service) => (
              <div
                key={service.id}
                className="bg-[#F5F5F5] border border-neutral-200 rounded-lg p-6 flex flex-col hover:border-[#FFC107] hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 rounded bg-[#111111] flex items-center justify-center mb-5">
                  {getServiceIcon(service.title)}
                </div>
                <h3 className="text-lg font-bold text-[#111111] mb-2 group-hover:text-amber-800 transition-colors">
                  {{
                    'Road Construction': 'Road Construction',
                    'Bridge Construction': 'Bridge Construction',
                    'Building Construction': 'Building Construction',
                    'Landscaping Services': 'Landscaping Services',
                  }[service.title] || service.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed mb-6 flex-grow">
                  {service.shortDescription}
                </p>

                <div className="pt-4 border-t border-neutral-200 flex items-center justify-between">
                  <button
                    onClick={() => onSelectService(service)}
                    className="text-xs font-bold text-[#111111] hover:text-[#E5A900] transition-colors cursor-pointer"
                  >
                    Details &rarr;
                  </button>
                  <button
                    onClick={() => onNavigate('quote')}
                    className="text-xs font-bold bg-[#FFC107] hover:bg-[#E5A900] text-[#111111] px-2.5 py-1 rounded transition-colors cursor-pointer"
                  >
                    Get Quote
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Jenga Preview */}
      <section className="py-20 bg-[#EFEFEF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                About Jenga Construction Limited
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
                Engineering Discipline, Safety Standards &amp; Honest Timelines
              </h2>
              <p className="text-base text-neutral-700 leading-relaxed">
                {siteSettings.aboutText}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-white p-4 rounded border border-neutral-200">
                  <h4 className="font-bold text-sm text-[#111111] mb-1">Quality Assurance</h4>
                  <p className="text-xs text-neutral-600">Strict batch concrete slump tests and structural compliance.</p>
                </div>
                <div className="bg-white p-4 rounded border border-neutral-200">
                  <h4 className="font-bold text-sm text-[#111111] mb-1">Worker Safety</h4>
                  <p className="text-xs text-neutral-600">Zero-compromise safety protocols, PPE, and site containment.</p>
                </div>
                <div className="bg-white p-4 rounded border border-neutral-200">
                  <h4 className="font-bold text-sm text-[#111111] mb-1">Client Visibility</h4>
                  <p className="text-xs text-neutral-600">Detailed bills of quantities (BOQ) with transparent stages.</p>
                </div>
              </div>

              <div>
                <button
                  onClick={() => onNavigate('about')}
                  className="px-5 py-2.5 bg-[#111111] hover:bg-[#242424] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors cursor-pointer"
                >
                  Read Full Company Profile
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-[#111111] text-white p-8 rounded-lg border-2 border-[#FFC107]">
                <h3 className="text-lg font-bold mb-4 text-[#FFC107]">Why Clients Choose Jenga</h3>
                <ul className="space-y-4 text-sm text-neutral-300">
                  <li className="flex items-start gap-3">
                    <span className="text-[#FFC107] font-bold text-base mt-0.5">&bull;</span>
                    <div>
                      <strong className="text-white block">Kenyan Topography Knowledge</strong>
                      Engineering tailored to black cotton soils, volcanic rock terrains, and drainage gradient realities.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#FFC107] font-bold text-base mt-0.5">&bull;</span>
                    <div>
                      <strong className="text-white block">Accurate Material Sourcing</strong>
                      Partnerships with trusted aggregate quarries, certified cement distributors, and steel mills.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#FFC107] font-bold text-base mt-0.5">&bull;</span>
                    <div>
                      <strong className="text-white block">Direct WhatsApp Coordination</strong>
                      Quick mobile responsiveness for tenders, site walkthroughs, and progress reports.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
                Portfolio Showcase
              </div>
              <h2 className="text-3xl font-extrabold text-[#111111] tracking-tight">
                Featured Projects
              </h2>
            </div>
            <button
              onClick={() => onNavigate('projects')}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#111111] hover:text-[#E5A900] transition-colors group cursor-pointer"
            >
              <span>Explore All Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white border border-neutral-200 rounded-lg overflow-hidden flex flex-col hover:border-[#FFC107] hover:shadow-lg transition-all"
              >
                <div className="relative aspect-video bg-[#242424] overflow-hidden">
                  {project.coverImage ? (
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-400 text-sm">
                      Site Photograph
                    </div>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  {project.isDemonstration && (
                    <div className="mb-3 px-3 py-1 bg-amber-50 border border-amber-300 text-amber-900 text-xs font-semibold rounded flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>Demonstration Record &bull; Not Actual Work</span>
                    </div>
                  )}

                  <div className="text-xs text-neutral-500 font-semibold mb-1">
                    {project.location} &bull; {project.serviceCategory}
                  </div>

                  <h3 className="text-lg font-bold text-[#111111] mb-2 leading-snug">
                    {project.title}
                  </h3>

                  <p className="text-sm text-neutral-600 leading-relaxed mb-6 flex-grow">
                    {project.summary}
                  </p>

                  <button
                    onClick={() => onSelectProject(project)}
                    className="text-xs font-bold text-[#111111] hover:text-[#E5A900] transition-colors flex items-center gap-1 cursor-pointer mt-auto"
                  >
                    <span>View Project Narrative</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verified Testimonials (Or Disciplined Empty State) */}
      <section className="py-16 bg-[#FAFAFA] border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
              Client Feedback
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight">
              Verified Client Testimonials
            </h2>
          </div>

          {approvedTestimonials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {approvedTestimonials.map((t) => (
                <div key={t.id} className="bg-white p-6 rounded border border-neutral-200">
                  <p className="italic text-sm text-neutral-700 leading-relaxed mb-4">
                    "{t.content}"
                  </p>
                  <div className="border-t border-neutral-100 pt-3">
                    <strong className="block text-sm text-[#111111]">{t.clientName}</strong>
                    <span className="text-xs text-neutral-500">
                      {t.clientRole} {t.organization ? `· ${t.organization}` : ''}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="max-w-xl mx-auto bg-white border border-neutral-200 rounded p-6 text-center text-sm text-neutral-600">
              <ShieldCheck className="w-8 h-8 text-[#FFC107] mx-auto mb-3" />
              <p className="font-semibold text-neutral-900 mb-1">
                Strict Review Standard Active
              </p>
              <p className="text-xs text-neutral-500 mb-4">
                To guarantee complete integrity, testimonials are only displayed publicly once formally validated by the client and confirmed in our Django administrative portal.
              </p>
              <button
                onClick={() => onNavigate('quote')}
                className="text-xs font-bold text-[#111111] bg-[#FFC107] hover:bg-[#E5A900] px-3.5 py-1.5 rounded transition-colors"
              >
                Submit Your Project Details
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Primary Quotation Call-To-Action Banner */}
      <section className="bg-[#111111] text-white py-16 border-b-4 border-[#FFC107]">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ready to Begin Your Construction Project in Kenya?
          </h2>
          <p className="text-base text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            From road paving and culvert installations to residential developments, request a formal estimate or speak directly with our engineering team.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('quote')}
              className="px-6 py-3.5 bg-[#FFC107] hover:bg-[#E5A900] text-[#111111] font-bold text-sm rounded shadow transition-all cursor-pointer"
            >
              Request a Formal Quotation
            </button>
            <a
              href={`https://wa.me/${siteSettings.whatsappNumber}?text=${encodeURIComponent(
                'Hello Jenga Construction Limited, I would like to request a quotation for my project.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-sm rounded flex items-center gap-2 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Direct ({siteSettings.localWhatsappDisplay})</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
