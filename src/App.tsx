import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-[#F5F7FB]">
        {/* 🔷 Cabeçalho */}
        <header className="bg-[#0033A0] text-white shadow-md">
          <div className="container mx-auto flex justify-between items-center px-6 py-4">
            <h1 className="text-2xl font-bold">Unifor Reservas</h1>
            <nav className="space-x-4 text-sm md:text-base">
              <a href="/" className="hover:underline">Dashboard</a>
              {/* <a href="/nova" className="hover:underline">Nova Reserva</a> */}
            </nav>
          </div>
        </header>

        {/* 📄 Conteúdo principal (rotas) */}
        <main className="flex-grow container mx-auto p-6">
          <AppRoutes />
        </main>

        {/* ⚪ Rodapé */}
        <footer className="bg-gray-100 text-center py-3 text-sm text-gray-500 border-t">
          © {new Date().getFullYear()} Universidade de Fortaleza — Sistema de Reservas
        </footer>
      </div>
    </BrowserRouter>
  );
}
