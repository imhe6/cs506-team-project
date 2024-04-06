from django.test import TestCase
from django.utils import timezone
from ..models import aircrafttable, airporttable, movementtable, userprofile

class AircraftTableTest(TestCase):
    def test_create_aircraft(self):
        aircraft = aircrafttable.objects.create(
            tailNumber="N7890B",
            aircraftType=aircrafttable.aType.B737,
            status="Operational",
            location="JFK"
        )
        self.assertTrue(isinstance(aircraft, aircrafttable))
        self.assertEqual(aircraft.tailNumber, "N7890B")

class AirportTableTest(TestCase):
    def test_create_airport(self):
        airport = airporttable.objects.create(
            airportCode="LAX",
            latitude="33.9416",
            longitude="-118.4085",
            numAircraft=5
        )
        self.assertTrue(isinstance(airport, airporttable))
        self.assertEqual(airport.airportCode, "LAX")

class MovementTableTest(TestCase):
    def setUp(self):
        self.airport = airporttable.objects.create(airportCode="LAX", latitude="33.9416", longitude="-118.4085", numAircraft=5)
        self.aircraft = aircrafttable.objects.create(tailNumber="N7890B", aircraftType=aircrafttable.aType.B737, status="Operational", location="JFK")
    
    def test_create_movement(self):
        movement = movementtable.objects.create(
            arrivalAirportId=self.airport,
            originAirportId=self.airport,
            arrivalDate=timezone.now(),
            departureDate=timezone.now(),
            aircraftId=self.aircraft
        )
        self.assertTrue(isinstance(movement, movementtable))
        self.assertEqual(movement.arrivalAirportId, self.airport)

class UserProfileTest(TestCase):
    def test_create_user(self):
        user = userprofile.objects.create(
            username="john_doe",
            password="supersecurepassword",
            role=userprofile.roleChoice.admin
        )
        self.assertTrue(isinstance(user, userprofile))
        self.assertEqual(user.username, "john_doe")
