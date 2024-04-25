#from django.http import HttpResponse
from django.shortcuts import render

def homepage(request):
   #return HttpResponse("Welcome!!! :3")
    return render(request, 'home.html')

def about(request):
    #return HttpResponse("this is about page")
    return render(request, 'about.html')