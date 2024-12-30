# Negociacao/models.py

from django.db import models
from django.core.exceptions import ValidationError

class Divida(models.Model):
    id = models.AutoField(primary_key=True)
    contribuinte = models.CharField(max_length=255)
    cpf = models.CharField(max_length=11, null=True, blank=True)
    cnpj = models.CharField(max_length=14, null=True, blank=True)
    valor_principal = models.DecimalField(max_digits=10, decimal_places=2)
    multa = models.DecimalField(max_digits=10, decimal_places=2)
    juros = models.DecimalField(max_digits=10, decimal_places=2)
    data_vencimento = models.DateField()

    def __str__(self):
        return f'Dívida {self.id} - {self.contribuinte}'

    def clean(self):
        if not self.cpf and not self.cnpj:
            raise ValidationError("É necessário informar pelo menos um dos campos: CPF ou CNPJ.")

class OpcaoNegociacao(models.Model):
    divida = models.ForeignKey(Divida, on_delete=models.CASCADE, related_name="opcoes_negociacao")
    tipo = models.CharField(max_length=50, choices=[("à vista", "À Vista"), ("parcelado", "Parcelado")])
    desconto_multa = models.DecimalField(max_digits=5, decimal_places=2, help_text="Desconto sobre a multa (%)")
    desconto_juros = models.DecimalField(max_digits=5, decimal_places=2, help_text="Desconto sobre os juros (%)")
    parcelas = models.IntegerField(null=True, blank=True, help_text="Quantidade de parcelas (somente para parcelamento)")

    def calcular_total(self):
        """
        Calcula o valor total com descontos aplicados sobre multa e juros.
        """
        valor_multa = self.divida.multa * (1 - self.desconto_multa / 100)
        valor_juros = self.divida.juros * (1 - self.desconto_juros / 100)
        valor_total = self.divida.valor_principal + valor_multa + valor_juros
        return round(valor_total, 2)

    def calcular_valor_parcela(self):
        """
        Calcula o valor de cada parcela, caso seja parcelado.
        """
        if self.parcelas:
            return round(self.calcular_total() / self.parcelas, 2)
        return self.calcular_total()

    def __str__(self):
        return f"{self.tipo.capitalize()} - Total: R$ {self.calcular_total():.2f}"
