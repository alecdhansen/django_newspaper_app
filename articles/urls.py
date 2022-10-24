from django.urls import path

from . import views

app_name = "articles"

urlpatterns = [
    path("articles/", views.ArticleListAPIView.as_view(), name="article_list"),
    path(
        "user/articles/",
        views.UserArticleListAPIView.as_view(),
        name="article_user",
    ),
    path(
        "articles/<int:pk>/",
        views.UserArticleDetailAPIView.as_view(),
        name="article_detail",
    ),
    path(
        "admin/articles/submitted/",
        views.ArticleDetailAPIView.as_view(),
        name="submitted_articles",
    ),
    path(
        "admin/articles/submitted/<int:pk>/",
        views.AdminSubmittedArticleUpdateAPIView.as_view(),
        name="submitted_articles",
    ),
]
