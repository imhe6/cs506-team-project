import json
from django.shortcuts import render
from .models import *
from .serializers import *
from django.http import HttpResponse, JsonResponse
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.response import Response
from rest_framework.views import APIView


class AircraftManagerAPIView(APIView):
    """Base class for RESTful API for table operations in Aircraft Manager"""

    """
    Constructor for AircraftManager class.
    
    :param pk: Field name of primary key of the table.
    :type pk: models.Model
    :param serializer: Serializer for entries of the table.
    :type serializer: serializers.ModelSerializer
    """

    def __init__(self, model: models.Model, serializer, **kwargs) -> None:
        super().__init__(**kwargs)
        self.model: models.Model = model
        self.serializer: serializers.ModelSerializer = serializer
        self.pk_name: str = self.model._meta.pk.name

    def check_missing_fields(self, jsonDict: dict) -> bool:
        """Check if the dictionary has all the fields required by the table.
        """
        missing_fields = []
        model_field_names = [f.name for f in self.model._meta.get_fields()]
        for fname in model_field_names:
            if fname not in jsonDict:
                missing_fields.append(fname)
        return missing_fields

    def check_unwanted_fields(self, jsonDict: dict) -> bool:
        """Check if the dictionary has any fields that are not in the table.
        """
        unwanted_fields = []
        model_field_names = [f.name for f in self.model._meta.get_fields()]
        for fname in jsonDict:
            if fname not in model_field_names:
                unwanted_fields.append(fname)
        return unwanted_fields

    def get(self, request):
        print(self.pk_name)
        id = request.query_params.get(self.pk_name, None)
        if not id:
            return JsonResponse(
                data={"status": False,
                      "message": "ID invalid or not provided in request",
                      "data": None},
                status=400)
        try:
            targetObject = self.model.objects.get(pk=id)
            serializer = self.serializer(targetObject)
        except ObjectDoesNotExist:
            return JsonResponse(
                data={"status": False,
                      "message": "entry not found",
                      "data": None},
                status=404)

        return JsonResponse(
            data={"status": True,
                  "message": "entry found",
                  "data": serializer.data},
            status=200)

    def post(self, request):
        # convert request.body to a dictionary
        body = request.body.decode('utf-8')
        dataDict = json.loads(body)
        # check if all fields are present
        missing_fields = self.check_missing_fields(dataDict)
        if missing_fields:
            return JsonResponse(
                data={"status": False,
                      "message": "missing fields in request body",
                      "data": None},
                status=400)
        print("Dict from JSON in Request Body: ", dataDict)
        print("Primary key in Dict: ", dataDict[self.pk_name])
        # check if primary key is already in the database
        if self.model.objects.filter(pk=dataDict[self.pk_name]).exists():
            return JsonResponse(
                {"status": False,
                 "message": "entry already exists",
                 "data": None},
                status=400)
        # create a new table entry
        newEntry = self.model(**dataDict)
        newEntry.save()
        newEntrySerializer = self.serializer(newEntry)
        return JsonResponse(
            data={"status": True,
                  "message": "entry created",
                  "data": newEntrySerializer.data},
            status=201)

    def put(self, request):
        # convert request.body to a dictionary
        body = request.body.decode('utf-8')
        dataDict = json.loads(body)
        # check if there are any unwanted fields
        if self.check_unwanted_fields(dataDict):
            return JsonResponse(
                data={"status": False,
                      "message": "unwanted fields in request body",
                      "data": None},
                status=400)
        print("Dict from JSON in Request Body: ", dataDict)
        print("Primary key in Dict: ", dataDict[self.pk_name])
        # check if primary key is already in the database
        if self.model.objects.filter(pk=dataDict[self.pk_name]).exists():
            # update the existing entry
            self.model.objects.filter(
                pk=dataDict[self.pk_name]).update(**dataDict)
            entry = self.model.objects.get(pk=dataDict[self.pk_name])
            serializer = self.serializer(entry)
            return JsonResponse(
                data={"status": True,
                      "message": "entry updated",
                      "data": serializer.data},
                status=200)
        # primary key not found
        return JsonResponse(
            data={"status": False,
                  "message": "entry not found",
                  "data": None},
            status=404)

    def delete(self, request):
        id = request.query_params.get(self.pk_name, None)
        if not id:
            # ID not provided in request
            return JsonResponse(
                data={"status": False,
                      "message": "ID invalid or not provided in request",
                      "data": None},
                status=400)
        try:
            targetObject = self.model.objects.get(pk=id)
            targetObject.delete()
        except ObjectDoesNotExist:
            return JsonResponse(
                data={"status": False,
                      "message": "entry not found",
                      "data": None},
                status=404)
        return JsonResponse(
            data={"status": True,
                  "message": "entry deleted",
                  "data": None},
            status=200)


class FrontendReadOnlyAPIView(AircraftManagerAPIView):
    """
    Class for tables that are read-only from the frontend.
    """
    def post(self, request):
        return JsonResponse(
            data={"status": False,
                  "message": "interface read-only",
                  "data": None},
            status=400)

    def put(self, request):
        return JsonResponse(
            data={"status": False,
                  "message": "interface read-only",
                  "data": None},
            status=400)

    def delete(self, request):
        return JsonResponse(
            data={"status": False,
                  "message": "interface read-only",
                  "data": None},
            status=400)


class AircraftTableView(AircraftManagerAPIView):
    '''
    RESTful API for AircraftTable operations.
    '''

    def __init__(self, **kwargs) -> None:
        model = aircrafttable
        serializer = AircraftSerializer
        super().__init__(model=model, serializer=serializer, **kwargs)


class AirportTableView(AircraftManagerAPIView):
    '''
    RESTful API for AirportTable operations.
    '''

    def __init__(self, **kwargs) -> None:
        model = airporttable
        serializer = AirportSerializer
        super().__init__(model=model, serializer=serializer, **kwargs)


class MovementTableView(FrontendReadOnlyAPIView):
    '''
    RESTful API for MovementTable operations.
    This table is read-only from the frontend.
    '''

    def __init__(self, **kwargs) -> None:
        model = movementtable
        serializer = MovementSerializer
        super().__init__(model=model, serializer=serializer, **kwargs)


class UserProfileTableView(FrontendReadOnlyAPIView):
    '''
    RESTful API for UserProfileTable operations.
    This table is read-only from the frontend.
    '''

    def __init__(self, **kwargs) -> None:
        model = userprofile
        serializer = UserSerializer
        super().__init__(model=model, serializer=serializer, **kwargs)
