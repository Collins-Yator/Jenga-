from django.contrib import admin
from .models import QuoteRequest, ContactMessage, Testimonial

@admin.register(QuoteRequest)
class QuoteRequestAdmin(admin.ModelAdmin):
    list_display = (
        'reference_number',
        'full_name',
        'phone_number',
        'service',
        'project_location',
        'status',
        'created_at'
    )
    list_filter = ('status', 'service', 'preferred_contact_method', 'created_at')
    search_fields = (
        'reference_number',
        'full_name',
        'phone_number',
        'email',
        'project_location',
        'project_description'
    )
    list_editable = ('status',)
    readonly_fields = ('reference_number', 'consent_timestamp', 'created_at', 'updated_at')
    date_hierarchy = 'created_at'

    fieldsets = (
        ("Enquiry Tracking", {
            'fields': ('reference_number', 'status', 'created_at', 'updated_at')
        }),
        ("Client Details", {
            'fields': ('full_name', 'phone_number', 'email', 'preferred_contact_method', 'consent_given', 'consent_timestamp')
        }),
        ("Project Specifications", {
            'fields': ('service', 'project_location', 'project_description', 'estimated_budget', 'preferred_start_date')
        }),
        ("Staff Review & Estimation (Confidential)", {
            'fields': ('internal_notes',),
            'description': "Use this section for site assessment reports, bill of quantities (BOQ) drafts, and client correspondence logs."
        }),
    )


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'subject', 'email', 'phone', 'is_read', 'created_at')
    list_filter = ('is_read', 'created_at')
    search_fields = ('name', 'email', 'phone', 'subject', 'message')
    list_editable = ('is_read',)
    readonly_fields = ('created_at', 'updated_at', 'consent_timestamp')

    fieldsets = (
        ("Message Details", {
            'fields': ('name', 'email', 'phone', 'subject', 'message', 'created_at')
        }),
        ("Status & Triage", {
            'fields': ('is_read', 'internal_notes')
        }),
    )


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('client_name', 'organization', 'client_role', 'is_approved', 'is_published', 'created_at')
    list_filter = ('is_approved', 'is_published', 'created_at')
    search_fields = ('client_name', 'organization', 'content')
    list_editable = ('is_approved', 'is_published')
    readonly_fields = ('created_at', 'updated_at')

    fieldsets = (
        ("Client Attribution", {
            'fields': ('client_name', 'organization', 'client_role', 'related_project', 'image')
        }),
        ("Testimonial Body", {
            'fields': ('content',)
        }),
        ("Moderation & Governance", {
            'fields': ('is_approved', 'is_published'),
            'description': "Testimonials MUST be verified as genuine before approving. Only approved and published items appear publicly."
        }),
    )
