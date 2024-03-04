from django.shortcuts import render

# Sample HTTP Response

from django.http import HttpResponse

def hello_world(request):
    print(request)
    return HttpResponse("Hello World! Request: " + request.method + " " + request.path + ", UA: " + request.META.get('HTTP_USER_AGENT', ''))
