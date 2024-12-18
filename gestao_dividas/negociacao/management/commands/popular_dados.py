from django.core.management.base import BaseCommand
from negociacao.models import Divida, OpcaoNegociacao
import datetime
from decimal import Decimal

class Command(BaseCommand):
    help = 'Popula o banco de dados com dados fictícios de dívidas e opções de negociação'

    def handle(self, *args, **kwargs):
        # Criar dívidas fictícias
        dividas = [
                Divida(
                    contribuinte="João Silva",
                    cpf="12345678901",  # CPF fictício
                    valor_principal=Decimal('10000.00'),  # Usando Decimal para garantir precisão
                    multa=Decimal('1000.00'),
                    juros=Decimal('1500.00'),
                    data_vencimento=datetime.date(2023, 12, 31)
                ),
                Divida(
                    contribuinte="Maria Oliveira",
                    cnpj="12345678000195",  # CNPJ fictício
                    valor_principal=Decimal('5000.00'),
                    multa=Decimal('500.00'),
                    juros=Decimal('800.00'),
                    data_vencimento=datetime.date(2023, 11, 30)
                ),
                Divida(
                    contribuinte="Carlos Santos",
                    cpf="98765432100",  # CPF fictício
                    valor_principal=Decimal('20000.00'),
                    multa=Decimal('3000.00'),
                    juros=Decimal('4000.00'),
                    data_vencimento=datetime.date(2023, 10, 15)
                ),
            ]
        Divida.objects.bulk_create(dividas)

        # Criar opções de negociação para cada dívida
        for divida in Divida.objects.all():
            OpcaoNegociacao.objects.create(
                divida=divida,
                tipo="à vista",
                desconto_multa=Decimal('90.0'),  # Usando Decimal
                desconto_juros=Decimal('50.0'),
                parcelas=None
            )
            OpcaoNegociacao.objects.create(
                divida=divida,
                tipo="parcelado",
                desconto_multa=Decimal('70.0'),
                desconto_juros=Decimal('30.0'),
                parcelas=12
            )

        self.stdout.write(self.style.SUCCESS('Dados fictícios criados com sucesso!'))
