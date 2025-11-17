import { useEffect, useState } from "react";

interface Reserva {
  _id: string;
  espaco: string;
  dia: string; // ex: "2025-11-15"
  hora: string; // ex: "14:00"
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

export default function HistoricoReservas() {
  const [data, setData] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:5173/api/reservas");

        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }

        const result: Reserva[] = await response.json();

        const agora = new Date();

        // Filtra apenas reservas anteriores à data e hora atual
        const historico = result.filter((reserva) => {
          const dataHora = new Date(`${reserva.dia}T${reserva.hora}`);
          return dataHora < agora;
        });

        setData(historico);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p className="text-red-600">Erro: {error}</p>;

  return (
    <div className="container mx-auto">
      <header className="mb-6">
        <h2 className="text-2xl font-bold text-[#0033A0]">
          Histórico das Reservas
        </h2>
        <p className="text-gray-600">
          Todas as reservas anteriores à data e hora atual.
        </p>
      </header>

      <div className="overflow-x-auto w-full">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Matrícula
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                CPF
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Espaço
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Data / Hora
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Categoria
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((reserva) => (
              <tr key={reserva._id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-700">
                  {reserva.usuario.nome}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {reserva.usuario.matricula}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {reserva.usuario.cpf}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {reserva.espaco}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {reserva.dia} — {reserva.hora}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {reserva.usuario.categoria}
                </td>
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-6 text-gray-500 italic"
                >
                  Nenhuma reserva anterior encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}