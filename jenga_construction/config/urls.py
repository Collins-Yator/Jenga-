"""
URL configuration for Jenga Construction Limited project.
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

# Customize Django admin header and title
admin.site.site_header = "Jenga Construction Limited Administration"
admin.site.site_title = "Jenga Admin Portal"
admin.site.index_title = "Construction Operations & Content Management"

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('core.urls', namespace='core')),
    path('services/', include('services.urls', namespace='services')),
    path('projects/', include('projects.urls', namespace='projects')),
    path('enquiries/', include('enquiries.urls', namespace='enquiries')),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# Custom error handlers
handler403 = 'core.views.custom_permission_denied_view'
handler404 = 'core.views.custom_page_not_found_view'
handler500 = 'core.views.custom_server_error_view'
