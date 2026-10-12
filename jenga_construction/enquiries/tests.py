"""
Automated tests for quotation requests, contact messages, honeypot protection,
email notification error handling, and testimonial publication moderation.
"""

from unittest.mock import patch
from django.test import TestCase, Client
from django.urls import reverse
from django.core import mail
from enquiries.models import QuoteRequest, ContactMessage, Testimonial, QuoteStatus
from enquiries.forms import QuoteRequestForm, ContactMessageForm
from enquiries.services import generate_quote_reference, send_quote_notifications
from services.models import Service

class EnquiriesTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.service = Service.objects.create(
            title="Building Construction",
            short_description="Commercial and residential structures.",
            description="Complete building scope.",
            is_published=True
        )

    def test_quote_reference_number_generation(self):
        ref1 = generate_quote_reference()
        ref2 = generate_quote_reference()
        self.assertTrue(ref1.startswith("JCL-"))
        self.assertNotEqual(ref1, ref2)

    def test_quote_request_form_valid_kenyan_numbers(self):
        valid_payload = {
            'full_name': 'David Mwangi',
            'phone_number': '0792729492',
            'email': 'david@example.com',
            'service': self.service.id,
            'project_location': 'Kilimani, Nairobi',
            'project_description': 'Two storey residential building foundation and beams.',
            'estimated_budget': 'KES 5,000,000',
            'preferred_contact_method': 'WHATSAPP',
            'consent': True,
            'website_url': '',  # Honeypot empty
        }
        form = QuoteRequestForm(data=valid_payload)
        self.assertTrue(form.is_valid(), form.errors)

    def test_quote_request_form_rejects_invalid_phone(self):
        invalid_payload = {
            'full_name': 'David Mwangi',
            'phone_number': '123456',  # Invalid phone
            'project_location': 'Nairobi',
            'project_description': 'Earthmoving project.',
            'preferred_contact_method': 'PHONE_CALL',
            'consent': True,
        }
        form = QuoteRequestForm(data=invalid_payload)
        self.assertFalse(form.is_valid())
        self.assertIn('phone_number', form.errors)

    def test_quote_request_honeypot_triggers_error(self):
        bot_payload = {
            'full_name': 'Spam Bot',
            'phone_number': '0792729492',
            'project_location': 'Nairobi',
            'project_description': 'Cheap loans fast!',
            'consent': True,
            'website_url': 'http://spamsite.xyz',  # Honeypot filled!
        }
        form = QuoteRequestForm(data=bot_payload)
        self.assertFalse(form.is_valid())

    def test_quote_submission_saves_and_redirects(self):
        post_data = {
            'full_name': 'Faith Wanjiku',
            'phone_number': '+254792729492',
            'email': 'faith@example.com',
            'service': self.service.id,
            'project_location': 'Westlands, Nairobi',
            'project_description': 'Retaining wall and stormwater drainage.',
            'preferred_contact_method': 'WHATSAPP',
            'consent': True,
            'website_url': '',
        }
        response = self.client.post(reverse('enquiries:quote_request'), data=post_data)
        self.assertEqual(response.status_code, 302)
        self.assertRedirects(response, reverse('enquiries:quote_success'))

        quote_obj = QuoteRequest.objects.get(full_name='Faith Wanjiku')
        self.assertTrue(quote_obj.reference_number.startswith('JCL-'))
        self.assertEqual(quote_obj.status, QuoteStatus.NEW)

    def test_email_failure_does_not_abort_or_delete_quote(self):
        quote_obj = QuoteRequest.objects.create(
            reference_number='JCL-TEST-001',
            full_name='John Otieno',
            phone_number='0792729492',
            project_location='Nairobi',
            project_description='Structural beam check.',
        )
        # Mock send_mail to simulate SMTP server down
        with patch('enquiries.services.send_mail', side_effect=Exception("SMTP connection refused")):
            send_quote_notifications(quote_obj)

        # The quote request must still remain safely stored in the database!
        self.assertTrue(QuoteRequest.objects.filter(reference_number='JCL-TEST-001').exists())

    def test_contact_form_submission(self):
        post_data = {
            'name': 'Grace Achieng',
            'email': 'grace@example.com',
            'phone': '0712345678',
            'subject': 'Civil Works Enquiry',
            'message': 'We have a site survey scheduled in Rongai.',
            'consent': True,
            'middle_initial': '',
        }
        response = self.client.post(reverse('enquiries:contact_submit'), data=post_data)
        self.assertEqual(response.status_code, 302)
        self.assertTrue(ContactMessage.objects.filter(name='Grace Achieng').exists())

    def test_testimonial_publication_moderation(self):
        # Unapproved testimonial
        t_unapproved = Testimonial.objects.create(
            client_name="Draft Client",
            content="Great road compaction.",
            is_approved=False,
            is_published=False
        )
        # Approved but unpublished
        t_approved_unpub = Testimonial.objects.create(
            client_name="Private Client",
            content="Strong bridge foundation.",
            is_approved=True,
            is_published=False
        )
        # Approved AND published
        t_live = Testimonial.objects.create(
            client_name="Verified Developer",
            organization="Apex Real Estate",
            content="Outstanding foundation work in Nairobi.",
            is_approved=True,
            is_published=True
        )

        response = self.client.get(reverse('enquiries:testimonials'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Verified Developer")
        self.assertNotContains(response, "Draft Client")
        self.assertNotContains(response, "Private Client")
