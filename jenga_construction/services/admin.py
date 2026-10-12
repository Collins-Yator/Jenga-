from django.contrib import admin
from .models import Service

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'display_order', 'is_published', 'created_at', 'updated_at')
    list_filter = ('is_published', 'created_at')
    search_fields = ('title', 'short_description', 'description')
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ('display_order', 'is_published')
    readonly_fields = ('created_at', 'updated_at')

    fieldsets = (
        ("Service Identification", {
            'fields': ('title', 'slug', 'is_published', 'display_order')
        }),
        ("Content & Scope", {
            'fields': ('short_description', 'description', 'image')
        }),
        ("Search Engine Optimization (SEO)", {
            'fields': ('seo_title', 'seo_description'),
            'classes': ('collapse',)
        }),
        ("Audit Metadata", {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
