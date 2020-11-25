from django.urls import include,path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'rivers', views.RiverViewSet)

#Application Name
app_name = 'aquality_server'
#Controlling The Path of Application
# urlpatterns = [
#     path('', views.index, name='index'),
#     path('addData', views.addData, name='addData')
# ]

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]