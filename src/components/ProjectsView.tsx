import React, { useState } from 'react';
import { PageView, ProjectItem } from '../types';
import { AlertTriangle, ArrowRight, MessageSquare, X, Maximize2 } from 'lucide-react';

interface ProjectsViewProps {
  projects: ProjectItem[];
  onNavigate: (view: PageView) => void;
  whatsappNumber: string;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ projects, onNavigate, whatsappNumber }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProjectModal, setActiveProjectModal] = useState<ProjectItem | null>(null);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  const categories = ['All', 'Road Construction', 'Bridge Construction', 'Building Construction', 'Landscaping Services'];

  const filteredProjects = projects.filter((p) => {
    if (!p.isPublished) return false;
    if (selectedCategory === 'All') return true;
    return p.serviceCategory === selectedCategory;
  });

  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      {/* Header */}
      <section className="bg-[#111111] text-white py-16 border-b-4 border-[#FFC107]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs font-bold uppercase tracking-widest text-[#FFC107] mb-2">
            Portfolio Showcase &bull; Demonstrations
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Construction Projects &amp; Civil Works
          </h1>
          <p className="text-lg text-neutral-300 max-w-3xl leading-relaxed">
            Detailed engineering records illustrating road formations, reinforced culverts, commercial structures, and exterior landscaping.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-neutral-300">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#111111] text-[#FFC107]'
                  : 'bg-white text-neutral-700 hover:bg-neutral-200 border border-neutral-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white border border-neutral-200 rounded-lg overflow-hidden flex flex-col hover:border-[#FFC107] hover:shadow-lg transition-all"
            >
              <div
                className="relative aspect-video bg-[#242424] cursor-pointer group overflow-hidden"
                onClick={() => setActiveProjectModal(project)}
              >
                {project.coverImage ? (
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-neutral-400 text-sm">
                    Site Photo
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-xs font-bold gap-1.5">
                  <Maximize2 className="w-4 h-4 text-[#FFC107]" />
                  <span>Inspect Narrative</span>
                </div>
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
                  onClick={() => setActiveProjectModal(project)}
                  className="text-xs font-bold text-[#111111] hover:text-[#E5A900] transition-colors flex items-center gap-1 cursor-pointer mt-auto"
                >
                  <span>View Project Narrative</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 bg-white rounded-lg border border-neutral-200">
            <h3 className="text-lg font-bold text-[#111111] mb-2">No projects found in this category</h3>
            <p className="text-sm text-neutral-500 mb-4">
              Select another discipline or view all categories.
            </p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="px-4 py-2 bg-[#111111] text-white text-xs font-bold uppercase tracking-wider rounded"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* Project Detail Modal */}
      {activeProjectModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveProjectModal(null)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-neutral-900 p-1 rounded-full cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            {activeProjectModal.isDemonstration && (
              <div className="mb-4 px-3 py-1.5 bg-amber-50 border border-amber-300 text-amber-900 text-xs font-semibold rounded flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  Demonstration Portfolio Entry: Replace with verified Jenga client photographs prior to public launch.
                </span>
              </div>
            )}

            <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1">
              {activeProjectModal.serviceCategory} &bull; {activeProjectModal.location}
            </div>
            <h3 className="text-2xl font-bold text-[#111111] mb-4">{activeProjectModal.title}</h3>

            {activeProjectModal.coverImage && (
              <div
                className="aspect-video rounded overflow-hidden mb-6 bg-neutral-900 cursor-pointer relative group"
                onClick={() => setLightboxImg(activeProjectModal.coverImage!)}
              >
                <img
                  src={activeProjectModal.coverImage}
                  alt={activeProjectModal.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2.5 py-1 rounded flex items-center gap-1">
                  <Maximize2 className="w-3 h-3 text-[#FFC107]" />
                  <span>Enlarge Photo</span>
                </div>
              </div>
            )}

            <div className="space-y-4 text-sm text-neutral-700 leading-relaxed mb-6">
              <div className="bg-neutral-50 p-4 rounded border border-neutral-200">
                <h4 className="font-bold text-neutral-900 mb-1">Scope Summary:</h4>
                <p>{activeProjectModal.summary}</p>
              </div>

              <div>
                <h4 className="font-bold text-neutral-900 mb-1">Engineering Narrative:</h4>
                <p className="whitespace-pre-line text-neutral-700">{activeProjectModal.description}</p>
              </div>
            </div>

            {/* Gallery Thumbnails */}
            {activeProjectModal.galleryImages.length > 0 && (
              <div className="mb-6">
                <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-500 mb-2">
                  Additional Site Photographs
                </h4>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {activeProjectModal.galleryImages.map((imgUrl, idx) => (
                    <img
                      key={idx}
                      src={imgUrl}
                      alt={`Gallery thumbnail ${idx + 1}`}
                      className="w-24 h-16 object-cover rounded border border-neutral-300 cursor-pointer hover:border-[#FFC107]"
                      onClick={() => setLightboxImg(imgUrl)}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="border-t border-neutral-200 pt-6 flex flex-wrap gap-4">
              <button
                onClick={() => {
                  setActiveProjectModal(null);
                  onNavigate('quote');
                }}
                className="px-5 py-2.5 bg-[#FFC107] hover:bg-[#E5A900] text-[#111111] font-bold text-xs uppercase tracking-wider rounded transition-colors"
              >
                Enquire for Similar Project
              </button>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                  `Hello Jenga Construction Limited, I am interested in work similar to: '${activeProjectModal.title}'.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs uppercase tracking-wider rounded flex items-center gap-2 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Discuss on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Overlay */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-60 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setLightboxImg(null)}
        >
          <div className="relative max-w-4xl max-h-[85vh]">
            <img src={lightboxImg} alt="Enlarged site photograph" className="max-w-full max-h-[85vh] object-contain rounded" />
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute -top-10 right-0 text-white text-sm font-bold bg-neutral-800 px-3 py-1 rounded"
            >
              Close [ESC]
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
