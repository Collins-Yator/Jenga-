"""
Project models for Jenga Construction Limited portfolio.
"""

from django.db import models
from django.utils.text import slugify
from django.urls import reverse

class Project(models.Model):
    title = models.CharField(max_length=200, help_text="e.g., Eastern Bypass Access Corridor")
    slug = models.SlugField(max_length=220, unique=True, blank=True, db_index=True)
    service = models.ForeignKey(
        'services.Service',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='projects',
        help_text="Primary construction category for this project."
    )
    summary = models.CharField(
        max_length=300,
        help_text="Brief 1-2 sentence overview shown in the gallery grid."
    )
    description = models.TextField(
        help_text="Full project narrative including site conditions, materials, and execution."
    )
    location = models.CharField(
        max_length=150,
        default="Nairobi, Kenya",
        blank=True,
        help_text="Project location (e.g., Nairobi, Kenya)."
    )
    start_date = models.DateField(
        null=True,
        blank=True,
        help_text="Optional commencement date."
    )
    completion_date = models.DateField(
        null=True,
        blank=True,
        help_text="Optional completion date (leave blank if ongoing)."
    )
    cover_image = models.ImageField(
        upload_to='projects/covers/',
        blank=True,
        null=True,
        help_text="Primary high-resolution cover photograph."
    )
    is_featured = models.BooleanField(
        default=False,
        db_index=True,
        help_text="Highlight on the homepage featured projects strip."
    )
    is_published = models.BooleanField(
        default=True,
        db_index=True,
        help_text="Only published projects are visible to the public."
    )
    is_demonstration = models.BooleanField(
        default=True,
        help_text="Clearly displays disclaimer: 'Demonstration Project — Not Actual Company Work'."
    )
    seo_title = models.CharField(
        max_length=150,
        blank=True,
        help_text="Custom SEO title tag."
    )
    seo_description = models.CharField(
        max_length=200,
        blank=True,
        help_text="Custom meta description for search engines."
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-is_featured', '-created_at']
        verbose_name = "Project"
        verbose_name_plural = "Projects"

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title)
            slug = base_slug
            counter = 1
            while Project.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)

    def get_absolute_url(self):
        return reverse('projects:project_detail', kwargs={'slug': self.slug})

    def get_seo_title(self):
        return self.seo_title or f"{self.title} | Projects | Jenga Construction Limited"

    def get_seo_description(self):
        return self.seo_description or self.summary

    def __str__(self):
        return self.title


class ProjectImage(models.Model):
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name='gallery_images',
        help_text="Parent project for this gallery photograph."
    )
    image = models.ImageField(
        upload_to='projects/gallery/',
        help_text="Gallery image file."
    )
    alt_text = models.CharField(
        max_length=200,
        help_text="Descriptive alternative text for accessibility and SEO."
    )
    caption = models.CharField(
        max_length=255,
        blank=True,
        help_text="Optional caption displayed under the image."
    )
    display_order = models.PositiveIntegerField(
        default=0,
        help_text="Display order inside the project lightbox."
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['display_order', 'id']
        verbose_name = "Project Image"
        verbose_name_plural = "Project Images"

    def __str__(self):
        return f"Image for {self.project.title} (#{self.id})"
