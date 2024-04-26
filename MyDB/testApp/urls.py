from django.urls import path
from . import views

urlpatterns = [
    path('', views.testApp_list, name='testApp_list'),]