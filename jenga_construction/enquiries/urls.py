from django.urls import path
from . import views

app_name = 'enquiries'

urlpatterns = [
    path('quote/', views.quote_request, name='quote_request'),
    path('quote/success/', views.quote_success, name='quote_success'),
    path('contact/submit/', views.contact_submit, name='contact_submit'),
    path('contact/success/', views.contact_success, name='contact_success'),
    path('testimonials/', views.testimonial_list, name='testimonials'),
]
