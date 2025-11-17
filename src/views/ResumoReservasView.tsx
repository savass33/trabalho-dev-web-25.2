/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import axios from "axios";

// Estrutura real de uma reserva (vinda do MongoDB)
interface Reserva {
  _id: string;
  espaco: string;
  dia: string;
  hora: string;
  usuario: {
    nome: string;
    cpf: string;
    matricula: string;
    categoria:
      | "Graduação"
      | "Pós-Graduação"
      | "Doutorado"
      | "Mestrado"
      | "Negócios"
      | "Eventos"
      | "Seleção"
      | "Aluguel";
  };
}

// Mapa de cores fixas por categoria
const categoriaCores: Record<
  Reserva["usuario"]["categoria"],
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
  const [filtroEspaco, setFiltroEspaco] = useState<string>("Todos");
  const [filtroCategoria, setFiltroCategoria] = useState<string>("Todas");

  // Buscar as reservas da API
  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await axios.get("http://localhost:5137/api/reservas");
        const reservas = response.data;
        const agora = new Date();

        const futuras = reservas.filter((reserva: any) => {
          const datamongo = new Date(reserva.dia);
          const [h, m] = reserva.hora.split(":");

          datamongo.setHours(Number(h), Number(m), 0, 0);

          return datamongo >= agora;
        });
        setReservas(futuras); // Atualiza o estado com as reservas do banco
      } catch (error) {
        console.error("Erro ao buscar reservas:", error);
      }
    };
    fetchReservas();
  }, []);

  // Criação dinâmica das listas de filtros (sem duplicações)
  const espacos = [
    "Todos",
    ...Array.from(new Set(reservas.map((r) => r.espaco))),
  ];
  const categorias = [
    "Todas",
    ...Array.from(new Set(reservas.map((r) => r.usuario.categoria))),
  ];

  // --- Lógica de filtragem ---
  const reservasFiltradas = reservas.filter((reserva) => {
    const espacoMatch =
      filtroEspaco === "Todos" || reserva.espaco === filtroEspaco;
    const categoriaMatch =
      filtroCategoria === "Todas" ||
      reserva.usuario.categoria === filtroCategoria;
    return espacoMatch && categoriaMatch;
  });

  const reservasOrdenadas = [...reservasFiltradas].sort((a, b) => {
    const hoje = new Date();

    const dataA = a.dia ? new Date(a.dia) : null;
    const dataB = b.dia ? new Date(b.dia) : null;

    if (!dataA && !dataB) return 0;
    if (!dataA) return 1; // envia reservas sem data para o final
    if (!dataB) return -1;

    const diffA = Math.abs(dataA.getTime() - hoje.getTime());
    const diffB = Math.abs(dataB.getTime() - hoje.getTime());

    if (diffA !== diffB) {
      return diffA - diffB;
    }

    const [horaA, minutoA] = a.hora.split(":").map(Number);
    const [horaB, minutoB] = b.hora.split(":").map(Number);

    const totalMinutosA = horaA * 60 + minutoA;
    const totalMinutosB = horaB * 60 + minutoB;

    return totalMinutosA - totalMinutosB;
  });

  return (
    <div className="min-h-screen bg-[#F5F7FB] flex flex-col">
      {/* Cabeçalho principal */}
      <header className="bg-[#0033A0] text-white shadow-md rounded-md">
        <div className="container mx-auto flex justify-center items-center px-6 py-4">
          <h1 className="text-2xl font-bold">Resumo de Reservas</h1>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="flex-grow container mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-[#0033A0] mb-6">
          Visualização Geral
        </h2>

        {/* --- Filtros --- */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
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
          {reservasOrdenadas.map((reserva) => {
            const cores =
              categoriaCores[reserva.usuario.categoria] ||
              categoriaCores["Aluguel"];

            const dataFormatada = reserva.dia
              ? new Date(reserva.dia).toLocaleDateString("pt-BR")
              : "Data não disponível";

            return (
              <div
                key={reserva._id}
                className={`bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 flex flex-col justify-between border-2 ${cores.border}`}
              >
                {/* Cabeçalho do card */}
                <div className="mb-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-[#0033A0]">
                      {reserva.espaco}
                    </h3>
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${cores.bg} ${cores.text}`}
                    >
                      {reserva.usuario.categoria}
                    </span>
                  </div>
                  <p className="text-gray-700 font-medium">
                    {dataFormatada} | {reserva.hora}
                  </p>
                  <p className="text-gray-500 text-sm">
                    ID: {reserva._id.substring(0, 6)}...
                  </p>
                </div>

                {/* Corpo com informações do usuário */}
                <div className="space-y-1 text-gray-700 text-sm">
                  <p>
                    <span className="font-medium text-[#0033A0]">Nome:</span>{" "}
                    {reserva.usuario?.nome ?? "-"}
                  </p>
                  <p>
                    <span className="font-medium text-[#0033A0]">CPF:</span>{" "}
                    {reserva.usuario?.cpf ?? "-"}
                  </p>
                  <p>
                    <span className="font-medium text-[#0033A0]">
                      Matrícula:
                    </span>{" "}
                    {reserva.usuario?.matricula ?? "-"}
                  </p>
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
