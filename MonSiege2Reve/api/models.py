from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Room(models.Model):
    name = models.CharField(max_length=50)
    nbPlaces = models.IntegerField()
    flag = models.BooleanField()

class Session(models.Model):
    filmId = models.ForeignKey("Movie", on_delete=models.CASCADE, null=True)
    isSpecial = models.BooleanField()
    language = models.CharField(max_length=5)
    timestamp = models.DateTimeField()
    roomId = models.ForeignKey("Room", on_delete=models.CASCADE)
    flag = models.BooleanField()

class Purchase(models.Model):
    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    sessionId = models.ForeignKey("Session", on_delete=models.CASCADE)
    priceId = models.ForeignKey("Price", on_delete=models.CASCADE, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

class Price(models.Model):
    name = models.CharField(max_length=50)
    price = models.FloatField()
    isSpecial = models.BooleanField()
    flag = models.BooleanField()

class Movie(models.Model):
    name = models.CharField(max_length=50)
    duration = models.IntegerField()
    image = models.URLField()
    synopsis = models.CharField(max_length=500)
    year = models.IntegerField()
    realisator = models.CharField(max_length=25)
    flag = models.BooleanField()
