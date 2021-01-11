from rest_framework import serializers
from .models import River,Data

class RiverSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = River
        fields = ("river_id", 
                  "river_code",
                  "river_name",
                  "river_catchments_code",
                  "river_catchments", 
                  "latitute", 
                  "longitute",
                  "local_authority",
                  "water_body_category",
                  "protected_area",
                  "transboundary",
                  "canal")
       
class DataSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Data
        fields = ("data_id","latitute","longitute","ph","temp","date_captured")
        