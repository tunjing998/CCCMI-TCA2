from django.shortcuts import get_object_or_404, render
from aquality_server.actions import *
from rest_framework import viewsets
from .serializers import *
from .models import River
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from decouple import config
from aquality_server.filter import *

# Controlling The View Access To
def index(request):
    return render(request, 'aquality_server/index.html', {})

class DataViewSet(viewsets.ModelViewSet):
    queryset = Data.objects.all()
    serializer_class = DataSerializerWithDate
    serializer_class_save = DataSerializer
    def create(self,request):
        if request.method == 'POST':
            saveSerialize = self.serializer_class_save(data = request.data)
            if saveSerialize.is_valid():
                saveSerialize.save()
                return Response( saveSerialize.data, status=status.HTTP_201_CREATED)      
        return Response({
            'status': 'Bad request',
            'message': 'Data could not be created with received data.'
        }, status=status.HTTP_400_BAD_REQUEST)
    def get_queryset(self):
        return Data.objects.all()
    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            self.perform_destroy(instance)
        except status.HTTP_400_BAD_REQUEST:
            pass
        return Response(status=status.HTTP_204_NO_CONTENT)    
               

class RiverViewSet(viewsets.ModelViewSet):
    queryset = River.objects.all().order_by('river_id')
    serializer_class = RiverSerializer
    def get_queryset(self):
        # return River.objects.all().order_by('river_id')
        pnt = getLocationPoint(self.request)
        # return River.objects.filter(location__distance_lt=(pnt,D(m=10000)))
        return getNearbyList(pnt)


class AccountUserViewSet(viewsets.ModelViewSet):
    queryset = Login_Account.objects.all().order_by('account_id')
    serializer_class = LoginAccountSerializer
    def create(self,request):
        if request.method == 'POST':
            saveSerialize = self.serializer_class(data = request.data)
            if saveSerialize.is_valid():
                saveSerialize.save()
                return Response( saveSerialize.data, status=status.HTTP_201_CREATED)        
        return Response({
            'status': 'Bad request',
            'message': 'Account could not be created with received data.'
        }, status=status.HTTP_400_BAD_REQUEST)
    def get_queryset(self):
        return Login_Account.objects.all().order_by('account_id')
    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            self.perform_destroy(instance)
        except status.HTTP_400_BAD_REQUEST:
            pass
        return Response(status=status.HTTP_204_NO_CONTENT)

# def addData(request):
#     returnMessage = saveRiverListToDbFromWFA()
#     return render(request, 'aquality_server/addData.html',{'returnMessage': returnMessage})

def testingPage(request):
    # request_url = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=River&inputtype=textquery&fields=geometry&key=" + config('GOOGLEMAP_APIKEY')
    # locationfound = requests.get(request_url)
    # data = locationfound.json().get("candidates")[0].get("geometry").get("location")
    return render(request,'aquality_server/testing.html',{'request':request})