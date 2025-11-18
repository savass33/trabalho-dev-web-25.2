import { Routes, Route, Navigate } from "react-router-dom";
import DashboardView from "../views/DashboardView";
import DetalheEspacoView from "../views/DetalheEspacoView";
import ResumoReservasView from "../views/ResumoReservasView";
import LoginView from "../views/LoginView"; // Renomeei para LoginView para consistência
import HistoricoReservas from "../views/HistoricoReservas";
import CadastroView from "../views/CadastroView";
import MainLayout from "../views/MainLayout"; // Importa o Layout privado

export default function AppRoutes() {
  return (
    <Routes>
      {/* Rota pública */}
      <Route path="/login" element={<LoginView />} />

      {/* Rotas privadas agrupadas dentro do MainLayout */}
      <Route path="/" element={<MainLayout />}>
        {/* O Outlet em MainLayout renderiza estas rotas */}

        {/* Redirecionamento da raiz para /dashboard */}
        <Route index element={<Navigate to="/dashboard" replace />} />

        <Route path="dashboard" element={<DashboardView />} />
        <Route path="espaco/:nome" element={<DetalheEspacoView />} />
        <Route path="historico" element={<HistoricoReservas />} />
        <Route path="resumo-reservas" element={<ResumoReservasView />} />
        <Route path="register" element={<CadastroView />} />
      </Route>

      {/* Se não encontrar nenhuma rota, redireciona para o login (ou dashboard se preferir) */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
