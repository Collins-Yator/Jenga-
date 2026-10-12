from django.contrib import admin
from .models import SiteSettings

@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    fieldsets = (
        ("Company Branding", {
            'fields': ('company_name', 'tagline', 'location_general')
        }),
        ("WhatsApp & Communications", {
            'fields': ('whatsapp_number', 'local_whatsapp_display', 'public_email', 'notification_email', 'business_hours')
        }),
        ("About & Statements", {
            'fields': ('about_text', 'mission_statement', 'vision_statement'),
            'description': "Draft mission & vision statements can be reviewed and finalized here."
        }),
        ("Interactive Google Maps", {
            'fields': ('google_maps_embed_url',),
            'description': "Provide a valid Google Maps embed URL when an official verified physical address is established."
        }),
    )

    def has_add_permission(self, request):
        # Prevent creating multiple records
        if SiteSettings.objects.exists():
            return False
        return super().has_add_permission(request)

    def has_delete_permission(self, request, obj=None):
        return False
