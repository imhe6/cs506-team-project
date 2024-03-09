from rest_framework import serializers
from .models import *


class AircraftSerializer(serializers.ModelSerializer):
    class Meta:
        model = aircrafttable
        fields = ['aircraftId', 'tailNumber', 'shipNumber', 'Type', 'status', 'location']

class AirportSerializer(serializers.ModelSerializer):
    class Meta:
        model = airporttable
        fields = ['airportId', 'airportCode', 'lattitude', 'longitude', 'numAircraft', 'userId']

class MovementSerializer(serializers.ModelSerializer):
    class Meta:
        model = movementtable
        fields = ['movementId', 'airportId', 'arrivalDate', 'departureDate', 'aircraftId', 'userId']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = userprofile
        fields = ['userId', 'username', 'password', 'role']