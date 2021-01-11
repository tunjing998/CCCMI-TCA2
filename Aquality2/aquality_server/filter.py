from decouple import config
import requests
from .models import River

def getLocationFromRequest(request):
    longitute = request.query_params.get('longitute')
    latitude  = request.query_params.get('latitude')
    return [latitude,longitute]

def getLocationPointFromGoogleApi(request):
    request_url = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input="+ request.query_params.get('location')+"&inputtype=textquery&fields=geometry&key=" + config('GOOGLEMAP_APIKEY')
    locationfound = requests.get(request_url)
    data = locationfound.json().get("candidates")[0].get("geometry").get("location")
    longitude = data.get("lng")
    latitude  = data.get("lat")
    return [latitude,longitude]

def getLocationPoint(request):
    if(request.query_params.get('longitute') and request.query_params.get('latitude')):
        pnt = getLocationFromRequest(request)
    elif(request.query_params.get('location')):
        pnt = getLocationPointFromGoogleApi(request)
    else:
        latitude = 54.93
        longitute = -7.55
    return [latitude,longitute]
    return pnt
    
def getNearbyList(pnt):
    query = """SELECT 
    river_id,
	longitute,
	latitute,
 
 
	ROUND(
		6378.138 * 2 * ASIN(
			SQRT(
				POW(
					SIN(
						(
							"""+str(pnt[0])+""" * PI() / 180 - latitute * PI() / 180
						) / 2
					),
					2
				) + COS("""+str(pnt[0])+""" * PI() / 180) * COS(latitute * PI() / 180) * POW(
					SIN(
						(
							"""+str(pnt[1])+""" * PI() / 180 - 	longitute * PI() / 180
						) / 2
					),
					2
				)
			)
		) * 1000
	) AS distance
FROM
aquality_server_river
ORDER BY
	distance ASC"""    
    return River.objects.raw(query)[0:5]    
