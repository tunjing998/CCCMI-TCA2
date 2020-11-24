from django.db import models
from django.utils import timezone
# Create your models here.

class Login_Account(models.Model):
    account_id = models.AutoField(primary_key = True)
    username = models.CharField(max_length=200)
    email = models.EmailField()
    password = models.CharField(max_length=200)
    def __str__(self):
        return self.username

class User_Account(models.Model):
    user_account = models.OneToOneField(
        Login_Account,
        on_delete=models.CASCADE,
        primary_key = True,
    )
    full_name = models.CharField(max_length = 200)
    created_at = models.DateTimeField()
    user_group = models.CharField(max_length = 200)

class River(models.Model):
    river_id = models.AutoField(primary_key = True)
    river_code = models.CharField(max_length = 200)
    river_name = models.CharField(max_length = 200)
    river_catchments = models.CharField(max_length = 200)
    longitute = models.FloatField()
    langitute = models.FloatField()
    local_authority = models.CharField(max_length = 200)
    water_body_category  = models.CharField(max_length = 200)
    protected_area = models.BooleanField()
    area = models.FloatField()
    length = models.FloatField()
    transboundary = models.FloatField()
    canal = models.FloatField()

class Data(models.Model):
    data_id = models.AutoField(primary_key = True) 
    river = models.ForeignKey(
        River,
        on_delete=models.CASCADE,
        default=None, 
        blank=True, 
        null=True
    )   
    longitute = models.FloatField(default=None, blank=True, null=True)
    langitute = models.FloatField(default=None, blank=True, null=True)
    ph = models.FloatField(default=None, blank=True, null=True)
    temp = models.FloatField(default=None, blank=True, null=True)
    date_captured = models.DateTimeField(default=None, blank=True, null=True)
    ecological_status = models.CharField(max_length = 200,default=None, blank=True, null=True)
    score_by_insect = models.IntegerField(default=None, blank=True, null=True)

class Image(models.Model):
    image_id = models.AutoField(primary_key = True)
    image_path = models.CharField(max_length =200)
    data = models.ForeignKey(Data,on_delete=models.CASCADE)



