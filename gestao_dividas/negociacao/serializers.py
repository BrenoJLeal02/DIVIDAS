from rest_framework import serializers
from .models import Divida

class DividaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Divida
        fields = '__all__'
