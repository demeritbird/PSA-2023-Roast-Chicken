from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from . models import *
from . serializer import *

# Create your views here.
          
@api_view(['GET'])
def getData(request):
    person={'foo':'bar'}
    return Response(person)