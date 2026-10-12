export type PageView =
  | 'home'
  | 'about'
  | 'services'
  | 'projects'
  | 'quote'
  | 'contact'
  | 'testimonials'
  | 'admin'
  | 'django-code';

export interface ServiceItem {
  id: number;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  displayOrder: number;
  isPublished: boolean;
  categoryIcon: string;
}

export interface ProjectItem {
  id: number;
  title: string;
  slug: string;
  serviceCategory: string;
  location: string;
  summary: string;
  description: string;
  startDate?: string;
  completionDate?: string;
  coverImage?: string;
  galleryImages: string[];
  isFeatured: boolean;
  isPublished: boolean;
  isDemonstration: boolean;
}

export type QuoteStatus =
  | 'NEW'
  | 'CONTACTED'
  | 'IN_PROGRESS'
  | 'QUOTATION_SENT'
  | 'ACCEPTED'
  | 'DECLINED'
  | 'CLOSED';

export type ContactMethod = 'WHATSAPP' | 'PHONE_CALL' | 'EMAIL';

export interface QuoteRequestItem {
  id: string;
  referenceNumber: string;
  fullName: string;
  phoneNumber: string;
  email?: string;
  serviceCategory: string;
  projectLocation: string;
  projectDescription: string;
  estimatedBudget?: string;
  preferredStartDate?: string;
  preferredContactMethod: ContactMethod;
  consentGiven: boolean;
  status: QuoteStatus;
  internalNotes: string;
  createdAt: string;
}

export interface ContactMessageItem {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  consentGiven: boolean;
  isRead: boolean;
  internalNotes?: string;
  createdAt: string;
}

export interface TestimonialItem {
  id: number;
  clientName: string;
  organization?: string;
  clientRole?: string;
  content: string;
  relatedProject?: string;
  isApproved: boolean;
  isPublished: boolean;
  createdAt: string;
}

export interface SiteSettingsData {
  companyName: string;
  tagline: string;
  whatsappNumber: string;
  localWhatsappDisplay: string;
  publicEmail: string;
  notificationEmail: string;
  locationGeneral: string;
  googleMapsEmbedUrl: string;
  businessHours: string;
  aboutText: string;
  missionStatement: string;
  visionStatement: string;
}
