"""
Management command to populate safe demonstration data for Jenga Construction Limited.
All sample projects are explicitly labelled 'Demonstration Project — Not Actual Company Work'.
Testimonials are created as unapproved drafts so they do not leak to public pages.
Supports --clear flag to wipe demo data prior to production deployment.
"""

from django.core.management.base import BaseCommand
from core.models import SiteSettings
from services.models import Service
from projects.models import Project, ProjectImage
from enquiries.models import Testimonial, QuoteRequest, QuoteStatus, ContactMethod

class Command(BaseCommand):
    help = "Seeds initial construction services, demonstration portfolio items, and sample enquiries."

    def add_arguments(self, parser):
        parser.add_argument(
            '--clear',
            action='store_true',
            help='Delete all demonstration projects, testimonials, and sample data.',
        )

    def handle(self, *args, **options):
        if options['clear']:
            self.stdout.write(self.style.WARNING("Clearing demonstration data..."))
            Project.objects.filter(is_demonstration=True).delete()
            Testimonial.objects.filter(is_approved=False).delete()
            self.stdout.write(self.style.SUCCESS("All demonstration projects and unapproved testimonials removed."))
            return

        self.stdout.write("Initializing Site Settings...")
        settings_obj = SiteSettings.get_settings()
        settings_obj.company_name = "Jenga Construction Limited"
        settings_obj.whatsapp_number = "254792729492"
        settings_obj.local_whatsapp_display = "0792729492"
        settings_obj.location_general = "Nairobi, Kenya"
        settings_obj.save()

        self.stdout.write("Creating proposed construction service categories...")
        services_data = [
            {
                'title': 'Road Construction',
                'short_description': 'Pavement engineering, rural and urban access road rehabilitation, asphalt surfacing, and stormwater culverts.',
                'description': (
                    "Jenga Construction Limited provides comprehensive road engineering solutions including site grading, "
                    "sub-base compaction, flexible and rigid pavement installation, urban arterial upgrades, and drainage "
                    "infrastructure. Every project is executed strictly to Kenya National Highways Authority (KeNHA) and "
                    "Kenya Urban Roads Authority (KURA) engineering guidelines."
                ),
                'display_order': 1,
            },
            {
                'title': 'Bridge Construction',
                'short_description': 'Reinforced concrete substructures, pedestrian overpasses, culvert bridges, and river crossing structural civil works.',
                'description': (
                    "Our structural engineering civil works encompass reinforced concrete piers, abutments, pre-stressed deck "
                    "beams, box culverts, and foundation piling for river crossings. We conduct hydrological assessments and soil "
                    "mechanics investigations to guarantee long-term hydraulic stability."
                ),
                'display_order': 2,
            },
            {
                'title': 'Building Construction',
                'short_description': 'Residential developments, commercial multi-storey buildings, structural concrete frameworks, and renovations.',
                'description': (
                    "From groundbreaking excavation to turn-key structural handover, we construct residential villas, modern apartments, "
                    "and commercial premises. Services include foundation footings, reinforced columns, structural masonry, MEP conduit "
                    "coordination, interior finishing, and architectural renovations across Nairobi and surrounding counties."
                ),
                'display_order': 3,
            },
            {
                'title': 'Landscaping Services',
                'short_description': 'Commercial outdoor grounds planning, paving, lawn establishment, retaining walls, and aesthetic exterior drainage.',
                'description': (
                    "Transforming open land into sustainable, well-drained outdoor environments. We execute grading, interlocking cabro "
                    "paving for driveways and parking bays, terraced stone retaining walls, erosion control sodding, and perimeter perimeter "
                    "landscape architecture."
                ),
                'display_order': 4,
            },
            {
                'title': 'Additional Civil & Earthworks',
                'short_description': 'Excavation, bulk site clearing, rock breaking, deep foundation drainage, and structural earth retention.',
                'description': (
                    "Heavy earthmoving operations, site clearing, soil stabilization, deep trenching, retaining gabion installations, "
                    "and industrial stormwater drainage infrastructure for greenfield and brownfield sites."
                ),
                'display_order': 5,
            },
        ]

        services_map = {}
        for s_data in services_data:
            service_obj, created = Service.objects.update_or_create(
                title=s_data['title'],
                defaults={
                    'short_description': s_data['short_description'],
                    'description': s_data['description'],
                    'display_order': s_data['display_order'],
                    'is_published': True,
                }
            )
            services_map[s_data['title']] = service_obj
            status_text = "Created" if created else "Updated"
            self.stdout.write(f"  - [{status_text}] Service: {service_obj.title}")

        self.stdout.write("Creating demonstration portfolio projects (clearly labelled as demonstration)...")
        demo_projects = [
            {
                'title': 'Demonstration Project — Urban Access Road Upgrade',
                'service': services_map.get('Road Construction'),
                'summary': 'Demonstration Road Work — Pavement grading, heavy base compaction, and roadside storm drainage.',
                'description': (
                    "SAMPLE SPECIFICATION RECORD (NOT ACTUAL COMPANY WORK):\n"
                    "This record illustrates how road construction projects are presented on the Jenga Construction website. "
                    "It showcases subgrade preparation, aggregate base application, and dual-side concrete trapezoidal drains. "
                    "Before official website launch, the administrator should replace this record with verified company contracts."
                ),
                'location': 'Nairobi County, Kenya',
                'is_featured': True,
                'is_published': True,
                'is_demonstration': True,
            },
            {
                'title': 'Demonstration Project — Reinforced Concrete Box Culvert',
                'service': services_map.get('Bridge Construction'),
                'summary': 'Demonstration Structural Civil Work — Hydraulic drainage crossing with reinforced concrete wing walls.',
                'description': (
                    "SAMPLE SPECIFICATION RECORD (NOT ACTUAL COMPANY WORK):\n"
                    "Illustrative civil works entry detailing double-cell reinforced concrete box culvert engineering, "
                    "designed for 50-year flood event capacity with riprap scouring protection."
                ),
                'location': 'Kiambu County, Kenya',
                'is_featured': True,
                'is_published': True,
                'is_demonstration': True,
            },
            {
                'title': 'Demonstration Project — Commercial Office Framework',
                'service': services_map.get('Building Construction'),
                'summary': 'Demonstration Commercial Structure — Cast-in-situ reinforced concrete columns and precast slab layout.',
                'description': (
                    "SAMPLE SPECIFICATION RECORD (NOT ACTUAL COMPANY WORK):\n"
                    "Demonstrates building construction capabilities, beam-slab reinforcement schedules, and masonry cladding. "
                    "To be replaced with genuine Jenga building accomplishments."
                ),
                'location': 'Westlands, Nairobi, Kenya',
                'is_featured': True,
                'is_published': True,
                'is_demonstration': True,
            },
            {
                'title': 'Demonstration Project — Commercial Cabro & Landscape Terraces',
                'service': services_map.get('Landscaping Services'),
                'summary': 'Demonstration Landscape — Interlocking cabro paving, perimeter stone planters, and natural turf.',
                'description': (
                    "SAMPLE SPECIFICATION RECORD (NOT ACTUAL COMPANY WORK):\n"
                    "Sample outdoor space development showing grading, French drains, heavy-duty paving blocks, and perimeter plants."
                ),
                'location': 'Karen, Nairobi, Kenya',
                'is_featured': False,
                'is_published': True,
                'is_demonstration': True,
            },
        ]

        for p_data in demo_projects:
            project_obj, created = Project.objects.update_or_create(
                title=p_data['title'],
                defaults={
                    'service': p_data['service'],
                    'summary': p_data['summary'],
                    'description': p_data['description'],
                    'location': p_data['location'],
                    'is_featured': p_data['is_featured'],
                    'is_published': p_data['is_published'],
                    'is_demonstration': p_data['is_demonstration'],
                }
            )
            status_text = "Created" if created else "Updated"
            self.stdout.write(f"  - [{status_text}] Demo Project: {project_obj.title}")

        self.stdout.write("Creating sample unapproved testimonials (safe; hidden from public)...")
        # Notice: is_approved=False and is_published=False so nothing leaks to visitors
        Testimonial.objects.get_or_create(
            client_name="Sample Property Client (Draft Placeholder)",
            defaults={
                'organization': "Private Residential Developer",
                'client_role': "Homeowner",
                'content': (
                    "DRAFT TESTIMONIAL PLACEHOLDER: The construction team provided clear bill of quantities "
                    "and transparent project timelines throughout our residential foundation phase."
                ),
                'is_approved': False,
                'is_published': False,
            }
        )

        self.stdout.write(self.style.SUCCESS("Successfully seeded Jenga Construction demo database!"))
