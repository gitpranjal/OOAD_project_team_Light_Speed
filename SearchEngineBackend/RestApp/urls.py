from django.conf.urls import url
from RestApp import views

#\+AND=(?i)(true|false)\+OR=(?i)(true|false)\+NOT=(?i)(true|false)

#+AND=false+OR=false+NOT=false

urlpatterns = [
    url(r'^search/$', views.restApi), #if url with search then map it to the restApi method in views class
    url(r'^search\+QUERY=([a-zA-Z0-9 ]+)\+CASE=(True|False)\+AND=(True|False)+\+OR=(True|False)+\+NOT=(True|False)$', views.restApi),
    #url(r'^google/$', views.restApi)
]
