import { useState, useEffect } from "react";

// Estrutura de uma reserva
interface Reserva {
  id: number;
  espaco: string;
  usuario: string;
  matricula: string;
  telefone: string;
  data: string;
  hora: string;
  status: "Confirmada" | "Pendente" | "Cancelada";
}

export default function ResumoReservasView() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [filtroStatus, setFiltroStatus] = useState<"Todos" | "Confirmada" | "Pendente" | "Cancelada">("Todos");
  const [filtroEspaco, setFiltroEspaco] = useState<string>("Todos");

  // Dados fictícios para demonstração
  useEffect(() => {
    setReservas([
      { id: 1, espaco: "Quadra A", usuario: "João Silva", matricula: "202310123", telefone: "(85) 99876-1234", data: "2025-10-26", hora: "14:00 - 15:00", status: "Confirmada" },
      { id: 2, espaco: "Arena Beach 3", usuario: "Maria Oliveira", matricula: "202208543", telefone: "(85) 98123-5678", data: "2025-10-27", hora: "16:00 - 17:00", status: "Pendente" },
      { id: 3, espaco: "Sala Multifuncional", usuario: "Pedro Gomes", matricula: "202105789", telefone: "(85) 99765-4321", data: "2025-10-29", hora: "09:00 - 10:00", status: "Cancelada" },
      { id: 4, espaco: "Quadra B", usuario: "Ana Costa", matricula: "202309876", telefone: "(85) 98765-4321", data: "2025-10-30", hora: "11:00 - 12:00", status: "Confirmada" },
      { id: 5, espaco: "GP1", usuario: "Lucas Martins", matricula: "202207654", telefone: "(85) 99654-3210", data: "2025-10-28", hora: "15:00 - 16:00", status: "Pendente" },
    ]);
  }, []);

  // Filtragem de reservas
  const reservasFiltradas = reservas.filter((reserva) => {
    const statusMatch = filtroStatus === "Todos" || reserva.status === filtroStatus;
    const espacoMatch = filtroEspaco === "Todos" || reserva.espaco === filtroEspaco;
    return statusMatch && espacoMatch;
  });

  // Obter lista única de espaços para filtro
  const espacos = ["Todos", ...Array.from(new Set(reservas.map(r => r.espaco)))];

  return (
    <div className="min-h-screen bg-[#F5F7FB] flex flex-col">
      {/* Cabeçalho */}
      <header className="bg-[#0033A0] text-white shadow-md">
        <div className="container mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-2xl font-bold">Resumo de Reservas</h1>
          <nav className="space-x-4 text-sm md:text-base">
            <a href="/dashboard" className="hover:underline">Dashboard</a>
          </nav>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="flex-grow container mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-[#0033A0] mb-6">Visualização Geral</h2>

        {/* Filtros */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          {/* Filtro por status */}
          <div>
            <label className="font-medium text-gray-700 mr-2">Status:</label>
            <select
              className="border border-gray-300 rounded px-3 py-1"
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value as any)}
            >
              <option>Todos</option>
              <option>Confirmada</option>
              <option>Pendente</option>
              <option>Cancelada</option>
            </select>
          </div>

          {/* Filtro por espaço */}
          <div>
            <label className="font-medium text-gray-700 mr-2">Espaço:</label>
            <select
              className="border border-gray-300 rounded px-3 py-1"
              value={filtroEspaco}
              onChange={(e) => setFiltroEspaco(e.target.value)}
            >
              {espacos.map((espaco) => (
                <option key={espaco}>{espaco}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Grid de reservas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reservasFiltradas.map((reserva) => (
            <div
              key={reserva.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 flex flex-col justify-between border border-gray-100"
            >
              {/* Local, data e horário em destaque */}
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-[#0033A0]">{reserva.espaco}</h3>
                <p className="text-gray-700 font-medium">{new Date(reserva.data).toLocaleDateString("pt-BR")} | {reserva.hora}</p>
                <p className="text-gray-500 text-sm">Reserva #{reserva.id.toString().padStart(3, "0")}</p>
              </div>

              {/* Usuário e informações de contato */}
              <div className="space-y-1 text-gray-700 text-sm">
                <p><span className="font-medium text-[#0033A0]">Usuário:</span> {reserva.usuario}</p>
                <p><span className="font-medium text-[#0033A0]">Matrícula:</span> {reserva.matricula}</p>
                <p><span className="font-medium text-[#0033A0]">Telefone:</span> {reserva.telefone}</p>
              </div>

              {/* Status e ações */}
              <div className="mt-4 flex justify-between items-center">
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    reserva.status === "Confirmada"
                      ? "bg-green-100 text-green-700"
                      : reserva.status === "Pendente"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {reserva.status}
                </span>
                <button className="text-[#0033A0] font-medium hover:underline text-sm">Detalhes</button>
              </div>
            </div>
          ))}

          {reservasFiltradas.length === 0 && (
            <p className="text-center text-gray-500 mt-10 col-span-full">Nenhuma reserva encontrada para os filtros selecionados.</p>
          )}
        </div>
      </main>
    </div>
  );
}
