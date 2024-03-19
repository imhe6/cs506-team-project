from django.db import models

# The following model are adapted from 
# InitialDatabase.sql placed in repo root directory
class aircrafttable(models.Model):
    aircraftId = models.AutoField(primary_key=True)
    tailNumber = models.CharField(max_length=45, null=True)
    #Define a Django Enum type for the aircraft
    class aType(models.TextChoices):
        A320 = "A320"
        A321 = "A321"
        A330 = "A330"
        A350 = "A350"
        B737 = "B737"
        B757 = "B757"
        B767 = "B767"
        B787 = "B787"
        B777 = "B777"
    aircraftType = models.CharField(choices= aType,max_length = 4, null=True)
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
    arrivalAirportId = models.IntegerField(null = True)
    originAirportId = models.IntegerField(null = True)
    arrivalDate = models.CharField(max_length = 8)
    departureDate = models.CharField(max_length = 8)
    aircraftId = models.IntegerField(null = True)
    userId = models.IntegerField(null = True)

class userprofile(models.Model):
    userId = models.AutoField(primary_key =True)
    username = models.CharField(max_length = 45)
    password = models.CharField(max_length = 45)
    #Limit roles to preset conditions
    class roleChoice(models.TextChoices):
        admin = "admin"
        corporate = "corporate"
        facility = "facility"
    role = models.CharField(choices=roleChoice,max_length = 9, null = True)


# @qxu229: the model is not migrated to the database
# Config the database setting in ../am_framework/settings.py first
# Then run `python manage.py makemigrations` and `python manage.py migrate` 
# to create the table in the database
# NOTE: DO NOT DIRECTLY RUN SQL COMMANDS TO CREATE TABLES,
# or Django will not be able to manage them
