from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from ..models import aircrafttable, userprofile
import requests
import json

'''
This class tests the put method of aircraft table with different filters.
Author: Alvin Cheng
'''
class AircraftTableGetTest(TestCase):

    '''
    '''
    @classmethod
    def setUpTestData(cls):
        cls.rootUser = userprofile.objects.create(username='root',password='1234', role='admin')
        cls.client = APIClient()

    # def test_put_all_fields(self):
    #     data = {
    #         'movementtable':'a',
    #         'tailNumber':'111',
    #         'aircraftType':'A320',
    #         'status':'Departured',
    #         'location':'LAX',
    #         'userId':self.cls.rootUser
    #     }

    #     response = self.client.post('/api/aircraft/', json.dumps(data), content_type='application/json')
    #     # response = self.client.get('/api/aircraft/')
    #     print(response.json())
    #     response = self.client.get('/api/aircraft/')
    #     print((response.json()['data']))