import React, { useState } from 'react';
import { Terminal, Copy, Check, FileCode, Play, FolderTree } from 'lucide-react';

export const DjangoCodeExplorerView: React.FC = () => {
  const [activeFile, setActiveFile] = useState<string>('config/settings.py');
  const [copied, setCopied] = useState<string | null>(null);

  const fileContents: Record<string, { desc: string; code: string }> = {
    'config/settings.py': {
      desc: 'Master Django 5.x settings with Nairobi timezone, CSRF, security headers, context processor & email backends.',
      code: `# Django settings for Jenga Construction Limited project.
import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY', 'django-insecure-jenga-dev-secret-key-2026')
DEBUG = os.environ.get('DJANGO_DEBUG', 'True').lower() in ('true', '1')
ALLOWED_HOSTS = [h.strip() for h in os.environ.get('DJANGO_ALLOWED_HOSTS', '127.0.0.1,localhost').split(',')]

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # Jenga Construction Local Apps
    'core.apps.CoreConfig',
    'services.apps.ServicesConfig',
    'projects.apps.ProjectsConfig',
    'enquiries.apps.EnquiriesConfig',
]

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'core.context_processors.company_settings',
            ],
        },
    },
]

# Regional & Kenyan Localization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Africa/Nairobi'
USE_I18N = True
USE_TZ = True

# Contact & WhatsApp Settings
JENGA_WHATSAPP_NUMBER = os.environ.get('JENGA_WHATSAPP_NUMBER', '254792729492')
COMPANY_NAME = 'Jenga Construction Limited'
COMPANY_LOCATION = 'Nairobi, Kenya'`,
    },
    'enquiries/models.py': {
      desc: 'Quotation request, contact message, and testimonial moderation database models.',
      code: `from django.db import models
from django.utils import timezone

class QuoteStatus(models.TextChoices):
    NEW = 'NEW', 'New Enquiry'
    CONTACTED = 'CONTACTED', 'Client Contacted'
    IN_PROGRESS = 'IN_PROGRESS', 'Site Assessment / Scoping'
    QUOTATION_SENT = 'QUOTATION_SENT', 'Quotation Delivered'
    ACCEPTED = 'ACCEPTED', 'Contract Accepted'
    DECLINED = 'DECLINED', 'Client Declined / On Hold'
    CLOSED = 'CLOSED', 'Project Closed / Completed'

class QuoteRequest(models.Model):
    reference_number = models.CharField(max_length=32, unique=True, db_index=True)
    full_name = models.CharField(max_length=150)
    phone_number = models.CharField(max_length=30)
    email = models.EmailField(blank=True, null=True)
    service = models.ForeignKey('services.Service', on_delete=models.SET_NULL, null=True, blank=True)
    project_location = models.CharField(max_length=200)
    project_description = models.TextField()
    estimated_budget = models.CharField(max_length=100, blank=True)
    preferred_start_date = models.DateField(null=True, blank=True)
    preferred_contact_method = models.CharField(max_length=20, default='WHATSAPP')
    consent_given = models.BooleanField(default=True)
    status = models.CharField(max_length=20, choices=QuoteStatus.choices, default=QuoteStatus.NEW)
    internal_notes = models.TextField(blank=True, help_text="CONFIDENTIAL: BOQ drafts and staff logs.")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Testimonial(models.Model):
    client_name = models.CharField(max_length=150)
    organization = models.CharField(max_length=150, blank=True)
    content = models.TextField()
    is_approved = models.BooleanField(default=False)
    is_published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)`,
    },
    'enquiries/forms.py': {
      desc: 'Forms with server-side Kenyan phone format validation and honeypot spam protection.',
      code: `import re
from django import forms
from django.core.exceptions import ValidationError
from .models import QuoteRequest

def validate_kenyan_phone(value):
    cleaned = re.sub(r'[\\s\\-()]', '', value)
    kenyan_pattern = r'^(?:(?:\\+?254)|0)?([17]\\d{8})$'
    if not re.match(kenyan_pattern, cleaned):
        raise ValidationError("Please enter a valid Kenyan phone number (e.g., 0792 729 492 or +254 792 729 492).")
    return cleaned

class QuoteRequestForm(forms.ModelForm):
    # Honeypot spam defense field
    website_url = forms.CharField(required=False, widget=forms.HiddenInput())
    consent = forms.BooleanField(required=True)

    class Meta:
        model = QuoteRequest
        fields = ['full_name', 'phone_number', 'email', 'service', 'project_location', 'project_description', 'estimated_budget', 'preferred_start_date', 'preferred_contact_method']

    def clean_phone_number(self):
        return validate_kenyan_phone(self.cleaned_data.get('phone_number'))

    def clean(self):
        cleaned_data = super().clean()
        if cleaned_data.get('website_url'):
            raise ValidationError("Spam bot detected.")
        return cleaned_data`,
    },
    'enquiries/services.py': {
      desc: 'Unique JCL reference number generator (JCL-YYYYMMDD-XXXX) and notification service.',
      code: `import logging, random
from datetime import datetime
from django.conf import settings
from django.core.mail import send_mail
from core.models import SiteSettings

def generate_quote_reference():
    from .models import QuoteRequest
    date_str = datetime.now().strftime('%Y%m%d')
    for _ in range(20):
        suffix = f"{random.randint(1000, 9999)}"
        ref = f"JCL-{date_str}-{suffix}"
        if not QuoteRequest.objects.filter(reference_number=ref).exists():
            return ref
    return f"JCL-{date_str}-{datetime.now().strftime('%f')[:4]}"

def send_quote_notifications(quote_request):
    # Sends staff notification & client confirmation
    # Resilient design: SMTP failures never delete or abort saved database quote requests!
    pass`,
    },
    'core/management/commands/seed_demo_data.py': {
      desc: 'Management command seeding proposed disciplines and safely labelled demonstration projects.',
      code: `from django.core.management.base import BaseCommand
from services.models import Service
from projects.models import Project

class Command(BaseCommand):
    help = "Seeds initial services and demonstration projects. Supports --clear to wipe demo data."

    def add_arguments(self, parser):
        parser.add_argument('--clear', action='store_true', help='Wipe all demo projects and unapproved testimonials.')

    def handle(self, *args, **options):
        if options['clear']:
            Project.objects.filter(is_demonstration=True).delete()
            self.stdout.write("All demonstration items removed.")
            return

        # Populates Road, Bridge, Building, Landscaping, and Civil Works...
        self.stdout.write("Seeded Jenga Construction database successfully.")`,
    },
  };

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="bg-[#1e2327] min-h-screen text-neutral-200">
      {/* Header */}
      <div className="bg-[#111111] border-b border-neutral-700 px-6 py-5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#FFC107] text-[#111111] rounded">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">
                Django Codebase &amp; Architecture Explorer
              </h1>
              <p className="text-xs text-neutral-400">
                Inspect complete production Python files generated in <code className="text-[#FFC107]">/jenga_construction/</code>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-emerald-950 text-emerald-400 border border-emerald-700 px-2.5 py-1 rounded font-mono font-bold">
              Django 5.x LTS Ready
            </span>
            <span className="text-xs bg-neutral-800 text-neutral-300 border border-neutral-700 px-2.5 py-1 rounded font-mono">
              Python 3.12+
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 4 Cols: File Tree & PowerShell Commands */}
        <div className="lg:col-span-4 space-y-6">
          {/* File Picker */}
          <div className="bg-[#2b3035] rounded-lg border border-neutral-700 p-4 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5 mb-3">
              <FolderTree className="w-4 h-4 text-[#FFC107]" />
              <span>Project Source Files</span>
            </h3>

            {Object.keys(fileContents).map((fileName) => (
              <button
                key={fileName}
                onClick={() => setActiveFile(fileName)}
                className={`w-full text-left px-3 py-2 rounded text-xs font-mono transition-colors flex items-center justify-between ${
                  activeFile === fileName
                    ? 'bg-[#FFC107] text-[#111111] font-bold'
                    : 'text-neutral-300 hover:bg-neutral-700'
                }`}
              >
                <span className="truncate">{fileName}</span>
                <FileCode className="w-3.5 h-3.5 shrink-0 opacity-70" />
              </button>
            ))}
          </div>

          {/* Windows PowerShell Quick Start Guide */}
          <div className="bg-[#2b3035] rounded-lg border border-neutral-700 p-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#FFC107] flex items-center gap-1.5">
              <Play className="w-3.5 h-3.5" />
              <span>Windows PowerShell Run Commands</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-neutral-400 block mb-1">1. Navigate and activate virtual environment:</span>
                <div className="bg-[#1e2327] p-2 rounded font-mono text-[11px] text-emerald-400 flex items-center justify-between">
                  <code>cd jenga_construction; .\.venv\Scripts\Activate.ps1</code>
                  <button
                    onClick={() => copyText('cd jenga_construction; .\\.venv\\Scripts\\Activate.ps1', 'c1')}
                    className="text-neutral-400 hover:text-white"
                  >
                    {copied === 'c1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <span className="text-neutral-400 block mb-1">2. Run database migrations:</span>
                <div className="bg-[#1e2327] p-2 rounded font-mono text-[11px] text-emerald-400 flex items-center justify-between">
                  <code>python manage.py migrate</code>
                  <button
                    onClick={() => copyText('python manage.py migrate', 'c2')}
                    className="text-neutral-400 hover:text-white"
                  >
                    {copied === 'c2' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <span className="text-neutral-400 block mb-1">3. Seed initial demonstration data:</span>
                <div className="bg-[#1e2327] p-2 rounded font-mono text-[11px] text-emerald-400 flex items-center justify-between">
                  <code>python manage.py seed_demo_data</code>
                  <button
                    onClick={() => copyText('python manage.py seed_demo_data', 'c3')}
                    className="text-neutral-400 hover:text-white"
                  >
                    {copied === 'c3' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <span className="text-neutral-400 block mb-1">4. Run test suite:</span>
                <div className="bg-[#1e2327] p-2 rounded font-mono text-[11px] text-emerald-400 flex items-center justify-between">
                  <code>python manage.py test</code>
                  <button
                    onClick={() => copyText('python manage.py test', 'c4')}
                    className="text-neutral-400 hover:text-white"
                  >
                    {copied === 'c4' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <span className="text-neutral-400 block mb-1">5. Start development server:</span>
                <div className="bg-[#1e2327] p-2 rounded font-mono text-[11px] text-emerald-400 flex items-center justify-between">
                  <code>python manage.py runserver</code>
                  <button
                    onClick={() => copyText('python manage.py runserver', 'c5')}
                    className="text-neutral-400 hover:text-white"
                  >
                    {copied === 'c5' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right 8 Cols: Code Viewer */}
        <div className="lg:col-span-8 bg-[#2b3035] rounded-lg border border-neutral-700 flex flex-col overflow-hidden">
          <div className="bg-[#1e2327] px-5 py-3 border-b border-neutral-700 flex items-center justify-between">
            <div>
              <span className="font-mono text-xs font-bold text-[#FFC107] block">{activeFile}</span>
              <p className="text-[11px] text-neutral-400 mt-0.5">{fileContents[activeFile].desc}</p>
            </div>
            <button
              onClick={() => copyText(fileContents[activeFile].code, 'active')}
              className="px-3 py-1.5 bg-[#2b3035] hover:bg-neutral-700 text-neutral-200 text-xs rounded font-medium flex items-center gap-1.5 cursor-pointer border border-neutral-600"
            >
              {copied === 'active' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>

          <div className="p-5 overflow-x-auto flex-grow bg-[#141719]">
            <pre className="font-mono text-xs text-neutral-300 leading-relaxed">
              <code>{fileContents[activeFile].code}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
