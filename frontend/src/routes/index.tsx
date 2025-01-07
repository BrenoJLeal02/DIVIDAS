import ConfirmarNegociacaoPage from '../pages/ConfirmarNegociacao/ConfirmarNegociacaoPage.tsx';
import ConsultaPage from '../pages/Consulta/ConsultaPage.tsx'
import NegociacaoPendentePage from '../pages/NegociacaoPendente/NegociacaoPendentePage.tsx';
import NegociarPage from '../pages/Negociar/NegociarPage.tsx';
import {ResultadoPage} from '../pages/Resultados/ResultadoPage.tsx'
export function Consulta() {
  return (
    <>
        <ConsultaPage/>
    </>
  );
}
export function Resultados() {
  return (
    <>
       <ResultadoPage/>
    </>
  );
}
export function Negociar() {
  return (
    <>
       <NegociarPage/>
    </>
  );
}
export function ConfirmaNegociar() {
  return (
    <>
       <ConfirmarNegociacaoPage/>
    </>
  );
}
export function PendenteNegociar() {
  return (
    <>
       <NegociacaoPendentePage/>
    </>
  );
}
