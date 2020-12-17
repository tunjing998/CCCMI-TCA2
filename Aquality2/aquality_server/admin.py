from django.contrib import admin
from aquality_server.models import *
from django.contrib.gis.admin import OSMGeoAdmin


# Register your models here.

admin.site.register(Login_Account)
admin.site.register(User_Account)
admin.site.register(Data)
admin.site.register(Image)

@admin.register(River)
class RiverAdmin(OSMGeoAdmin):
    list_display = ('river_id','location')