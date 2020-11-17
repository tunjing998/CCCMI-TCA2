from django.db import models

# Create your models here.

class Login_Account(models.Model):
    account_id = models.AutoField(primary_key = True)
    username = models.CharField(max_length=200)
    email = models.EmailField()
    password = models.CharField(max_length=200)

class User_Account(models.Model):
    user_id = models.OneToOneField(
        Login_Account,
        on_delete=models.CASCADE,
        primary_key = True,
    )
    full_name = models.CharField(max_length = 200)
    created_at = models.TimeField()
    user_group = models.CharField(max_length = 200)

class Image(models.Model):
    image_id = models.AutoField(primary_key = True)
    image_path = models.CharField(max_length =200)
    data_id = models.ForeignKey(Data,on_delete=models.CASCADE)

class Data(models.Model):
    data_id = models.AutoField(primary_key = True)


