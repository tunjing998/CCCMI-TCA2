from django.urls import include,path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'rivers', views.RiverViewSet)
router.register(r'data',views.DataViewSet)
#Application Name
app_name = 'aquality_server'
#Controlling The Path of Application
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
  #  path('addData', views.addData, name='addData'),
    path('testing/',views.testingPage,name='testingPage')
]