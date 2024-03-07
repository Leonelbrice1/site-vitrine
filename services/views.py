from django.shortcuts import render
from .models import *

# Create your views here.
def home(request):
    articles_slide = Article.objects.all()[:3]
    articles = Article.objects.all()
    return render(request, 'services/index.html',context={
        "articles":articles,
        "articles_slide":articles_slide
    })


def actu(request):
    return render(request, 'services/a-la-une.html')


def article(request,id):
    cible = Article.objects.get(pk=id)
    articles = Article.objects.all().exclude(pk=id)[:3]
    return render(request,"article.html",context={
        'articles':articles,
        "cible":cible})

def login(request):
    return render(request,"login.html")

