import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function MainLayout() {
  const { user, token, isLoading, logout } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Carregando...</p>
      </div>
    );
  }

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FB]">
      <header className="bg-[#0033A0] text-white shadow-md">
        <div className="container mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-2xl font-bold">Unifor Reservas</h1>
          <nav className="space-x-4 text-sm md:text-base items-center flex">
            <a href="/dashboard" className="hover:underline">
              Dashboard
            </a>
            <a href="/resumo-reservas" className="hover:underline">
              Reservas
            </a>
            <a href="/historico" className="hover:underline">
              Histórico
            </a>
            <a href="/register" className="hover:underline">
              Cadastrar Usuário
            </a>
            <button
              onClick={logout}
              className="bg-white text-[#0033A0] px-3 py-1 rounded-md font-medium hover:bg-gray-200"
            >
              Sair
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-6">
        <Outlet />
      </main>

      <footer className="bg-gray-100 text-center py-3 text-sm text-gray-500 border-t">
        © {new Date().getFullYear()} Universidade de Fortaleza — Sistema de
        Reservas
      </footer>
    </div>
  );
}
