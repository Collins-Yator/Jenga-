"""
Automated tests for Project portfolio, demonstration flags, categories, and publication security.
"""

from django.test import TestCase, Client
from django.urls import reverse
from services.models import Service
from projects.models import Project, ProjectImage

class ProjectPortfolioTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.service = Service.objects.create(
            title="Bridge Construction",
            short_description="Civil bridge structures.",
            description="Bridge engineering description.",
            is_published=True
        )
        self.published_project = Project.objects.create(
            title="Demonstration Project — Box Culvert",
            service=self.service,
            summary="Demonstration double culvert.",
            description="Technical engineering narrative.",
            location="Kiambu, Kenya",
            is_published=True,
            is_demonstration=True,
            is_featured=True
        )
        self.unpublished_project = Project.objects.create(
            title="Confidential Internal Infrastructure",
            service=self.service,
            summary="Private works.",
            description="Unreleased contract details.",
            location="Nairobi, Kenya",
            is_published=False,
            is_demonstration=False
        )

    def test_project_list_shows_published_only(self):
        response = self.client.get(reverse('projects:project_list'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Demonstration Project — Box Culvert")
        self.assertNotContains(response, "Confidential Internal Infrastructure")

    def test_published_project_detail_200(self):
        response = self.client.get(reverse('projects:project_detail', kwargs={'slug': self.published_project.slug}))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Demonstration Project — Not Actual Company Work")
        self.assertContains(response, "Technical engineering narrative")

    def test_unpublished_project_returns_404(self):
        response = self.client.get(reverse('projects:project_detail', kwargs={'slug': self.unpublished_project.slug}))
        self.assertEqual(response.status_code, 404)

    def test_project_category_filtering(self):
        response = self.client.get(reverse('projects:project_list') + f"?category={self.service.slug}")
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, self.published_project.title)

    def test_project_image_relationship(self):
        image = ProjectImage.objects.create(
            project=self.published_project,
            alt_text="Poured concrete wingwall",
            caption="East abutment reinforcement"
        )
        self.assertEqual(self.published_project.gallery_images.count(), 1)
        self.assertEqual(self.published_project.gallery_images.first().alt_text, "Poured concrete wingwall")
