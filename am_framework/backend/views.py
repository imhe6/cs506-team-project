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
        """
        Check if the dictionary has all the field
        required by the table (except primary key)
        """
        missing_fields = []
        model_field_names = [f.name
                             for f in self.model._meta.get_fields()
                             if f.name != self.pk_name]
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

    def filter_exist_fields(self, query_dict: dict) -> dict:
        """Filter out fields in the table.
        """
        # Initialize a dictionary to store filters
        filters = {}
        query_items = query_dict.items()
        # Iterate through query parameters and construct filters
        model_field_names = [f.name for f in self.model._meta.get_fields()]
        for field_name, field_value in query_items:
            # If the field exists in the model, Add filter to dictionary
            if field_name in model_field_names:
                filters[field_name] = field_value
        return filters

    def get(self, request):
        filters = self.filter_exist_fields(request.query_params)
        print(filters)
        if len(filters) == 0:
            return JsonResponse(
                data={"success": False,
                      "message": "no valid fields provided in request",
                      "data": None},
                status=400)
        # Query the database with the filters
        targetObjectQueryset = self.model.objects.filter(**filters)
        if targetObjectQueryset.exists():
            serializer = self.serializer(targetObjectQueryset, many=True)
            return JsonResponse(
                data={"success": True,
                      "message": "found entries with specified conditions",
                      "data": serializer.data},
                status=200)

        # Specified entry not found, return a 404 status code
        return JsonResponse(
            data={"success": False,
                  "message": "could not find entry with specified conditions",
                  "data": None},
            status=404)

    def post(self, request):
        # convert request.body to a dictionary
        body = request.body.decode('utf-8')
        dataDict: dict = json.loads(body)
        # check if all fields are present
        missing_fields = self.check_missing_fields(dataDict)
        if missing_fields:
            return JsonResponse(
                data={"success": False,
                      "message": "missing necessary fields in request body",
                      "data": None},
                status=400)
        filteredDataDict = self.filter_exist_fields(dataDict)
        print("Filtered dict from JSON in Request Body: ", filteredDataDict)
        # if primary key is specified in the request body, ignore it
        if self.pk_name in filteredDataDict:
            print("Found primary key in Dict:",
                  filteredDataDict[self.pk_name], ", ignoring.")
            del filteredDataDict[self.pk_name]
        # create a new table entry
        newEntry = self.model(**filteredDataDict)
        newEntry.save()
        newEntrySerializer = self.serializer(newEntry)
        return JsonResponse(
            data={"success": True,
                  "message": "entry created",
                  "data": newEntrySerializer.data},
            status=201)

    def put(self, request):
        # convert request.body to a dictionary
        body = request.body.decode('utf-8')
        dataDict = json.loads(body)
        # # check if there are any unwanted fields
        # if self.check_unwanted_fields(dataDict):
        #     return JsonResponse(
        #         data={"success": False,
        #               "message": "unwanted fields in request body",
        #               "data": None},
        #         status=400)
        filteredDataDict = self.filter_exist_fields(dataDict)
        print("Dict from JSON in Request Body: ", filteredDataDict)
        pk_value = filteredDataDict[self.pk_name]
        print("Primary key in Dict: ", pk_value)
        # check if primary key is already in the database
        if self.model.objects.filter(pk=pk_value).exists():
            # update the existing entry
            self.model.objects.filter(
                pk=pk_value).update(**filteredDataDict)
            entry = self.model.objects.get(pk=pk_value)
            serializer = self.serializer(entry)
            return JsonResponse(
                data={"success": True,
                      "message": "entry updated",
                      "data": serializer.data},
                status=200)
        # primary key not found
        return JsonResponse(
            data={"success": False,
                  "message": "entry not found",
                  "data": None},
            status=404)

    def delete(self, request):
        id = request.query_params.get(self.pk_name, None)
        if not id:
            # ID not provided in request
            return JsonResponse(
                data={"success": False,
                      "message": "ID invalid or not provided in request",
                      "data": None},
                status=400)
        try:
            targetObject = self.model.objects.get(pk=id)
            targetObject.delete()
        except ObjectDoesNotExist:
            return JsonResponse(
                data={"success": False,
                      "message": "entry not found",
                      "data": None},
                status=404)
        return JsonResponse(
            data={"success": True,
                  "message": "entry deleted",
                  "data": None},
            status=200)


class FrontendReadOnlyAPIView(AircraftManagerAPIView):
    """
    Class for tables that are read-only from the frontend.
    """

    def post(self, request):
        return JsonResponse(
            data={"success": False,
                  "message": "interface read-only",
                  "data": None},
            status=400)

    def put(self, request):
        return JsonResponse(
            data={"success": False,
                  "message": "interface read-only",
                  "data": None},
            status=400)

    def delete(self, request):
        return JsonResponse(
            data={"success": False,
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


class MovementTableView(AircraftManagerAPIView):
    '''
    RESTful API for MovementTable operations.
    Frontend can only read or insert entries from this table.
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
