import { Route, Routes } from "react-router-dom";

import { ConfirmaNegociar, Consulta, Negociar, PendenteNegociar, Resultados } from "./index";

export function MainRoutes() {
    return (
      <Routes>
        <Route path="/" element={<Consulta/>} />
        <Route path="/resultados" element={<Resultados/>} />
        <Route path="/negociar" element={<Negociar />} />
        <Route path="/confirmar-negociacao" element={<ConfirmaNegociar />} />
        <Route path="/negociacao-processada" element={<PendenteNegociar />} />


      </Routes>
    );
  }
  