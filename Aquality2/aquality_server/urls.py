from django.urls import path

from . import views

#Application Name
app_name = 'aquality_server'
#Controlling The Path of Application
urlpatterns = [
    path('', views.index, name='index'),
    path('addData', views.addData, name='addData')
]