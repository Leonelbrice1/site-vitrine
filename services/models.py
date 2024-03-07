from django.utils import timezone
from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()

# Create your models here.
class Article(models.Model):
    titre = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    image = models.ImageField(upload_to="article")
    content = models.TextField()
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    upload_to = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ["-upload_to"]
    
    def __str__(self) -> str:
        return "%s"%(self.titre)

class Commentaire(models.Model):
    
    content = models.TextField()
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    
    def __str__(self) -> str:
        return "%s"%(self.content[:15])