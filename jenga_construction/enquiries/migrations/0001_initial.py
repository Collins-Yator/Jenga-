import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models

class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('services', '0001_initial'),
        ('projects', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ContactMessage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
                ('email', models.EmailField(max_length=254)),
                ('phone', models.CharField(blank=True, help_text='Optional telephone contact.', max_length=30)),
                ('subject', models.CharField(max_length=200)),
                ('message', models.TextField()),
                ('consent_given', models.BooleanField(default=True, help_text='Sender consented to privacy policy.')),
                ('consent_timestamp', models.DateTimeField(default=django.utils.timezone.now)),
                ('is_read', models.BooleanField(db_index=True, default=False)),
                ('internal_notes', models.TextField(blank=True, help_text='Internal staff notes.')),
                ('created_at', models.DateTimeField(auto_now_add=True, db_index=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name': 'Contact Message',
                'verbose_name_plural': 'Contact Messages',
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='QuoteRequest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('reference_number', models.CharField(db_index=True, help_text='Unique tracking code (e.g., JCL-20261012-7890).', max_length=32, unique=True)),
                ('full_name', models.CharField(max_length=150)),
                ('phone_number', models.CharField(help_text='Kenyan phone number (e.g., 0792729492 or +254792729492).', max_length=30)),
                ('email', models.EmailField(blank=True, help_text='Optional client email address.', max_length=254, null=True)),
                ('project_location', models.CharField(help_text='Location of the project (e.g., Kilimani, Nairobi / Rongai / Kiambu).', max_length=200)),
                ('project_description', models.TextField(help_text='Scope of work, structural dimensions, terrain, or requirements.')),
                ('estimated_budget', models.CharField(blank=True, help_text='Estimated budget range in KES (e.g., KES 500,000 - 1,500,000).', max_length=100)),
                ('preferred_start_date', models.DateField(blank=True, help_text='Anticipated ground-breaking or commencement date.', null=True)),
                ('preferred_contact_method', models.CharField(choices=[('WHATSAPP', 'WhatsApp Message'), ('PHONE_CALL', 'Direct Phone Call'), ('EMAIL', 'Email Correspondence')], default='WHATSAPP', max_length=20)),
                ('consent_given', models.BooleanField(default=True, help_text='Client has consented to communications regarding this quote.')),
                ('consent_timestamp', models.DateTimeField(default=django.utils.timezone.now)),
                ('status', models.CharField(choices=[('NEW', 'New Enquiry'), ('CONTACTED', 'Client Contacted'), ('IN_PROGRESS', 'Site Assessment / Scoping'), ('QUOTATION_SENT', 'Quotation Delivered'), ('ACCEPTED', 'Contract Accepted'), ('DECLINED', 'Client Declined / On Hold'), ('CLOSED', 'Project Closed / Completed')], db_index=True, default='NEW', max_length=20)),
                ('internal_notes', models.TextField(blank=True, help_text='CONFIDENTIAL: Internal staff review notes, bill of quantities (BOQ) drafts, and site visit logs.')),
                ('created_at', models.DateTimeField(auto_now_add=True, db_index=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('service', models.ForeignKey(blank=True, help_text='Selected construction service.', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='quote_requests', to='services.service')),
            ],
            options={
                'verbose_name': 'Quote Request',
                'verbose_name_plural': 'Quote Requests',
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='Testimonial',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('client_name', models.CharField(max_length=150)),
                ('organization', models.CharField(blank=True, help_text='Optional corporate or institutional client name.', max_length=150)),
                ('client_role', models.CharField(blank=True, help_text='e.g., Property Developer, Site Owner', max_length=100)),
                ('content', models.TextField()),
                ('image', models.ImageField(blank=True, null=True, upload_to='testimonials/')),
                ('is_approved', models.BooleanField(db_index=True, default=False, help_text='Administrator must explicitly approve before it can be published.')),
                ('is_published', models.BooleanField(db_index=True, default=False, help_text='Visible publicly only when approved AND published.')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('related_project', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='testimonials', to='projects.project')),
            ],
            options={
                'verbose_name': 'Testimonial',
                'verbose_name_plural': 'Testimonials',
                'ordering': ['-created_at'],
            },
        ),
    ]
