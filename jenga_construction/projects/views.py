"""
Views for Project Portfolio.
"""

from urllib.parse import quote
from django.shortcuts import render, get_object_or_404
from django.core.paginator import Paginator
from django.conf import settings
from .models import Project
from services.models import Service
from core.models import SiteSettings

def project_list(request):
    """
    Renders project portfolio with category filtering and pagination.
    Only published projects appear publicly.
    """
    selected_service_slug = request.GET.get('category', '').strip()

    projects_qs = Project.objects.filter(is_published=True).select_related('service')

    selected_service = None
    if selected_service_slug:
        selected_service = Service.objects.filter(slug=selected_service_slug).first()
        if selected_service:
            projects_qs = projects_qs.filter(service=selected_service)

    # Order by featured first, then newest
    projects_qs = projects_qs.order_by('-is_featured', '-created_at')

    # Pagination: 9 per page
    paginator = Paginator(projects_qs, 9)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    # Categories for filter tabs
    services = Service.objects.filter(is_published=True).order_by('display_order', 'title')

    return render(request, 'projects/project_list.html', {
        'page_obj': page_obj,
        'projects': page_obj.object_list,
        'services': services,
        'selected_service': selected_service,
        'selected_service_slug': selected_service_slug,
    })

def project_detail(request, slug):
    """
    Renders single project details with gallery images and WhatsApp enquiry button.
    Returns 404 for nonexistent or unpublished projects.
    """
    project = get_object_or_404(
        Project.objects.select_related('service').prefetch_related('gallery_images'),
        slug=slug,
        is_published=True
    )

    # WhatsApp click-to-chat context
    try:
        site_settings = SiteSettings.get_settings()
        whatsapp_number = site_settings.whatsapp_number
    except Exception:
        whatsapp_number = getattr(settings, 'JENGA_WHATSAPP_NUMBER', '254792729492')

    whatsapp_msg = f"Hello Jenga Construction Limited, I am interested in work similar to your project: '{project.title}'."
    whatsapp_url = f"https://wa.me/{whatsapp_number}?text={quote(whatsapp_msg)}"

    # Related projects
    related_projects = Project.objects.filter(
        is_published=True
    ).exclude(pk=project.pk)
    if project.service:
        related_projects = related_projects.filter(service=project.service)
    related_projects = related_projects[:3]

    return render(request, 'projects/project_detail.html', {
        'project': project,
        'gallery_images': project.gallery_images.all(),
        'whatsapp_url': whatsapp_url,
        'related_projects': related_projects,
    })
