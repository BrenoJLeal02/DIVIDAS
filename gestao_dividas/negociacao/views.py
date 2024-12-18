from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
from .models import Divida
from .serializers import DividaSerializer

from rest_framework.response import Response
from rest_framework import status
from .models import Divida
from .serializers import DividaSerializer

class DividaViewSet(viewsets.ViewSet):
    def buscar_por_documento(self, request):
        cpf = request.query_params.get('cpf')
        cnpj = request.query_params.get('cnpj')

        # Busca a dívida pelo CPF ou CNPJ
        if cpf:
            divida = Divida.objects.filter(cpf=cpf).first()
        elif cnpj:
            divida = Divida.objects.filter(cnpj=cnpj).first()
        else:
            return Response({"error": "CPF ou CNPJ não fornecido."}, status=status.HTTP_400_BAD_REQUEST)

        if not divida:
            return Response({"error": "Dívida não encontrada."}, status=status.HTTP_404_NOT_FOUND)

        # Serializa e retorna os dados da dívida
        serializer = DividaSerializer(divida)
        return Response(serializer.data, status=status.HTTP_200_OK)

