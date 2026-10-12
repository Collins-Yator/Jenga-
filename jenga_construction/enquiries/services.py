"""
Business logic services for quotation requests, reference number generation, and email notifications.
"""

import logging
import random
from datetime import datetime
from django.conf import settings
from django.core.mail import send_mail
from django.db import transaction
from core.models import SiteSettings

logger = logging.getLogger(__name__)

def generate_quote_reference():
    """
    Generates a unique, collision-resistant reference number in the format:
    JCL-YYYYMMDD-XXXX (e.g., JCL-20261012-4829).
    """
    from .models import QuoteRequest
    date_str = datetime.now().strftime('%Y%m%d')
    for _ in range(20):
        suffix = f"{random.randint(1000, 9999)}"
        ref = f"JCL-{date_str}-{suffix}"
        if not QuoteRequest.objects.filter(reference_number=ref).exists():
            return ref
    # Fallback with timestamp microsecond
    return f"JCL-{date_str}-{datetime.now().strftime('%f')[:4]}"


def send_quote_notifications(quote_request):
    """
    Sends internal staff notification and optional client acknowledgement email.
    Safely catches exceptions so database records are never lost on email failure.
    """
    try:
        site_settings = SiteSettings.get_settings()
        recipient_email = site_settings.notification_email or getattr(
            settings, 'COMPANY_CONTACT_EMAIL', 'info@jengaconstruction.co.ke'
        )
    except Exception:
        recipient_email = getattr(settings, 'COMPANY_CONTACT_EMAIL', 'info@jengaconstruction.co.ke')

    from_email = getattr(
        settings, 'DEFAULT_FROM_EMAIL',
        'Jenga Construction Limited <no-reply@jengaconstruction.co.ke>'
    )

    # 1. Internal notification
    subject_internal = f"[New Quote Request] Ref: {quote_request.reference_number} - {quote_request.full_name}"
    service_title = quote_request.service.title if quote_request.service else "General Construction"
    body_internal = (
        f"A new quotation request has been submitted to Jenga Construction Limited.\n\n"
        f"Reference Number: {quote_request.reference_number}\n"
        f"Client Name: {quote_request.full_name}\n"
        f"Phone Number: {quote_request.phone_number}\n"
        f"Email: {quote_request.email or 'Not provided'}\n"
        f"Service Category: {service_title}\n"
        f"Project Location: {quote_request.project_location}\n"
        f"Estimated Budget: {quote_request.estimated_budget or 'Not specified'}\n"
        f"Preferred Start Date: {quote_request.preferred_start_date or 'Not specified'}\n"
        f"Preferred Contact Method: {quote_request.get_preferred_contact_method_display()}\n\n"
        f"Project Description:\n{quote_request.project_description}\n\n"
        f"Submitted At: {quote_request.created_at}\n"
        f"---\n"
        f"View and manage in the Django Admin Portal."
    )

    try:
        send_mail(
            subject=subject_internal,
            message=body_internal,
            from_email=from_email,
            recipient_list=[recipient_email],
            fail_silently=False,
        )
        logger.info(f"Notification email dispatched for quote ref: {quote_request.reference_number}")
    except Exception as e:
        logger.warning(
            f"Failed to deliver internal email notification for quote {quote_request.reference_number}: {e}"
        )

    # 2. Client acknowledgement if client email is provided
    if quote_request.email:
        subject_client = f"Quotation Enquiry Received - Ref: {quote_request.reference_number} | Jenga Construction Limited"
        body_client = (
            f"Dear {quote_request.full_name},\n\n"
            f"Thank you for contacting Jenga Construction Limited regarding your upcoming construction project.\n\n"
            f"We have received your quotation request with Reference Number: {quote_request.reference_number}.\n\n"
            f"Our engineering and estimation team in Nairobi will review your project details and get in touch "
            f"via your preferred contact method ({quote_request.get_preferred_contact_method_display()}).\n\n"
            f"If you wish to follow up immediately, you can chat with us on WhatsApp at: "
            f"https://wa.me/{getattr(settings, 'JENGA_WHATSAPP_NUMBER', '254792729492')}?text=Ref+{quote_request.reference_number}\n\n"
            f"Warm regards,\n"
            f"Jenga Construction Limited\n"
            f"Nairobi, Kenya"
        )
        try:
            send_mail(
                subject=subject_client,
                message=body_client,
                from_email=from_email,
                recipient_list=[quote_request.email],
                fail_silently=True,
            )
        except Exception as e:
            logger.warning(f"Failed to send client acknowledgement email to {quote_request.email}: {e}")


def send_contact_notifications(contact_message):
    """
    Dispatches notification for general contact messages.
    """
    try:
        site_settings = SiteSettings.get_settings()
        recipient_email = site_settings.notification_email or getattr(
            settings, 'COMPANY_CONTACT_EMAIL', 'info@jengaconstruction.co.ke'
        )
    except Exception:
        recipient_email = getattr(settings, 'COMPANY_CONTACT_EMAIL', 'info@jengaconstruction.co.ke')

    from_email = getattr(
        settings, 'DEFAULT_FROM_EMAIL',
        'Jenga Construction Limited <no-reply@jengaconstruction.co.ke>'
    )

    subject = f"[Website Message] {contact_message.subject} - from {contact_message.name}"
    body = (
        f"New general contact enquiry received on the Jenga Construction website:\n\n"
        f"From: {contact_message.name}\n"
        f"Email: {contact_message.email}\n"
        f"Phone: {contact_message.phone or 'Not provided'}\n"
        f"Subject: {contact_message.subject}\n\n"
        f"Message:\n{contact_message.message}\n\n"
        f"Received: {contact_message.created_at}"
    )

    try:
        send_mail(
            subject=subject,
            message=body,
            from_email=from_email,
            recipient_list=[recipient_email],
            fail_silently=False,
        )
    except Exception as e:
        logger.warning(f"Failed to send contact notification email: {e}")
