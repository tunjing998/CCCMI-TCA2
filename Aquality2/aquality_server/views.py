from django.shortcuts import get_object_or_404, render
from aquality_server.actions import *
from rest_framework import viewsets
from .serializers import RiverSerializer
from .models import River

# Controlling The View Access To
def index(request):
    return render(request, 'aquality_server/index.html', {})

class RiverViewSet(viewsets.ModelViewSet):
    queryset = River.objects.all().order_by('river_id')
    serializer_class = RiverSerializer

# def addData(request):
#     returnMessage = saveRiverListToDbFromWFA()
#     return render(request, 'aquality_server/addData.html',{'returnMessage': returnMessage})