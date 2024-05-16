from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Stock(models.Model):

    symbol = models.CharField(max_length=20)
    

    def __str__(self):

        return self.symbol

class WatchList(models.Model):

    user = models.ForeignKey(User,on_delete=models.CASCADE,verbose_name="User")
    type = models.CharField(max_length=20,unique=True)
    description = models.TextField(null=True,blank=True)
    stocks = models.ManyToManyField(Stock,verbose_name="Stocks")

    def __str__(self):

        return f'{self.user.username} -- {self.type}'
    



