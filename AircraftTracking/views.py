from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from .models import Airport, AircraftMovement
import json

@csrf_exempt
@require_http_methods(["POST"])
def record_aircraft_movement(request):
    # parse JSON data from the request body
    data = json.loads(request.body)
    airport_code = data.get('airport_code')
    aircraft_code = data.get('aircraft_code')
    movement_type = data.get('movement_type')

    try:
        airport = Airport.objects.get(code=airport_code)
        AircraftMovement.objects.create(
            airport=airport,
            aircraft_code=aircraft_code,
            movement_type=movement_type
        )
        return JsonResponse({'status': 'success', 'message': 'Aircraft movement recorded successfully.'})
    except Airport.DoesNotExist:
        return JsonResponse({'status': 'error', 'message': 'Airport not found.'}, status=404)
