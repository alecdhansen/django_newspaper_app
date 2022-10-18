from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Article
from .serializers import ArticleSerializer
from .permissions import IsAuthorOrReadOnly


class ArticleListAPIView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Article.objects.order_by("-created_at")
    serializer_class = ArticleSerializer

    def perform_create(self, serializer):
        serializer.save(authors=self.request.user)


class ArticleDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthorOrReadOnly,)
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
