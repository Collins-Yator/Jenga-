"""
Views for Construction Services.
"""

from urllib.parse import quote
from django.shortcuts import render, get_object_or_404
from django.conf import settings
from .models import Service
from core.models import SiteSettings

def service_list(request):
    """
    Renders the public catalog of published services.
    """
    services = Service.objects.filter(is_published=True).order_by('display_order', 'title')
    return render(request, 'services/service_list.html', {
        'services': services,
        'page_title': "Our Construction & Civil Engineering Services",
    })

def service_detail(request, slug):
    """
    Renders detailed view for a specific published service.
    Returns 404 if the service does not exist or is unpublished.
    """
    service = get_object_or_404(Service, slug=slug, is_published=True)

    # Generate specific WhatsApp click-to-chat URL for this service
    try:
        site_settings = SiteSettings.get_settings()
        whatsapp_number = site_settings.whatsapp_number
    except Exception:
        whatsapp_number = getattr(settings, 'JENGA_WHATSAPP_NUMBER', '254792729492')

    whatsapp_msg = f"Hello Jenga Construction Limited, I would like to enquire about your {service.title} services."
    whatsapp_url = f"https://wa.me/{whatsapp_number}?text={quote(whatsapp_msg)}"

    # Other services for quick navigation
    related_services = Service.objects.filter(is_published=True).exclude(pk=service.pk)[:4]

    return render(request, 'services/service_detail.html', {
        'service': service,
        'whatsapp_url': whatsapp_url,
        'related_services': related_services,
    })
