from django.shortcuts import get_object_or_404, render
from aquality_server.actions import *

# Controlling The View Access To
def index(request):
    return render(request, 'aquality_server/index.html', {})

# def addData(request):
#     returnMessage = saveRiverListToDbFromWFA()
#     return render(request, 'aquality_server/addData.html',{'returnMessage': returnMessage})