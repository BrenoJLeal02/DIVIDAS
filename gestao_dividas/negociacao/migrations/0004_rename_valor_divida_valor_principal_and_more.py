# Generated by Django 5.1.4 on 2024-12-17 20:55

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('negociacao', '0003_rename_valor_principal_divida_valor_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='divida',
            old_name='valor',
            new_name='valor_principal',
        ),
        migrations.AddField(
            model_name='divida',
            name='data_vencimento',
            field=models.DateField(default='2024-01-01'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='divida',
            name='cnpj',
            field=models.CharField(blank=True, help_text='CNPJ do contribuinte (somente números).', max_length=14, null=True, validators=[django.core.validators.RegexValidator('^\\d{14}$', 'CNPJ deve ter exatamente 14 dígitos.')]),
        ),
        migrations.AlterField(
            model_name='divida',
            name='cpf',
            field=models.CharField(blank=True, help_text='CPF do contribuinte (somente números).', max_length=11, null=True, validators=[django.core.validators.RegexValidator('^\\d{11}$', 'CPF deve ter exatamente 11 dígitos.')]),
        ),
    ]
