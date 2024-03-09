from django.shortcuts import render
from . import models
from django.http import HttpResponse, HttpResponseNotFound
from rest_framework.views import APIView

class TestView(APIView):
    def get(self, request):
        num = request.query_params.get('num', None)
        return HttpResponse("Hello World! Request: " + request.method + " " + request.path + ", UA: " + request.META.get('HTTP_USER_AGENT', '') + "num: " + str(num))

class AircraftTableView(APIView):
    def get(self, request):
        pass
    def post(self, request):
        pass
    def put(self, request):
        pass
    def delete(self, request):
        pass

class MovementTableView(APIView):
    def get(self, request):
        pass
    def post(self, request):
        pass
    def put(self, request):
        pass
    def delete(self, request):
        pass
    
class AirportTableView(APIView):
    def get(self, request):
        pass
    def post(self, request):
        pass
    def put(self, request):
        pass
    def delete(self, request):
        pass
    
class UserProfileTableView(APIView):
    def get(self, request):
        pass
    def post(self, request):
        pass
    def put(self, request):
        pass
    def delete(self, request):
        pass