import { Routes, Route } from "react-router-dom";
import DashboardView from "../views/DashboardView";
import DetalheEspacoView from "../views/DetalheEspacoView";
import ResumoReservasView from "../views/ResumoReservasView";
import Login from "../views/Login";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardView />} />
      <Route path="/dashboard" element={<DashboardView />} />
      <Route path="/login" element={<Login />} />
      <Route path="/espaco/:nome" element={<DetalheEspacoView />} />
      <Route path="/resumo-reservas" element={<ResumoReservasView />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
