# negociacao/forms.py

from django import forms
from .models import Divida, OpcaoNegociacao

class DividaForm(forms.ModelForm):
    class Meta:
        model = Divida
        fields = ['contribuinte', 'valor_principal', 'multa', 'juros', 'data_vencimento']

class OpcaoNegociacaoForm(forms.ModelForm):
    class Meta:
        model = OpcaoNegociacao
        fields = ['divida', 'tipo', 'desconto_multa', 'desconto_juros', 'parcelas']
