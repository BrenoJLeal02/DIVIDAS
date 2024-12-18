import { useLocation, useNavigate } from 'react-router-dom';

export function ResultadoPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { resultado } = location.state || {};

  if (!resultado) {
    return (
      <div>
        <p>Não há resultados para exibir.</p>
        <button onClick={() => navigate('/')}>Voltar</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Resultado da Consulta</h1>
      <p><strong>Contribuinte:</strong> {resultado.contribuinte}</p>
      <p><strong>CPF:</strong> {resultado.cpf || 'Não informado'}</p>
      <p><strong>CNPJ:</strong> {resultado.cnpj || 'Não informado'}</p>
      <p><strong>Valor:</strong> R$ {resultado.valor_principal}</p>
      <p><strong>Multa:</strong> R$ {resultado.multa}</p>
      <p><strong>Juros:</strong> {resultado.juros}</p>
      <p><strong>Data de Vencimento:</strong> {resultado.data_vencimento}</p>
      <button onClick={() => navigate('/')}>Nova Consulta</button>
    </div>
  );
}
