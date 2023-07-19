from rest_framework import serializers
from .models import Member, Room, Session, Purchase, Price

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ['id', 'name', 'firstname', 'email', 'password', 'flag']

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['id', 'name', 'nbPlaces', 'flag']

class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = ['id', 'name', 'isSpecial', 'language', 'timestamp', 'image', 'roomId', 'flag']

class PurchaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Purchase
        fields = ['id', 'userId', 'sessionId', 'quantity', 'price', 'timestamp']

class PriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Price
        fields = ['id', 'name', 'price', 'isSpecial', 'flag']
