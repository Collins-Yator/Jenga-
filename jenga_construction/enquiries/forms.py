"""
Forms for quotation requests and contact enquiries with Kenyan phone validation and honeypot spam protection.
"""

import re
from django import forms
from django.core.exceptions import ValidationError
from django.utils import timezone
from .models import QuoteRequest, ContactMessage, ContactMethod
from services.models import Service

def validate_kenyan_phone(value):
    """
    Validates standard Kenyan telephone number formats:
    - Local: 07XXXXXXXX or 01XXXXXXXX (10 digits)
    - International with plus: +2547XXXXXXXX or +2541XXXXXXXX (13 chars)
    - International digits: 2547XXXXXXXX or 2541XXXXXXXX (12 digits)
    """
    cleaned = re.sub(r'[\s\-()]', '', value)
    kenyan_pattern = r'^(?:(?:\+?254)|0)?([17]\d{8})$'
    if not re.match(kenyan_pattern, cleaned):
        raise ValidationError(
            "Please enter a valid Kenyan phone number (e.g., 0792 729 492 or +254 792 729 492)."
        )
    return cleaned


class QuoteRequestForm(forms.ModelForm):
    # Honeypot spam defense field - hidden from human users via CSS
    website_url = forms.CharField(
        required=False,
        widget=forms.HiddenInput(attrs={'tabindex': '-1', 'autocomplete': 'off'}),
        label=""
    )
    consent = forms.BooleanField(
        required=True,
        initial=True,
        label="I agree to Jenga Construction Limited contacting me regarding this project enquiry."
    )

    class Meta:
        model = QuoteRequest
        fields = [
            'full_name',
            'phone_number',
            'email',
            'service',
            'project_location',
            'project_description',
            'estimated_budget',
            'preferred_start_date',
            'preferred_contact_method',
        ]
        widgets = {
            'full_name': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Your full name or organization',
                'required': 'required'
            }),
            'phone_number': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'e.g., 0792 729 492',
                'required': 'required'
            }),
            'email': forms.EmailInput(attrs={
                'class': 'form-control',
                'placeholder': 'e.g., yourname@domain.com (optional)'
            }),
            'service': forms.Select(attrs={
                'class': 'form-select'
            }),
            'project_location': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'e.g., Kilimani / Westlands, Nairobi / Kiambu Road',
                'required': 'required'
            }),
            'project_description': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 4,
                'placeholder': 'Describe your project requirements, scope of work, approximate area, or specifications...',
                'required': 'required'
            }),
            'estimated_budget': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'e.g., KES 1,000,000 - 3,500,000 (optional)'
            }),
            'preferred_start_date': forms.DateInput(attrs={
                'class': 'form-control',
                'type': 'date'
            }),
            'preferred_contact_method': forms.Select(attrs={
                'class': 'form-select'
            }),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Limit services dropdown to published services
        self.fields['service'].queryset = Service.objects.filter(is_published=True).order_by('display_order', 'title')
        self.fields['service'].empty_label = "— Select Construction Service Category —"

    def clean_phone_number(self):
        phone = self.cleaned_data.get('phone_number')
        if phone:
            validate_kenyan_phone(phone)
        return phone

    def clean(self):
        cleaned_data = super().clean()
        # Honeypot verification: bots populate hidden fields
        if cleaned_data.get('website_url'):
            raise ValidationError("Spam detection triggered.")
        return cleaned_data


class ContactMessageForm(forms.ModelForm):
    # Honeypot trap
    middle_initial = forms.CharField(
        required=False,
        widget=forms.HiddenInput(attrs={'tabindex': '-1', 'autocomplete': 'off'}),
        label=""
    )
    consent = forms.BooleanField(
        required=True,
        initial=True,
        label="I agree to Jenga Construction Limited processing my message to respond to this enquiry."
    )

    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'phone', 'subject', 'message']
        widgets = {
            'name': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Your name',
                'required': 'required'
            }),
            'email': forms.EmailInput(attrs={
                'class': 'form-control',
                'placeholder': 'name@example.com',
                'required': 'required'
            }),
            'phone': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': '07XX XXX XXX (optional)'
            }),
            'subject': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Subject of your enquiry',
                'required': 'required'
            }),
            'message': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 5,
                'placeholder': 'How can our construction team assist you?',
                'required': 'required'
            }),
        }

    def clean_phone(self):
        phone = self.cleaned_data.get('phone')
        if phone:
            validate_kenyan_phone(phone)
        return phone

    def clean(self):
        cleaned_data = super().clean()
        if cleaned_data.get('middle_initial'):
            raise ValidationError("Spam detection triggered.")
        return cleaned_data
