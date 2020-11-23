import requests

# Create your models here.
class CatchmentCatcher:

    catchmentsUrl = "https://wfdapi.edenireland.ie/api/"
    catchmentApiKey = 'catchment/'
    subcatchmentApiKey = '/subcatchment/'
    waterbodyApiKey = 'waterbody/'

    def getJsonFrom(targetUrl):
        response = requests.get(targetUrl)
        return response.json()

    def getCatchmentList():
        targetUrl = CatchmentCatcher.catchmentsUrl + CatchmentCatcher.catchmentApiKey
        jsonData = CatchmentCatcher.getJsonFrom(targetUrl)
        return jsonData['Catchments']

    def getCatchmentDetail(code):
        targetUrl = CatchmentCatcher.catchmentsUrl + CatchmentCatcher.catchmentApiKey + code
        jsonData = CatchmentCatcher.getJsonFrom(targetUrl)
        return jsonData

    def getCatchmentDetailList():
        catchmentList = CatchmentCatcher.getCatchmentList()
        catchmentDataList = []
        for catchment in catchmentList:
            targetUrl = CatchmentCatcher.catchmentsUrl + CatchmentCatcher.catchmentApiKey + catchment['Code']
            catchmentDataList.append(CatchmentCatcher.getJsonFrom(targetUrl))
        return catchmentDataList

    def getSubCatchmentDetail(subcatchmentcode):
        targetUrl = CatchmentCatcher.catchmentsUrl + CatchmentCatcher.catchmentApiKey + subcatchmentcode.split('_')[0]+ CatchmentCatcher.subcatchmentApiKey + subcatchmentcode
        jsonData = CatchmentCatcher.getJsonFrom(targetUrl)
        return jsonData

    def getWaterBodyDetail(waterbodycode):
        targetUrl = CatchmentCatcher.catchmentsUrl + CatchmentCatcher.waterbodyApiKey + waterbodycode
        jsonData = CatchmentCatcher.getJsonFrom(targetUrl)
        return jsonData

    def getAllWaterBodyCode():
        catchmentList = CatchmentCatcher.getCatchmentDetailList()
        waterbodyCodeList = []
        for catchment in catchmentList:
            for subcatchment in catchment['Subcatchments']:
                for waterbody in CatchmentCatcher.getSubCatchmentDetail(subcatchment['Code']).get("Waterbodies"):
                    waterbodyCodeList.append(waterbody["Code"])
        return waterbodyCodeList
            
    def getAllWaterBodyDetails():
        waterbodyCodeList = CatchmentCatcher.getAllWaterBodyCode()
        
        waterbodyDetailList = []
        for waterbodyCode in waterbodyCodeList:
            targetUrl = CatchmentCatcher.catchmentsUrl + CatchmentCatcher.waterbodyApiKey + waterbodyCode
            waterbodyDetailList.append(CatchmentCatcher.getJsonFrom(targetUrl))
        return waterbodyDetailList

    def getOneWaterDetails():
        waterbodyCode = "IE_NW_01B010100"
        targetUrl = CatchmentCatcher.catchmentsUrl + CatchmentCatcher.waterbodyApiKey + waterbodyCode
        return CatchmentCatcher.getJsonFrom(targetUrl)