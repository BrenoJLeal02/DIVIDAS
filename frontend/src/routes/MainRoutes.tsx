import { Route, Routes } from "react-router-dom";

import { Consulta, Negociar, Resultados } from "./index";

export function MainRoutes() {
    return (
      <Routes>
        <Route path="/" element={<Consulta/>} />
        <Route path="/resultados" element={<Resultados/>} />
        <Route path="/negociar" element={<Negociar />} />


      </Routes>
    );
  }
  