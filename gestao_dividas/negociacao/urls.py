from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DividaViewSet, ConsultaDividaView

# Criando o roteador e registrando o viewset para dividas
router = DefaultRouter()
router.register(r'dividas', DividaViewSet, basename='divida')

urlpatterns = [
    # A URL para a consulta (POST)
    path('dividas/buscar_por_documento/', ConsultaDividaView.as_view(), name='buscar_por_documento'),
    
    # O roteador gerencia as rotas para dividas, incluindo o GET para detalhes
    path('', include(router.urls)),
]
