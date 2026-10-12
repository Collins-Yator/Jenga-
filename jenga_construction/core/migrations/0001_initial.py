from django.db import migrations, models

class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name='SiteSettings',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('company_name', models.CharField(default='Jenga Construction Limited', help_text='Official company name.', max_length=150)),
                ('tagline', models.CharField(default='Building Strong Foundations. Creating Lasting Futures.', help_text='Primary brand headline / slogan.', max_length=255)),
                ('whatsapp_number', models.CharField(default='254792729492', help_text="International WhatsApp number without '+' sign (e.g., 254792729492).", max_length=30)),
                ('local_whatsapp_display', models.CharField(default='0792729492', help_text='Local Kenyan phone format for display (e.g., 0792729492).', max_length=30)),
                ('public_email', models.EmailField(blank=True, help_text='Official public email address (leave blank until verified company email is supplied).', max_length=254, null=True)),
                ('notification_email', models.EmailField(default='info@jengaconstruction.co.ke', help_text='Recipient email address for quote and contact form notifications.', max_length=254)),
                ('location_general', models.CharField(default='Nairobi, Kenya', help_text='General company location (do not fabricate specific street addresses).', max_length=150)),
                ('google_maps_embed_url', models.URLField(blank=True, help_text='Configurable Google Maps embed URL. Leave blank until verified by company.', max_length=1000, null=True)),
                ('about_text', models.TextField(default='Jenga Construction Limited is a civil engineering and construction company based in Nairobi, Kenya. We specialize in road construction, bridges, residential and commercial buildings, site preparation, and professional landscaping services. Our focus is delivering structurally sound, cost-effective, and enduring works.', help_text='Detailed company introduction.')),
                ('mission_statement', models.TextField(default='Draft Mission (Pending Company Approval): To deliver enduring, quality infrastructure and structural construction projects across Kenya that empower communities and exceed client expectations through rigorous engineering, safety standards, and integrity.', help_text='Official mission statement.')),
                ('vision_statement', models.TextField(default="Draft Vision (Pending Company Approval): To become Kenya's foremost trusted partner in sustainable infrastructure development and architectural engineering.", help_text='Official vision statement.')),
                ('business_hours', models.CharField(blank=True, default='Monday - Friday: 8:00 AM - 5:00 PM (EAT) | Saturday: 8:00 AM - 1:00 PM', help_text='Business working hours.', max_length=200)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name': 'Site Settings & Company Profile',
                'verbose_name_plural': 'Site Settings & Company Profile',
            },
        ),
    ]
