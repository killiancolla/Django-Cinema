from rest_framework import serializers
from .models import Room, Session, Purchase, Price
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
    
    def register(self,data):
        user = User.objects.create(
            username = data['username'],
            first_name = data['firstname'],
            last_name = data['lastname'],
            email = data['email'],
            is_active = 1,
            is_staff = 0,
            is_superuser = 0
        )
        user.set_password(data['password'])
        user.save()
        return user


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = "__all__"

class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = "__all__"

class PurchaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Purchase
        fields = "__all__"

class PriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Price
        fields = "__all__"
