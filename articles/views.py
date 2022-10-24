from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Article
from .serializers import ArticleSerializer
from .permissions import IsAuthorOrReadOnly, IsEditor


class ArticleListAPIView(generics.ListCreateAPIView):
    serializer_class = ArticleSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Article.objects.all()

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class UserArticleListAPIView(generics.ListCreateAPIView):
    serializer_class = ArticleSerializer

    def get_queryset(self):
        return Article.objects.filter(author=self.request.user).order_by("-created_at")

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class UserArticleDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ArticleSerializer

    def get_queryset(self):
        return Article.objects.filter(author=self.request.user).order_by("-created_at")

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class ArticleDetailAPIView(generics.ListAPIView):
    serializer_class = ArticleSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
    # queryset = Article.objects.filter(article_process="Submitted")

    def get_queryset(self):
        return Article.objects.filter(article_process="Submitted")

    # .filter(is_published=True)


class AdminSubmittedArticleUpdateAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = ArticleSerializer
    # permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        return Article.objects.all().order_by("-created_at")

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)
