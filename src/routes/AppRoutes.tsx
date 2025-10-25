import { Routes, Route } from "react-router-dom";
import DashboardView from "../views/DashboardView";
// import NovaReservaView from "../views/NovaReservaView";
import DetalheEspacoView from "../views/DetalheEspacoView";
import ResumoReservasView from "../views/ResumoReservasView";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardView />} />
      <Route path="/espaco/:nome" element={<DetalheEspacoView />} /> {/* 👈 nova rota */}
      <Route path="/resumo-reservas" element={<ResumoReservasView />} />

    </Routes>
  );
}
