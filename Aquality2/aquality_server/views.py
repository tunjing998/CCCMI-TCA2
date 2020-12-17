from django.shortcuts import get_object_or_404, render
from aquality_server.actions import *
from rest_framework import viewsets
from .serializers import RiverSerializer
from .models import River
from rest_framework.response import responses
from rest_framework.decorators import api_view
from django.contrib.gis.geos import GEOSGeometry
from django.contrib.gis.measure import D # ``D`` is a shortcut for ``Distance``

# Controlling The View Access To
def index(request):
    return render(request, 'aquality_server/index.html', {})

class RiverViewSet(viewsets.ModelViewSet):
    queryset = River.objects.all().order_by('river_id')
    serializer_class = RiverSerializer
    def get_queryset(self):
        # return River.objects.all().order_by('river_id')
        if(self.request.query_params.get('longitute') and self.request.query_params.get('latitude')):
            pnt =  GEOSGeometry('POINT(%s %s)' % (self.request.query_params.get('longitute'), self.request.query_params.get('latitude')))
        else:
            pnt = Point(-7.55,54.93)
        return River.objects.filter(location__distance_lt=(pnt,D(m=10000)))


# def addData(request):
#     returnMessage = saveRiverListToDbFromWFA()
#     return render(request, 'aquality_server/addData.html',{'returnMessage': returnMessage})

def testingPage(request):
    return render(request,'aquality_server/testing.html',{'request':request})