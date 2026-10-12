"""
Service models for Jenga Construction Limited.
"""

from django.db import models
from django.utils.text import slugify
from django.urls import reverse

class Service(models.Model):
    title = models.CharField(max_length=200, unique=True, help_text="e.g., Road Construction, Bridge Construction")
    slug = models.SlugField(max_length=220, unique=True, blank=True, db_index=True)
    short_description = models.CharField(
        max_length=300,
        help_text="Concise 1-2 sentence overview shown on service cards."
    )
    description = models.TextField(
        help_text="Comprehensive service breakdown, methodologies, standards, and scope."
    )
    image = models.ImageField(
        upload_to='services/',
        blank=True,
        null=True,
        help_text="Optional service photograph or diagram."
    )
    is_published = models.BooleanField(
        default=True,
        db_index=True,
        help_text="Uncheck to hide this service from public listings until verified."
    )
    display_order = models.PositiveIntegerField(
        default=0,
        help_text="Order in lists (lower numbers appear first)."
    )
    seo_title = models.CharField(
        max_length=150,
        blank=True,
        help_text="Custom SEO title tag (falls back to title if empty)."
    )
    seo_description = models.CharField(
        max_length=200,
        blank=True,
        help_text="Custom meta description for search engines."
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['display_order', 'title']
        verbose_name = "Service"
        verbose_name_plural = "Services"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def get_absolute_url(self):
        return reverse('services:service_detail', kwargs={'slug': self.slug})

    def get_seo_title(self):
        return self.seo_title or f"{self.title} | Jenga Construction Limited Nairobi"

    def get_seo_description(self):
        return self.seo_description or self.short_description

    def __str__(self):
        return self.title
