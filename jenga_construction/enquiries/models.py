"""
Database models for quotation requests, general contact messages, and testimonials.
"""

from django.db import models
from django.utils import timezone

class QuoteStatus(models.TextChoices):
    NEW = 'NEW', 'New Enquiry'
    CONTACTED = 'CONTACTED', 'Client Contacted'
    IN_PROGRESS = 'IN_PROGRESS', 'Site Assessment / Scoping'
    QUOTATION_SENT = 'QUOTATION_SENT', 'Quotation Delivered'
    ACCEPTED = 'ACCEPTED', 'Contract Accepted'
    DECLINED = 'DECLINED', 'Client Declined / On Hold'
    CLOSED = 'CLOSED', 'Project Closed / Completed'


class ContactMethod(models.TextChoices):
    WHATSAPP = 'WHATSAPP', 'WhatsApp Message'
    PHONE_CALL = 'PHONE_CALL', 'Direct Phone Call'
    EMAIL = 'EMAIL', 'Email Correspondence'


class QuoteRequest(models.Model):
    reference_number = models.CharField(
        max_length=32,
        unique=True,
        db_index=True,
        help_text="Unique tracking code (e.g., JCL-20261012-7890)."
    )
    full_name = models.CharField(max_length=150)
    phone_number = models.CharField(
        max_length=30,
        help_text="Kenyan phone number (e.g., 0792729492 or +254792729492)."
    )
    email = models.EmailField(
        blank=True,
        null=True,
        help_text="Optional client email address."
    )
    service = models.ForeignKey(
        'services.Service',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='quote_requests',
        help_text="Selected construction service."
    )
    project_location = models.CharField(
        max_length=200,
        help_text="Location of the project (e.g., Kilimani, Nairobi / Rongai / Kiambu)."
    )
    project_description = models.TextField(
        help_text="Scope of work, structural dimensions, terrain, or requirements."
    )
    estimated_budget = models.CharField(
        max_length=100,
        blank=True,
        help_text="Estimated budget range in KES (e.g., KES 500,000 - 1,500,000)."
    )
    preferred_start_date = models.DateField(
        null=True,
        blank=True,
        help_text="Anticipated ground-breaking or commencement date."
    )
    preferred_contact_method = models.CharField(
        max_length=20,
        choices=ContactMethod.choices,
        default=ContactMethod.WHATSAPP
    )
    consent_given = models.BooleanField(
        default=True,
        help_text="Client has consented to communications regarding this quote."
    )
    consent_timestamp = models.DateTimeField(default=timezone.now)
    status = models.CharField(
        max_length=20,
        choices=QuoteStatus.choices,
        default=QuoteStatus.NEW,
        db_index=True
    )
    internal_notes = models.TextField(
        blank=True,
        help_text="CONFIDENTIAL: Internal staff review notes, bill of quantities (BOQ) drafts, and site visit logs."
    )
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Quote Request"
        verbose_name_plural = "Quote Requests"

    def __str__(self):
        return f"{self.reference_number} — {self.full_name} ({self.get_status_display()})"


class ContactMessage(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(
        max_length=30,
        blank=True,
        help_text="Optional telephone contact."
    )
    subject = models.CharField(max_length=200)
    message = models.TextField()
    consent_given = models.BooleanField(
        default=True,
        help_text="Sender consented to privacy policy."
    )
    consent_timestamp = models.DateTimeField(default=timezone.now)
    is_read = models.BooleanField(default=False, db_index=True)
    internal_notes = models.TextField(
        blank=True,
        help_text="Internal staff notes."
    )
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Contact Message"
        verbose_name_plural = "Contact Messages"

    def __str__(self):
        return f"Message from {self.name}: {self.subject}"


class Testimonial(models.Model):
    client_name = models.CharField(max_length=150)
    organization = models.CharField(
        max_length=150,
        blank=True,
        help_text="Optional corporate or institutional client name."
    )
    client_role = models.CharField(
        max_length=100,
        blank=True,
        help_text="e.g., Property Developer, Site Owner"
    )
    content = models.TextField()
    related_project = models.ForeignKey(
        'projects.Project',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='testimonials'
    )
    image = models.ImageField(
        upload_to='testimonials/',
        blank=True,
        null=True
    )
    is_approved = models.BooleanField(
        default=False,
        db_index=True,
        help_text="Administrator must explicitly approve before it can be published."
    )
    is_published = models.BooleanField(
        default=False,
        db_index=True,
        help_text="Visible publicly only when approved AND published."
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Testimonial"
        verbose_name_plural = "Testimonials"

    def __str__(self):
        return f"Testimonial by {self.client_name}"
