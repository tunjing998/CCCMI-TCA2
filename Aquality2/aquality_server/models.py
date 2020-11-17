from django.db import models

# Create your models here.

class Login_Account(models.Model):
    account_id = models.AutoField(primary_key = True)
    username = models.CharField(max_length=200)
    email = models.EmailField()
    password = models.CharField(max_length=200)

