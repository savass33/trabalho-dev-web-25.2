/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";

// Estrutura de uma reserva, agora com campo 'categoria'
interface Reserva {
  id: number;
  espaco: string;
  usuario: string;
  matricula: string;
  telefone: string;
  data: string;
  hora: string;
  categoria:
    | "Graduação"
    | "Pós-Graduação"
    | "Doutorado"
    | "Mestrado"
    | "Negócios"
    | "Eventos"
    | "Seleção"
    | "Aluguel";
  status: "Confirmada" | "Pendente" | "Cancelada";
}

// Mapa de cores fixas por categoria — garante identidade visual e consistência
const categoriaCores: Record<
  Reserva["categoria"],
  { bg: string; text: string; border: string }
> = {
  Graduação: {
    bg: "bg-blue-100",
    text: "text-blue-800",
    border: "border-blue-400",
  },
  "Pós-Graduação": {
    bg: "bg-purple-100",
    text: "text-purple-800",
    border: "border-purple-400",
  },
  Doutorado: {
    bg: "bg-indigo-100",
    text: "text-indigo-800",
    border: "border-indigo-400",
  },
  Mestrado: {
    bg: "bg-cyan-100",
    text: "text-cyan-800",
    border: "border-cyan-400",
  },
  Negócios: {
    bg: "bg-amber-100",
    text: "text-amber-800",
    border: "border-amber-400",
  },
  Eventos: {
    bg: "bg-green-100",
    text: "text-green-800",
    border: "border-green-400",
  },
  Seleção: {
    bg: "bg-pink-100",
    text: "text-pink-800",
    border: "border-pink-400",
  },
  Aluguel: {
    bg: "bg-gray-100",
    text: "text-gray-800",
    border: "border-gray-400",
  },
};

export default function ResumoReservasView() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [filtroStatus, setFiltroStatus] = useState<
    "Todos" | "Confirmada" | "Pendente" | "Cancelada"
  >("Todos");
  const [filtroEspaco, setFiltroEspaco] = useState<string>("Todos");
  const [filtroCategoria, setFiltroCategoria] = useState<string>("Todas");

  // Dados fictícios para demonstração
  useEffect(() => {
    setReservas([
      {
        id: 1,
        espaco: "Quadra A",
        usuario: "João Silva",
        matricula: "202310123",
        telefone: "(85) 99876-1234",
        data: "2025-10-26",
        hora: "14:00 - 15:00",
        categoria: "Graduação",
        status: "Confirmada",
      },
      {
        id: 2,
        espaco: "Arena Beach 3",
        usuario: "Maria Oliveira",
        matricula: "202208543",
        telefone: "(85) 98123-5678",
        data: "2025-10-27",
        hora: "16:00 - 17:00",
        categoria: "Eventos",
        status: "Pendente",
      },
      {
        id: 3,
        espaco: "Sala Multifuncional",
        usuario: "Pedro Gomes",
        matricula: "202105789",
        telefone: "(85) 99765-4321",
        data: "2025-10-29",
        hora: "09:00 - 10:00",
        categoria: "Mestrado",
        status: "Cancelada",
      },
      {
        id: 4,
        espaco: "Quadra B",
        usuario: "Ana Costa",
        matricula: "202309876",
        telefone: "(85) 98765-4321",
        data: "2025-10-30",
        hora: "11:00 - 12:00",
        categoria: "Negócios",
        status: "Confirmada",
      },
      {
        id: 5,
        espaco: "GP1",
        usuario: "Lucas Martins",
        matricula: "202207654",
        telefone: "(85) 99654-3210",
        data: "2025-10-28",
        hora: "15:00 - 16:00",
        categoria: "Seleção",
        status: "Pendente",
      },
    ]);
  }, []);

  // --- Lógica de filtragem ---
  // Aplica os filtros selecionados pelo usuário em tempo real
  const reservasFiltradas = reservas.filter((reserva) => {
    const statusMatch =
      filtroStatus === "Todos" || reserva.status === filtroStatus;
    const espacoMatch =
      filtroEspaco === "Todos" || reserva.espaco === filtroEspaco;
    const categoriaMatch =
      filtroCategoria === "Todas" || reserva.categoria === filtroCategoria;
    return statusMatch && espacoMatch && categoriaMatch;
  });

  // Criação dinâmica das listas de filtros (sem duplicações)
  const espacos = [
    "Todos",
    ...Array.from(new Set(reservas.map((r) => r.espaco))),
  ];
  const categorias = [
    "Todas",
    ...Array.from(new Set(reservas.map((r) => r.categoria))),
  ];

  return (
    <div className="min-h-screen bg-[#F5F7FB] flex flex-col">
      {/* Cabeçalho principal */}
      <header className="bg-[#0033A0] text-white shadow-md rounded-md">
        <div className="container mx-auto flex justify-center items-center px-6 py-4">
          <h1 className="text-2xl font-bold">Resumo de Reservas</h1>
          <nav className="space-x-4 text-sm md:text-base"></nav>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="flex-grow container mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-[#0033A0] mb-6">
          Visualização Geral
        </h2>

        {/* --- Filtros --- */}
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

          {/* Filtro por categoria */}
          <div>
            <label className="font-medium text-gray-700 mr-2">Categoria:</label>
            <select
              className="border border-gray-300 rounded px-3 py-1"
              value={filtroCategoria}
              onChange={(e) => setFiltroCategoria(e.target.value)}
            >
              {categorias.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* --- Grid de cards --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reservasFiltradas.map((reserva) => {
            // Seleciona a paleta de cores da categoria atual
            const cores = categoriaCores[reserva.categoria];

            return (
              <div
                key={reserva.id}
                className={`bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 flex flex-col justify-between border-2 ${cores.border}`}
              >
                {/* Cabeçalho do card */}
                <div className="mb-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-[#0033A0]">
                      {reserva.espaco}
                    </h3>
                    {/* Tag de categoria com cor exclusiva */}
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${cores.bg} ${cores.text}`}
                    >
                      {reserva.categoria}
                    </span>
                  </div>
                  <p className="text-gray-700 font-medium">
                    {new Date(reserva.data).toLocaleDateString("pt-BR")} |{" "}
                    {reserva.hora}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Reserva #{reserva.id.toString().padStart(3, "0")}
                  </p>
                </div>

                {/* Corpo com informações do usuário */}
                <div className="space-y-1 text-gray-700 text-sm">
                  <p>
                    <span className="font-medium text-[#0033A0]">Usuário:</span>{" "}
                    {reserva.usuario}
                  </p>
                  <p>
                    <span className="font-medium text-[#0033A0]">
                      Matrícula:
                    </span>{" "}
                    {reserva.matricula}
                  </p>
                  <p>
                    <span className="font-medium text-[#0033A0]">
                      Telefone:
                    </span>{" "}
                    {reserva.telefone}
                  </p>
                </div>

                {/* Rodapé: status e ação */}
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

                  {/* Deixa sem por enquanto, dps a gente coloca */}
                  {/*                   <button className="text-[#0033A0] font-medium hover:underline text-sm">
                    Detalhes
                  </button> */}
                </div>
              </div>
            );
          })}

          {/* Caso não haja resultados */}
          {reservasFiltradas.length === 0 && (
            <p className="text-center text-gray-500 mt-10 col-span-full">
              Nenhuma reserva encontrada para os filtros selecionados.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
