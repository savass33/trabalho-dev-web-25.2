import { format } from "date-fns";
import { useEffect, useState } from "react";

interface Reserva {
  _id: string;
  espaco: string;
  dia: string; // vem como ISO completo do Mongo
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
  const [dataHistorico, setDataHistorico] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  function formatarData(diaISO: string) {
    return format(new Date(diaISO), "dd/MM/yyyy");
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:5137/api/reservas");
        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);

        const result: Reserva[] = await response.json();

        const agora = new Date();

        const historico = result.filter((reserva) => {
          const dataMongo = new Date(reserva.dia);
          const [h, m] = reserva.hora.split(":");

          dataMongo.setHours(Number(h), Number(m), 0, 0);

          return dataMongo < agora;
        });

        setDataHistorico(historico);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const reservasOrdenadas = [...dataHistorico].sort((a, b) => {
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
            {reservasOrdenadas.map((reserva) => (
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
                  {formatarData(reserva.dia)} — {reserva.hora}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {reserva.usuario.categoria}
                </td>
              </tr>
            ))}

            {dataHistorico.length === 0 && (
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
