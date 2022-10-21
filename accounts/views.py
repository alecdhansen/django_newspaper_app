from rest_framework import generics
from . import models
from . import serializers

# Create your views here.
class ProfileListAPIView(generics.ListCreateAPIView):
    queryset = models.Profile.objects.order_by("id")
    serializer_class = serializers.ProfileSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# class ArticleListAPIView(generics.ListCreateAPIView):
#     permission_classes = (IsAuthenticatedOrReadOnly,)
#     queryset = Article.objects.order_by("-created_at")
#     serializer_class = ArticleSerializer

#     def perform_create(self, serializer):
#         serializer.save(authors=self.request.user)
