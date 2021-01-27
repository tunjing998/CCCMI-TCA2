from rest_framework import serializers
from .models import River,Data,Login_Account,User_Account,Insect,InsectGroup

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

class UserAccountSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User_Account
        fields = ("user_group","user","occupation","bio","profile_pic","date_of_birth")
      
class InsectSerializer(serializers.HyperlinkedModelSerializer):
    insect_group = serializers.PrimaryKeyRelatedField(read_only = True)
    
    class Meta:
        model = Insect
        fields = ('insect_id','insect_name','insect_desc','insect_group','insect_image_path')
