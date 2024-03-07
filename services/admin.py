from django.contrib import admin

# Register your models here.
from .models import *

@admin.register(Commentaire)
class CommentaireAdmin(admin.ModelAdmin):
    pass


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    pass