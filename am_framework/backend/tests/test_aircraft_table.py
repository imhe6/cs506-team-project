from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from ..models import aircrafttable, userprofile


'''
This class tests the get method of aircraft table with different filters.
Author: Alvin Cheng
'''
class AircraftTableGetTest(TestCase):

    '''
    Create some aircraft instances before each testing
    '''
    @classmethod
    def setUpTestData(cls):
        cls.rootUser = userprofile.objects.create(username='root',password='1234', role='admin')
        cls.aircrafts = []
        cls.aircrafts.append(aircrafttable.objects.create(
            tailNumber='111',aircraftType='A320',status='Departured',location='LAX'))
        cls.aircrafts.append(aircrafttable.objects.create(
            tailNumber='222',aircraftType='A320',status='Arrived',location='ORD'))
        cls.aircrafts.append(aircrafttable.objects.create(
            tailNumber='333',aircraftType='A330',status='Departured',location='ORD'))
        cls.client = APIClient()


    '''
    This 
    '''
    def compareHelper(self, aircraftGot: dict, aircraftCreated: aircrafttable):
        self.assertEqual(aircraftGot['aircraftId'], aircraftCreated.aircraftId)
        self.assertEqual(aircraftGot['tailNumber'], aircraftCreated.tailNumber)
        self.assertEqual(aircraftGot['aircraftType'], aircraftCreated.aircraftType)
        self.assertEqual(aircraftGot['status'], aircraftCreated.status)
        self.assertEqual(aircraftGot['location'], aircraftCreated.location)
        
    '''
    Test with no filter, should return all entries of aircrafts
    '''
    def test_get_all_entries(self):
        # Send response with no parameters
        response = self.client.get('/api/aircraft/')
        # Check if status code is 200 (success)
        self.assertEqual(response.status_code, 200)
        
        # Check if we get all three entries
        data = response.json()['data']
        self.assertEqual(len(data), 3)

        # Compare each aircraft got from database with created aircrafts
        for i in range(len(data)):
            self.compareHelper(data[i], self.aircrafts[i])

    '''
    Test getting only one entry with primaryId
    '''
    def test_get_single_entry_with_primaryId(self):
        '''
        Send get request with primary ID
        '''
        for i in range(len(self.aircrafts)):
            # Send response with primary ID (aircraftID) should only get one entry
            response = self.client.get(f'/api/aircraft/?aircraftId={i+1}')
            # Check if we get only one entry
            data = response.json()['data']
            self.assertEqual(len(data), 1)

            # Compare aircraft got from database with created aircraft
            self.compareHelper(data[0], self.aircrafts[i])

    '''
    Test getting only one entry with Non primary ID field
    '''
    def test_get_single_entry_with_nonprimaryId(self):
        '''
        Send get request with tailNumber
        '''
        for i in range(len(self.aircrafts)):
            # Send request with tailNumber, should only get one entry
            response = self.client.get(f'/api/aircraft/?tailNumber={(i+1)*111}')
            # Check if we get only one entry
            data = response.json()['data']
            self.assertEqual(len(data), 1)

            # Compare aircraft got from database with created aircraft
            self.compareHelper(data[0], self.aircrafts[i])

        '''
        Send get reqeust with aircraftType
        '''
        # Send request with tailNumber, should only get one entry
        response = self.client.get(f'/api/aircraft/?aircraftType=A330')
        # Check if we get only one entry
        data = response.json()['data']
        self.assertEqual(len(data), 1)

        # Compare aircraft got from database with created aircraft
        self.compareHelper(data[0], self.aircrafts[2])

        '''
        Send get reqeust with status
        '''
        # Send request with tailNumber, should only get one entry
        response = self.client.get(f'/api/aircraft/?status=Arrived')
        # Check if we get only one entry
        data = response.json()['data']
        self.assertEqual(len(data), 1)

        # Compare aircraft got from database with created aircraft
        self.compareHelper(data[0], self.aircrafts[1])

        '''
        Send get reqeust with location
        '''
        # Send request with tailNumber, should only get one entry
        response = self.client.get(f'/api/aircraft/?location=LAX')
        # Check if we get only one entry
        data = response.json()['data']
        self.assertEqual(len(data), 1)

        # Compare aircraft got from database with created aircraft
        self.compareHelper(data[0], self.aircrafts[0])

