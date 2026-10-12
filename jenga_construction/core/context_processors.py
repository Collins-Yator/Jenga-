"""
Context processors to supply company profile and WhatsApp links across all Django templates.
"""
from django.conf import settings
from .models import SiteSettings

def company_settings(request):
    """
    Supplies site-wide company settings, WhatsApp click-to-chat links,
    and business metadata to every Django template context.
    """
    try:
        site_settings = SiteSettings.get_settings()
    except Exception:
        site_settings = None

    whatsapp_number = (
        site_settings.whatsapp_number
        if site_settings and site_settings.whatsapp_number
        else getattr(settings, 'JENGA_WHATSAPP_NUMBER', '254792729492')
    )

    return {
        'site_settings': site_settings,
        'company_name': site_settings.company_name if site_settings else "Jenga Construction Limited",
        'company_whatsapp_number': whatsapp_number,
        'whatsapp_direct_url': f"https://wa.me/{whatsapp_number}",
        'company_location': site_settings.location_general if site_settings else "Nairobi, Kenya",
        'company_public_email': site_settings.public_email if site_settings else None,
    }
