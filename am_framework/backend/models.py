from django.db import models

# The following model are adapted from 
# InitialDatabase.sql placed in repo root directory
class aircrafttable(models.Model):
    aircraftId = models.AutoField(primary_key=True)
    tailNumber = models.CharField(max_length=45, null=True)
    shipNumber = models.IntegerField(null=True)
    Type = models.CharField(max_length=4, null=True)
    Status = models.CharField(max_length=45, null=True)
    Location = models.CharField(max_length=4, null=True)

class airporttable(models.Model):
    airportId = models.AutoField(primary_key =True)
    airportCode = models.CharField(max_length = 4)
    lattitude = models.CharField(max_length = 5)
    longitude = models.CharField(max_length = 5)
    numAircraft = models.IntegerField(null = True)
    userId = models.IntegerField(null = True)

class movementtable(models.Model):
    movementId = models.AutoField(primary_key = True)
    airportId = models.IntegerField(null = True)
    arrivalDate = models.CharField(max_length = 8)
    departureDate = models.CharField(max_length = 8)
    aircraftId = models.IntegerField(null = True)
    userId = models.IntegerField(null = True)

# @qxu229: the model is not migrated to the database
# Config the database setting in ../am_framework/settings.py first
# Then run `python manage.py makemigrations` and `python manage.py migrate` 
# to create the table in the database
# NOTE: DO NOT DIRECTLY RUN SQL COMMANDS TO CREATE TABLES,
# or Django will not be able to manage them
