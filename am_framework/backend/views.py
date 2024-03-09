from django.shortcuts import render
from . import models
from django.http import HttpResponse, HttpResponseNotFound, HttpResponseBadRequest
from rest_framework.views import APIView

'''
TODO: To be deleted
'''
class TestView(APIView):
    def get(self, request):
        num = request.query_params.get('num', None)
        return HttpResponse("Hello World! Request: " + request.method + " " + request.path + ", UA: " + request.META.get('HTTP_USER_AGENT', '') + "num: " + str(num))

'''
RESTful API for AircraftTable operations
'''
class AircraftTableView(APIView):
    def get(self, request):
        aircraftId = request.query_params.get('aircraftId', None)
        if not aircraftId:
            return HttpResponseBadRequest("Aircraft ID Not Specified")
        else:
            # TODO
            return HttpResponse(f"Aircraft ID is {aircraftId}")

    
    def post(self, request):
        pass


    def put(self, request):
        pass


    def delete(self, request):
        pass

'''
RESTful API for MovementTable operations
'''
class MovementTableView(APIView):
    def get(self, request):
        pass


    def post(self, request):
        pass


    def put(self, request):
        pass


    def delete(self, request):
        pass

'''
RESTful API for AirportTable operations
'''
class AirportTableView(APIView):
    def get(self, request):
        pass


    def post(self, request):
        pass


    def put(self, request):
        pass


    def delete(self, request):
        pass
    

'''
RESTful API for UserProfileTable operations
'''
class UserProfileTableView(APIView):
    def get(self, request):
        pass


    def post(self, request):
        pass


    def put(self, request):
        pass


    def delete(self, request):
        pass