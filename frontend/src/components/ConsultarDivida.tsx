// import React, { useState } from 'react';
// import { buscarPorDocumento } from '../services/api';


// const ConsultaDivida: React.FC = () => {
//   const [cpf, setCpf] = useState<string>('');
//   const [cnpj, setCnpj] = useState<string>('');
//   const [resultado, setResultado] = useState<any | null>(null);
//   const [erro, setErro] = useState<string | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setErro(null);
//     setResultado(null);

//     try {
//       const data = await buscarPorDocumento(cpf || undefined, cnpj || undefined);
//       setResultado(data);
  
//     } catch (error: any) {
//       setErro(error.error || 'Erro ao buscar dados.');
//     }
//   };

//   return (
//     <div>
//       <h1>Consulta de Dívidas</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="cpf">CPF:</label>
//           <input
//             type="text"
//             id="cpf"
//             value={cpf}
//             onChange={(e) => setCpf(e.target.value)}
//             disabled={cnpj.length > 0} // Desabilita CPF se CNPJ estiver preenchido
//           />
//         </div>
//         <div>
//           <label htmlFor="cnpj">CNPJ:</label>
//           <input
//             type="text"
//             id="cnpj"
//             value={cnpj}
//             onChange={(e) => setCnpj(e.target.value)}
//             disabled={cpf.length > 0} // Desabilita CNPJ se CPF estiver preenchido
//           />
//         </div>
//         <button type="submit">Buscar</button>
//       </form>

//       {erro && <p style={{ color: 'red' }}>{erro}</p>}

//     {resultado && (
//       <div>
//         <h2>Resultado:</h2>
//         <p><strong>Contribuinte:</strong> {resultado.contribuinte}</p>
//         <p><strong>CPF:</strong> {resultado.cpf || "Não informado"}</p>
//         <p><strong>CNPJ:</strong> {resultado.cnpj || "Não informado"}</p>
//         <p><strong>Valor Principal:</strong> R$ {resultado.valor_principal}</p>
//         <p><strong>Multa:</strong> R$ {resultado.multa}</p>
//         <p><strong>Juros:</strong> R$ {resultado.juros}</p>
//       </div>
//     )}

//     </div>
//   );
// };

// export default ConsultaDivida;
