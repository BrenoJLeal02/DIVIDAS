import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',  // A URL do backend
  headers: {
    'Content-Type': 'application/json',  // Garantir que o tipo do conteúdo esteja correto
  },
});

// Requisição para POST de consulta (cpf ou cnpj)
export const postConsulta = async (cpf?: string, cnpj?: string) => {
  const response = await api.post('dividas/buscar_por_documento/', { cpf, cnpj });
  return response.data;
};

// Requisição para GET de detalhe da dívida
// services/api.ts
export const getDividaDetalhe = async (id: number) => {
  const response = await api.get(`dividas/${id}/`);
  return response.data;
};

export const getOpcoesNegociacao = async (id: number) => {
  const response = await api.get(`dividas/${id}/opcoes_negociacao/`);
  return response.data;
};

