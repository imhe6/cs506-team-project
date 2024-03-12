from django.db import models

# The following model are adapted from 
# InitialDatabase.sql placed in repo root directory
class aircrafttable(models.Model):
    aircraftId = models.AutoField(primary_key=True)
    tailNumber = models.CharField(max_length=45, null=True)
    shipNumber = models.IntegerField(null=True)
    type = models.CharField(max_length=4, null=True)
    status = models.CharField(max_length=45, null=True)
    location = models.CharField(max_length=4, null=True)

class airporttable(models.Model):
    airportId = models.AutoField(primary_key =True)
    airportCode = models.CharField(max_length = 4)
    latitude = models.CharField(max_length = 5)
    longitude = models.CharField(max_length = 5)
    numAircraft = models.IntegerField(null = True)
    userId = models.IntegerField(null = True)

class movementtable(models.Model):
    movementId = models.AutoField(primary_key = True)
    airportId = models.IntegerField(null = True) #TODO ADD ARRIVAL AND DEPARTURE
    arrivalDate = models.CharField(max_length = 8)
    departureDate = models.CharField(max_length = 8)
    aircraftId = models.IntegerField(null = True)
    userId = models.IntegerField(null = True)

class userprofile(models.Model):
    userId = models.IntegerField(primary_key =True)
    username = models.CharField(max_length = 45)
    password = models.CharField(max_length = 45)
    role = models.CharField(max_length = 45)
