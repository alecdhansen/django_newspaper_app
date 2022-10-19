from rest_framework import serializers

from .models import Article


class ArticleSerializer(serializers.ModelSerializer):
    author_name = serializers.ReadOnlyField(source="author.username")

    class Meta:
        model = Article
        fields = "__all__"
