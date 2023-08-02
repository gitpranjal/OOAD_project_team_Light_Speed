from statistics import mode
from django.db import models

# Creating our indexes

class SearchURL(models.Model):
     Id = models.AutoField(primary_key=True)
     Title = models.CharField(max_length=500)
     Link = models.CharField(max_length=500)
     Description = models.CharField(max_length=1000)
     Rank = models.IntegerField() 