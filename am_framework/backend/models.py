from django.db import models

# The following model are adapted from 
# InitialDatabase.sql placed in repo root directory
class Fleet(models.Model):
    idFleet = models.AutoField(primary_key=True)
    TailNumber = models.CharField(max_length=45, null=True)
    ShipNumber = models.IntegerField(null=True)
    Type = models.CharField(max_length=45, null=True)
    Status = models.CharField(max_length=45, null=True)
    Location = models.CharField(max_length=45, null=True)

# @qxu229: the model is not migrated to the database
# Config the database setting in ../am_framework/settings.py first
# Then run `python manage.py makemigrations` and `python manage.py migrate` 
# to create the table in the database
# NOTE: DO NOT DIRECTLY RUN SQL COMMANDS TO CREATE TABLES,
# or Django will not be able to manage them
