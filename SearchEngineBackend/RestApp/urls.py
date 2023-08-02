from django.urls import re_path
from RestApp import views


urlpatterns = [
    re_path(r'^search/$', views.restApi), 
    re_path(r'^search\+QUERY=([a-zA-Z0-9 ]+)\+CASE=(True|False)\+AND=(True|False)+\+OR=(True|False)+\+NOT=(True|False)$', views.restApi),
   
]
