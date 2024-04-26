from django.shortcuts import render

# Create your views here.
def testApp_list(request):
    return render(request, 'testApp/testApp_list.html')