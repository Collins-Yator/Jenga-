from django.db import migrations, models

class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name='Service',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(help_text='e.g., Road Construction, Bridge Construction', max_length=200, unique=True)),
                ('slug', models.SlugField(blank=True, max_length=220, unique=True)),
                ('short_description', models.CharField(help_text='Concise 1-2 sentence overview shown on service cards.', max_length=300)),
                ('description', models.TextField(help_text='Comprehensive service breakdown, methodologies, standards, and scope.')),
                ('image', models.ImageField(blank=True, help_text='Optional service photograph or diagram.', null=True, upload_to='services/')),
                ('is_published', models.BooleanField(db_index=True, default=True, help_text='Uncheck to hide this service from public listings until verified.')),
                ('display_order', models.PositiveIntegerField(default=0, help_text='Order in lists (lower numbers appear first).')),
                ('seo_title', models.CharField(blank=True, help_text='Custom SEO title tag (falls back to title if empty).', max_length=150)),
                ('seo_description', models.CharField(blank=True, help_text='Custom meta description for search engines.', max_length=200)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name': 'Service',
                'verbose_name_plural': 'Services',
                'ordering': ['display_order', 'title'],
            },
        ),
    ]
