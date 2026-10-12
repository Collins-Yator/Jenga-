"""
Automated tests for core pages, SEO views, site settings singleton, and error handlers.
"""

from django.test import TestCase, Client
from django.urls import reverse
from core.models import SiteSettings
from django.core.exceptions import ValidationError

class CorePageTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.site_settings = SiteSettings.get_settings()

    def test_homepage_status_200(self):
        response = self.client.get(reverse('core:home'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Jenga Construction Limited")

    def test_about_page_status_200(self):
        response = self.client.get(reverse('core:about'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "About")

    def test_contact_page_status_200(self):
        response = self.client.get(reverse('core:contact'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Contact")

    def test_robots_txt_status_200(self):
        response = self.client.get(reverse('core:robots_txt'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response['Content-Type'], "text/plain")
        self.assertIn("User-agent: *", response.content.decode())

    def test_sitemap_xml_status_200(self):
        response = self.client.get(reverse('core:sitemap_xml'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response['Content-Type'], "application/xml")
        self.assertIn("urlset", response.content.decode())

    def test_invalid_url_returns_404(self):
        response = self.client.get('/nonexistent-page-url-xyz/')
        self.assertEqual(response.status_code, 404)

    def test_site_settings_singleton_enforcement(self):
        # Trying to create a second SiteSettings instance must raise ValidationError
        second_instance = SiteSettings(company_name="Duplicate")
        with self.assertRaises(ValidationError):
            second_instance.save()
