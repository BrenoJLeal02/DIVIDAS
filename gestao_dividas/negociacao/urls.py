from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DividaViewSet

# Criação do roteador
router = DefaultRouter()
router.register(r'dividas', DividaViewSet, basename='divida')

urlpatterns = [
    path('', include(router.urls)),  # Inclui todas as rotas do roteador (dividas)
    path('dividas/buscar_por_documento/', DividaViewSet.as_view({'get': 'buscar_por_documento'}), name='buscar_por_documento'),  # Rota customizada
]
