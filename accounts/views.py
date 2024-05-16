from django.http import HttpResponse
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
import requests
from rest_framework import status
from .serializers import RegisterSerializer,WatchListSerializer,StockSerializer
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated,AllowAny
from .models import WatchList,Stock
@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):

    regsiter_serializer = RegisterSerializer(data=request.data)

    if regsiter_serializer.is_valid():

        regsiter_serializer.save()

        return Response(regsiter_serializer.data,status=status.HTTP_201_CREATED)
    
    return Response(regsiter_serializer.errors,status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_stocks(request):

    try:

        user = request.user

        watch_list = WatchList.objects.filter(user=user)

        watch_list_serializer = WatchListSerializer(watch_list,many=True)

        return Response(watch_list_serializer.data,status=status.HTTP_200_OK)
    
    except:

        return Response({'msg': "Something wrong"},status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_stocks_inside_particular_watch_list(request,type):

    try:

        user = request.user

        watch_list = WatchList.objects.filter(user=user,type=type)

        watch_list_serializer = WatchListSerializer(watch_list,many=True)

        return Response(watch_list_serializer.data,status=status.HTTP_200_OK)
    
    except:

        return Response({'msg': "Something wrong"},status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_stocks_watch_list(request,type):

    try:

        user = request.user

        watch_list = WatchList.objects.filter(user=user,type=type)

        watch_list_serializer = WatchListSerializer(watch_list,many=True)

        return Response(watch_list_serializer.data,status=status.HTTP_200_OK)
    
    except:

        return Response({'msg': "Something wrong"},status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_stocks(request,stock):

    try:

        url = f'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol={stock}&interval=5min&apikey=demo'
        r = requests.get(url)
        data = r.json()

        return Response(data,status=status.HTTP_200_OK)
    
    except:

        return Response({'msg': "Something wrong"},status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def watch_list(request):

    user = request.user

    if request.method == "POST":

        data = request.data

        watch_list = WatchList.objects.create(user=user,type=data['type'],description=data['description'])

        watch_list.stocks.set(data['stocks'])

        watch_list.save()

        return Response({'msg' : "SUCCESS"},status=status.HTTP_201_CREATED)
        
    if request.method == "GET":

        watch_list = WatchList.objects.filter(user=user)

        watch_list_serializer = WatchListSerializer(watch_list,many=True)

        return Response(watch_list_serializer.data,status=status.HTTP_200_OK)
    
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def all_stocks(request):

    try:

        stocks = Stock.objects.all()

        all_stock_serializer = StockSerializer(stocks,many=True)

        return Response(all_stock_serializer.data,status=status.HTTP_200_OK)
    
    except:

        return Response({'msg': "Something wrong"},status=status.HTTP_400_BAD_REQUEST)