from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from ..models import aircrafttable

class AircraftTableGetTest(TestCase):
    def setUp(self):
        self.instance = aircrafttable.objects.create(
            tailNumber='123',aircraftType='A320',status='Departured',location='LAX')
        self.client = APIClient()
        
    def test_get(self):
        response = self.client.get('/api/aircraft/')
        self.assertEqual(response.status_code, 200)
        print(response)