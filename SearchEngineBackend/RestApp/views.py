from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt # To accept data from different domains. Domains here refer to front end.
from rest_framework.parsers import JSONParser # To covert data to the data model
from django.http.response import JsonResponse

from RestApp.models import SearchURL    
from RestApp.serializers import SearchURLSerializer

from RestApp.logic import searchLogic
from RestApp.linkparser import linkparser

# Create your views here.
# It is used to write the api methods

#python manage.py runserver

@csrf_exempt
def restApi(request, query, case, anda, ora, nota, id=0):
    if request.method == 'GET':
        results = SearchURL.objects.all()# To retrieve all the data
        results_serializer = SearchURLSerializer(results, many=True) # To convert data to JSON format
        returnme = searchLogic(results_serializer, query, case, anda, ora, nota)
        #temp = linkparser(returnme)
        return JsonResponse(returnme.matches, safe=False) #safe = False is to say that JSON response conversion is valid

    elif request.method == 'POST':
        input_data = JSONParser().parse(request)
        input_serializer = SearchURLSerializer(data=input_data)
        #To check if the JSON data model is the valid one
        if input_serializer.is_valid():
            input_serializer.save() # TO save the data in the database
            return JsonResponse("Added", safe = False)
        return JsonResponse("Not added", safe = False)

    elif request.method == 'PUT':
        update_data = JSONParser().parse(request)
        fetch_data = SearchURL.objects.get(Id = update_data['Id'])
        update_serializer = SearchURLSerializer(fetch_data, data = update_data)
        if update_serializer.is_valid():
            update_serializer.save()
            return JsonResponse("Updated", safe = False)
        return JsonResponse("Not Updated", safe = False)


    elif request.method == 'DELETE':
        fetch_data = SearchURL.objects.get(Id = id)
        fetch_data.delete()
        return JsonResponse("Deleted Successfully", safe = False)


           
