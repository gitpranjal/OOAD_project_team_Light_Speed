from rest_framework import serializers
from RestApp.models import SearchURL

class SearchURLSerializer(serializers.ModelSerializer):
    class Meta:
        model = SearchURL
        fields = ('Id', 'Title', 'Link', 'Description', 'Rank')