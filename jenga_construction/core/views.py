"""
Core website views: Homepage, About Us, Contact, and System Error Handlers.
"""

from urllib.parse import quote
from django.shortcuts import render
from django.http import HttpResponse
from django.conf import settings
from .models import SiteSettings
from services.models import Service
from projects.models import Project
from enquiries.models import Testimonial
from enquiries.forms import ContactMessageForm

def home(request):
    """
    Renders the main landing page with hero, service cards, featured projects,
    about preview, verified testimonials, and quotation CTA.
    """
    services = Service.objects.filter(is_published=True).order_by('display_order', 'title')[:4]
    featured_projects = Project.objects.filter(
        is_published=True,
        is_featured=True
    ).select_related('service')[:3]

    # Only approved and published testimonials are shown
    testimonials = Testimonial.objects.filter(
        is_approved=True,
        is_published=True
    ).select_related('related_project')[:3]

    # Pre-filled WhatsApp message for general enquiries
    whatsapp_general_msg = "Hello Jenga Construction Limited, I would like to enquire about your construction services."
    whatsapp_quote_msg = "Hello Jenga Construction Limited, I would like to request a quotation for my construction project."

    try:
        site_settings = SiteSettings.get_settings()
        whatsapp_number = site_settings.whatsapp_number
    except Exception:
        whatsapp_number = getattr(settings, 'JENGA_WHATSAPP_NUMBER', '254792729492')

    whatsapp_general_url = f"https://wa.me/{whatsapp_number}?text={quote(whatsapp_general_msg)}"
    whatsapp_quote_url = f"https://wa.me/{whatsapp_number}?text={quote(whatsapp_quote_msg)}"

    return render(request, 'core/home.html', {
        'services': services,
        'featured_projects': featured_projects,
        'testimonials': testimonials,
        'whatsapp_general_url': whatsapp_general_url,
        'whatsapp_quote_url': whatsapp_quote_url,
    })


def about(request):
    """
    Renders About Us page with company overview, draft mission/vision,
    and commitments to safety, quality, and rigorous planning.
    """
    return render(request, 'core/about.html', {
        'page_title': "About Jenga Construction Limited | Civil Engineering & Building",
    })


def contact(request):
    """
    Renders the Contact Us page with contact form, general Nairobi location,
    and configurable Google Maps embed.
    """
    form = ContactMessageForm()
    return render(request, 'core/contact.html', {
        'form': form,
        'page_title': "Contact Jenga Construction Limited | Nairobi, Kenya",
    })


def robots_txt(request):
    """
    Serves search engine crawler instructions.
    """
    lines = [
        "User-agent: *",
        "Disallow: /admin/",
        "Disallow: /enquiries/quote/success/",
        "Disallow: /enquiries/contact/success/",
        f"Sitemap: {request.build_absolute_uri('/sitemap.xml')}",
    ]
    return HttpResponse("\n".join(lines), content_type="text/plain")


def sitemap_xml(request):
    """
    Generates dynamic XML sitemap for search engines for all published content.
    """
    domain = request.build_absolute_uri('/').rstrip('/')
    services = Service.objects.filter(is_published=True)
    projects = Project.objects.filter(is_published=True)

    xml_lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        f'  <url><loc>{domain}/</loc><priority>1.0</priority><changefreq>weekly</changefreq></url>',
        f'  <url><loc>{domain}/about/</loc><priority>0.8</priority><changefreq>monthly</changefreq></url>',
        f'  <url><loc>{domain}/services/</loc><priority>0.9</priority><changefreq>weekly</changefreq></url>',
        f'  <url><loc>{domain}/projects/</loc><priority>0.9</priority><changefreq>weekly</changefreq></url>',
        f'  <url><loc>{domain}/contact/</loc><priority>0.8</priority><changefreq>monthly</changefreq></url>',
        f'  <url><loc>{domain}/enquiries/quote/</loc><priority>0.9</priority><changefreq>monthly</changefreq></url>',
    ]

    for s in services:
        xml_lines.append(
            f'  <url><loc>{domain}{s.get_absolute_url()}</loc><priority>0.8</priority><changefreq>monthly</changefreq></url>'
        )

    for p in projects:
        xml_lines.append(
            f'  <url><loc>{domain}{p.get_absolute_url()}</loc><priority>0.7</priority><changefreq>monthly</changefreq></url>'
        )

    xml_lines.append('</urlset>')
    return HttpResponse("\n".join(xml_lines), content_type="application/xml")


def custom_permission_denied_view(request, exception=None):
    """HTTP 403 Forbidden handler."""
    return render(request, 'errors/403.html', status=403)


def custom_page_not_found_view(request, exception=None):
    """HTTP 404 Not Found handler."""
    return render(request, 'errors/404.html', status=404)


def custom_server_error_view(request):
    """HTTP 500 Internal Server Error handler."""
    return render(request, 'errors/500.html', status=500)
