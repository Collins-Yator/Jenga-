"""
Core models for Jenga Construction Limited.
Includes a singleton SiteSettings model for company profile and site-wide configuration.
"""

from django.db import models
from django.core.exceptions import ValidationError

class SiteSettings(models.Model):
    """
    Singleton model for site-wide company configuration and contact details.
    Guarantees only one record exists in the database.
    """
    company_name = models.CharField(
        max_length=150,
        default="Jenga Construction Limited",
        help_text="Official company name."
    )
    tagline = models.CharField(
        max_length=255,
        default="Building Strong Foundations. Creating Lasting Futures.",
        help_text="Primary brand headline / slogan."
    )
    whatsapp_number = models.CharField(
        max_length=30,
        default="254792729492",
        help_text="International WhatsApp number without '+' sign (e.g., 254792729492)."
    )
    local_whatsapp_display = models.CharField(
        max_length=30,
        default="0792729492",
        help_text="Local Kenyan phone format for display (e.g., 0792729492)."
    )
    public_email = models.EmailField(
        blank=True,
        null=True,
        help_text="Official public email address (leave blank until verified company email is supplied)."
    )
    notification_email = models.EmailField(
        default="info@jengaconstruction.co.ke",
        help_text="Recipient email address for quote and contact form notifications."
    )
    location_general = models.CharField(
        max_length=150,
        default="Nairobi, Kenya",
        help_text="General company location (do not fabricate specific street addresses)."
    )
    google_maps_embed_url = models.URLField(
        max_length=1000,
        blank=True,
        null=True,
        help_text="Configurable Google Maps embed URL. Leave blank until verified by company."
    )
    about_text = models.TextField(
        default=(
            "Jenga Construction Limited is a civil engineering and construction company "
            "based in Nairobi, Kenya. We specialize in road construction, bridges, residential "
            "and commercial buildings, site preparation, and professional landscaping services. "
            "Our focus is delivering structurally sound, cost-effective, and enduring works."
        ),
        help_text="Detailed company introduction."
    )
    mission_statement = models.TextField(
        default=(
            "Draft Mission (Pending Company Approval): To deliver enduring, quality infrastructure "
            "and structural construction projects across Kenya that empower communities and "
            "exceed client expectations through rigorous engineering, safety standards, and integrity."
        ),
        help_text="Official mission statement."
    )
    vision_statement = models.TextField(
        default=(
            "Draft Vision (Pending Company Approval): To become Kenya's foremost trusted partner "
            "in sustainable infrastructure development and architectural engineering."
        ),
        help_text="Official vision statement."
    )
    business_hours = models.CharField(
        max_length=200,
        blank=True,
        default="Monday - Friday: 8:00 AM - 5:00 PM (EAT) | Saturday: 8:00 AM - 1:00 PM",
        help_text="Business working hours."
    )
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Site Settings & Company Profile"
        verbose_name_plural = "Site Settings & Company Profile"

    def clean(self):
        if not self.pk and SiteSettings.objects.exists():
            raise ValidationError("There can only be one SiteSettings configuration.")

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.company_name} Configuration"

    @classmethod
    def get_settings(cls):
        """Helper to get or create the singleton instance safely."""
        settings_obj, _ = cls.objects.get_or_create(
            pk=1,
            defaults={
                'company_name': "Jenga Construction Limited",
                'whatsapp_number': "254792729492",
                'local_whatsapp_display': "0792729492",
                'location_general': "Nairobi, Kenya",
            }
        )
        return settings_obj
