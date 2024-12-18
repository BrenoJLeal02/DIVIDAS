import React, { useState } from 'react';
import { buscarPorDocumento } from '../../services/api';
import { useNavigate } from 'react-router-dom';

export function ConsultaPage() {
  const [cpf, setCpf] = useState<string>('');
  const [cnpj, setCnpj] = useState<string>('');
  const [erro, setErro] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(null);

    try {
      const data = await buscarPorDocumento(cpf || undefined, cnpj || undefined);
      // Enviar o resultado para a página de resultado
      navigate('/resultado', { state: { resultado: data } });
    } catch (error: any) {
      setErro(error.error || 'Erro ao buscar dados.');
    }
  };

  return (
    <div>
      <h1>Consulta de Dívidas</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="cpf">CPF:</label>
          <input
            type="text"
            id="cpf"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            disabled={cnpj.length > 0} // Desabilita CPF se CNPJ estiver preenchido
          />
        </div>
        <div>
          <label htmlFor="cnpj">CNPJ:</label>
          <input
            type="text"
            id="cnpj"
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
            disabled={cpf.length > 0} // Desabilita CNPJ se CPF estiver preenchido
          />
        </div>
        <button type="submit">Buscar</button>
      </form>

      {erro && <p style={{ color: 'red' }}>{erro}</p>}
    </div>
  );
}
