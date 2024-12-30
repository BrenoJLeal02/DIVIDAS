from rest_framework import serializers
from .models import Divida, OpcaoNegociacao

class DividaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Divida
        fields = '__all__'

class OpcaoNegociacaoSerializer(serializers.ModelSerializer):
    total = serializers.SerializerMethodField()

    class Meta:
        model = OpcaoNegociacao
        fields = ['id', 'tipo', 'desconto_multa', 'desconto_juros', 'parcelas', 'total']

    def get_total(self, obj):
        return obj.calcular_total()
