"""
Views for quotation requests, contact submissions, and testimonials.
"""

from urllib.parse import quote
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.conf import settings
from .models import QuoteRequest, ContactMessage, Testimonial
from .forms import QuoteRequestForm, ContactMessageForm
from .services import generate_quote_reference, send_quote_notifications, send_contact_notifications
from services.models import Service
from core.models import SiteSettings

def quote_request(request):
    """
    Renders and processes the comprehensive quotation request form.
    """
    initial_data = {}
    service_slug = request.GET.get('service', '').strip()
    if service_slug:
        service_obj = Service.objects.filter(slug=service_slug, is_published=True).first()
        if service_obj:
            initial_data['service'] = service_obj.id

    if request.method == 'POST':
        form = QuoteRequestForm(request.POST)
        if form.is_valid():
            quote_obj = form.save(commit=False)
            quote_obj.reference_number = generate_quote_reference()
            quote_obj.save()

            # Attempt notification without breaking if SMTP is offline
            send_quote_notifications(quote_obj)

            # Store in session for success view
            request.session['latest_quote_ref'] = quote_obj.reference_number
            request.session['latest_quote_name'] = quote_obj.full_name

            messages.success(
                request,
                f"Your quotation request has been successfully submitted! Reference: {quote_obj.reference_number}"
            )
            return redirect('enquiries:quote_success')
        else:
            messages.error(
                request,
                "Please review the errors highlighted below and correct your details."
            )
    else:
        form = QuoteRequestForm(initial=initial_data)

    return render(request, 'enquiries/quote_request.html', {
        'form': form,
        'page_title': "Request a Construction Quotation | Jenga Construction Limited",
    })


def quote_success(request):
    """
    Displays quotation submission confirmation with reference number and WhatsApp follow-up link.
    """
    ref_number = request.session.get('latest_quote_ref', 'JCL-PENDING')
    client_name = request.session.get('latest_quote_name', 'Valued Client')

    try:
        site_settings = SiteSettings.get_settings()
        whatsapp_number = site_settings.whatsapp_number
    except Exception:
        whatsapp_number = getattr(settings, 'JENGA_WHATSAPP_NUMBER', '254792729492')

    whatsapp_msg = (
        f"Hello Jenga Construction Limited, I have just submitted a quotation request with "
        f"Reference Number {ref_number}. My name is {client_name}. I look forward to discussing the project."
    )
    whatsapp_url = f"https://wa.me/{whatsapp_number}?text={quote(whatsapp_msg)}"

    return render(request, 'enquiries/quote_success.html', {
        'reference_number': ref_number,
        'client_name': client_name,
        'whatsapp_url': whatsapp_url,
    })


def contact_submit(request):
    """
    Handles general contact enquiries.
    """
    if request.method == 'POST':
        form = ContactMessageForm(request.POST)
        if form.is_valid():
            contact_msg = form.save()
            send_contact_notifications(contact_msg)
            messages.success(
                request,
                "Thank you for contacting Jenga Construction Limited. Your message has been received."
            )
            return redirect('enquiries:contact_success')
        else:
            messages.error(request, "Please correct the errors in the contact form.")
            return render(request, 'core/contact.html', {'form': form})
    return redirect('core:contact')


def contact_success(request):
    """
    Renders acknowledgement for general contact messages.
    """
    return render(request, 'enquiries/contact_success.html')


def testimonial_list(request):
    """
    Renders testimonials page. Only approved and published testimonials are visible.
    Shows a clean empty state if none exist yet.
    """
    testimonials = Testimonial.objects.filter(
        is_approved=True,
        is_published=True
    ).select_related('related_project')

    return render(request, 'enquiries/testimonials.html', {
        'testimonials': testimonials,
        'page_title': "Client Testimonials & Feedback | Jenga Construction Limited",
    })
