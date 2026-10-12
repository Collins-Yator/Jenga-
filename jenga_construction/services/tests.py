"""
Automated tests for Service catalog, publication access rules, slugs, and detail views.
"""

from django.test import TestCase, Client
from django.urls import reverse
from services.models import Service

class ServiceModelAndViewsTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.published_service = Service.objects.create(
            title="Road Construction",
            short_description="Highway and feeder road surfacing.",
            description="Detailed specifications for heavy civil roads.",
            display_order=1,
            is_published=True
        )
        self.unpublished_service = Service.objects.create(
            title="Underground Tunneling",
            short_description="Subterranean drilling (draft).",
            description="Confidential feasibility study.",
            display_order=9,
            is_published=False
        )

    def test_service_slug_auto_generation(self):
        self.assertEqual(self.published_service.slug, "road-construction")

    def test_service_list_returns_200(self):
        response = self.client.get(reverse('services:service_list'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Road Construction")
        # Unpublished service must not appear
        self.assertNotContains(response, "Underground Tunneling")

    def test_published_service_detail_accessible(self):
        response = self.client.get(reverse('services:service_detail', kwargs={'slug': self.published_service.slug}))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Detailed specifications for heavy civil roads")
        # Must contain WhatsApp enquiry link
        self.assertContains(response, "wa.me")

    def test_unpublished_service_detail_returns_404(self):
        response = self.client.get(reverse('services:service_detail', kwargs={'slug': self.unpublished_service.slug}))
        self.assertEqual(response.status_code, 404)
