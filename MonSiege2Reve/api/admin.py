from django.contrib import admin
from .models import *

# Register your models here.

admin.site.register(Room)
admin.site.register(Session)
admin.site.register(Purchase)
admin.site.register(Price)
admin.site.register(Film)