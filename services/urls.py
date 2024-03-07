from django.urls import path
from .views import *

app_name = 'services'

urlpatterns = [
    path('', home, name='Home'),
    path('a-la-une/', actu, name='Actu'),
    path('article/<int:id>',article,name="article"),
    path('login/',login,name="name"),


]
