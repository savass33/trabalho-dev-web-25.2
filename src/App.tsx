import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FB]">
      <header className="bg-[#0033A0] text-white shadow-md">
        <div className="container mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-2xl font-bold">Unifor Reservas</h1>
          <nav className="space-x-4 text-sm md:text-base">
            <a href="/" className="hover:underline">
              Dashboard
            </a>
            <a href="/resumo-reservas" className="hover:underline">
              Reservas
            </a>
            <a href="/historico" className="hover:underline">
              Histórico
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-6">
        <AppRoutes /> {/* Todas as rotas estão aqui */}
      </main>

      <footer className="bg-gray-100 text-center py-3 text-sm text-gray-500 border-t">
        © {new Date().getFullYear()} Universidade de Fortaleza — Sistema de
        Reservas
      </footer>
    </div>
  );
}
