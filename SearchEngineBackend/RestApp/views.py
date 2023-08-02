from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from RestApp.models import SearchURL
from RestApp.serializers import SearchURLSerializer
from RestApp.logic import searchLogic
from RestApp.linkparser import linkparser

@csrf_exempt
def restApi(request, query, case, anda, ora, nota, id=0):
    if request.method == 'GET':
        results = SearchURL.objects.all()
        results_serializer = SearchURLSerializer(results, many=True)
        returnme = searchLogic(results_serializer, query, case, anda, ora, nota)
        return JsonResponse(returnme.matches, safe=False)

    elif request.method == 'POST':
        input_data = JSONParser().parse(request)
        input_serializer = SearchURLSerializer(data=input_data)
        if input_serializer.is_valid():
            input_serializer.save()
            return JsonResponse("Added", safe=False)
        return JsonResponse("Not added", safe=False)

    elif request.method == 'PUT':
        update_data = JSONParser().parse(request)
        fetch_data = SearchURL.objects.get(Id=update_data['Id'])
        update_serializer = SearchURLSerializer(fetch_data, data=update_data)
        if update_serializer.is_valid():
            update_serializer.save()
            return JsonResponse("Updated", safe=False)
        return JsonResponse("Not Updated", safe=False)

    elif request.method == 'DELETE':
        fetch_data = SearchURL.objects.get(Id=id)
        fetch_data.delete()
        return JsonResponse("Deleted Successfully", safe=False)
