import { ServiceItem, ProjectItem, SiteSettingsData, TestimonialItem } from '../types';

export const initialSiteSettings: SiteSettingsData = {
  companyName: 'Jenga Construction Limited',
  tagline: 'Building Strong Foundations. Creating Lasting Futures.',
  whatsappNumber: '254792729492',
  localWhatsappDisplay: '0792729492',
  publicEmail: '', // Kept empty until verified by company
  notificationEmail: 'info@jengaconstruction.co.ke',
  locationGeneral: 'Nairobi, Kenya',
  googleMapsEmbedUrl: '', // Configurable via Admin
  businessHours: 'Monday - Friday: 8:00 AM - 5:00 PM (EAT) | Saturday: 8:00 AM - 1:00 PM',
  aboutText:
    'Jenga Construction Limited is a civil engineering and construction company based in Nairobi, Kenya. We specialize in road construction, bridges, residential and commercial buildings, site preparation, and professional landscaping services. Our focus is delivering structurally sound, cost-effective, and enduring works.',
  missionStatement:
    'Draft Mission (Pending Official Review): To deliver enduring, quality infrastructure and structural construction projects across Kenya that empower communities and exceed client expectations through rigorous engineering, safety standards, and integrity.',
  visionStatement:
    "Draft Vision (Pending Official Review): To become Kenya's foremost trusted partner in sustainable infrastructure development and architectural engineering.",
};

export const initialServices: ServiceItem[] = [
  {
    id: 1,
    title: 'Road Construction',
    slug: 'road-construction',
    shortDescription:
      'Pavement engineering, rural and urban access road rehabilitation, asphalt surfacing, and stormwater culverts.',
    description:
      'Jenga Construction Limited provides comprehensive road engineering solutions including site grading, sub-base compaction, flexible and rigid pavement installation, urban arterial upgrades, and drainage infrastructure. Every project is executed strictly to Kenya National Highways Authority (KeNHA) and Kenya Urban Roads Authority (KURA) engineering guidelines.',
    displayOrder: 1,
    isPublished: true,
    categoryIcon: 'Route',
  },
  {
    id: 2,
    title: 'Bridge Construction',
    slug: 'bridge-construction',
    shortDescription:
      'Reinforced concrete substructures, pedestrian overpasses, culvert bridges, and river crossing structural civil works.',
    description:
      'Our structural engineering civil works encompass reinforced concrete piers, abutments, pre-stressed deck beams, box culverts, and foundation piling for river crossings. We conduct hydrological assessments and soil mechanics investigations to guarantee long-term hydraulic stability.',
    displayOrder: 2,
    isPublished: true,
    categoryIcon: 'Layers',
  },
  {
    id: 3,
    title: 'Building Construction',
    slug: 'building-construction',
    shortDescription:
      'Residential developments, commercial multi-storey buildings, structural concrete frameworks, and renovations.',
    description:
      'From groundbreaking excavation to turn-key structural handover, we construct residential villas, modern apartments, and commercial premises. Services include foundation footings, reinforced columns, structural masonry, MEP conduit coordination, interior finishing, and architectural renovations across Nairobi and surrounding counties.',
    displayOrder: 3,
    isPublished: true,
    categoryIcon: 'Building2',
  },
  {
    id: 4,
    title: 'Landscaping Services',
    slug: 'landscaping-services',
    shortDescription:
      'Commercial outdoor grounds planning, paving, lawn establishment, retaining walls, and aesthetic exterior drainage.',
    description:
      'Transforming open land into sustainable, well-drained outdoor environments. We execute grading, interlocking cabro paving for driveways and parking bays, terraced stone retaining walls, erosion control sodding, and perimeter landscape architecture.',
    displayOrder: 4,
    isPublished: true,
    categoryIcon: 'Trees',
  },
  {
    id: 5,
    title: 'Additional Civil & Earthworks',
    slug: 'civil-earthworks',
    shortDescription:
      'Excavation, bulk site clearing, rock breaking, deep foundation drainage, and structural earth retention.',
    description:
      'Heavy earthmoving operations, site clearing, soil stabilization, deep trenching, retaining gabion installations, and industrial stormwater drainage infrastructure for greenfield and brownfield sites.',
    displayOrder: 5,
    isPublished: true,
    categoryIcon: 'Shovel',
  },
];

export const initialProjects: ProjectItem[] = [
  {
    id: 1,
    title: 'Demonstration Project — Urban Access Road Upgrade',
    slug: 'demo-urban-access-road',
    serviceCategory: 'Road Construction',
    location: 'Nairobi County, Kenya',
    summary:
      'Demonstration Road Work — Pavement grading, heavy base compaction, and roadside storm drainage.',
    description:
      'SAMPLE SPECIFICATION RECORD (NOT ACTUAL COMPANY WORK):\nThis record illustrates how road construction projects are presented on the Jenga Construction website. It showcases subgrade preparation, aggregate base application, and dual-side concrete trapezoidal drains. Before official website launch, the administrator should replace this record with verified company contracts.',
    startDate: '2025-02-01',
    completionDate: '2025-08-30',
    galleryImages: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb1861564?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    ],
    coverImage:
      'https://images.unsplash.com/photo-1541888946425-d0fbb1861564?auto=format&fit=crop&w=1200&q=80',
    isFeatured: true,
    isPublished: true,
    isDemonstration: true,
  },
  {
    id: 2,
    title: 'Demonstration Project — Reinforced Concrete Box Culvert',
    slug: 'demo-box-culvert-crossing',
    serviceCategory: 'Bridge Construction',
    location: 'Kiambu County, Kenya',
    summary:
      'Demonstration Structural Civil Work — Hydraulic drainage crossing with reinforced concrete wing walls.',
    description:
      'SAMPLE SPECIFICATION RECORD (NOT ACTUAL COMPANY WORK):\nIllustrative civil works entry detailing double-cell reinforced concrete box culvert engineering, designed for 50-year flood event capacity with riprap scouring protection.',
    startDate: '2025-04-10',
    completionDate: '2025-09-15',
    galleryImages: [
      'https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&w=1200&q=80',
    ],
    coverImage:
      'https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&w=1200&q=80',
    isFeatured: true,
    isPublished: true,
    isDemonstration: true,
  },
  {
    id: 3,
    title: 'Demonstration Project — Commercial Office Framework',
    slug: 'demo-commercial-office-framework',
    serviceCategory: 'Building Construction',
    location: 'Westlands, Nairobi, Kenya',
    summary:
      'Demonstration Commercial Structure — Cast-in-situ reinforced concrete columns and precast slab layout.',
    description:
      'SAMPLE SPECIFICATION RECORD (NOT ACTUAL COMPANY WORK):\nDemonstrates building construction capabilities, beam-slab reinforcement schedules, and masonry cladding. To be replaced with genuine Jenga building accomplishments.',
    startDate: '2025-06-01',
    completionDate: '2026-01-20',
    galleryImages: [
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
    ],
    coverImage:
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
    isFeatured: true,
    isPublished: true,
    isDemonstration: true,
  },
  {
    id: 4,
    title: 'Demonstration Project — Commercial Cabro & Landscape Terraces',
    slug: 'demo-cabro-landscaping',
    serviceCategory: 'Landscaping Services',
    location: 'Karen, Nairobi, Kenya',
    summary:
      'Demonstration Landscape — Interlocking cabro paving, perimeter stone planters, and natural turf.',
    description:
      'SAMPLE SPECIFICATION RECORD (NOT ACTUAL COMPANY WORK):\nSample outdoor space development showing grading, French drains, heavy-duty paving blocks, and perimeter plants.',
    startDate: '2025-08-01',
    completionDate: '2025-11-10',
    galleryImages: [
      'https://images.unsplash.com/photo-1584463699042-325db1728135?auto=format&fit=crop&w=1200&q=80',
    ],
    coverImage:
      'https://images.unsplash.com/photo-1584463699042-325db1728135?auto=format&fit=crop&w=1200&q=80',
    isFeatured: false,
    isPublished: true,
    isDemonstration: true,
  },
];

export const initialTestimonials: TestimonialItem[] = [
  {
    id: 1,
    clientName: 'Sample Property Client (Draft Placeholder)',
    organization: 'Private Residential Developer',
    clientRole: 'Homeowner',
    content:
      'DRAFT TESTIMONIAL PLACEHOLDER: The construction team provided clear bill of quantities and transparent project timelines throughout our residential foundation phase.',
    isApproved: false, // Strict requirement: unapproved testimonials are kept private!
    isPublished: false,
    createdAt: '2026-03-01',
  },
];
