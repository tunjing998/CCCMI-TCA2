from django.shortcuts import render
from catchmentApiCatch.models import CatchmentCatcher
import requests
from django.http import HttpResponse

def home(request):
    # catchmentList = CatchmentCatcher.getMainCatchment()
    catchmentList = CatchmentCatcher.getOneWaterDetails()
    catchmentList.get("Catchment")
    return render(request, 'catchmentApiCatch/home.html', {
        'catchmentList': catchmentList
    })
