import django.db.models.deletion
from django.db import migrations, models

class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('services', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(help_text='e.g., Eastern Bypass Access Corridor', max_length=200)),
                ('slug', models.SlugField(blank=True, max_length=220, unique=True)),
                ('summary', models.CharField(help_text='Brief 1-2 sentence overview shown in the gallery grid.', max_length=300)),
                ('description', models.TextField(help_text='Full project narrative including site conditions, materials, and execution.')),
                ('location', models.CharField(blank=True, default='Nairobi, Kenya', help_text='Project location (e.g., Nairobi, Kenya).', max_length=150)),
                ('start_date', models.DateField(blank=True, help_text='Optional commencement date.', null=True)),
                ('completion_date', models.DateField(blank=True, help_text='Optional completion date (leave blank if ongoing).', null=True)),
                ('cover_image', models.ImageField(blank=True, help_text='Primary high-resolution cover photograph.', null=True, upload_to='projects/covers/')),
                ('is_featured', models.BooleanField(db_index=True, default=False, help_text='Highlight on the homepage featured projects strip.')),
                ('is_published', models.BooleanField(db_index=True, default=True, help_text='Only published projects are visible to the public.')),
                ('is_demonstration', models.BooleanField(default=True, help_text="Clearly displays disclaimer: 'Demonstration Project — Not Actual Company Work'.")),
                ('seo_title', models.CharField(blank=True, help_text='Custom SEO title tag.', max_length=150)),
                ('seo_description', models.CharField(blank=True, help_text='Custom meta description for search engines.', max_length=200)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('service', models.ForeignKey(blank=True, help_text='Primary construction category for this project.', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='projects', to='services.service')),
            ],
            options={
                'verbose_name': 'Project',
                'verbose_name_plural': 'Projects',
                'ordering': ['-is_featured', '-created_at'],
            },
        ),
        migrations.CreateModel(
            name='ProjectImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(help_text='Gallery image file.', upload_to='projects/gallery/')),
                ('alt_text', models.CharField(help_text='Descriptive alternative text for accessibility and SEO.', max_length=200)),
                ('caption', models.CharField(blank=True, help_text='Optional caption displayed under the image.', max_length=255)),
                ('display_order', models.PositiveIntegerField(default=0, help_text='Display order inside the project lightbox.')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('project', models.ForeignKey(help_text='Parent project for this gallery photograph.', on_delete=django.db.models.deletion.CASCADE, related_name='gallery_images', to='projects.project')),
            ],
            options={
                'verbose_name': 'Project Image',
                'verbose_name_plural': 'Project Images',
                'ordering': ['display_order', 'id'],
            },
        ),
    ]
