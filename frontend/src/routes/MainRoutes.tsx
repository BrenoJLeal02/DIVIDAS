import { Route, Routes } from "react-router-dom";

import { Consulta, Resultados } from "./index";

export function MainRoutes() {
    return (
      <Routes>
        <Route path="/" element={<Consulta/>} />
        <Route path="/resultados" element={<Resultados/>} />

      </Routes>
    );
  }
  