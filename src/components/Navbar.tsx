import React, { useState } from 'react';
import { PageView } from '../types';
import { HardHat, MessageSquare, Terminal, ShieldAlert } from 'lucide-react';

interface NavbarProps {
  currentView: PageView;
  onNavigate: (view: PageView) => void;
  whatsappNumber: string;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, whatsappNumber }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Dev & Architecture Mode Toolbar Banner */}
      <div className="bg-[#111111] text-[#9CA3AF] border-b border-[#242424] text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-[#FFC107] font-semibold">
              <HardHat className="w-3.5 h-3.5" />
              <span>Jenga Construction Limited &bull; Nairobi, Kenya</span>
            </span>
            <span className="hidden sm:inline text-neutral-600">|</span>
            <span className="hidden sm:inline text-neutral-400">WhatsApp: 0792729492 / +{whatsappNumber}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('admin')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1.5 ${
                currentView === 'admin'
                  ? 'bg-[#FFC107] text-[#111111] font-bold'
                  : 'bg-[#242424] text-[#D1D5DB] hover:text-white'
              }`}
            >
              <ShieldAlert className="w-3 h-3" />
              <span>Django Admin Portal</span>
            </button>
            <button
              onClick={() => onNavigate('django-code')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1.5 ${
                currentView === 'django-code'
                  ? 'bg-[#FFC107] text-[#111111] font-bold'
                  : 'bg-[#242424] text-[#D1D5DB] hover:text-white'
              }`}
            >
              <Terminal className="w-3 h-3" />
              <span>Django Code &amp; Guide</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Top Bar adhering strictly to Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-[#111111] text-white border-b-2 border-[#242424] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (Single Element) */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 text-left text-lg md:text-xl font-extrabold tracking-tight whitespace-nowrap shrink-0 group focus:outline-none"
            aria-label="Jenga Construction Limited Home"
          >
            <span className="bg-[#FFC107] text-[#111111] font-black px-2 py-0.5 rounded text-sm group-hover:bg-[#E5A900] transition-colors">
              J
            </span>
            <span className="font-heading">
              JENGA <span className="text-[#FFC107]">CONSTRUCTION</span>
            </span>
          </button>

          {/* Zone 2: Navigation Links (4-5 single-line clean links) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium">
            <button
              onClick={() => onNavigate('home')}
              className={`whitespace-nowrap transition-colors py-1 cursor-pointer ${
                currentView === 'home'
                  ? 'text-[#FFC107] border-b-2 border-[#FFC107]'
                  : 'text-[#D1D5DB] hover:text-white'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('about')}
              className={`whitespace-nowrap transition-colors py-1 cursor-pointer ${
                currentView === 'about'
                  ? 'text-[#FFC107] border-b-2 border-[#FFC107]'
                  : 'text-[#D1D5DB] hover:text-white'
              }`}
            >
              About Us
            </button>
            <button
              onClick={() => onNavigate('services')}
              className={`whitespace-nowrap transition-colors py-1 cursor-pointer ${
                currentView === 'services'
                  ? 'text-[#FFC107] border-b-2 border-[#FFC107]'
                  : 'text-[#D1D5DB] hover:text-white'
              }`}
            >
              Services
            </button>
            <button
              onClick={() => onNavigate('projects')}
              className={`whitespace-nowrap transition-colors py-1 cursor-pointer ${
                currentView === 'projects'
                  ? 'text-[#FFC107] border-b-2 border-[#FFC107]'
                  : 'text-[#D1D5DB] hover:text-white'
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => onNavigate('testimonials')}
              className={`whitespace-nowrap transition-colors py-1 cursor-pointer ${
                currentView === 'testimonials'
                  ? 'text-[#FFC107] border-b-2 border-[#FFC107]'
                  : 'text-[#D1D5DB] hover:text-white'
              }`}
            >
              Testimonials
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className={`whitespace-nowrap transition-colors py-1 cursor-pointer ${
                currentView === 'contact'
                  ? 'text-[#FFC107] border-b-2 border-[#FFC107]'
                  : 'text-[#D1D5DB] hover:text-white'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action CTA Button & Mobile Hamburger */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('quote')}
              className="px-4 py-2.5 text-xs md:text-sm font-bold text-[#111111] bg-[#FFC107] hover:bg-[#E5A900] active:scale-98 transition-all rounded shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
            >
              Request a Quote
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-300 hover:text-white hover:bg-[#242424] rounded focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#1c1c1c] border-t border-[#2d2d2d] px-4 pt-3 pb-5 space-y-2">
            <button
              onClick={() => {
                onNavigate('home');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 px-3 text-sm font-medium rounded hover:bg-[#242424] text-white"
            >
              Home
            </button>
            <button
              onClick={() => {
                onNavigate('about');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 px-3 text-sm font-medium rounded hover:bg-[#242424] text-white"
            >
              About Us
            </button>
            <button
              onClick={() => {
                onNavigate('services');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 px-3 text-sm font-medium rounded hover:bg-[#242424] text-white"
            >
              Services
            </button>
            <button
              onClick={() => {
                onNavigate('projects');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 px-3 text-sm font-medium rounded hover:bg-[#242424] text-white"
            >
              Projects
            </button>
            <button
              onClick={() => {
                onNavigate('testimonials');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 px-3 text-sm font-medium rounded hover:bg-[#242424] text-white"
            >
              Testimonials
            </button>
            <button
              onClick={() => {
                onNavigate('contact');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 px-3 text-sm font-medium rounded hover:bg-[#242424] text-white"
            >
              Contact
            </button>
            <div className="pt-2 border-t border-neutral-700">
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 px-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-sm font-bold rounded"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp (0792729492)</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
