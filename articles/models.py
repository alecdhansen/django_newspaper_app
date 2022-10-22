from django.db import models
from django.conf import settings

# Create your models here.
class Article(models.Model):
    WORLD = "World"
    SPORTS = "Sports"
    LOCAL = "Local"
    DRAFTS = "Drafts"
    SUBMITTED = "Submitted"
    PUBLISHED = "Published"
    REJECTED = "Rejected"
    STATES = [
        (DRAFTS, "Drafts"),
        (SUBMITTED, "Submitted"),
        (PUBLISHED, "Published"),
        (REJECTED, "Rejected"),
    ]
    CHOICES = [
        (WORLD, "World"),
        (SPORTS, "Sports"),
        (LOCAL, "Local"),
    ]

    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True
    )
    title = models.CharField(max_length=255)
    body = models.TextField()
    image = models.ImageField(upload_to="articles/", null=True)
    article_process = models.CharField(max_length=10, choices=STATES, default=DRAFTS)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_published = models.BooleanField(default=False)
    category = models.CharField(
        max_length=10,
        choices=CHOICES,
        default=WORLD,
    )

    def __str__(self):
        return self.title
