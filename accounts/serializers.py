from rest_framework import serializers

from . import models


class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source="user.username")

    class Meta:
        model = models.Profile
        fields = "__all__"
