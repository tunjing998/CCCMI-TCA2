# from django.contrib.gis.db import models
# from django.contrib.gis.geos import Point
# Create your models here.
from django.db import models

# Login Account Model
class Login_Account(models.Model):
    account_id = models.AutoField(primary_key = True)
    username = models.CharField(max_length=200)
    email = models.EmailField()
    password = models.CharField(max_length=200)
    def __str__(self):
        return self.username

#User Account Models
class User_Account(models.Model):
    user_account = models.OneToOneField(
        Login_Account,
        on_delete=models.CASCADE,
        primary_key = True,
    )
    full_name = models.CharField(max_length = 200)
    created_at = models.DateTimeField()
    user_group = models.CharField(max_length = 200)

#River Models
class River(models.Model):
    river_id = models.AutoField(primary_key = True)
    river_code = models.CharField(max_length = 200,unique=True)
    river_name = models.CharField(max_length = 200)
    river_catchments_code = models.CharField(max_length = 20)
    river_catchments = models.CharField(max_length = 200)
    # location = models.PointField(geography=True, default=Point(0.0, 0.0),null=True)
    latitute = models.FloatField(default = 0,null=True)
    longitute = models.FloatField(default = 0,null=True)
    local_authority = models.CharField(max_length = 200)
    water_body_category  = models.CharField(max_length = 200)
    protected_area = models.CharField(max_length = 20,null=True)
    transboundary = models.CharField(max_length = 20)
    canal = models.CharField(max_length = 20)
    
#Data Collected Model
class Data(models.Model):
    data_id = models.AutoField(primary_key = True) 
    river = models.ForeignKey(
        River,
        on_delete=models.CASCADE,
        default=None, 
        blank=True, 
        null=True
    )   
    # location = models.PointField(geography=True, default=Point(0.0, 0.0),null=True)
    latitute = models.FloatField(default = 0,null=True)
    longitute = models.FloatField(default = 0,null=True)
    ph = models.FloatField(default=None, blank=True, null=True)
    temp = models.FloatField(default=None, blank=True, null=True)
    date_captured = models.DateTimeField(default=None, blank=True, null=True)
    ecological_status = models.CharField(max_length = 200,default=None, blank=True, null=True)
    score_by_insect = models.IntegerField(default=None, blank=True, null=True)

#Image Model
class Image(models.Model):
    image_id = models.AutoField(primary_key = True)
    image_path = models.CharField(max_length =200)
    data = models.ForeignKey(Data,on_delete=models.CASCADE)



