from decouple import config
import requests
from django.contrib.gis.geos import Point


def getLocationPoint(request):
    if(request.query_params.get('longitute') and request.query_params.get('latitude')):
        pnt = Point(request.query_params.get('longitute'),request.query_params.get('latitude'))
    elif(request.query_params.get('location')):
        request_url = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input="+ request.query_params.get('location')+"&inputtype=textquery&fields=geometry&key=" + config('GOOGLEMAP_APIKEY')
        locationfound = requests.get(request_url)
        data = locationfound.json().get("candidates")[0].get("geometry").get("location")
        pnt = Point(data.get("lat"),data.get("lng"))
    else:
        pnt = Point(-7.55,54.93)
    return pnt

