from rest_framework import serializers
from .models import River,Data,Login_Account

class RiverSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = River
        fields = ("river_id", 
                  "river_code",
                  "river_name",
                  "river_catchments_code",
                  "river_catchments", 
                  "latitude", 
                  "longitude",
                  "local_authority",
                  "water_body_category",
                  "protected_area",
                  "transboundary",
                  "canal")
       
class DataSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Data
        fields = ("data_id","arduino_id","latitude","longitude","ph","temp")
        
class DataSerializerWithDate(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Data
        fields = ("data_id","arduino_id","latitude","longitude","ph","temp","date_captured")
                
class LoginAccountSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Login_Account
        fields = ("account_id","username","email","password")