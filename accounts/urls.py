from django.urls import path
from .views import ProfileListAPIView

app_name = "accounts"

urlpatterns = [path("/profiles/", ProfileListAPIView.as_view(), name="profile_list")]
