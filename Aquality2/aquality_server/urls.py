from django.urls import path

from . import views

app_name = 'aquality_server'
urlpatterns = [
    path('', views.index, name='index'),
    path('addData', views.addData, name='addData')
]