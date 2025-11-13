import { useEffect, useState } from "react";
import { api } from "../services/api";

interface HorariosProps {
  dia: string;
  espaco: string;
  onSelectHour: (hora: string) => void;
  horaSelecionada: string | null; // A hora ativa vinda do componente pai
}

export default function Horarios({ dia, espaco, onSelectHour, horaSelecionada }: HorariosProps) {
  const [reservas, setReservas] = useState<string[]>([]);

 useEffect(() => {
  const fetchReservas = async () => {
    try {
      const res = await api.get(`/reservas/por-dia/espaco?dia=${dia}&espaco=${encodeURIComponent(espaco)}`);
      const horasReservadas = res.data.map((r: any) => r.hora);
      setReservas(horasReservadas);
    } catch (error) {
      console.error("Erro ao buscar reservas:", error);
    }
  };
    if (dia && espaco) fetchReservas();
  }, [dia, espaco]);


  const agora = new Date();
  const hojeZero = new Date();
  hojeZero.setHours(0,0,0,0);

  const dataSelecionada = new Date(`${dia}T00:00:00`); // ou parse(...) como acima
  const selZero = new Date(dataSelecionada);
  selZero.setHours(0,0,0,0);

  const isHoje = selZero.getTime() === hojeZero.getTime();
  const horarios = [
    "", 
    "05:00", 
    "06:00", 
    "07:00", 
    "08:00", 
    "09:00", 
    "10:00", 
    "11:00", 
    "12:00", 
    "13:00", 
    "14:00", 
    "15:00", 
    "16:00", 
    "17:00", 
    "18:00", 
    "19:00", 
    "20:00", 
    "21:00", 
    "22:00", 
    "23:00", 
    "00:00"
  ];
    return (
        <div className="mb-6">
          <h3 className="font-semibold mb-2">
            Horários disponíveis em{" "}
            {new Date(`${dia}T12:00:00`).toLocaleDateString("pt-BR")}
          </h3>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {horarios.map((hora) => {
              const isSelected = hora === horaSelecionada;

              const [h, m] = hora.split(":").map(Number);
              const horaDate = new Date();
              horaDate.setHours(h || 0, m || 0, 0, 0); // protege do "" inicial

              const isPassado = isHoje && horaDate < agora;
              const isReservado = reservas.includes(hora);
              const desabilitado = isPassado || isReservado;

              return (
                <button
                  key={hora}
                  disabled={desabilitado}
                  onClick={() => !desabilitado && onSelectHour(hora)}
                  className={`
                    p-2 border rounded transition
                    ${
                      desabilitado
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : isSelected
                        ? "bg-[#0033A0] text-white"
                        : "hover:bg-[#0033A0] hover:text-white"
                    }
                  `}
                >
                  {hora}
                </button>
              );
            })}
          </div>
      </div>
    );
  }
