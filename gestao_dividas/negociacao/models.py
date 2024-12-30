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
    tipo = models.CharField(
        max_length=50, 
        choices=[
            ("à vista", "À Vista"),
            ("parcelado", "Parcelado"),
            ("refis", "Refis"),
            ("transacao_tributaria", "Transação Tributária"),
            ("compensacao_creditos", "Compensação de Créditos"),
            ("suspensao_cobranca", "Suspensão da Cobrança")
        ]
    )
    desconto_multa = models.DecimalField(max_digits=5, decimal_places=2, help_text="Desconto sobre a multa (%)")
    desconto_juros = models.DecimalField(max_digits=5, decimal_places=2, help_text="Desconto sobre os juros (%)")
    parcelas = models.IntegerField(null=True, blank=True, help_text="Quantidade de parcelas (somente para parcelamento)")
    juros = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True, help_text="Juros aplicados nas parcelas")
    descricao = models.TextField(help_text="Descrição detalhada da opção de negociação", blank=True, null=True)

    def __str__(self):
        return f"{self.tipo.capitalize()} - Total: R$ {self.calcular_total():.2f}"
