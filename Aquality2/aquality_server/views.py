from django.shortcuts import get_object_or_404, render
from aquality_server.actions import *
from rest_framework import viewsets
from .serializers import RiverSerializer
from .models import River
from rest_framework.response import responses
from rest_framework.decorators import api_view

# Controlling The View Access To
def index(request):
    return render(request, 'aquality_server/index.html', {})

class RiverViewSet(viewsets.ModelViewSet):
    queryset = River.objects.all().order_by('river_id')
    serializer_class = RiverSerializer
    def get_queryset(self):
        return River.objects.all().order_by('river_id')


# def addData(request):
#     returnMessage = saveRiverListToDbFromWFA()
#     return render(request, 'aquality_server/addData.html',{'returnMessage': returnMessage})

def testingPage(request):
    return render(request,'aquality_server/testing.html',{'request':request.path})