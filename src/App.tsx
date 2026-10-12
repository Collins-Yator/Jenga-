/**
 * Jenga Construction Limited - Web Application
 * Nairobi, Kenya
 */

import React, { useState, useEffect } from 'react';
import {
  PageView,
  ServiceItem,
  ProjectItem,
  QuoteRequestItem,
  ContactMessageItem,
  TestimonialItem,
  SiteSettingsData,
  QuoteStatus,
} from './types';
import {
  initialSiteSettings,
  initialServices,
  initialProjects,
  initialTestimonials,
} from './data/initialData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppFloating } from './components/WhatsAppFloating';
import { HomeView } from './components/HomeView';
import { AboutView } from './components/AboutView';
import { ServicesView } from './components/ServicesView';
import { ProjectsView } from './components/ProjectsView';
import { QuoteRequestView } from './components/QuoteRequestView';
import { ContactView } from './components/ContactView';
import { TestimonialsView } from './components/TestimonialsView';
import { AdminPortalView } from './components/AdminPortalView';
import { DjangoCodeExplorerView } from './components/DjangoCodeExplorerView';

export default function App() {
  const [currentView, setCurrentView] = useState<PageView>('home');
  const [services] = useState<ServiceItem[]>(initialServices);
  const [projects] = useState<ProjectItem[]>(initialProjects);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(() => {
    const saved = localStorage.getItem('jenga_testimonials');
    return saved ? JSON.parse(saved) : initialTestimonials;
  });

  const [siteSettings, setSiteSettings] = useState<SiteSettingsData>(() => {
    const saved = localStorage.getItem('jenga_site_settings');
    return saved ? JSON.parse(saved) : initialSiteSettings;
  });

  const [quoteRequests, setQuoteRequests] = useState<QuoteRequestItem[]>(() => {
    const saved = localStorage.getItem('jenga_quotes');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: '1',
        referenceNumber: 'JCL-20261012-4829',
        fullName: 'David Mwangi (Sample Initial Enquiry)',
        phoneNumber: '0792729492',
        email: 'david.mwangi@example.com',
        serviceCategory: 'Road Construction',
        projectLocation: 'Kilimani, Nairobi',
        projectDescription: 'Pavement upgrading and roadside drainage excavation for private access corridor.',
        estimatedBudget: 'KES 3,500,000',
        preferredContactMethod: 'WHATSAPP',
        consentGiven: true,
        status: 'NEW',
        internalNotes: 'Site inspection scheduled with Senior Civil Engineer.',
        createdAt: new Date().toISOString(),
      },
    ];
  });

  const [contactMessages, setContactMessages] = useState<ContactMessageItem[]>(() => {
    const saved = localStorage.getItem('jenga_messages');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: '1',
        name: 'Faith Wanjiku',
        email: 'faith.wanjiku@example.com',
        phone: '0712345678',
        subject: 'Inquiry on Concrete Box Culverts',
        message: 'Hello, we require reinforced box culverts for an agricultural property in Kiambu.',
        consentGiven: true,
        isRead: false,
        createdAt: new Date().toISOString(),
      },
    ];
  });

  const [preselectedQuoteService, setPreselectedQuoteService] = useState<string>('');

  // Save changes to localStorage for persistent session
  useEffect(() => {
    localStorage.setItem('jenga_quotes', JSON.stringify(quoteRequests));
  }, [quoteRequests]);

  useEffect(() => {
    localStorage.setItem('jenga_messages', JSON.stringify(contactMessages));
  }, [contactMessages]);

  useEffect(() => {
    localStorage.setItem('jenga_testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem('jenga_site_settings', JSON.stringify(siteSettings));
  }, [siteSettings]);

  // Handlers
  const handleNavigate = (view: PageView) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectServiceFromHome = (service: ServiceItem) => {
    setPreselectedQuoteService(service.slug);
    setCurrentView('services');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProjectFromHome = (project: ProjectItem) => {
    setCurrentView('projects');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitQuote = (quote: QuoteRequestItem) => {
    setQuoteRequests((prev) => [quote, ...prev]);
  };

  const handleSubmitContact = (msg: ContactMessageItem) => {
    setContactMessages((prev) => [msg, ...prev]);
  };

  const handleUpdateQuoteStatus = (id: string, status: QuoteStatus, internalNotes: string) => {
    setQuoteRequests((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status, internalNotes } : q))
    );
  };

  const handleToggleMessageRead = (id: string) => {
    setContactMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isRead: !m.isRead } : m))
    );
  };

  const handleApproveTestimonial = (id: number, approved: boolean, published: boolean) => {
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isApproved: approved, isPublished: published } : t))
    );
  };

  const handleUpdateSiteSettings = (newSettings: SiteSettingsData) => {
    setSiteSettings(newSettings);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-[#FFC107] selection:text-[#111111]">
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        whatsappNumber={siteSettings.whatsappNumber}
      />

      <main className="flex-grow">
        {currentView === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onSelectService={handleSelectServiceFromHome}
            onSelectProject={handleSelectProjectFromHome}
            services={services}
            projects={projects}
            testimonials={testimonials}
            siteSettings={siteSettings}
          />
        )}

        {currentView === 'about' && (
          <AboutView onNavigate={handleNavigate} siteSettings={siteSettings} />
        )}

        {currentView === 'services' && (
          <ServicesView
            services={services}
            onNavigate={handleNavigate}
            onPreselectServiceForQuote={(slug) => setPreselectedQuoteService(slug)}
            whatsappNumber={siteSettings.whatsappNumber}
          />
        )}

        {currentView === 'projects' && (
          <ProjectsView
            projects={projects}
            onNavigate={handleNavigate}
            whatsappNumber={siteSettings.whatsappNumber}
          />
        )}

        {currentView === 'quote' && (
          <QuoteRequestView
            services={services}
            preselectedServiceSlug={preselectedQuoteService}
            onNavigate={handleNavigate}
            onSubmitQuote={handleSubmitQuote}
            whatsappNumber={siteSettings.whatsappNumber}
          />
        )}

        {currentView === 'contact' && (
          <ContactView
            onNavigate={handleNavigate}
            onSubmitContact={handleSubmitContact}
            siteSettings={siteSettings}
          />
        )}

        {currentView === 'testimonials' && (
          <TestimonialsView
            testimonials={testimonials}
            onNavigate={handleNavigate}
            whatsappNumber={siteSettings.whatsappNumber}
          />
        )}

        {currentView === 'admin' && (
          <AdminPortalView
            quoteRequests={quoteRequests}
            onUpdateQuoteStatus={handleUpdateQuoteStatus}
            contactMessages={contactMessages}
            onToggleMessageRead={handleToggleMessageRead}
            testimonials={testimonials}
            onApproveTestimonial={handleApproveTestimonial}
            siteSettings={siteSettings}
            onUpdateSiteSettings={handleUpdateSiteSettings}
          />
        )}

        {currentView === 'django-code' && <DjangoCodeExplorerView />}
      </main>

      {/* Floating WhatsApp button on public views */}
      {currentView !== 'admin' && currentView !== 'django-code' && (
        <WhatsAppFloating whatsappNumber={siteSettings.whatsappNumber} />
      )}

      {/* Footer on public pages */}
      {currentView !== 'admin' && currentView !== 'django-code' && (
        <Footer
          onNavigate={handleNavigate}
          whatsappNumber={siteSettings.whatsappNumber}
          localPhone={siteSettings.localWhatsappDisplay}
          publicEmail={siteSettings.publicEmail}
          location={siteSettings.locationGeneral}
        />
      )}
    </div>
  );
}
