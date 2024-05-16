from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User
from .models import WatchList, Stock


class RegisterSerializer(serializers.ModelSerializer):

    class Meta:

        model = User

        fields = ['username','password']
    
    def create(self,validated_data):

        user = User.objects.create(username=validated_data['username'])

        user.set_password(validated_data['password'])

        user.save()

        return user
    
class StockSerializer(serializers.ModelSerializer):

    class Meta:

        model = Stock
        fields = ['symbol','id']

class WatchListSerializer(serializers.ModelSerializer):

    stocks = StockSerializer(many=True)

    class Meta:

        model  = WatchList
        fields = ['stocks','type','description','user']