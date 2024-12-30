from rest_framework import serializers
from .models import Divida, OpcaoNegociacao

class DividaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Divida
        fields = '__all__'

class OpcaoNegociacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = OpcaoNegociacao
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        tipo_display = dict(OpcaoNegociacao._meta.get_field('tipo').choices).get(instance.tipo, instance.tipo)
        representation['tipo'] = tipo_display

        # Adicionando o valor de juros da Dívida
        representation['juros'] = instance.divida.juros if instance.divida else 0
        return representation
