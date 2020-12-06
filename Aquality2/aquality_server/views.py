from django.shortcuts import get_object_or_404, render
from aquality_server.actions import *
<<<<<<< HEAD
from rest_framework import viewsets
from .serializers import RiverSerializer
from .models import River
=======
>>>>>>> 9c6e19559ebd29d5a324dd31e2d6a958c6ca809d

# Controlling The View Access To
def index(request):
    return render(request, 'aquality_server/index.html', {})

<<<<<<< HEAD
class RiverViewSet(viewsets.ModelViewSet):
    queryset = River.objects.all().order_by('river_id')
    serializer_class = RiverSerializer

=======
>>>>>>> 9c6e19559ebd29d5a324dd31e2d6a958c6ca809d
# def addData(request):
#     returnMessage = saveRiverListToDbFromWFA()
#     return render(request, 'aquality_server/addData.html',{'returnMessage': returnMessage})