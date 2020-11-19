from django.db import models
import requests

# Create your models here.
class CatchmentCatcher:

    catchmentsUrl = "https://wfdapi.edenireland.ie/api/"
    catchmentApiKey = 'catchment/'
    subcatchmentApiKey = 'subcatchment'
    waterbodyApiKey = 'waterbody'

    def getMainCatchment():
        """
        docstring
        """
        targetUrl = CatchmentCatcher.catchmentsUrl + CatchmentCatcher.catchmentApiKey
        response = requests.get(targetUrl)
        jsonData = response.json()
        return jsonData['Catchments']

    def getSubCatchment():
        catchmentList = getMainCatchment()
        for catchment in catchmentList:
            print(catchment)
        pass