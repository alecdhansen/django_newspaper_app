from django.urls import path

from . import views

app_name = "articles"

urlpatterns = [
    path("articles/<int:pk>", views.ArticleDetailAPIView.as_view()),
    path("articles/", views.ArticleListAPIView.as_view(), name="article_list"),
]
