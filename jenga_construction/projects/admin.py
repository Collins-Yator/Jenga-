from django.contrib import admin
from .models import Project, ProjectImage

class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 1
    fields = ('image', 'alt_text', 'caption', 'display_order')

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'service', 'location', 'is_featured', 'is_published', 'is_demonstration', 'created_at')
    list_filter = ('is_published', 'is_featured', 'is_demonstration', 'service', 'created_at')
    search_fields = ('title', 'summary', 'description', 'location')
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ('is_featured', 'is_published', 'is_demonstration')
    readonly_fields = ('created_at', 'updated_at')
    inlines = [ProjectImageInline]

    fieldsets = (
        ("Project Core Information", {
            'fields': ('title', 'slug', 'service', 'location', 'is_published', 'is_featured', 'is_demonstration')
        }),
        ("Narrative & Timeline", {
            'fields': ('summary', 'description', 'start_date', 'completion_date', 'cover_image')
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

@admin.register(ProjectImage)
class ProjectImageAdmin(admin.ModelAdmin):
    list_display = ('project', 'alt_text', 'display_order', 'created_at')
    list_filter = ('project',)
    search_fields = ('alt_text', 'caption')
