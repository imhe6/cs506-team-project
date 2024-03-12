from django.db import models

class Airport(models.Model):
    code = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.name} ({self.code})"

class AircraftMovement(models.Model):
    airport = models.ForeignKey(Airport, on_delete=models.CASCADE, related_name="movements")
    aircraft_code = models.CharField(max_length=10)
    movement_type = models.CharField(max_length=10, choices=[('arrival', 'Arrival'), ('departure', 'Departure')])
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.aircraft_code} - {self.movement_type} at {self.airport.code} on {self.timestamp}"

