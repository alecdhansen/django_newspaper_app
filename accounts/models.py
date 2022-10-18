from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class User(AbstractUser):
    pass


class Profile(models.Model):
    avatar = models.ImageField(
        upload_to="profiles/",
    )
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True
    )

    def __str__(self):
        return self.user.username
