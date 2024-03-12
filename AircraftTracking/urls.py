from django.urls import path
from .views import record_aircraft_movement

urlpatterns = [
    path('api/record_movement/', record_aircraft_movement, name='record_aircraft_movement'),
]

