from django.db import models

# Create your models here.

class User(models.Model):
    name = models.CharField(max_length=50)
    firstname = models.CharField(max_length=50)
    email = models.CharField(max_length=150)
    password = models.CharField(max_length=500)
    flag = models.BooleanField()

class Room(models.Model):
    name = models.CharField(max_length=50)
    nbPlaces = models.IntegerField()
    flag = models.BooleanField()

class Session(models.Model):
    name = models.CharField(max_length=50)
    isSpecial = models.BooleanField()
    language = models.CharField(max_length=5)
    timestamp = models.DateTimeField(auto_now_add=True)
    image = models.URLField()
    roomId = models.ForeignKey("Room", on_delete=models.CASCADE)
    flag = models.BooleanField()

class Purchase(models.Model):
    userId = models.ForeignKey("User", on_delete=models.CASCADE)
    sessionId = models.ForeignKey("Session", on_delete=models.CASCADE)
    quantity = models.IntegerField()
    price = models.FloatField()
    timestamp = models.DateTimeField()

class Price(models.Model):
    name = models.CharField(max_length=50)
    price = models.FloatField()
    isSpecial = models.BooleanField()
    flag = models.BooleanField()