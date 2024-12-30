import ConsultaPage from '../pages/Consulta/ConsultaPage.tsx'
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
