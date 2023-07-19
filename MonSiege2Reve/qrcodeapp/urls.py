from django.urls import path
from . import views

urlpatterns = [
    path('generate_qr_code', views.generate_qr_code, name='generate_qr_code'),
]
