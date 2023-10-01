from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from . models import *
from . serializer import *
import sys
import os

import json
from django.http import JsonResponse

models_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'models'))
sys.path.append(models_dir)

# Now you can import functions from model.py
from model import start

# Create your views here.
          
@api_view(['POST'])
def getData(request):
    try:
        json_data = request.data 
        result = start(json_data)
        return JsonResponse({'result': result})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)