import requests
from aquality_server.models import River

catchmentsUrl = "https://wfdapi.edenireland.ie/api/"
catchmentApiKey = 'catchment/'
subcatchmentApiKey = '/subcatchment/'
waterbodyApiKey = 'waterbody/'

def getJsonFrom(targetUrl):
    response = requests.get(targetUrl)
    return response.json()

def getCatchmentList():
    targetUrl = catchmentsUrl + catchmentApiKey
    jsonData = getJsonFrom(targetUrl)
    return jsonData['Catchments']

def getCatchmentDetail(code):
    targetUrl = catchmentsUrl + catchmentApiKey + code
    jsonData = getJsonFrom(targetUrl)
    return jsonData

def getCatchmentDetailList():
    catchmentList = getCatchmentList()
    catchmentDataList = []
    for catchment in catchmentList:
        targetUrl = catchmentsUrl + catchmentApiKey + catchment['Code']
        catchmentDataList.append(getJsonFrom(targetUrl))
    return catchmentDataList

def getSubCatchmentDetail(subcatchmentcode):
    targetUrl = catchmentsUrl + catchmentApiKey + subcatchmentcode.split('_')[0]+ subcatchmentApiKey + subcatchmentcode
    jsonData = getJsonFrom(targetUrl)
    return jsonData

def getWaterBodyDetail(waterbodycode):
    targetUrl = catchmentsUrl + waterbodyApiKey + waterbodycode
    jsonData = getJsonFrom(targetUrl)
    return jsonData

def getAllWaterBodyCode():
    catchmentList = getCatchmentDetailList()
    waterbodyCodeList = []
    for catchment in catchmentList:
        for subcatchment in catchment['Subcatchments']:
            for waterbody in getSubCatchmentDetail(subcatchment['Code']).get("Waterbodies"):
                waterbodyCodeList.append(waterbody["Code"])
    return waterbodyCodeList
            
def getAllWaterBodyDetails():
    waterbodyCodeList = getAllWaterBodyCode()
    waterbodyDetailList = []
    for waterbodyCode in waterbodyCodeList:
        targetUrl = catchmentsUrl + waterbodyApiKey + waterbodyCode
        waterbodyDetailList.append(getJsonFrom(targetUrl))
    return waterbodyDetailList

def getOneWaterDetails():
    waterbodyCode = "IE_NW_01B010100"
    targetUrl = catchmentsUrl + waterbodyApiKey + waterbodyCode
    return getJsonFrom(targetUrl)

def saveRiverListToDb(waterbodyList):
    for waterbody in waterbodyList:
        water = River(
                river_code=waterbody.get("Code"),
                river_name = waterbody.get("Name"),
                river_catchments =waterbody.get("Code") ,
                longitute =waterbody.get("Longitude") ,
                langitute =waterbody.get("Latitude") ,
                local_authority = waterbody.get("LocalAuthority"),
                water_body_category  =waterbody.get("Type") ,
                protected_area = waterbody.get("ProtectedArea"),
                transboundary = waterbody.get("Transboundary"),
                canal =waterbody.get("IsCanal") ,
                )
        water.save()

def saveRiverListToDbFromWFA():
    waterbodylist = getAllWaterBodyDetails()
    saveRiverListToDb(waterbodylist)
    return 'Done'