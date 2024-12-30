from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Divida, OpcaoNegociacao
from .serializers import DividaSerializer, OpcaoNegociacaoSerializer
from rest_framework import viewsets
from rest_framework.decorators import action


# Manter a consulta por POST
class ConsultaDividaView(APIView):
    def post(self, request):
        cpf = request.data.get('cpf')  
        cnpj = request.data.get('cnpj')

        if not cpf and not cnpj:
            return Response({"error": "Informe o CPF ou CNPJ."}, status=status.HTTP_400_BAD_REQUEST)

        divida = Divida.objects.filter(cpf=cpf).first() if cpf else Divida.objects.filter(cnpj=cnpj).first()

        if not divida:
            return Response({"error": "Nenhuma dívida encontrada."}, status=status.HTTP_404_NOT_FOUND)

        return Response(DividaSerializer(divida).data, status=status.HTTP_200_OK)


# Detalhe da dívida (GET)
class DividaViewSet(viewsets.ModelViewSet):
    queryset = Divida.objects.all()
    serializer_class = DividaSerializer

    @action(detail=True, methods=['get'])
    def opcoes_negociacao(self, request, pk=None):
        divida = self.get_object()  # Obtém a dívida com base no ID passado na URL
        opcoes = divida.opcoes_negociacao.all()  # Pega as opções de negociação associadas à dívida
        serializer = OpcaoNegociacaoSerializer(opcoes, many=True)  # Serializa as opções de negociação
        return Response(serializer.data)  # Retorna as opções como resposta JSON
