import axios, { AxiosResponse } from 'axios';

// Função para buscar a dívida pelo CPF ou CNPJ
export const buscarPorDocumento = async (cpf?: string, cnpj?: string): Promise<any> => {
  try {
    const params = cpf ? { cpf } : { cnpj }; // Define os parâmetros para a API
    const response: AxiosResponse<any> = await axios.get(
      'http://127.0.0.1:8000/api/dividas/buscar_por_documento/',
      { params }
    );
    return response.data; // Retorna os dados diretamente
  } catch (error: any) {
    if (error.response) {
      throw error.response.data; // Lança o erro retornado pela API
    } else {
      throw { error: 'Erro desconhecido' };
    }
  }
};
