from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView  # Importando a classe para servir o template

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('negociacao.urls')),  # Mude para 'api/' e remova 'dividas/'
    path('', TemplateView.as_view(template_name='index.html')),  # Serve a página do frontend
]